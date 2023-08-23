import React, { useRef, useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import NewPassword from './NewPassword';
import '../styles/PasswordReset.css';

const PasswordReset = () => {
  const form = useRef();
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [user, setUser] = useState(null); 

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const enteredEmail = formData.get('message');

    try {
      const response = await axios.get('http://localhost:4000/Register');
      const registeredUsers = response.data;

      const foundUser = registeredUsers.find(user => user.email === enteredEmail);
      if (foundUser) {
        const randomCode = Math.floor(1000 + Math.random() * 9000);
        setOtp(randomCode); 

        const emailData = {
          from_name: 'Your App',
          from_email: 'yourapp@example.com',
          message: `Your verification code: ${randomCode}`,
          to_name: foundUser.fullName,
          to_email: enteredEmail,
        };
        await emailjs.send('service_tz8tvk8', 'template_vantckm', emailData, 'wKE-SxLbsRZble8LF');
        setMessage(`Verification code sent to ${enteredEmail}`);
        setUser(foundUser);
      } else {
        setMessage('Email not registered');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred');
    }
  };

  const verifyOTP = () => {
    const parsedOTP = parseInt(enteredOTP);

    if (otp === '') {
      setMessage('Please generate an OTP first.');
    } else if (parsedOTP === otp) {
      setMessage('Verification successful!');
      setShowNewPassword(true);
    } else {
      setMessage('Incorrect OTP. Please try again.');
    }
  };

  return (
    <div className="container text-black mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <h2 className="text-center">Forget Password</h2>
          <form ref={form} onSubmit={sendEmail} className="mb-3">
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">Enter your registered email:</label>
              <input type="email" className="form-control text-black" id="emailInput" name="message" />
            </div>
            <button type="submit" className="btn btn-primary">Send OTP</button>
          </form>

          {otp !== '' && (
            <div>
              <label htmlFor="otpInput" className="form-label">Enter OTP:</label>
              <input type="text" className="form-control mb-2 text-black" id="otpInput" name="otp" value={enteredOTP} onChange={e => setEnteredOTP(e.target.value)} />
              <button className="btn btn-success" onClick={verifyOTP}>Verify OTP</button>
            </div>
          )}

          <p className="mt-3">{message}</p>
        </div>
      </div>
      {showNewPassword && <NewPassword user={user} />}
    </div>
  );
};

export default PasswordReset;
