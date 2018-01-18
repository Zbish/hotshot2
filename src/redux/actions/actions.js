import { UPDATE_Schedule, signIn, initialLeagues,loading } from './constant';
import {
    getSchedule,
    getLeagues,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    facebook
} from '../../firebaseActions'

const initialApp = (uid, dispatch) => {
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
        dispatch({
            type: loading,
            val:false
        })
    });

}

export const createUser = (email, password) => (dispatch) => {
    dispatch({
        type: loading,
        val:true
    })
    createUserWithEmailAndPassword(email, password).then((user) => {
        initialApp(user.uid, dispatch)
    })
}

export const signInUser = (email, password) => (dispatch) => {
    dispatch({
        type: loading,
        val:true
    })
    signInWithEmailAndPassword(email, password).then((user) => {
        initialApp(user.uid, dispatch)
    })
}

export const facebookLogin = () => (dispatch) => {
    dispatch({
        type: loading,
        val:true
    })
    facebook().then((user) => {
        initialApp(user.uid, dispatch)
    })
}