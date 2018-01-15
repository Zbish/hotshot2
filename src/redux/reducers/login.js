import {signIn} from '../actions/constant'

export default (state, action) => {
  switch (action.type) {
    case signIn:
    return{
      user:true
    };
    break;
    default:
    return state || {
        user:false,
      }
  }
}