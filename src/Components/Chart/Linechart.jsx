import React from 'react'
import {
    Chart as ChartJS, 
LineElement, 
CategoryScale,//x axis
LinearScale,//y axis
PointElement
}from'chart.js';
import {Line} from'react-chartjs-2';
ChartJS.register(
LineElement, 
CategoryScale,
LinearScale,
PointElement
)

const data={
  labels:["inprogress","completed","todo"],
  datasets:[
    {
      label: "Assignment Completion",
      data: [10,20,5],
      backgroundColor: [
        "rgba(255.99,132,0.2)",
        "rgba(54,162,235,0.2)",
        "rgba(255,206,86,0.2)",
      ],
      borderColor:[
        "rgba(255,99,132,1)",
        "rgba(54,162,235,1)",
        "rgba(255,206,86,1)",
      ],
      borderWidth:1
    },
  ],
};

 function Linechart() {
  return (
    <div style={{width:500,height:400}} >
    <Line  data={data}/>
  </div>
  );
}
export default Linechart;
