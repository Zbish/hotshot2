import { ADD_LEAGUE, UPDATE_LEAGUE_GAMES, SET_CURRENT_LEAGUE, SET_LEAGUE_GAMES, UPDATE_League } from '../actions/constant'

export default (state, action) => {
  switch (action.type) {
    case SET_LEAGUE_GAMES:
      return {
        myLeagues: [...action.leaguesWithGames]
      }
      break;
    case UPDATE_LEAGUE_GAMES:
      console.log('leagues', action)
      return {
        myLeagues: [...action.leaguesWithGames.myLeagues],
        currentLeague: action.leaguesWithGames.currentLeague
      }
      break;
    case ADD_LEAGUE:
      return {
        ...state,
        myLeagues: [...state.myLeagues, action.league]
      };
      break;
    case UPDATE_League:
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