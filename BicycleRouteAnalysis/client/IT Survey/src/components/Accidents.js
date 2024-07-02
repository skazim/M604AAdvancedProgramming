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

export const Accidents = (values)=>{
    
    const [accidentChart , setAccidentChart] = useState({});
    useEffect(() => {
        const fetchAsync = async () =>{
            try{
                const response = await fetch('http://127.0.0.1:5000/getAccidentSeverity');
                const data = await response.json();
                const dataParsed = JSON.parse(data.accidentSeverity)
                const groupSeverity = dataParsed.reduce((a,c)=>{
                    const vehicles = c['Number_of_vehicles_involved'];
                    const accidents = c['Accident_severity'];
                    const count= c['Count'];

                    if (!a[accidents]){
                        a[accidents] = {labels : [], counts: []}
                    }
                    a[accidents].labels.push(vehicles);
                    a[accidents].counts.push(count);
                    return a;
                },{});

                const graph = Object.keys(groupSeverity).map(item=>(
                    {
                    item, data: {
                        labels : groupSeverity[item].labels,
                        datasets: [
                            {
                                label: item,
                                data : groupSeverity[item].counts,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',borderColor: 'rgba(255, 99, 132, 1)',borderWidth: 1,
                            }
                        ]
                    }
                }
                ))
                setAccidentChart(graph);
            }
            catch(error){
                console.log('Error while fetching ', error)
            }
        };
        fetchAsync();
    },[])
    const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    return (
        Object.keys(accidentChart).length > 1 ? (
            <div>
                <h1>Accidents</h1>
                {
                    accidentChart.map((chart, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>{chart.severity}</h3>
                        <Bar data={chart.data} options={options} />
                        </div>
                    ))
                }
            </div>

        ) : null
    )
}