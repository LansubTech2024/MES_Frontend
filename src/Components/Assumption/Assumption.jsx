import "./Assumption.css";
import GaugeChart from "react-gauge-chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Assumption = () => {
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const startDate = "2024-08-25";
  const endDate = "2024-09-05";
  const totalDuration = calculateDuration(startDate, endDate);
  const totalResources = 10;

  const completionData = [
    { date: "2024-08-25", rate: 0 },
    { date: "2024-08-26", rate: 20 },
    { date: "2024-08-27", rate: 20 },
    { date: "2024-08-28", rate: 20 },
    { date: "2024-08-29", rate: 20 },
    { date: "2024-08-30", rate: 20 },
    { date: "2024-08-31", rate: 40 },
    { date: "2024-09-01", rate: 40 },
    { date: "2024-09-02", rate: 40 },
    { date: "2024-09-03", rate: 70 },
    { date: "2024-09-04", rate: 70 },
    { date: "2024-09-05", rate: 90 },
  ];

  const resourceData = [
    { date: "2024-08-25", allocated: 3, total: 10 },
    { date: "2024-08-26", allocated: 4, total: 10 },
    { date: "2024-08-27", allocated: 5, total: 10 },
    { date: "2024-08-28", allocated: 6, total: 10 },
    { date: "2024-08-29", allocated: 6, total: 10 },
    { date: "2024-08-30", allocated: 7, total: 10 },
    { date: "2024-08-31", allocated: 8, total: 10 },
    { date: "2024-09-01", allocated: 10, total: 10 },
    { date: "2024-09-03", allocated: 10, total: 10 },
    { date: "2024-09-04", allocated: 8, total: 10 },
    { date: "2024-09-05", allocated: 9, total: 10 },
  ];

  // Sample data
  const machineData = {
    temperature: 75, // Actual Temperature
    pressure: 120, // Actual Pressure
    standardTemp: 80, // Standard Temperature
    standardPressure: 130, // Standard Pressure
  };

  const manpowerData = {
    output: 100, // Total Output
    manHours: 20, // Total Man-Hours
    temperature: 75, // Temperature
    pressure: 120, // Pressure
  };

  // Calculate performance ratios
  const machineEfficiency =
    (machineData.temperature / machineData.standardTemp +
      machineData.pressure / machineData.standardPressure) /
    2;
  const manpowerEfficiency = manpowerData.output / manpowerData.manHours;

  const qualityData = {
    TotalProducts: 1000,
    defectiveProducts: 98,
    dispatchedProducts: 832,
    scrapProducts: 70,
  };
  return (
    <>
      <div className="available">
        <h2>Availability</h2>
      </div>
      <div className="availability">
        <div className="availabilty-cards">
          <div className="available-card">
            <h3>Total Duration</h3>
            <p>{totalDuration} days</p>
            <p>From: {startDate}</p>
            <p>To: {endDate}</p>
          </div>
          <div className="available-card">
            <h3>Total Resources</h3>
            <p>{totalResources} workers</p>
          </div>
        </div>
        <div className="availabilty-graphs">
          <div className="available-graph full-width">
            <h3 className="font-effect-emboss">Project Completion Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  label={{ value: "Date", position: "bottom", offset: 0 }}
                />
                <YAxis
                  label={{
                    value: "Completion Rate (%)",
                    angle: 90,
                    position: "center",
                  }}
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="blue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="available-graph full-width">
            <h3 className="font-effect-emboss">Resources Allocated</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resourceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  label={{ value: "Date", position: "bottom", offset: 0 }}
                />
                <YAxis
                  label={{
                    value: "Resources",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="allocated" fill="#1fe074" />
                <Bar dataKey="total" fill="purple" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="performance">
        <h2>Performance</h2>
      </div>
      <div
        className="performance-graphs"
      >
        <div className="machine-meter">
        <div style={{ textAlign: "center", width:"500px" }}>
          <h2>Machine Performance</h2>
          <GaugeChart
            id="machine-performance-gauge"
            nrOfLevels={10}
            percent={machineEfficiency}
            textColor="#000"
            arcWidth={0.3}
            needleColor="#000"
            needleBaseColor="#000"
          />
          <p>Efficiency Ratio: {(machineEfficiency * 100).toFixed(2)}%</p>
        </div>
        <div className="section-style">
          <h3 className="sub-header-style">Machine Efficiency</h3>
          <p>
            Machine efficiency is calculated as the average of temperature and
            pressure ratios:
          </p>
          <div className="code-style">
            (Temperature / Standard Temperature + Pressure / Standard Pressure)
            / 2
          </div>
        </div>
        </div>
        <div className="manpower-meter">
        <div style={{ textAlign: "center", width:"500px" }}>
          <h2>Manpower Performance</h2>
          <GaugeChart
            id="manpower-performance-gauge"
            nrOfLevels={10}
            percent={manpowerEfficiency / 10} // Assuming a maximum output of 1000 units
            textColor="#000"
            arcWidth={0.3}
            needleColor="#000"
            needleBaseColor="#000"
          />
          <p>Output per Man-Hour: {manpowerEfficiency.toFixed(2)} units/hour</p>
        </div>
        <div className="section-style">
          <h3 className="sub-header-style">Manpower Efficiency</h3>
          <p>
            Manpower efficiency is calculated as the ratio of output to
            man-hours:
          </p>
          <div className="code-style">Output / Man-Hours</div>
        </div>
        </div>
      </div>

      <div className="quality">
        <h2>Quality</h2>
      </div>
      <div className="quality-cards">
        <div className="cardStyle">
          <h3>
            Total
            <br />
            Products
          </h3>
          <p>{qualityData.TotalProducts}</p>
        </div>
        <div className="cardStyle">
          <h3>
            Defective
            <br />
            Products
          </h3>
          <p>{qualityData.defectiveProducts}</p>
        </div>
        <div className="cardStyle">
          <h3>Dispatched Products</h3>
          <p>{qualityData.dispatchedProducts}</p>
        </div>
        <div className="cardStyle">
          <h3>
            Scrap
            <br />
            Products
          </h3>
          <p>{qualityData.scrapProducts}</p>
        </div>
      </div>
    </>
  );
};

export default Assumption;
