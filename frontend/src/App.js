import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [weights, setWeights] = useState([]);
  const [loadingWeights, setLoadingWeights] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Fetch all weights from database
  const fetchWeights = async () => {
    setLoadingWeights(true);
    try {
      const response = await fetch(`${apiUrl}/weights`);
      const data = await response.json();
      setWeights(data.weights || []);
    } catch (error) {
      console.error('Error fetching weights:', error);
    } finally {
      setLoadingWeights(false);
    }
  };

  // Fetch weights on component mount
  useEffect(() => {
    fetchWeights();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!weight || isNaN(weight) || parseFloat(weight) <= 0) {
      setMessage('Please enter a valid weight');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/?weight=${encodeURIComponent(weight)}`);
      const data = await response.json();
      setMessage(data.message);
      setWeight(''); // Clear input field
      
      // Refresh the weights list
      await fetchWeights();
    } catch (error) {
      setMessage('Error connecting to API');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all weight entries?')) {
      return;
    }

    try {
      await fetch(`${apiUrl}/weights`, { method: 'DELETE' });
      setMessage('All weight entries cleared!');
      await fetchWeights();
    } catch (error) {
      setMessage('Error clearing weights');
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weight Tracker</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="weightInput">Enter your weight (kg): </label>
          <input
            id="weightInput"
            type="number"
            step="0.1"
            placeholder="Enter weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Weight'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}

        <div className="names-section">
          <div className="names-header">
            <h2>Weight History</h2>
            {weights.length > 0 && (
              <button onClick={handleClearAll} className="clear-button">
                Clear All
              </button>
            )}
          </div>
          
          {loadingWeights ? (
            <p>Loading weights...</p>
          ) : weights.length === 0 ? (
            <p className="no-names">No weights recorded yet. Enter your weight above to get started!</p>
          ) : (
            <table className="names-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Weight (kg)</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {weights.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.weight}</td>
                    <td>{new Date(entry.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
