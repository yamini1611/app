import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";
import { useEffect, useState } from "react";
import React from "react";
import GSI from "../Google/GSI";
import { Divider } from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber.length >= 10; // Basic length check
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberValid(validatePhoneNumber(e.target.value));
  };

  const handleRegister = () => {
    const isFullNameValid = /^[A-Za-z ]{1,30}$/.test(fullName);
    const isPasswordValid =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
        password
      );
    const isPhoneNumberValid = validatePhoneNumber(phoneNumber);

    if (!fullName || !email || !password || !confirmPassword || !phoneNumber) {
      setErrorMessage("All fields are required.");
    } else if (!isFullNameValid) {
      setErrorMessage(
        "Full name should contain only alphabets and be maximum 30 characters."
      );
    } else if (!emailValid) {
      setErrorMessage("Please enter a valid email address.");
    } else if (!isPasswordValid) {
      setErrorMessage(
        "Password should be at least 6 characters with at least one number, letter, and special character."
      );
    } else if (!passwordMatch) {
      setErrorMessage("Passwords do not match.");
    } else if (!isPhoneNumberValid) {
      setErrorMessage("Please enter a valid phone number.");
    } else {
      const userData = {
        fullName,
        email,
        password,
        phoneNumber,
        isLogged: false,
      };

      axios
        .get(`http://localhost:4000/Register/?email=${email}`)
        .then((response) => {
          if (response.data.length > 0) {
            alert("Account already exists");
            window.location.href = "/Register";
          } else {
            axios
              .post("http://localhost:4000/Register", userData)
              .then((response) => {
                console.log("Registration successful!", response.data)
                toast.success('Registration successful!', {
                  position: toast.POSITION.TOP_CENTER
                });
              })
              .catch((error) => {
                console.error("Registration failed:", error);
                setErrorMessage("Registration failed. Please try again.");
              });
          }
        });
    }
  };
  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-header">Tentukottaa</h2>
        <div className="input-container">
          <input
            className={`input-field ${emailValid ? "valid" : "invalid"}`}
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <span className={`validation-symbol ${fullName ? "green" : "red"}`}>
            {fullName ? "\u2713" : "\u2718"}
          </span>
        </div>
        <div className="input-container">
          <input
            className={`input-field ${emailValid ? "valid" : "invalid"}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <span className={`validation-symbol ${emailValid ? "green" : "red"}`}>
            {emailValid ? "\u2713" : "\u2718"}
          </span>
        </div>
        <div className="input-container">
          <input
            className={`input-field ${passwordMatch ? "valid" : "invalid"}`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className={`validation-symbol ${password ? "green" : "red"}`}>
            {password ? "\u2713" : "\u2718"}
          </span>
        </div>
        <div className="input-container">
          <input
            className={`input-field ${passwordMatch ? "valid" : "invalid"}`}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <span
            className={`validation-symbol ${confirmPassword ? "green" : "red"}`}
          ></span>
        </div>
        <div className="input-container">
          <input
            className={`input-field ${phoneNumberValid ? "valid" : "invalid"}`}
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <span className={`validation-symbol ${phoneNumber ? "green" : "red"}`}>
            {phoneNumber ? "\u2713" : "\u2718"}
          </span>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Divider className="text-center col-lg-5 mx-auto p-3">or</Divider>
        <div className="pb-3 justify-content-center d-flex">
          <GSI type="signin" axios="post"></GSI>
        </div>
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
        <p>
          Already have an Account{" "}
          <span>
            <Link to="/signin">Login</Link>
          </span>
        </p>
        <ToastContainer />
      </div>
  
    </div>
  );
}

export default Register;
