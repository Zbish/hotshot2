import {
    UPDATE_Schedule,
    signIn,
    ADD_LEAGUE,
    loading,
    SET_CURRENT_LEAGUE,
    SET_LEAGUE_GAMES,
    UPDATE_bets,
    GET_bets,
    UPDATE_League,
    UPDATE_game,
    UPDATE_LEAGUE_GAMES
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

const updateLeagueGames = (leagues, changeGame) => {
    _.forEach(leagues.myLeagues, (league) => {
        const index = _.findIndex(league.allGames, (g)=> { return g.id === changeGame.id; })
        if(index != -1){
            league.allGames[index] = changeGame
        }
    })
    if (leagues.currentLeague) {
        const id = leagues.currentLeague.id
        leagues.currentLeague = _.find(leagues.myLeagues, { id: id })
    }
    return leagues
}

const callBackScedule = (changeGame, dispatch, getState) => {
    const schedule = _.cloneDeep(getState().gamesSchedule.gameSchedule)
    const index = _.findIndex(schedule, (g) => { return g.id === changeGame.id; })
    dispatch({
        type: UPDATE_game,
        game: { index: index, value: changeGame }
    })
    const leagues = getState().leagues
    if (leagues.myLeagues && leagues.myLeagues.length) {
        const leaguesWithGames = updateLeagueGames(leagues, changeGame)
        console.log('leagues' , leaguesWithGames)
        dispatch({
            type: UPDATE_LEAGUE_GAMES,
            leaguesWithGames
        })
    }
}
const callBackBets = (bets, dispatch, leagueUid, gameid) => {
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

export const initialApp = (uid) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        getSchedule((changeGame) => callBackScedule(changeGame, dispatch, getState))
            .then((newSchedule) => {
                dispatch({
                    type: UPDATE_Schedule,
                    newSchedule
                })
                getLeagues(uid, (item) => callBackLeague(item, dispatch, getState))
                    .then((leagues) => {
                        const schedule = _.cloneDeep(getState().gamesSchedule.gameSchedule)
                        const leaguesWithGames = getLeagueGames(leagues, schedule)
                        dispatch({
                            type: SET_LEAGUE_GAMES,
                            leaguesWithGames
                        })
                        _.forEach(leagues, (league) => {
                            getbets(league.id, (bets, gameid) => callBackBets(bets, dispatch, league.id, gameid))
                                .then((bets) => {
                                    dispatch({
                                        type: GET_bets,
                                        bets: { [league.id]: bets }
                                    })
                                })
                        })
                        resolve('inilized')
                    })
            })
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
export const resetAction = () => NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' })
    ]
})
