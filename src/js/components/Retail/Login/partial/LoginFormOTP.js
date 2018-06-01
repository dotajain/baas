import React from 'react';
import { Link } from 'react-router-dom';

const LoginFormOTP = ({...props}) => {

  return (
  <div className="retail-login">
    <div className="retail-login-header">
      
      <h3>
        Enter your One Time Password (OTP)
        <span className="info-otp">Please check your registred mobile number 85xxxxxx25 for OTP</span>
      </h3>
    </div>
    <form className="form-default">
      <div className="form-box">
        <label htmlFor="otp" className="form-label">One Time Passowrd (OTP)</label>
        <input id="otp" name="otp" className="form-input" type="text" />
      </div>
      <div className="buttons">
        <button className="btn btn-primary" onClick={props.backToLogin} >Back to login</button>
        <Link to="/my-account" className="btn btn-default">Login to SYN Bank</Link>
      </div>
    </form>
  </div>
)};

export default LoginFormOTP;