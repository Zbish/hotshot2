import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base'

export default class pureComponent extends Component {

    render() {
        return (
            <Container>
                <Content>
                    <Text>
                        i am pure
                    </Text>
                </Content>
            </Container>
        );
    }
}