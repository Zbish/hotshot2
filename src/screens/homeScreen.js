import React, { Component } from 'react'
import { StyleSheet,View,Text } from 'react-native'
import { connect } from 'react-redux'
import { updateSchedule } from '../redux/actions/actions'
import { renderIf } from '../utils'
import Games from '../components/Games'
import MyLeague from '../components/MyLeague'

class homeScreen extends Component {
 
    render() {
        const games = this.props.gameSchedule
        const leagues = this.props.leagues
        console.log('leagues' , leagues)
        return (
            <View style={styles.container}>
                <Games games={games} />
                <MyLeague leagues={leagues} ></MyLeague>    
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(homeScreen)