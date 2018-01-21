import React, { Component } from 'react';
import { FlatList } from 'react-native'
import MyLeagueItem from './MyLeagueItem'
import { Container } from 'native-base';

export default class MyLeague extends Component {
    navigate(name) {
        this.props.navigate(name)
    }
    render() {
        const leagues = this.props.leagues
        return (
            <Container>
                <FlatList
                    data={leagues}
                    extraData={leagues}
                    renderItem={({ item }) =>
                        <MyLeagueItem league={item}
                                      navigate={(name) => this.navigate(name)} />}
                    keyExtractor={(item, index) => index} />
            </Container>
        );
    }
}
