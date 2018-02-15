import React, { Component } from 'react';
import { FlatList } from 'react-native'
import { Container, Content, Text, List, Button, Form, Item, Body, Label, Input, Radio } from 'native-base'
import { searchPlayers } from '../../firebaseActions'
import ListItemPlayer from './ListItemPlayer'

export default class AddPlayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfPlayers:[],
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
    addPlayer(player){
        const players = this.state.listOfPlayers
        players.push(player)
        this.setState({listOfPlayers:players})
        console.log('list of players' , this.props.listOfPlayers)
    }

    render() {
        const radio = this.state
        const result = this.state.listOfUsers
        return (
            <Container>
                <Content>
                    <Form>
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
                                renderItem={({ item }) => <ListItemPlayer item={item} addPlayer={(player)=>this.addPlayer(player)} />}
                                keyExtractor={item => item.uid} />
                        </List>}
                </Content>
            </Container>
        );
    }
}