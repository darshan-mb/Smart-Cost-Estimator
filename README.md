# Smart Cost Estimator

## Project Overview  
Smart Cost Estimator is a machine learning-based web application that predicts and compares ride costs across popular ride-hailing services like Namma Yatri, Uber, and Ola. It uses historical fare data stored in an SQL database and factors such as distance, time, and location to provide users with accurate and real-time cost estimates. The system helps users select the most economical ride option through a dynamic React.js frontend integrated with a Python Flask backend.

## Objectives  
- Predict ride costs accurately based on multiple influencing factors (distance, time, location).  
- Compare prices across different ride providers to help users find the best deal.  
- Store and manage historical fare data efficiently using SQL for analysis and model training.  
- Provide a user-friendly interface with real-time interaction for seamless user experience.  
- Enable scalability and integration for future ride providers or data features.

## Tech Stack  
- **Backend:** Python, Flask, scikit-learn, Pandas, NumPy  
- **Frontend:** React.js, Tailwind CSS, Axios  
- **Database:** MySQL (SQL) for storing historical fare data  
- **Others:** REST API for communication between frontend and backend  

## Project Workflow  
1. **Data Collection & Storage:** Historical ride fare data is collected and stored in a MySQL database.  
2. **Model Training:** Machine learning model is trained on this data to learn price patterns based on distance, time, and location.  
3. **API Development:** Flask backend exposes APIs that receive ride parameters and return predicted costs from each provider.  
4. **Frontend Interaction:** React frontend sends user inputs (distance, time, location) to the backend and displays predicted costs dynamically.  
5. **Comparison & Insights:** Users view side-by-side fare comparisons and choose the cheapest or preferred option.  

## Key Insights Provided  
- Accurate price prediction for rides from different providers.  
- Real-time comparison enabling cost-effective decision-making.  
- Historical fare trends for better understanding of price fluctuations.  
- Interactive UI showing how factors affect ride costs.

## How to Run  
1. Clone the repository:  
```bash
git clone <repo-url>
cd smart-cost-estimator
```
2. **Backend Setup:**  
- Navigate to backend folder.  
- Install dependencies:  
```bash
pip install -r requirements.txt
```
- Configure your MySQL database connection in the backend config file.  
- Run the Flask app:  
```bash
python app.py
```

3. **Frontend Setup:**  
- Navigate to frontend folder.  
- Install dependencies:  
```bash
npm install
```
- Start the React app:  
```bash
npm start
```

4. Open your browser at `http://localhost:3000` to use the app.

## Future Enhancements  
- Integrate more ride providers for wider cost comparison.  
- Add user authentication to save favorite rides and past searches.  
- Incorporate dynamic traffic and weather data to improve prediction accuracy.  
- Enable multi-city support with localized pricing models.  
- Add a mobile app version for on-the-go usage.  
- Implement feedback system to improve model with user corrections.
