import { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa6";
import { Line } from "react-chartjs-2";
import Plot from "react-plotly.js";
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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Modal from "react-modal";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGraphType, setSelectedGraphType] = useState(null);
  const [predictiveData, setPredictiveData] = useState(null);
  const [impactCards, setImpactCards] = useState([]);
  const [recommendation, setRecommendation] = useState("");

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
        console.error("There was an error fetching the predictive data!", error);
      });
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

  const renderPredictiveGraph = () => {
    if (!predictiveData) return null;

    switch (selectedGraphType) {
      case "line-chart":
        return renderPredictiveLineChart();
      case "waterfall-chart":
        return renderPredictiveWaterfallChart();
      default:
        return null;
    }
  };

  const renderPredictiveLineChart = () => {
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

  const renderPredictiveWaterfallChart = () => {
    return (
      <Plot
        data={[
          {
            type: "waterfall",
            x: predictiveData.x,
            y: predictiveData.y,
            measure: predictiveData.measure,
            text: predictiveData.y.map(String),
            textposition: "outside",
            decreasing: { marker: { color: "#0069c0" } },
            increasing: { marker: { color: "#00a9b5" } },
            totals: { marker: { color: "#00c698" } },
            connector: { line: { color: "Tan" } },
          },
        ]}
        layout={{
          autosize: true,
          title: "Predicted Temperature Changes",
          yaxis: {
            title: "Temperature (°C)",
          },
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "400px" }}
      />
    );
  };

  return (
    <div className="dashboard-container">
      <div className="graphs-container">
        <button className="download-btn" onClick={handleDownload}>
          <FaDownload size={22} color="blue" className="fa-down" />
        </button>
        <div className="cards-container">
          {/* Total Entries */}
          <div className="card">
            <h2>Total Entries</h2>
            <p>{total_entries.total_entries}</p>
          </div>

          {/* CHW In Temp Card */}
          <div className="card">
            <h2>Inlet Temperature</h2>
            <p>Min: {chw_in_temp.min_chw_in_temp}°C</p>
            <p>Max: {chw_in_temp.max_chw_in_temp}°C</p>
          </div>

          {/* CHW Out Temp Card */}
          <div className="card">
            <h2>Outlet Temperature</h2>
            <p>Min: {chw_out_temp.min_chw_out_temp}°C</p>
            <p>Max: {chw_out_temp.max_chw_out_temp}°C</p>
          </div>

          {/* Average Temperatures Card */}
          <div className="card">
            <h2>Average Temperatures</h2>
            <p>In: {avg_temps.avg_chw_in_temp.toFixed(2)}°C</p>
            <p>Out: {avg_temps.avg_chw_out_temp.toFixed(2)}°C</p>
          </div>
        </div>

        <div className="graphs-grid">
          {/* Line Chart */}
          <div className="graph-item" onClick={() => handleGraphClick("line-chart")}>
            <h2 className="graph-title">Temperature Trends</h2>
            <Line
              data={{
                labels: chartData.line_chart.labels,
                datasets: [
                  {
                    label: "CHW In",
                    data: chartData.line_chart.datasets[0].data,
                    borderColor: "Yellow",
                    backgroundColor: "Blue",
                  },
                  {
                    label: "CHW Out",
                    data: chartData.line_chart.datasets[1].data,
                    borderColor: "Beige",
                    backgroundColor: "DarkGreen",
                  },
                  {
                    label: "COW In",
                    data: chartData.line_chart.datasets[2].data,
                    borderColor: "LightBlue",
                    backgroundColor: "Maroon",
                  },
                  {
                    label: "COW Out",
                    data: chartData.line_chart.datasets[3].data,
                    borderColor: "Black",
                    backgroundColor: "Orange",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>

          {/* Waterfall Chart */}
          <div className="graph-item" onClick={() => handleGraphClick("waterfall-chart")}>
            <h2 className="graph-title">Temperature Changes</h2>
            <Plot
              data={[
                {
                  type: "waterfall",
                  x: chartData.waterfall_chart.x,
                  y: scaledWaterfallY,
                  measure: chartData.waterfall_chart.measure,
                  text: scaledWaterfallY.map(String),
                  textposition: "outside",
                  decreasing: { marker: { color: "#0069c0" } },
                  increasing: { marker: { color: "#00a9b5" } },
                  totals: { marker: { color: "#00c698" } },
                  connector: { line: { color: "Tan" } },
                },
              ]}
              layout={{
                autosize: true,
                yaxis: {
                  title: "Temperature (°C)",
                },
              }}
              useResizeHandler={true}
              style={{ width: "100%", height: "400px" }}
            />
          </div>

          {/* Add other graphs here */}
        </div>
      </div>

      <Modal
        isOpen={isPopupOpen}
        onRequestClose={() => setIsPopupOpen(false)}
        contentLabel="Graph Popup"
        className="graph-popup"
      >
        <div className="popup-content">
          <h2>
            {selectedGraphType && selectedGraphType.charAt(0).toUpperCase() + selectedGraphType.slice(1)} Analysis
          </h2>
          <div className="chart-container">
            <h2>Predictive Chart</h2>
            {renderPredictiveGraph()}
          </div>
          <h2>Impact Analysis</h2>
          <div className="impact-cards">
            {impactCards.map((card, index) => (
              <div key={index} className="impact-card">
                <h3>{card.title}</h3>
                <p className="value">{card.value}</p>
                <p className="description">{card.description}</p>
              </div>
            ))}
          </div>
          {recommendation && (
            <div className="recommendation">
              <p>Info: {recommendation}</p>
            </div>
          )}
          <button onClick={() => setIsPopupOpen(false)} className="close-button">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;