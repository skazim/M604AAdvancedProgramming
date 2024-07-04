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
import { PedestrianMovement } from './PedestrianMovement';
import { EducationLevel } from './EducationLevel';
import { CasualityList } from './Casualitieslist';
import { AgeBand } from './AgeBand';


import { Junctions } from './Junctions';
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

export const Gender = ({values})=>{
  
    const {category,count}= values;
    const data = {
        labels : category,
        datasets: [
            {
                label: 'Gender Count',
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
            <h1>Gender Analysis</h1>
            <div class="col-4">
            <Card className="text-white">
              <Card.Body> 
                <Card.Title>Accidents Severity</Card.Title>
                <Card.Text>
                  <PedestrianMovement />
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
            <div class="col-4">
            <Card className="text-white">
              <Card.Body> 
                <Card.Title>Accidents Severity</Card.Title>
                <Card.Text>
                  <Bar data={data} options={options}/>
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
            <div class="col-4">
            <Card className="text-white">
              <Card.Body> 
                <Card.Title>Education Level</Card.Title>
                <Card.Text>
                  <EducationLevel />
                </Card.Text>
              </Card.Body>
            </Card>
            </div>
        </div>
        <div class="row" style={{paddingTop: '10px'}}>
          <div class="col-4"></div>
          <div class="col-4">
          {/* <AgeBand /> */}
          </div>
          <div class="col-4"></div>
        </div>
        <div class="row" style={{paddingTop: '10px'}}>
          <div class="col-6">
            <Card className="text-white">
              <Card.Body> 
                <Card.Title>Accidents Severity</Card.Title>
                <Card.Text>
                  <CasualityList />
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div class="col-6">
            <Card className="text-white">
              <Card.Body> 
                <Card.Title>Accidents Severity</Card.Title>
                <Card.Text>
                  <Junctions />
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    )
}