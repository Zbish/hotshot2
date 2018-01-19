import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
// firebase refrance to firestore
this.ref = firebase.firestore()

export const createUserWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                resolve(user)
            })
        } catch (error) {
            console.log('errorcreteuser')
        }
    })
}

export const signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
                resolve(user)
            })
        } catch (error) {
            console.log('error firebase')
        }
    })
}

export const getSchedule = () => {
    return new Promise((resolve, reject) => {
        let games = []
        const refSchedule = ref.collection('gamesSchedule')
        refSchedule.get().then((snap) => {
            snap.forEach((doc) => {
                let game = doc.data()
                games.push(game)
            })
            resolve(games)
        })
    })
}

export const getLeagues = (uid) => {
    return new Promise((resolve, reject) => {
        const refMyLeague = ref.collection('league').where("players." + uid, "==", true)
        refMyLeague.get().then((snap) => {
            let leagues = []
            snap.forEach((doc) => {
                let league = doc.data()
                leagues.push(league)
            })
            resolve(leagues)
        })
    })
}

// Calling the following function will open the FB login dialogue:
export const facebook = () => {
    return new Promise((resolve, reject) => {
        return LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (!result.isCancelled) {
                    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
                    // get the access token
                    return AccessToken.getCurrentAccessToken()
                }
            })
            .then(data => {
                if (data) {
                    // create a new firebase credential with the token
                    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                    // login with credential
                    return firebase.auth().signInWithCredential(credential)
                }
            })
            .then((currentUser) => {
                if (currentUser) {
                    resolve(currentUser.toJSON())
                }
            })
            .catch((error) => {
                console.log(`Login fail with error: ${error}`)
            })
    })
}