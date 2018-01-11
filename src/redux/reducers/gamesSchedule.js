
import {UPDATE_Schedule} from '../actions/constant';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_Schedule:
    return{
      gameSchedule:action.games
    };
    break;
 
    default:
    return state || {
        gameSchedule:[],
      }
  }
}