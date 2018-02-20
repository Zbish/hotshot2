import React from 'react';
import {View,Text,Image} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import leaders from './leaders'
import gamesScreen from './gamesScreen'

export default LeagueTabNavigator =  TabNavigator(
  {
    Board: { screen:leaders },
    Bets: { screen:gamesScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Board') {
          iconName = `ios-trophy${focused ? '' : '-outline'}`;
        } else if (routeName === 'Bets') {
          iconName = `ios-football${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);