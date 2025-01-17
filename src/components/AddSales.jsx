import React, { useState } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import {
  geteditProductAPI,
  saveSaleAPI,
  updateProductAPI,
} from "../services/allAPI";

const AddSales = ({ setResponsefromAddsale }) => {
  const [salesDetails, setsalesDetails] = useState({
    id: "",
    name: "",
    quantity: "",
    price: "",
  });

  const saveSales = async () => {
    const { id, name, price, quantity } = salesDetails;
    if (id && name && price && quantity) {
      try {
        console.log(id);

        const result = await geteditProductAPI(id);
        console.log(result.data);
        const product = result.data;
        if (result.status >= 200 && result.status < 300) {
          if (product && Number(product.stock) >= Number(quantity)) {
            console.log("yess");
            product.stock -= quantity;
            console.log(`stock${product.stock}`);
            const result3 = await updateProductAPI(product);
            if (result3.status >= 200 && result3.status < 300) {
              console.log("product updated");
              const result4 = await saveSaleAPI(salesDetails);
              if (result4.status >= 200 && result4.status < 300) {
                alert("Sale added and Stock updated");
                handleClose();
                setResponsefromAddsale(result4);
              } else {
                alert("sale not added");
              }
            } else {
              console.log("updating product quantity failed");
            }
          } else {
            alert("not enough stock/product doesnt exist");
          }
        } else {
          alert("Product doesnt exist.Enter en existing Product id");
        }
      } catch (er) {
        console.log(er);
      }
    } else {
      alert("enter all details");
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        style={{ backgroundColor: "#567C8d", color: "white" }}
        variant="primary"
        onClick={handleShow}
        className="btn  float-end"
      >
        Add new
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput"
            label="Product id"
          >
            <Form.Control
              onChange={(e) =>
                setsalesDetails({ ...salesDetails, id: e.target.value })
              }
              type="text"
              placeholder="Product id"
            />
          </FloatingLabel>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput"
            label="Customer"
          >
            <Form.Control
              onChange={(e) =>
                setsalesDetails({ ...salesDetails, name: e.target.value })
              }
              type="text"
              placeholder="Customer"
            />
          </FloatingLabel>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput"
            label="Quantity"
          >
            <Form.Control
              onChange={(e) =>
                setsalesDetails({ ...salesDetails, quantity: e.target.value })
              }
              type="number"
              placeholder="Product Quantity"
            />
          </FloatingLabel>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput"
            label="Purchase Price"
          >
            <Form.Control
              onChange={(e) =>
                setsalesDetails({ ...salesDetails, price: e.target.value })
              }
              type="number"
              placeholder="Purchase Price"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={saveSales} variant="primary">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddSales;
