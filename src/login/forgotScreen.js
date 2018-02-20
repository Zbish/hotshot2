import React, { Component } from 'react';
import { Container, Content, Text, Spinner } from 'native-base'
import  ForgotForm from './ForgotForm'
import {passwordResetMail} from './loginAction'

export default class forgotScreen extends Component {
    passwordReset(email){
        console.log('email' , email)
        passwordResetMail(email)
    }
    render() {
        return (
            <Container>
               <ForgotForm reset={(email)=>this.passwordReset(email)} />
            </Container>
        );
    }
}