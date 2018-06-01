import React from 'react';

import emailNotification from '../../../../assets/images/email-notification.jpg';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/styles';

const LandingPage = () => (
  <section className="section" id="emailService">
    <div className="container">
      <div className="row align-items-center">
        
        <div className="col-sm-6">
          <div className="section-copy">
            <h2 className="title">Powerfull email notification infrastructure</h2>
            <p>
              Easy SMTP integration and a simple, RESTful API abstracts away the messy details of sending transactional or bulk email. 
              Scale quickly, whether you need to send 10 or 10 million emails.
            </p>
            <button className="btn">Launch Demo</button>
          </div>
        </div>
        <div className="col-sm-6">
            <div className="browser-window">
              <div className="browser-header">
                <span className="dot">&nbsp;</span><span className="dot">&nbsp;</span><span className="dot">&nbsp;</span>
              </div> 
              <div className="browser-body">
                <SyntaxHighlighter language='javascript' style={githubGist}>
                {`POST /sendMail/1.0

  toEmailId = '< receiver@emailaddress.com >',

  ccEmailId = '< ccReceiver@emailaddress.com > ',

  bccEmailId = '< bccReceiver@emailaddress.com >',

  subject = 'your email subject line',

  body = 'email body content here'`}
      </SyntaxHighlighter>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
);

export default LandingPage;