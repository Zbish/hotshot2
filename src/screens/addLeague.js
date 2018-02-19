import React, { Component } from 'react';
import { Container, Content, Text,Button } from 'native-base'
import { connect } from 'react-redux'
import Properties from '../components/addLeague/Properties'
import AddPlayers from '../components/addLeague/AddPlayers'
import { newLeagueName, newLeagueStatus, newPlayersList,addNewLeague} from '../redux/actions/actions'
import {validateLeague} from '../utils'


class addLeague extends Component {
    addNewLeague(league){
      const validLeague =  validateLeague(league)
      if(validLeague){
          this.props.addNewLeague(validLeague).then(()=>{
            this.props.navigation.goBack()
          })
      }
    }
    render() {
        const newLeague = this.props.newLeague
        const games = this.props.gameSchedule
        return (
            <Container>
                <Properties
                    name={newLeague.name}
                    status={newLeague.status}
                    changeName={(name) => this.props.newLeagueName(name)}
                    changeStatus={(status) => this.props.newLeagueStatus(status)} />
                <AddPlayers
                    players={newLeague.players}
                    addNewPlayer={(player, uid) => this.props.addPlayer(player, uid)}
                />
                <Button block danger onPress={()=>this.addNewLeague(newLeague)}>
                   <Text>
                       Add New League
                   </Text>
                </Button>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        gameSchedule: state.gamesSchedule.gameSchedule,
        newLeague: state.addLeague.newLeague
    }
}

function mapDispatchToProps(dispatch) {
    return {
        newLeagueName: (name) => dispatch(newLeagueName(name)),
        newLeagueStatus: (status) => dispatch(newLeagueStatus(status)),
        addPlayer: (player, uid) => dispatch(newPlayersList(player, uid)),
        addNewLeague: (league) => dispatch(addNewLeague(league)),
        

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(addLeague)