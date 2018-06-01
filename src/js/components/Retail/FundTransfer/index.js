import React, { Component } from 'react';
import _ from 'lodash';

import AccountCard from '../partial/AccountCard';
import PayeeCard from '../partial/PayeeCard';
import { transferMoney } from "../../../redux/actions/retailAction";

class FundTransfer extends Component {
  constructor(props) {
    super();
    this._getPayee = this._getPayee.bind(this);
    this._activePayee = this._activePayee.bind(this);

    this.state = {
      selectedAccount: '',
      initialId: 0,
      initialPayeeId: '',
      accountName: '',
      selectedPayee: ''
    }
  }

  componentWillMount() {
    this.setState({ selectedAccount: this.props.accounts[0], accountName: this.props.accounts[0].accountName })
  }
  
  _getPayee(account, id) {
    this.setState({ selectedAccount: account, initialPayeeId: '',  initialId: id, accountName: account.accountName  })
  }
  _activePayee(payee, id) {
    this.setState({ initialPayeeId: id, selectedPayee: payee }, () => {
      const data = {
       accountName: this.state.selectedAccount.accountName,
       accountNumber: this.state.selectedAccount.accountNumber,
       balance: this.state.selectedAccount.balance,
       payee: [this.state.selectedPayee]
      };
      this.props.dispatch(transferMoney({data}));
    });
  }

  render() {
    const { accounts } = this.props;
    const cards = _.map(accounts, (account,i) => {
      return (
        <div className="col-sm-4" key={i}>
          <AccountCard
            initialId={this.state.initialId}
            id={i}
            onClick={() => this._getPayee(account, i)}
            accountName={account.accountName}
            accountNumber={account.accountNumber}
            balance={account.balance}
          />
        </div>
        );
    });
    const payeeCard = _.map(this.state.selectedAccount.payee, (payee,i) => {
      return (
        <div className="col" key={i}>
          <PayeeCard 
            payee={payee}
            currentId={this.state.initialPayeeId}
            id={i} 
            onClick={() => this._activePayee(payee, i)} />
        </div>
        );
    });
    return (
      <div className="account">
        <h3 className="page-title">Initiate fund transfer</h3>
        <section className="section bg-blue">
          <h2 className="title">Select Account</h2>
          <div className="row">
            {cards}
          </div>
        </section>
        <section className="section-payee">
          <h2 className="title">Select Payee for {this.state.accountName}</h2>
          <div className="row">
            {payeeCard}
          </div>
        </section>
        
      </div>
    );
  }
};

export default FundTransfer;