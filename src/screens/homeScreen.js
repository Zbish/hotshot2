import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { setCurrentLeague } from '../redux/actions/actions'
import { renderIf } from '../utils'
import Games from '../components/Games'
import MyLeague from '../components/MyLeague'
import { Container, Content } from 'native-base';

class homeScreen extends Component {
    navigate(name) {
        this.props.setCurrentLeague(name, this.props.leagues)
        this.props.navigation.navigate('league')

    }
    render() {
        const games = this.props.gameSchedule
        const leagues = this.props.leagues
        return (
            <Container>
                <Content>
                    <MyLeague leagues={leagues} navigate={(name) => this.navigate(name)} ></MyLeague>
                    <Games games={games} />
                </Content>
            </Container>
        );
    }
}
function mapStateToProps(state) {
    return {
        gameSchedule: state.gamesSchedule.gameSchedule,
        logged: state.login.user,
        leagues: state.leagues.myLeagues,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentLeague: (name, leagues) => dispatch(setCurrentLeague(name, leagues))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(homeScreen)