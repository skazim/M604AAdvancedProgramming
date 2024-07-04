import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [{"Number_of_vehicles_involved":1,"Number_of_casualties":1,"count":1635},{"Number_of_vehicles_involved":1,"Number_of_casualties":2,"count":266},{"Number_of_vehicles_involved":1,"Number_of_casualties":3,"count":39},{"Number_of_vehicles_involved":1,"Number_of_casualties":4,"count":56},{"Number_of_vehicles_involved":2,"Number_of_casualties":1,"count":5803},{"Number_of_vehicles_involved":2,"Number_of_casualties":2,"count":1530},{"Number_of_vehicles_involved":2,"Number_of_casualties":3,"count":610},{"Number_of_vehicles_involved":2,"Number_of_casualties":4,"count":225},{"Number_of_vehicles_involved":2,"Number_of_casualties":5,"count":101},{"Number_of_vehicles_involved":2,"Number_of_casualties":6,"count":49},{"Number_of_vehicles_involved":2,"Number_of_casualties":7,"count":14},{"Number_of_vehicles_involved":2,"Number_of_casualties":8,"count":8},{"Number_of_vehicles_involved":3,"Number_of_casualties":1,"count":774},{"Number_of_vehicles_involved":3,"Number_of_casualties":2,"count":380},{"Number_of_vehicles_involved":3,"Number_of_casualties":3,"count":232},{"Number_of_vehicles_involved":3,"Number_of_casualties":4,"count":103},{"Number_of_vehicles_involved":3,"Number_of_casualties":5,"count":60},{"Number_of_vehicles_involved":3,"Number_of_casualties":6,"count":19},{"Number_of_vehicles_involved":4,"Number_of_casualties":1,"count":160},{"Number_of_vehicles_involved":4,"Number_of_casualties":2,"count":90},{"Number_of_vehicles_involved":4,"Number_of_casualties":3,"count":28},{"Number_of_vehicles_involved":4,"Number_of_casualties":4,"count":10},{"Number_of_vehicles_involved":4,"Number_of_casualties":5,"count":46},{"Number_of_vehicles_involved":4,"Number_of_casualties":6,"count":21},{"Number_of_vehicles_involved":4,"Number_of_casualties":7,"count":8},{"Number_of_vehicles_involved":6,"Number_of_casualties":1,"count":18},{"Number_of_vehicles_involved":6,"Number_of_casualties":2,"count":24},{"Number_of_vehicles_involved":7,"Number_of_casualties":1,"count":7}];

export const AgeBand = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20, right: 20, bottom: 20, left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="Number_of_vehicles_involved" name="Number of Vehicles Involved" />
        <YAxis type="number" dataKey="Number_of_casualties" name="Number of Casualties" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Pair Plot of Vehicles and Casualities" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
