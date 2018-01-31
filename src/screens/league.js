import React, { Component } from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'
import Games from '../components/Games'
import { getLeagueGames ,getRanking} from '../utils'
import { Container, Content,Header } from 'native-base'
import LeaderBoard from '../components/ranking/LeaderBoard'

class league extends Component {

    render() {
        const league = this.props.league
        const playersScore = league.rankList
        const games = league.allGames
        return (
            <Container>
                <Content>
                    <LeaderBoard playersScore={playersScore} />
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