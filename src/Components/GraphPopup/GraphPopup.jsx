import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { FaDownload } from "react-icons/fa6";
import { Line, Pie } from "react-chartjs-2";
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
} from "chart.js";

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
import "./GraphPopup.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GraphPopup = ({ isOpen, onRequestClose, graphType }) => {
  const [predictiveData, setPredictiveData] = useState(null);
  const [impactCards, setImpactCards] = useState([]);
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`http://127.0.0.1:8000/api/${graphType}-popup/`)
        .then((response) => {
          setPredictiveData(response.data.predictive_graph);
          setImpactCards(response.data.impact_cards);
          if (response.data.recommendation) {
            setRecommendation(response.data.recommendation);
          }
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, [isOpen, graphType]);

  const renderImpactCards = () => {
    return impactCards.map((card, index) => (
      <div key={index} className="impact-card">
        <h3>{card.title}</h3>
        <p className="value">{card.value}</p>
        <p className="description">{card.description}</p>
      </div>
    ));
  };

  const renderPredictiveGraph = () => {
    if (!predictiveData) return null;

    switch (predictiveData.type) {
      case "time_series_forecast":
        return renderTimeSeriesForecast();
      case "line_chart":
        return renderLineChart();
      case "partitioned_donut":
        return renderPartitionedDonut();
      case "overlay_combination":
        return renderOverlayCombination();
      default:
        return null;
    }
  };

  const renderTimeSeriesForecast = () => {
    const data = {
      labels: predictiveData.dates,
      datasets: [
        {
          label: "Predicted Values",
          data: predictiveData.values,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
        },
      ],
    };

    return <Line data={data} />;
  };

  const renderLineChart = () => {
    if (!predictiveData) return null;

    const data = {
        labels: predictiveData.dates,
        datasets: [
            {
                label: 'CHW In Temperature',
                data: predictiveData.chw_in_temp,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'CHW Out Temperature',
                data: predictiveData.chw_out_temp,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: 'Temperature Difference',
                data: predictiveData.temp_diff,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Temperature Data',
            },
        },
    };

    return <Line data={data} options={options} />;
};

  const renderPartitionedDonut = () => {
    const data = {
      labels: predictiveData.labels,
      datasets: [
        {
          data: predictiveData.values,
          backgroundColor: ["#0b1d78", "#0069c0", "#00a9b5"],
        },
      ],
    };

    return <Pie data={data} />;
  };

  const renderOverlayCombination = () => {
    const data = {
      labels: predictiveData.dates,
      datasets: [
        {
          label: "Temperature",
          data: predictiveData.temp_values,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          yAxisID: "y-axis-1",
        },
        {
          label: "Pressure",
          data: predictiveData.pressure_values,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          yAxisID: "y-axis-2",
        },
      ],
    };

    const options = {
      scales: {
        "y-axis-1": {
          type: "linear",
          display: true,
          position: "left",
        },
        "y-axis-2": {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    };

    return <Line data={data} options={options} />;
  };

  const handleDownload = () => {
    const graphItems = document.querySelectorAll(".chart-container");
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


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Graph Popup"
      className="graph-popup"
    >
      <div className="popup-content">
      <button className="detail-download-btn" onClick={handleDownload}>
          <FaDownload size={22} color="blue" className="fa-down" />
        </button>
        <h2>
          {graphType.charAt(0).toUpperCase() + graphType.slice(1)} Analysis
        </h2>
        <div className="chart-container">
        <div className="chart-item">
          <h2>Predictive Chart</h2>
          {renderPredictiveGraph()}
        </div>
        <h2>Impact Analysis</h2>
        <div className="impact-cards">{renderImpactCards()}</div>
        {recommendation && (
          <div className="recommendation">
            <p><span>Alert :</span>{recommendation}</p>
          </div>
        )}
        </div>
        <button onClick={onRequestClose} className="close-button">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default GraphPopup;
