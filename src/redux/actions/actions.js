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
    createFirebaseCredential,
    isLogged,
    signOut
} from '../../firebaseActions'
import _ from 'lodash';

const initialApp = (uid, dispatch) => {
        // get schedule collection
        const schedule = getSchedule().then((games) => {
            return games
        })
        // get my leagues collection
        const leagues = getLeagues(uid).then((leagues) => {
            return leagues
        })
       return Promise.all([schedule, leagues]).then((data) => {
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
            return
        });
    
}
export const user = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        isLogged().then((user) => {
            if (user) {
                initialApp(user.uid,dispatch).then(()=>{
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


export const createUser = (email, password,name) => (dispatch) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(email, password,name).then((user) => {
            if (user) {
                initialApp(user.uid,dispatch).then(()=>{
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
                initialApp(user.uid,dispatch).then(()=>{
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
                initialApp(user.uid,dispatch).then(()=>{
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
        signOut().then(()=>{
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