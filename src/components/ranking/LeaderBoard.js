import React, { Component } from 'react';
import { StyleSheet, Image, FlatList } from 'react-native'
import Leaders from '../../components/ranking/Leaders'
import Losers from '../ranking/Losers'
// import {sortArray,getLeaders,getLosers} from '../../utils'
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
const players = ['omri', 'nizan', 'gil']
import {chengeUserBet} from '../../firebaseActions'


export default class LeaderBoard extends Component {
  render() {
    return (
      <Content>
        <Card>
          <CardItem header>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>LeaderBoard</Text>
          </CardItem>
          <CardItem>
            <Left>
              <Leaders />
            </Left>
            <Body>
              <Leaders />
            </Body>
            <Right>
              <Leaders />
            </Right>
          </CardItem>
          <CardItem cardBody>
            <FlatList
              data={players}
              extraData={players}
              renderItem={({ item }) =>
                <Losers></Losers>}
              keyExtractor={(item, index) => index} />
          </CardItem>
          <CardItem>
            <Left>
              <Text note>Games Left 12</Text>
            </Left>
            <Body>
              <Text note>players 10</Text>
            </Body>
            <Right>
              <Button  onPress={()=>chengeUserBet()}transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </Content>
    );
  }
}
const styles = StyleSheet.create({

});