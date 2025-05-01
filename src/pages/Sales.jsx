import React, { useEffect, useState } from "react";
import { getSalesAPI } from "../services/allAPI";
import Menu from "../components/Menu";
import "../styles/Common.css";

const Sales = () => {
  const [sales, setSales] = useState([]);

  const getsales = async () => {
    const token = sessionStorage.getItem("token");
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (token && user.role == "admin") {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getSalesAPI(reqHeader);
        if (result.status == 200) {
          setSales(result.data);
        } else {
          alert(result.response.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("admin access only");
    }
  };

  useEffect(() => {
    getsales();
  }, []);

  return (
    <>
      <Menu />
      <div className="maindiv">
        <h4 className="my-3">Sales :</h4>
        <div className="table-responsive">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Subtotal</th>
                <th>Discount</th>
                <th>Grand Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id}>
                  <td>{new Date(sale.Date).toLocaleString()}</td>
                  <td>{sale.customer?.name}</td>
                  <td>{sale.customer?.phone}</td>
                  <td>${sale.subtotal}</td>
                  <td>{sale.discount}%</td>
                  <td>${sale.grandTotal}</td>
                  <td>
                    {sale.items.map((item, index) => (
                      <div style={{ whiteSpace: 'normal' }}>
                        <div><strong>Product Name:</strong> {item.product?.name}</div>
                        <div><strong>Quantity:</strong> {item.quantity}</div>
                        <div><strong>Total:</strong> ${item.total}</div>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Sales;
