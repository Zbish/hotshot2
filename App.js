import React from 'react';
import { StyleSheet, Platform, Image, Text, View,Button,FlatList } from 'react-native';
import _ from 'lodash';
import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
     gamesSchedule:[]
      
    };
    this.ref = firebase.firestore().collection('gamesSchedule')
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
}

componentWillUnmount() {
    this.unsubscribe();
}
onCollectionUpdate = (querySnapshot) => {
  querySnapshot.docChanges.forEach((doc) => {

    let games = this.state.gamesSchedule
    let index = _.findIndex(games,(game)=>{return game.match == doc.doc.data().match});
    (index == -1) ?  games.push(doc.doc.data()) : 
                     games[index] = doc.doc.data()
    this.setState({gamesSchedule:games})
  })
}

  addData(){
    this.ref.add({
      team2: 'D2',
      team1: 'D1',
      match: 7,
      group: 'D',
      date: 'June 16 2018 16:00',
      stadium: 'Spartak(Moscow)',
      score: {
        team2: 0,
        team1: 0
      }
    });
  }
  getData(){
    console.log('sagsua')
  }

  render() {
    console.log('we got data' , this.state.gamesSchedule)
    return (
      <View style={styles.container}>
        <Image source={require('./assets/RNFirebase512x512.png')} style={[styles.logo]} />
        <Button title={'add'} onPress={()=>this.addData()}></Button>
        <Button title={'get'} onPress={ ()=>this.getData()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
