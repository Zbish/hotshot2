import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label } from 'native-base'

export default class Properties extends Component {
    render() {
        return (
            <Form>
                <Item floatingLabel>
                    <Label>League Name</Label>
                    <Input
                        value={this.props.name}
                        onChangeText={(text) => this.props.changeName(text)} />
                </Item>
                <Item floatingLabel last>
                    <Label>League Status</Label>
                    <Input value={this.props.status}
                        onChangeText={(text) => this.props.changeStatus(text)} />
                </Item>
            </Form>
        );
    }
}