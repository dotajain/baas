import React from 'react';

import javaIcon from '../../../../assets/images/java_icon.png';
import azureIcon from '../../../../assets/images/azure_icon.png';
import dockerIcon from '../../../../assets/images/docker.png';
import cfIcon from '../../../../assets/images/cf_icon.png';
import synbaasLogo from '../../../../assets/images/synbaas_logo.png';
import nodejsLogo from '../../../../assets/images/nodejs-logo.png';

const DeveloperTools = () => (
  <section className="section" id="devTools">
    <div className="container">
      <h2 className="title">Deveoper Tools</h2>
      <p>To run the Email notification microservice you need to make sure having these developer tools installed to feel the better perfornamce.</p>
      <div className="devToolsLogos">
        <a href="https://java.com/download" target="_blank"><img src={javaIcon} alt="JAVA" /></a>
        <a href="https://nodejs.org/en/" target="_blank"><img src={nodejsLogo} alt="node" /></a>
        <a href="/" target="_blank" className="logo-synbaas"><img src={synbaasLogo} alt="SynBaaS" /></a>
        <a href="https://azure.microsoft.com/" target="_blank" className="logo-azure"><img src={azureIcon} alt="Azure" /></a>
        <a href="https://www.docker.com/" target="_blank"><img src={dockerIcon} alt="Docker" /></a>
        <a href="https://www.cloudfoundry.org/" target="_blank"><img src={cfIcon} alt="Cloud Foundry" /></a>
      </div>
    </div>
  </section>
);

export default DeveloperTools;