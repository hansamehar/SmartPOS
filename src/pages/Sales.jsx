import React from 'react'
import Menu from '../components/Menu'
import AddSales from '../components/AddSales'
import { getSaleAPI ,removeSalesAPI} from '../services/allAPI'
import { useState ,useEffect} from 'react'
import '../Common.css'


const Sales = () => {
  const[responseFromAddsale,setResponsefromAddsale]=useState([])
  
   const [allSales,setAllSales]=useState([])
  const getSales=async()=>{
      try{
        const result=await getSaleAPI()
        console.log(result);
        if(result.status>=200 && result.status<300){
          setAllSales(result.data)
        }else{
          console.log("api call failed");
        }
      }catch(e){
        console.log(e);
        
      }
    }
    const removeProduct=async(id)=>{
      try{
            await removeSalesAPI(id)
            getSales()
          }catch(e){
            console.log(e);
            
          }
        }
     

    useEffect(()=>{
        getSales()
      },[responseFromAddsale])
    
  return (
    <>
    <Menu/>

    <div className='maindiv w-100' style={{height:'max-height',position:'absolute',backgroundColor:'#15333D'}}>
       
        <div style={{margin:'8px',backgroundColor:'#d4edda',minHeight:'97.2vh'}} className='table-responsive  p-3 rounded'>
        <div className='d-flex justify-content-between align-items-center my-3 mx-2'>
           <h4  style={{color:'#15333D'}} >Sales :</h4>
            <AddSales setResponsefromAddsale={setResponsefromAddsale} />
        </div>
      <table className='table shadow table-hover table-bordered table-striped '>
            <thead>
              <tr>           
                <td style={{color:'#15333D'}} className='fw-bolder'>Product ID</td>
                <td style={{color:'#15333D'}} className='fw-bolder'>Customer</td>
                <td style={{color:'#15333D'}} className='fw-bolder'>Quantity</td>
                <td style={{color:'#15333D'}} className='fw-bolder'>Purchase Price</td>
                <td style={{color:'#15333D'}} className='fw-bolder'>Action</td>
              </tr>
            </thead>
            <tbody>
            {
                allSales?.length>0?
                allSales.map((allSales,index)=>(
                  <tr key={allSales?.id+index}>
                    <td style={{color:'#15333D'}}>{allSales.id}</td>
                    <td style={{color:'#15333D'}}>{allSales.name}</td>
                    <td style={{color:'#15333D'}}>{allSales.quantity}</td>
                    <td style={{color:'#15333D'}}>{allSales.price}</td>
                    <td>
                    <button onClick={()=>removeProduct(allSales?.id)}  className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
                    </td>
                  </tr>    
                ))
                :<div className='text-danger fs-5 text-center'>No Sales</div>
              }
            </tbody>
        </table>
        </div>
    </div>
    </>
  )
}

export default Sales