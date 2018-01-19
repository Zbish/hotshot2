import React, { Component } from 'react';
import { View, StyleSheet,Text,FlatList} from 'react-native'
import MyLeagueItem from'./MyLeagueItem'

export default class MyLeague extends Component {

    render() {
        const leagues = this.props.leagues
        return (
            <View style={styles.container}>
                 <FlatList
                data={leagues}
                extraData={leagues}
                renderItem={({ item }) => <MyLeagueItem league={item} />}
                keyExtractor={(item, index) => index}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});