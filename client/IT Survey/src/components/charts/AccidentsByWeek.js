import {useState, useEffect } from "react";
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

export const AccidentsByWeek = ()=>{
    
    const [accidentChart, setAccidentChart] = useState({
    labels: [],
    datasets: [{
      label: 'Accidents by Day of Week',
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
    useEffect(() => {
        const fetchAsync = async () =>{
            try{
                const response = await fetch('http://127.0.0.1:5000/getAccidentsByWeek');
                const dataRes = await response.json();
                const dataParsed = JSON.parse(dataRes.accidentsByWeek)
                const labels = Object.keys(dataParsed).map(key => dataParsed[key].Day_of_week);
                const data = Object.keys(dataParsed).map(key => dataParsed[key].Count);
                
                setAccidentChart({
                    ...accidentChart,
                    labels: labels,
                    datasets: [{
                      ...accidentChart.datasets[0],
                      data: data,
                    }],
                  });
            }
            catch(error){
                console.log('Error while fetching ', error)
            }
        };
        fetchAsync();
    },[])
    return (
        Object.keys(accidentChart).length > 1 ? (
          <div>
            <Bar data={accidentChart} />
          </div>
        ) : null
    )
}