import React from 'react';
import microservices from '../../../../assets/images/microservices.png';

const MicroservicesFoundationKit = () => (
  <section className="section" id="microservices">
    <div className="container">
      <div className="row align-items-center">
       
        <div className="col-sm-6">
          <div className="section-copy">
            <h2 className="title">Microservices Foundation Kit</h2>
            <p>
             SynBaaS has microservices foundation and framework to develop, manage, monitor and deploy your custom backend services to cloud.</p>
             <p>SynBaaS comes with <strong>re-usable assets, developers guide and sample implementation</strong>, making it fast and easy for your development teams to utilize our platform and helps in improvement in developer’s productivity.
            </p>
          </div>
        </div>
         <div className="col-sm-6">
            <div className="section-copy has-bgimage">
              <img src={microservices} alt="" />
            </div>
        </div>
      </div>
    </div>
  </section>
);

export default MicroservicesFoundationKit;