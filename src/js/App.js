// import "bootstrap";
import '../assets/styles/app.scss';
import React from 'react';
import { Route } from 'react-router-dom';
import Header from './shared/Header';
// import Fedex from './components/Fedex';
import ShowDetails from './components/Fedex/partial/ShowDetails';

import About from './components/About';
import Email from './components/Email';
import ServiceDiscovery from './components/InfrastructureServices/ServiceDiscovery';
import ServiceMonitorDashboard from './components/InfrastructureServices/ServiceMonitorDashboard';
import Login from './components/Retail/Login/';
import Retail from './components/Retail';
import DeviceRegistration from './components/IOT/DeviceRegistration';

import Async from 'react-code-splitting'

const Home = () => <Async load={ import('./components/Home') } />;

const App = () => (
  <div>
    <Header menuItem={menuItem} />
    <Route exact path="/" component={Home} />
    <Route path="/ShowDetails" component={ShowDetails} />
    <Route path="/about" component={About} />
    <Route path="/service-discovery" component={ServiceDiscovery} />
    <Route path="/service-monitor-dashboard" component={ServiceMonitorDashboard} />
    <Route path="/email-notification" component={Email} />
    <Route path="/retail-digital-banking" component={Login} />
    <Route path="/my-account/:id?" component={Retail} />
    <Route path="/event-processing-from-devices" component={DeviceRegistration} />
  </div>
);

export default App;


const menuItem = [
  {
    "title": "Infrastructure Services",
    "submenu": [
      'About',
      'Service Discovery',
      'Service Monitor Dashboard',
      'Centralized Logging',
      'API Gateway',
      'PaaS Cloud Foundry',
      'Docker Hub'
    ]
  },
  {
    "title": "User Engagement Microservices",
    "submenu": [
      'GeoLocation',
      'Push Notification',
      'Email Notification',
      'Tweet2Server',
      'Twitter Listener'
    ]
  },
  {
    'title': "Industries",
    "submenu": [
      "Retail Digital Banking",
      "Insurance",
      "Healthcare",
      "Retail",
    ]
  },
  {
    "title": "Analytic Platform",
    "submenu": [
      "Text to Voice conversion",
      "Diabetes Analytical Model",
      "High Cost Patient",
      "Diabetic Retinopathy",
      "Chronic Obstructive Pulmonary Diseases"
    ]
  },
  {
    "title": "IoT Platform",
    "submenu": [
      "Device Registration",
      "Event Processing from Devices",
      "Device Simulator"
    ]
  }
];