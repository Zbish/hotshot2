import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base'
import { connect } from 'react-redux'

class addLeague extends Component {

    render() {
        console.log('addLeague' , this.props)
        return (
            <Container>
                <Content>
                    <Text>
                        i am league aff
                    </Text>
                </Content>
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