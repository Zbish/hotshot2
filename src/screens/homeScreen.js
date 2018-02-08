import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { setCurrentLeague,resetAction,sign } from '../redux/actions/actions'
import { signOutFromFirebase} from'../loginAction'
import { renderIf } from '../utils'
import Games from '../components/Games'
import MyLeague from '../components/MyLeague'
import { Container, Content, Button } from 'native-base'
import FacebookLoginButton from '../components/FacebookLoginButton'

class homeScreen extends Component {

    navigate(id) {
        const current = _.find(this.props.leagues, { id: id })
        this.props.setCurrentLeague(current)
        this.props.navigation.navigate('league')

    }
    // log out from facebook / app
    onPress() {
        signOutFromFirebase().then(() => {
            this.props.signOut()
            this.props.resetNavigation()
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
                    <MyLeague leagues={leagues} navigate={(id) => this.navigate(id)} ></MyLeague>
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
        setCurrentLeague: (league) => dispatch(setCurrentLeague(league)),
        signOutFromFirebase: () => dispatch(signOutFromFirebase()),
        resetNavigation:() => dispatch(resetAction()),
        signOut:()=> dispatch(sign())

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(homeScreen)