import { UPDATE_Schedule, signIn } from './constant';
import firebase from 'react-native-firebase';

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
        console.log('user', user)
        dispatch({
            type: signIn,
            val: true
        })
    })
}
export const signInUser = (email, password) => (dispatch) => {
    
    firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {

        // get schedule collection start
        schedule = ref.collection('gamesSchedule')
        schedule.get().then((snap) => {
            let games = []
            snap.forEach((doc) => {
                let game = doc.data()
                games.push(game)
            })
            dispatch({
                type: UPDATE_Schedule,
                games
            })
        })
        // get schedule collection end
        
        // get my league start
        const uid = user.uid
        myLeague = ref.collection('league').where("players."+uid, "==", true)
        myLeague.get().then((snap) => {
            console.log('myleague' , snap)
        })
        // get my league end
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