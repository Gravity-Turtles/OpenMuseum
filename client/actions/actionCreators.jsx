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

  // request
  //   .post('/api/art')
  //   // .field('title', '')
  //   // .field('user[email]', 'tobi@learnboost.com')
  //   .attach('image', props.files[0])
  //   .end(function(err,res){
  //     if(err) console.log(err)
  //       else console.log(res)
  //   

  var req = request.post('api/arts');

  props.files.forEach((file)=> {
    console.log('FOR EACH');
    console.log(file)
    console.log('super agent for Each');    
      req.attach(file.name, file);
  });

  console.log('request object');
  console.log(req)
  req
    .field('title', props.title)
    .field('categories', props.categories)
    .field('description', props.description)
    .end(function(){
      console.log('sent')
    })



// request.post('api/art')
// .field('title', props.title)
// .end(function(){
//   console.log('sent');
// })



}

