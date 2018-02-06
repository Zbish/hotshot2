import { ADD_LEAGUE, SET_CURRENT_LEAGUE, SET_LEAGUE_GAMES, UPDATE_League } from '../actions/constant'

export default (state, action) => {
  switch (action.type) {
    case SET_LEAGUE_GAMES:
      return {
        ...action.leaguesWithGames
      }
      break;
    case ADD_LEAGUE:
      return {
        ...state,
        myLeagues:[...state.myLeagues,action.league] 
      };
      break;
      case  UPDATE_League:
      return {
       ...action.leagues
             };
      break;
    case SET_CURRENT_LEAGUE:
      return {
        ...state,
        currentLeague: action.league
      }
      break;
    default:
      return state || {
        myLeagues: [],
      }
  }
}