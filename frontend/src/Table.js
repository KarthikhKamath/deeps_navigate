import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from "./Navbar.js"

export default function Table() {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/data');
        const result = await response.json();
        setData(result.data);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Data updated:', data);
  }, [data]);

  // State variable to track whether the table should be rendered
  const [renderTable, setRenderTable] = useState(false);

  // Handler function to trigger rendering of the table
  const handleRenderTable = () => {
    setRenderTable(true);
  };

  // Only render the component if data is loaded
  if (!dataLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    
      {/* Button to trigger rendering of the table */}
      <ResponsiveAppBar/>
      <button onClick={handleRenderTable}>Render Table</button>

      {/* Render the table if the button is clicked */}
      {renderTable && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Voting Choice</th>
              <th>Casted At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.voting_choice ? 'True' : 'False'}</td>
                <td>{item.casted_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
