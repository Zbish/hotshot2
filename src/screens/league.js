import React, { Component } from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'
import Games from '../components/Games'
import { getLeagueGames ,getRanking,margeArrayRank,countGamesLeft,ranksAndNames} from '../utils'
import { Container, Content,Header } from 'native-base'
import LeaderBoard from '../components/ranking/LeaderBoard'

class league extends Component {

    render() {
        const league = this.props.league
        const players = league.players
        const games = league.allGames
        const rankListLeague = this.props.rankList[league.id]
        const combineRanks = margeArrayRank(rankListLeague)
        const ranksNames = ranksAndNames(combineRanks,players)
        console.log('players' , ranksNames)
        const gamesLeft = countGamesLeft(games)
        return (
            <Container>
                <Content>
                   {ranksNames.length > 0 && <LeaderBoard playersScore={ranksNames} gamesLeft={gamesLeft} />}
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
        rankList:state.ranks
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