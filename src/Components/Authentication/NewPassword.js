import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/dist';

const NewPassword = ({ user }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      try {
        const response = await axios.put(`http://localhost:4000/Register/${user.id}`, {
          ...user,
          password: newPassword
        });

        if (response.status === 200) {
          setMessage('Password updated successfully.');
          setPasswordUpdated(true); 
        } else {
          setMessage('Password update failed.');
        }
      } catch (error) {
        console.error(error);
        setMessage('An error occurred while updating the password.');
      }
    } else {
      setMessage('Passwords do not match.');
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-lg-6">
        {!passwordUpdated ? ( // Conditional rendering 
          <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-3">
              <label htmlFor="newPasswordInput" className="form-label">Enter Your New Password:</label>
              <input
                type="password"
                className="form-control text-black"
                id="newPasswordInput"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPasswordInput" className="form-label">Confirm New Password:</label>
              <input
                type="password"
                className="form-control text-black"
                id="confirmPasswordInput"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        ) : (
          <div>
            <p className="text-success">{message}</p>
            <p>You can now <Link to='/signin'>signin</Link> sign in with your new password.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
