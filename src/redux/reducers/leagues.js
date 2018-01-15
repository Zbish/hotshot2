import {initialLeagues} from '../actions/constant'

export default (state, action) => {
  switch (action.type) {
    case initialLeagues:
    return{
        myLeagues:action.leagues
    };
    break;
    default:
    return state || {
        myLeagues:[],
      }
  }
}