import React, { Component } from 'react';
import _ from 'lodash';

import AccountCard from '../partial/AccountCard';
import AccountTimeline from './partial/AccountTimeline';
import { backToFundTransfer } from "../../../redux/actions/retailAction";
class MyAccount extends Component {
  constructor(props) {
    super();
    this._getTransaction = this._getTransaction.bind(this);
    this.state = {
      data: '',
      isActive: false,
      initialId: 0
    }
  }

  componentWillMount() {
    this.props.dispatch(backToFundTransfer());
    this.setState({ data: this.props.accounts[0] })
  }
  
  componentWillReceiveProps(nextProps) {
    const accounts = nextProps.accounts;
    const conversationNodeVisited = nextProps.showPageItem;
    // if ( === 'currentAccountBalance') {
    //   this.setState({  })
    // }

    if (conversationNodeVisited === 'savingsAccountBalance' || conversationNodeVisited === 'savingAccountTransaction') {
      this._getTransaction(accounts[0], 0);
    } else if (conversationNodeVisited === 'currentAccountBalance' || conversationNodeVisited === 'currentAccountTransaction') {
      this._getTransaction(accounts[1], 1);
    } else if (conversationNodeVisited === 'creditCardBalance' || conversationNodeVisited === 'creditCardTransaction') {
      this._getTransaction(accounts[2], 2);
    }
  }

  _getTransaction(account, id) {
    this.setState({ data: account, isActive: true, initialId: id })
  }

  render() {
    const { accounts } = this.props;
    let cards = _.map(accounts, (account,i) => {
     let active;
      return (
        <div className="col-sm-4" key={i}>
          <AccountCard
            initialId={this.state.initialId}
            id={i}
            onClick={() => this._getTransaction(account, i)}
            accountName={account.accountName}
            accountNumber={account.accountNumber}
            balance={account.balance}
          />
        </div>
        );
    })

    return (
      <div className="account">
        <h3 className="page-title">My accounts</h3>
        
        <div className="row">
          {cards}
        </div>
        
        <AccountTimeline data={this.state.data} />
        
      </div>
    );
  }
};

export default MyAccount;