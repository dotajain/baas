import React from 'react';
import { urls } from '../../../../redux/constants';
import serviceMonitorDashboard from '../../../../../assets/images/service_monitor_dashboard.png';

const Hero = () => (
  <div className="hero hero-white">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-7">
          <h1 className="page-title">Service Monitor Dashboard</h1>
          <h2  className="page-title-sub"><strong>SynBaaS</strong> demonstrate the monitoring aspect thru Service Discovery Dashboard and Circuit Breaker Dashboard</h2>

          <ul className="hero-list">
            <li>Monitoring multiple services is one of the challenge with Microservice Architecture.</li>
            <li>Different PaaS environment provide their own dashboards to monitor the health of applications, number of requests etc.</li>
          </ul>
          
          <a href={urls.SERVICEMONITORDASHBOARDDEMO} target="_blank" className="btn btn-primary">Launch Demo</a>
        </div>
        <div className="col-5">
          <img src={serviceMonitorDashboard} alt="Service Monitor Dashboard" />
        </div>
      </div>
    </div>
  </div>
);

export default Hero;