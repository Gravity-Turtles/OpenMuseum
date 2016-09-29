// get Location
import axios from 'axios';
import request from 'superagent';
//var request = require('superagent')
import { browserHistory } from 'react-router';

export function fetchPosts(location) {
  console.log("inside ActionCreater fetchPosts", location);
  const request = axios.post('/api/findArt', location);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("Post=======", data);
      dispatch({type: 'FETCH_POSTS', posts: data});
    }).catch(console.log("no DATA at fetchPosts"));
  }
}

export function fetchPostsFromSearch(location) {
  console.log("inside ActionCreater fetchPostsFromSearch", location);
  const request = axios.post('/api/findArt', location);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("Post=======", data);
      dispatch({type: 'FETCH_POSTS', posts: data});
      dispatch({type: 'GET_GEO_SEARCH', geoFromSearch: location});
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
  let loc = getLocPromise();
  return (dispatch) => {
    loc.then((position) => {
      let location = {};
      console.log("Location=======", position)
      location.latitude  = position.coords.latitude;
      location.longitude = position.coords.longitude;
      dispatch({type: 'GET_LOCATION', location})
    }).catch(console.log("no DATA at getLocation"));
  }
}

export function getCityName(location) {
  let GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + '%2C' + location.longitude + '&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
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
  console.log("in actions with this object: ", object)

  const request = axios.put('/api/Art', object);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("Puuuuuuuuuuuuut response yo=======", data)
    }).catch(console.log("no DATA at fetchPosts"));
  }
}

export function createPost3(props) {
  console.log('createPost3!')  
  console.log(props)
  
  const title = props.title || 'undefined';
  const categories = props.categories || 'undefined';
  const description = props.description || 'undefined';

  var req = request.post('api/art');

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

