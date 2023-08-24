import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {  Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/TORegister.css'; // Your custom styles
import { Link } from 'react-router-dom';
const ContactUs= () => {
  return (
    <Container className="contact-details-container" style={{ fontSize: '13px',padding:100, fontFamily:"Work Sans, sans-serif"}}>
      <h2>Contact Details</h2>
      <Row>
        <Col md={2} className="contact-detail">
          <i className="fas fa-map-marker-alt"></i>
          <h4>Location</h4>
          <p>13 Movie Street, Cityville</p>
        </Col>
        <Col md={2} className="contact-detail">
          <i className="fas fa-phone"></i>
          <h4>Phone Number</h4>
          <p>7845452555</p>
        </Col>
        <Col md={1} className="contact-detail">
          <i className="fas fa-envelope"></i>
          <h4>Email</h4>
          <p>info@tentukotta.com</p>
        </Col>
        <Col md={3} className="contact-detail">
         <i class="fa-solid fa-user-plus"></i>
          <Link to="/TORegister" style={{textDecoration:"none",color:"black"}}><h4>Register for Theater Owner</h4></Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;


export const TORegister =() =>
{
    const formik = useFormik({
        initialValues: {
          theaterName: '',
          location: '',
          ticketRange: '',
          ticketPrice: '',
          capacity: '',
          cancellationAvailable: false,
          screensCount: '',
          password: '',
          email: '',
        },
        validationSchema: Yup.object({
          theaterName: Yup.string().required('Theater Name is required'),
          location: Yup.string().required('Location is required'),
          ticketRange:Yup.string().required('Ticket Range is required'),
          ticketPrice:Yup.string().required('Ticket Price is Required'),
          capacity:Yup.string().required('capacity is required'),
          cancellationAvailable:Yup.string().required('Cancellation is required'),
          screensCount:Yup.string().required('no of screens is required '),
          password:Yup.string().required('Password is required'), 
          email:Yup.string().required('Email is required')
        }),
        onSubmit: async (values) => {
          try {
            const response1 = await fetch('http://localhost:4000/Register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: values.email,
                password: values.password,
              }),
            });
    
            if (response1.ok) {
              
            } else {
              const data = await response1.json();
              toast.error(data.message);
            }
          } catch (error) {
            toast.error('An error occurred. Please try again later.');
          }
          try {
            const response = await fetch('http://localhost:4000/TheaterOwner', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),

            
            });
    
            if (response.ok) {
              toast.success('Registration successful! ', {
                onClose: () => {
                  setInterval(2000);
                  window.location.href = '/';
                },
              });
            } else {
              const data = await response.json();
              toast.error(data.message);
            }
          } catch (error) {
        
            toast.error('An error occurred. Please try again later.');
          }
        },
      });
    
      return (
        <Container id='divTO' className="mt-4 p-4 mb-3">
          <h2 className='text-center'>Theater Owner Registration</h2>
          <Form onSubmit={formik.handleSubmit}>
            {/* Theater Name */}
            <Form.Group controlId="theaterName">
              <Form.Label>Theater Name</Form.Label>
              <Form.Control
              id='fc'
                type="text"
                name="theaterName"
                value={formik.values.theaterName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.theaterName && formik.errors.theaterName ? (
                <div className="error">{formik.errors.theaterName}</div>
              ) : null}
            </Form.Group>
            {/* Location */}
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                id='fc'
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.location && formik.errors.location ? (
                <div className="error">{formik.errors.location}</div>
              ) : null}
            </Form.Group>
            {/* Ticket Range */}
            <Form.Group controlId="ticketRange">
              <Form.Label>Ticket Range</Form.Label>
              <Form.Control
                type="text"
                id='fc'
                name="ticketRange"
                value={formik.values.ticketRange}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ticketRange && formik.errors.ticketRange ? (
                <div className="error">{formik.errors.ticketRange}</div>
              ) : null}
            </Form.Group> 
            {/* Ticket Price */}
            <Form.Group controlId="ticketPrice">
              <Form.Label>Ticket Price</Form.Label>
              <Form.Control
                type="text"
                id='fc'
                name="ticketPrice"
                value={formik.values.ticketPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.ticketPrice && formik.errors.ticketPrice ? (
                <div className="error">{formik.errors.ticketPrice}</div>
              ) : null}
            </Form.Group>
            {/* Capacity */}
            <Form.Group controlId="capacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                id='fc'
                name="capacity"
                value={formik.values.capacity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.capacity && formik.errors.capacity ? (
                <div className="error">{formik.errors.capacity}</div>
              ) : null}
            </Form.Group>
            {/* Cancellation Available */}
            <Form.Group controlId="cancellationAvailable">
              <Form.Check
                type="checkbox"
                id='fc'
                label="Cancellation Available"
                name="cancellationAvailable"
                checked={formik.values.cancellationAvailable}
                onChange={formik.handleChange}
              />
            </Form.Group>
            {/* Screens Count */}
            <Form.Group controlId="screensCount">
              <Form.Label>Screens Count</Form.Label>
              <Form.Control
                type="number"
                id='fc'
                name="screensCount"
                step={1}
                min="1" 
                value={formik.values.screensCount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.screensCount && formik.errors.screensCount ? (
                <div className="error">{formik.errors.screensCount}</div>
              ) : null}
            </Form.Group>
            {/* Password */}
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                  id='fc'
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </Form.Group>
            {/* Email */}
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id='fc'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </Form.Group>
            {/* Submit Button */}
            <Button type="submit">Register</Button>
          </Form>
          {/* Toast container */}
          <ToastContainer />
        </Container>
      );
    };
