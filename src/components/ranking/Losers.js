import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native'
import _ from 'lodash';
import { Thumbnail, Text,ListItem } from 'native-base'

export default class Losers extends Component {
    render() {
        const item = this.props.item
        const place = this.props.place
        return (
            <ListItem>
                <Text >{place}</Text>
                <Thumbnail style={styles.image} source={require('../../images/users/caspi.jpg')}></Thumbnail>
                <Text>{item.name}</Text>
                <Text>{'    '}{item.points}</Text>
            </ListItem>
        );
    }
}
const styles = StyleSheet.create({
  
});