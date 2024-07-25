
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
}from'chart.js'
import {Bar}from'react-chartjs-2'
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options={
    responsive:true,
    Plugins:{
        legend:{
            position:'button'
        },
        title:{
            display:true,
            text:'Tamil skillhub Bar chart'
        },
    },
};
const data={
    labels:['Jan','Feb','Mar'],
    datasets:[
        {
            label:'Present',
            data:[11,13,12],
            backgroundColor:'orange'
            
        },
        {
            label:'Absent',
            data:[4,2,3],
            backgroundColor:'blue'
        }
    ]
}

function BarChart() {
  return (
    <div style={{width:450,height:400}}>
      <Bar options={options} data={data}/>
    </div>
  );
}

export default BarChart;
