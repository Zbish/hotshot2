import React from 'react';
import { Card, CardItem, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    register() {
        const email = this.state.email
        const password = this.state.password
        this.props.register(email, password)
    }
    logIn() {
        const email = this.state.email
        const password = this.state.password
        this.props.sign(email, password)
    }
    forgotPassword() {
        console.log('forgot')
    }
    facebook() {
        this.props.facebook()
    }
    render() {
        return (
            <Card>
                <CardItem>
                    <Form>
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
                        <Button style={{ margin: 10,marginBottom:0 }} block rounded onPress={() => this.logIn()}>
                            <Text>Log In</Text>
                        </Button>
                    </Form>
                </CardItem>
                <CardItem style={{ flexDirection: 'column'}}>
                    <Text note> or sign in with facebook </Text>
                    <Button style={{ margin: 15 }} block rounded onPress={() => this.facebook()}>
                        <Text>Facebook</Text>
                    </Button>
                </CardItem>
                <CardItem >
                    <Button transparent warning onPress={() => this.forgotPassword()}>
                        <Text>Forgot Password?</Text>
                    </Button>
                    <Button transparent warning onPress={() => this.register()}>
                        <Text>Register</Text>
                    </Button>
                </CardItem>
            </Card>
        );
    }

};
