import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createUser, signInUser, facebookLogin, user } from '../redux/actions/actions'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { Container, Spinner, Content, Card, CardItem, Text } from 'native-base';
import { Image, StyleSheet } from 'react-native'
import hotshot from '../images/app/hotshot.png'


class loginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            form: 1
        };
    }

    handler(func) {
        this.setState({ loading: true })
        func.then((user) => {
            if (user) {
                this.setState({ loading: false })
                this.props.navigation.navigate("HomeScreen");
            } else { this.setState({ loading: false }) }
        })
    }
    componentWillMount() {
        this.isLogged()
    }


    isLogged() {
        this.handler(this.props.user())
    }
    register(email, password,name) {
        this.handler(this.props.createUser(email, password,name))
    }
    sign(email, password) {
        this.handler(this.props.signIn(email, password))
    }
    facebook(token) {
        this.handler(this.props.facebookLogin(token))
    }


    renderRegister() {
        this.setState({ form: 2 })
    }
    renderSign() {
        this.setState({ form: 1 })
    }
    renderForgot() {
        this.setState({ form: 3 })
    }

    render() {
        const form = this.state.form
        const loading = this.state.loading
        const logged = this.props.logged
        return (
            <Container style={{ backgroundColor: 'white', flex: 1 }} >
                <Image source={hotshot} style={styles.image}></Image>
                <Content contentContainerStyle={styles.center}>
                    {(!loading && !logged) ?
                        <Card >
                            {
                                (form === 1) ?
                                    <LoginForm
                                        sign={(email, password) => this.sign(email, password)}
                                        renderRegister={() => this.renderRegister()}
                                    /> :
                                    <RegisterForm
                                        register={(email, password,name) => this.register(email, password,name)}
                                        renderSign={() => this.renderSign()}
                                    />
                                    
                            }
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
        createUser: (email, password,name) => dispatch(createUser(email, password,name)),
        signIn: (email, password) => dispatch(signInUser(email, password)),
        facebookLogin: (uid) => dispatch(facebookLogin(uid)),
        user: () => dispatch(user())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(loginScreen)