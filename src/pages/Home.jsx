import React, { useContext, useEffect, useState } from "react";
import Menu from "../components/Menu";
import "../styles/Common.css";
import SalesChart from "../components/charts/SalesChart";
import TopProductsChart from "../components/charts/TopProductsChart";
import { getMetricsAPI } from "../services/allAPI";
import { Authcontext } from "../contexts/ContextAPI";
import profileImg from "../assets/profile.jpg";
import Calendar from "../components/Calender";

const Home = () => {
  const { user } = useContext(Authcontext);

  const [metrics, setMetrics] = useState([]);
  console.log(metrics);

  const getmetrics = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token) {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getMetricsAPI(reqHeader);
        if (result.status == 200) {
          setMetrics(result.data);
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
    getmetrics();
  }, []);

  return (
    <>
      <Menu />
      <div className="maindiv vh-100 overflow-hidden">
        <div class="container-fluid h-100">
          <div class="row h-100">
            <div class="col-md-8 d-flex flex-column">
              <div class="row ">
                <div class="col-md-6 mb-3">
                  <div class="rounded p-3" style={{backgroundColor:'#fff'}}>
                    <h5>Total Sales</h5>
                    <h4>{metrics.totalSales}</h4>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="rounded p-3" style={{backgroundColor:'#fff'}}><h5>Total Revenue</h5>
                  <h4>{metrics.totalRevenue}</h4></div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="rounded p-3" style={{backgroundColor:'#fff'}}><h5>Total Customers</h5>
                  <h4>{metrics.totalCustomers}</h4></div>
                </div>
                <div class="col-md-6 mb-3">
                  <div class="rounded p-3" style={{backgroundColor:'#fff'}}><h5>Total Products</h5>
                  <h4>{metrics.totalProducts}</h4> </div>
                </div>
              </div>

              <div class="row flex-grow-1" >
                <div style={{maxHeight:'330px',backgroundColor:'#fff'}} className="rounded p-4"><SalesChart /></div>
              </div>
            </div>

            <div class="col-md-4 h-100">
              <div style={{maxHeight:'300px',backgroundColor:'#fff'}} className="rounded p-2 mb-3"><TopProductsChart /></div>
              <div><Calendar/></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
