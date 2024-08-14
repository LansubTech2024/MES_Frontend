import { useState, useEffect } from 'react';
import axios from 'axios';

function Graphs() {
  const [graphs, setGraphs] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/charts/')  // Adjust this URL to match your Django URL
      .then(response => {
        setGraphs(response.data.graphs);
      })
      .catch(error => {
        console.error('Error fetching graphs:', error);
      });
  }, []);

  return (
    <div>
      {graphs.map((graph, index) => (
        <div key={index}>
          <h2>{graph.type} Chart</h2>
          <img src={`data:image/png;base64,${graph.data}`} alt={`${graph.type} chart`} />
        </div>
      ))}
    </div>
  );
}

export default Graphs;