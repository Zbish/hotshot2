import React, { Component } from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'
import Games from '../components/Games'
import { Container, Content, Header, Text } from 'native-base'
import LeaderBoard from '../components/ranking/LeaderBoard'
import { getMyBets } from '../utils'


class gamesScreen extends Component {

    render() {
        const league = this.props.league
        const games = league.allGames
        const bets = this.props.bets
        const uid = this.props.userUid
        const gamesAndBets = getMyBets(games, bets, uid)
        return (
            <Container>
                <Content>
                    <Games games={gamesAndBets} ></Games>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        league: state.leagues.currentLeague,
        bets: state.scores[state.leagues.currentLeague.id],
        userUid: state.login.userUid
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(gamesScreen)