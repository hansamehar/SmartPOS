import React, { useState, useEffect } from "react";
import { Modal, Button, FloatingLabel, Form } from "react-bootstrap";
import { addUserAPI } from "../services/allAPI";

const AddUser = ({ setResponsefromAdd}) => {
  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });

  const addUser = async () => {
    const { username, email, password, role } = userDetails;
    if (username && email && password && role) {
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (token && user.role == "admin") {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };  
        try {
          const result = await addUserAPI(userDetails, reqHeader);
          if (result.status == 200) {
            alert("User added");
            setResponsefromAdd(result)
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button
        style={{ backgroundColor: "#d9f275" }}
        variant="primary"
        onClick={handleShow}
        className="btn float-end"
      >
        Add User
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput"
            label="Name"
          >
            <Form.Control
              onChange={(e) =>
                setuserDetails({ ...userDetails, username: e.target.value })
              }
              type="text"
              placeholder="Name"
            />
          </FloatingLabel>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput1"
            label="Email"
          >
            <Form.Control
              onChange={(e) =>
                setuserDetails({ ...userDetails, email: e.target.value })
              }
              type="text"
              placeholder="Email"
            />
          </FloatingLabel>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput2"
            label="Password"
          >
            <Form.Control
              onChange={(e) =>
                setuserDetails({ ...userDetails, password: e.target.value })
              }
              type="password"
              placeholder="Password"
            />
          </FloatingLabel>
          <FloatingLabel
            className="my-2"
            controlId="floatingInput3"
            label="Role"
          >
            <Form.Control
              onChange={(e) =>
                setuserDetails({ ...userDetails, role: e.target.value })
              }
              type="text"
              placeholder="Role"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addUser}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddUser;
