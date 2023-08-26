import React, { useState, useEffect } from "react";
import { Navbar as BootstrapNavbar, Nav, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Assets/Images/logo1.gif";
import "../styles/CustomNavbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from "@mui/material/colors";
import { styled } from '@mui/material/styles';

//added
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


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
          <Nav.Link className="custom-nav-link" >
            <Link to="/" id='nlink'>Home</Link>
          </Nav.Link>
          <Nav.Link className="custom-nav-link">
            <Link to="/movies" id='nlink'> Movies</Link>
          </Nav.Link>
          <Nav.Link className="custom-nav-link" >
            <Link to="/ThetreList" id='nlink'>Theaters</Link>
          </Nav.Link>
          <Nav.Link className="custom-nav-link">
            <Link to="/schedule" id='nlink'>  Contact US </Link>
          </Nav.Link>
          <Nav.Link className="custom-nav-link" >
            <Link to="/ChooseTickets" id='nlink'>  SeatRoom </Link>
          </Nav.Link>
          {/* Payment Link */}
          <Nav.Link className="custom-nav-link" >
            <Link to="/Next" id='nlink'>  Payment </Link>
          </Nav.Link>
          <Nav.Link className="custom-nav-link" href="/BookingSummary">
            Ticket
          </Nav.Link>

          {isLoggedIn && loggedInUser.password && loggedInUser.password.startsWith("TO") && (
            <Nav.Link className="custom-nav-link" >
              <Link to="/MyTheatre" id='nlink'> Theater Owner </Link>
            </Nav.Link>
          )}
          {/* Admin Link */}
          {isLoggedIn && loggedInUser.password && loggedInUser.password.startsWith("ad") && (
            <Nav.Link className="custom-nav-link" >
              <Link to="/Admin" id='nlink'>  Admin</Link>
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

        {/* Account */}
        {isLoggedIn && (
          <>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              className="me-5"
            >
              <Avatar alt={loggedInUser.fullName[0]} src={loggedInUser.fullName[0]} style={{ backgroundColor: '#ff0040' }} />
            </StyledBadge>
          </>
        )}

        {/* Login Link */}
        {!isLoggedIn && (
          <Link to="/signin" className="custom-register text-decoration-none ms-3" id="login-btn">
            Login  <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </Link>
        )}

        {/* Logout Link */}
        {isLoggedIn && (
          <Link to="/signin" onClick={handleLogOut} className="custom-register text-decoration-none" id="logout-btn">
            Logout  <i className="fa-solid fa-right-from-bracket"></i>
          </Link>
        )}


      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default CustomNavbar;
