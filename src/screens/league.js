import React, { Component } from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'
import Games from '../components/Games'
import { getLeagueGames } from '../utils'
import { Container, Content,Header } from 'native-base'
import LeaderBoard from '../components/ranking/LeaderBoard'

class league extends Component {

    render() {
        const schedule = this.props.gameSchedule
        const gamesNumbers = this.props.league.games
        const games = getLeagueGames(gamesNumbers, schedule)
        console.log('league', this.props)
        return (
            <Container>
                <Content>
                    <LeaderBoard />
                    <Games games={games} ></Games>
                </Content>
            </Container>
        );
    }
}

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