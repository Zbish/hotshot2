import { initialLeagues,SET_CURRENT_LEAGUE,SET_LEAGUE_GAMES } from '../actions/constant'
import {getLeagueGames} from '../../utils'

export default (state, action) => {
  switch (action.type) {
    case SET_LEAGUE_GAMES:
    const current = {}
    const leagues = getLeagueGames(state.myLeagues,action.games)
    if(state.currentLeague){
      const name = state.currentLeague.name
      current = _.find(leagues, { name: name })
      console.log(current)
    }else{
      current = {name:'not'}
      console.log(current)
    }
    return{
      ...state,
      myLeagues:leagues,
      currentLeague:current
    }
    case initialLeagues:
      return {
        ...state,
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