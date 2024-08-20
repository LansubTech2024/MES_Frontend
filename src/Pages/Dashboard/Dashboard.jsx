import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';
import { FaDownload } from 'react-icons/fa6';
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Dashboard.css';
import GraphPopup from '../../Components/GraphPopup/GraphPopup';

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

const graphs = [
  { type: 'bar', title: 'Average Temperatures', key: 'bar_chart' },
  { type: 'line', title: 'Temperature Trends', key: 'line_chart' },
  { type: 'pie', title: 'Temperature Distribution', key: 'pie_chart' },
  { type: 'scatter', title: 'CHW In vs COW Out', key: 'scatter_chart' },
  { type: 'histogram', title: 'Temperature Histogram', key: 'histogram_data', plot: true },
  { type: 'heatmap', title: 'Temperature Heatmap', key: 'heatmap_data', plot: true },
  { type: 'boxplot', title: 'Temperature Box Plot', key: 'box_plot_data', plot: true }
];

function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGraphType, setSelectedGraphType] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/charts/')
      .then(response => setChartData(response.data))
      .catch(error => {
        console.error('Error fetching graph data:', error);
        // Consider setting an error state here
      });
  }, []);

  const handleGraphClick = (graphType) => {
    setSelectedGraphType(graphType);
    setIsPopupOpen(true);
  };

  const handleDownload = () => {
    const graphItems = document.querySelectorAll('.graph-item');
  const pdf = new jsPDF();

  let promises = [];
  graphItems.forEach((item, index) => {
    promises.push(
      html2canvas(item).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (index > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      })
    );
  });

  Promise.all(promises).then(() => {
    pdf.save('graphs.pdf');
  });
};

  if (!chartData) return <div className="loading">Loading...</div>;

  return (
    <>
      <Header />
      <Sidebar />
      <div className="graphs-container">
      <button className="download-btn" onClick={handleDownload}>
        <FaDownload size={22} color='blue' className='fa-down'/>
      </button>
        <div className="graphs-grid">
          {graphs.map(({ type, title, key, plot }) => (
            <div key={type} className="graph-item" onClick={() => handleGraphClick(type)}>
              <h2 className="graph-title">{title}</h2>
              {plot ? (
                <Plot
                  data={type === 'histogram' ? [
                    { x: chartData.histogram_data.chw_in, type: 'histogram', name: 'CHW In' },
                    { x: chartData.histogram_data.chw_out, type: 'histogram', name: 'CHW Out' },
                    { x: chartData.histogram_data.cow_in, type: 'histogram', name: 'COW In' },
                    { x: chartData.histogram_data.cow_out, type: 'histogram', name: 'COW Out' }
                  ] : type === 'heatmap' ? [{
                    z: chartData.heatmap_data.z,
                    x: chartData.heatmap_data.x,
                    y: chartData.heatmap_data.y,
                    type: 'heatmap',
                    colorscale: 'Viridis'
                  }]  : [
                    ...chartData.box_plot_data.map(item => ({ ...item, type: 'box' }))
                  ]}
                  layout={{ title: title, width: 550, height: 400, barmode: type === 'histogram' ? 'overlay' : undefined }}
                  useResizeHandler={true}
                />
              ) : (
                React.createElement(type === 'bar' ? Bar :
                  type === 'line' ? Line :
                  type === 'pie' ? Pie :
                  Scatter, 
                  { data: chartData[key], width: 600, height: 300 })
              )}
            </div>
          ))}
        </div>
      </div>
      {isPopupOpen && (
        <GraphPopup
          isOpen={isPopupOpen}
          onRequestClose={() => setIsPopupOpen(false)}
          graphType={selectedGraphType}
        />
      )}
    </>
  );
}

export default Dashboard;
