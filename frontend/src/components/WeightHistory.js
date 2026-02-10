import React from 'react';

function WeightHistory({ weights, loadingWeights, handleClearAll }) {
  return (
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
  );
}

export default WeightHistory;
