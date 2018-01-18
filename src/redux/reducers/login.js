import {signIn,loading} from '../actions/constant'

export default (state, action) => {
  switch (action.type) {
    case signIn:
    return{
      ...state,
      user:action.val
    };
    break;
    case loading:
    return{
      ...state,
      loading:action.val
    };
    break;
    default:
    return state || {
        user:false,
        loading:false
      }
  }
}