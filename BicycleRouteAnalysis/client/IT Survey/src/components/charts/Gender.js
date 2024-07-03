import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  );

export const Gender = (values)=>{
    const {category,count}= Object.entries(values)[0][1];
    const data = {
        labels : category,
        datasets: [
            {
                label: 'Count',
                data: count,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                  ],
                  borderWidth: 1
            }
        ]
    };
    const options = {
        scales: {
          y: {
            beginAtZero: true
          }
        }
    };

    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h1>Gender Analysis</h1>
            <div class="col-4">
              <Bar data={data} options={options}/>
            </div>
          </div>
        </div>
      </div>
    )
}