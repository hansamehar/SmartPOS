import React ,{ useState } from 'react'
import { Modal, Button, FloatingLabel,Form } from 'react-bootstrap';
import { saveProductAPI,saveCategoryAPI,getcategoryAPI} from '../services/allAPI';


const AddProduct = ({setResponsefromAdd}) => {
    const [productDetails,setProductDetails]=useState({
      name:"",
      price:"",
      category:"",
      imageUrl:"",
      stock:""
    })
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveProduct=async()=>{
      // object destructuring
        
        const {name,price,category,imageUrl,stock}=productDetails
        if(name && price && category && imageUrl && stock){
          try{
            const result=await saveProductAPI(productDetails)
            console.log(result);
            if(result.status>=200 && result.status<300){
              alert("product added successfully")
              handleClose()
              setResponsefromAdd(result)
              try{
                  const resultb =await getcategoryAPI()
                  if(resultb.data.some((cat) => cat.category.toLowerCase() === category.toLowerCase())){
                    console.log("existing category");
                    
                  }else{
                    await saveCategoryAPI(productDetails)
                    alert("New Category Created")
                  }
                  
              }catch(err){
                  console.log(err);
              }
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
  return (
    <>
    <button style={{backgroundColor:'#567C8d',color:'white'}} variant="primary" onClick={handleShow} className='btn float-end '>Add new</button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel className='my-2' controlId="floatingInput" label="Name">
        <Form.Control onChange={e=>setProductDetails({...productDetails,name:e.target.value})} type="text" placeholder="Product Name" />
        </FloatingLabel>
        <FloatingLabel className='my-2' controlId="floatingInput" label="Price">
        <Form.Control onChange={e=>setProductDetails({...productDetails,price:e.target.value})} type="text" placeholder="Product Price" />
        </FloatingLabel>
        <FloatingLabel className='my-2' controlId="floatingInput" label="Quantity">
        <Form.Control onChange={e=>setProductDetails({...productDetails,stock:e.target.value})} type="text" placeholder="Product Name" />
        </FloatingLabel>
        <FloatingLabel className='my-2' controlId="floatingInput" label="Category">
        <Form.Control onChange={e=>setProductDetails({...productDetails,category:e.target.value})} type="text" placeholder="Product Name" />
        </FloatingLabel>
        <FloatingLabel className='my-2' controlId="floatingInput" label="ImageURL">
        <Form.Control onChange={e=>setProductDetails({...productDetails,imageUrl:e.target.value})} type="text" placeholder="Image" />
        </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveProduct}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddProduct