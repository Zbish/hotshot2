import {
    UPDATE_Schedule,
    signIn,
    initialLeagues,
    loading,
    SET_CURRENT_LEAGUE,
    SET_LEAGUE_GAMES,
    UPDATE_bets
} from './constant';
import {
    getSchedule,
    getLeagues,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    createFirebaseCredential,
    isLogged,
    signOut,
    getbets
} from '../../firebaseActions'
import _ from 'lodash'
import {getLeagueGames} from '../../utils'

const initialLeagueGames = (stateLeagues,schedule) =>{
    let leagues = _.cloneDeep(stateLeagues)
    leagues.myLeagues = getLeagueGames(leagues.myLeagues,schedule)
    if(leagues.currentLeague){
          const id = leagues.currentLeague.id
          leagues.currentLeague = _.find(leagues.myLeagues, { id: id })
    }
    return leagues
}
const callBackScedule = (games, dispatch,getState) => {
    dispatch({
        type: UPDATE_Schedule,
        games
    })
    const leagues = getState().leagues
      const leaguesWithGames =  initialLeagueGames(leagues,games)
      if(leaguesWithGames.myLeagues && leaguesWithGames.myLeagues.length)
        {
            dispatch({
                type: SET_LEAGUE_GAMES,
                leaguesWithGames
            })
        }
}
const callBackBets = (bets, dispatch, leagueUid) => {
    console.log('bets', bets)
    dispatch({
        type: UPDATE_bets,
        bets: { [leagueUid]: bets }
    })
}

const callBackLeague = (leagues, dispatch,getState) => {
    _.forEach(leagues, (value, key) => {
        getbets(value.id, (item) => callBackBets(item, dispatch, value.id))
    })
    console.log('league', leagues)
    dispatch({
        type: initialLeagues,
        leagues
    })
}
export const initialApp = (uid) => (dispatch, getState) => {
    const schedule = getSchedule((item) => callBackScedule(item, dispatch,getState))
    const leagues = getLeagues(uid, (item) => callBackLeague(item, dispatch,getState))
    return Promise.all([schedule, leagues]).then((data) => {
        dispatch({
            type: signIn,
            val: true
        })
        return
    })
}
export const user = () => () => {
    return new Promise((resolve, reject) => {
        isLogged().then((user) => {
            if (user) {
                resolve(user)
            } else { resolve() }
        })
    })
}


export const createUser = (email, password, name) => () => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(email, password, name).then((user) => {
            if (user) {
                resolve(user)
            } else { resolve() }
        })
    })
}

export const signInUser = (email, password) => () => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(email, password).then((user) => {
            if (user) {
                resolve(user)
            } else { resolve() }
        })
    })
}

export const facebookLogin = (token) => () => {
    return new Promise((resolve, reject) => {
        createFirebaseCredential(token).then(user => {
            if (user) {
                resolve(user)
            } else { resolve() }
        })
    })
}



export const signOutFromFirebase = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: signIn,
            val: false
        })
        signOut().then(() => {
            resolve('ok')
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
// export const getLeagueGames = () => {

//     return {
//         type: SET_LEAGUE_GAMES,
//         league: games
//     };
// }
