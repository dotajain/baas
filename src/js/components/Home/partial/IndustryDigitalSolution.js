import React from 'react';
import digitalSolution from '../../../../assets/images/digitalSolution.png';

const IndustryDigitalSolution = () => (
  <section className="section bg-blue" id="digitalSolution">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-sm-6">
            <div className="section-copy has-bgimage">
              <img src={digitalSolution} alt="" />
            </div>
        </div>
        <div className="col-sm-6">
          <div className="section-copy">
            <h2 className="title">Industry Specific Digital Solution</h2>
            <p>
              SynBaaS comes with industry specific digital solutions in <strong>Retail Banking</strong>, Customer Insight and Doctor’s appointment in <strong>Heathcare</strong>, <strong>Self Care</strong> in <strong>Insurance</strong> and <strong>Retail</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default IndustryDigitalSolution;