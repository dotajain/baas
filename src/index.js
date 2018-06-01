import 'babel-polyfill';
import Offline from 'offline-plugin/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { store } from './js/redux/store'

import App from './js/App';

if (process.env.NODE_ENV === 'production') Offline.install();

export const Root = () => (
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>
);

if (!module.hot) {
  render(<Root />, document.querySelector('react'))
};