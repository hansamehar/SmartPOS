import React, { useEffect, useState } from "react";
import { getProductAPI, getSaleAPI } from "../services/allAPI";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  
  const getProducts = async () => {
    try {
      const result = await getProductAPI();
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        setProducts(result.data);
      } else {
        console.log("api call failed");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getSales = async () => {
    try {
      const result = await getSaleAPI();
      console.log(result);
      if (result.status >= 200 && result.status < 300) {
        setSales(result.data);
      } else {
        console.log("api call failed");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProducts();
    getSales();
  }, []);
  

let totalSalesByProduct = products.reduce((acc, product) => {
  acc[product.id] = 0; 
  return acc;
}, {});

sales.forEach(sale => {
  if (totalSalesByProduct[sale.id] !== undefined) {
    totalSalesByProduct[sale.id] += Number(sale.quantity); 
  } else {
  }
});


  const chartData = {
    labels: [],
    datasets: [
      {
        label: 'Stock',
        data: [],
        fill: false,
        borderColor: '#7CA9D8',
        tension: 0.1
        
      },
      {
        label: 'Sold',
        data: [],
        fill: false,
        borderColor: '#6AC6C6',
        tension: 0.1
      }
    ]
  };

  const topProducts = products.slice(0, 10);  

  topProducts.forEach(product => {
    const totalSold = totalSalesByProduct[product.id] || 0;
  
  
    chartData.labels.push(product.id);
    chartData.datasets[0].data.push(product.stock);  
    chartData.datasets[1].data.push(totalSold);     
  });
  

  return (
    <div className="text-center">
      <h4>Stock vs Sold Chart</h4>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default Chart;
