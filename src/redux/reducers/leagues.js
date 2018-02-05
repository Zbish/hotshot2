import { initialLeagues, SET_CURRENT_LEAGUE, SET_LEAGUE_GAMES } from '../actions/constant'

export default (state, action) => {
  switch (action.type) {
    case SET_LEAGUE_GAMES:
      return {
        ...action.leaguesWithGames
      }
      break;
    case initialLeagues:
      return {
        ...state,
        myLeagues: action.leagues
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