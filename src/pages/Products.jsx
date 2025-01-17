import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu'
import AddProduct from '../components/AddProduct'
import { getProductAPI, removeProductAPI, updateProductAPI ,geteditProductAPI} from '../services/allAPI'
import { Modal, Button, FloatingLabel,Form } from 'react-bootstrap';
import '../Common.css'

const Products = () => {
  const[responseFromAdd,setResponsefromAdd]=useState([])
  const [allProducts,setAllProducts]=useState([])
  const [editProducts,seteditProducts]=useState({
        id:"",
        name:"",
        price:"",
        category:"",
        imageUrl:"",
        stock:""
      })
 
  
  const [show, setShow] = useState(false);
  
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);


  useEffect(()=>{
    getProducts()
  },[responseFromAdd])
  
  const fillform=async(id)=>{
    handleShow()
    try{
      const result=await geteditProductAPI(id)
      console.log(result);
      if(result.status>=200 && result.status<300){
        seteditProducts(result.data)
      }else{
        console.log("api call failed");
      }
    }catch(e){
      console.log(e);
      
    }
  }
    

  const editProduct=async()=>{
     const {name,price,category,imageUrl,stock}=editProducts
            if(name && price && category && imageUrl && stock){
              try{
                const result=await updateProductAPI(editProducts)
                if(result.status>=200 && result.status<300){
                  alert("product updated")
                  getProducts()
                  handleClose()
                }else{
                console.log(result);
              }
            }catch(er){
              console.log(er);
            } 
          }else{
            alert("enter all details")
          }
      }

  const getProducts=async()=>{
    try{
      const result=await getProductAPI()
      console.log(result);
      if(result.status>=200 && result.status<300){
        setAllProducts(result.data)
      }else{
        console.log("api call failed");
      }
    }catch(e){
      console.log(e);
      
    }
  }
  const removeProduct=async(id)=>{
    try{
      await removeProductAPI(id)
      getProducts()
    }catch(e){
      console.log(e);
      
    }
  }

  return (
    <>
    
      <Menu/>
      <div className='maindiv w-100' style={{height:'max-height',position:'absolute',backgroundColor:'#15333D'}}>
      <div style={{margin:'8px',backgroundColor:'#d4edda',minHeight:'97.2vh'}} className='table-responsive p-3 rounded'>
          <div className='d-flex justify-content-between align-items-center my-3 mx-2'>
            <h4  style={{color:'#15333D'}} >Products :</h4>
            <AddProduct setResponsefromAdd={setResponsefromAdd} />
          </div>
          <table   className='table shadow table-hover table-striped table-bordered '>
            <thead >
              <tr >           
                <td style={{color:'#15333D'}} className='fw-bolder'>ID</td>
                <td style={{color:'#15333D'}} className='fw-bolder'>Image</td>
                <td style={{color:'#15333D'}} className='fw-bolder'>Name</td>
                <td style={{color:'#15333D'}} className='fw-bolder'>Category</td>
                <td style={{color:'#15333D'}} className='fw-bolder'>Price</td>
                <td style={{color:'#15333D'}} className='fw-bolder'>Stock</td>
                <td style={{color:'#15333D'}} className='fw-bolder'>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                allProducts?.length>0?
                allProducts.map((product)=>( 
                  <tr key={product?.id}>
                    <td style={{color:'#15333D'}}>{product?.id}</td>
                    <td style={{color:'#15333D'}}><img width={'90px'} height={'100px'} src={product?.imageUrl} alt="no img" /></td>
                    <td style={{color:'#15333D'}}>{product?.name}</td>
                    <td style={{color:'#15333D'}}>{product?.category}</td>
                    <td style={{color:'#15333D'}}>{product?.price}</td>
                    {Number(product?.stock)>50?<td style={{color:'#15333D'}}>{product?.stock}</td>
                   : <td style={{color:'#15333D'}}>{product?.stock} <span style={{fontSize:'13px'}} className='bg-danger py-1 rounded text-light d-block mt-2'>LOW</span></td>}
                    <td>
                    <button onClick={()=>fillform(product?.id)} className='btn'><i class="fa-solid fa-pen text-warning "></i></button>
                     <Modal show={show} onHide={handleClose}>
                           <Modal.Header closeButton>
                             <Modal.Title>Edit Product</Modal.Title>
                           </Modal.Header>
                           <Modal.Body>
                           <FloatingLabel className='my-2' controlId="floatingInput" label="Name">
                           <Form.Control value={editProducts.name} onChange={e=>seteditProducts({...editProducts,name:e.target.value})} type="text" placeholder="Product Name" />
                           </FloatingLabel>
                           <FloatingLabel className='my-2' controlId="floatingInput" label="Price">
                           <Form.Control value={editProducts.price} onChange={e=>seteditProducts({...editProducts,price:e.target.value})} type="text" placeholder="Product Price" />
                           </FloatingLabel>
                           <FloatingLabel className='my-2' controlId="floatingInput" label="Quantity">
                           <Form.Control value={editProducts.stock} onChange={e=>seteditProducts({...editProducts,stock:e.target.value})} type="text" placeholder="Product Name" />
                           </FloatingLabel>
                           <FloatingLabel className='my-2' controlId="floatingInput" label="Category">
                           <Form.Control value={editProducts.category} onChange={e=>seteditProducts({...editProducts,category:e.target.value})} type="text" placeholder="Product Name" />
                           </FloatingLabel>
                           <FloatingLabel className='my-2' controlId="floatingInput" label="ImageURL">
                           <Form.Control value={editProducts.imageUrl} onChange={e=>seteditProducts({...editProducts,imageUrl:e.target.value})} type="text" placeholder="Image" />
                           </FloatingLabel>
                           </Modal.Body>
                           <Modal.Footer>
                             <Button variant="secondary" onClick={handleClose}>
                               Close
                             </Button>
                             <Button variant="primary" onClick={editProduct}>
                               Save Changes
                             </Button>
                           </Modal.Footer>
                         </Modal>
                    <button onClick={()=>removeProduct(product?.id)}  className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
                    </td>
                  </tr>    
                ))
                :<div className='text-danger  fs-5 text-center'>No Products</div>
              }
              
            </tbody>
          </table>
          
      </div>
      </div>
    
    </>
  )
}

export default Products