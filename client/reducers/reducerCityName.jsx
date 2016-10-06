export default function(state = ". . .", action) {
  switch(action.type) {
    case "GET_CITYNAME" :
      console.log("Got the CITY NAME DATA");
      return action.cityName;
    default:
      return state;
  }
}


