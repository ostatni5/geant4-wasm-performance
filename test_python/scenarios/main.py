import json
import subprocess
from platform_utils import print_info
import os
import time
from selenium_utils import create_firefox_driver, create_chromium_driver

REPEAT = 1
SERVER_ROOT = "test_python/scenarios/"
PS_RECORD = "python3 ./psrecord.py"

print_info()

def dump_result(folder,name,result,duration):
    with open(f"{folder}/{name}.time.log", "w") as f:
        f.write(f"{duration}")
        f.write("\n")
        if result:
            f.write(json.dumps(result))
            f.write("\n")


def execute_test(driver, name, url, folder, callback):
    print(f"Running test for {name}")
    print(f"Browser: {driver.capabilities["browserName"]} {driver.capabilities["browserVersion"]}")
    start_time = time.time()
    log_name = name.lower()
    subprocess.Popen(
        f"{PS_RECORD} {driver.service.process.pid} --log {folder}/{log_name}.usage.log --plot {folder}/{log_name}.usage.png --include-children".split(
            " "
        )
    )

    driver.set_script_timeout(30)
    driver.get(f"http://127.0.0.1:5500/{url}")

    result = callback(driver)

    driver.close()
    end_time = time.time()
    print(f"Test finished in {end_time - start_time:.2f} seconds")
    
    return result, end_time - start_time



def run_empty_webpage(folder, test_suffix):

    def execute(driver, name, url, folder):
        execute_test(driver, name, url, folder, lambda driver: time.sleep(5))
        
    url = f"{SERVER_ROOT}{folder}/index.html"
    results = f"./scenarios/{folder}/results/n_{test_suffix}"
    os.makedirs(results, exist_ok=True)

    execute(create_firefox_driver(), "firefox", url, results)

    execute(create_chromium_driver(), "chromium", url, results)


# for i in range(REPEAT):
#     run_empty_webpage("empty_webpage", i)
    
    
def run_memory_allocation(folder, test_suffix):
    url = f"{SERVER_ROOT}{folder}/index.html"
    results = f"./scenarios/{folder}/results/n_{test_suffix}"
    os.makedirs(results, exist_ok=True)

    def execute(driver, name, url, folder):
        def callable_impl(driver):
            time.sleep(2)
            result = driver.execute_script("return window.run();")
            time.sleep(5)
            return result
            
            
        result,duration = execute_test(driver, name, url, folder, lambda driver: callable_impl(driver)) 
        
        dump_result(results,name,result,duration)
        


    execute(create_firefox_driver(), "firefox", url, results)

    execute(create_chromium_driver(), "chromium", url, results)


# for i in range(REPEAT):
#     run_memory_allocation("memory_allocation", i)

# for i in range(REPEAT):
#     run_memory_allocation("memory_allocation2", i)


# for i in range(REPEAT):
#     run_memory_allocation("files_linking", i)
    
for i in range(REPEAT):
    run_memory_allocation("empty_wasm", i)
