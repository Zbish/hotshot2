import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Image, View, TouchableOpacity
} from 'react-native';

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
            <View style={styles.loginformcontainer}>
                <TextInput onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    underLineColorAndroid='transparent'
                    placeholderTextColor="black"
                    placeholder='Email' style={styles.textInput}>
                </TextInput>
                <TextInput onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    underLineColorAndroid='transparent'
                    placeholderTextColor="black"
                    placeholder='Password'
                    style={styles.textInput}>
                </TextInput>
                <View style={styles.btncontainer}>
                    <TouchableOpacity style={styles.loginbtn} onPress={() => this.logIn()}>
                        <Text>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.registerbtn} onPress={() => this.register()}>
                        <Text>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.forgotbtn} onPress={() => this.forgotPassword()}>
                        <Text>Forgot Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.facebook} onPress={() => this.facebook()}>
                        <Text>Facebook</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
