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
      <style>{`
    .icon {
      font-size: 1.2rem;
      width: 40px;
      height: 40px;
      color: #2f2e43;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}</style>
      <Menu />
      <div className="maindiv vh-100 overflow-hidden">
        <div class="container-fluid h-100">
          <div class="row h-100">
            <div class="col-md-8 d-flex flex-column">
              <div className="row ">
                <div className="col-md-6 mb-3">
                  <div
                    className="rounded p-3 d-flex align-items-center gap-3 bg-white "
                    
                  >
                    <i
                      className="fas fa-shopping-cart p-2 rounded-circle icon"
                      style={{ backgroundColor: "#fce5d8" }}
                    ></i>
                    <div>
                      <h6 className="mb-1 text-secondary">Total Sales</h6>
                      <h4 className="m-0">{metrics.totalSales}</h4>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div
                    className="rounded p-3 d-flex align-items-center gap-3 bg-white"
                    
                  >
                    <i
                      className="fas fa-dollar-sign p-2 rounded-circle icon"
                      style={{ backgroundColor: "#effac7" }}
                    ></i>
                    <div>
                      <h6 className="mb-1 text-secondary">Total Revenue</h6>
                      <h4 className="m-0">${metrics.totalRevenue}</h4>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div
                    className="rounded p-3 d-flex align-items-center gap-3 bg-white"
                    
                  >
                    <i
                      className="fas fa-user p-2 rounded-circle icon"
                      style={{ backgroundColor: "#dcddf4" }}
                    ></i>
                    <div>
                      <h6 className="mb-1 text-secondary">Total Customers</h6>
                      <h4 className="m-0">{metrics.totalCustomers}</h4>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div
                    className="rounded p-3 d-flex align-items-center gap-3 bg-white"
                    
                  >
                    <i
                      className="fas fa-box p-2 rounded-circle icon"
                      style={{ backgroundColor: "#fce5d8" }}
                    ></i>
                    <div>
                      <h6 className="mb-1 text-secondary">Total Products</h6>
                      <h4 className="m-0">{metrics.totalProducts}</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row flex-grow-1 mx-1">
                <h4 style={{color:'#2f2e43'}}>Daily Sales Trend</h4>
                <div
                  style={{ maxHeight: "330px"}}
                  className="rounded p-4  d-flex justify-content-center bg-white"
                >
                  <SalesChart />
                </div>
              </div>
            </div>

            <div class="col-md-4 h-100">
            <div>
                <Calendar />
              </div>
              <div
                
                className="rounded p-2 mt-2 d-flex justify-content-center bg-white"
              >
                <TopProductsChart />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
