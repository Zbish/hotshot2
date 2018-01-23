import {
    UPDATE_Schedule,
    signIn,
    initialLeagues,
    loading,
    SET_CURRENT_LEAGUE
} from './constant';
import {
    getSchedule,
    getLeagues,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    facebook
} from '../../firebaseActions'
import _ from 'lodash';

const initialApp = (uid, dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: signIn,
            val: true
        })
        // get schedule collection
        const schedule = getSchedule().then((games) => {
            return games
        })
        // get my leagues collection
        const leagues = getLeagues(uid).then((leagues) => {
            return leagues
        })
        Promise.all([schedule, leagues]).then((data) => {
            const games = data[0]
            const leagues = data[1]

            dispatch({
                type: initialLeagues,
                leagues
            })

            dispatch({
                type: UPDATE_Schedule,
                games
            })
            // sign in ok
            resolve()
        });
    })
}

export const createUser = (email, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(email, password).then((user) => {
            initialApp(user.uid, dispatch).then(
                resolve()
            )
        })
    })
}

export const signInUser = (email, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(email, password).then((user) => {
            initialApp(user.uid, dispatch).then(
                resolve()
            )
        })
    })
}

export const facebookLogin = (uid) => (dispatch) => {
    return new Promise((resolve, reject) => {
            initialApp(uid, dispatch).then(
                resolve()
            )
    })
}

export const setCurrentLeague = (name,leagues) => {
    const current= _.find(leagues, { name: name })
    return {
      type: SET_CURRENT_LEAGUE,
         league:current
    };
  }