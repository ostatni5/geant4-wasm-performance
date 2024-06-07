import csv
import json
import matplotlib.pyplot as plt


# parse json config form config.txt
def parse_config(file):
    with open(file, "r") as f:
        return json.loads(f.read())  # noqa: F821


config = parse_config(
    "./scenarios/base_experiment_results/results/thread_1/n_0/config.txt"
)


def plot_files(file1, file2):
    fig, ax = plt.subplots()

    def read_file(file):
        with open(file, "r") as f:
            data = csv.reader(f)

            # skip 3 lines
            for _ in range(3):
                next(data)

            iZ_values = []
            total_values = []
            for line in data:
                iZ_values.append(int(line[2]))
                total_values.append(float(line[3]))

            return iZ_values, total_values

    iZ_values, total_values = read_file(file1)

    ax.plot(iZ_values, total_values, label="chromium")

    iZ_values, total_values = read_file(file2)
    ax.plot(iZ_values, total_values, label="native", linestyle=":")

    # format x ticks to be from -50 to 50, now thye are 0-99
    x_ticks = ax.get_xticks()

    ax.set_xticklabels([str(int(x) - 50) for x in x_ticks])
    # alywys show 0 label

    ax.set_xlabel("Axis Z [mm]")
    ax.set_ylabel("total(value) [MeV]")
    ax.legend()
    plt.show()


# compare browser results
file1 = "./scenarios/base_experiment_results/results/thread_1/n_0/chromium-0-eDep.txt"
file2 = "./scenarios/base_experiment_results/results/thread_1/n_0/firefox-0-eDep.txt"


print("Compare chromium results with native")
plot_files(
    file1, "./scenarios/base_experiment_results/results/thread_1/n_0/native-eDep.txt"
)
