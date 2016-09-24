export default function(state = "loading", action) {
  switch(action.type) {
    case "GET_CITYNAME" :
      console.log("Got the CITY NAME DATA");
      return action.cityName;
    default:
      return state;
  }
}


