import json
import subprocess
from platform_utils import print_info
import os
import time
from selenium_utils import create_firefox_driver, create_chromium_driver

REPEAT = range(1)
N_THREADS = [1, 2, 4, 8, 12]
SERVER_ROOT = "test_python/scenarios/"
PS_RECORD = "python3 ./psrecord.py"

print_info()

start_main = time.time()

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
    
    time.sleep(2)
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
    
def run_memory_allocation4(folder, test_suffix):
    url = f"{SERVER_ROOT}{folder}/index.html"
    results = f"./scenarios/{folder}/results/n_{test_suffix}"
    os.makedirs(results, exist_ok=True)

    def execute(driver, name, url, folder):
        def callable_impl(driver):
            time.sleep(2)
            result1 = driver.execute_script("return window.run();")
            time.sleep(2)
            result2 = driver.execute_script("return window.run();")
            time.sleep(2)
            result3 = driver.execute_script("return window.run();")
            time.sleep(2)
            return {"runs": [result1, result2, result3]}
            
            
        result,duration = execute_test(driver, name, url, folder, lambda driver: callable_impl(driver)) 
        
        dump_result(results,name,result,duration)
        


    execute(create_firefox_driver(), "firefox", url, results)

    execute(create_chromium_driver(), "chromium", url, results)
    

def run_one_shot():
    n_threads = N_THREADS
    folder = "one_shot"
    
    
    start_time = time.time()
    
    for n_thread in n_threads:
        for i in REPEAT:
            print(f'Running test with {n_thread} threads')
            #clear output directory
            
            folder_output_name = f'./scenarios/{folder}/results/thread_{n_thread}/n_{i}'
            subprocess.call(f'python3 test.py --n_threads {n_thread} --beam_on 1 --particle geantino --output {folder_output_name}', shell=True)
 
    print(f"Suite finished in {time.time() - start_time:.2f} seconds")
 
def run_base_experiment_1d_queue():
    n_threads = N_THREADS
    folder = "base_experiment_1d_queue"
    print(f'Running suite {folder}')
    start_time = time.time()

    for n_thread in n_threads:
        for i in REPEAT:
            print(f'Running test with {n_thread} threads')
            #clear output directory
            
            folder_output_name = f'./scenarios/{folder}/results/thread_{n_thread}/n_{i}'
            subprocess.call(f'python3 test.py --init_mode queue --test firefox chromium --n_threads {n_thread} --x_bins 1 --y_bins 1 --z_bins 500 --beam_on 100000 --output {folder_output_name}', shell=True)           

    print(f"Suite finished in {time.time() - start_time:.2f} seconds")
    
    
def run_base_experiment_1d_parallel():
    n_threads = N_THREADS
    folder = "base_experiment_1d_parallel"
    print(f'Running suite {folder}')
    start_time = time.time()

    for n_thread in n_threads:
        for i in REPEAT:
            print(f'Running test with {n_thread} threads')
            #clear output directory
            
            folder_output_name = f'./scenarios/{folder}/results/thread_{n_thread}/n_{i}'
            subprocess.call(f'python3 test.py --init_mode parallel --test firefox chromium --n_threads {n_thread} --x_bins 1 --y_bins 1 --z_bins 500 --beam_on 100000 --output {folder_output_name}', shell=True)           

    print(f"Suite finished in {time.time() - start_time:.2f} seconds")
    
    
def run_base_experiment_1d():
    n_threads = N_THREADS
    folder = "base_experiment_1d"
    print(f'Running suite {folder}')
    start_time = time.time()

    for n_thread in n_threads:
        for i in REPEAT:
            print(f'Running test with {n_thread} threads')
            #clear output directory
            
            folder_output_name = f'./scenarios/{folder}/results/thread_{n_thread}/n_{i}'
            subprocess.call(f'python3 test.py --n_threads {n_thread} --x_bins 1 --y_bins 1 --z_bins 500 --beam_on 100000 --output {folder_output_name}', shell=True)           

    print(f"Suite finished in {time.time() - start_time:.2f} seconds")
    
def run_base_experiment_results():
    folder = "base_experiment_results"
    print(f'Running suite {folder}')
    start_time = time.time()

    
    for i in [0]:
        print('Running test with threads')
        #clear output directory
        
        folder_output_name = f'./scenarios/{folder}/results/thread_1/n_{i}'
        subprocess.call(f'python3 test.py --n_threads 1 --x_bins 1 --y_bins 1 --z_bins 500 --beam_on 10000 --output {folder_output_name} --save-results true --verbose true', shell=True)           

    print(f"Suite finished in {time.time() - start_time:.2f} seconds")
    
