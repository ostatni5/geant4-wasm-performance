import subprocess

import os
import time
import math
import asyncio
import shlex
import json
from typing import Dict

from matplotlib.dates import SA
from input import create_input, save_input_file
from selenium_utils import create_firefox_driver, create_chromium_driver

from argparse import ArgumentParser

from dotenv import dotenv_values

env_values: Dict[str, str] = dotenv_values() | os.environ.copy()  # type: ignore


parser = ArgumentParser()
parser.add_argument("--n_threads", type=int, default=8)

parser.add_argument("--x_bins", type=int, default=100)
parser.add_argument("--y_bins", type=int, default=100)
parser.add_argument("--z_bins", type=int, default=100)
parser.add_argument("--beam_on", type=int, default=100_000)
parser.add_argument(
    "--test",
    action="store",
    type=str,
    nargs="*",
    default=["firefox", "chromium", "native"],
)
parser.add_argument("--particle", type=str, default="proton")
parser.add_argument("--verbose", type=bool, default=False)
parser.add_argument("--init_mode", type=str, default="queue")
parser.add_argument("--save-results", type=bool, default=False)

parser.add_argument("--seed", type=int, default=1234)
parser.add_argument("--output", type=str, default="./output")

ns = parser.parse_args()
result_file_names = ["eDep.txt"]

SEED = ns.seed
N_THREADS = ns.n_threads
INIT_MODE = ns.init_mode
MEMORY_LOGGING_TIMEOUT = 0.05
INPUT_FILE_CONTENT = create_input(
    ns.x_bins, ns.y_bins, ns.z_bins, ns.beam_on, ns.particle
)
OUTPUT_FOLDER = ns.output
SAVE_RESULTS = ns.save_results


def print(*args, **kwargs):
    if not ns.verbose:
        return

    __builtins__.print(*args, **kwargs)


# crate output folder
os.makedirs(f"{OUTPUT_FOLDER}/", exist_ok=True)

with open(f"{OUTPUT_FOLDER}/config.txt", "w") as f:
    f.write(json.dumps(vars(ns)))


def native_test(name="native", n_threads=1, n_workers=1, memory_file=None):
    memory_file = memory_file or name
    exec_name = "exampleB1"
    input_file = "exampleB1.in"
    files_to_copy = [
        exec_name,
        "g4geom.txt",
    ]
    time_path = f"./tmp/{name}/time.txt"

    # copy files from native g4geom,exampleB1 to tmp folder
    tmp_path = f"./tmp/{name}"
    if not os.path.exists(tmp_path):
        os.makedirs(tmp_path, exist_ok=True)
    else:
        os.system(f"rm -rf {tmp_path}/*")

    for file in files_to_copy:
        os.system(f"cp ../example/B1/build/{name}/{file} {tmp_path}/{file}")

    save_input_file(INPUT_FILE_CONTENT, tmp_path + "/")

    if n_workers > 1:
        beam_on = ns.beam_on // n_workers
        input_file = create_input(ns.x_bins, ns.y_bins, ns.z_bins, beam_on)
        save_input_file(input_file, tmp_path + "/")

    f = open(f"{tmp_path}/out.log", "w")
    threads = []
    for i in range(n_workers):  # TODO: FIX multiprocessing data
        threads.append(
            subprocess.Popen(
                shlex.split(
                    f'python3 ./../../psrecord.py "./{exec_name} exampleB1.in {SEED + i} {n_threads}" --log ../.{OUTPUT_FOLDER}/{memory_file}.usage.log --plot ../.{OUTPUT_FOLDER}/{memory_file}.usage.png  --include-children'
                ),
                cwd=tmp_path,
                stdout=f,
                env=env_values,
            )
        )

    for thread in threads:
        thread.wait()

    # copy result files to output folder

    for file in result_file_names:
        os.system(f"cp {tmp_path}/{file} {OUTPUT_FOLDER}/{name}-{file}")

    # read time from time.txt

    res_dict = {
        "times": [],
        "total": 0,
    }

    try:
        with open(time_path, "r") as f:
            start = int(f.readline().split(",")[1].replace("\n", "")) / 1000
            total_time = float(f.readline().split(",")[1].replace("\n", ""))
            run_time = float(f.readline().split(",")[1].replace("\n", ""))
            init_time = float(f.readline().split(",")[1].replace("\n", ""))
            print(f"{name}", total_time)
            res_dict["times"].append({"run": run_time, "init": init_time})
            res_dict["total"] = total_time
            res_dict["start"] = start
    except:
        print("No time.txt file found")

    return res_dict


