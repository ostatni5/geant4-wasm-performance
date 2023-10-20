from selenium import webdriver
import subprocess
from selenium.webdriver import FirefoxOptions, ChromeOptions
import os
import time
import asyncio


result_file_names = []

SEED = 5785978508


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


def native_test():
    files_to_copy = [
        "exampleB1.in",
        "exampleB1",
        "g4geom.txt",
    ]

    # copy files from native g4geom,exampleB1 to tmp folder

    if not os.path.exists("./tmp/native"):
        os.makedirs("./tmp/native", exist_ok=True)
    for file in files_to_copy:
        os.system(f"cp ../example/B1/build/native/{file} ./tmp/native/{file}")

    # run compiled c++ code
    os.system(f"cd ./tmp/native && ./exampleB1 exampleB1.in {SEED} > /dev/null")

    # copy result files to output folder

    for file in result_file_names:
        os.system(f"cp ./tmp/native/{file} ./output/Native-{file}")

    # read time from time.txt
    with open("./tmp/native/time.txt", "r") as f:
        time = f.read()
        print("Native", time)


def native_multithread():
    files_to_copy = [
        "exampleB1.in",
        "exampleB1",
        "g4geom.txt",
    ]

    # copy files from native g4geom,exampleB1 to tmp folder

    if not os.path.exists("./tmp/native-multithread"):
        os.makedirs("./tmp/native-multithread", exist_ok=True)
    for file in files_to_copy:
        os.system(
            f"cp ../example/B1/build/native-multithread/{file} ./tmp/native-multithread/{file}"
        )

    # run compiled c++ code
    os.system(
        f"cd ./tmp/native-multithread && ./exampleB1 exampleB1.in {SEED} 1 > ./../../output/native-multithread-cout.log"
    )

    # copy result files to output folder

    for file in result_file_names:
        os.system(
            f"cp ./tmp/native-multithread/{file} ./output/native-multithread-{file}"
        )

    # read time from time.txt
    with open("./tmp/native-multithread/time.txt", "r") as f:
        time = f.read()
        print("Native-multithread", time)

    # remove time.txt
    os.system(f"rm ./tmp/native-multithread/time.txt")


def execute_test(driver, name):
    driver.get("http://127.0.0.1:5500/example/web/shell_minimal_worker.html")
    driver.execute_script(f"window.SEED = {SEED};")
    result = driver.execute_script("return window.runSimulation();")
    print(result["time"])
    driver.close()

    print(name, result["time"])

    files = result["files"]
    # save files to disk
    for file in files:
        path = f"./output/{name}-{file['name']}"
        with open(path, "w") as f:
            f.write(file["content"])
        print(f"File saved to {path}")

    global result_file_names
    result_file_names = [file["name"] for file in files]


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

    # run test
    await asyncio.get_running_loop().run_in_executor(None, fn)

    print(f"Finished {name} test")
    # stop memory logging
    log_task.cancel()


async def run():
    # await with_memory_logging(
    #     "Firefox",
    #     "output/firefox.log",
    #     0.2,
    #     "firefox",
    #     lambda: execute_test(create_firefox_driver(), "Firefox"),
    # )
    # await with_memory_logging(
    #     "Chromium",
    #     "output/chromium.log",
    #     0.2,
    #     "chrome",
    #     lambda: execute_test(create_chromium_driver(), "Chromium"),
    # )
    # await with_memory_logging(
    #     "Native",
    #     "output/native.log",
    #     0.2,
    #     "exampleB1",
    #     lambda: native_test(),
    # )
    await with_memory_logging(
        "native-multithread",
        "output/native-multithread.log",
        0.2,
        "exampleB1",
        lambda: native_multithread(),
    )


async def main():
    os.makedirs("output", exist_ok=True)
    map(lambda x: os.system(f"pkill -f {x}"), ["chrome", "firefox", "exampleB1"])
    await run()


asyncio.run(main())
