import React, { Component } from 'react';
import { View } from 'react-native'
import { Container, Content, Text } from 'native-base'
import Games from '../Games'

export default class AddGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfGames: {}
        };
    }
    addGame(game) {
        const list = this.state.listOfGames
        var id = game.id;
        if (list.hasOwnProperty(id)) {
            alert("This game Is Already In The League");
        }
        else {
            const newGame = {}
            newGame.uid = true
            newGame.match = game.match
            list[id] = newGame
            this.setState({ listOfGames: list })
            alert("U Add Match Number  "+game.match  );
        }
    }
    render() {
        const gamesInLeague = this.state.listOfGames
        return (
            <Container>
                <Content>
                    <View style={{flexDirection:'row'}}>
                        <Text>
                            games In League :
                            </Text>
                        {
                            _.map(gamesInLeague, (game, uid) => {
                                return (
                                    <Text key={uid}>{game.match} , {'  '}</Text>
                                )
                            })
                        }
                    </View>
                    <Games games={this.props.games} onGamePress={(game) => this.addGame(game)} />
                </Content>
            </Container>
        );
    }
}