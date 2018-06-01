import React, { Component } from 'react';
import AccountCard from '../partial/AccountCard';
import PayeeCard from '../partial/PayeeCard';

import { backToFundTransfer, thankYouTransfer } from "../../../redux/actions/retailAction";

class ConfirmTransfer extends Component {
  constructor() {
    super();
    this._backToFundTransfer = this._backToFundTransfer.bind(this);
    this._onAmountChange = this._onAmountChange.bind(this);
    this._confirmTransfer = this._confirmTransfer.bind(this);

    this.state = {
      transferAmount: ''
    }
  }
  
  componentDidMount() {
    this.refs.textInput.focus();
  }

  _backToFundTransfer() {
    this.props.dispatch(backToFundTransfer());
  }
  _onAmountChange(e) {
    this.setState({ transferAmount: e.target.value });
  }

  _confirmTransfer(){
    const data = {
      transferedAmount: this.state.transferAmount,
      payeeName: this.props.data.payee[0].name
    }
    this.props.dispatch(thankYouTransfer({data}));
  }

  render() {
    const { data } = this.props;
    const cards = <AccountCard accountName={data.accountName} accountNumber={data.accountNumber} balance={data.balance} />;
    const payeeCard = _.map(data.payee, (payee,i) =>  <PayeeCard key={i} payee={payee}/> );
    const payeeName = data.payee[0].name;
    return (
      <div className="account confirm-transfer">
        <div className="confirm-transfer-header">
          <h3 className="page-title">Confirm transfer</h3>
          <button className="btn btn-default" onClick={this._backToFundTransfer}>Back to transfer</button>
        </div>
        <div className="row">
          <div className="col-sm-4 selected-account">
            {cards}
          </div>
          <div className="col-sm-4">
            <form className="form-default">
              <div className="form-box">
                <label htmlFor="amount" className="form-label">Enter transfer amount</label>
                <div className="input-group">
                  <span className="input-group-addon" id="amountSymbol">$</span>
                  <input ref="textInput"  type="text" className="form-input" aria-describedby="amount" id="amount" name="amount" onChange={this._onAmountChange} />
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-4">
            {payeeCard}
          </div>
        </div>
        <div className="buttons">
          <button className="btn btn-primary confirm-button" onClick={this._confirmTransfer}>Confirm Transfer to <span>{payeeName}</span></button>
        </div>
      </div>
    );
  }
};

export default ConfirmTransfer;