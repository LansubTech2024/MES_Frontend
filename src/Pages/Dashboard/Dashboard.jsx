<<<<<<< HEAD
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import { FaDownload } from "react-icons/fa6";
import { Line } from "react-chartjs-2";
import Plot from "react-plotly.js";
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/SideBar/Sidebar';
import { FaDownload } from 'react-icons/fa6';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import Plot from 'react-plotly.js';
>>>>>>> cb3ca4ad1525b58909988e9e4a669732bff96d8e
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./Dashboard.css";
import GraphPopup from "../../Components/GraphPopup/GraphPopup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGraphType, setSelectedGraphType] = useState(null);

  useEffect(() => {
<<<<<<< HEAD
    axios
      .get("http://127.0.0.1:8000/api/charts/")
      .then((response) => setChartData(response.data))
      .catch((error) => {
        console.error("Error fetching graph data:", error);
=======
    axios.get('http://127.0.0.1:8000/api/charts/')
      .then(response => setChartData(response.data))
      .catch(error => {
        console.error('Error fetching graph data:', error);
>>>>>>> cb3ca4ad1525b58909988e9e4a669732bff96d8e
      });
  }, []);

  const handleGraphClick = (graphType) => {
    setSelectedGraphType(graphType);
    setIsPopupOpen(true);
  };

  const handleDownload = () => {
<<<<<<< HEAD
    const graphItems = document.querySelectorAll(".graph-item");
=======
    const graphItems = document.querySelectorAll('.graph-item');
>>>>>>> cb3ca4ad1525b58909988e9e4a669732bff96d8e
    const pdf = new jsPDF();

    let promises = [];
    graphItems.forEach((item, index) => {
      promises.push(
<<<<<<< HEAD
        html2canvas(item).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
=======
        html2canvas(item).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
>>>>>>> cb3ca4ad1525b58909988e9e4a669732bff96d8e
          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (index > 0) {
            pdf.addPage();
          }
<<<<<<< HEAD
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
=======
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
>>>>>>> cb3ca4ad1525b58909988e9e4a669732bff96d8e
        })
      );
    });

    Promise.all(promises).then(() => {
<<<<<<< HEAD
      pdf.save("graphs.pdf");
=======
      pdf.save('graphs.pdf');
>>>>>>> cb3ca4ad1525b58909988e9e4a669732bff96d8e
    });
  };

  if (!chartData) return <div className="loading">Loading...</div>;

  const scaledWaterfallY = chartData.waterfall_chart.y.map((val) =>
    parseFloat(val.toFixed(2))
  );

  const { total_entries, chw_in_temp, chw_out_temp, avg_temps } = chartData;

  return (
    <>
      <Header />
      <Sidebar />
      <div className="graphs-container">
        <button className="download-btn" onClick={handleDownload}>
<<<<<<< HEAD
          <FaDownload size={22} color="blue" className="fa-down" />
        </button>
        <div className="cards-container">
          {/* Total Entries */}
          <div className="card" style={{ padding: "32px" }}>
            <h2>Total Entries</h2>
            <p style={{ fontSize: "19px" }}>{total_entries.total_entries}</p>
          </div>

          {/* CHW In Temp Card */}
          <div className="card">
            <h2>Inlet Temperature</h2>
            <p>Min : {chw_in_temp.min_chw_in_temp}°C</p>
            <p>Max : {chw_in_temp.max_chw_in_temp}°C</p>
          </div>

          {/* CHW Out Temp Card */}
          <div className="card">
            <h2>Outlet Temperature</h2>
            <p>Min : {chw_out_temp.min_chw_out_temp}°C</p>
            <p>Max : {chw_out_temp.max_chw_out_temp}°C</p>
          </div>

          {/* Average Temperatures Card */}
          <div className="card">
            <h2>Average Temperatures</h2>
            <p>In : {avg_temps.avg_chw_in_temp.toFixed(2)}°C</p>
            <p>Out : {avg_temps.avg_chw_out_temp.toFixed(2)}°C</p>
          </div>
        </div>
        <div className="graphs-grid">
          {/* Line Chart */}
          <div className="graph-item" onClick={() => handleGraphClick("line")}>
            <h2 className="graph-title" style={{ marginBottom: "80px" }}>
              Temperature Trends
            </h2>
            <Line
              data={{
                labels: chartData.line_chart.labels,
                datasets: [
                  {
                    label: "CHW In",
                    data: chartData.line_chart.datasets[0].data,
                    borderColor: "Yellow", // Line color
                    backgroundColor: "Blue", // Background color under the line
                  },
                  {
                    label: "CHW Out",
                    data: chartData.line_chart.datasets[1].data,
                    borderColor: "Tan", // Line color
                    backgroundColor: "DarkGreen", // Background color under the line
                  },
                  {
                    label: "COW In",
                    data: chartData.line_chart.datasets[2].data,
                    borderColor: "rgba(0, 200, 255, 1)", // Line color
                    backgroundColor: "rgba(0, 200, 255, 0.3)", // Background color under the line
                  },
                  {
                    label: "COW Out",
                    data: chartData.line_chart.datasets[3].data,
                    borderColor: "White", // Line color
                    backgroundColor: "Orange", // Background color under the line
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "rgb(255, 255, 255)", // Legend text color
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "rgb(255, 255, 255)", // X-axis ticks color
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.5)", // X-axis grid lines color
                    },
                  },
                  y: {
                    ticks: {
                      color: "rgb(255, 255, 255)", // Y-axis ticks color
                    },
                    grid: {
                      color: "rgba(255, 255, 255, 0.5)", // X-axis grid lines color
                    },
                  },
                },
              }}
              width={700}
              height={500}
            />
          </div>

          {/* Waterfall Chart */}
          <div
            className="graph-item"
            onClick={() => handleGraphClick("waterfall")}
          >
            <h2 className="graph-title" style={{ marginBottom: "0px" }}>
              Temperature Changes
            </h2>
            <Plot
              data={[
                {
                  type: "waterfall",
                  x: chartData.waterfall_chart.x,
                  y: scaledWaterfallY,
                  measure: chartData.waterfall_chart.measure,
                  text: scaledWaterfallY.map(String),
                  textposition: "outside",
                  decreasing: { marker: { color: "rgba(0, 123, 255, 0.8)" } }, // Color for decreasing values
                  increasing: { marker: { color: "rgba(0, 200, 255, 0.8)" } }, // Color for increasing values
                  totals: { marker: { color: "#00c698" } }, // Color for totals
                  connector: { line: { color: "Tan" } }, // Color for connectors
                },
              ]}
              layout={{
                autosize: true,
                yaxis: {
                  autorange: true,
                  title: "Temperature (°C)",
                  titlefont: {
                    color: "white", // Y-axis title color
                  },
                  tickfont: {
                    color: "rgb(255, 255, 255)", // Y-axis tick labels color
                  },
                  gridcolor: "rgba(255, 255, 255, 0.5)", // Y-axis grid line color
                },
                xaxis: {
                  tickfont: {
                    color: "rgb(255, 255, 255)", // X-axis tick labels color
                  },
                  gridcolor: "rgba(255, 255, 255, 0.5)",
                },
                paper_bgcolor: "rgba(0,0,0,0)", // Transparent background for the entire plot
                plot_bgcolor: "rgba(0,0,0,0)", // Transparent background for the plot area
              }}
              config={{
                displayModeBar: false, // Hides the mode bar
              }}
              useResizeHandler={true}
              style={{ width: 700, height: 500 }}
            />
          </div>
          {/* Gauge Chart */}
          <div className="graph-item">
            <h2 className="graph-title">Average Pressure</h2>
            <Plot
              data={[
                {
                  type: "indicator",
                  mode: "gauge+number",
                  value: chartData.gauge_chart.value,
                  gauge: {
                    axis: { range: chartData.gauge_chart.range },
                    steps: chartData.gauge_chart.steps,
                    threshold: chartData.gauge_chart.threshold,
                  },
                  number: {
                    font: { size: 60, color: "blue" }, // Customize the font size and color
                  },
                },
              ]}
              layout={{
                margin: { t: 50, b: 50, l: 50, r: 50 },
                paper_bgcolor: "rgba(0,0,0,0)", // Transparent background for the entire plot
                plot_bgcolor: "rgba(0,0,0,0)", // Transparent background for the plot area
              }}
              config={{
                displayModeBar: false, // Hides the mode bar
              }}
              useResizeHandler={true}
              style={{ width: 650, height: 400 }}
            />
          </div>
          {/* Donut Chart */}
          <div className="graph-item">
            <h2 className="graph-title" style={{ marginRight: "100px" }}>
              Temperature Distribution
            </h2>
            <Plot
              data={[
                {
                  type: "pie",
                  hole: 0.4,
                  labels: chartData.donut_chart.labels,
                  values: chartData.donut_chart.datasets[0].data,
                  marker: {
                    colors: chartData.donut_chart.datasets[0].backgroundColor,
                  },
                  textinfo: "label+percent",
                },
              ]}
              layout={{
                margin: { t: 50, b: 50, l: 50, r: 50 },
                showlegend: true,
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                font: { color: "white" },
              }}
              config={{ displayModeBar: false }}
              useResizeHandler={true}
              style={{ width: 600, height: 440 }}
            />
          </div>
          {/* Combination Chart */}
        <div className="graph-item" onClick={() => handleGraphClick("combination")}>
          <h2 className="graph-title">Temperature and Pressure Over Time</h2>
          <Plot
            data={[
              {
                type: 'bar',
                x: chartData.combination_chart.labels,
                y: chartData.combination_chart.datasets[0].data,
                name: 'Avg CHW In Temperature',
                marker: {
                  color: 'rgba(0, 123, 255, 0.8)'
                },
                yaxis: 'y1'
              },
              {
                type: 'scatter',
                mode: 'lines',
                x: chartData.combination_chart.labels,
                y: chartData.combination_chart.datasets[1].data,
                name: 'Avg Pressure',
                line: {
                  color: 'rgba(54, 162, 235, 1)'
                },
                yaxis: 'y2'
              }
            ]}
            layout={{
              xaxis: { 
                title: 'Month',
                color: "white",
                gridcolor: 'rgba(0, 200, 255, 1)',
              },
              yaxis: { 
                title: 'Temperature (°C)',
                color: "white",
                gridcolor: 'rgba(255, 255, 255, 0.3)',
                side: 'left'
              },
              yaxis2: {
                title: 'Pressure',
                color: "white",
                gridcolor: 'rgba(255, 255, 255, 0.3)',
                overlaying: 'y',
                side: 'right'
              },
              legend: {
                x: 1.05,
                y: 1,
                font: { color: "white" }
              },
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              margin: { l: 100, r: 50, t: 50, b: 50 },
              autosize: true,
            }}
            config={{ displayModeBar: false }}
            style={{ width: 650, height: 500 }}
          />
        </div>
=======
          <FaDownload size={22} color='blue' className='fa-down' />
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
                  }] : [
                    ...chartData.box_plot_data.map(item => ({ ...item, type: 'box' }))
                  ]}
                  layout={{ title: title, width: '100%', height: 400, barmode: type === 'histogram' ? 'overlay' : undefined }}
                  useResizeHandler={true}
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                React.createElement(
                  type === 'bar' ? Bar :
                  type === 'line' ? Line :
                  type === 'pie' ? Pie :
                  Scatter,
                  { 
                    data: chartData[key],
                    options: { responsive: true, maintainAspectRatio: false }
                  }
                )
              )}
            </div>
          ))}
>>>>>>> cb3ca4ad1525b58909988e9e4a669732bff96d8e
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