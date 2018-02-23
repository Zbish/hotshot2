import React, { Component } from 'react';
import { Image, StyleSheet, View, } from 'react-native'
import _ from 'lodash';
import { imageBorder } from '../../utils'
import { Thumbnail, Text } from 'native-base'
import Dimensions from 'Dimensions'

export default class Leaders extends Component {


    render() {
        const deviceWidth = Dimensions.get('window').width
        const item = this.props.item
        const place = this.props.place
        return (
            <View style={styles.rankContainer}>
                <Text>{place}</Text>
                <Thumbnail style={[imageBorder(place, deviceWidth), styles.image]} source={{ uri: item.photoUrl }}></Thumbnail >
                <Text>{item.name}</Text>
                <Text>{item.points}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    rankContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        borderWidth: 4,
        borderRadius: 40,
    },
});