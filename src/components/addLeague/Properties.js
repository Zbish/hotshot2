import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label } from 'native-base'

export default class Properties extends Component {

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>League Name</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>League Purpose</Label>
                            <Input />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}