import React from 'react';
import { Card, CardItem, Form, Content, Item, Input, Label, Button, Text, Container } from 'native-base';
import { validateEmail, checkPassword } from '../utils'

export default class ForgotForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }
    onPress(){
        const email = this.state.email
        if(validateEmail(email)){
            this.props.reset(email)
        }
        
    }
    render() {
        return (
            <Content>
                <Form>
                    <Item stackedLabel>
                        <Label>Email</Label>
                        <Input
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </Item>
                </Form>
                <Button style={{ margin: 20 }} block rounded onPress={() => this.onPress()}>
                    <Text>reset Password</Text>
                </Button>
            </Content>
        );
    }

};
