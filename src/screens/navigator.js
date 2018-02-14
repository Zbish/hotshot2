import React from 'react';
import { StackNavigator } from 'react-navigation';
import homeScreen from './homeScreen'
import loginScreen from './loginScreen'
import league from './league'
import addLeague from './addLeague'
export default RootStackNavigator = StackNavigator(
  {
    HomeScreen: {
      screen: homeScreen,
      navigationOptions: {
        title: 'homeScreen',
        headerStyle: { backgroundColor: '#C81514' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTintColor: '#FFFFFF',
        headerLeft: null,
      },
    },
    LoginScreen: {
      screen: loginScreen,
      navigationOptions: {
        header: null,
      }
    },
    league: {
      screen: league,
      navigationOptions: {
        title: 'league',
        headerStyle: { backgroundColor: '#C81514' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTintColor: '#FFFFFF'
      }
    },
    addLeague: {
      screen: addLeague,
      navigationOptions: {
        title: 'addLeague',
        headerStyle: { backgroundColor: '#C81514' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTintColor: '#FFFFFF'
      }
    },
  },
  {
    initialRouteName: 'LoginScreen'
  },
)