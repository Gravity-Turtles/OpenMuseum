// get Location
import axios from 'axios';

export function fetchPosts(location) {
  console.log("inside ActionCreater fetchPosts", location);
  const request = axios.post('/api/findArt', location);

  return (dispatch) => {
    request.then(({data}) => {
      console.log("Post=======", data)
      dispatch({type: 'FETCH_POSTS', posts: data})
    }).catch(console.log("no DATA at fetchPosts"));
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
      console.log("Location=======", position)
      location.latitude  = position.coords.latitude;
      location.longitude = position.coords.longitude;
      dispatch({type: 'GET_LOCATION', location})
    }).catch(console.log("no DATA at getLocation"));
  }
}

export function getCityName(location) {

  console.log("getCityNameCalled");
  const GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + '%2C' + location.longitude + '&key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
  const request = axios.get(GEOCODING);

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

