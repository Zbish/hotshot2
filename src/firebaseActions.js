import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { SET_LEAGUE_GAMES, UPDATE_bets } from '../src/redux/actions/constant'

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

export const createUserWithEmailAndPassword = (email, password, name) => {
    return new Promise((resolve, reject) => {
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
                user.updateProfile({
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(function () {
                    console.log('update sababba')
                }).catch(function (error) {
                    console.log('update bad')
                });
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

export const getSchedule = (dispatch, action, callBack) => {
    const refSchedule = ref.collection('gamesSchedule')
    refSchedule.onSnapshot((snap) => {
        let games = []
        snap.forEach((doc) => {
            let game = doc.data()
            games.push(game)
        })
        callBack(games)
    })
}

export const getLeagues = (uid, dispatch, callback) => {
    return new Promise((resolve, reject) => {
        const refMyLeague = ref.collection('league').where("players." + uid + ".uid", "==", true)
        refMyLeague.onSnapshot((snap) => {
            let leagues = []
            snap.docChanges.forEach((doc) => {
                let league = doc.doc.data()
                leagues.push(league)
                console.log('league', doc.doc.data())
            })
            resolve(leagues)
        })
    })
}

export const getbets = (leagueUid, dispatch, refto) => {
    return new Promise((resolve, reject) => {
        const refMyLeague = refto.collection('league').doc(leagueUid).collection('bets')
        refMyLeague.onSnapshot((snap) => {
            let bets = {}
            snap.docChanges.forEach((doc) => {
                // bets.push(doc.doc.data())
                const game = doc.doc.data()
                bets[[game.gameid]] = game
            })
            console.log('bets', bets)
            dispatch({
                type: UPDATE_bets,
                bets: { [leagueUid]: bets }
            })

            resolve(bets)
        })
    })
}

export const chengeUserBet = () => {
    try {
        const userUid = 'ms6eNHUwK2Vq1gVCaPebEll4dT82'
        const gameUid = 'Uku2IaP0yxb8YdDh9dov'
        const leagueUid = "8uBTS2dlemmLE085K1aR"
        const newScore = 11
        const path = 'games.' + gameUid + '.bets.' + userUid + '.team2'
        const path2 = 'games.' + gameUid + '.bets.' + userUid + '.team1'
        const newBet = {
            [path]: 0,
            [path2]: 0
        }
        ref.collection('league').doc(leagueUid).update(newBet)
            .then(function (note) {
                console.log("Document successfully updated!", note);
            });
    } catch (error) {
        console.log('error', error)
    }

}

