// get location
import axios from 'axios';
import request from 'superagent';
//var request = require('superagent')
import { browserHistory } from 'react-router';

export function fetchPosts(loc, theme) {
  console.log("inside ActionCreater fetchPosts", loc, theme);
  const request = axios.post('/api/findArt', loc, theme);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("Post=======", data);
      dispatch({type: 'FETCH_POSTS', posts: data});
    }).catch(console.log("no DATA at fetchPosts"));
  }
}

export function fetchPostsFromSearch(loc) {
  console.log("inside ActionCreater fetchPostsFromSearch", loc);
  const request = axios.post('/api/findArt', loc);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("Post=======", data);
      dispatch({type: 'FETCH_POSTS', posts: data});
      dispatch({type: 'GET_GEO_SEARCH', geoFromSearch: loc});
      browserHistory.push('/postsfromsearch');
    }).catch(console.log("no DATA at fetchPostsFromSearch"));
  }
}


function getLocPromise() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export function getLocation() {
  let locPromise = getLocPromise();
  return (dispatch) => {
    locPromise.then((position) => {
      let loc = {};
      console.log("Location=======", position)
      loc.latitude  = position.coords.latitude;
      loc.longitude = position.coords.longitude;
      dispatch({type: 'GET_LOCATION', loc})
    }).catch(console.log("no DATA at getLocation"));
  }
}

export function getCityName(loc) {
  let GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc.latitude + '%2C' + loc.longitude + '&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
  let request = axios.get(GEOCODING);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("CITYNAME=======", data)
      let count, country, state, city;
      if (data.results[0]) {
        let address = data.results[0].formatted_address ;
        let value = address.split(",");

        count = value.length;
        country = value[count - 1];
        state = value[count - 2];
        city = value[count - 3].slice(1);
        console.log("city name is: " + city);
        dispatch({type: 'GET_CITYNAME', cityName: city})
      }
      else  {
        console.log("address not found");
      }
    }).catch(console.log("no DATA at getCityName"));
  }    
}

export function editArt(object){
  console.log("in actions with this object: ", object)

  const request = axios.put('/api/Art', object);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("Puuuuuuuuuuuuut response yo=======", data)
    }).catch(console.log("failed to edit Art"));
  }
}

export function createPost3(props) {
  console.log('createPost3!')  
  console.log(props)
  
  const title = props.title || 'undefined';
  const categories = props.categories || 'undefined';
  const description = props.description || 'undefined';
  const address = props.location || 'undefined';

  let GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
  let requestGeo = axios.get(GEOCODING);

  requestGeo.then(({data}) => {
    let geoFromSearch = {}
    console.log("GEO DATA FROM Search INSIDE CREATE POST3=======", data);
    if (data.results[0]) {
      console.log("HERE INSIDE DATA.RESULTS[0]")
      geoFromSearch.latitude = data.results[0].geometry.location.lat;
      geoFromSearch.longitude = data.results[0].geometry.location.lng;
      console.log("GEO INSIDE CREATE POST3=======", geoFromSearch);
    }
    else  {
      console.log("Geolocation data not found");
      geoFromSearch.latitude = 'undefined';
      geoFromSearch.longitude = 'undefined';
    }
    return geoFromSearch;
  })
  .then((geoFromSearch) => {
    console.log(geoFromSearch);
    var req = request.post('api/art')
    // .set({headers: {
    // authorization: localStorage.getItem('token') }});

    if(props.files){
      props.files.forEach((file)=> {
        req.attach(file[0].name, file[0]);
      });
    }

  req
    .field('title', title)
    .field('categories', categories)
    .field('description', description)
    .field('latitude', geoFromSearch.latitude)
    .field('longitude', geoFromSearch.longitude)
    .end(function(err,res){
      if(err) console.log(err)
        else console.log(res)
    });
  })
  .catch(console.log("fail to CREATE POST3"));
  
}


export function updateLocFromImage(loc) {

  console.log("updateLocFromImage called", loc);
  let GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + loc.lat + '%2C' + loc.lon + '&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
  let request = axios.get(GEOCODING);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("data", data);
      if (data && data.results[0]) {
        let address = data.results[0].formatted_address ;
        dispatch({type: 'GEO_FROM_IMAGE', payload: address});
      }
      else {
        console.log("address not found");
      }
    }).catch(console.log("no DATA at updateLocFromImage"));
  }    
}

////// ACTIONS FOR AUTH

export function signinUser({ email, password }) {
  console.log("here inside signInUser");
  return function(dispatch) {
    axios.post('api/signin', { email, password })
      .then(response => {
        dispatch({ type: 'AUTH_USER' });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(authError('Bad Sign in Info'));
      });
  }
}

export function signupUser({ name, email, password }) {
  return function(dispatch) {
    axios.post('api/signup', { name, email, password })
      .then(response => {
        dispatch({ type: 'AUTH_USER' });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/');
      })
      .catch(response => {
        console.log(response);
        dispatch(authError(response.error));
      });
  }
}

export function authError(error) {
   console.log("Here", error);
  return {
    type: 'AUTH_ERROR',
    payload: error
  };
}
export function clearError() {
   console.log("Here in clearError");
  return { type: 'CLEAR_ERROR' };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: 'UNAUTH_USER' };
}
