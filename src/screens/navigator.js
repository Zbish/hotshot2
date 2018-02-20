import React from 'react';
import { StackNavigator } from 'react-navigation';
import homeScreen from './homeScreen'
import league from './league'
import addLeague from './addLeague'
import LeagueTabNavigator from './TabNavigator'
import loginNavigator from '../login/loginNavigator'

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
      screen: loginNavigator,
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
    currentLeague: {
      screen: LeagueTabNavigator,
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
        title: 'Add New League',
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