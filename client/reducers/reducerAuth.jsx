
export default function(state = {}, action) {
  switch(action.type) {
    case 'AUTH_USER':
      return Object.assign(state, { error: '', authenticated: true });
    case 'UNAUTH_USER':
      return Object.assign(state, { authenticated: false });
    case 'AUTH_ERROR':
      console.log('authError received in reducer', action.payload);
      return Object.assign(state, { error: action.payload });
    case 'CLEAR_ERROR':
      return Object.assign(state, { error: '' });
    // case FETCH_MESSAGE:
    //   return { ...state, message: action.payload };
  }

  return state;
}
