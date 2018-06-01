import React from 'react';
import ownPlatform from '../../../../assets/images/ownPlatform.png';

const BuildYourOwnPlatform = () => (
  <section className="section bg-blue" id="ownPlatform">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-sm-6">
            <div className="section-copy has-bgimage">
              <img src={ownPlatform} alt="" />
            </div>
        </div>
        <div className="col-sm-6">
          <div className="section-copy">
            <h2 className="title">Build Your Own Platform</h2>
            <p>
              Build platform for digital modernization from scratch takes considerable amount of time while buy may result in vendor lock-in.
            </p>
            <p>SynBaaS helps in <strong>building your own platform for digital transformation</strong> in shortest period of time.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BuildYourOwnPlatform;