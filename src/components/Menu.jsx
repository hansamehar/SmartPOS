import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'
import { useLocation } from 'react-router-dom'

const Menu = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <>

    <div style={{height:'100%',position:'fixed',zIndex:'5',backgroundColor:'#15333D'}}>
      <aside className='sidemenu d-flex flex-column  rounded ' style={{margin:'8px',height:'97%',backgroundColor:'#d4edda'}}>
          <div>
            <img src="" alt="" />
            <h4 style={{color:'#15333D'}} className='text-center logo mb-4'><i class="fa-regular fa-chart-bar icon"></i><span className='label fw-bold'>FitInventory</span></h4>
          </div>
          <Link className={isActive('/') ? 'active text-decoration-none p-2 my-1' : 'text-decoration-none p-2 my-1'} to={'/'}><i class="fa-solid fa-table-cells-large icon"></i><span className='label fw-bold'>Dashboard</span></Link>
          <Link className={isActive('/category') ? 'active text-decoration-none p-2 my-1' : 'text-decoration-none p-2 my-1'} to={'/category'}><i class="fa-solid fa-boxes-stacked icon"></i><span className='label fw-bold'>Category</span></Link>
          <Link  className={isActive('/Products') ? 'active text-decoration-none p-2 my-1' : 'text-decoration-none p-2 my-1'} to={'/Products'}><i class="fa-solid fa-shirt icon"></i><span className='label fw-bold'>Products</span></Link>
          <Link  className={isActive('/sales') ? 'active text-decoration-none p-2 my-1' : 'text-decoration-none p-2 my-1'} to={'/sales'}><i class="fa-solid fa-money-bills icon"></i><span className='label fw-bold'>Sales</span></Link>
      </aside>
    </div>
    </>
  )
}

export default Menu