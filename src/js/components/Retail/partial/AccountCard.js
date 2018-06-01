import React from 'react';


const AccountCard = ({...props}) => (
  <button className={`card card-account ${props.initialId === props.id ? 'active': ''}`} onClick={props.onClick}>
    <div className="card-block">
      <div className="card-top">
        <h2 className="card-title">{props.accountName}</h2>
        <p>{props.accountNumber}</p>
      </div>
      <div className="card-bottom">
        <h3>Total Balance</h3>
        <p>{`$${props.balance}`}</p>
      </div>
    </div>
  </button>
);

export default AccountCard;