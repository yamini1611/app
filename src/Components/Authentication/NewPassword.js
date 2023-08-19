import React, { useState } from 'react';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password submission logic here
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-lg-6">
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
      </div>
    </div>
  );
};

export default NewPassword;
