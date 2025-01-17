import React,{useEffect, useState} from 'react'
import Menu from '../components/Menu'
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap'
import { getcategoryAPI, removeCategoryAPI, saveCategoryAPI } from '../services/allAPI'
import '../Common.css'

const Category = () => {

  const [categoryDetails,setCategoryDetails]=useState({
    category:""
  })

  const [allCategories,setAllCategories]=useState([])
  useEffect(()=>{
    getCategories()
  },[])
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const saveCategory=async()=>{
    const {category}=categoryDetails
    if(category){
      try{
        const result =await saveCategoryAPI(categoryDetails)
        if(result.status>=200 && result.status<300){
          getCategories()
          handleClose()
          alert("category added")
        }else{
          alert("api call failed")
        }
      }catch(e){
        console.log(e);
        
    }
        
    }else{
      alert("enter category")
    }
  }
  const getCategories=async()=>{
    try{
      const result=await getcategoryAPI()
      console.log(result);
      if(result.status>=200 && result.status<300){
        setAllCategories(result.data)
      }else{
        alert("api call failed")
      }
    }catch(e){
      console.log(e);
      
    }
  }
  const removeCategory=async(id)=>{
    try{
      await removeCategoryAPI(id)
      getCategories()
    }catch(e){
      console.log(e);
      
    }
  }

  return (
    <>
    <Menu/>
    <div className='maindiv w-100 ' style={{height:'max-height',position:'absolute',backgroundColor:'#15333D'}}>
     <div style={{margin:'8px',backgroundColor:'#d4edda',minHeight:'97.2vh'}} className='table-responsive  p-3 rounded'>
          <div className='d-flex justify-content-between align-items-center my-3 mx-2'>
            <h4 style={{color:'#15333D'}} >Categories :</h4>
            <button style={{backgroundColor:'#567C8d',color:'white'}} variant="primary" onClick={handleShow} className='btn  float-end '>Add new</button>
           <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <FloatingLabel className='my-2' controlId="floatingInput" label="Category">
              <Form.Control onChange={e=>setCategoryDetails({...categoryDetails,category:e.target.value})} type="text" placeholder="Product Name" />
              </FloatingLabel>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={saveCategory}>
                  Save 
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
        <table  className=' table shadow table-hover table-striped table-bordered'>
          <thead >
            <tr>
              <td style={{color:' #15333D'}} className='fw-bolder'>id</td>
              <td style={{color:'#15333D'}} className='fw-bolder'>Category</td>
              <td style={{color:'#15333D'}} className='fw-bolder'>Action</td>
            </tr>
          </thead>
          <tbody>
           {
            allCategories?.length>0?
            allCategories.map((category,index)=>(
              <tr key={category.id}>
              <td style={{color:'#15333D'}}>{index+1}</td>
              <td style={{color:'#15333D'}}>{category.category}</td>
              <td>
              <button onClick={()=>removeCategory(category?.id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button></td>
            </tr>
            ))
            :<div className='text-danger  fs-5 text-center'>No categories</div>
           }
          </tbody>
        </table>
     </div>
    </div>
    </>
  )
}

export default Category