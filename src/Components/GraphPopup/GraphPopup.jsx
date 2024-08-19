import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Modal from "react-modal";
import axios from "axios";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";
import Plot from "react-plotly.js";
import "./GraphPopup.css";

Modal.setAppElement('#root');

function GraphPopup({ isOpen, onRequestClose, graphType }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`http://127.0.0.1:8000/api/graph-data/?type=${graphType}`)
        .then((response) => {
          console.log("Received data:", response.data);
          setData(response.data);
          setError(null); // Clear error on successful fetch
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Error fetching data. Please try again later."); // Set error message
        });
    }
  }, [isOpen, graphType]);

  const handleDownload = () => {
    const input = document.querySelector('.popup-graphs');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('detailedgraph.pdf');
    });
  };

  if (error) return <div className="popup-error">{error}</div>; // Display error message

  if (!data) return <div>Loading...</div>;

  const renderChart = (chartData, title, ChartComponent) => {
    if (!chartData) {
      return <div>{title}: No data available</div>;
    }
    return (
      <div className="popup-graph-item">
        <h3>{title}</h3>
        <ChartComponent data={chartData} />
      </div>
    );
  };

  const renderPlotly = (plotData, title, plotType) => (
    <div className="popup-graph-item">
      <h3>{title}</h3>
      <Plot data={plotData} layout={{ title: title, width:500, height:400 }} />
    </div>
  );

  const getChartData = (dataSet, chartType) => {
    console.log("getChartData input:", dataSet, chartType);

    switch (chartType) {
      case "bar":
      case "line":
        if (Array.isArray(dataSet)) {
          // If dataSet is an array, format it as before
          return {
            labels: dataSet.map((d) => d.date || d.device_date),
            datasets: [
              {
                label: "Temperature",
                data: dataSet.map((d) => d.temperature || d.chw_in_temp),
                backgroundColor: "rgba(0, 123, 255, 0.5)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1,
              },
            ],
          };
        } else if (dataSet && dataSet.labels && dataSet.datasets) {
          // Add different colors for each dataset
          const colors = [
            {
              backgroundColor: "rgba(0, 123, 255, 0.5)",
              borderColor: "rgba(0, 123, 255, 1)",
            },
            {
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
            },
            {
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
            },
          ];

          return {
            ...dataSet,
            datasets: dataSet.datasets.map((dataset, index) => ({
              ...dataset,
              backgroundColor: colors[index % colors.length].backgroundColor,
              borderColor: colors[index % colors.length].borderColor,
              borderWidth: 1,
            })),
          };
        } else {
          console.error("Unexpected data format:", dataSet);
          return null;
        }
      case "pie":
        if (typeof dataSet === "object" && dataSet !== null) {
          if (Array.isArray(dataSet)) {
            // Handle array format (likely for predictive and impact data)
            return {
              labels: dataSet.map((d) => d.label),
              datasets: [
                {
                  data: dataSet.map((d) => d.value),
                  backgroundColor: [
                    "red",
                    "blue",
                    "green",
                    "yellow",
                    "purple",
                    "orange",
                  ],
                },
              ],
            };
          } else {
            // Handle object format (likely for historical data)
            return {
              labels: Object.keys(dataSet),
              datasets: [
                {
                  data: Object.values(dataSet),
                  backgroundColor: [
                    "red",
                    "blue",
                    "green",
                    "yellow",
                    "purple",
                    "orange",
                  ],
                },
              ],
            };
          }
        } else {
          console.error(
            "Expected object or array for pie chart, got:",
            dataSet
          );
          return { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
        }
      case "scatter":
        if (dataSet && dataSet.datasets && Array.isArray(dataSet.datasets)) {
          return {
            datasets: dataSet.datasets.map((dataset, index) => ({
              ...dataset,
              backgroundColor: `rgba(${index * 50}, ${
                255 - index * 50
              }, ${150}, 0.5)`,
            })),
          };
        } else if (Array.isArray(dataSet)) {
          return {
            datasets: [
              {
                label: "CHW In vs COW Out",
                data: dataSet.map((d) => ({
                  x: d.chw_in_temp,
                  y: d.cow_out_temp,
                })),
                backgroundColor: "rgba(0, 0, 255, 0.5)",
              },
            ],
          };
        } else {
          console.error("Unexpected format for scatter chart:", dataSet);
          return { datasets: [] };
        }
      case "heatmap":
        if (dataSet.x && dataSet.y && dataSet.z) {
          return {
            labels: dataSet.y, // y-axis labels
            datasets: [
              {
                label: "Heatmap",
                data: dataSet.z, // 'z' values for the heatmap
                backgroundColor: "rgba(0, 0, 255, 0.5)",
              },
            ],
          };
        } else {
          console.error(
            "Expected object with keys x, y, z for heatmap chart, got:",
            dataSet
          );
          return { labels: [], datasets: [] };
        }
      case "histogram":
        if (Array.isArray(dataSet)) {
          return {
            labels: dataSet.map((d) => d.device_date),
            datasets: [
              {
                label: "Histogram",
                data: dataSet.map((d) => d.chw_in_temp), // Adjust for histogram data
                backgroundColor: "rgba(0, 0, 255, 0.5)",
                borderWidth: 1,
              },
            ],
          };
        } else {
          console.error("Expected object for histogram chart, got:", dataSet);
          return { labels: [], datasets: [] };
        }
      case "boxplot":
        if (Array.isArray(dataSet)) {
          return {
            labels: dataSet.map((d) => d.device_date),
            datasets: [
              {
                label: "Boxplot",
                data: dataSet.map((d) => ({
                  min: Math.min(...d.chw_in_temp),
                  max: Math.max(...d.chw_in_temp),
                  q1: d.chw_in_temp[1], // Example: Q1 value
                  median: d.chw_in_temp[2], // Example: Median value
                  q3: d.chw_in_temp[3], // Example: Q3 value
                })),
                backgroundColor: "rgba(0, 0, 255, 0.5)",
              },
            ],
          };
        } else {
          console.error("Expected array for boxplot chart, got:", dataSet);
          return { labels: [], datasets: [] };
        }
      default:
        return dataSet;
    }
  };

  const renderGraphs = () => {
    switch (graphType) {
      case "bar":
      case "line":
      case "pie":
      case "scatter":
        const ChartComponent =
          graphType === "bar"
            ? Bar
            : graphType === "line"
            ? Line
            : graphType === "pie"
            ? Pie
            : Scatter;
        return (
          <>
            {data.historical &&
              renderChart(
                getChartData(data.historical, graphType),
                "Historical Data",
                ChartComponent
              )}
            {data.predictive &&
              renderChart(
                getChartData(data.predictive, graphType),
                "Predictive Data",
                ChartComponent
              )}
            {data.impact &&
              renderChart(
                getChartData(data.impact, graphType),
                "Impact Analysis",
                ChartComponent
              )}
          </>
        );
      case "histogram":
        return (
          <>
            {data.historical &&
              renderPlotly(
                [
                  {
                    x: data.historical.chw_in_temp,
                    type: "histogram",
                    name: "CHW In",
                  },
                  {
                    x: data.historical.chw_out_temp,
                    type: "histogram",
                    name: "CHW Out",
                  },
                  {
                    x: data.historical.cow_in_temp,
                    type: "histogram",
                    name: "COW In",
                  },
                  {
                    x: data.historical.cow_out_temp,
                    type: "histogram",
                    name: "COW Out",
                  },
                ],
                "Historical Data",
                "histogram"
              )}
            {data.predictive &&
              renderPlotly(
                [
                  {
                    x: data.predictive.chw_in_temp,
                    type: "histogram",
                    name: "CHW In",
                  },
                  {
                    x: data.predictive.chw_out_temp,
                    type: "histogram",
                    name: "CHW Out",
                  },
                  {
                    x: data.predictive.cow_in_temp,
                    type: "histogram",
                    name: "COW In",
                  },
                  {
                    x: data.predictive.cow_out_temp,
                    type: "histogram",
                    name: "COW Out",
                  },
                ],
                "Predictive Data",
                "histogram"
              )}
            {data.impact &&
              renderPlotly(
                [
                  {
                    x: data.impact["chw_in_temp - Energy Efficiency"],
                    type: "histogram",
                    name: "CHW In - Energy Efficiency",
                  },
                  {
                    x: data.impact["chw_in_temp - Cooling Capacity"],
                    type: "histogram",
                    name: "CHW In - Cooling Capacity",
                  },
                  // Add other metrics as needed
                ],
                "Impact Analysis",
                "histogram"
              )}
          </>
        );
      case "heatmap":
        return (
          <>
            {data.historical &&
              renderPlotly(
                [
                  {
                    z: data.historical.z,
                    x: data.historical.x,
                    y: data.historical.y,
                    type: "heatmap",
                    colorscale: "Viridis",
                  },
                ],
                "Historical Data",
                "heatmap"
              )}
            {data.predictive &&
              renderPlotly(
                [
                  {
                    z: data.predictive.z,
                    x: data.predictive.x,
                    y: data.predictive.y,
                    type: "heatmap",
                    colorscale: "Viridis",
                  },
                ],
                "Predictive Data",
                "heatmap"
              )}
            {data.impact &&
              renderPlotly(
                [
                  {
                    z: data.impact.z,
                    x: data.impact.x,
                    y: data.impact.y,
                    type: "heatmap",
                    colorscale: "Viridis",
                  },
                ],
                "Impact Analysis",
                "heatmap"
              )}
          </>
        );
      case "boxplot":
        return (
          <>
            {data.historical &&
              renderPlotly(
                [
                  {
                    y: data.historical.chw_in_temp,
                    type: "box",
                    name: "CHW In",
                  },
                  {
                    y: data.historical.chw_out_temp,
                    type: "box",
                    name: "CHW Out",
                  },
                  {
                    y: data.historical.cow_in_temp,
                    type: "box",
                    name: "COW In",
                  },
                  {
                    y: data.historical.cow_out_temp,
                    type: "box",
                    name: "COW Out",
                  },
                ],
                "Historical Data",
                "box"
              )}
            {data.predictive &&
              renderPlotly(
                [
                  {
                    y: data.predictive.chw_in_temp,
                    type: "box",
                    name: "CHW In",
                  },
                  {
                    y: data.predictive.chw_out_temp,
                    type: "box",
                    name: "CHW Out",
                  },
                  {
                    y: data.predictive.cow_in_temp,
                    type: "box",
                    name: "COW In",
                  },
                  {
                    y: data.predictive.cow_out_temp,
                    type: "box",
                    name: "COW Out",
                  },
                ],
                "Predictive Data",
                "box"
              )}
            {data.impact &&
              renderPlotly(
                [
                  {
                    y: data.impact["chw_in_temp - Energy Efficiency"],
                    type: "box",
                    name: "CHW In - Energy Efficiency",
                  },
                  {
                    y: data.impact["chw_in_temp - Cooling Capacity"],
                    type: "box",
                    name: "CHW In - Cooling Capacity",
                  },
                  // Add other metrics as needed
                ],
                "Impact Analysis",
                "box"
              )}
          </>
        );
      default:
        return <div>Unsupported graph type</div>;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Graph Details"
      className="popup"
    >
      <h2>
        Graph Details for{" "}
        {graphType.charAt(0).toUpperCase() + graphType.slice(1)} Chart
      </h2>
      <button className="download-btn" onClick={handleDownload}>Download</button>
      <div className="popup-graphs">{renderGraphs()}</div>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
  
}
GraphPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  graphType: PropTypes.string.isRequired,
};

export default GraphPopup;
