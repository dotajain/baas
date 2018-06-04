import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './js/redux/store';

import App from './js/App';

import registerServiceWorker from './registerServiceWorker';

export const Root = () => (
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>
);

render(<Root />, document.getElementById('root'));
registerServiceWorker();
