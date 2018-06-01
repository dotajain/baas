import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { dismissError } from "../redux/actions/sendEmailActions";
const ErrorNotification = ({data, dispatch}) => { 
  const handleDismiss = () => {
    dispatch(dismissError());
  }
  return (
    <Alert bsStyle="danger" onDismiss={handleDismiss}>
      <p>{data}</p>
    </Alert>
  );
}

export default ErrorNotification;
