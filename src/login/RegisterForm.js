import React from 'react';
import { Card, CardItem, Form, Content, Item, Input, Label, Button, Text, Container } from 'native-base';
import { validateEmail, checkPassword } from '../utils'
import {createUser} from './loginAction'

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name:'',
        };
    }
    register() {
        this.props.loading(true)
        const email = this.state.email
        const password = this.state.password
        const name = this.state.name
        if (validateEmail(email), checkPassword(password)) {
            createUser(email, password, name).then(user=>this.props.login(user))
        }
        else{
            this.props.loading(false)
        }
    }
    render() {
        return (
            <Content>
                <Form>
                <Item stackedLabel>
                        <Label>Name</Label>
                        <Input
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </Item>
                    <Item stackedLabel last >
                        <Label>Password</Label>
                        <Input
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                        />
                    </Item>
                </Form>
                <Button style={{ margin: 20 }} block rounded onPress={() => this.register()}>
                    <Text>Register</Text>
                </Button>
            </Content>
        );
    }

};
