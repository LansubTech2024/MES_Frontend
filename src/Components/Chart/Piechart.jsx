import {
    Chart as ChartJS, ArcElement, Legend,Tooltip
}from'chart.js';
import {Pie} from'react-chartjs-2';
ChartJS.register(ArcElement,Legend,Tooltip)

const data={
  labels:["Hole","Strain","Flate"],
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

 function Piechart() {
  return (
    <div style={{width:300,height:850}} >
    <Pie  data={data}/>
  </div>
  );
}
export default Piechart;
