import React, { Component } from 'react';
import { Container, Content, Text, Button, Form, Item, Body, Left, Label, Input, ListItem, Radio, Right } from 'native-base'
import { searchPlayers } from '../../firebaseActions'

export default class AddPlayers extends Component {

    onPress() {
        console.log('ffffffff')
        const proprty = "email"
        const what = 'nizan@gmail.com'
        searchPlayers(what, proprty)
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Search A Player</Label>
                            <Input />
                        </Item>
                        <Text style={{color:'red',fontWeight:'bold'}}>
                            Search By:
                        </Text>
                        <Item>
                            <Body>
                                <Text>First Name</Text>
                                <Radio selected={false} />
                            </Body>
                            <Body >
                                <Text>Last Name</Text>
                                <Radio selected={false} />
                            </Body>
                            <Body>
                                <Text>Email</Text>
                                <Radio selected={true} />
                            </Body>
                            <Body>
                                <Text>full Name</Text>
                                <Radio selected={false} />
                            </Body>
                        </Item>
                    </Form>
                    <Button block warning onPress={() => this.onPress()}>
                        <Text>
                            get users
                        </Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}