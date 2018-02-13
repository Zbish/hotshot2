import {UPDATE_bets,initial_bets} from '../actions/constant';
export default (state, action) => {
  switch (action.type) {
    case UPDATE_bets:
    const leagueuid = action.bets.leagueuid
    const gameid = action.bets.gameid
    const bets = action.bets.bets
    return {
      ...state,
      [leagueuid]:Object.assign({}, state[leagueuid],bets)
    }
    break;
    case initial_bets:
    return{
      ...state,
      ...action.bets
    };
    break;
    default:
    return state || {
      }
  }
}