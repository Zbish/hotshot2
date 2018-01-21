import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import Games from '../components/Games'
import { getLeagueGames } from '../utils'

class league extends Component {

    render() {
       const schedule =  this.props.gameSchedule
        const gamesNumbers = this.props.league.games
        const games = getLeagueGames(gamesNumbers,schedule)
        console.log('league', this.props)
        return (
            <View style={styles.container}>
                <Games games={games} ></Games>
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
        gameSchedule: state.gamesSchedule.gameSchedule,
        league: state.leagues.currentLeague,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(league)