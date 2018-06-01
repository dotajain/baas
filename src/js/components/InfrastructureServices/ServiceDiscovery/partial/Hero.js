import React from 'react';
import { urls } from '../../../../redux/constants';
import serviceDiscovery from '../../../../../assets/images/serviceDiscovery.png';

const Hero = () => (
  <div className="hero hero-white">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-7">
          <h1 className="page-title">Service Discovery</h1>
          <h2  className="page-title-sub"><strong>SynBaaS</strong> leverages Netflix Eureka to enable client side service discovery</h2>

          <ul className="hero-list">
            <li>In a microservices application, the set of running service instances change dynamically.</li>
            <li>The number of service instances and their locations change dynamically.</li>
            <li>Virtual machines and containers are usually assigned dynamic IP addresses.</li>
            <li>Consequently, in order for a client to make a request to a service it must use a service-discovery mechanism.</li>
            <li>Service Discovery maintains registry of each registered service instance and location and keep refreshing the status by listening to service heartbeats</li>
          </ul>
          
          <a href={urls.SERVICEDISCOVERYDEMO} target="_blank" className="btn btn-primary">Launch Demo</a>
        </div>
        <div className="col-5">
          <img src={serviceDiscovery} alt="Service Discovery" />
        </div>
      </div>
    </div>
  </div>
);

export default Hero;