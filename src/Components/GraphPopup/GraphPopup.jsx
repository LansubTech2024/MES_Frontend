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
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen, graphType]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/graph-data/?type=${graphType}`);
      setData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  const handleDownload = () => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const charts = document.querySelectorAll('.popup-graphs');

    let position = 20;

    charts.forEach((chart, index) => {
      html2canvas(chart).then(canvas => {
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
      });
    });
  };

  const getChartData = (dataSet, chartType) => {
    const formatData = (dataSet) => {
      const colors = [
        { backgroundColor: "rgba(0, 123, 255, 0.5)", borderColor: "rgba(0, 123, 255, 1)" },
        { backgroundColor: "rgba(255, 99, 132, 0.5)", borderColor: "rgba(255, 99, 132, 1)" },
        { backgroundColor: "rgba(75, 192, 192, 0.5)", borderColor: "rgba(75, 192, 192, 1)" },
      ];

      return dataSet.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: colors[index % colors.length].backgroundColor,
        borderColor: colors[index % colors.length].borderColor,
        borderWidth: 1,
      }));
    };

    if (Array.isArray(dataSet)) {
      const labels = dataSet.map((d) => d.date || d.device_date);
      const temperatureData = dataSet.map((d) => d.temperature || d.chw_in_temp);

      return {
        labels,
        datasets: [
          {
            label: "Temperature",
            data: temperatureData,
            backgroundColor: "rgba(0, 123, 255, 0.5)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
          },
        ],
      };
    } else if (dataSet?.labels && dataSet?.datasets) {
      return {
        ...dataSet,
        datasets: formatData(dataSet),
      };
    }

    console.error("Unexpected data format:", dataSet);
    return null;
  };

  const renderChart = (chartData, title, ChartComponent) => {
    return chartData ? (
      <div className="popup-graph-item">
        <h3>{title}</h3>
        <ChartComponent data={chartData} />
      </div>
    ) : (
      <div>{title}: No data available</div>
    );
  };

  const renderPlotly = (plotData, title, plotType) => (
    <div className="popup-graph-item">
      <h3>{title}</h3>
      <Plot data={plotData} layout={{ title }} />
    </div>
  );

  const renderGraphs = () => {
    const ChartComponent = graphType === "bar" ? Bar :
      graphType === "line" ? Line :
      graphType === "pie" ? Pie :
      graphType === "scatter" ? Scatter : null;

    if (!ChartComponent) return <div>Unsupported graph type</div>;

    return (
      <>
        {data?.historical && renderChart(getChartData(data.historical, graphType), "Historical Data", ChartComponent)}
        {data?.predictive && renderChart(getChartData(data.predictive, graphType), "Predictive Data", ChartComponent)}
        {data?.impact && renderChart(getChartData(data.impact, graphType), "Impact Analysis", ChartComponent)}
      </>
    );
  };

  if (error) return <div className="popup-error">{error}</div>;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Graph Details" className="popup">
      <h2>{`Graph Details for ${graphType.charAt(0).toUpperCase() + graphType.slice(1)} Chart`}</h2>
      <button className="download-btn" onClick={handleDownload}>Download</button>
      <div className="popup-graphs">
        {data ? renderGraphs() : <div>Loading...</div>}
      </div>
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
