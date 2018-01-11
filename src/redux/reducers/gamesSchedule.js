// reducers/data.js
import {SEARCH} from '../actions/constant';

export default (state, action) => {
  switch (action.type) {
    case SEARCH:
    return{
      ...state,
    };
    break;
 
    default:
    return state || {
        gameSchedule:[],
      }
  }
}