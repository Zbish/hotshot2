import React, { Component } from 'react';
import { FlatList, View } from 'react-native'
import MyLeagueItem from './MyLeagueItem'

export default class MyLeague extends Component {
    navigate(name) {
        this.props.navigate(name)
    }
    render() {
        const leagues = this.props.leagues
        return (
            <View>
                <FlatList
                    data={leagues}
                    extraData={leagues}
                    renderItem={({ item }) =>
                        <MyLeagueItem league={item}
                                        navigate={(name) => this.navigate(name)} />}
                                        keyExtractor={(item, index) => index} />
            </View>
        );
    }
}
