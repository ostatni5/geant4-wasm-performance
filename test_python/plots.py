from matplotlib import pyplot as plt
from numpy import rec
from data_parser import extract_data, extract_time

folder = "./test_python/output/"
name = "firefox"


def plot_ram_events(folder, name):
    metadata, time_ram_pairs, max_usage, start_time = extract_data(
        folder + name + ".usage.log"
    )
    full_time, result = extract_time(folder + name + ".time.log")

    navigationTimestamp: int = result["navigationTimestamp"]

    offset = start_time * 1000 - navigationTimestamp

    timestamps: list[tuple[str, int]] = result["timeStamps"]

    events_with_labels = [
        (label, (timestamp + offset) / 1000) for label, timestamp in timestamps
    ]

    # show  timestamps on the plot

    # Create the figure and axes objects
    fig, ax = plt.subplots()

    # Plot the RAM usage
    ax.plot(
        [time for time, _ in time_ram_pairs],
        [ram for _, ram in time_ram_pairs],
        label="RAM usage",
    )

    colors = ["b", "g", "r", "c", "m", "y", "k", "#808080", "#00FF00", "#FF00FF"]
    # show events on the plot use dashed line and show name on the plot not in legend
    for i, (label, timestamp) in enumerate(events_with_labels):
        ax.axvline(
            x=timestamp, color=colors[i % len(colors)], linestyle="--", label=label
        )

    ax.legend()
    plt.show()


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
        ax.plot(x_values, [y_value] * len(x_values), "-o", label=str(entry))

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
    # plt.legend()
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
draw_avg_webworker_events_on_ram(folder, name)
