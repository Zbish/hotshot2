import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
// firebase refrance to firestore
this.ref = firebase.firestore()

// get data
const getUserData = (user) => {
    // get schedule collection
    const schedule = getSchedule().then((games) => {
        return games
    })
    // get my leagues collection
    const leagues = getLeagues(user.uid).then((leagues) => {
        return leagues
    })
    return Promise.all([schedule, leagues]).then((data) => {
        return data
    })
}

export const isLogged = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().onUserChanged((user) => {
            if (user) {
                resolve(user)
            } else {
                resolve()
            }
        });
    })
}

export const signOut = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(() => {
            resolve('ok')
        }).catch(function (error) {
            resolve('not-ok')
        });
    })
}

export const createUserWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                resolve(user)
            }).catch((error) => {
                const errorMessage = error.message;
                alert(error.message)
                resolve()
            });
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
            }).catch((error) => {
                const errorMessage = error.message;
                alert(error.message)
                resolve()
            });
        } catch (error) {
            console.log('error firebase', error)
        }
    })
}

export const createFirebaseCredential = (token) => {
    return new Promise((resolve, reject) => {
        try {
            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(token.accessToken)
            // login with credential
            const user = firebase.auth().signInWithCredential(credential)
            resolve(user)
        } catch (error) {
            console.log('error firebase', error)
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



