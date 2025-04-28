import React, { useContext, useState } from "react";
import loginImg from "../assets/loginImg.png";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/allAPI";
import { Authcontext } from "../contexts/ContextAPI";

const Login = () => {
  const navigate = useNavigate();
  const [inputdata, setInputdata] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(Authcontext);

  const handleLogin = async () => {
    const { email, password } = inputdata;
    if (email && password) {
      try {
        const result = await loginAPI(inputdata);
        if (result.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
          setUser(result.data.user);
          navigate("/home");
          setInputdata({ username: "", email: "", password: "" });
        } else {
          alert(result.response.data);
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("please fill the form");
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#f3f4f1", height: "100vh" }}
        className="p-4 d-flex align-items-center justify-content-between"
      >
        <img
          className="d-none d-sm-block m-5"
          width={"470px"}
          src={loginImg}
          alt=""
        />
        <div className="bg-light w-50 h-100 rounded-5 shadow-lg d-flex flex-column align-items-center">
          <h4 className="my-5">
            <i
              style={{ color: "#d9f275" }}
              class="fa-solid fa-cash-register p-2"
            ></i>
            SmartPOS
          </h4>
          <h2 className="mb-4">LOGIN :</h2>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3 w-50"
          >
            <Form.Control
              onChange={(e) =>
                setInputdata({ ...inputdata, email: e.target.value })
              }
              type="email"
              placeholder="name@example.com"
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3 w-50"
            controlId="floatingPassword"
            label="Password"
          >
            <Form.Control
              onChange={(e) =>
                setInputdata({ ...inputdata, password: e.target.value })
              }
              type="password"
              placeholder="Password"
            />
          </FloatingLabel>

          <button
            onClick={handleLogin}
            style={{ backgroundColor: "#d9f275" }}
            className="btn w-50 p-3 rounded-pill"
          >
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
