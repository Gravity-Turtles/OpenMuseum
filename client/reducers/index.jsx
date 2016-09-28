import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import cityName from './reducerCityName';
import location from './reducerLocation';
import posts from './reducerPosts';
import comments from './reducerComments';

const rootReducer = combineReducers({
  cityName,
  location, 
  posts, 
  comments, 
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;