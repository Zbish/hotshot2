import { UPDATE_Schedule, signIn } from './constant';
import firebase from 'react-native-firebase';
this.ref = firebase.firestore().collection('league')
export function updateSchedule(games) {
    return {
        type: UPDATE_Schedule,
        games
    };
}

export const signMeIn = () =>(dispatch) =>{
    firebase.auth().createUserWithEmailAndPassword('omri6@gmail.com','yael0505').then((user)=>{
        this.ref.get().then((snap)=>{
            console.log('user', snap )
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
                if(concepts.length > 0)
                    {
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