import { UPDATE_Schedule, signIn, initialLeagues, loading } from './constant';
import {
    getSchedule,
    getLeagues,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    facebook
} from '../../firebaseActions'

const initialApp = (uid, dispatch) => {
    return new Promise((resolve, reject) => {
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
            dispatch({
                type: signIn,
                val: true
            })
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

export const facebookLogin = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        facebook().then((user) => {
            initialApp(user.uid, dispatch).then(
                resolve()
            )
        })
    })
}