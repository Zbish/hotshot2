// // The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// const functions = require('firebase-functions');
// this.ref = functions.firestore

// // The Firebase Admin SDK to access the Firebase Realtime Database. 
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);

// exports.newbets = functions.firestore
//     .document('gamesSchedule/{leagueId}')
//     .onUpdate((event) => {
//         var newValue = event.data.data();
//         // const admin = require('firebase-admin');
//         // const refMyLeague = admin.firestore().collection('league')
//         // refMyLeague.onSnapshot((snap) => {
//         //     snap.forEach((doc) => {
//         //         console.log('league', doc.data())
//         //         const rebets = admin.firestore().collection('league').doc(doc.data().id).collection('bets')
//         //         rebets.onSnapshot((snap) => {
//         //             snap.forEach((doc) => {
//         //                 console.log('bets', doc.data())
//         //             })
//         //         })
//         //     })
//         // })
//         console.log('new', newValue)
//         return event.data.data()
    // });