def execute_test(
    driver, name, INPUT_FILE_CONTENT=INPUT_FILE_CONTENT, SEED=SEED, N_THREADS=N_THREADS
):

    log_name = name.lower()
    subprocess.Popen(
        f"python3 ./psrecord.py {driver.service.process.pid} --log {OUTPUT_FOLDER}/{log_name}.usage.log --plot {OUTPUT_FOLDER}/{log_name}.usage.png --include-children".split(
            " "
        )
    )

    driver.set_script_timeout(60 * 5)
    time.sleep(2)
    driver.get("http://127.0.0.1:5500/example/web/shell_minimal_worker.html")
    driver.execute_script(f"window.INIT_MODE = `{INIT_MODE}`;")
    driver.execute_script(f"window.INPUT_FILE = `{INPUT_FILE_CONTENT}`;")
    driver.execute_script(f"window.SEED = {SEED};")
    driver.execute_script(f"window.N_WORKERS = {N_THREADS};")
    driver.execute_script(f"window.RETURN_FILES = {str(SAVE_RESULTS).lower()};")
    result = driver.execute_script("return window.runSimulation();")

    time.sleep(2)
    driver.close()

    print("Time", result["time"])
    print("Total", result["total"])
    print("times", result["times"])
    print("workersInit", result["workersInit"])
    print("timestapms", result["timeStamps"])

    if SAVE_RESULTS:
        for n in range(N_THREADS):
            for file in result["files"][n]:
                with open(f"{OUTPUT_FOLDER}/{log_name}-{n}-{file['name']}", "w") as f:
                    f.write(file["content"])

    return result


async def with_memory_logging(name, process_name, fn):
    print(f"Running {name} test")
    # start memory logging
    time_start = time.time()
    # run test
    result = await asyncio.get_running_loop().run_in_executor(None, fn)

    time_end = time.time()
    print(f"Finished {name} test {math.ceil((time_end - time_start) * 1000)} ms")
    # write time to file
    with open(f"{OUTPUT_FOLDER}/{name}.time.log", "w") as f:
        f.write(f"{time_end - time_start}")
        f.write("\n")
        if result:
            f.write(json.dumps(result))
            f.write("\n")


async def run():
    print("Running tests")
    print(ns.test)

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    if "firefox" in ns.test:
        await with_memory_logging(
            "firefox",
            "firefox",
            lambda: execute_test(create_firefox_driver(), "Firefox"),
        )

    if "chromium" in ns.test:
        await with_memory_logging(
            "chromium",
            "chrome",
            lambda: execute_test(create_chromium_driver(), "Chromium"),
        )

    if "native" in ns.test:
        if N_THREADS == 1:
            await with_memory_logging(
                "native",
                "exampleB1",
                lambda: native_test(),
            )

        await with_memory_logging(
            "native-multithread",
            "exampleB1",
            lambda: native_test("native-multithread", n_threads=N_THREADS),
        )
        # await with_memory_logging(
        #     "native-multiprocess",
        #     "exampleB1",
        #     lambda: native_test("native", 1, N_THREADS, memory_file="native-multiprocess"),
        # )


async def main():
    # map(lambda x: os.system(f"pkill -9 {x}"), ["chrome", "firefox", "exampleB1"])
    await run()


asyncio.run(main())
