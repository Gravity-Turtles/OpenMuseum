import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import authReducer from './reducerAuth';

import geoFromSearch from './reducerGeoFromSearch';
import geoFromImage from './reducerGeoFromImage';
import cityName from './reducerCityName';
import loc from './reducerLocation';
import posts from './reducerPosts';
import postsCurrent from './reducerPostsCurrent';
import searchTerm from './reducerSearchTerm';
import themeTerm from './reducerThemeTerm';
import comments from './reducerComments';

const rootReducer = combineReducers({
  form,
  geoFromImage,
  geoFromSearch,
  searchTerm,
  themeTerm,
  cityName,
  loc, 
  posts,
  postsCurrent,
  comments, 
  auth: authReducer,
  routing: routerReducer});

export default rootReducer;


