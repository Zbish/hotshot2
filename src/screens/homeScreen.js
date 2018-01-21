import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { setCurrentLeague } from '../redux/actions/actions'
import { renderIf } from '../utils'
import Games from '../components/Games'
import MyLeague from '../components/MyLeague'

class homeScreen extends Component {
    navigate(name) {
        this.props.setCurrentLeague(name,this.props.leagues)
        this.props.navigation.navigate('league')
        
    }
    render() {
        const games = this.props.gameSchedule
        const leagues = this.props.leagues
        return (
            <View style={styles.container}>
                <Games games={games} />
                <MyLeague leagues={leagues} navigate={(name) => this.navigate(name)} ></MyLeague>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

});

function mapStateToProps(state) {
    return {
        gameSchedule: state.gamesSchedule.gameSchedule,
        logged: state.login.user,
        leagues: state.leagues.myLeagues,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentLeague:(name,leagues) => dispatch(setCurrentLeague(name,leagues))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(homeScreen)