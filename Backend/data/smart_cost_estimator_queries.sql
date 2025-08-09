
-- Fetch data for training
SELECT distance_km, travel_time_min, location, fare, platform
FROM ride_data;

-- Insert new prediction
INSERT INTO predictions (platform, predicted_fare, distance_km, travel_time_min, location)
VALUES ('Uber', 245.50, 12.5, 25, 'Bangalore');

-- Get latest predictions
SELECT * FROM predictions ORDER BY prediction_time DESC LIMIT 10;
