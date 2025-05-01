import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getSalesDataAPI } from '../../services/allAPI';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = () => {
    const [salesData, setSalesData] = useState([]);
    console.log(salesData);
    
    const getsalesData = async () => {
       const token = sessionStorage.getItem("token");
       const user = JSON.parse(sessionStorage.getItem("user"));
       if (token) {
         const reqHeader = {
           Authorization: `Bearer ${token}`,
         };
         try {
           const result = await getSalesDataAPI(reqHeader);
           if (result.status == 200) {
             setSalesData(result.data);
           } else {
             alert(result.response.data);
           }
         } catch (e) {
           console.log(e);
         }
       } else {
         console.log("denied access");
       }
     };
    
    useEffect(() => {
    getsalesData()
    }, []);
    
  const chartData = {
    labels: salesData.map((entry) => entry.date), 
    datasets: [
      {
        label: 'Daily Sales ($)',
        data: salesData.map((entry) => entry.total), 
        backgroundColor: '#2f2e44', 
        borderWidth: 0,
        hoverBackgroundColor: '#d9f275',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Daily Sales Trend',
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value}`, 
        },
      },
    },
  };

  return (
     <> <Bar data={chartData} options={options} /></>
  );
};

export default SalesChart;
