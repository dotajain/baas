import React from 'react';
import Scroll from 'react-scroll';

import cloud from '../../../../assets/images/cloud-platform.png';
import devops from '../../../../assets/images/dev-ops.png';
import services from '../../../../assets/images/services.png';
import microserviceIcon from '../../../../assets/images/icon-microservices.png';
import IndustryIcon from '../../../../assets/images/industries_icon.png';
import analyticIcon from '../../../../assets/images/analytic_icon.png';
import iotIcon from '../../../../assets/images/iot_icon.png';

const ScrollLink = Scroll.Link;

const TopFeature = () => (
  <section className="top-feature">
    <div className="container-fluid text-center">
      <h2 className="title">Top SynBaaS features</h2>
      <div className="row align-items-center">
        <div className="col">
          <div className="top-products-item">
            <ScrollLink className="scroll-link" activeClass="active" to="digitalModernization" spy smooth offset={-20} duration={500}>
              <div className="products-icon">
                <img src={cloud} alt="Digital Modernization" />
              </div>
              <div className="products-title">
                Digital Modernization
              </div>
            </ScrollLink>
          </div>
        </div>

        <div className="col">
          <div className="top-products-item">
            <ScrollLink className="scroll-link" activeClass="active" to="legacyModernization" spy smooth offset={-20} duration={500}>
              <div className="products-icon">
                <img src={devops} alt="Legacy Modernization" />
              </div>
              <div className="products-title">
                Legacy Modernization
              </div>
            </ScrollLink>
          </div>
        </div>

        <div className="col">
          <div className="top-products-item">
            <ScrollLink className="scroll-link" activeClass="active" to="ownPlatform" spy smooth offset={-20} duration={500}>
              <div className="products-icon">
                <img src={services} alt="Build Your Own Platform" />
              </div>
              <div className="products-title">
                Build Your Own Platform
              </div>
            </ScrollLink>
          </div>
        </div>

        <div className="col">
          <div className="top-products-item">
            <ScrollLink className="scroll-link" activeClass="active" to="microservices" spy smooth offset={-20} duration={500}>
              <div className="products-icon">
                <img src={microserviceIcon} alt="Microservices Foundation Kit" />
              </div>
              <div className="products-title">
                Microservices Foundation Kit
              </div>
            </ScrollLink>
          </div>
        </div>

        <div className="col">
          <div className="top-products-item">
            <ScrollLink className="scroll-link" activeClass="active" to="digitalSolution" spy smooth offset={-20} duration={500}>
              <div className="products-icon">
                <img src={IndustryIcon} alt="Digital Modernization" />
              </div>
              <div className="products-title">
                Industry Specific Digital Solution
              </div>
            </ScrollLink>
          </div>
        </div>

        <div className="col">
          <div className="top-products-item">
            <ScrollLink className="scroll-link" activeClass="active" to="analyticPlatforms" spy smooth offset={-20} duration={500}>
              <div className="products-icon">
                <img src={analyticIcon} alt="Analytic Platform" />
              </div>
              <div className="products-title">
                Analytic Platform
              </div>
            </ScrollLink>
          </div>
        </div>

        <div className="col">
          <div className="top-products-item">
            <ScrollLink className="scroll-link" activeClass="active" to="iotPlatforms" spy smooth offset={-20} duration={500}>
              <div className="products-icon">
                <img src={iotIcon} alt="Digital Modernization" />
              </div>
              <div className="products-title">
                IoT Platform
              </div>
            </ScrollLink>
          </div>
        </div>
        
      </div>
    </div>
  </section>
);

export default TopFeature;