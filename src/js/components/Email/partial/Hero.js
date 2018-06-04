import React from 'react';
// import BrandLogo from '../../../shared/BrandLogo';
// import introVideoPath from '../../../../assets/images/video/synbaas_intro.mp4';
// import videoPlaceholder from '../../../../assets/images/video/video-placholder.jpg';
import emailFlow from '../../../../assets/images/email_notification_flow.png';
const Hero = () => (
  <div className="hero hero-white">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-7">
          <h1 className="page-title">Email Notification Microservice</h1>
          <h2  className="page-title-sub">Send better email using SynBaaS user engagement microservice platform</h2>
          
          <p><strong>SynBaaS</strong> provides you the Powerful APIs that enable you to send, receive and track email effortlessly.</p>
          <a href="#launchDemo" className="btn">Launch Demo</a>
        </div>
        <div className="col-5">
          <img src={emailFlow} alt="email Notification flow" />
        </div>
      </div>
    </div>
  </div>
);

export default Hero;