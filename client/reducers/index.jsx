import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import geoFromAddress from './reducerGeoFromAddress';
import cityName from './reducerCityName';
import location from './reducerLocation';
import posts from './reducerPosts';
import comments from './reducerComments';

const rootReducer = combineReducers({
  geoFromAddress,
  cityName,
  location, 
  posts, 
  comments, 
  routing: routerReducer});

export default rootReducer;