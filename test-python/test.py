from selenium import webdriver
import subprocess
from selenium.webdriver import FirefoxOptions, ChromeOptions
import os
import time
import math
import asyncio
import shlex


result_file_names = []

SEED = 1234
N_THREADS = 1
MEMORY_LOGGING_TIMEOUT = 0.05


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


def native_test(name="native", n_threads=1, n_workers=1):
    exec_name = "exampleB1"
    input_file = "exampleB1.in"
    files_to_copy = [
        input_file,
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

    if n_workers > 1:
        # find in input file number of events and replace it divided by number of workers
        with open(f"{tmp_path}/{input_file}", "r") as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                if "run/beamOn" in line:
                    lines[i] = f"/run/beamOn {int(line.split()[1]) // n_workers}\n"
                    break

        with open(f"{tmp_path}/{input_file}", "w") as f:
            f.writelines(lines)

    f = open(f"{tmp_path}/out.log", "w")
    threads = []
    for i in range(n_workers):
        threads.append(
            subprocess.Popen(
                shlex.split(f"./{exec_name} exampleB1.in {SEED + i} {n_threads}"),
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
    driver.set_script_timeout(60)
    driver.get("http://127.0.0.1:5500/example/web/shell_minimal_worker.html")
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


async def log_memory(name, log_file, timeout, process_name):
    start_time = time.time()
    os.system(
        f"echo name={name} log_file={log_file} timeout={timeout} start_time={start_time} > {log_file}"
    )

    while True:
        # print timestamp only time in seconds from start of epoch

        os.system(f"echo time:{time.time() - start_time} >> {log_file}")
        os.system(
            f"./ps_mem.py -p $(pgrep -d, -u $USER) -n {process_name} >> {log_file}"
        )
        await asyncio.sleep(timeout)


async def with_memory_logging(name, log_file, timeout, process_name, fn):
    try:
        subprocess.run(["pgrep", process_name], check=True)
        raise Exception(f"Process already running {process_name}")
    except subprocess.CalledProcessError as e:
        print(f"Process not running {process_name}")
        if e.returncode != 1:
            raise e

    print(f"Running {name} test")
    # start memory logging
    log_task = asyncio.create_task(log_memory(name, log_file, timeout, process_name))
    time_start = time.time()
    # run test
    await asyncio.get_running_loop().run_in_executor(None, fn)
    time_end = time.time()
    print(f"Finished {name} test {math.ceil((time_end - time_start) * 1000)} ms")
    # stop memory logging
    log_task.cancel()


async def run():
    await with_memory_logging(
        "firefox",
        "output/firefox.log",
        MEMORY_LOGGING_TIMEOUT,
        "firefox",
        lambda: execute_test(create_firefox_driver(), "Firefox"),
    )
    await with_memory_logging(
        "chromium",
        "output/chromium.log",
        MEMORY_LOGGING_TIMEOUT,
        "chrome",
        lambda: execute_test(create_chromium_driver(), "Chromium"),
    )
    await with_memory_logging(
        "native",
        "output/native.log",
        MEMORY_LOGGING_TIMEOUT,
        "exampleB1",
        lambda: native_test(),
    )
    await with_memory_logging(
        "native-multithread",
        "output/native-multithread.log",
        MEMORY_LOGGING_TIMEOUT,
        "exampleB1",
        lambda: native_test("native-multithread", N_THREADS),
    )
    await with_memory_logging(
        "native-multiprocess",
        "output/native-multiprocess.log",
        MEMORY_LOGGING_TIMEOUT,
        "exampleB1",
        lambda: native_test("native", 1, N_THREADS),
    )


async def main():
    os.makedirs("output", exist_ok=True)
    map(lambda x: os.system(f"pkill -9 {x}"), ["chrome", "firefox", "exampleB1"])
    await run()


asyncio.run(main())
