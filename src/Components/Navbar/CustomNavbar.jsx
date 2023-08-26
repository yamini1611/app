import React, { useState, useEffect } from "react";
import { Navbar as BootstrapNavbar, Nav, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Assets/Images/logo1.gif";
import "../styles/CustomNavbar.css";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomNavbar = () => {
  var logOutDetails;
  const [loggedInUser, setLoggedInUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const fetchLoggedInUser = () => {
    axios
      .get(`http://localhost:4000/GoogleSignIn/?isLogged=true`)
      .then((response) => {
        if (response.data.length > 0) {
          setLoggedInUser(response.data[0]);
          setIsLoggedIn(true);
        } else {
          axios.get(`http://localhost:4000/Register/?isLogged=true`)
            .then((response) => {
              if (response.data.length > 0) {
                setLoggedInUser(response.data[0]);
                setIsLoggedIn(true);
              } else {
                setIsLoggedIn(false);
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    <BootstrapNavbar className="custom-navbar sticky-top" expand="lg" id="font">
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
            Contact US
          </Nav.Link>
          <Nav.Link className="custom-nav-link" href="/ChooseTickets">
            SeatRoom
          </Nav.Link>
          {/* Payment Link */}
          <Nav.Link className="custom-nav-link" href="/Next">
            Payment
          </Nav.Link>
          <Nav.Link className="custom-nav-link" href="/BookingSummary">
            Ticket
          </Nav.Link>

          {isLoggedIn && loggedInUser.password && loggedInUser.password.startsWith("TO") && (
            <Nav.Link className="custom-nav-link" href="/MyTheatre">
              Theater Owner 
            </Nav.Link>
          )}
          {/* Admin Link */}
          {isLoggedIn && (
            <Nav.Link className="custom-nav-link" href="/Admin">
              Admin
            </Nav.Link>
          )}
        </Nav>

        <Form inline className="custom-search d-none d-lg-block">
          {/* Search form */}
        </Form>

        {/* Register Link */}
        {!isLoggedIn && (
          <Link to="/register" className="custom-register text-decoration-none" id="register-btn">
            Register  <i className="fa-solid fa-user-plus"></i>
          </Link>
        )}

        {/* Login Link */}
        {!isLoggedIn && (
          <Link to="/signin" className="custom-register text-decoration-none ms-3" id="login-btn">
            Login  <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </Link>
        )}

        {/* Logout Link */}
        {isLoggedIn && (
          <Link to="/logout" onClick={handleLogOut} className="custom-register text-decoration-none" id="logout-btn">
            Logout  <i className="fa-solid fa-right-from-bracket"></i>
          </Link>
        )}
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;
