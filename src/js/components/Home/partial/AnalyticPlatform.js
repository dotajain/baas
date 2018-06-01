import React from 'react';
import analyticPlatform from '../../../../assets/images/analyticPlatform.png';

const AnalyticPlatform = () => (
  <section className="section" id="analyticPlatforms">
    <div className="container">
      <div className="row align-items-center">
        
        <div className="col-sm-6">
          <div className="section-copy">
            <h2 className="title">Analytic Platform</h2>
            <p>SynBaaS provides platform to <strong>build and deploy machine learning/analytics models</strong> (R and Python) as microservices and exposes the models as APIs.</p>
            <p>Enterprise applications and external users can connect to the platform using <strong>REST API to score, evaluate and monitor</strong> the models.</p>
          </div>
        </div>
        <div className="col-sm-6">
            <div className="section-copy has-bgimage">
              <img src={analyticPlatform} alt="" />
            </div>
        </div>
      </div>
    </div>
  </section>
);

export default AnalyticPlatform;