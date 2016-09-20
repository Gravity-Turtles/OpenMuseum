// get Location

export function getLocation() {
  const location = {};
  navigator.geolocation.getCurrentPosition(success, error);
  function success(position) {
    location.latitude  = position.coords.latitude;
    location.longitude = position.coords.longitude;
    console.log(location.latitude, location.longitude);
  };

  function error() {
    console.log("Unable to retrieve your location");
  };
  return {
    type: 'GET_LOCATION',
    location
  }
}


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