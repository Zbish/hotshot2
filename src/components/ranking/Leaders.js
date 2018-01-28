import React, { Component } from 'react';
import { Image, StyleSheet, View,} from 'react-native'
import _ from 'lodash';
import { imageBorder } from '../../utils'
import {Thumbnail,Text} from 'native-base'

export default class Leaders extends Component {

    render() {
        return (
            <View style={styles.rankContainer}>
                <Text>1</Text>
                <Thumbnail  style={[imageBorder(1), styles.image]} source={require('../../images/users/caspi.jpg')}></Thumbnail >
                <Text>caspi</Text>
                <Text>10</Text>
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