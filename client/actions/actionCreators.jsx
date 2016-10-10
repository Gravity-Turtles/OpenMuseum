// get location
import axios from 'axios';
import request from 'superagent';
import { browserHistory } from 'react-router';
import store from '../store';

export function fetchPosts(loc, theme) {
  if (theme) {
    let term;
    loc.theme = theme;

    if (theme === "StreetArt") {
      term = "Street Art";
    } else if (theme === "Architecture") {
      term = "Architecture & Signs";
    } else if (theme === "Historic") {
      term = "Historic Places";
    } else if (theme === "Mosaic") {
      term = "Mosaics";
    } else {
      term = theme;
    }
    store.dispatch({type: 'THEME_TERM', payload: term});
  }  
  const request = axios.post('/api/findArt', loc);

  return (dispatch) => {
    request.then(({data}) => {      
      dispatch({type: 'FETCH_POSTS_CURRENT', posts: data});
      dispatch({type: 'FETCH_POSTS', posts: data});
      loc.theme = ""; // reset loc.theme
    }).catch(() => {
      console.log("no DATA at fetchPosts");
    });
  }
}

export function fetchPostsFromSearch(loc) {  
  const request = axios.post('/api/findArt', loc);

  return (dispatch) => {
    request.then(({data}) => {      
      dispatch({type: 'FETCH_POSTS_CURRENT', posts: data});
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
      let count, country, state, city;
      if (data.results[0]) {
        let address = data.results[0].formatted_address ;
        let value = address.split(",");

        count = value.length;
        country = value[count - 1];
        state = value[count - 2];
        city = value[count - 3].slice(1);        
        dispatch({type: 'GET_CITYNAME', cityName: city})
      }
      else  {
        console.log("address not found");
      }
    }).catch(console.log("no DATA at getCityName"));
  }    
}

export function editArt(object){  
  // const request = axios.put('/api/art', object, {headers: {
  //   authorization: localStorage.getItem('token') }}
  //   );
    const newName = object.newName || 'undefined';
    const newDescription = object.newDescription || 'undefined';
    const oldId = object.oldArt._id;
    const newArtist = object.newArtist || 'Unknown';

    var req = request.put('../api/art')
      .set({headers: {
      authorization: localStorage.getItem('token') }});      

    if(object.images){
      object.images.forEach((image)=> {
      req.attach(image[0].name, image[0]);
    });
    }

    req
    .field('newName', newName)
    .field('newDescription', newDescription)
    .field('oldId', oldId)
    .field('newArtist', newArtist)
    .end(function(err,res){
      if(err) console.log(err)
        else console.log(res)
    })
  return (dispatch) => {
    req.then(({data}) => {      
    }).catch(console.log("failed to edit Art"));
  }
}

export function createPost3(props) {  
  const categories = [];
  for (var key in props) {
    if (props[key] === true) {
      categories.push(key);
    }
  }
  
  const title = props.title || 'undefined';
  const description = props.description || 'undefined';
  const address = props.location || 'undefined';
  const artist = props.artist || 'undefined';

  let GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
  let requestGeo = axios.get(GEOCODING);

  requestGeo.then(({data}) => {
    let geoFromSearch = {}    
    if (data.results[0]) {      
      geoFromSearch.latitude = data.results[0].geometry.location.lat;
      geoFromSearch.longitude = data.results[0].geometry.location.lng;      
    }
    else  {
      console.log("Geolocation data not found");
      geoFromSearch.latitude = 'undefined';
      geoFromSearch.longitude = 'undefined';
    }
    return geoFromSearch;
  })
  .then((geoFromSearch) => {    
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
    .field('artist', artist)
    .end(function(err,res){
      if(err) console.log(err)
        else browserHistory.push('/posts')          
    });
  })
  .catch(console.log("fail to CREATE POST3"));
}

export function saveComment(comment,id) {
  return(dispatch) => {
    axios({
      method: 'post',
      url: '../api/comments',
      data: {
        comment: comment,
        id: id
      },
      headers:{
        authorization: localStorage.getItem('token') 
      }
    })
    .then(response => {
      dispatch({ 
        type: 'COMMENTS',
        payload: response
      })       
    })
    .catch(() => {
      dispatch(authError('Bad Sign in Info'));
    });
  };

}

export function getComments(id) {
  return (dispatch) => {
    axios.post('../api/commentsGet', {id})
      .then(response => {
      dispatch({ 
        type: 'COMMENTS',
        payload: response
      })       
    })
  }
}

export function updateLocFromImage(loc) {  
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
  return {
    type: 'AUTH_ERROR',
    payload: error
  };
}
export function clearError() {   
  return { type: 'CLEAR_ERROR' };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: 'UNAUTH_USER' };
}

export function editLikes(object){  
  const request = axios.put('/api/art/editLikes', object);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("Puuuuuuuuuuuuut for edit Likes data: ", data)
    }).catch(console.log("no DATA at fetchPosts"));
  }
}

export function facebookAuthReq(){
  console.log('in httpGet');

  return function(dispatch) {
    axios.get('api/auth/facebook')
      .then(response => {
        console.log('response.status === ', response.status);
        console.log('passed to FB >>> > > ', response.data);
        // dispatch({ type: 'AUTH_USER' });
        // localStorage.setItem('token', response.data.token);
        // browserHistory.push('/');
      })
      .catch(() => {
        dispatch(authError('Bad signin info'));
      });
  }
};