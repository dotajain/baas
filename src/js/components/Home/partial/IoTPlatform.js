import React from 'react';
import iotPlatform from '../../../../assets/images/iotPlatform.png';

const IoTPlatform = () => (
  <section className="section bg-blue" id="iotPlatforms">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-sm-6">
            <div className="section-copy has-bgimage">
              <img src={iotPlatform} alt="" />
            </div>
        </div>
        <div className="col-sm-6">
          <div className="section-copy">
            <h2 className="title">IoT Platform</h2>
            <p>SynBaaS comes with M2M communication server which <strong>supports multiple open or proprietary protocols</strong> including MQTT to connect different devices.</p>
            <p>It helps in secure communication between devices and communication server. SynBaaS has ability to execute complex business rules and analytics on incoming events from sensor devices in real time.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default IoTPlatform;