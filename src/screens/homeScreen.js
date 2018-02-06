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
        const provider = this.props.navigation.state.params.provider
        const games = this.props.gameSchedule
        const leagues = this.props.leagues
        console.log('home-state' , this.props)
        return (
            <Container>
                <Content>
                    <MyLeague leagues={leagues} navigate={(name) => this.navigate(name)} ></MyLeague>
                    <Text>Games Of The Week </Text>
                    <Games games={games} />
                    {!provider && <FacebookLoginButton onPress={() => this.onPress()}></FacebookLoginButton>}
                    {provider && <Button block danger onPress={() => this.onPress()}>
                        <Text> sign out</Text>
                    </Button>}
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
        scores: state.scores
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