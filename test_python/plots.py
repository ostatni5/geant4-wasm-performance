from functools import reduce
from pandas import DataFrame
import pandas as pd
from matplotlib import legend, pyplot as plt
from data_parser import extract_data, extract_time, usage_data_from_file
import os
import tabulate


folder = "./test_python/output/"
name = "firefox"


def log_file(name):
    return f"{name}.usage.log"


def time_file(name):
    return f"{name}.time.log"


def load_avg_data(folder, name):

    sub_folders = [
        name for name in os.listdir(folder) if os.path.isdir(os.path.join(folder, name))
    ]

    # filter starting with n_
    sub_folders = [name for name in sub_folders if name.startswith("n_")]

    data = {}

    for sub_folder in sub_folders:
        data[sub_folder] = {}
        data[sub_folder]["usage"] = usage_data_from_file(
            f"{folder}/{sub_folder}/{name}.usage.log"
        )
        data[sub_folder]["time"] = extract_time(
            f"{folder}/{sub_folder}/{name}.time.log"
        )

    avg_data = {
        "usage": {
            "df": pd.DataFrame(),
            "metadata": {
                "start_time": 0,
            },
        },
        "time": {
            "result": {
                "timeStamps": pd.DataFrame(),
                "navigationTimestamp": 0,
            },
        },
    }

    for sub_folder in sub_folders:
        df, metadata = data[sub_folder]["usage"]
        full_time, result = data[sub_folder]["time"]

        avg_data["usage"]["df"] = pd.concat([avg_data["usage"]["df"], df])
        avg_data["usage"]["metadata"]["start_time"] += metadata["start_time"]

        for name, value in result["timeStamps"]:
            avg_data["time"]["result"]["timeStamps"] = pd.concat(
                [
                    avg_data["time"]["result"]["timeStamps"],
                    pd.DataFrame([(name, int(value))], columns=["name", "value"]),
                ]
            )

        avg_data["time"]["result"]["navigationTimestamp"] += result[
            "navigationTimestamp"
        ]

    # calucate avg for same time values
    avg_data["usage"]["df"] = (
        avg_data["usage"]["df"].groupby("Time").mean().reset_index().sort_values("Time")
    )
    # resample the data to 0.01  on time column
    # Convert 'Time' column to timedelta format
    avg_data["usage"]["df"]["Time"] = pd.to_timedelta(
        avg_data["usage"]["df"]["Time"], unit="s"
    )

    # Set 'Time' as the index and resample
    avg_data["usage"]["df"] = (
        avg_data["usage"]["df"].set_index("Time").resample("50L").mean().reset_index()
    )
    # convert time to back to float
    avg_data["usage"]["df"]["Time"] = avg_data["usage"]["df"]["Time"].dt.total_seconds()

    print(avg_data["usage"]["df"])

    avg_data["usage"]["metadata"]["start_time"] /= len(sub_folders)

    df_timestamps = (
        avg_data["time"]["result"]["timeStamps"]
        .groupby("name")
        .mean()
        .reset_index()
        .sort_values("value")
    )

    # covert df to list of tuples
    timestamps = [
        (name, value) for name, value in df_timestamps.itertuples(index=False)
    ]

    avg_data["time"]["result"]["timeStamps"] = timestamps

    avg_data["time"]["result"]["navigationTimestamp"] /= len(sub_folders)

    return avg_data


def load_full_data(folder, name):
    df, metadata = usage_data_from_file(folder + name + ".usage.log")
    full_time, result = extract_time(folder + name + ".time.log")

    return df, metadata, full_time, result


