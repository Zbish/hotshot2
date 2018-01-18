import React, { Component } from 'react'
import { StyleSheet, View, Button, FlatList } from 'react-native'
import Game from '../components/Game'
import Games from '../components/Games'
import { connect } from 'react-redux'
import _ from 'lodash';
import { updateSchedule,createUser,signInUser,facebookLogin } from '../redux/actions/actions'
import { renderIf } from '../utils'
import LoginForm from '../components/LoginForm'

class homeScreen extends Component {
    register(email,password){
        this.props.create(email,password)
    }
    sign(email,password){
        this.props.signIn(email,password)
    }
    facebook(){
        this.props.facebookSignIn()
    }
    render() {
        console.log('state', this.props)
        console.log('this', this)
        const games = this.props.gameSchedule
        return (
            <View style={styles.container}>
                {renderIf(this.props.logged,
                <View>
                <Games games={games} />    
                </View>, 
                <LoginForm register={(email,password)=>this.register(email,password)} 
                            sign={(email,password)=>this.sign(email,password)}
                            facebook={()=>this.facebook()}
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
        logged: state.login.user,
        leagues: state.leagues.myLeagues
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateSchedule: (games) => dispatch(updateSchedule(games)),
        create:(email,password) => dispatch(createUser(email,password)),
        signIn:(email,password) => dispatch(signInUser(email,password)),
        facebookSignIn:()=>dispatch(facebookLogin())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(homeScreen)