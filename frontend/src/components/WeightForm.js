import React from 'react';

function WeightForm({ weight, setWeight, handleSubmit, loading }) {
  return (
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
  );
}

export default WeightForm;
