import re
import json


def extract_data(file_path):
    metadata = {}
    time_ram_pairs = [(0, 0)]

    with open(file_path, "r") as file:
        lines = file.readlines()

    lines = lines[1:]

    def convert_to_tuple(line):
        values = line.split()
        return (float(values[0]), float(values[2]))

    time_data_tuples = [convert_to_tuple(line) for line in lines]
    max_usage = max([pair[1] for pair in time_data_tuples])

    return metadata, time_data_tuples, max_usage


def extract_time(file_path):
    with open(file_path, "r") as file:
        lines = file.readlines()

    result = None

    if len(lines) == 2:
        result = json.loads(lines[1])

    return float(lines[0]), result
