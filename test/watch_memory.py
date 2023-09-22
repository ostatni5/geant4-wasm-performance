import os
import time
import argparse

parser = argparse.ArgumentParser()

parser.add_argument("-t", "--timeout", type=float, default=0.1)
parser.add_argument("-l", "--log_file", type=str, default="memory.log")
parser.add_argument("-n", "--name", type=str, default="Name of series")

args = parser.parse_args()

start_time = time.time()
os.system(
    f"echo name={args.name} log_file={args.log_file} timeout={args.timeout} start_time={start_time} > {args.log_file}"
)

while True:
    # print timestamp only time in seconds from start of epoch
    os.system(f"echo {time.time() - start_time} >> {args.log_file}")
    os.system(f"./ps_mem.py -p $(pgrep -d, -u $USER) >> {args.log_file}")
    time.sleep(args.timeout)

    # kill program on SIGINT
