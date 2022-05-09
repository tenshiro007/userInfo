import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";
import { authenticate, api, getToken } from "../services/auth";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

function RegisterComponent(props) {
  const initialValue = { username: "", password: "", fname: "", lname: "" };
  const [formValues, setFormValue] = useState(initialValue);
  const [formError, setFormError] = useState([]);
  const [showPassword, setShowPassword] = useState("password");
  const [login, setLogin] = useState(false);

  const [file, setFile] = useState();

  const [userNameColor, setUsernameColor] = useState("");
  const [passwordColor, setPasswordColor] = useState("");
  const [fnameColor, setFnameColor] = useState("");
  const [lnameColor, setLnameColor] = useState("");

  const togglePassword = () => {
    console.log(showPassword);
    if (showPassword === "password") setShowPassword("text");
    else setShowPassword("password");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValues, [name]: value });
  };


  useEffect(()=>{
    console.log(file)

  },[file])

  function onImageChange(e){
    console.log('add')
     setFile(e.target.files[0]);
    // console.log(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(file);
    setFormError(validation(formValues));

    const { username, password, fname, lname } = formValues;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("fname", fname);
    formData.append("lname", lname);

    axios
      .post(api + "/register",
      formData,{
        headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Headers": "x-access-token",
            Authorization: "Bearer " + getToken(),
          },
      })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: "success",
          title: "Register successfully",
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

    if (String(values.username).length > 12) {
      errors.username = "Username should not more than 12 character";
    }

    if (!String(values.username).match(/^[A-Za-z0-9_.]+$/)) {
      errors.username =
        "Username should be characters (A-Z or a-z) or numbers (0-9) or _";
    }
    if (!values.username) {
      errors.username = "Username is required!";
    }

    if (String(values.password).length < 6) {
      errors.password = "Password should more than 6";
    }
    if (!checkSequential(values.password)) {
      errors.password =
        "Password should not be a sequence of letters or numbers.";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (!values.fname) {
      errors.fname = "First Name is required!";
    }
    if (!values.lname) {
      errors.lname = "Last Name is required!";
    }

    if (errors.username) setUsernameColor("red");
    else setUsernameColor("green");

    if (errors.password) setPasswordColor("red");
    else setPasswordColor("green");

    if (errors.fname) setFnameColor("red");
    else setFnameColor("green");

    if (errors.lname) setLnameColor("red");
    else setLnameColor("green");

    return errors;
  };

  const checkSequential = (s) => {
    // Check for sequential numerical characters
    for (var i in s) {
      if (+s[+i + 1] == +s[i] + 1) return false;
      if (+s[+i + 1] + 1 == +s[i]) return false;
    }

    // Check for sequential alphabetical characters
    for (var i in s) {
      if (String.fromCharCode(s.charCodeAt(i) + 1) == s[+i + 1]) return false;
      if (String.fromCharCode(s.charCodeAt(i) - 1) == s[+i + 1]) return false;
    }

    return true;
  };

  return (
    <div className="register">
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
            <h1>Register</h1>
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
            <div className="form-group-m">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                name="fname"
                value={formValues.fname}
                onChange={handleOnChange}
                style={{ borderColor: fnameColor }}
              />
              <p>{formError.fname}</p>
            </div>
            <div className="form-group-m">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                name="lname"
                value={formValues.lname}
                onChange={handleOnChange}
                style={{ borderColor: lnameColor }}
              />
              <p>{formError.lname}</p>
            </div>
            <div className="form-group-m">
              <label htmlFor="">Image</label>
              <input type="file"  accept='image/*' onChange={onImageChange}/>
            </div>
            <div className="form-group-m2">
              <input
                type="checkbox"
                onChange={(e) => togglePassword(e)}
              ></input>
              <label htmlFor="">show password</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
