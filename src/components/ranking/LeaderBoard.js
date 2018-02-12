import React, { Component } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native'
import Leaders from '../../components/ranking/Leaders'
import Losers from '../ranking/Losers'
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { chengeUserBet } from '../../firebaseActions'



export default class LeaderBoard extends Component {
  render() {
    const playersScore = this.props.playersScore
    const players = playersScore.sort((a, b) => a.points < b.points)
    const losers = players.slice(3)
    const leaders = players.slice(0, 3)

    const gamesLeft = this.props.gamesLeft
    return (
      <Content>
        <Card>
          <CardItem header>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>LeaderBoard</Text>
          </CardItem>
          <CardItem>
            <Left>
              <Leaders item={leaders[1]}
                place={2} />
            </Left>
            <Body>
              <Leaders item={leaders[0]}
                place={1}
              />
            </Body>
            <Right>
              <Leaders item={leaders[2]}
                place={3}
              />
            </Right>
          </CardItem>
          <CardItem cardBody>
            <FlatList
              data={losers}
              extraData={losers}
              keyExtractor={(item, index) => index}
              renderItem={({ item, index }) =>
                <Losers item={item}
                  place={index + 4}
                ></Losers>}
              keyExtractor={(item, index) => index} />
          </CardItem>
          <CardItem style={{backgroundColor:'grey'}}>
            <Left>
              <Text style={{fontWeight:'bold'}}>Games Left {gamesLeft}</Text>
            </Left>
            <Body>
              {/* <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button> */}
            </Body>
            <Right>
              <Text style={{fontWeight:'bold'}}>players {players.length}</Text>
            </Right>
          </CardItem>
        </Card>
      </Content>
    );
  }
}
const styles = StyleSheet.create({

});