import React from 'react';
import { Form, Content, Item, Input, Label, Button, Text } from 'native-base';
import FacebookLoginButton from './FacebookLoginButton'
import { View } from 'react-native'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    SignIn() {
        const email = this.state.email
        const password = this.state.password
        this.props.sign(email, password)
    }
    onPress() {
        this.props.renderRegister()
    }
    forgotPassword() {
        this.props.renderForgot()
    }
    facebook(token){
        this.props.facebook(token)
    }
    render() {
        return (
            <Content >
                <Form >
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
                <Button style={{ margin: 10, marginBottom: 0 }} block rounded onPress={() => this.SignIn()}>
                    <Text>Sign In</Text>
                </Button>
                <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'center' }}>
                    <Button transparent warning onPress={() => this.onPress()}>
                        <Text>register</Text>
                    </Button>
                    <Button transparent warning onPress={() => this.forgotPassword()} >
                        <Text>Forgot Password?</Text>
                    </Button>
                </View>
                <Text note style={{ alignSelf: 'center' }} >OR</Text>
                <FacebookLoginButton facebook={(token) => this.facebook(token)} />
            </Content>
        );
    }

};
