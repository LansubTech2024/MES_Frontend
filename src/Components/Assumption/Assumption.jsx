import "./Assumption.css";
import ReactSpeedometer from "react-d3-speedometer";
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
  const machinePerformance = 75; // Machine performance in percentage (0-100)
  const employeePerformance = 90; // Employee performance in percentage (0-100)
  const qualityData = {
    TotalProducts: 1000,
    defectiveProducts: 98,
    dispatchedProducts: 832,
    scrapProducts: 70,
  };
  return (
    <>
      <div className="available">
        <h2 className="font-effect-shadow-multiple">Availability</h2>
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
                <XAxis dataKey="date" label={{ value: 'Date', position: 'bottom', offset: 0}} />
                <YAxis label={{ value: 'Completion Rate (%)', angle: 90, position: 'center',  }} />
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
                <XAxis dataKey="date" label={{ value: 'Date', position: 'bottom', offset: 0 }}  />
                <YAxis  label={{ value: 'Resources', angle: -90, position: 'insideLeft' }}/>
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
        <h2 className="font-effect-shadow-multiple">Performance</h2>
      </div>
      <div
       className="performance-graphs"
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px",
        }}
      >
        {/* Machine Performance Meter */}
        <div>
          <h3 className="font-effect-emboss">Machine Performance</h3>
          <ReactSpeedometer
            value={machinePerformance}
            minValue={0}
            maxValue={100}
            needleColor="steelblue"
            startColor="green"
            segments={10}
            endColor="red"
            currentValueText="Machine Performance: ${value}%"
          />
        </div>

        {/* Employee Performance Meter */}
        <div>
          <h3 className="font-effect-emboss">Employee Performance</h3>
          <ReactSpeedometer
            value={employeePerformance}
            minValue={0}
            maxValue={100}
            needleColor="steelblue"
            startColor="green"
            segments={10}
            endColor="red"
            currentValueText="Employee Performance: ${value}%"
          />
        </div>
      </div>
      <div className="quality">
        <h2 className="font-effect-shadow-multiple">Quality</h2>
      </div>
      <div className="quality-cards">
        <div className="cardStyle">
          <h3>Total<br/>Products</h3>
          <p>{qualityData.TotalProducts}</p>
        </div>
        <div className="cardStyle">
          <h3>Defective<br/>Products</h3>
          <p>{qualityData.defectiveProducts}</p>
        </div>
        <div className="cardStyle">
          <h3>Dispatched Products</h3>
          <p>{qualityData.dispatchedProducts}</p>
        </div>
        <div className="cardStyle">
          <h3>Scrap<br/>Products</h3>
          <p>{qualityData.scrapProducts}</p>
        </div>
      </div>
    </>
  );
};

export default Assumption;
