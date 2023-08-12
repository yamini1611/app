import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignIn.css';
import { Divider } from '@mui/material';
import GSI from '../Google/GSI';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      setErrorMessage('Both email and password are required.');
    } else {
      axios
        .get('http://localhost:4000/Register') // Assuming your API endpoint for fetching user data is '/Register'
        .then((response) => {
          const userData = response.data.Register.find(user => user.email === email && user.password === password);
          if (userData) {
            console.log('Login successful!', userData);
            // You might want to redirect the user to another page after successful login
          } else {
            setErrorMessage('Login failed. Please check your credentials and try again.');
          }
        })
        .catch((error) => {
          console.error('Login failed:', error);
          setErrorMessage('Login failed. Please try again.');
        });
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h2 className="signin-header">Log In</h2>
        <div className="input-container">
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Divider className="text-center  col-lg-5 mx-auto  p-3">or</Divider>
        <div className='pb-3 justify-content-center d-flex' >
        <GSI></GSI>
        </div>
        <button className="signin-button" onClick={handleSignIn}>
          Login
        </button>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
