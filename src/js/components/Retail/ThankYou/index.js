import React, { Component } from 'react';

class ThankYou extends Component {

  render() {
    const {data} = this.props;
    return (
      <div className="account thankyou">
        <h3 className="page-title">Thank You</h3>
        <i className="fa fa-check-circle"></i>
        <div className="thankyou-data">
          Your payment to
          <span>{data.payeeName}</span>
          has gone through for
          <span>${data.transferedAmount}</span>
        </div>
        <button className="btn btn-default" onClick={this._backToFundTransfer}>Make another transfer</button>
      </div>
    );
  }
};

export default ThankYou;