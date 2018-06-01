import React from 'react';

import EmailForm from './EmailForm';
import SuggestedValue from './SuggestedValue';

const Demo = ({...props}) => (
  <section className="section" id="emailService">
    <div className="container">
      <div className="row">
        <div className="col-sm-7">
          <div className="email-form">
            <EmailForm {...props} />
          </div>
        </div>
        <div className="col-sm-5">
           <SuggestedValue {...props} />
        </div>
      </div>
    </div>
  </section>
);

export default Demo;