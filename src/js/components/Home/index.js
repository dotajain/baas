import React, { Component } from 'react';
// custom Component

import Hero from './partial/Hero';
import TopFeature from './partial/TopFeature';
import DigitalModernization from './partial/DigitalModernization';
import LegacyModernization from './partial/LegacyModernization';
import BuildYourOwnPlatform from './partial/BuildYourOwnPlatform';
import MicroservicesFoundationKit from './partial/MicroservicesFoundationKit';
import IndustryDigitalSolution from './partial/IndustryDigitalSolution';
import AnalyticPlatform from './partial/AnalyticPlatform';
import IoTPlatform from './partial/IoTPlatform';

class Home extends Component {
  render() {
    return (
      <div>
        <Hero />
        <TopFeature />
        <DigitalModernization />
        <LegacyModernization />
        <BuildYourOwnPlatform />
        <MicroservicesFoundationKit />
        <IndustryDigitalSolution />
        <AnalyticPlatform />
        <IoTPlatform />
      </div>
    );
  }
}

export default Home;