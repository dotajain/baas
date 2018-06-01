import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import promise from "redux-promise-middleware"
import { createLogger } from "redux-logger"

import rootReducer from './reducers';
// import { saveState, loadState } from './helpers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(promise(), thunk, createLogger())
  ),
);

store.subscribe(throttle(() => store.getState(), 1000));
