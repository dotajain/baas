import React, { Component } from 'react';
// custom Component
import SynBankLogo from '../partial/SynBankLogo';
import LoginForm from './partial/LoginForm';
import LoginFormOTP from './partial/LoginFormOTP';

class Retail extends Component {
  constructor() {
    super();
    this._onGenerateOtp = this._onGenerateOtp.bind(this);
    this._backToLogin = this._backToLogin.bind(this);
    
    this.state = {
      otp: false
    }
  }

  _onGenerateOtp(){
    this.setState({ otp: true })
  }
  _backToLogin() {
    this.setState({ otp: false })
  }

  render() {
    let login = (<LoginForm onGenerateOtp={this._onGenerateOtp} />);
    if (this.state.otp) {
      login = <LoginFormOTP backToLogin={this._backToLogin} />
    }
    return (
      <div className="retail">
        <SynBankLogo />
        {login}
      </div>
    );
  }
}

export default Retail;