def plot_ram_events(folder, name):

    df, metadata = usage_data_from_file(folder + name + ".usage.log")
    full_time, result = extract_time(folder + name + ".time.log")

    navigationTimestamp: int = result["navigationTimestamp"]

    offset = navigationTimestamp - metadata["start_time"] * 1000
    timestamps: list[tuple[str, int]] = result["timeStamps"]

    events_with_labels = [
        (label, (timestamp + offset) / 1000) for label, timestamp in timestamps
    ]

    # show  timestamps on the plot

    # Create the figure and axes objects
    fig, ax = plt.subplots()

    # ax.zorder = 2
    # Plot the RAM usage
    ax.plot(
        df["Time"],
        df["Memory"],
        label="RAM usage",
    )

    ax.set_title("RAM usage over time")

    ax.set_xlabel("Time (s)")
    ax.set_ylabel("RAM (MB)")

    # draw cpu usage using moving aregare and max on window 10 in red opaicty 0.5 and values on right side below ram usage
    # ax2 = ax.twinx()
    # cpu_series = df["CPU"].rolling(window=200).mean()
    # ax2.plot(df["Time"], cpu_series, color="red", alpha=0.2, label="CPU usage")
    # ax2.set_ylabel("CPU (%)")
    # # set labels to nice red color
    # ax2.yaxis.label.set_color("red")
    # ax2.tick_params(axis="y", colors="red")

    colors = ["b", "g", "r", "c", "m", "y", "k", "#808080", "#00FF00", "#FF00FF"]
    # show events on the plot use dashed line and show name on the plot not in legend
    for i, (label, timestamp) in enumerate(events_with_labels):
        ax.axvline(
            x=timestamp, color=colors[i % len(colors)], linestyle="--", label=label
        )

    # plt.legend()
    # show grid
    ax.grid()

    # start y scale from 800
    if name == "firefox":
        ax.set_ylim(bottom=600)
        ax.set_xlim(left=1.5)
    elif name == "chromium":
        ax.set_ylim(bottom=300)
        ax.set_xlim(left=1.5)

    ax.legend()

    ax.set_title(f"RAM usage over time for {name}")

    plt.show()

    events_dict = {label: timestamp for label, timestamp in events_with_labels}

    def create_dataframe(start_time, end_time, df):
        data = df.loc[(df["Time"] >= start_time) & (df["Time"] <= end_time)]

        df = DataFrame(
            {
                "start_ram": [data["Memory"].iloc[0]],
                "end_ram": [data["Memory"].iloc[-1]],
                "max_ram": [data["Memory"].max()],
                "duration": [end_time - start_time],
            }
        )
        return df

    # display the data in a datafraem show max ram, start ram , end ram and duration use pandas create function

    # combine the dataframes with the name as column name
    combined_df = pd.concat(
        [
            create_dataframe(
                events_dict["startCompile"], events_dict["endCompile"], df
            ),
            create_dataframe(
                events_dict["startWorkers"], events_dict["endWorkers"], df
            ),
            create_dataframe(events_dict["endWorkers"], events_dict["end"], df),
        ],
        keys=["compile", "workers_init", "simulation"],
    )
    print(combined_df)


def draw_webworker_times(folder, name):

    full_time, result = extract_time(folder + name + ".time.log")

    data = result["times"]

    # Convert timestamps from milliseconds to seconds
    for entry in data:
        for key in entry:
            entry[key] /= 1000

    # Extract timestamps and durations
    timestamps = ["preClear", "preInit", "preRun", "end"]

    # Create figure and plot
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.set_title("Timeline of Series Durations")

    # Plot each entry
    for i, entry in enumerate(data):
        x_values = [entry[stage] for stage in timestamps]
        y_value = i
        ax.plot(x_values, [y_value] * len(x_values), "-o", label=str(i))

    # Annotate lines with series names
    for i, stage in enumerate(timestamps):
        # set on label above the line and one below the line

        for j, entry in enumerate(data):
            ax.text(
                entry[stage],
                j,
                stage,
                ha="center",
                va="bottom",
                rotation=45,
                fontsize=10,
            )

    # Remove y-axis and spines
    ax.yaxis.set_visible(False)
    ax.spines[["left", "top", "right"]].set_visible(False)
    ax.margins(y=0.1)

    plt.xlabel("Time")
    plt.legend()
    plt.show()


def draw_avg_webworker_events_on_ram(folder, name):
    metadata, time_ram_pairs, max_usage, start_time = extract_data(
        folder + name + ".usage.log"
    )
    full_time, result = extract_time(folder + name + ".time.log")

    data = result["times"]

    # Convert timestamps from milliseconds to seconds
    for entry in data:
        for key in entry:
            entry[key] /= 1000
            entry[key] -= start_time

    timestamps = ["preClear", "preInit", "preRun", "end"]

    # calculate average time for each stage
    avg_times = {}
    for stage in timestamps:
        avg_times[stage] = sum([entry[stage] for entry in data]) / len(data)

    # Create the figure and axes objects
    fig, ax = plt.subplots()

    # Plot the RAM usage
    ax.plot(
        [time for time, _ in time_ram_pairs],
        [ram for _, ram in time_ram_pairs],
        label="RAM usage",
    )

    # Plot each entry
    for stage in timestamps:
        ax.axvline(x=avg_times[stage], color="r", linestyle=":", label=stage)

    ax.legend()

    plt.show()


