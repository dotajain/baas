import React from 'react';


const AccountTimeline = ({...props}) => {
  const transactionList = _.map(props.data.transaction, (transaction, i) => {
    return (
      <div className="transaction-list" key={i}>
        <div className="transaction-date">{transaction.date}</div>
        <div className="transaction-descriptoin">{transaction.title}</div>
        <div className="transaction-amount">{transaction.amount}</div>
      </div>
    )
  });
  
  return (
  <div className="account-timeline">
    <h3 className="title">{props.data.accountName}<span>last transaction details</span></h3>
    <div className="account-transaction">
      {transactionList}
    </div>
  </div>
)};

export default AccountTimeline;