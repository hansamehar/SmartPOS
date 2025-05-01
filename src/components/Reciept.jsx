import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Receipt({ cart }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{backgroundColor:'#d9f275',border:'none'}} onClick={handleShow}>
        Receipt
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body closeButton>
          <div
            className="container mt-4"
            style={{ maxWidth: "600px", fontFamily: "monospace" }}
          >
            <div className="border p-4 shadow-sm rounded">
              <h4 className="text-center mb-3">Receipt</h4>
              <p
                className="text-center text-muted"
                style={{ fontSize: "0.9rem" }}
              >
                {new Date().toLocaleDateString()}
              </p>

              {cart.items.map((item) => (
                <div key={item._id} className="mb-3">
                  <div className="flex-grow-1">
                    <strong>{item.name}</strong>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {item.brand} • {item.category}
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Qty: {item.quantity}</span>
                      <span>${Number(item.total).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              {cart.discount > 0 && (
                <div className="d-flex justify-content-between">
                  <span>Discount</span>
                  <span>-${cart.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="d-flex justify-content-between fw-bold mt-2">
                <span>Total</span>
                <span>${cart.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Receipt;