# plot_ram_events(folder, "chromium")
# plot_ram_events(folder, name)

# draw_avg_webworker_events_on_ram(folder, "chromium")
# draw_avg_webworker_events_on_ram(folder, name)

# plot_ram_events(
#     "test_python/scenarios/base_experiment_1d_parallel/results/thread_12/n_0/", name
# )

# draw_webworker_times(
#     "test_python/scenarios/base_experiment_1d_parallel/results/thread_12/n_0/", name
# )

# plot_ram_events(
#     "test_python/scenarios/base_experiment_bins/results/bins_100_100_1000/thread_1/n_0/",
#     name,
# )


def plot_threads(folder):
    names_browser = ["chromium", "firefox"]
    names_native = ["native-multithread"]

    sub_folders = [
        name for name in os.listdir(folder) if os.path.isdir(os.path.join(folder, name))
    ]

    names = names_browser + names_native

    data = {}

    for sub_folder in sub_folders:
        data[sub_folder] = {}
        for name in names:
            df, metadata, full_time, result = load_full_data(
                f"{folder}/{sub_folder}/n_0/", name
            )

            max_ram = df["Memory"].max()
            time_run = result["total"] / 1000.0
            workers_init = result.get("workersInit", 0) / 1000.0

            data[sub_folder][name] = {
                "max_ram": max_ram,
                "time_run": time_run,
                "workers_init": workers_init,
            }

    # sort the sub_folders
    sub_folders.sort(key=lambda x: int(x.split("_")[1]))
    print(sub_folders)
    print(data)

    # Plot max ram usage for  how many threads were used
    # use bar plot and print vale on top of the bar
    # bars should be grouped by number of threads

    fig, ax = plt.subplots()
    ax.grid()
    width = 0.2
    x = range(len(sub_folders))
    for i, name in enumerate(names):
        max_ram = [data[sub_folder][name]["max_ram"] for sub_folder in sub_folders]
        ax.bar(
            [pos + width * i for pos in x],
            max_ram,
            width,
            label=name,
        )

        for pos, value in zip(x, max_ram):
            ax.text(pos + width * i, value, str(int(value)), ha="center", va="bottom")

    ax.set_xticks([pos + width for pos in x])
    ax.set_xticklabels(sub_folders)
    ax.legend()

    ax.set_title("Max RAM usage for different number of threads")
    ax.set_xlabel("Number of threads")
    ax.set_ylabel("Max RAM (MB)")
    plt.show()

    # plot time run for different number of threads as plat also show workers init time on the plot

    fig, ax = plt.subplots()
    plt.grid()
    width = 0.2
    x = range(len(sub_folders))

    for i, name in enumerate(names):
        time_run = [data[sub_folder][name]["time_run"] for sub_folder in sub_folders]
        workers_init = [
            data[sub_folder][name]["workers_init"] for sub_folder in sub_folders
        ]
        ax.bar(
            [pos + width * i for pos in x],
            time_run,
            width,
            label=name,
        )

        for pos, value in zip(x, time_run):
            ax.text(pos + width * i, value, f"{value:.1f}", ha="center", va="bottom")

        if name in names_browser:
            ax.bar(
                [pos + width * i for pos in x],
                workers_init,
                width,
                label=f"{name} workers init",
            )

            for pos, value in zip(x, workers_init):
                ax.text(
                    pos + width * i, value, f"{value:.1f}", ha="center", va="bottom"
                )

    ax.set_xticks([pos + width for pos in x])
    ax.set_xticklabels(sub_folders)
    ax.legend()

    ax.set_title("Time run for different number of threads")
    ax.set_xlabel("Number of threads")
    ax.set_ylabel("Time (s)")
    plt.show()


# plot_threads("test_python/scenarios/one_shot/results")

# plot_ram_events(
#     "test_python/scenarios/one_shot/results/thread_1/n_2/",
#     "firefox",
# )

# plot_ram_events(
#     "test_python/scenarios/one_shot/results/thread_1/n_2/",
#     "chromium",
# )


