import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt
from haversine import haversine, Unit

# STEP 1: Load all CSVs
ola_df = pd.read_csv("C:/Cost Price Analysis App/Backend/data/combined_sheets.csv")
uber_df = pd.read_csv("C:/Cost Price Analysis App/Backend/data/uber.csv/uber_copy.csv")
cab_df = pd.read_csv("C:/Cost Price Analysis App/Backend/data/cab.csv/cab_copy.csv")

# STEP 2: Normalize column names
ola_df.columns = ola_df.columns.str.strip().str.lower().str.replace(' ', '_')
uber_df.columns = uber_df.columns.str.strip().str.lower().str.replace(' ', '_')

# STEP 3: Clean Ola fare
ola_df['fare'] = ola_df['fare'].replace('[₹,]', '', regex=True).astype(float)
average_distance_ola = ola_df['distance'].mean()
ola_avg_fare = ola_df['fare'].mean() / average_distance_ola

# STEP 4: Clean Namma Yatri fare
cab_df['fare_amount'] = pd.to_numeric(cab_df['fare_amount'], errors='coerce')
cab_df = cab_df.dropna(subset=['fare_amount']) # Remove NaNs in fare
cab_df = cab_df[cab_df['fare_amount'] > 0] # Keep only positive fares

# Filter out rows with invalid latitude or longitude
cab_df = cab_df[
    (cab_df['pickup_latitude'].between(-90, 90)) &
    (cab_df['pickup_longitude'].between(-180, 180)) &
    (cab_df['dropoff_latitude'].between(-90, 90)) &
    (cab_df['dropoff_longitude'].between(-180, 180))
]

# Function to compute haversine distance
def calculate_distance(row):
    pickup = (row['pickup_latitude'], row['pickup_longitude'])
    dropoff = (row['dropoff_latitude'], row['dropoff_longitude'])
    return haversine(pickup, dropoff, unit=Unit.KILOMETERS)

# Apply function to compute distance for each row
cab_df['distance_km'] = cab_df.apply(calculate_distance, axis=1)

# Compute average distance
average_distance_namma = cab_df['distance_km'].mean()

# STEP 5: Clean Uber data
uber_df = uber_df.dropna(subset=['fare_amount'])
uber_df['fare_amount'] = pd.to_numeric(uber_df['fare_amount'], errors='coerce')
uber_df = uber_df[uber_df['fare_amount'] > 0]
uber_df = uber_df.ffill().bfill()
uber_df['pickup_datetime'] = pd.to_datetime(uber_df['pickup_datetime'], errors='coerce')
# Filter out rows with invalid latitude or longitude
uber_df = uber_df[
    (uber_df['pickup_latitude'].between(-90, 90)) &
    (uber_df['pickup_longitude'].between(-180, 180)) &
    (uber_df['dropoff_latitude'].between(-90, 90)) &
    (uber_df['dropoff_longitude'].between(-180, 180))
]

# Function to compute haversine distance
def calculate_distance(row):
    pickup = (row['pickup_latitude'], row['pickup_longitude'])
    dropoff = (row['dropoff_latitude'], row['dropoff_longitude'])
    return haversine(pickup, dropoff, unit=Unit.KILOMETERS)

# Apply function to compute distance for each row
uber_df['distance_km'] = uber_df.apply(calculate_distance, axis=1)

# Compute average distance
average_distance_uber = uber_df['distance_km'].mean()

# Remove fare outliers using Z-score
z = np.abs(stats.zscore(uber_df[['fare_amount']]))
uber_df = uber_df[(z < 3).all(axis=1)]
uber_avg_fare = uber_df['fare_amount'].mean()
uber_avg_fare = uber_avg_fare * 83 / average_distance_uber


z_scores = np.abs(stats.zscore(cab_df[['fare_amount']]))
cab_df = cab_df[(z_scores < 3).all(axis=1)]
namma_avg_fare = cab_df['fare_amount'].mean()
namma_avg_fare = namma_avg_fare * 83 / average_distance_namma

print()
print()
print('Avarage Ola distance : ',average_distance_ola)
print('Avarage Uber distance : ',average_distance_uber)
print('Avarage Namma Yatri distance : ',average_distance_namma)
print()
print()
print('Avarage Ola fare : ',ola_avg_fare)
print('Avarage Uber fare : ',uber_avg_fare)
print('Avarage Namma Yatri fare : ',namma_avg_fare)


# STEP 6: Plot all 3
platforms = ['Ola', 'Uber', 'Namma Yatri']
fares = [namma_avg_fare, uber_avg_fare, ola_avg_fare]

plt.figure(figsize=(9, 5))
bars = plt.bar(platforms, fares, color=['skyblue', 'orange', 'lightgreen'])
plt.ylabel('Average Fare per Km (₹)')
plt.title('Cost Price Analysis: Ola vs Namma Yatri vs Uber')

# Add value labels
for bar in bars:
    yval = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2.0, yval + 2, f'₹{yval:.2f}', ha='center', va='bottom')

plt.ylim(0, max(fares) * 1.2)
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout()
plt.show()