import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import '../Common.css'
import { getcategoryAPI, getProductAPI,getSaleAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'
import Chart from '../components/Chart'

const Home = () => {
  const [homeDetails,setHomeDetails]=useState({
    totalSales:'',
    totalProducts:'',
    totalCategories:''
  })
  console.log(homeDetails);
  

  const totalProduct=async()=>{
    const result= await getProductAPI()
    setHomeDetails(homeDetails => Object.assign({}, homeDetails, { totalProducts: result.data.length }));
  }

  const totalCategory=async()=>{
    const result= await getcategoryAPI()
    setHomeDetails(homeDetails => Object.assign({}, homeDetails, { totalCategories: result.data.length }));
  }

  const totalSale=async()=>{
    const result= await getSaleAPI()
    setHomeDetails(homeDetails => Object.assign({}, homeDetails, { totalSales: result.data.map((a)=>a.price).reduce((a,b)=>Number(a)+Number(b) )}));
    
  }
   useEffect(()=>{
  totalProduct()
  totalCategory()
  totalSale()
  },[])
  return (
    <>
    <Menu/>
    <div className='maindiv w-100 ' style={{height:'max-height',position:'absolute',backgroundColor:'#15333D'}}>
      <div style={{margin:'8px',backgroundColor:'#d4edda',minHeight:'97.2vh'}} className='p-3 rounded '>
       <div className='container mt-3'> 
        <div className='row justify-content-center'>
          <div  className='col m-3 rounded shadow p-4 ' style={{backgroundColor:'#F5F1E1',color:'#15333D'}}>
            <h3 className='pb-3 pt-1'>Welcome to <span style={{fontFamily: 'Almendra SC',fontWeight:'900'}}>FitInventory</span></h3>
               <p style={{lineHeight:'30px'}}>
                  We're excited to have you on board.<br/>
                  Your central hub for managing inventory and optimizing stock levels is just a few clicks away.<br/>
  
                  Let's get started! Stay on top of your inventory and make data-driven decisions to streamline your workflow.
               </p>
          
              </div>
          <div className='col m-3 rounded shadow p-2   text-center' style={{backgroundColor:'#F5F1E1',color:'#15333D'}}>
            <Chart/>
          </div>
        </div>
            <div className='row justify-content-center'>
            <div style={{backgroundColor:'#74acb8',color:'#d4edda'}}  className='col p-4 m-4 rounded shadow '>
            <h4 style={{color:'#15333D'}}><i class="fa-solid fa-money-bills pe-1"></i>Income</h4>
            <h3 className='text-center'>&#8377;{homeDetails.totalSales}</h3>
            <Link className='px-3 py-1 rounded' style={{backgroundColor:'#d4edda',textDecoration:'none',color:'#15333D',float:'right'}} to={'./sales'}>View</Link>
            </div>
          <div style={{backgroundColor:'#95cdba',color:'#d4edda'}}  className='col p-4 m-4 rounded shadow '>
            <h4 style={{color:'#15333D'}}><i class="fa-solid fa-shirt pe-1"></i>Products</h4>
            <h3 className='text-center'>{homeDetails.totalProducts}</h3>
            <Link className='px-3 py-1 rounded' style={{backgroundColor:'#d4edda',textDecoration:'none',color:'#15333D',float:'right'}} to={'./products'}>View</Link>
            </div>
          
            <div style={{backgroundColor:'#7abbbe',color:'#d4edda'}} className='col p-4 m-4 rounded shadow  '>
            <h4 style={{color:'#15333D'}}><i class="fa-solid fa-boxes-stacked pe-1"></i>Categories</h4>
            <h3 className='text-center'>{homeDetails.totalCategories}</h3>
            <Link className='px-3 py-1 rounded' style={{backgroundColor:'#d4edda',textDecoration:'none',color:'#15333D',float:'right'}} to={'./category'}>View</Link>
              </div>
             
        </div>
       </div>
     
      </div>
    </div>
    </>
  )
}

export default Home