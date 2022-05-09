import React from "react";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getToken, api } from "../services/auth";
import axios from "axios";
import Swal from "sweetalert2";
import Switch from "react-switch";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [showPassword, setShowPassword] = useState("password");
  const [user, setUser] = useState({
    username: "",
    fname: "",
    lname: "",
    image: "",
    password: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [formError, setFormError] = useState([]);

  const [userNameColor, setUsernameColor] = useState("");
  const [passwordColor, setPasswordColor] = useState("");
  const [fnameColor, setFnameColor] = useState("");
  const [lnameColor, setLnameColor] = useState("");

  const togglePassword = () => {
    console.log(showPassword);
    if (showPassword === "password") setShowPassword("text");
    else setShowPassword("password");
  };

  useEffect(() => {
    if (!getToken()) {
      navigate("/login");
    } else getUserdata();

    setUser({ ...user });
  }, []);

  useEffect(() => {}, [file, user]);

  function onImageChange(e) {
    console.log("add");
    setFile(e.target.files[0]);
  }

  const updateIsEdit = (check) => {
    setIsEdit(!isEdit);
  };
  const updateStateUser = (data) => {
    setUser({
      ...data,
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const getUserdata = async () => {
    await axios
      .get(api, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "x-access-token",
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((response) => {
        updateStateUser(response.data.user);
        
      })
      .catch((err) => {
        console.log(err.response.data);
        Swal.fire({
          icon: "error",
          title: "Something went wrong ...",
          text: err.response.data.message,
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        navigate("/login");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(file);
    setFormError(validation(user));

    const { username, password, fname, lname } = user;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("fname", fname);
    formData.append("lname", lname);

    axios
      .put(api + "/update", formData, {
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
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });

        getUserdata();
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

    if (values.password) {
      if (!checkSequential(values.password)) {
        errors.password =
          "Password should not be a sequence of letters or numbers.";
      }
      if (String(values.password).length < 6) {
        errors.password = "Password should more than 6";
      }
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
    <div className="profile">
      {/* && <Navigate to="/login" /> */}
      <Navbar />

      <div className="container-m">
        <div className="switch">
          <label htmlFor="">Edit Profile</label>
          <Switch
            checked={isEdit}
            onColor={"#001E6C"}
            onChange={updateIsEdit}
          />
        </div>
        {!isEdit && (
          <div className="content">
            {user.image !== "none" && (
              <img src={api + `/images/${user.image}`} alt="" />
            )}
            {user.image === "none" && (
              <img
                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                alt=""
              />
            )}

            <div className="profile">
              <h2>
                Username: <span>{user.username}</span>
              </h2>
              <h2 className="name">
                {user.fname} {user.lname}
              </h2>
            </div>
          </div>
        )}
        {isEdit && (
          <form
            action=""
            className="form"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="form-group-m">
              <label htmlFor="">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
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
                value={user.password}
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
                value={user.fname}
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
                value={user.lname}
                onChange={handleOnChange}
                style={{ borderColor: lnameColor }}
              />
              <p>{formError.lname}</p>
            </div>
            <div className="form-group-m">
              <label htmlFor="">Image</label>
              <input type="file" accept="image/*" onChange={onImageChange} />
              <p></p>
            </div>
            <div className="form-group-m2">
              <input
                type="checkbox"
                onChange={(e) => togglePassword(e)}
              ></input>
              <label htmlFor="">show password</label>
            </div>
            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
