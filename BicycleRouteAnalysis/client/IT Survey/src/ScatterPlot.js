import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(Tooltip, Legend, PointElement, LinearScale, Title);

const ScatterPlot = ({data}) => {
  // Prepare the data for the scatter plot
  const scatterData = {
    datasets: [
      {
        label: 'Female',
        data: data.yearsOfExperience
          .map((exp, index) => ({ x: exp, y: data.age[index] }))
          .filter((_, index) => data.gender[index] === 'Female'),
        backgroundColor: 'rgba(255, 99, 132, 1)'
      },
      {
        label: 'Male',
        data: data.yearsOfExperience
          .map((exp, index) => ({ x: exp, y: data.age[index] }))
          .filter((_, index) => data.gender[index] === 'Male'),
        backgroundColor: 'rgba(54, 162, 235, 1)'
      }
    ]
  };

  // Options for the scatter plot
  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Years of Experience'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Age'
        }
      }
    }
  };

  return <Scatter data={scatterData} options={options} />;
};

export default ScatterPlot;