import "./Assumption.css";
import ReactSpeedometer from "react-d3-speedometer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Assumption = () => {
    const data = [
        {
            name: 'Work Hours',
            TotalHours: 10,
            CompletedHours: 10,
            Availability: 100, // 100% available because workers completed early
            ResourcesAllocated: 5, // Example number of resources/tasks allocated
          },
          {
            name: 'Worker 1',
            TotalHours: 8,
            CompletedHours: 8,
            Availability: 100, // Completed early, available for allocation
            ResourcesAllocated: 3, // Resources allocated to this worker
          },
          {
            name: 'Worker 2',
            TotalHours: 10,
            CompletedHours: 8,
            Availability: 80, // 80% availability due to finishing early
            ResourcesAllocated: 0, // No additional resources allocated
          },
          {
            name: 'Worker 3',
            TotalHours: 10,
            CompletedHours: 9,
            Availability: 90, // Almost done, availability soon
            ResourcesAllocated: 1, // Resources allocated to this worker
          },
      ];
  const machinePerformance = 75; // Machine performance in percentage (0-100)
  const employeePerformance = 90; // Employee performance in percentage (0-100)
  const qualityData = {
    goodProducts: 980,
    defectiveProducts: 20,
    dispatchedProducts: 500,
    scrapProducts: 10,
  };
  return (
    <>
    <div className="availablity">
    <h2>Availability</h2>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="CompletedHours" stackId="a" fill="#82ca9d" />
        <Bar dataKey="RemainingHours" stackId="a" fill="#8884d8" />
        <Bar dataKey="Availability" fill="#ffc658" />
        <Bar dataKey="ResourcesAllocated" fill="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
    </div>
    <div className="performance">
        <h2>Performance</h2>
    </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px",
        }}
      >
        {/* Machine Performance Meter */}
        <div>
          <h3>Machine Performance</h3>
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
          <h3>Employee Performance</h3>
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
        <h2>Quality</h2>
      </div>
      <div className="quality-cards">
        <div className="cardStyle">
          <h3>Good Products</h3>
          <p>{qualityData.goodProducts}</p>
        </div>
        <div className="cardStyle">
          <h3>Defective Products</h3>
          <p>{qualityData.defectiveProducts}</p>
        </div>
        <div className="cardStyle">
          <h3>Dispatched Products</h3>
          <p>{qualityData.dispatchedProducts}</p>
        </div>
        <div className="cardStyle">
          <h3>Scrap Products</h3>
          <p>{qualityData.scrapProducts}</p>
        </div>
      </div>
    </>
  );
};

export default Assumption;
