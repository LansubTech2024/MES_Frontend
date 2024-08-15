import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import Plot from 'react-plotly.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/charts/')
      .then(response => {
        setChartData(response.data);
      })
      .catch(error => {
        console.error('Error fetching graph data:', error);
      });
  }, []);

  if (!chartData) return <div>Loading...</div>;

  return (
    <>
    <Header/>
    <Sidebar/>
    <div className="graphs-container">
      <div className="graphs-grid">
        <div className="graph-item">
          <h2 className="graph-title">Average Temperatures</h2>
          <Bar data={chartData.bar_chart} />
        </div>
        <div className="graph-item">
          <h2 className="graph-title">Temperature Trends</h2>
          <Line data={chartData.line_chart} />
        </div>
        <div className="graph-item">
          <h2 className="graph-title">CHW In Temperature Distribution</h2>
          <Pie data={chartData.pie_chart} />
        </div>
        <div className="graph-item">
          <h2 className="graph-title">CHW In vs COW Out</h2>
          <Scatter data={chartData.scatter_chart} />
        </div>
        <div className="graph-item">
          <h2 className="graph-title">Temperature Heatmap</h2>
          <Plot
            data={[{
              z: chartData.heatmap_data.z,
              x: chartData.heatmap_data.x,
              y: chartData.heatmap_data.y,
              type: 'heatmap',
              colorscale: 'Viridis',
            }]}
            layout={{ width: 500, height: 400, title: 'Temperature Heatmap' }}
          />
        </div>
        <div className="graph-item">
          <h2 className="graph-title">Temperature Histogram</h2>
          <Plot
            data={[
              { x: chartData.histogram_data.chw_in, type: 'histogram', name: 'CHW In' },
              { x: chartData.histogram_data.chw_out, type: 'histogram', name: 'CHW Out' },
              { x: chartData.histogram_data.cow_in, type: 'histogram', name: 'COW In' },
              { x: chartData.histogram_data.cow_out, type: 'histogram', name: 'COW Out' },
            ]}
            layout={{ width: 500, height: 400, title: 'Temperature Distribution', barmode: 'overlay' }}
          />
        </div>
        <div className="graph-item">
          <h2 className="graph-title">Temperature Box Plot</h2>
          <Plot
            data={chartData.box_plot_data.map(item => ({ ...item, type: 'box' }))}
            layout={{ width: 500, height: 400, title: 'Temperature Box Plot' }}
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default Dashboard;