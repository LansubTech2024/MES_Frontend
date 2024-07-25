
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
            backgroundColor:'rgba(255, 99, 132, 0.2)'
            
        },
        {
            label:'Absent',
            data:[4,2,3],
            backgroundColor:'rgba(53,162,235,0.5)'
        }
    ]
}

function BarChart() {
  return (
    <div style={{width:600,height:400}}>
      <Bar options={options} data={data}/>
    </div>
  );
}

export default BarChart;
