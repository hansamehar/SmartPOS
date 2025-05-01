import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getTopProductsAPI } from '../../services/allAPI';

ChartJS.register(ArcElement, Tooltip, Legend);

const TopProductsChart = () => {
  const [ProductsData, setProductsData] = useState([]);

    const getProductsData = async () => {
       const token = sessionStorage.getItem("token");
       const user = JSON.parse(sessionStorage.getItem("user"));
       if (token) {
         const reqHeader = {
           Authorization: `Bearer ${token}`,
         };
         try {
           const result = await getTopProductsAPI(reqHeader);
           if (result.status == 200) {
             setProductsData(result.data);
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
    getProductsData()
    }, []);
  const chartData = {
    labels: ProductsData.map((product) => product.productName),
    datasets: [
      {
        label: 'Total Sales ($)',
        data: ProductsData.map((product) => product.totalSales),
        backgroundColor: [
          '#ae97e3',
          '#fcc6c2',
          '#effac7',
          '#fae4d5',
          '#dcdef2',

        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Top Selling Products',
        font: { size: 18 },
        color: '#2f2e44',
      },
    },
  };

  return (
    <>
      <Doughnut data={chartData} options={options} />
    </>
  );
};

export default TopProductsChart;
