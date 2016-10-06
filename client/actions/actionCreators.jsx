// get location
import axios from 'axios';
import request from 'superagent';
import { browserHistory } from 'react-router';

export function fetchPosts(loc) {
  console.log("inside ActionCreater fetchPosts", loc);
  const request = axios.post('/api/findArt', loc);

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
      }
      else  {
        console.log("address not found");
      }
      dispatch({type: 'GET_CITYNAME', cityName: city})
    }).catch(console.log("no DATA at getCityName"));
  }    
}

export function editArt(object){
  console.log("in editArt action with this object: ", object)


  // const request = axios.put('/api/art', object, {headers: {
  //   authorization: localStorage.getItem('token') }}
  //   );
    const newName = object.newName || 'undefined';
    const newDescription = object.newDescription || 'undefined';
    const oldId = object.oldArt._id;

    var req = request.put('../api/art')
      .set({headers: {
      authorization: localStorage.getItem('token') }});

      console.log("object to be sent: ", object)

    if(object.images){
      object.images.forEach((image)=> {
      req.attach(image[0].name, image[0]);
    });
    }

      req
    .field('newName', newName)
    .field('newDescription', newDescription)
    .field('oldId', oldId)
    .end(function(err,res){
      if(err) console.log(err)
        else console.log(res)
    })


  return (dispatch) => {
    req.then(({data}) => {
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

  var req = request.post('api/art')
    .set({headers: {
    authorization: localStorage.getItem('token') }});

  if(props.files){
    props.files.forEach((file)=> {
        req.attach(file[0].name, file[0]);
    });
  }

  req    
    .field('title', title)
    .field('categories', categories)
    .field('description', description)
    .end(function(err,res){
      if(err) console.log(err)
        else console.log(res)
    })
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
      console.log('response2')
      console.log(response);
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

export function editLikes(object){
  console.log("in editLikes action with this object: ", object)

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