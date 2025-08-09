
CREATE TABLE ride_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(20),
    distance_km FLOAT,
    travel_time_min INT,
    location VARCHAR(100),
    fare FLOAT,
    date_recorded DATE
);

CREATE TABLE predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    platform VARCHAR(20),
    predicted_fare FLOAT,
    distance_km FLOAT,
    travel_time_min INT,
    location VARCHAR(100),
    prediction_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
