import React, { Component } from 'react';
import { Container, Content, Text, Spinner } from 'native-base'
import RegisterForm from './RegisterForm'

export default class registerScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    loading(val)
    {
        this.setState({loading:val})
    }
    render() {
        const loading = this.state.loading
        const login = this.props.navigation.state.params.login
        return (
            <Container>
                {loading ? <Spinner color='#303F9F' /> :
                    <RegisterForm login={login}
                            loading={(val)=>this.loading(val)}                    
                     />}
            </Container>
        );
    }
}