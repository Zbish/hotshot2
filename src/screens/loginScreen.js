import React, { Component } from 'react'
import Games from '../components/Games'
import { connect } from 'react-redux'
import { createUser, signInUser, facebookLogin } from '../redux/actions/actions'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { Container, Spinner, Content, Card, CardItem, Text, Button } from 'native-base';
import { Image, StyleSheet } from 'react-native'
import hotshot from '../images/app/hotshot.png'
import FacebookLoginButton from '../components/FacebookLoginButton'

class loginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            form: 1
        };
    }
    register(email, password) {
        this.setState({ loading: true })
        this.props.create(email, password).then((user) => {
            if (user) {
                this.props.navigation.navigate("HomeScreen");
                this.setState({ loading: false })
            } else { this.setState({ loading: false }) }
        })
    }
    sign(email, password) {
        this.setState({ loading: true })
        this.props.signIn(email, password).then((user) => {
            if (user) {
                this.props.navigation.navigate("HomeScreen");
                this.setState({ loading: false })
            } else { this.setState({ loading: false }) }

        })
    }
    facebook(user) {
        this.setState({ loading: true })
        this.props.facebookSignIn(user.uid).then(() => {
            this.props.navigation.navigate("HomeScreen");
            this.setState({ loading: false });
        })
    }
    renderRegister() {
        this.setState({ form: 2 })
    }
    renderSign() {
        this.setState({ form: 1 })
    }
    renderForgot() {
        this.setState({ form: 2 })
    }
    render() {
        return (
            <Container style={{ backgroundColor: 'white' }} >
                <Image source={hotshot} style={{ width: 200, height: 200, alignSelf: 'center' }}></Image>
                <Content contentContainerStyle={styles.center}>
                    {(!this.state.loading && !this.props.logged) ?
                        <Card>
                            <CardItem>
                                {
                                    (this.state.form === 1) ?
                                        <LoginForm
                                            sign={(email, password) => this.sign(email, password)}
                                            renderRegister={() => this.renderRegister()}
                                        /> :
                                        <RegisterForm
                                            register={(email, password) => this.register(email, password)}
                                            renderSign={() => this.renderSign()}
                                        />
                                }
                            </CardItem>
                            <CardItem style={{ flexDirection: 'column' }}>
                                <Text style={{ margin: 5, fontSize: 15, color: 'grey' }} >OR</Text>
                                <FacebookLoginButton facebook={(user) => this.facebook(user)} />
                            </CardItem>
                        </Card> :
                        <Spinner color='#303F9F' />}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1
    },
});

function mapStateToProps(state) {
    return {
        logged: state.login.user,
        loading: state.login.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        create: (email, password) => dispatch(createUser(email, password)),
        signIn: (email, password) => dispatch(signInUser(email, password)),
        facebookSignIn: (uid) => dispatch(facebookLogin(uid))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(loginScreen)