import React, { Component } from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'
import Games from '../components/Games'
import {margeArrayRank,countGamesLeft} from '../utils'
import { Container, Content, Header, Text } from 'native-base'
import LeaderBoard from '../components/ranking/LeaderBoard'


class leaders extends Component {

    render() {
        const league = this.props.league
        const players = league.players
        const games = league.allGames
        const rankListLeague = this.props.rankList[league.id]
        const combineRanks = margeArrayRank(rankListLeague,players)
        const gamesLeft = countGamesLeft(games)
        return (
            <Container>
                   {combineRanks.length > 0 && <LeaderBoard playersScore={combineRanks} gamesLeft={gamesLeft} />}
                    {/* <Games games={games} ></Games> */}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        gameSchedule: state.gamesSchedule.gameSchedule,
        league: state.leagues.currentLeague,
        rankList: state.ranks
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(leaders)