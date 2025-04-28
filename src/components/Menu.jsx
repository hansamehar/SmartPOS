import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Menu.css";
import { useLocation } from "react-router-dom";
import { Authcontext } from "../contexts/ContextAPI";

const Menu = () => {
  const { user, setUser } = useContext(Authcontext);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const logout = () => {
    sessionStorage.clear();
    setUser("");
    navigate("/");
  };
  return (
    <>
      <aside>
        <div className="sidemenu d-flex flex-column justify-content-between rounded">
          <div className="d-flex flex-column">
            <div>
              <h5 className="text-center logo mb-4">
                <i class="fa-solid fa-cash-register p-2"></i>
                <span className="label">SmartPOS</span>
              </h5>
            </div>
            <Link className={isActive("/home") && "active"} to={"/home"}>
            <i class="fa-solid fa-chart-simple p-2"></i>
              <span className="label">Dashboard</span>
            </Link>
            <Link className={isActive("/Products") && "active"} to={"/Products"}>
              <i class="fa-solid fa-desktop p-2"></i>
              <span className="label">Inventory</span>
            </Link>
            {user?.role == "admin" && (
              <>
                <Link className={isActive("/users") && "active"} to={"/users"}>
                  <i class="fa-solid fa-user p-2"></i>
                  <span className="label">Users</span>
                </Link>
                <Link className={isActive("/sales") && "active"} to={"/sales"}>
                <i class="fa-solid fa-receipt p-2"></i>
                  <span className="label">Sales</span>
                </Link>
                <Link className={isActive("/auditlogs") && "active"} to={"/auditlogs"}>
                <i class="fa-solid fa-clipboard-list p-2"></i>
                  <span className="label">Audit Logs</span>
                </Link>
              </>
            )}
            {user?.role == "cashier" && (
              <Link className={isActive("/pos") && "active"} to={"/pos"}>
                <i class="fa-solid fa-cash-register p-2"></i>
                <span className="label">POS</span>
              </Link>
            )}
            {/* <Link className={isActive("/category") && "active"} to={"/category"}>
              <i class="fa-solid fa-boxes-stacked p-2"></i>
              <span className="label">Category</span>
            </Link> */}
          </div>

          <button className="btn text-light text-start" onClick={logout}>
            <i class="fa-solid fa-right-from-bracket p-2"></i>logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Menu;
