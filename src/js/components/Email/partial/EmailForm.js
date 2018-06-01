import React from 'react';
import LoadingButton from '../../../shared/LoadingButton';

const EmailForm = ({...props}) => (
  <form className="form-default">
    <div className="form-box">
      <label htmlFor="serivceUrl" className="form-label">Service URL</label>
      <input id="serivceUrl" name="serivceUrl" className="form-input" type="text" onChange={props.onUrlChange} />
    </div>

    <h3>Enter your email details</h3>
    
    <div className="form-box">
      <label htmlFor="toEmailId" className="form-label">Email To</label>
      <input id="toEmailId" name="toEmailId" className="form-input" type="email" onChange={props.onEmailChange} />
    </div>

    <div className="form-hr">
      <div className="form-box">
        <label htmlFor="ccEmailId" className="form-label">CC</label>
        <input id="ccEmailId" name="ccEmailId" className="form-input" type="email" onChange={props.onCcChange} />
      </div>
      <div className="form-box">
        <label htmlFor="bccEmailId" className="form-label">BCC</label>
        <input id="bccEmailId" name="bccEmailId" className="form-input" type="email" onChange={props.onBccChange} />
      </div>
    </div>
    <div className="form-box">
      <label htmlFor="subject" className="form-label">Subject</label>
      <input id="subject" name="subject" className="form-input" type="email" onChange={props.onSubjectChange} />
    </div>
    <div className="form-box">
      <label htmlFor="body" className="form-label">Message</label>
      <textarea id="body" name="body" className="form-input" onChange={props.onBodyChange}>
      </textarea>
    </div>
    <div className="buttons">
      <LoadingButton title="Send Email" type="button" className="btn btn-default" onClick={props.sendEmail} fetching={props.fetching} />
    </div>
  </form>
);

export default EmailForm;