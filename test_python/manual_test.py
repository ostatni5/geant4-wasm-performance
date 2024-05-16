import subprocess
import time
from selenium.webdriver import FirefoxOptions, ChromeOptions
from selenium import webdriver

from input import create_input


INPUT_FILE_CONTENT = create_input(beamOn=10000)


def create_firefox_driver():
    opts = FirefoxOptions()
    # opts.add_argument("--headless")
    driver = webdriver.Firefox(options=opts)
    return driver


def create_chromium_driver():
    opts = ChromeOptions()
    # opts.add_argument("--headless")
    driver = webdriver.Chrome(options=opts)
    return driver


def open_borwser_test(driver, name="browser"):

    timestamp = time.time()
    subprocess.Popen(
        f"python3 ./psrecord.py {driver.service.process.pid} --plot ./usage.{name}.{timestamp}.png --include-children".split(
            " "
        )
    )
    driver.set_script_timeout(60)
    # driver.get("http://127.0.0.1:5500/")
    driver.get("http://127.0.0.1:5500/example/web/shell_minimal_worker.html")
    driver.execute_script(f"window.INPUT_FILE = `{INPUT_FILE_CONTENT}`;")
    time.sleep(1)
    # result = driver.execute_script("return window.runCompiled();")
    # print(result)

    # time.sleep(3)

    # result = driver.execute_script("return window.runCompiled();")
    # print(result)
    # time.sleep(3)

    # result = driver.execute_script("return window.runPrecompiled();")
    # print(result)
    # time.sleep(3)

    # result = driver.execute_script("return window.runPrecompiled();")
    # print(result)

    result = driver.execute_script("return window.runSimulation();")

    time.sleep(3)

    result = driver.execute_script("return window.runSimulation();")

    time.sleep(2)

    driver.close()


open_borwser_test(create_firefox_driver(), "firefox")
open_borwser_test(create_chromium_driver(), "chromium")
