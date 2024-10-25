"use client"; // Ensure it's a client component

import { useState } from 'react';

export default function Home() {
  const [pinId, setPinId] = useState<string>(''); // Input for Pin ID
  const [pinData, setPinData] = useState<any>(null); // To store the fetched pin data
  const [error, setError] = useState<string | null>(null); // To handle errors

  // Function to fetch pin data by ID
  async function fetchPinData(pinId: string) {
    try {
      const response = await fetch(`/api/getPin?pin_id=${encodeURIComponent(pinId)}`);
      const data = await response.json();

      if (response.ok) {
        setPinData(data); // Update state with the pin data
        setError(null); // Clear any previous error
      } else {
        setError(data.error ? data.error : 'Error fetching pin data');
      }
    } catch (error) {
      console.error('Failed to fetch pin data:', error);
      setError('Failed to fetch pin data');
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pinId.trim()) {
      fetchPinData(pinId); // Call the function with the provided Pin ID
    }
  };

  return (
    <div className="container">
      <h1>Get Pinterest Pin Data</h1>

      {/* Pin ID Input Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pinId}
          onChange={(e) => setPinId(e.target.value)}
          placeholder="Enter Pin ID..."
          className="input"
        />
        <button type="submit" className="button">
          Fetch Pin Data
        </button>
      </form>

      {/* Display Error Message */}
      {error && <p className="error">Error: {error}</p>}

      {/* Display Fetched Pin Data */}
      {pinData && (
        <div className="results">
          <h2>Pin Data:</h2>
          <p>ID: {pinData.id}</p>
          <p>Note: {pinData.note}</p>
          {pinData.image?.original?.url && (
            <img src={pinData.image.original.url} alt={pinData.note} width={100} />
          )}
        </div>
      )}
    </div>
  );
}
