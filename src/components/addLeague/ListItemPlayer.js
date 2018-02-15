import React, { Component } from 'react';
import { Text, ListItem, Thumbnail, Body } from 'native-base'


export default class ListItemPlayer extends Component {
    onPress(item){
           this.props.addPlayer(item)
    }

    render() {
        const item = this.props.item
        const name = item.name
        const last = item.last
        const photo = item.photoUrl
        const status = 'lets play'
        return (
            <ListItem onPress={()=>this.onPress(item)}>
                <Thumbnail square size={80} source={{ uri: photo }} />
                <Body>
                    <Text>{name}{' '}{last}</Text>
                    <Text note>{status}}</Text>
                </Body>
            </ListItem>
        );
    }
}