import React from 'react';
import { StackNavigator } from 'react-navigation';
import HOMESCREEN from './homeScreen'

export default RootStackNavigator = StackNavigator(
  { 
    HomeScreen: {
      screen: HOMESCREEN,
      navigationOptions: {
        title: 'homeScreen',
        headerStyle: { backgroundColor: '#F44336' },
        headerTitleStyle: { color: '#FFFFFF' },
        headerTintColor: '#FFFFFF'
      }
    },
  },
  {
    initialRouteName: 'HomeScreen'
  },
)