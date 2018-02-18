import React, { Component } from 'react';
import { FlatList, View } from 'react-native'
import { Container, Content, Text, List, Button, Form, Item, Body, Label, Input, Radio } from 'native-base'
import { searchPlayers } from '../../firebaseActions'
import ListItemPlayer from './ListItemPlayer'
import _ from 'lodash';

export default class AddPlayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfPlayers: {},
            listOfUsers: [],
            name: false,
            last: false,
            email: false,
            fullName: false,
            proprty: '',
            value: ''
        };
    }
    onPress(doc) {
        this.setState({ name: false, fullName: false, last: false, email: false })
        this.setState({ [doc]: true })
        this.setState({ proprty: doc })
    }
    getUsers() {
        const proprty = this.state.proprty
        const value = this.state.value
        searchPlayers(value, proprty).then((listOfUsers) => {
            const users = []
            listOfUsers.forEach((doc) => {
                users.push(doc.data())
            })
            this.setState({ listOfUsers: users })
        })
    }
    addPlayer(player) {
        const players = this.state.listOfPlayers
        var uid = player.uid;
        if (players.hasOwnProperty(uid)) {
            alert("This Player Is Already In The League");
        }
        else {
            player.uid = true
            player.status = 'panding'
            players[uid] = player
            this.setState({ listOfPlayers: players })
            alert("U Add  " + player.name + " " + player.last);
        }

    }

    render() {
        const radio = this.state
        const result = this.state.listOfUsers
        const players = this.state.listOfPlayers
        console.log('list of players', this.state.listOfPlayers)
        return (
            <Container>
                <Content>
                    <Form>
                        <Item>
                            <Text>
                                players In League :
                            </Text>
                            {
                                _.map(players, (player, uid) => {
                                    return (
                                        <Text key={uid}>{player.name} , {'  '}</Text>
                                    )
                                })
                            }
                        </Item>
                        <Item floatingLabel>
                            <Label>Search A Player</Label>
                            <Input value={this.state.value}
                                onChangeText={(text) => this.setState({ value: text })} />
                        </Item>
                        <Text style={{ color: 'red', fontWeight: 'bold' }}>
                            Search By:
                        </Text>
                        <Item>
                            <Body>
                                <Text>First Name</Text>
                                <Radio selected={radio.name} onPress={() => this.onPress('name')} />
                            </Body>
                            <Body >
                                <Text>Last Name</Text>
                                <Radio selected={radio.last} onPress={() => this.onPress('last')} />
                            </Body>
                            <Body>
                                <Text>Email</Text>
                                <Radio selected={radio.email} onPress={() => this.onPress('email')} />
                            </Body>
                            <Body>
                                <Text>full Name</Text>
                                <Radio selected={radio.fullName} onPress={() => this.onPress('fullName')} />
                            </Body>
                        </Item>
                    </Form>
                    <Button block warning onPress={() => this.getUsers()}>
                        <Text>
                            Search Freinds
                        </Text>
                    </Button>
                    {(result.length > 0) &&
                        <List>
                            <FlatList
                                data={result}
                                extraData={result}
                                renderItem={({ item }) => <ListItemPlayer item={item} addPlayer={(player) => this.addPlayer(player)} />}
                                keyExtractor={item => item.uid} />
                        </List>}
                    {result.length == 0 && <Text>No Freind Found</Text>}
                </Content>
            </Container>
        );
    }
}