def plot_by_particles():
    folder = "test_python/scenarios/base_experiment_1d_particles/results"
    names_browser = ["chromium", "firefox"]
    names_native = ["native-multithread"]

    names = names_browser + names_native

    particles_sub_folders = [
        "particles_1",
        "particles_10",
        "particles_100",
        "particles_1000",
        "particles_10000",
        "particles_100000",
        # "particles_1000000",
    ]

    threads_sub_folders = ["thread_1", "thread_2", "thread_4", "thread_8", "thread_12"]

    data = {}

    for sub_folder in particles_sub_folders:
        data[sub_folder] = {}
        for thread_sub_folder in threads_sub_folders:
            data[sub_folder][thread_sub_folder] = {}

            for name in names:
                df, metadata, full_time, result = load_full_data(
                    f"{folder}/{sub_folder}/{thread_sub_folder}/n_0/", name
                )

                max_ram = df["Memory"].max()
                time_run = result["total"] / 1000.0
                workers_init = result.get("workersInit", 0) / 1000.0

                data[sub_folder][thread_sub_folder][name] = {
                    "max_ram": max_ram,
                    "time_run": time_run,
                    "workers_init": workers_init,
                }

    # show data on y axis time on x axis number of particles for thread_1 use line plot

    fig, ax = plt.subplots()
    plt.grid()
    particles = [1, 10, 100, 1000, 10000, 100000]
    x = range(len(particles))

    for i, name in enumerate(names):
        time_run = [
            data[sub_folder]["thread_1"][name]["time_run"]
            for sub_folder in particles_sub_folders
        ]
        ax.plot(x, time_run, label=name)

    ax.set_xticks(x)
    ax.set_xticklabels(particles)
    ax.legend()

    ax.set_title("Time run for different number of particles")
    ax.set_xlabel("Number of particles")
    ax.set_ylabel("Time (s)")

    table = []
    for sub_folder in particles_sub_folders:
        row = [sub_folder]
        for name in names:
            row.append(data[sub_folder]["thread_1"][name]["time_run"])
        table.append(row)
    print(tabulate.tabulate(table, headers=["Particles"] + names))

    plt.show()

    # show speedup for number of threads for particles_1000000

    # fig, ax = plt.subplots()
    # plt.grid()
    # threads = [2, 4, 8, 12]
    # x = range(len(threads))

    # for i, name in enumerate(names):
    #     time_run = [
    #         data["particles_1000000"]["thread_" + str(thread)][name]["time_run"]
    #         for thread in threads
    #     ]
    #     ax.plot(x, time_run, label=name)

    # ax.set_xticks(x)
    # ax.set_xticklabels(threads)
    # ax.legend()

    # ax.set_title("Time run for different number of threads")
    # ax.set_xlabel("Number of threads")
    # ax.set_ylabel("Time (s)")

    # table = []
    # for thread in threads:
    #     row = [thread]
    #     for name in names:
    #         row.append(
    #             data["particles_1000000"]["thread_" + str(thread)][name]["time_run"]
    #         )
    #     table.append(row)
    # print(tabulate.tabulate(table, headers=["Threads"] + names))

    # plt.show()

    # # calculate speedup for particles_1000000
    # speedup = {}
    # ideal_speedup = [2, 4, 8, 12]  # Ideal speedup line for comparison
    # for name in names:
    #     time_run = [
    #         data["particles_1000000"]["thread_" + str(thread)][name]["time_run"]
    #         for thread in threads
    #     ]
    #     speedup[name] = [time_run[0] / time * 2 for time in time_run]
    # fig, ax = plt.subplots()
    # plt.grid()
    # for i, name in enumerate(names):
    #     x = threads[i]
    #     label = name
    #     ax.plot(threads, speedup[name], label=label)

    # ax.plot(
    #     threads, ideal_speedup, linestyle="--", color="black", label="Ideal Speedup"
    # )

    # ax.set_xticks(threads)
    # ax.legend()
    # ax.set_title("Speedup for different number of threads")
    # ax.set_xlabel("Number of threads")
    # ax.set_ylabel("Speedup")
    # plt.show()


# plot_by_particles()


