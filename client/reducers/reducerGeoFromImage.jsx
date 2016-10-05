export default function(state = "", action) {
  switch(action.type) {
    case 'INIT_FROM_POST' :
      console.log("Got the INIT DATA FROM POST", action.payload);
      return action.payload;
    case 'GEO_FROM_IMAGE' :
      console.log("Got the address from Image", action.payload);
      return Object.assign(state, { location: action.payload });
    default:
      return state;
  }
}