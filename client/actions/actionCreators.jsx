// get Location

export function getLocation(index) {
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