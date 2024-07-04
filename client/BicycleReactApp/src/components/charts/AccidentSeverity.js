import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
export const AccidentSeverity = () =>{


    const [chart , setChart] = useState({});

    useEffect(() => {
        const fetchAsync = async () =>{
            const response = await fetch('http://127.0.0.1:5000/getAccidentSeverity');
            const data = await response.json();
            const dataParsed = JSON.parse(data.accidentSeverity)

            const severityData = dataParsed.reduce((acc, curr) => {
                const severity = acc.find(item => item.Accident_severity === curr.Accident_severity);
                if (severity) {
                  severity.Count += curr.Count;
                } else {
                  acc.push({ Accident_severity: curr.Accident_severity, Count: curr.Count });
                }
                return acc;
              }, []);

              setChart(severityData);
        }

        fetchAsync();

    },[])
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    
    return (
        Object.keys(chart).length > 1 ? (
            <div>
            <PieChart width={800} height={400}>
            <Pie
                data={chart}
                cx={400}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="Count"
            >
                {chart.map((entry, index) => (
                <Cell key={`cell-${index}`} name={entry.Accident_severity} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
        </div>
        ) : null
        
    )
}