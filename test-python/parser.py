import re


def convert_ram_to_mib(ram_value, ram_unit):
    if ram_unit == "MiB":
        return ram_value
    elif ram_unit == "GiB":
        return ram_value * 1024
    elif ram_unit == "TiB":
        return ram_value * 1024 * 1024
    elif ram_unit == "KiB":
        return ram_value / 1024
    elif ram_unit == "B":
        return ram_value / 1024 / 1024


def extract_data(file_path):
    metadata = {}
    time_ram_pairs = [(0, 0)]

    with open(file_path, "r") as file:
        lines = file.readlines()

    # extracting metadata from the first line
    for data in lines[0].split():
        key, value = data.split("=")
        metadata[key] = value

    program_name, total_ram = None, None
    i = 1
    while i < len(lines):
        if lines[i].startswith("time:"):
            time_value = float(re.search(r"[\d\.]+", lines[i]).group())
            if i + 1 < len(lines) and not lines[i + 1].startswith("time:"):
                ram_line = lines[i + 1]

                # extract ram value and unit from line like:
                # "64.0 MiB +  92.4 MiB = 156.5 MiB	chrome (7)"

                ram_value, ram_unit = re.search(
                    r"= +([\d\.]+) ([a-zA-Z]+)", ram_line
                ).group(1, 2)
                ram_value = float(ram_value)
                ram_value = convert_ram_to_mib(ram_value, ram_unit)

                # extract program name

                program_name = ram_line.split("\t")[-1].strip().split(" ")[0]

                time_ram_pairs.append((time_value, ram_value))

                i += 3

        i += 1

    if program_name is not None:
        metadata["program_name"] = program_name

    return metadata, time_ram_pairs
