import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import { connect } from "react-redux";
import { urls } from '../../redux/constants';

import { sendEmail } from "../../redux/actions/sendEmailActions";

// custom Component
import Hero from './partial/Hero';
import LandingPage from './partial/LandingPage';

import EmailNotification from './partial/EmailNotification';
import DeveloperTools from './partial/DeveloperTools';
import Demo from './partial/Demo';
import ErrorNotification from '../../shared/ErrorNotification';

import Util from '../../shared/Util';

@connect((store) => {
  console.log(store);
  return {
    data: store,
    err: store.sendEmail.err.error,
    fetching: store.sendEmail.fetching
  };
})

class Email extends Component {

  constructor() {
    super();
    this._sendEmail = this._sendEmail.bind(this);
		this._onEmailChange = this._onEmailChange.bind(this);
		this._onCcChange = this._onCcChange.bind(this);
		this._onBccChange = this._onBccChange.bind(this);
		this._onSubjectChange = this._onSubjectChange.bind(this);
		this._onBodyChange = this._onBodyChange.bind(this);
    this._onUrlChange = this._onUrlChange.bind(this);
    this._error = this._error.bind(this);

    this.state = {
      emailInfo: {
        toEmailId: '',
        ccEmailId: '',
        bccEmailId: '',
        subject: '',
        body: ''
      },
      error: '',
      postUrl: urls.SENDEMAIL
    }
  }

  _sendEmail() {
    
    let isCCEmailValid, isBCCEmailValid;

    const data = this.state.emailInfo;
    const isEmailValid = Util.isValidEmail(data.toEmailId);
    const serviceUrl = this.state.postUrl;

    if (data.ccEmailId) {
      isCCEmailValid = Util.isValidEmail(data.ccEmailId);
    } else {
      isCCEmailValid = true;
    }
    if (data.bccEmailId) {
      isBCCEmailValid = Util.isValidEmail(data.bccEmailId);
    } else {
      isCCEmailValid = true;
    }
    if (data.toEmailId || (data.ccEmailId || data.bccEmailId) && isEmailValid && (isCCEmailValid || isBCCEmailValid) ) { 
      this.props.dispatch(sendEmail({data, serviceUrl}));
    } else {
      this._error('required valid email address');
    }

  }

  _error(message) {
    this.setState({ error: message });
  }

  _onEmailChange(e) {
		const email = _.extend({}, this.state.emailInfo);
		email.toEmailId = e.target.value;
		this.setState({ emailInfo: email });
	}
	_onCcChange(e) {
		const email = _.extend({}, this.state.emailInfo);
		email.ccEmailId = e.target.value;
		this.setState({ emailInfo: email });
	}
	_onBccChange(e) {
		const email = _.extend({}, this.state.emailInfo);
		email.bccEmailId = e.target.value;
		this.setState({ emailInfo: email });
	}
	_onSubjectChange(e) {
		const email = _.extend({}, this.state.emailInfo);
		email.subject = e.target.value;
		this.setState({ emailInfo: email });
	}
	_onBodyChange(e) {
		const email = _.extend({}, this.state.emailInfo);
		email.body = e.target.value;
		this.setState({ emailInfo: email });
	}

  _onUrlChange(e) {
    this.setState({ postUrl: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ error: nextProps.err })
  }

  render() {
    const email = this.state.emailInfo;
    const { fetching } = this.props;
    const error = this.state.error;
    const showError = error ? <ErrorNotification data={error} dispatch={this.props.dispatch} /> : '';
    return (
      <div>
        {showError}
        <Hero />
        <LandingPage />
        <EmailNotification />
        <DeveloperTools />
        <Demo toEmailId={email.toEmailId || 'receiver@emailaddress.com'}
              ccEmailId={email.ccEmailId || 'ccReceiver@emailaddress.com'}
              bccEmailId={email.bccEmailId || 'bccReceiver@emailaddress.com'}
              subject={email.subject || 'your email subject line'}
              body={email.body || 'email body content here'}
              url={this.state.postUrl || '/sendMail/1.0'}
              sendEmail={this._sendEmail}
              onBodyChange={this._onBodyChange}
              onSubjectChange={this._onSubjectChange}
              onBccChange={this._onBccChange}
              onCcChange={this._onCcChange}
              onEmailChange={this._onEmailChange}
              onUrlChange={this._onUrlChange}
              fetching={fetching}
        />
      </div>
    );
  }
}

export default Email;