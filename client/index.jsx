import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import ReduxPromise from 'redux-promise';

import { Router, browserHistory } from 'react-router';
import reducers from './reducers/index';
import Routes from './routes';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}> 
    <Router history={browserHistory} routes={Routes} />
  </Provider>,
  document.querySelector('#app')
);
