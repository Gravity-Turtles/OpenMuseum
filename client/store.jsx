import { createStore, compose } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

import location from './data/location';
import posts from './data/posts';
import comments from './data/comments';

// create an object for the default data
const defaultState = {
  location,
  posts,
  comments
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;