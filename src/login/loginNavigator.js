import React from 'react';
import { StackNavigator } from 'react-navigation';
import loginScreen from './loginScreen'
import registerScreen from './registerScreen'
import forgotScreen from './forgotScreen'

export default loginNavigator = StackNavigator(
    {
        Login: {
            screen: loginScreen,
            navigationOptions: {
                header: null,
            }
        },
        Register: {
            screen: registerScreen,
            navigationOptions: {
                title: 'Register',
                headerStyle: { backgroundColor: '#C81514' },
                headerTitleStyle: { color: '#FFFFFF' },
                headerTintColor: '#FFFFFF',
            },
        },
        Forgot: {
            screen: forgotScreen,
            navigationOptions: {
                title: 'Forgot Password',
                headerStyle: { backgroundColor: '#C81514' },
                headerTitleStyle: { color: '#FFFFFF' },
                headerTintColor: '#FFFFFF',
            },
        },
    },
    {
        initialRouteName: 'Login'
    },
)