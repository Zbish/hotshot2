import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { setCurrentLeague, signOutFromFirebase } from '../redux/actions/actions'
import { renderIf } from '../utils'
import Games from '../components/Games'
import MyLeague from '../components/MyLeague'
import { Container, Content, Button } from 'native-base'
import FacebookLoginButton from '../components/FacebookLoginButton'
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' })
    ]
})

class homeScreen extends Component {

    navigate(name) {
        this.props.setCurrentLeague(name, this.props.leagues)
        this.props.navigation.navigate('league')

    }
    // log out from facebook / app
    onPress() {
        this.props.signOutFromFirebase().then(() => {
            this.props.navigation.dispatch(resetAction)
        })
    }

    render() {
        const games = this.props.gameSchedule
        const leagues = this.props.leagues
        return (
            <Container>
                <Content>
                    <FacebookLoginButton onPress={() => this.onPress()}></FacebookLoginButton>
                    <Button block onPress={() => this.onPress()}>
                        <Text> sign out</Text>
                    </Button>
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
        setCurrentLeague: (name, leagues) => dispatch(setCurrentLeague(name, leagues)),
        signOutFromFirebase: () => dispatch(signOutFromFirebase())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(homeScreen)