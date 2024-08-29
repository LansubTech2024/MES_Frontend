import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Modal from "react-modal";
import axios from "axios";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Line,Doughnut,Bar } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import GaugeChart from 'react-gauge-chart'; // Ensure you have the GaugeChart component
import './GraphPopup.css';

Modal.setAppElement('#root');

// Register chart types
ChartJS.register(LineElement, Title, Tooltip, Legend, BarElement);

function GraphPopup({ isOpen, onRequestClose, graphType }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`http://127.0.0.1:8000/api/graph-data/?type=${graphType}`)
        .then((response) => {
          console.log("Received data:", response.data);
          setData(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Error fetching data. Please try again later.");
        });
    }
  }, [isOpen, graphType]);

  const handleDownload = () => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const charts = document.querySelectorAll('.popup-graph-item');

    let position = 20;

    const addImageToPDF = (canvas, index) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 500;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (position + imgHeight > pdf.internal.pageSize.height) {
        pdf.addPage();
        position = 20;
      }

      pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
      position += imgHeight + 20;

      if (index === charts.length - 1) {
        pdf.save('graph.pdf');
      }
    };

    charts.forEach((chart, index) => {
      html2canvas(chart).then(canvas => {
        addImageToPDF(canvas, index);
      });
    });
  };

  if (error) return <div className="popup-error">{error}</div>;

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

  const getChartData = (dataSet, chartType) => {
    console.log("getChartData input:", dataSet, chartType);

    switch (chartType) {
      case "line":
        if (Array.isArray(dataSet)) {
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
          return {
            ...dataSet,
            datasets: dataSet.datasets.map(dataset => ({
              ...dataset,
              backgroundColor: "rgba(0, 123, 255, 0.5)",
              borderColor: "rgba(0, 123, 255, 1)",
              borderWidth: 1,
            })),
          };
        } else {
          console.error("Unexpected data format for line chart:", dataSet);
          return { labels: [], datasets: [] };
        }

      case "waterfall":
        if (Array.isArray(dataSet)) {
          return {
            labels: dataSet.map((d) => d.label),
            datasets: [
              {
                label: "Values",
                data: dataSet.map((d) => d.value),
                backgroundColor: "rgba(0, 123, 255, 0.5)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1,
              },
            ],
          };
        } else {
          console.error("Unexpected data format for bar chart:", dataSet);
          return { labels: [], datasets: [] };
        }

      case "donut":
        if (typeof dataSet === "object") {
          return {
            labels: Object.keys(dataSet),
            datasets: [
              {
                data: Object.values(dataSet),
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(54, 162, 235, 0.5)",
                  "rgba(255, 206, 86, 0.5)",
                  "rgba(75, 192, 192, 0.5)",
                  "rgba(153, 102, 255, 0.5)",
                  "rgba(255, 159, 64, 0.5)",
                ],
              },
            ],
          };
        } else {
          console.error("Expected object data for donut chart, got:", dataSet);
          return { labels: [], datasets: [] };
        }

      case "combination":
        if (Array.isArray(dataSet)) {
          return {
            labels: dataSet.map((d) => d.date || d.device_date),
            datasets: [
              {
                label: "Average Temperature",
                type: 'line',
                data: dataSet.map((d) => d.average_temp),
                backgroundColor: "rgba(0, 123, 255, 0.5)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1,
              },
              {
                label: "Pressure",
                type: 'bar',
                data: dataSet.map((d) => d.pressure),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          };
        } else {
          console.error("Expected array data for combination chart, got:", dataSet);
          return { labels: [], datasets: [] };
        }

      default:
        console.error("Unsupported chart type:", chartType);
        return { labels: [], datasets: [] };
    }
  };

  const renderGraphs = () => {
    switch (graphType) {
      case "line":
      case "waterfall":
      case "donut":
      case "combination":
        const ChartComponent =
          graphType === "line"
            ? Line
            : graphType === "waterfall"
            ? Bar
            : graphType === "donut"
            ? Doughnut
            : null;
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
      overlayClassName="popup-overlay"
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
