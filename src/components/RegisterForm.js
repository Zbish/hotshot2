import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Image, View, TouchableOpacity
} from 'react-native';
import { Spinner, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Col, Grid, Row } from "react-native-easy-grid"

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
                <Grid>
                    <Row>
                        <Form>
                            <Item stackedLabel>
                                <Label>Email</Label>
                                <Input
                                    value={this.state.email}
                                    onChangeText={(email) => this.setState({ email })}
                                />
                            </Item>
                            <Item stackedLabel last>
                                <Label>Password</Label>
                                <Input
                                    onChangeText={(password) => this.setState({ password })}
                                    value={this.state.password}
                                />
                            </Item>
                            <Grid>
                                <Col>
                                    <Button block rounded onPress={() => this.logIn()}>
                                        <Text>Log In</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button block rounded onPress={() => this.register()}>
                                        <Text>Register</Text>
                                    </Button>
                                </Col>
                                <Col>

                                    <Button block rounded warning onPress={() => this.forgotPassword()}>
                                        <Text>Forgot Password</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </Form>
                    </Row>
                    <Row style={{ margin:10}}>
                        <Button style={{ padding:15 }} block rounded onPress={() => this.facebook()}>
                            <Text>Facebook</Text>
                        </Button>
                    </Row>
                </Grid>
        );
    }

};
const styles = StyleSheet.create({
    loginformcontainer: {
        alignItems: 'center',
    },
    btncontainer: {
        flexDirection: 'row',
        marginBottom: 50,

    },
    textInput: {
        color: '#757575',
        alignSelf: 'stretch',
        padding: 6,
        marginBottom: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 0.6,
    },
    loginbtn: {
        backgroundColor: '#ecf0f1',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 100,
        width: 100,
        padding: 14,
        marginTop: 10,
    },
    registerbtn: {
        backgroundColor: '#bdc3c7',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 100,
        width: 100,

        padding: 14,
        marginTop: 10,
    },
    forgotbtn: {
        backgroundColor: '#e74c3c',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 100,
        width: 100,
        padding: 14,
        marginTop: 10,
    },
    facebook: {
        backgroundColor: 'blue',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderRadius: 100,
        width: 100,
        padding: 14,
        marginTop: 10,
    }
});
