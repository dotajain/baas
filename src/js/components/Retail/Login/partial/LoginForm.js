import React from 'react';
import LoadingButton from '../../../../shared/LoadingButton';

const LoginForm = ({...props}) => (
  <div className="retail-login">
      <h3>Login to the Syntal Bank</h3>
      <form className="form-default">
        <div className="form-box">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input id="userName" name="userName" className="form-input" type="text" />
        </div>
        <div className="form-box">
          <label htmlFor="password" className="form-label">Password</label>
          <input id="password" name="password" className="form-input" type="password" />
        </div>
        <div className="buttons">
          <LoadingButton title="Generate OTP" type="button" className="btn btn-default btn-block" onClick={props.onGenerateOtp} />
          <div className="info-otp">Please check your registred mobile number 85xxxxxx25 for OTP</div>
        </div>
      </form>
    </div>
);

export default LoginForm;