import { useState, useEffect } from "react";
import axios from "axios";
import Assumption from "../../Components/Assumption/Assumption";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import { FaDownload } from "react-icons/fa6";
import { Line } from "react-chartjs-2";
import Plot from "react-plotly.js";
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
    axios
      .get("http://127.0.0.1:8000/api/charts/")
      .then((response) => setChartData(response.data))
      .catch((error) => {
        console.error("Error fetching graph data:", error);
      });
  }, []);

  const handleGraphClick = (graphType) => {
    setSelectedGraphType(graphType);
    setIsPopupOpen(true);
  };

  const handleDownload = () => {
    const graphItems = document.querySelectorAll(".graph-item");
    const pdf = new jsPDF();

    let promises = [];
    graphItems.forEach((item, index) => {
      promises.push(
        html2canvas(item).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (index > 0) {
            pdf.addPage();
          }
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        })
      );
    });

    Promise.all(promises).then(() => {
      pdf.save("graphs.pdf");
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
      <Sidebar/>
      <div className="graphs-container">
        <button className="download-btn" onClick={handleDownload}>
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
        <div className="assumption">
          <Assumption/>
        </div>
        <div className="graphs-grid">
          {/* Line Chart */}
          <div className="graph-item" onClick={()=>handleGraphClick('line-chart')}>
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
                    borderColor: "#0b1d78",// Line color
                    backgroundColor: "Blue", // Background color under the line
                  },
                  {
                    label: "CHW Out",
                    data: chartData.line_chart.datasets[1].data,
                    borderColor: "Violet", // Line color
                    backgroundColor: "Green", // Background color under the line
                  },
                  {
                    label: "COW In",
                    data: chartData.line_chart.datasets[2].data,
                    borderColor: "LightBlue", // Line color
                    backgroundColor: "#800080", // Background color under the line
                  },
                  {
                    label: "COW Out",
                    data: chartData.line_chart.datasets[3].data,
                    borderColor: "Black", // Line color
                    backgroundColor: "#1cac78", // Background color under the line
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "black",
                      size: "16", // Legend text color
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "black",
                      size: "16", // X-axis ticks color
                    },
                    grid: {
                      color: "black", // X-axis grid lines color
                    },
                  },
                  y: {
                    ticks: {
                      color: "black",
                      size: "16", // Y-axis ticks color
                    },
                    grid: {
                      color: "black", // X-axis grid lines color
                    },
                  },
                },
              }}
              width={600}
              height={400}
            />
          </div>

          {/* Waterfall Chart */}
          <div
            className="graph-item"
            onClick={()=>handleGraphClick('waterfall-chart')}
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
                  decreasing: { marker: { color: "#0069c0", line: {
                    color: "black",  
                    width: 2,  
                  }, } }, 
                  increasing: { marker: { color: "#00c698", line: {
                    color: "black",  
                    width: 2,  
                  },  } }, 
                  totals: { marker: { color: "#1fe074", line: {
                    color: "black",  
                    width: 2,  
                  },  } },
                  connector: { line: { color: "Tan" } }, 
                },
              ]}
              layout={{
                autosize: true,
                yaxis: {
                  autorange: true,
                  title: "Temperature (°C)",
                  titlefont: {
                    color: "black", 
                    size: "18",
                    weight: "bold", // Y-axis title color
                  },
                  tickfont: {
                    color: "black",
                    size: "16",
                    weight: "bold", // Y-axis tick labels color
                  },
                  gridcolor: "black", // Y-axis grid line color
                },
                xaxis: {
                  tickfont: {
                    color: "black",
                    size: "16",
                    weight: "bold", // X-axis tick labels color
                  },
                  gridcolor: "black",
                },
                paper_bgcolor: "rgba(0,0,0,0)", // Transparent background for the entire plot
                plot_bgcolor: "rgba(0,0,0,0)", // Transparent background for the plot area
              }}
              config={{
                displayModeBar: false, // Hides the mode bar
              }}
              useResizeHandler={true}
              style={{ width: 650, height: 500 }}
            />
          </div>
          {/* Gauge Chart */}
          <div className="graph-item">
            <h2 className="graph-title" style={{marginLeft:"40px"}}>Average Pressure</h2>
            <Plot
              data={[
                {
                  type: "indicator",
                  mode: "gauge+number",
                  value: chartData.gauge_chart.value,
                  gauge: {
                    axis: { range: chartData.gauge_chart.range},
                    steps: chartData.gauge_chart.steps,
                    threshold: chartData.gauge_chart.threshold,
                  },
                  number: {
                    font: { size: 80, color: "blue" }, // Customize the font size and color
                  },
                },
              ]}
              layout={{
                margin: { t:30, b: 50, l: 50, r: 50 },
                size: "20",
                paper_bgcolor: "rgba(0,0,0,0)", // Transparent background for the entire plot
                plot_bgcolor: "rgba(0,0,0,0)", // Transparent background for the plot area
              }}
              config={{
                displayModeBar: false, // Hides the mode bar
              }}
              useResizeHandler={true}
              style={{ width: 600, height: 450 }}
            />
          </div>
          {/* Donut Chart */}
          <div className="graph-item" onClick={()=>handleGraphClick('donut-chart')}>
            <h2 className="graph-title" style={{ marginRight: "30px" }}>
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
                font: { color: "black" },
              }}
              config={{ displayModeBar: false }}
              useResizeHandler={true}
              style={{ width: 600, height: 450 }}
            />
          </div>
          {/* Combination Chart */}
          <div
            className="graph-item"
            onClick={()=>handleGraphClick('combination-chart')}
            style={{marginLeft:"50px"}}
          >
            <h2 className="graph-title">Temperature and Pressure Over Time</h2>
            <Plot
              data={[
                {
                  type: "bar",
                  x: chartData.combination_chart.labels,
                  y: chartData.combination_chart.datasets[0].data,
                  name: "Avg CHW In Temperature",
                  marker: {
                    color: 'rgba(0, 123, 255, 0.8)',
                    line:{
                      color:"black",
                      width: 2,
                    },
                  },
                  yaxis: "y1",
                },
                {
                  type: "line",
                  x: chartData.combination_chart.labels,
                  y: chartData.combination_chart.datasets[1].data,
                  name: "Avg Pressure",
                  marker: {
                    color: 'darkgreen',
                    size: '16'
                  },
                  yaxis: "y2",
                },
              ]}
              layout={{
                xaxis: {
                  title: {
                    text: "Month",
                    font: {
                      size: 18, // Change X-axis title font size
                      color: "black",
                      family: "Arial",
                      weight: "bold", // Make it bold
                    },
                  },
                  tickfont: {
                    size: 16, // X-axis tick font size
                    color: "black",
                    family: "Arial",
                    weight: "bold", // Make it bold
                  },
                  linecolor: "black",
                  linewidth: 2,
                  gridcolor: "black",
                },
                yaxis: {
                  title: {
                    text: "Temperature (°C)",
                    font: {
                      size: 18, // Change Y-axis title font size
                      color: "black",
                      family: "Arial",
                      weight: "bold", // Make it bold
                    },
                  },
                  tickfont: {
                    size: 16, // Y-axis tick font size
                    color: "black",
                    family: "Arial",
                    weight: "bold", // Make it bold
                  },
                  linecolor: "black",
                  linewidth: 2,
                  gridcolor: "black",
                  side: "left",
                },
                yaxis2: {
                  title: {
                    text: "Pressure",
                    font: {
                      size: 18, // Change Y-axis 2 title font size
                      color: "black",
                      family: "Arial",
                      weight: "bold", // Make it bold
                    },
                  },
                  tickfont: {
                    size: 16, // Y-axis 2 tick font size
                    color: "black",
                    family: "Arial",
                    weight: "bold", // Make it bold
                  },
                  linecolor: "black",
                  linewidth:2,
                  gridcolor: "black",
                  overlaying: "y",
                  side: "right",
                },
                legend: {
                  x: 1.05,
                  y: 1,
                  font: { color: "black" },
                },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                margin: { l: 50, r: 50, t: 50, b: 50 },
                autosize: true,
              }}
              config={{ displayModeBar: false }}
              style={{ width: 600, height: 500 }}
            />
          </div>
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
