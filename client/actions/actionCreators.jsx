// get Location
import axios from 'axios';

export function fetchPosts(location) {
  console.log("Here", location);
  const request = axios.post('/api/findArt', location);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("Post=======", data)
      dispatch({type: 'FETCH_POSTS', posts: data})
    }).catch(console.log("no DATA"));
  }
}

function getLocPromise() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export function getLocation() {
  const loc = getLocPromise();
  return (dispatch) => {
    loc.then((position) => {
      const location = {};
      console.log("Post=======", position)
      location.latitude  = position.coords.latitude;
      location.longitude = position.coords.longitude;
      dispatch({type: 'GET_LOCATION', location})
    }).catch(console.log("no DATA"));
  }
}

export function createPost(props){
  console.log('CREATE POSTS RUNNING');
  console.log(props)

  const request = axios.post('/api/art', props);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("TEST POSTED")
      dispatch({type: 'CREATE_POST', posts: data})
    }).catch(console.log("no DATA"));
  }

}


