import React from 'react';


const PayeeCard = ({...props}) => (
  <button className={`card card-account card-payee ${props.currentId === props.id ? 'active': ''}`} onClick={props.onClick}>
    <div className="card-block">
      <div className="card-top">
        <h2 className="card-title">{props.payee.name}</h2>
        <p>{props.payee.accountNumber}</p>
        <p className="payee-bank">{props.payee.bank}</p>
      </div>
    </div>
  </button>
);

export default PayeeCard;