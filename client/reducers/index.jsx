import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import location from './reducerLocation';
import posts from './reducerPosts';
import comments from './reducerComments';

const rootReducer = combineReducers({
  location, 
  posts, 
  comments, 
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;