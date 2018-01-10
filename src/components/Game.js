import _ from 'lodash'
import React, { Component } from 'react';
import {Text,View,Image,StyleSheet,TouchableHighlight} from 'react-native'

export default class Game extends Component {
  
  render() {
    const {item} = this.props;
    return (
      <TouchableHighlight style={styles.wrapper} underlayColor='grey' >
        <View>
        <View style={styles.container}>
        <View style={styles.team}>
                   {/* <Image source={flags[item.team1]} style={styles.flag}></Image> */}
                    <Text style={styles.teamName}>{item.team1}</Text>
              </View>
              <View style={styles.scoreContainer}>
                  <Text style={styles.Text}>Match {item.match}</Text>
                  <Text style={styles.score}>{item.score.team1} : {item.score.team2}</Text>
                  <Text style={styles.Text} >Group {item.group}</Text>
              </View>
              <View style={styles.team}>
                    {/* <Image source={flags[item.team2]} style={styles.flag}></Image> */}
                    <Text style={styles.teamName}>{item.team2}</Text>
              </View>
        </View>
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
    wrapper: {

    },
    container:{
      backgroundColor: '#EAEDED',
      flexDirection:'row',
      padding:10
    },
    team:{
      alignItems:'center',
      flexDirection:'column',
      flex:3
  },
  teamName:{
        alignSelf:'center',
        color:'#212121'
    },
    flag:{
        width:30,
        height:18
    },
   scoreContainer:{
    alignItems:'center',
    flex:3
   },
    score:{
        flex:1,
        alignSelf:'center',
        color:'#212121'
    },
    Text:{
      fontSize:12,
     
    }
  });