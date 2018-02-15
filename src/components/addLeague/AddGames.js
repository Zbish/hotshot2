import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base'
import Games from '../Games'

export default class AddGames extends Component {

    render() {
        return (
            <Container>
                <Content>
                   <Games games={this.props.games} />
                </Content>
            </Container>
        );
    }
}