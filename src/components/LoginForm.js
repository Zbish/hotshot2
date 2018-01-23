import React from 'react';
import { Card, CardItem, Form, Content, Item, Input, Label, Button, Text } from 'native-base';
import FacebookLoginButton from '../components/FacebookLoginButton'
import { validateEmail } from '../utils'

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
    SignIn() {
        const email = this.state.email
        const password = this.state.password
        // this.props.sign(email, password)
        console.log('mail', validateEmail(email))
    }
    forgotPassword() {
        console.log('forgot')
    }
    facebook(user) {
        this.props.facebook(user)

    }
    render() {
        return (
            <Content>
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
                            <Button style={{ margin: 10, marginBottom: 0 }} block rounded onPress={() => this.SignIn()}>
                                <Text>Sign In</Text>
                            </Button>
                        </Form>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'column' }}>
                        <Text note> or sign in with facebook </Text>
                        <FacebookLoginButton facebook={(user) => this.facebook(user)} />
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
            </Content>

        );
    }

};
