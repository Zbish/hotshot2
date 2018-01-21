import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native'
import Game from './Game'
import _ from 'lodash';
import { withoutTime } from '../utils'
import moment from 'moment';
import PropTypes from 'prop-types';

export default class Games extends Component {
  render() {
    const gamesByDate = _.chain(this.props.games)
                          .sortBy(["date"])
                          .groupBy(game => {
                            return withoutTime(game.date);
                          }).value()
                      
    return (
      <View style={styles.container}>
        {
          _.map(gamesByDate, (games, date) => {
            return (
              <View key={date}>
                <View style={styles.dateContainer}>
                  <Text style={styles.text}>{moment(new Date(date)).format('dddd ,LL')}</Text>
                </View>
                <FlatList
                data={games}
                extraData={games}
                renderItem={({ item }) => <Game item={item} />}
                keyExtractor={(item, index) => index}/>
              </View>
            )
          }
          )
        }
      </View>
    );
  }
}

Games.propTypes = {
  item: PropTypes.array,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C8E6C9',
    marginTop: 5,
  },
  dateContainer: {
    backgroundColor: '#BDBDBD',
  },
  text: {
    alignSelf: 'center',
    color: '#212121',
    fontWeight: 'bold'
  },
});