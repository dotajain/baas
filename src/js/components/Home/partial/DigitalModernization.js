import React from 'react';
import digitalModernization from '../../../../assets/images/digitalModernization.png';

const DigitalModernization = () => (
  <section className="section bg-blue" id="digitalModernization">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-sm-6">
            <div className="section-copy has-bgimage">
              <img src={digitalModernization} alt="" />
            </div>
        </div>
        <div className="col-sm-6">
          <div className="section-copy">
            <h2 className="title">Digital Modernization</h2>
            <p>
              SynBaaS provides a <strong>backbone for digital modernization</strong> by connecting all user touch points with backend enterprise applications. It enables your applications to <strong>gain speed</strong>, <strong>scale</strong>, and <strong>security</strong> required for digital modernization. It comes with re-usable user engagement services and reduces mobile app development timeframe.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DigitalModernization;