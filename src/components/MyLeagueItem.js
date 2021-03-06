import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import { ListItem, Thumbnail, Text, Body, Button, Icon } from 'native-base';

export default class MyLeagueItem extends Component {

    onPress(id) {
        this.props.navigate(id)
    }
    delete() {
        console.log('delete')
    }
    render() {
        const { players, allGames, name,id } = this.props.league
        return (
            <ListItem style={styles.container} onPress={() => this.onPress(id)}>
                <Thumbnail style={styles.image} source={require('../images/app/football.png')} />
                <Body>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text style={styles.players} note>
                        players: {Object.keys(players).length}
                    </Text>
                    <Text style={styles.games} note>
                        games: {allGames.length}
                    </Text>
                </Body>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 0,
        marginBottom: 2
    },
    image: {
        width: 75,
        height: 75,
        marginLeft: 10
    },
    name: {
        alignSelf: 'flex-start'
    },
    players: {
        textAlign: 'left'
    },
    games: {
        textAlign: 'left'
    }
});