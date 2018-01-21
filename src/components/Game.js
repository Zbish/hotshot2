import _ from 'lodash'
import React, { Component } from 'react'
import { Image } from 'react-native'
import { Text, ListItem, Label, Thumbnail, Body } from 'native-base'
import PropTypes from 'prop-types'
import { Col, Grid, Row } from "react-native-easy-grid"
import Flags from '../images/Flags'
import teams from '../images/teams'

export default class Game extends Component {

  render() {
    const { item } = this.props;
    const team1 = _.find(teams, { code: item.team1 })
    const team2 = _.find(teams, { code: item.team2 })
    return (
      <ListItem>
        <Grid>
          <Col style={{ alignItems:'center' }}>
            <Row>
              <Thumbnail small source={Flags[team1.name]} />
            </Row>
            <Row>
              <Text>{team1.name}</Text>
            </Row>
          </Col>
          <Col style={{ alignItems:'center' }}>
            <Text>Match {item.match}</Text>
            <Text>{item.score.team1} : {item.score.team2}</Text>
            <Text>Group {item.group}</Text>
          </Col>
          <Col style={{ alignItems:'center' }}>
            <Row>
              <Thumbnail small source={Flags[team2.name]} />
            </Row>
            <Row>
              <Text>{team2.name}</Text>
            </Row>
          </Col>
        </Grid>
      </ListItem>
    );
  }
}

Game.propTypes = {
  item: PropTypes.object,
}
