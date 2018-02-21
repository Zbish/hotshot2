import React, { Component } from 'react';
import { Container, Content, Text, Spinner } from 'native-base'
import ForgotForm from './ForgotForm'
import { passwordResetMail } from './loginAction'

export default class forgotScreen extends Component {
    passwordReset(email) {
        passwordResetMail(email).then((action) => {
            if (action.status === 'aborted') {
                alert("User Not Found For " + email);
            } else {
                alert("Reset Email Sent To  " + email);
            }

        })
    }
    render() {
        return (
            <Container>
                <ForgotForm reset={(email) => this.passwordReset(email)} />
            </Container>
        );
    }
}