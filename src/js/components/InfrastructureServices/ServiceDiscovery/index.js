import React, { Component } from 'react';
// import _ from 'lodash';
// import { connect } from "react-redux";
// import { urls } from '../../../redux/constants';

// custom Component
import Hero from './partial/Hero';

// import Util from '../../../shared/Util';

// @connect((store) => {
//   console.log(store);
//   return {
//     data: store,
//     err: store.sendEmail.err.error,
//     fetching: store.sendEmail.fetching
//   };
// })

class ServiceDiscovery extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  
  render() {
    return (
      <div>
        <Hero />
      </div>
    );
  }
}

export default ServiceDiscovery;