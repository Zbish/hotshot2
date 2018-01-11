import React, { Component } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native'
import Game from '../components/Game';
import Games from'../components/Games';
import { connect } from 'react-redux'
import _ from 'lodash';
import { updateSchedule } from '../redux/actions/actions'

class homeScreen extends Component {
    render() {
        console.log('state', this.props)
        const games = this.props.gameSchedule
        return (
            <View style={styles.container}>
                <Games games={games}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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