import React, { Component } from 'react'
import { Image, StyleSheet,StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { initialApp, sign } from '../redux/actions/actions'
import { user, createUser, signInUser, facebookLogin } from './loginAction'
import LoginForm from './LoginForm'
import { Container, Spinner, Content, Card, CardItem, Text } from 'native-base';
import hotshot from '../images/app/hotshot.png'

class loginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    login(user) {
        if (user) {
            this.props.initialApp(user.uid).then(() => {
                this.props.sign()
                if (user.providerData[0].providerId === "facebook.com") {
                    this.props.navigation.navigate("HomeScreen", { provider: undefined })
                }
                else {
                    this.props.navigation.navigate("HomeScreen", { provider: 1 })
                }
            })
        } else { this.setState({ loading: false }) }
    }
    componentWillMount() {
        this.isLogged()
    }


    isLogged() {
        this.setState({ loading: true })
        user().then(user => this.login(user))
    }
    sign(email, password) {
        this.setState({ loading: true })
        signInUser(email, password).then(user => this.login(user))
    }
    facebook(token) {
        this.setState({ loading: true })
        facebookLogin(token).then(user => this.login(user))
    }


    renderRegister() {
        this.props.navigation.navigate("Register", { login: (user) => this.login(user) })
    }
    renderForgot() {
        this.props.navigation.navigate("Forgot")
    }

    render() {
        const form = this.state.form
        const loading = this.state.loading
        const logged = this.props.logged
        return (
            <Container style={{ backgroundColor: 'white', flex: 1 }} >
                 <StatusBar
                    backgroundColor="#A41312"
                    barStyle="light-content"
                />
                <Image source={hotshot} style={styles.image}></Image>
                <Content contentContainerStyle={styles.center}>
                    {(!loading && !logged) ?
                        <Card >
                            <LoginForm
                                sign={(email, password) => this.sign(email, password)}
                                renderRegister={() => this.renderRegister()}
                                renderForgot={() => this.renderForgot()}
                                facebook={(token) => this.facebook(token)}
                            />
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
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    }
});

function mapStateToProps(state) {
    return {
        logged: state.login.user,
        loading: state.login.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        initialApp: (uid) => dispatch(initialApp(uid)),
        sign: () => dispatch(sign())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(loginScreen)