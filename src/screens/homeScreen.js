import React, { Component } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native'
import Game from '../components/Game';
import { connect } from 'react-redux'
import firebase from 'react-native-firebase';
import _ from 'lodash';
import { updateSchedule } from '../redux/actions/actions'

class homeScreen extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('gamesSchedule')
        this.unsubscribe = null;
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)
    }
    onCollectionUpdate = (querySnapshot) => {
        let games =  _.cloneDeep(this.props.gameSchedule)
        querySnapshot.docChanges.forEach((doc) => {
            let index = _.findIndex(games, (game) => { return game.match == doc.doc.data().match });
            (index == -1) ? games.push(doc.doc.data()) :
              games[index] = doc.doc.data()
        })
        this.props.updateSchedule(games)
    }

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
    render() {
        console.log('state', this.props)
        const games = this.props.gameSchedule
        return (
            <View style={styles.container}>
                <FlatList
                    data={games}
                    extraData={games}
                    renderItem={({ item }) => <Game item={item} />}
                    keyExtractor={(item, index) => index}
                />
                {/* <Button title={'add'} onPress={() => this.addData()}></Button> */}
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

function mapStateToProps(state) {
    return {
        gameSchedule: state.gamesSchedule.gameSchedule
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSchedule: (games) => dispatch(updateSchedule(games))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(homeScreen)