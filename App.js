import React from 'react';
import _ from 'lodash';
import RootNavigator from './src/screens/navigator'
import { addNavigationHelpers } from "react-navigation";
import { connect, Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';
import { updateSchedule } from './src/redux/actions/actions'
// import firebase from 'react-native-firebase';
process.nextTick = setImmediate
const store = configureStore()

const AppWithNavigationState = connect(state => {
  return {
    nav: state.nav,
  }
})(({ dispatch, nav }) => (
  <RootNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

class App extends React.Component {
  // constructor() {
  //   super();
  //   // this.ref = firebase.firestore().collection('gamesSchedule')
  //   // this.unsubscribe = null;
  // }
  // componentDidMount() {
  //   this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
  // }
  // onCollectionUpdate = (querySnapshot) => {
  //   let games = []
  //   querySnapshot.forEach((doc) => {
  //     let game = doc.data()
  //     games.push(game)
  //   })
  //   store.dispatch(updateSchedule(games))
  // }
  render() {
    return (
      <Provider store={store}>
          <AppWithNavigationState />
      </Provider>
    );
  }
}
export default App;

// let games =  _.cloneDeep(this.props.gameSchedule)
  //     querySnapshot.docChanges.forEach((doc) => {
  //         let index = _.findIndex(games, (game) => { return game.match == doc.doc.data().match });
  //         (index == -1) ? games.push(doc.doc.data()) :
  //           games[index] = doc.doc.data()
    // addData() {
    //   this.ref.add({
    //     team2: 'D2',
    //     team1: 'D1',
    //     match: 7,
    //     group: 'D',
    //     date: 'June 16 2018 16:00',
    //     stadium: 'Spartak(Moscow)',
    //     score: {
    //       team2: 0,
    //       team1: 0
    //     }
    //   });
    // }