import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authReducer from './reducerAuth';

import geoFromSearch from './reducerGeoFromSearch';
import cityName from './reducerCityName';
import loc from './reducerLocation';
import posts from './reducerPosts';
import comments from './reducerComments';

const rootReducer = combineReducers({
  form,
  geoFromSearch,
  cityName,
  loc, 
  posts, 
  comments, 
  auth: authReducer,
  routing: routerReducer});

export default rootReducer;


