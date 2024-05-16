import pandas as pd
import random
from datetime import timedelta
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# List of Event Labels
event_list = [
    "startCompiling",
    "endCompiling",
    "startRunning",
    "endRunning",
    "startDebugging",
    "endDebugging",
    "startTesting",
    "endTesting",
    "startDeploying",
    "endDeploying",
]


# Function to generate random datetime
def random_date(start, end):
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds()))
    )


start_date = pd.to_datetime("2020-01-01 00:00:00")
end_date = pd.to_datetime("2020-01-01 00:00:30")

timestamps = pd.date_range(
    start_date, end_date, periods=10000
)  # creating 10000 timestamps

# Generate ram_usage that has a general increasing trend plus some sinusoidal noise and spikes
ram_usage = np.linspace(0, 100, 10000) + np.sin(np.linspace(0, 10, 10000)) * 10

events = [None] * 10000  # initially no events

# randomly pick 10 timestamps to fire events
event_timestamps = random.sample(range(10000), 10)

for timestamp in event_timestamps:
    events[timestamp] = random.choice(event_list)

df = pd.DataFrame({"Timestamp": timestamps, "RAM_usage": ram_usage, "Event": events})

# Set the style of seaborn
sns.set()

# Create the figure and axes objects
fig, ax = plt.subplots()

# Plot the RAM usage
sns.lineplot(x="Timestamp", y="RAM_usage", data=df, ax=ax)

# Iterate over the DataFrame rows
for idx, row in df.iterrows():
    if pd.notna(row["Event"]):
        # Add vertical line for each event
        ax.axvline(x=row["Timestamp"], color="r")
        ax.text(
            row["Timestamp"],
            df["RAM_usage"].min(),
            row["Event"],
            rotation=90,
            verticalalignment="bottom",
        )

plt.title("RAM Usage Over Time")
plt.xlabel("Timestamp")
plt.ylabel("RAM Usage (%)")

# Best fit for the labels
plt.tight_layout()

# Show the plot
plt.show()
