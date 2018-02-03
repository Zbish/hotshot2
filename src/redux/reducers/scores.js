import {UPDATE_bets} from '../actions/constant';
export default (state, action) => {
  switch (action.type) {
    case UPDATE_bets:
    return{
      bets:action.bets
    };
    break;
    default:
    return state || {
      }
  }
}