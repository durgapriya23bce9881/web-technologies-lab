import React, { useState, useEffect } from "react";

function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.slice(0, 5)); // limit to 5 items
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // runs only once

  return (
  
  
    <div className="container">
      <h1>Fetched Data</h1>

      {/* Loading State */}
      {loading && <p className="loading">Loading...</p>}

      {/* Error State */}
      {error && <p className="error">{error}</p>}

      {/* Data Display */}
      {!loading && !error && (
        <div className="data-list">
          {data.map((item) => (
            <div key={item.id} className="card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DataFetcher;