import React, { Component } from 'react';
import {StyleSheet,View,Text} from 'react-native'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';
import _ from 'lodash';
import {updateSchedule} from '../redux/actions/actions'

class homeScreen extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('gamesSchedule')
        this.unsubscribe = null;
      }
    
    
      componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
        this.props.updateSchedule('games')
      }
    
      componentWillUnmount() {
        this.unsubscribe();
      }
      onCollectionUpdate = (querySnapshot) => {
        let games = []
        querySnapshot.docChanges.forEach((doc) => {
          let index = _.findIndex(games, (game) => { return game.match == doc.doc.data().match });
          (index == -1) ? games.push(doc.doc.data()) :
            games[index] = doc.doc.data()
        })
        console.log('gameshome' , games)
      }

  render() {
    console.log('state' , this.props)
    return (
      <View>
            <Text>
                i am homescreen
            </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   
  });

  function mapStateToProps (state) {
    return {
      game: state
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
        updateSchedule: (val) => dispatch(updateSchedule(val))
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(homeScreen)