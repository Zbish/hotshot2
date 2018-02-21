import {signIn,loading,SET_USER_UID} from '../actions/constant'

export default (state, action) => {
  switch (action.type) {
    case signIn:
    return{
      ...state,
      user:action.val
    };
    break;
    case SET_USER_UID:
    return{
      ...state,
      userUid:action.val
    };
    break;
    default:
    return state || {
        user:false,
        userUid:''
      }
  }
}