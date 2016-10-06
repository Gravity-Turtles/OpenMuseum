import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

// import the root reducer
import rootReducer from './reducers/index';


const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({type: 'AUTH_USER'});
}


export const history = syncHistoryWithStore(browserHistory, store);

export default store;