from selenium import webdriver
import subprocess
from selenium.webdriver import FirefoxOptions, ChromeOptions
import os
import time
import math
import asyncio
import shlex
import json
from input import create_input, save_input_file

from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument("--n_threads", type=int, default=4)

parser.add_argument("--x_bins", type=int, default=10)
parser.add_argument("--y_bins", type=int, default=1)
parser.add_argument("--z_bins", type=int, default=1)
parser.add_argument("--beam_on", type=int, default=100_000)

parser.add_argument("--seed", type=int, default=1234)

ns = parser.parse_args()

result_file_names = []

SEED = ns.seed
N_THREADS = ns.n_threads
MEMORY_LOGGING_TIMEOUT = 0.05
INPUT_FILE_CONTENT = create_input(ns.x_bins, ns.y_bins, ns.z_bins, ns.beam_on)


def print(*args, **kwargs):
    __builtins__.print(*args, **kwargs)


# crate output folder
os.makedirs("output", exist_ok=True)

with open("./output/config.txt", "w") as f:
    f.write(json.dumps(vars(ns)))


def create_firefox_driver():
    opts = FirefoxOptions()
    opts.add_argument("--headless")
    driver = webdriver.Firefox(options=opts)
    return driver


def create_chromium_driver():
    opts = ChromeOptions()
    opts.add_argument("--headless")
    driver = webdriver.Chrome(options=opts)
    return driver


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
                    f'psrecord "./{exec_name} exampleB1.in {SEED + i} {n_threads}" --log ../../output/{memory_file}.usage.log --include-children'
                ),
                cwd=tmp_path,
                stdout=f,
            )
        )

    for thread in threads:
        thread.wait()

    # copy result files to output folder

    for file in result_file_names:
        os.system(f"cp {tmp_path}/{file} ./output/{name}-{file}")

    # read time from time.txt
    try:
        with open(time_path, "r") as f:
            time = f.read()
            print(f"{name}", time)
    except:
        print("No time.txt file found")


def execute_test(driver, name):
    import subprocess

    log_name = name.lower()
    subprocess.Popen(
        f"psrecord {driver.service.process.pid} --log ./output/{log_name}.usage.log --include-children".split(
            " "
        )
    )

    driver.set_script_timeout(30)
    driver.get("http://127.0.0.1:5500/example/web/shell_minimal_worker.html")
    driver.execute_script(f"window.INPUT_FILE = `{INPUT_FILE_CONTENT}`;")
    driver.execute_script(f"window.SEED = {SEED};")
    driver.execute_script(f"window.N_WORKERS = {N_THREADS};")
    result = driver.execute_script("return window.runSimulation();")

    driver.close()

    print(name, result["time"])
    print(result["total"])
    print(name, result["times"])
    print(name, result["workersInit"])

    # files = result["files"]
    # # save files to disk
    # for file in files:
    #     path = f"./output/{name}-{file['name']}"
    #     with open(path, "w") as f:
    #         f.write(file["content"])
    #     print(f"File saved to {path}")

    # global result_file_names
    # result_file_names = [file["name"] for file in files]
    return result


async def with_memory_logging(name, process_name, fn):
    try:
        subprocess.run(["pgrep", process_name], check=True)
        raise Exception(f"Process already running {process_name}")
    except subprocess.CalledProcessError as e:
        print(f"Process not running {process_name}")
        if e.returncode != 1:
            raise e

    print(f"Running {name} test")
    # start memory logging
    time_start = time.time()
    # run test
    result = await asyncio.get_running_loop().run_in_executor(None, fn)

    time_end = time.time()
    print(f"Finished {name} test {math.ceil((time_end - time_start) * 1000)} ms")
    # write time to file
    with open(f"./output/{name}.time.log", "w") as f:
        f.write(f"{time_end - time_start}")
        f.write("\n")
        if result:
            f.write(json.dumps(result))
            f.write("\n")


async def run():
    # await with_memory_logging(
    #     "firefox",
    #     "firefox",
    #     lambda: execute_test(create_firefox_driver(), "Firefox"),
    # )
    # await with_memory_logging(
    #     "chromium",
    #     "chrome",
    #     lambda: execute_test(create_chromium_driver(), "Chromium"),
    # )
    await with_memory_logging(
        "native",
        "exampleB1",
        lambda: native_test(),
    )
    await with_memory_logging(
        "native-multithread",
        "exampleB1",
        lambda: native_test("native-multithread", N_THREADS),
    )
    # await with_memory_logging(
    #     "native-multiprocess",
    #     "exampleB1",
    #     lambda: native_test("native", 1, N_THREADS, memory_file="native-multiprocess"),
    # )


async def main():
    map(lambda x: os.system(f"pkill -9 {x}"), ["chrome", "firefox", "exampleB1"])
    await run()


asyncio.run(main())
