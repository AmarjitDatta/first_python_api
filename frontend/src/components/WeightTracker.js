import React, { useState, useEffect } from 'react';
import WeightForm from './WeightForm';
import WeightHistory from './WeightHistory';

function WeightTracker() {
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
    <>
      <h1>Weight Tracker</h1>
      <WeightForm
        weight={weight}
        setWeight={setWeight}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      {message && <p className="message">{message}</p>}
      <WeightHistory
        weights={weights}
        loadingWeights={loadingWeights}
        handleClearAll={handleClearAll}
      />
    </>
  );
}

export default WeightTracker;
