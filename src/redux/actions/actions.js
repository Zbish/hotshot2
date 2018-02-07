import {
    UPDATE_Schedule,
    signIn,
    ADD_LEAGUE,
    loading,
    SET_CURRENT_LEAGUE,
    SET_LEAGUE_GAMES,
    UPDATE_bets,
    GET_bets,
    UPDATE_League
} from './constant';
import {
    getSchedule,
    getLeagues,
    signOut,
    getbets
} from '../../firebaseActions'
import _ from 'lodash'
import { getLeagueGames, getGames } from '../../utils'
import { NavigationActions } from 'react-navigation'

const initialLeagueGames = (stateLeagues, schedule) => {
    let leagues = _.cloneDeep(stateLeagues)
    leagues.myLeagues = getLeagueGames(leagues.myLeagues, schedule)
    if (leagues.currentLeague) {
        const id = leagues.currentLeague.id
        leagues.currentLeague = _.find(leagues.myLeagues, { id: id })
    }
    return leagues
}
const callBackScedule = (newSchedule, dispatch, getState) => {
    dispatch({
        type: UPDATE_Schedule,
        newSchedule
    })
    const leagues = getState().leagues
    if (leagues.myLeagues && leagues.myLeagues.length) {
        const leaguesWithGames = initialLeagueGames(leagues, newSchedule)
        dispatch({
            type: SET_LEAGUE_GAMES,
            leaguesWithGames
        })
    }
}
const callBackBets = (bets, dispatch, leagueUid, gameid) => {
    console.log('bets', bets)
    console.log('gameid', gameid)
    dispatch({
        type: UPDATE_bets,
        bets: { bets, leagueuid: leagueUid, gameid: gameid }
        // bets: { [leagueUid]:{[gameid]:bets}}
    })

}

const callBackLeague = (league, dispatch, getState) => {
    const schedule = _.cloneDeep(getState().gamesSchedule.gameSchedule)
    let leagues = _.cloneDeep(getState().leagues)
    league = getGames(league, schedule)
    const bool = _.findIndex(leagues.myLeagues, { id: league.id })
    if (bool == -1) {
        getbets(league.id, (bets, gameid) => callBackBets(bets, dispatch, league.id, gameid)).then((bets) => {
            dispatch({
                type: ADD_LEAGUE,
                league
            })
            dispatch({
                type: GET_bets,
                bets: { [league.id]: bets }
            })
        })
    } else {
        leagues.myLeagues[bool] = league
        if (leagues.currentLeague && leagues.currentLeague.id == league.id) {
            leagues.currentLeague = league
        }
        dispatch({
            type: UPDATE_League,
            leagues
        })
    }


}
export const resetAction = () => NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' })
    ]
})

export const initialApp = (uid) => (dispatch, getState) => {
    const schedule = getSchedule((item) => callBackScedule(item, dispatch, getState))
    const leagues = getLeagues(uid, (item) => callBackLeague(item, dispatch, getState))
    return Promise.all([schedule, leagues]).then((data) => {
        return
    })
}

export const setCurrentLeague = (name, leagues) => {
    const current = _.find(leagues, { name: name })
    return {
        type: SET_CURRENT_LEAGUE,
        league: current
    };
}

export const sign = () => {
    return {
        type: signIn,
        val: false
    };
}
// export const getLeagueGames = () => {

//     return {
//         type: SET_LEAGUE_GAMES,
//         league: games
//     };
// }
