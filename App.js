import React from 'react';
import { StyleSheet, Platform, Image, Text, View,Button,FlatList } from 'react-native';
import _ from 'lodash';
import firebase from 'react-native-firebase';
import Game from './src/components/Game'

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

  render() {
    console.log('games' , this.state.gamesSchedule)
    const games  = this.state.gamesSchedule
    return (
      <View style={styles.container}>
        <FlatList
                          data={games}
                          extraData={this.state} 
                          renderItem={({ item }) => <Game item={item}/>}
                          keyExtractor={(item, index) => index}
                        />
        {/* <Button title={'add'} onPress={()=>this.addData()}></Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },

});
