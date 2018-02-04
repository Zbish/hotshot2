import {
    UPDATE_Schedule,
    signIn,
    initialLeagues,
    loading,
    SET_CURRENT_LEAGUE,
    SET_LEAGUE_GAMES
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
import _ from 'lodash';
import firebase from 'react-native-firebase'

this.firestore = firebase.firestore()

const callBackScedule = (games,dispatch) =>{
    dispatch({
        type: UPDATE_Schedule,
        games
    })
    dispatch({
        type: SET_LEAGUE_GAMES,
        games
    })
}

const initialApp = (uid, dispatch) => {
    // get schedule collection
    const leagues = getLeagues(uid,dispatch).then((leagues) => {
        _.forEach(leagues, (value, key) => {
            getbets(value.id,dispatch,this.firestore).then((bets)=>{
                console.log('beti' , bets)
            })
        })
        dispatch({
            type: initialLeagues,
            leagues
        })
        return leagues
    })
    getSchedule(dispatch,UPDATE_Schedule,(item)=>callBackScedule(item,dispatch))
   
    // get my leagues collection
 
    return Promise.all([leagues]).then((data) => {
        // sign in ok
        return
    });

}
export const user = () => (dispatch, getState) => {
    console.log('facebook ', getState())
    return new Promise((resolve, reject) => {
        isLogged().then((user) => {
            if (user) {
                initialApp(user.uid, dispatch).then(() => {
                    dispatch({
                        type: signIn,
                        val: true
                    })
                    resolve(user)
                })
            } else { resolve() }
        })
    })
}


export const createUser = (email, password, name) => (dispatch) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(email, password, name).then((user) => {
            if (user) {
                initialApp(user.uid, dispatch).then(() => {
                    dispatch({
                        type: signIn,
                        val: true
                    })
                    resolve(user)
                })
            } else { resolve() }
        })
    })
}

export const signInUser = (email, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(email, password).then((user) => {
            if (user) {
                initialApp(user.uid, dispatch).then(() => {
                    dispatch({
                        type: signIn,
                        val: true
                    })
                    resolve(user)
                })
            } else { resolve() }
        })
    })
}

export const facebookLogin = (token) => (dispatch) => {
   
    return new Promise((resolve, reject) => {
        createFirebaseCredential(token).then(user => {
            if (user) {
                initialApp(user.uid, dispatch).then(() => {
                    dispatch({
                        type: signIn,
                        val: true
                    })
                    resolve(user)
                })
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

export const changeBet = () => () => {

}

export const setCurrentLeague = (name, leagues) => {
    const current = _.find(leagues, { name: name })
    return {
        type: SET_CURRENT_LEAGUE,
        league: current
    };
}
export const getLeagueGames = () => {
   
    return {
        type: SET_LEAGUE_GAMES,
        league: games
    };
}
