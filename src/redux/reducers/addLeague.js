
import { NEW_LEAGUE_STATUS, NEW_LEAGUE_NAME, NEW_LEAGUE_PLAYERS } from '../actions/constant';

export default (state, action) => {
    switch (action.type) {
        case NEW_LEAGUE_NAME:
            return {
                newLeague: { ...state.newLeague, name: action.val }
            };
            break;
        case NEW_LEAGUE_STATUS:
            return {
                newLeague: { ...state.newLeague, status: action.val }
            };
            break;
        case NEW_LEAGUE_PLAYERS:
            return {
                newLeague: {
                    ...state.newLeague,
                    players: {
                        ...state.newLeague.players,
                        [action.newPlayer.uid]: action.newPlayer.player
                    }
                }
            };
            break;
        default:
            return state || {
                newLeague: {
                    name: '',
                    status: '',
                    players: {},
                },
            }
    }
}