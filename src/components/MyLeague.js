import React, { Component } from 'react';
import { FlatList, View } from 'react-native'
import MyLeagueItem from './MyLeagueItem'

export default class MyLeague extends Component {
    navigate(id) {
        this.props.navigate(id)
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
                                        navigate={(id) => this.navigate(id)} />}
                                        keyExtractor={(item, index) => index} />
            </View>
        );
    }
}
