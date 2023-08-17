import React, { useState } from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Assets/Images/logo1.gif";
import "../styles/CustomNavbar.css";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomNavbar = () => {
  var logOutDetails;
  const handleSignOut = () => {
    axios
      .get(`http://localhost:4000/GoogleSignIn/?isLogged=true`)
      .then((response) => {
        if (response.data.length > 0) {
          console.log("IF PART======")
          document.getElementById("register-btn").hidden = true;
          document.getElementById("login-btn").hidden = true;
          document.getElementById("logout-btn").hidden = false;
        } else {

          axios.get(`http://localhost:4000/Register/?isLogged=true`)
            .then((response) => {
              if (response.data.length > 0) {
                console.log("ELSE PART")
                document.getElementById("register-btn").hidden = true;
                document.getElementById("login-btn").hidden = true;
                document.getElementById("logout-btn").hidden = false;
              } else {
                document.getElementById("register-btn").hidden = false;
                document.getElementById("login-btn").hidden = false;
                document.getElementById("logout-btn").hidden = true;
              }
            });
        }
      });



  };
  handleSignOut();

  const handleLogOut = () => {

    axios.get(`http://localhost:4000/Register/?isLogged=true`)
      .then((response) => {
        logOutDetails = response.data[0];
        if (response.data.length > 0) {
          axios.put(`http://localhost:4000/Register/${logOutDetails.id}`, {
            fullName: logOutDetails.fullName,
            email: logOutDetails.email,
            isLogged: false,
            password: logOutDetails.password,
          }).then(() => {
            alert("Logged Out Successfully!");
          }).then(() => {
            setTimeout(() => {
              window.location.href = "/Theater";
            }, 0);
          })
        } else {
          axios.get(`http://localhost:4000/GoogleSignIn/?isLogged=true`)
            .then((response) => {
              logOutDetails = response.data[0];
              axios.put(`http://localhost:4000/GoogleSignIn/${logOutDetails.id}`, {
                fullName: logOutDetails.fullName,
                email: logOutDetails.email,
                isLogged: false,
                image: logOutDetails.image,
              }).then(() => {
                alert("Logged Out Successfully!");
              }).then(() => {
                setTimeout(() => {
                  window.location.href = "/Theater";
                }, 0);
              })
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  };
  return (
    <BootstrapNavbar className="custom-navbar" expand="lg" id='font'>
      <BootstrapNavbar.Brand href="/" className="custom-logo">
        <img
          src={logo}
          width="70"
          height="70"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
      <BootstrapNavbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="custom-nav-link" href="/">
            Home
          </Nav.Link>
          <Nav.Link className="custom-nav-link" href="/movies">
            Movies
          </Nav.Link>
          <Nav.Link className="custom-nav-link" href="/ThetreList">
            Theaters
          </Nav.Link>
          <Nav.Link className="custom-nav-link" href="/schedule">
            Schedule
          </Nav.Link>
          <Nav.Link className="custom-nav-link" href="/ChooseTickets">
            SeatRoom
          </Nav.Link>
          {/* edited by hari */}
          <Nav.Link className="custom-nav-link" href="/PaymentSummary">Payment</Nav.Link>
        </Nav>

        <Form inline className="custom-search d-none d-lg-block">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>

        <Link
          to="/register"
          className="custom-register text-decoration-none "
          id="register-btn"
        >
          Register  <i class="fa-solid fa-user-plus"></i>
        </Link>
        <Link
          to="/signin"
          className="custom-register text-decoration-none ms-3"
          id="login-btn"
        >
          Login  <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </Link>
        <Link
          to="/logout"
          onClick={() => handleLogOut()}
          className="custom-register text-decoration-none"
          id="logout-btn"
        >
          Logout  <i class="fa-solid fa-right-from-bracket"></i>
        </Link>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;