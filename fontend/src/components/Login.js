import React from "react";
import Navbar from "./Navbar";
import styles from "./Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { authenticate,api } from "../services/auth";


const LoginComponent = () => {
  const initialValue = { username: "", password: "" };
  const [formValues, setFormValue] = useState(initialValue);
  const [formError, setFormError] = useState([]);
  const [showPassword, setShowPassword] = useState("password");
  const [login, setLogin] = useState(false);

  const [userNameColor, setUsernameColor] = useState("");
  const [passwordColor, setPasswordColor] = useState("");

  const togglePassword = () => {
    console.log(showPassword);
    if (showPassword === "password") setShowPassword("text");
    else setShowPassword("password");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const isEmpty=(obj)=> {
    return Object.keys(obj).length === 0;
}
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError( validation(formValues));
    
    console.log(formValues);
    const { username, password } = formValues;
    
   
      axios
      .post(api + "/login", { username, password })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Login successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        authenticate(response, setLogin(true));
      })
      .catch((err) => {
        console.log(err.response.data);
        Swal.fire({
          icon: "error",
          title: "Something went wrong ...",
          text: err.response.data.message,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
      });
    
  
  };

  const validation = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
      setUsernameColor("red");
    }else setUsernameColor("green");

    if (!values.password) {
      errors.password = "Password is required!";
      setPasswordColor("red");
    }else setPasswordColor("green");

    return errors;
  };

  return (
    <div className="login">
      {login && <Navigate to="/" />}

      <Navbar />
      <div className="body-section">
        <div className="container-m">
          <form
            action=""
            method="post"
            className="form"
            onSubmit={handleSubmit}
          >
            <h1>Login</h1>
            <div className="form-group-m">
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleOnChange}
                style={{ borderColor: userNameColor }}
              />
              <p>{formError.username}</p>
            </div>
            <div className="form-group-m">
              <label htmlFor="">Password</label>
              <input
                type={showPassword}
                name="password"
                value={formValues.password}
                onChange={handleOnChange}
                id="password"
                style={{ borderColor: passwordColor }}
              />
              <p>{formError.password}</p>
            </div>
            <div className="form-group-m2">
              <input type="checkbox" onChange={togglePassword}></input>
              <label htmlFor="">show password</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
