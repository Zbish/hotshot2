import {initial_Ranks,update_rank} from '../actions/constant';
export default (state, action) => {
    switch (action.type) {
      case initial_Ranks:
      return{
        ...state,
        ...action.ranks
      };
      break;
      case update_rank:
      return{
        ...action.ranks
      };
      break;
      default:
      return state || {
          ranks:{}
        }
    }
  }