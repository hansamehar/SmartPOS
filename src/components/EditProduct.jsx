import React, { useEffect, useState } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { editProductAPI } from "../services/allAPI";

const EditProduct = ({ product, setResponsefromEdit }) => {
  const [editProduct, seteditProduct] = useState({
    id: product._id,
    name: product.name,
    price: product.price,
    category: product.category,
    productImg: "",
    stock: product.stock,
  });
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (
      editProduct.productImg.type == "image/png" ||
      editProduct.productImg.type == "image/jpeg" ||
      editProduct.productImg.type == "image/jpg"
    ) {
      setPreview(URL.createObjectURL(editProduct.productImg));
    } else {
      seteditProduct({ ...editProduct, productImg: "" });
    }
  }, [editProduct.productImg]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPreview("");
    seteditProduct({
      name: "",
      price: "",
      category: "",
      productImg: "",
      stock: "",
    });
  };
  const handleShow = () => setShow(true);

  const updateProduct = async () => {
    const { id, name, price, category, productImg, stock } = editProduct;
    if (id && name && price && category && stock) {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("category", category);
      reqBody.append("price", price);
      reqBody.append("stock", stock);
      preview
        ? reqBody.append("productImg", productImg)
        : reqBody.append("productImg", product.productImg);
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (token && user.role == "admin") {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        try {
          const result = await editProductAPI(reqBody, reqHeader, id);

          if (result.status == 200) {
            alert("product edited");
            setResponsefromEdit(result);
            handleClose();
          } else {
            alert(result.response.data);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("unauthorized");
      }
    } else {
      alert("enter all details");
    }
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="btn"
        style={{ color: "#f8c2c5 " }}
      >
        <i class="fa-solid fa-pen"></i>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {preview && (
            <img height={60} className="m-1 rounded" src={preview} alt="" />
          )}
          <FloatingLabel
            className="my-2"
            controlId="floatingInput"
            label="Image"
          >
            <Form.Control
              type="file"
              autoFocus
              onChange={(e) =>
                seteditProduct({
                  ...editProduct,
                  productImg: e.target.files[0],
                })
              }
            />
          </FloatingLabel>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput"
            label="Name"
          >
            <Form.Control
              value={editProduct.name}
              onChange={(e) =>
                seteditProduct({ ...editProduct, name: e.target.value })
              }
              type="text"
              placeholder="Product Name"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingSelect" label="Category">
            <Form.Select
              onChange={(e) =>
                seteditProduct({
                  ...editProduct,
                  category: e.target.value,
                })
              }
              aria-label="Default select example"
            >
              <option hidden>Select</option>
              <option value="Mobile Devices">Mobile Devices</option>
              <option value="Computers & Accessories">
                Computers & Accessories
              </option>
              <option value="Audio Devices">Audio Devices</option>
              <option value="TV & Entertainment">TV & Entertainment</option>
              <option value="Cameras & Photography">
                Cameras & Photography
              </option>
              <option value="Gaming">Gaming</option>
              <option value="Smart Home">Smart Home</option>
              <option value="Wearables & Health Tech">
                Wearables & Health Tech
              </option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput"
            label="Price"
          >
            <Form.Control
              value={editProduct.price}
              onChange={(e) =>
                seteditProduct({ ...editProduct, price: e.target.value })
              }
              type="number"
              placeholder="Product Price"
            />
          </FloatingLabel>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput"
            label="Quantity"
          >
            <Form.Control
              value={editProduct.stock}
              onChange={(e) =>
                seteditProduct({ ...editProduct, stock: e.target.value })
              }
              type="text"
              placeholder="Product Name"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditProduct;
