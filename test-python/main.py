from playwright.async_api import async_playwright
import os
import time
import asyncio

result_file_names = []


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
    os.system("cd ./tmp/native && ./exampleB1 > /dev/null")

    # copy result files to output folder

    for file in result_file_names:
        os.system(f"cp ./tmp/native/{file} ./output/Native-{file}")

    # read time from time.txt
    with open("./tmp/native/time.txt", "r") as f:
        time = f.read()
        print("Native", time)


async def execute_test(driver):
    browser = await driver.launch()
    page = await browser.new_page()
    await page.goto("http://127.0.0.1:5500/example/web/shell_minimal_worker.html")

    for i in range(0, 5):
        result = await page.evaluate(
            """async () => {
        return window.runSimulation();
        }"""
        )

        print(browser.browser_type.name, result["time"])

    files = result["files"]
    # save files to disk
    for file in files:
        path = f"./output/{browser.browser_type.name}-{file['name']}"
        with open(path, "w") as f:
            f.write(file["content"])
        print(f"File saved to {path}")

    global result_file_names
    result_file_names = [file["name"] for file in files]

    await browser.close()


async def log_memory(name, log_file, timeout):
    start_time = time.time()
    os.system(
        f"echo name={name} log_file={log_file} timeout={timeout} start_time={start_time} > {log_file}"
    )

    while True:
        # print timestamp only time in seconds from start of epoch

        os.system(f"echo time:{time.time() - start_time} >> {log_file}")
        os.system(f"./ps_mem.py -p $(pgrep -d, -u $USER) -t >> {log_file}")
        await asyncio.sleep(timeout)


async def with_memory_logging(name, log_file, timeout, fn):
    print(f"Running {name} test")
    # start memory logging
    log_task = asyncio.create_task(log_memory(name, log_file, timeout))

    # run test
    await fn()

    print(f"Finished {name} test")
    # stop memory logging
    log_task.cancel()


async def run(playwright):
    # await with_memory_logging(
    #     "Firefox", "output/firefox.log", 0.2, lambda: execute_test(playwright.firefox)
    # )
    await with_memory_logging(
        "Chromium",
        "output/chromium.log",
        0.2,
        lambda: execute_test(playwright.chromium),
    )
    await with_memory_logging(
        "Native",
        "output/native.log",
        0.2,
        lambda: asyncio.get_running_loop().run_in_executor(None, native_test),
    )


async def main():
    os.makedirs("output", exist_ok=True)
    async with async_playwright() as playwright:
        await run(playwright)


asyncio.run(main())
