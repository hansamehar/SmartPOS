import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import serverURL from "../services/serverURL";
import {
  addCustomerDetails,
  applyDiscountValue,
  clearCart,
  removeItems,
} from "../redux/slices/CartSlice";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Receipt from "./Reciept";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addSaleAPI } from "../services/allAPI";

const Cart = () => {
  const dispatch = useDispatch();
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.items);

  const removeItem = (id) => {
    dispatch(removeItems(id));
  };

  const CustomerDetails = async() => {
    dispatch(addCustomerDetails(customerDetails));
    console.log(cart);
    
    const { items,subtotal , grandTotal, customer } = cart;
        if (items &&  subtotal&& grandTotal && customer) {
          const token = sessionStorage.getItem("token");
          const user = JSON.parse(sessionStorage.getItem("user"));
          if (token && user.role == "cashier") {
            const reqHeader = {
              Authorization: `Bearer ${token}`,
            };  
            try {
              const result = await addSaleAPI(cart, reqHeader);
              if (result.status == 200) {
                alert("sale recorded");
                dispatch(clearCart())
                handleClose();
              } else {
                alert(result.status);
              }
            } catch (e) {
              console.log(e);
            }
          } else {
            console.log("unauthorized");
          }
        } else {
          alert("missing details");
        }
  };

  const scrollBoxStyle = {
    overflowY: "scroll",
    height: "280px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    WebkitOverflowScrolling: "touch",
  };

  return (
    <>
      <h5 className="mb-3">OrderDetails</h5>
      <div className="d-flex flex-column flex-grow-1 justify-content-between ">
        <div style={scrollBoxStyle}>
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div key={product._id} className="d-flex align-items-center">
                <img
                  width={"60px"}
                  height={"60px"}
                  src={`${serverURL}/uploads/${product.productImg}`}
                  alt="no img"
                />
                <div className="ps-3 w-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <h6>{product.name}</h6>
                    {product.quantity > 1 ? (
                      <button
                        onClick={() => removeItem(product._id)}
                        className="btn"
                      >
                        <i class="fa-solid fa-minus"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => removeItem(product._id)}
                        className="btn"
                      >
                        <i class="fa-solid fa-xmark"></i>
                      </button>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6>x{product.quantity}</h6>
                    <span>${product.total}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Empty cart...</p>
          )}
        </div>
        <div>
          <div className="d-flex justify-content-between">
            <h6>Subtotal</h6>
            <h6>{cart.subtotal}</h6>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <h6>Discount</h6>
            <InputGroup style={{ width: "35%" }}>
              <Form.Control
                value={cart.discount}
                onChange={(e) =>
                  dispatch(applyDiscountValue(Number(e.target.value)))
                }
              />
              <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
            </InputGroup>
          </div>
          <hr
            style={{
              border: "none",
              borderTop: "2px dashed #000",
              width: "100%",
            }}
          />
          <div className="d-flex justify-content-between">
            <h5>Total</h5>
            <h5>{cart.grandTotal}</h5>
          </div>
          <div className="d-flex justify-content-between align-items-center border p-1 my-2">
            <span>Payment Method</span>
            <span>
              <i class="fa-solid fa-money-bill"></i>
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center my-2">
            <Receipt cart={cart} />
            <button onClick={handleShow} className="btn bg-danger">
            Checkout
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>CustomerDetails</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Customer name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      autoFocus
                      onChange={(e) =>
                        setCustomerDetails({ ...customerDetails, name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Customer Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      autoFocus
                      onChange={(e) =>
                        setCustomerDetails({ ...customerDetails, phone: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={CustomerDetails}>
                Complete Sale
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