def run_base_experiment_1d_particles():
    n_threads = N_THREADS
    folder = "base_experiment_1d_particles"
    print(f'Running suite {folder}')
    start_time = time.time()

    for n_thread in n_threads:
        for particles in [1e2, 1e3, 1e4, 1e5, 1e6,1e7,1e8,1e9]:
            part = int(particles)
            print(f'Running test with {part} particles')
            
            for i in REPEAT:
                print(f'Running test with {n_thread} threads')
        
        
                #clear output directory
                
                folder_output_name = f'./scenarios/{folder}/results/particles_{part}/thread_{n_thread}/n_{i}'
                subprocess.call(f'python3 test.py --n_threads {n_thread} --x_bins 1 --y_bins 1 --z_bins 500 --beam_on {part} --output {folder_output_name}', shell=True)           

    print(f"Suite finished in {time.time() - start_time:.2f} seconds")
    
def run_base_experiment_bins():
    n_threads = [2]
    folder = "base_experiment_bins"
    print(f'Running suite {folder}')
    start_time = time.time()

    # gebaret gibs form one to 1000 by 100 like 1,100 ,200
    bins  = [ 1, 10, 100, 1000]

    for n_thread in n_threads:
        for z in bins:
            for y in bins:
                for x in bins:
                    z_bins = z
                    y_bins = y
                    x_bins = x
                    
                    if z_bins < y_bins or y_bins < x_bins or z_bins < x_bins:
                        continue
                    
                    print(f'Running test with {x_bins} {y_bins} {z_bins} bins')
                    
                    for i in REPEAT:
                        print(f'Running test with {n_thread} threads')
                        #clear output directory
                        
                        folder_output_name = f'./scenarios/{folder}/results/bins_{x_bins}_{y_bins}_{z_bins}/thread_{n_thread}/n_{i}'
                        subprocess.call(f'python3 test.py --n_threads {n_thread} --x_bins {x_bins} --y_bins {x_bins} --y_bins {z_bins} --beam_on 100000 --output {folder_output_name}', shell=True)           

    print(f"Suite finished in {time.time() - start_time:.2f} seconds")
    

def run_one_shot_bins():
    n_threads = [1,2]
    folder = "one_shot_bins"
    print(f'Running suite {folder}')
    start_time = time.time()

    # gebaret gibs form one to 1000 by 100 like 1,100 ,200
    bins  = [ 1, 10, 100, 1000]

    for n_thread in n_threads:
        for z in [1000]:
            for y in [1000]:
                for x in [100]:
                    z_bins = z
                    y_bins = y
                    x_bins = x
                    
                    if z_bins < y_bins or y_bins < x_bins or z_bins < x_bins:
                        continue
                    
                    print(f'Running test with {x_bins} {y_bins} {z_bins} bins')
                    
                    for i in REPEAT:
                        print(f'Running test with {n_thread} threads')
                        #clear output directory
                        
                        folder_output_name = f'./scenarios/{folder}/results/bins_{x_bins}_{y_bins}_{z_bins}/thread_{n_thread}/n_{i}'
                        subprocess.call(f'python3 test.py --n_threads {n_thread} --x_bins {x_bins} --y_bins {x_bins} --y_bins {z_bins} --beam_on 1 --output {folder_output_name}', shell=True)           

    print(f"Suite finished in {time.time() - start_time:.2f} seconds")

# for i in REPEAT:
#     run_empty_webpage("empty_webpage", i)

# for i in REPEAT:
#     run_memory_allocation("memory_allocation", i)

# for i in REPEAT:
#     run_memory_allocation("memory_allocation2", i)


# for i in REPEAT:
#     run_memory_allocation("files_linking", i)
    
for i in REPEAT:
    run_memory_allocation("empty_wasm", i)
    

# for i in REPEAT:
#     run_empty_webpage("memory_allocation3_with_profiler", i)

# for i in REPEAT:
#     run_memory_allocation4("memory_allocation4_n_times", i)

# for i in [0]:
#     run_memory_allocation("memory_allocation5", i)


# run_one_shot()

# run_base_experiment_1d_queue()

# run_base_experiment_1d_parallel()

# run_base_experiment_1d_particles()

# run_base_experiment_bins()

# run_base_experiment_results()

# run_one_shot_bins()

print(f"Main finished in {time.time() - start_main:.2f} seconds")
