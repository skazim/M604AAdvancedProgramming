import {useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Card } from "react-bootstrap";

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
import { AccidentSeverity } from "./AccidentSeverity";
import { AccidentsByWeek } from "./AccidentsByWeek";
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

export const Accidents = ()=>{
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            }
            catch(error){
                console.log('Error while fetching ', error)
                setLoading(false);
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
            
            <div class="container-fluid">
                <div class="row">
                    
                        <h1>Accidents</h1>
                        <div class="col-6">
                        <Card className="text-dark">
                            <Card.Body> 
                                <Card.Title>Accidents Severity</Card.Title>
                                <Card.Text>
                                    <AccidentSeverity />
                                </Card.Text>
                            </Card.Body>
                        </Card>   
                        </div>
                        <div class="col-6">
                        <Card className="text-dark">
                            <Card.Body> 
                                <Card.Title>Accidents Per Week</Card.Title>
                                <Card.Text>
                                    <AccidentsByWeek />
                                </Card.Text>
                            </Card.Body>
                        </Card>  
                        </div>
                    
                </div>
                <div class="row" style={{paddingTop: '10px'}}>
                {accidentChart.map((chart, index) => (
                    <div key={index} class="col-4">
                        <Card >
                            <Card.Body> 
                                <Card.Title>{chart.item} -</Card.Title>
                                <Bar data={chart.data} options={options} />
                            </Card.Body>
                        </Card>
                            
                            
                    </div>
                    
                ))}
                </div>
          </div>
        ) : (
            loading && <div className="loader-overlay"><div className="loader"></div></div>
        )
    )
}