import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chart = () => {
  const [charts, setCharts] = useState({});

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const response = await axios.get('/api/charts/');
        setCharts(response.data);
      } catch (error) {
        console.error('Error fetching charts:', error);
      }
    };

    fetchCharts();
  }, []);

  return (
    <div>
      <h1>Charts</h1>
      {charts.bar && <div>
        <h2>Bar Chart</h2>
        <img src={`data:image/png;base64,${charts.bar}`} alt="Bar Chart" />
      </div>}
      {charts.pie && <div>
        <h2>Pie Chart</h2>
        <img src={`data:image/png;base64,${charts.pie}`} alt="Pie Chart" />
      </div>}
      {charts.heatmap && <div>
        <h2>Heatmap</h2>
        <img src={`data:image/png;base64,${charts.heatmap}`} alt="Heatmap" />
      </div>}
      {charts.histogram && <div>
        <h2>Histogram</h2>
        <img src={`data:image/png;base64,${charts.histogram}`} alt="Histogram" />
      </div>}
      {charts.scatter && <div>
        <h2>Scatter Plot</h2>
        <img src={`data:image/png;base64,${charts.scatter}`} alt="Scatter Plot" />
      </div>}
      {charts.box && <div>
        <h2>Box Plot</h2>
        <img src={`data:image/png;base64,${charts.box}`} alt="Box Plot" />
      </div>}
    </div>
  );
};

export default Chart;