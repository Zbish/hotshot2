import firebase from 'react-native-firebase'

export const getSchedule = () => {
    return new Promise((resolve, reject) => {
        let games = []
        let refSchedule = ref.collection('gamesSchedule')
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
        myLeague = ref.collection('league').where("players." + uid, "==", true)
        myLeague.get().then((snap) => {
            let leagues = []
            snap.forEach((doc) => {
                let league = doc.data()
                leagues.push(league)
            })
            resolve(leagues)
        })
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

