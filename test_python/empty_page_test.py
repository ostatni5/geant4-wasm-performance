#!/usr/bin/env python
# coding: utf-8

# In[1]:


from platform_utils import print_info

print_info()


# In[2]:


get_ipython().run_line_magic("pip", "install matplotlib")
get_ipython().run_line_magic("pip", "install numpy")
get_ipython().run_line_magic("pip", "install selenium")
get_ipython().run_line_magic("pip", "install psrecord")
get_ipython().run_line_magic("pip", "install pandas")


# In[3]:


# run web server in separate thread

import subprocess
import os

server_cmd = "python3 -m http.server 5500"

server = subprocess.Popen(server_cmd.split(), cwd=os.getcwd())


# In[4]:


import time


# create results directory
os.makedirs("./empty_page/output", exist_ok=True)


from selenium_utils import create_firefox_driver, create_chromium_driver


def execute_test(driver, name):
    log_name = name.lower()
    subprocess.Popen(
        f"psrecord {driver.service.process.pid} --log ./empty_page/output/{log_name}.usage.log --include-children".split(
            " "
        )
    )

    driver.set_script_timeout(30)
    driver.get("http://127.0.0.1:5500/empty_page/empty.html")

    # wait 10s
    time.sleep(30)

    driver.close()


execute_test(create_firefox_driver(), "firefox")

execute_test(create_chromium_driver(), "chromium")


# In[5]:


server.kill()
