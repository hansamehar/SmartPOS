import { Route, Routes } from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Category from "./pages/Category"
import Products from "./pages/Products"
import Sales from "./pages/Sales"



function App() {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/Products" element={<Products/>}/>
        <Route path="/sales" element={<Sales/>}/>

      </Routes>
    </>
  )
}

export default App
