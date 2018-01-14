import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native'
import LoginForm from '../components/LoginForm'

export default class loginScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <LoginForm/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});