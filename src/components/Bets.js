import _ from 'lodash'
import React, { Component } from 'react';
import {Text,View,StyleSheet,Slider} from 'react-native'

export default class Bets extends Component {
  constructor(props){
      super(props)
      this.state ={
          team1:0,
          team2:0
      }
  }
  componentWillReceiveProps(nextProps){
    const item = nextProps.item
    const team1 = item.team1
    const team2 = item.team2
    this.setState({team1:team1})
    this.setState({team2:team2})
  }
  onSlideTeam1(value){
    this.setState({team1:value})
  }
  onSlideTeam2(value){
    this.setState({team2:value})
   }
  render() {
    console.log('state' , this.props)
    
    return (
        <View style={styles.betComponent}>
     
                  <Slider 
                  style={styles.sliders}
                      step={1}
                      minimumValue={0}
                      maximumValue={10}
                      value={this.state.team1}
                      onValueChange={(val) => this.onSlideTeam1(val)}
                      thumbTintColor={'#FF5722'}
                      minimumTrackTintColor={'#4CAF50'}
                      maximumTrackTintColor={'#FF5722'}
                      disabled={false}
                    />
                    <Text style={styles.score}>{this.state.team1} : {this.state.team2}</Text>
                    <Slider 
                    style={styles.sliders}
                      step={1}
                      minimumValue={0}
                      maximumValue={10}
                      value={this.state.team2}
                      onValueChange={(val) => this.onSlideTeam2(val)}
                      thumbTintColor={'#FF5722'}
                      minimumTrackTintColor={'#4CAF50'}
                      maximumTrackTintColor={'#FF5722'}
                      disabled={false}
                    />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    betComponent:{
        flexDirection:'row',
        paddingTop:15,
    
      },

      score:{
        alignSelf:'center',
        padding:2,
        color:'black',
        fontSize:15,
        backgroundColor: '#FF5722',
    },
    sliders:{
    flex:4,
    
    }
  });