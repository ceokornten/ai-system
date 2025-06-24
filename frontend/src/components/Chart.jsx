import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

export default function Chart({ data }) {
  const chartData = {
    labels: data.map((_,i)=>i+1),
    datasets: [{ label: 'Queries', data, borderColor: 'rgb(75,192,192)' }]
  };
  return <Line data={chartData} />;
}
