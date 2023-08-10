import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Assets/Images/TenKotta.png';
import '../Styles/CustomNavbar.css';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
    return (
        <BootstrapNavbar className="custom-navbar" expand="lg">
            <BootstrapNavbar.Brand href="/" className="custom-logo">
                <img
                    src={logo}
                    width="80"
                    height="80"
                    className="d-inline-block align-top"
                    alt="Logo"
                />
              
            </BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
            <BootstrapNavbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="custom-nav-link" href="/">Home</Nav.Link>
                    <Nav.Link className="custom-nav-link" href="/movies">Movies</Nav.Link>
                    <Nav.Link className="custom-nav-link" href="/theaters">Theaters</Nav.Link>
                    <Nav.Link className="custom-nav-link" href="/schedule">Schedule</Nav.Link>
                </Nav>

                <Form inline className="custom-search d-none d-md-block">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                </Form>

                <Link to="/register" className="custom-register">
                    Register
                </Link>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default CustomNavbar;
