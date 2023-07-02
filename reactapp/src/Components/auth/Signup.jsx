import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Buffer from './Buffer';
import Alert from '@mui/material/Alert';

const Signup = ({ handleSignup }) => {
  const [userRole, setUserRole] = useState('user'); // Set userRole to 'user' by default
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [mobileNumber, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignin = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
      username,
      mobileNumber,
    };

    const endpoint = 'http://localhost:5071/api/user/signup';

    try {
      setIsLoading(true);
      setIsSuccess(false); // Reset isSuccess state before making the request

      const res = await axios.post(endpoint, user);
      setIsSuccess(true);

      console.log(res.data);
      setError('');
      setIsLoading(false);

      // After successful registration, show buffer and navigate to login page
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1500);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError('Failed to add user. Please try again.');
    }
  };

  const resetForm = () => {
    setUsername('');
    setUsernameError('');
    setMobile('');
    setMobileError('');
    setEmail('');
    setEmailError('');
    setPassword('');
    setPasswordError('');
    setConfirmPassword('');
    setConfirmPasswordError('');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (!event.target.value) {
      setUsernameError('Username is required');
    } else {
      setUsernameError('');
    }
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
    if (!/^\d{10}/.test(event.target.value)) {
      setMobileError('Mobile number must be 10 digits');
    } else {
      setMobileError('');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(event.target.value)) {
      setEmailError('Email is not valid');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (!/[a-zA-Z0-9@_]{8,}/.test(event.target.value)) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (event.target.value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <h1 className="signup-heading">SIGN UP</h1>
          <br></br>
          <form className="signup-form" onSubmit={handleSubmit}>
            {isSuccess && (
              <Alert className="success-alert" variant="filled" severity="success">
                User added successfully
              </Alert>
            )}
            {error && (
              <Alert className="error-alert" variant="filled" severity="error">
                {error}
              </Alert>
            )}
            <div id="bgclr">
              <div className="form">
                <input type="text" id="email" value={email} onChange={handleEmailChange} placeholder="Enter email" />
                <div className="error">{emailError}</div>

                <input id="username" value={username} onChange={handleUsernameChange} type="text" placeholder="Enter Username" />
                <div className="error">{usernameError}</div>

                <input id="mobileNumber" value={mobileNumber} onChange={handleMobileChange} placeholder="Enter Mobilenumber" />
                <div className="error">{mobileError}</div>

                <input id="password" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <div className="error">{passwordError}</div>

                <input id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} type="password" placeholder="Confirm Password" />
                <div className="error">{confirmPasswordError}</div>
              </div>

              <button
                id="submitButton"
                type="submit"
                disabled={usernameError || emailError || mobileError || passwordError || confirmPasswordError || isLoading}
              >
                {isLoading ? <Buffer /> : 'REGISTER'}
              </button>
              <label className="label" style={{ color: '#f4ecec' }}>
                Already User?{' '}
                <button className="link-btn" id="loginButton" onClick={handleSignin}>
                  SIGN IN
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
