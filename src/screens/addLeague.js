import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base'
import { connect } from 'react-redux'
import Properties from '../components/addLeague/Properties'
import AddPlayers from '../components/addLeague/AddPlayers'
import AddGames from '../components/addLeague/AddGames'

class addLeague extends Component {

    render() {
        // console.log('addLeague' , this.props)
        const games = this.props.gameSchedule
        return (
            <Container>
                    {/* <Properties /> */}
                    <AddGames games={games} />
                    {/* <AddPlayers /> */}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        gameSchedule: state.gamesSchedule.gameSchedule,
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
)(addLeague)