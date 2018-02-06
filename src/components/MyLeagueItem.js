import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import { ListItem, Thumbnail, Text, Body, Button, Icon } from 'native-base';

export default class MyLeagueItem extends Component {

    onPress(name) {
        this.props.navigate(name)
    }
    delete() {
        console.log('delete')
    }
    render() {
        const { players, allGames, name } = this.props.league
        return (
            <ListItem style={styles.container} onPress={() => this.onPress(name)}>
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
                <Button transparent danger style={styles.button}
                    onPress={() => this.delete()}>
                    <Icon name='trash' />
                </Button>
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
    button: {
        position: 'absolute',
        bottom: 1,
        right: 1,
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