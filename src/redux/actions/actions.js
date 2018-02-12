import {
    initial_Schedule,
    signIn,
    ADD_LEAGUE,
    loading,
    SET_CURRENT_LEAGUE,
    SET_LEAGUE_GAMES,
    UPDATE_bets,
    GET_bets,
    UPDATE_League,
    UPDATE_Schedule,
    UPDATE_LEAGUE_GAMES,
    initial_Ranks,
    update_rank
} from './constant';
import {
    getSchedule,
    getLeagues,
    signOut,
    getbets
} from '../../firebaseActions'
import _ from 'lodash'
import { getLeagueGames, getGames, getLeagueRankList, compareScore } from '../../utils'
import { NavigationActions } from 'react-navigation'

const updateLeaguesGames = (leagues, changeGame) => {
    _.forEach(leagues.myLeagues, (league) => {
        const index = _.findIndex(league.allGames, (g) => { return g.id === changeGame.id; })
        if (index != -1) {
            league.allGames[index] = changeGame
        }
    })
    if (leagues.currentLeague) {
        const id = leagues.currentLeague.id
        currentLeague = _.find(leagues.myLeagues, { id: id })
    }
    return leagues
}

const callBackScedule = (changeGame, dispatch, getState) => {
    const schedule = _.cloneDeep(getState().gamesSchedule.gameSchedule)
    const scores = _.cloneDeep(getState().scores)
    const ranks = _.cloneDeep(getState().ranks)
    const indexOldGame = _.findIndex(schedule, function (pl) { return pl.id == changeGame.id; })
    const oldGame = schedule[indexOldGame]
    const index = _.findIndex(schedule, (g) => { return g.id === changeGame.id; })
    dispatch({
        type: UPDATE_Schedule,
        game: { index: index, value: changeGame }
    })
    const leagues = _.cloneDeep(getState().leagues)
    if (leagues.myLeagues && leagues.myLeagues.length) {
        const newLeagues = updateLeaguesGames(leagues, changeGame)
        dispatch({
            type: UPDATE_LEAGUE_GAMES,
            newLeagues
        })
    }
    if (changeGame.status === 'ended') {
        _.forIn(scores, (games, leagueid) => {
            _.forIn(games, (playerBets, gameid) => {
                if (changeGame.id === gameid) {
                    _.forIn(playerBets, (bet, playerUid) => {
                        const points = compareScore(changeGame.score, bet)
                        const pointsDawn = compareScore(oldGame.score, bet)
                        const index = _.findIndex(ranks[leagueid].rankEnded, function (pl) { return pl.uid == playerUid; })
                        if (index != -1) {
                            ranks[leagueid].rankEnded[index].points += points
                            if(oldGame.status === 'active'){
                                ranks[leagueid].rankActive[index].points -= pointsDawn
                            }
                        }
                    })
                    dispatch({
                        type: update_rank,
                        ranks: ranks
                    })
                }
            })
        })

    }
    else if (changeGame.status === "active") {
       
        _.forIn(scores, (games, leagueid) => {
            _.forIn(games, (playerBets, gameid) => {
                if (changeGame.id === gameid) {
                    _.forIn(playerBets, (bet, playerUid) => {
                        const pointsUp = compareScore(changeGame.score, bet)
                        const pointsDawn = compareScore(oldGame.score, bet)
                        const index = _.findIndex(ranks[leagueid].rankActive, function (pl) { return pl.uid == playerUid; })
                        if (index != -1) {
                            ranks[leagueid].rankActive[index].points += pointsUp
                            if (oldGame.status === 'active') {
                                ranks[leagueid].rankActive[index].points -= pointsDawn
                            }
                        }
                    })
                    dispatch({
                        type: update_rank,
                        ranks: ranks
                    })
                }
            })
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
                    type: initial_Schedule,
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
                                    const ranks = getLeagueRankList(bets, schedule)
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
