import React, { Component } from 'react'
import Games from '../components/Games'
import { connect } from 'react-redux'
import { createUser, signInUser, facebookLogin } from '../redux/actions/actions'
import LoginForm from '../components/LoginForm'
import { Container, Spinner, Content } from 'native-base';

class loginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }
    register(email, password) {
        this.setState({ loading: true })
        this.props.create(email, password).then(() => {
            this.props.navigation.navigate("HomeScreen");
            this.setState({ loading: false })
        })
    }
    sign(email, password) {
        this.setState({ loading: true })
        this.props.signIn(email, password).then(() => {
            this.props.navigation.navigate("HomeScreen");
            this.setState({ loading: false })
        })
    }
    facebook() {
        this.setState({ loading: true })
        this.props.facebookSignIn().then(() => {
            this.props.navigation.navigate("HomeScreen");
            this.setState({ loading: false });
        })
    }
    render() {
        return (
            <Container>
                <Content>
                    {(!this.state.loading && !this.props.logged )?
                    <LoginForm
                        register={(email, password) => this.register(email, password)}
                        sign={(email, password) => this.sign(email, password)}
                        facebook={() => this.facebook()}
                    />:
                    <Spinner color='#303F9F' />}
                </Content>
            </Container>
        );
    }
}

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
        facebookSignIn: () => dispatch(facebookLogin())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(loginScreen)