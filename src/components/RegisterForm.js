import React from 'react';
import { Card, CardItem, Form, Content, Item, Input, Label, Button, Text, Container } from 'native-base';
import { validateEmail, checkPassword } from '../utils'

export default class RegisterForm extends React.Component {
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
        if (validateEmail(email), checkPassword(password)) {
            this.props.register(email, password)
        }
    }
    signIn() {
        this.props.renderSign()
    }
    render() {
        return (
            <Content>
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
                </Form>
                <Button style={{ margin: 20 }} block rounded onPress={() => this.register()}>
                    <Text>Register</Text>
                </Button>
                <Button style={{ alignSelf: 'center' }} transparent warning onPress={() => this.signIn()}>
                    <Text>Sign In</Text>
                </Button>
            </Content>
        );
    }

};

//   {/* {(!this.state.loading && !this.props.logged) ?
//                          :
//                     {/* <Spinner color='#303F9F' /> */}
        // {/* <CardItem style={{ flexDirection: 'column' }}>
        //                     <Text note>Or Sign In With Facebook </Text>
        //                     <FacebookLoginButton facebook={(user) => this.facebook(user)} />
        //                 </CardItem>
        //                 <CardItem >
        //                     <Button transparent warning >
        //                         <Text>Forgot Password?</Text>
        //                     </Button>
        //                     <Button transparent warning onPress={()=>this.renderRegister()}>
        //                         <Text>Register</Text>
        //                     </Button>
        //                 </CardItem> */}