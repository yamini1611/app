import React, { useRef, useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const PasswordReset = () => {
  const form = useRef();
  const [message, setMessage] = useState('');
  
  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const enteredEmail = formData.get('message');

    try {
      const response = await axios.get('http://localhost:4000/Register');
      const registeredUsers = response.data;
      
      const user = registeredUsers.find(user => user.email === enteredEmail);
      if (user) {
        // Generate a random 4-digit code
        const randomCode = Math.floor(1000 + Math.random() * 9000);
        
        // Configure and send the email
        const emailData = {
          from_name: 'Your App',
          from_email: 'yourapp@example.com',
          message: `Your verification code: ${randomCode}`,
          to_name: user.fullName,
          to_email: enteredEmail,
        };

        await emailjs.send('service_tz8tvk8', 'template_vantckm', emailData, 'wKE-SxLbsRZble8LF');
        
        setMessage(`Verification code sent to ${enteredEmail}`);
      } else {
        setMessage('Email not registered');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred');
    }
  };

  return (
    <div>
      <form ref={form} onSubmit={sendEmail}>
        <label>Enter your registered email:</label>
        <input type="email" name="message" />
        <input type="submit" value="Send" />
      </form>
      <p>{message}</p>
    </div>
  );
};

export default PasswordReset;
