import React, { Component } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native'
import Game from '../components/Game';
import Games from '../components/Games';
import { connect } from 'react-redux'
import _ from 'lodash';
import { updateSchedule,createUser,signInUser } from '../redux/actions/actions'
import { renderIf } from '../utils'
import LoginForm from '../components/LoginForm'

class homeScreen extends Component {
    register(email,password){
        this.props.create(email,password)
    }
    sign(email,password){
        this.props.signIn(email,password)
    }
    render() {
        console.log('state', this.props)
        const games = this.props.gameSchedule
        return (
            <View style={styles.container}>
                {renderIf(this.props.logged,
                <Games games={games} />, 
                <LoginForm register={(email,password)=>this.register(email,password)} 
                            sign={(email,password)=>this.sign(email,password)} 
                    /> )}
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
        logged: state.login.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSchedule: (games) => dispatch(updateSchedule(games)),
        create:(email,password) => dispatch(createUser(email,password)),
        signIn:(email,password) => dispatch(signInUser(email,password))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(homeScreen)