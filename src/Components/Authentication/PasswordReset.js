import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PasswordReset.css'

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = () => {
    if (!email) {
      setMessage('Please enter your email.');
    } else {
      axios
        .get(`http://localhost:4000/Register/?email=${email}`)
        .then((response) => {
          if (response.data.length > 0) {
            // Implement password reset logic here, such as sending a password reset link to the user's email.
            setMessage(`Password reset link sent to ${email}.`);
          } else {
            setMessage('No account found with this email.');
          }
        })
        .catch((error) => {
          console.error('Password reset failed:', error);
          setMessage('Password reset failed. Please try again.');
        });
    }
  };
  return (
    <div className="password-reset-container">
      <h2 className="password-reset-header">Forgot Password</h2>
      <p>Enter your email to receive a password reset link.</p>
      <div className="password-reset-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handlePasswordReset}>Reset Password</button>
        <p className="password-reset-message">{message}</p>
      </div>
    </div>
  );
};

export default PasswordReset;


