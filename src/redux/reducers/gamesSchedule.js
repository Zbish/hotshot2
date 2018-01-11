
import {UPDATE_Schedule} from '../actions/constant';

export default (state, action) => {
  console.log('reducer' , action)
  switch (action.type) {
    case UPDATE_Schedule:
    return{
      ...state,
    };
    break;
 
    default:
    return state || {
        gameSchedule:['what'],
      }
  }
}