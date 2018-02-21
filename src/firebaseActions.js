import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk';

// firebase refrance to firestore
this.ref = firebase.firestore()

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

export const passWordReset = (email) => {
    console.log('reset', email)
    return new Promise((resolve, reject) => {
        firebase.auth().sendPasswordResetEmail(email).then((result) => {
            resolve({ status: 'approved' })
        }).catch(function (error) {
            resolve({ status: 'aborted' })
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

export const getSchedule = (callBack) => {
    return new Promise((resolve, reject) => {
        const refSchedule = ref.collection('gamesSchedule')
        refSchedule.onSnapshot((snap) => {
            let games = []
            snap.docChanges.forEach((change) => {
                let game = change.doc.data()
                games.push(game)

                if (change.type === "modified" || change.type === "removed") {
                    callBack(game)
                }
            })
            resolve(games)
        })
    })
}

export const getLeagues = (uid, callback) => {
    return new Promise((resolve, reject) => {
        const refMyLeague = ref.collection('league').where("players." + uid + ".uid", "==", true)
        refMyLeague.onSnapshot((snap) => {
            let leagues = []
            snap.docChanges.forEach((change) => {
                let league = change.doc.data()
                leagues.push(league)
                if (change.type === "modified" || change.type === "removed") {
                    callback(league)
                }
            })
            resolve(leagues)
        })
    })
}

export const getbets = (leagueUid, callback) => {
    return new Promise((resolve, reject) => {
        const refMyLeague = ref.collection('league').doc(leagueUid).collection('bets')
        refMyLeague.onSnapshot((snap) => {
            let bets = {}
            let callbackBets = {}
            snap.docChanges.forEach((change, key) => {
                const game = change.doc.data()
                bets[[change.doc.id]] = game
                if (change.type === "modified" || change.type === "removed") {
                    callback(bets, game.gameid)
                }
            })
            resolve(bets)
        })
    })
}

export const chengeUserBet = (userUid,gameUid,leagueUid,newScore,team) => {
    try {
        var updateBets = {};
        updateBets[`${userUid}.${team}`] = newScore;

        ref.collection('league').doc(leagueUid).collection('bets').doc(gameUid).update(updateBets)
            .then(function (note) {
                console.log("Document successfully updated!", note);
            });
    } catch (error) {
        console.log('error', error)
    }

}

export const searchPlayers = (value, proprty) => {
    return new Promise((resolve, reject) => {
        const refUsers = ref.collection('users').where(proprty, "==", value)
        refUsers.get().then(
            (snap) => {
                resolve(snap)
            }
        )
    })
}

export const addNewLeagueToFirebase = (league) => {
    return new Promise((resolve, reject) => {
        const refLeague = ref.collection('league')
        refLeague.add({
            ...league
        })
            .then(function (docRef) {
                const id = docRef.id
                refLeague.doc(id).update({
                    id: id
                })
                    .then(function () {
                        console.log("Document successfully updated!");
                        resolve('ok')
                    })
                    .catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    })
}