def plot_bins():
    folder = "test_python/scenarios/base_experiment_bins/results"

    names_browser = ["chromium", "firefox"]
    names_native = ["native-multithread"]

    names = names_browser + names_native

    sub_folders = [
        name for name in os.listdir(folder) if os.path.isdir(os.path.join(folder, name))
    ]

    def bin_name_to_number(bin_name):
        # premove the prefix bins_
        name = bin_name[5:]

        # split the name by _ and return multiplication of all 3 numbers
        return reduce(lambda x, y: x * y, [int(x) for x in name.split("_")])

    threads_sub_folders = ["thread_1"]

    data = {}

    for sub_folder in sub_folders:
        data[bin_name_to_number(sub_folder)] = {}
        for name in names:
            df, metadata, full_time, result = load_full_data(
                f"{folder}/{sub_folder}/thread_1/n_0/", name
            )

            max_ram = df["Memory"].max()
            time_run = result["total"] / 1000.0
            workers_init = result.get("workersInit", 0) / 1000.0

            data[bin_name_to_number(sub_folder)][name] = {
                "max_ram": max_ram,
                "time_run": time_run,
                "workers_init": workers_init,
            }

    # show data on y axis time on x axis count of bins

    fig, ax = plt.subplots()
    plt.grid()
    bins = sorted(data.keys())
    x = range(len(bins))

    for i, name in enumerate(names):
        time_run = [data[bin][name]["time_run"] for bin in bins]
        ax.plot(x, time_run, label=name)

    # show log scale on y axis

    ax.set_yscale("log")

    ax.set_xticks(x)
    ax.set_xticklabels(bins, rotation=45, ha="right")

    # custom x axis labels
    ax.set_xticklabels([f"{bin:.0e}" for bin in bins])

    ax.legend()

    ax.set_title("Time run for different number of bins")
    ax.set_xlabel("Number of bins")
    ax.set_ylabel("Time (s)")

    table = []
    for bin in bins:
        row = [bin]
        for name in names:
            row.append(data[bin][name]["time_run"])
        table.append(row)
    print(tabulate.tabulate(table, headers=["Bins"] + names))

    plt.show()

    # show max ram usage for different number of bins

    fig, ax = plt.subplots()
    plt.grid()
    bins = sorted(data.keys())
    x = range(len(bins))

    for i, name in enumerate(names):
        max_ram = [data[bin][name]["max_ram"] for bin in bins]
        ax.plot(x, max_ram, label=name)

    ax.set_xticks(x)
    ax.set_xticklabels(bins, rotation=45, ha="right")

    # custom x axis labels
    ax.set_xticklabels([f"{bin:.0e}" for bin in bins])

    ax.legend()

    ax.set_title("Max RAM usage for different number of bins")
    ax.set_xlabel("Number of bins")
    ax.set_ylabel("Max RAM (MB)")

    table = []
    for bin in bins:
        row = [bin]
        for name in names:
            row.append(data[bin][name]["max_ram"])
        table.append(row)

    print(tabulate.tabulate(table, headers=["Bins"] + names))

    plt.show()


# plot_bins()
def draw_ram():
    fig, ax = plt.subplots()

    df_empty_page, _ = usage_data_from_file(
        "test_python/scenarios/empty_webpage/results/n_0/firefox.usage.log"
    )

    df_empty_wasm, _ = usage_data_from_file(
        "test_python/scenarios/empty_wasm/results/n_0/firefox.usage.log"
    )

    # drop last 0.2 seconds
    df_empty_page = df_empty_page[
        df_empty_page["Time"] < df_empty_page["Time"].max() - 0.2
    ]
    df_empty_wasm = df_empty_wasm[
        df_empty_wasm["Time"] < df_empty_wasm["Time"].max() - 0.2
    ]

    # resample the data to 0.01  on time column
    # Convert 'Time' column to timedelta format
    df_empty_page["Time"] = pd.to_timedelta(df_empty_page["Time"], unit="s")
    df_empty_wasm["Time"] = pd.to_timedelta(df_empty_wasm["Time"], unit="s")

    # Set 'Time' as the index and resample
    df_empty_page = df_empty_page.set_index("Time").resample("50L").mean().reset_index()
    df_empty_wasm = df_empty_wasm.set_index("Time").resample("50L").mean().reset_index()

    # convert time to back to float
    df_empty_page["Time"] = df_empty_page["Time"].dt.total_seconds()
    df_empty_wasm["Time"] = df_empty_wasm["Time"].dt.total_seconds()
    # plot the empty page and empty wasm
    ax.plot(df_empty_page["Time"], df_empty_page["Memory"], label="Empty page")
    ax.plot(df_empty_wasm["Time"], df_empty_wasm["Memory"], label="Empty wasm")

    # calcuate diffrence between empty page and empty wasm on "Memory" column
    df_diff = df_empty_wasm.copy()
    df_diff["Memory"] = df_empty_wasm["Memory"] - df_empty_page["Memory"]

    # plot the diffrence
    ax.plot(df_diff["Time"], df_diff["Memory"], label="Empty page - Empty wasm")

    ax.set_title("RAM usage difference between empty page and empty wasm")
    ax.set_xlabel("Time (s)")
    ax.set_ylabel("RAM (MB)")

    plt.show()


draw_ram()
