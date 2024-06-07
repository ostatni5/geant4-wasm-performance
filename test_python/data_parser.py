import json
import pandas as pd


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


# convert this kind of data to df from file
# Timestamp   Elapsed time   CPU (%)     Real (MB)   Virtual (MB)
# 1716033718.286        0.000        0.000      338.922  3284499.703
def usage_data_from_file(file):
    df = pd.read_csv(file, delim_whitespace=True, skiprows=1, header=None)

    # set headers
    df.columns = ["Timestamp", "Time", "CPU", "Memory", "Memory_Virtual"]
    # print(df)
    common = {
        "start_time": df["Timestamp"].iloc[0],
        "max_memory": df["Memory"].max(),
    }
    return df, common
