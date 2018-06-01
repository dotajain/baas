import React from 'react';
import BrandLogo from '../../../shared/BrandLogo';
import introVideoPath from '../../../../assets/images/video/synbaas_intro.mp4';
import videoPlaceholder from '../../../../assets/images/video/video-placholder.jpg';

const Hero = () => (
  <div className="hero hero-blue">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-7">
          <BrandLogo size="default"/>
          <p><strong>SynBaaS</strong> is Syntel’s microservices based accelerator to connect all user touch points to your enterprise systems with in-built horizontal re-usable digital services.</p>
        </div>
        <div className="col-5">
          <video poster={videoPlaceholder} src={introVideoPath} width="100%" height="100%" controls>
            Your browser doesn't support HTML5 video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
);

export default Hero;