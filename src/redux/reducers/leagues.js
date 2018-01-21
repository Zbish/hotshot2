import { initialLeagues,SET_CURRENT_LEAGUE } from '../actions/constant'

export default (state, action) => {
  switch (action.type) {
    case initialLeagues:
      return {
        myLeagues: action.leagues
      };
      break;
    case SET_CURRENT_LEAGUE:

      return {
        ...state,
        currentLeague:action.league
      }
      break;
    default:
      return state || {
        myLeagues: [],
      }
  }
}