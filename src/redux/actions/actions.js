import { UPDATE_Schedule, signIn } from './constant';
import firebase from 'react-native-firebase';

this.schedule = firebase.firestore().collection('gamesSchedule')
// this.ref2 = firebase.firestore().collection('league').where("players."+player, "==", true)


export function updateSchedule(games) {
    return {
        type: UPDATE_Schedule,
        games
    };
}

export const createUser = (email, password) => (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
        console.log('user', user)
        dispatch({
            type: signIn,
            val: true
        })
    })
}
export const signInUser = (email, password) => (dispatch) => {
    let games = []
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        console.log('user', user)
        this.schedule.get().then((snap) => {
            snap.forEach((doc) => {
                let game = doc.data()
                games.push(game)
            })
            dispatch({
                type: UPDATE_Schedule,
                games
            })
        })
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