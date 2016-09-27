// get Location
import axios from 'axios';
import request from 'superagent';

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

export function createPost2(files){
  console.log('CREATE POSTS RUNNING');  

  var req = superAgent.post('api/art');
  files.forEach((file)=> {
      req.attach(file.name, file);
  });
  req.end(function(){
    console.log('sent')
  });
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
        req.attach(file.name, file);
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

