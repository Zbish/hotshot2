import _ from 'lodash'
import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native'
import {Text, ListItem,Grid } from 'native-base';
import PropTypes from 'prop-types';

export default class Game extends Component {

  render() {
    const { item } = this.props;
    return (
      <ListItem>
        <Grid>

          <Text>{item.team1}</Text>
   
        <View>
          <Text>Match {item.match}</Text>
          <Text>{item.score.team1} : {item.score.team2}</Text>
          <Text>Group {item.group}</Text>
        </View>
   
          <Text >{item.team2}</Text>
    
        </Grid>
      
      </ListItem>
    );
  }
}

Game.propTypes = {
  item: PropTypes.object,
}
