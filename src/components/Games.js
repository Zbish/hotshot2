import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native'
import Game from './Game'
import _ from 'lodash'
import { withoutTime } from '../utils'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

export default class Games extends Component {
  render() {
    const gamesByDate = _.chain(this.props.games)
      .sortBy(["date"])
      .groupBy(game => {
        return withoutTime(game.date);
      }).value()

    return (
      <Content>
        {
          _.map(gamesByDate, (games, date) => {
            return (
              <Card>
                <CardItem header>
                  <Text style={styles.text}>{moment(new Date(date)).format('dddd ,LL')}</Text>
                </CardItem>
                <CardItem>
                    <FlatList
                      data={games}
                      extraData={games}
                      renderItem={({ item }) => <Game item={item} />}
                      keyExtractor={(item, index) => index} />
                </CardItem>
              </Card>
            )
          }
          )
        }
      </Content>
    );
  }
}

Games.propTypes = {
  item: PropTypes.array,
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    color: '#212121',
    fontWeight: 'bold'
  },
});