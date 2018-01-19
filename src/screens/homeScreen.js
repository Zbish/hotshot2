import React, { Component } from 'react'
import { StyleSheet,View,Text } from 'react-native'
import Games from '../components/Games'
import { connect } from 'react-redux'
import { updateSchedule } from '../redux/actions/actions'
import { renderIf } from '../utils'

class homeScreen extends Component {
 
    render() {
        const games = this.props.gameSchedule
        return (
            <View style={styles.container}>
                <Games games={games} />    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
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