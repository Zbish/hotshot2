import { UPDATE_Schedule, signIn, initialLeagues } from './constant';
import firebase from 'react-native-firebase';
import { getSchedule, getLeagues, signInWithEmailAndPassword } from '../../firebaseActions'

// firebase refrance to firestore
this.ref = firebase.firestore()

export function updateSchedule(games) {
    return {
        type: UPDATE_Schedule,
        games
    };
}

export const createUser = (email, password) => (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
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


export const newIMage = () => (dispatch) => {
    addImage().then((image) => {
        if (image != undefined) {
            dispatch({
                type: LOADING,
                indicator: false
            })
            const vertical = (image.height > image.width) ? true : false
            getKeyWords(image.data).then((concepts) => {
                if (concepts.length > 0) {
                    const item = createItem(concepts, image.uri, vertical)
                    dispatch({
                        type: NEWIMAGE,
                        item: item
                    })
                }
                dispatch({
                    type: LOADING,
                    indicator: true
                })
            })
        }
    })
}