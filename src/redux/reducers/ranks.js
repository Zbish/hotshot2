import {initial_Ranks} from '../actions/constant';
export default (state, action) => {
    switch (action.type) {
      case initial_Ranks:
      return{
        ...state,
      };
      break;
      default:
      return state || {
          ranks:{}
        }
    }
  }