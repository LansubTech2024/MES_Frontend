import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';
import './Dashboard.css';

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
    <>
    <Header/>
    <Sidebar/>
      <div className="graphs-container">
      <div className="graphs-grid">
        {graphs.map((graph, index) => (
          <div key={index} className="graph-item">
            <h2 className="graph-title">{graph.type} Chart</h2>
            <img 
              className="graph-image"
              src={`data:image/png;base64,${graph.data}`} 
              alt={`${graph.type} chart`} 
            />
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Graphs;