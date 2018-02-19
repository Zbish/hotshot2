import {
    initial_Schedule,
    initial_bets,
    initial_LEAGUE_GAMES,
    initial_Ranks,
    UPDATE_bets,
    UPDATE_League,
    UPDATE_Schedule,
    UPDATE_LEAGUE_GAMES,
    UPDATE_rank,
    signIn,
    ADD_LEAGUE,
    SET_CURRENT_LEAGUE,
    NEW_LEAGUE_NAME,
    NEW_LEAGUE_STATUS,
    NEW_LEAGUE_PLAYERS
} from './constant';
import {
    getSchedule,
    getLeagues,
    signOut,
    getbets,
    addNewLeagueToFirebase
} from '../../firebaseActions'
import _ from 'lodash'
import {
    getLeagueGames,
    getGames,
    getLeagueRankList,
    updateLeaguesGames,
    changeLeaderBoard
} from '../../utils'
import { NavigationActions } from 'react-navigation'


const callBackScedule = (changeGame, dispatch, getState) => {
    const myState = _.cloneDeep(getState())
    const schedule = myState.gamesSchedule.gameSchedule
    const scores = myState.scores
    const ranks = myState.ranks
    const leagues = myState.leagues
    const index = _.findIndex(schedule, (g) => { return g.id === changeGame.id; })
    const oldGame = schedule[index]
    dispatch({
        type: UPDATE_Schedule,
        game: { index: index, value: changeGame }
    })
    if (leagues.myLeagues && leagues.myLeagues.length) {
        const newLeagues = updateLeaguesGames(leagues, changeGame)
        dispatch({
            type: UPDATE_LEAGUE_GAMES,
            newLeagues
        })
    }
    if (changeGame.status != "panding") {
        const newRanks = changeLeaderBoard(scores, changeGame, oldGame, ranks)
        dispatch({
            type: UPDATE_rank,
            ranks: newRanks
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
    const myState = _.cloneDeep(getState())
    const schedule = myState.gamesSchedule.gameSchedule
    let leagues = myState.leagues
    league = getGames(league, schedule)
    const bool = _.findIndex(leagues.myLeagues, { id: league.id })
    if (bool == -1) {
        getbets(league.id, (bets, gameid) => callBackBets(bets, dispatch, league.id, gameid)).then((bets) => {
            dispatch({
                type: ADD_LEAGUE,
                league
            })
            dispatch({
                type: initial_bets,
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
            .then((Schedule) => {
                dispatch({
                    type: initial_Schedule,
                    Schedule
                })
                getLeagues(uid, (item) => callBackLeague(item, dispatch, getState))
                    .then((leagues) => {
                        const leaguesWithGames = getLeagueGames(leagues, Schedule)
                        dispatch({
                            type: initial_LEAGUE_GAMES,
                            leaguesWithGames
                        })
                        _.forEach(leagues, (league) => {
                            getbets(league.id, (bets, gameid) => callBackBets(bets, dispatch, league.id, gameid))
                                .then((bets) => {
                                    dispatch({
                                        type: initial_bets,
                                        bets: { [league.id]: bets }
                                    })
                                    const ranks = getLeagueRankList(bets, Schedule, league.players)
                                    dispatch({
                                        type: initial_Ranks,
                                        ranks: { [league.id]: ranks }
                                    })
                                })
                        })
                        resolve('inilized')
                    })
            })
    })
}

export const setCurrentLeague = (current) => {
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

export const newLeagueName = (name) => {
    return {
        type: NEW_LEAGUE_NAME,
        val: name
    };
}
export const newLeagueStatus = (status) => {
    return {
        type: NEW_LEAGUE_STATUS,
        val: status
    };
}
export const newPlayersList = (player, uid) => {
    return {
        type: NEW_LEAGUE_PLAYERS,
        newPlayer: { uid: uid, player: player }
    };
}

export const addNewLeague = (league) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        const myState = _.cloneDeep(getState())
        const schedule = myState.gamesSchedule.gameSchedule
        const games = {}
        _.forEach(schedule, (game) => {
            games[game.id]={uid:true}
        })
        league.games = games
        addNewLeagueToFirebase(league).then(()=>{
            resolve('ok')
        })
    })
  }