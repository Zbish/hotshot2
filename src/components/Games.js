import React, { Component } from 'react';
import { FlatList } from 'react-native'
import Game from './Game'
import _ from 'lodash'
import { withoutTime } from '../utils'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Content, Text, List, ListItem,Container } from 'native-base';

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
                <List key={date} >
                  <ListItem style={{backgroundColor:'#C5CAE9'}}itemDivider>
                    <Text>{moment(new Date(date)).format('dddd ,LL')}</Text>
                  </ListItem>
                  <FlatList
                    data={games}
                    extraData={games}
                    renderItem={({ item }) => <Game item={item} />}
                    keyExtractor={item => item.id} />
                </List>
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
