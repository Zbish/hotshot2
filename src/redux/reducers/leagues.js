import { ADD_LEAGUE, UPDATE_LEAGUE_GAMES, SET_CURRENT_LEAGUE, SET_LEAGUE_GAMES, UPDATE_League } from '../actions/constant'

export default (state, action) => {
  switch (action.type) {
    case SET_LEAGUE_GAMES:
      return {
        myLeagues: [...action.leaguesWithGames]
      }
      break;
    case UPDATE_LEAGUE_GAMES:
    const leaguesWithGames = action.newLeagues.myLeagues
    const current = action.newLeagues.currentLeague
    console.log('action' , action)
    console.log('current' , current)
      return {
        ...action.newLeagues
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
    console.log('state', state)
      return state || {
        myLeagues: [],
        currentLeague:{}
      }
  }
}