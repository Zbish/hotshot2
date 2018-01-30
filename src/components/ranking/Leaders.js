import React, { Component } from 'react';
import { Image, StyleSheet, View,} from 'react-native'
import _ from 'lodash';
import { imageBorder } from '../../utils'
import {Thumbnail,Text} from 'native-base'

export default class Leaders extends Component {

    render() {
        const item = this.props.item
        const place = this.props.place
        return (
            <View style={styles.rankContainer}>
                <Text>{place}</Text>
                <Thumbnail  style={[imageBorder(place), styles.image]} source={require('../../images/users/caspi.jpg')}></Thumbnail >
                <Text>{item.name}</Text>
                <Text>{item.points}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    rankContainer: {
        alignItems: 'center',
    },
    image: {
        borderWidth: 4,
        borderRadius:40,
    },
});