import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, StyleSheet, Slider } from 'react-native'


export default class Bets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team1: 0,
      team2: 0,
      disabled: false

    }
  }
  componentWillReceiveProps(nextProps) {
    const oldItem = this.props.item
    const item = nextProps.item
    if (item.team1 != oldItem.team1 || item.team2 != oldItem.tem2) {
      const team1 = item.team1
      const team2 = item.team2
      this.setState({ team1: team1 })
      this.setState({ team2: team2 })
    }

  }
  componentWillMount() {
    const item = this.props.item
    const team1 = item.team1
    const team2 = item.team2
    this.setState({ team1: team1 })
    this.setState({ team2: team2 })
  }
  onSlideTeam1(value) {
    this.setState({ team1: value })
  }
  onSlideTeam2(value) {
    this.setState({ team2: value })
  }
  slideComplete1(value) {
    const bet = { team: 'team1', val: value }
    this.props.changeBet(bet)
  }
  slideComplete2(value) {
    const bet = { team: 'team2', val: value }
    this.props.changeBet(bet)
  }
  render() {
    const status = this.props.status
     { (status === 'panding') ?
     this.state.disabled = false :
     this.state.disabled = true}
    return (
      <View style={styles.betComponent}>

        <Slider
          style={styles.sliders}
          step={1}
          minimumValue={0}
          maximumValue={10}
          value={this.state.team1}
          onValueChange={(val) => this.onSlideTeam1(val)}
          onSlidingComplete={(value) => this.slideComplete1(value)}
          thumbTintColor={'#FF5722'}
          minimumTrackTintColor={'#4CAF50'}
          maximumTrackTintColor={'#FF5722'}
          disabled={this.state.disabled}
        />
        <Text style={styles.score}>{this.state.team1} : {this.state.team2}</Text>
        <Slider
          style={styles.sliders}
          step={1}
          minimumValue={0}
          maximumValue={10}
          value={this.state.team2}
          onValueChange={(val) => this.onSlideTeam2(val)}
          onSlidingComplete={(value) => this.slideComplete2(value)}
          thumbTintColor={'#FF5722'}
          minimumTrackTintColor={'#4CAF50'}
          maximumTrackTintColor={'#FF5722'}
          disabled={this.state.disabled}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  betComponent: {
    flexDirection: 'row',
    paddingTop: 15,

  },

  score: {
    alignSelf: 'center',
    padding: 2,
    color: 'black',
    fontSize: 15,
    backgroundColor: '#FF5722',
  },
  sliders: {
    flex: 4,

  }
});