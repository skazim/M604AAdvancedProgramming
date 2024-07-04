import { useEffect, useState } from "react"
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
export const Junctions = () =>{

    const [chart , setChart] = useState({
        labels: [],
    datasets: [{
      label: 'Types of Junctions',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }],
    });
    useEffect(()=>{
        const fetchAsync = async () =>{
            try{
            const response = await fetch('http://127.0.0.1:5000/getTypeOfJunctions');
            const dataRes = await response.json();
            const dataParsed = JSON.parse(dataRes.typeOfJunctions)
            const labels = Object.keys(dataParsed).map(key => dataParsed[key].Types_of_Junction);
            const data = Object.keys(dataParsed).map(key => dataParsed[key].count);

            setChart({
                ...chart,
                labels: labels,
                datasets: [{
                  ...chart.datasets[0],
                  data: data,
                }],
              });
            }
            catch(error){
                console.error("Error while fetching getTypeOfJunctions",error)
            }
        }
        fetchAsync();
    },[]);
    return (
        Object.keys(chart).length > 1 ? (
            <div>
              <Bar data={chart} />
            </div>
          ) : null
    )
}