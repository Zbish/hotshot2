import { ADD_LEAGUE, SET_CURRENT_LEAGUE, SET_LEAGUE_GAMES,CHANGE_League } from '../actions/constant'

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
      case CHANGE_League:
      return {
        ...state,
        myLeagues:action.myLeagues
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