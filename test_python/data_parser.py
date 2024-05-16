import re
import json
from tracemalloc import start


def extract_data(file_path):
    metadata = {}

    with open(file_path, "r") as file:
        lines = file.readlines()

    lines = lines[1:]

    def convert_to_tuple(line):
        values = line.split()
        try:
            return (float(values[1]), float(values[3]))
        except:
            print("Error parsing line", line, file_path)
            raise ValueError

    time_data_tuples = [convert_to_tuple(line) for line in lines]
    max_usage = max([pair[1] for pair in time_data_tuples])
    start_time = float(lines[0].split()[0])

    return metadata, time_data_tuples, max_usage, start_time


def extract_time(file_path) -> tuple[float, dict]:
    with open(file_path, "r") as file:
        lines = file.readlines()

    result = None

    if len(lines) == 2:
        result = json.loads(lines[1])

    return float(lines[0]), result
