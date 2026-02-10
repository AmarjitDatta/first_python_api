import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState([]);
  const [loadingNames, setLoadingNames] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Fetch all names from database
  const fetchNames = async () => {
    setLoadingNames(true);
    try {
      const response = await fetch(`${apiUrl}/names`);
      const data = await response.json();
      setNames(data.names || []);
    } catch (error) {
      console.error('Error fetching names:', error);
    } finally {
      setLoadingNames(false);
    }
  };

  // Fetch names on component mount
  useEffect(() => {
    fetchNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/?name=${encodeURIComponent(name || 'World')}`);
      const data = await response.json();
      setMessage(data.message);
      setName(''); // Clear input field
      
      // Refresh the names list
      await fetchNames();
    } catch (error) {
      setMessage('Error connecting to API');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all names?')) {
      return;
    }

    try {
      await fetch(`${apiUrl}/names`, { method: 'DELETE' });
      setMessage('All names cleared!');
      await fetchNames();
    } catch (error) {
      setMessage('Error clearing names');
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World API</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nameInput">Enter your name: </label>
          <input
            id="nameInput"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}

        <div className="names-section">
          <div className="names-header">
            <h2>Saved Names</h2>
            {names.length > 0 && (
              <button onClick={handleClearAll} className="clear-button">
                Clear All
              </button>
            )}
          </div>
          
          {loadingNames ? (
            <p>Loading names...</p>
          ) : names.length === 0 ? (
            <p className="no-names">No names saved yet. Enter a name above to get started!</p>
          ) : (
            <table className="names-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {names.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.name}</td>
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
