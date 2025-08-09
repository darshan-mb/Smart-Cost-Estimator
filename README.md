# Smart-Cost-Estimator using ML
This ML project predicts and compares ride costs for Namma Yatri, Uber, and Ola using distance, time, and location. It analyzes historical fare data stored in SQL, applies predictive algorithms, and presents results via a React web app with dynamic UI for real-time cost insights.

##Project Overview
Smart Cost Estimator is a machine learning-based web application that predicts and compares ride costs across popular ride-hailing services like Namma Yatri, Uber, and Ola. It uses historical fare data stored in an SQL database and factors such as distance, time, and location to provide users with accurate and real-time cost estimates. The system helps users select the most economical ride option through a dynamic React.js frontend integrated with a Python Flask backend.

##Objectives
Predict ride costs accurately based on multiple influencing factors (distance, time, location).

Compare prices across different ride providers to help users find the best deal.

Store and manage historical fare data efficiently using SQL for analysis and model training.

Provide a user-friendly interface with real-time interaction for seamless user experience.

Enable scalability and integration for future ride providers or data features.

##Tech Stack
Backend: Python, Flask, scikit-learn, Pandas, NumPy

Frontend: React.js, Tailwind CSS, Axios

Database: MySQL (SQL) for storing historical fare data

Others: REST API for communication between frontend and backend

##Project Workflow
Data Collection & Storage: Historical ride fare data is collected and stored in a MySQL database.

Model Training: Machine learning model is trained on this data to learn price patterns based on distance, time, and location.

API Development: Flask backend exposes APIs that receive ride parameters and return predicted costs from each provider.

Frontend Interaction: React frontend sends user inputs (distance, time, location) to the backend and displays predicted costs dynamically.

Comparison & Insights: Users view side-by-side fare comparisons and choose the cheapest or preferred option.

##Key Insights Provided
Accurate price prediction for rides from different providers.

Real-time comparison enabling cost-effective decision-making.

Historical fare trends for better understanding of price fluctuations.

Interactive UI showing how factors affect ride costs.




