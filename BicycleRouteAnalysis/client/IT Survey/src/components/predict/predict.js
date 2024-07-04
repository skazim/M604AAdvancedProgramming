import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import { useState,useEffect } from 'react';
import axios from 'axios';

export const Predict = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('http://127.0.0.1:5000/getModelAnalysis');
              const responseData = response.data;        
              const formattedData = Object.entries(responseData).map(([key, value]) => ({
                name: key,
                accuracy: Math.round(value * 100)
              }));
        
              setData(formattedData);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false);
            }
          };
        fetchData();
      }, []);
  return (
    Object.keys(data).length > 1 ? (
        <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="accuracy" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    ) : (loading && <div className="loader-overlay"><div className="loader"></div></div>)
    
  );
};
