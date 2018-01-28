import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native'
import _ from 'lodash';
import { Thumbnail, Text,ListItem } from 'native-base'

export default class Losers extends Component {
    render() {
        return (
            <ListItem>
                <Text >4</Text>
                <Thumbnail style={styles.image} source={require('../../images/users/caspi.jpg')}></Thumbnail>
                <Text>doron</Text>
                <Text>{'    '}{15}</Text>
            </ListItem>
        );
    }
}
const styles = StyleSheet.create({
  
});