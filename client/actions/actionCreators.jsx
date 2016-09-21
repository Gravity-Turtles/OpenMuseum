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

// export function getLocation() {
//   const location = {};
//   navigator.geolocation.getCurrentPosition(success, error);
//   function success(position) {
//     location.latitude  = position.coords.latitude;
//     location.longitude = position.coords.longitude;
//     console.log(location.latitude, location.longitude);
//   };

//   function error() {
//     console.log("Unable to retrieve your location");
//   };
//   return {
//     type: 'GET_LOCATION',
//     location
//   }
// }

// export function getLocation() {
//   let gotLoc = false;
//   const location = {};
//   navigator.geolocation.getCurrentPosition(success, error);
//   function success(position) {
//     location.latitude  = position.coords.latitude;
//     location.longitude = position.coords.longitude;
//     console.log(location.latitude, location.longitude);
//     gotLoc = true;
//   };

//   function error() {
//     console.log("Unable to retrieve your location");
//   };

//   while(true) {
//     if(gotLoc) {
//       return {
//         type: 'GET_LOCATION',
//         location: location
//       }
//     }
//   }
// }