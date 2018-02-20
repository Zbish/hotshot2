import React, { Component } from 'react';
import { View } from 'react-native'
import { connect } from 'react-redux'
import Games from '../components/Games'
import { Container, Content, Header, Text } from 'native-base'
import LeaderBoard from '../components/ranking/LeaderBoard'


class gamesScreen extends Component {

    render() {
        const league = this.props.league
        const games = league.allGames
        console.log('state' , this.props)
        return (
            <Container>
                <Content>
                    <Games games={games} ></Games>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        league: state.leagues.currentLeague,
        bets: state.scores[state.leagues.currentLeague.id],
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