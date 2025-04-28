import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Users from "./pages/Users";
import POS from "./pages/POS";
import Sales from "./pages/Sales";
import AuditLogs from "./pages/AuditLogs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/pos" element={<POS />} />
        <Route path="/users" element={<Users />} />
        <Route path="/auditlogs" element={<AuditLogs />} />
      </Routes>
    </>
  );
}

export default App;
