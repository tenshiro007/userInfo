import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { getToken } from "../services/auth";
import {logout} from '../services/auth'

function Navbar(props) {
  const navigate = useNavigate();

  const logoutTologin = () => {
    logout(navigate("/login"))
  };
  return (
    <div className="navbar">
      <nav className="navbar navbar-expand-lg navbar-dark backgrond-nav">
        <a className="navbar-brand ml-3" href="/">
          Hello world
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mr-5">
            {!getToken() && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {!getToken() && (
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            )}
            {getToken() && (
              <li className="nav-item">
                <div className="nav-link logout" onClick={logoutTologin}>
                  Log out
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
