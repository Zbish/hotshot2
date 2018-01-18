import { UPDATE_Schedule, signIn, initialLeagues } from './constant';
import {
    getSchedule,
    getLeagues,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from '../../firebaseActions'

export function updateSchedule(games) {
    return {
        type: UPDATE_Schedule,
        games
    };
}

export const createUser = (email, password) => (dispatch) => {
    createUserWithEmailAndPassword(email, password).then((user) => {
        dispatch({
            type: signIn,
            val: true
        })
    })
}
export const signInUser = (email, password) => (dispatch) => {
    signInWithEmailAndPassword(email, password).then((user) => {
        // get schedule collection start
        getSchedule().then((games) => {
            dispatch({
                type: UPDATE_Schedule,
                games
            })
        })
        // get my leagues start
        getLeagues(user.uid).then((leagues) => {
            dispatch({
                type: initialLeagues,
                leagues
            })
        })
        // sign in ok
        dispatch({
            type: signIn,
            val: true
        })
    })
}
