import React from 'react';
import { StackNavigator } from 'react-navigation';
import homeScreen from './homeScreen'
import loginScreen from './loginScreen'
import league from './league'
export default RootStackNavigator = StackNavigator(
  {
    HomeScreen: {
      screen: homeScreen,
      navigationOptions: {
        title: 'homeScreen',
        headerStyle: { backgroundColor: '#F44336' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTintColor: '#FFFFFF'
      }
    },
    LoginScreen: {
      screen: loginScreen,
      navigationOptions: {
        title: 'Login Screen',
        headerStyle: { backgroundColor: '#F44336' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTintColor: '#FFFFFF'
      }
    },
    league: {
      screen: league,
      navigationOptions: {
        title: 'league',
        headerStyle: { backgroundColor: '#F44336' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTintColor: '#FFFFFF'
      }
    },
  },
  {
    initialRouteName: 'LoginScreen'
  },
)