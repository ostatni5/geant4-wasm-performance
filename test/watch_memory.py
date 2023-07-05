
import os
import time

while True:
    os.system("./ps_mem.py -p $(pgrep -d, -u $USER) >> memp.log")
    time.sleep(0.5)


