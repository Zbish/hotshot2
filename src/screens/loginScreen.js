import React, { Component } from 'react'
import Games from '../components/Games'
import { connect } from 'react-redux'
import { createUser, signInUser, facebookLogin } from '../redux/actions/actions'
import LoginForm from '../components/LoginForm'
import { Container, Spinner, Content } from 'native-base';
import {Image,StyleSheet} from 'react-native'
import hotshot from '../images/app/hotshot.png'

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
    facebook(user) {
        this.setState({ loading: true })
        this.props.facebookSignIn(user.uid).then(() => {
            this.props.navigation.navigate("HomeScreen");
            this.setState({ loading: false });
        })
    }
  
    render() {
        return (
            <Container style={{backgroundColor:'white'}} >
                <Content contentContainerStyle={styles.center}>
                    <Image source={hotshot} style={{width:200,height:200}}></Image>
                    {(!this.state.loading && !this.props.logged )?
                    <LoginForm
                        register={(email, password) => this.register(email, password)}
                        sign={(email, password) => this.sign(email, password)}
                        facebook={(user) => this.facebook(user)}
                    />:
                    <Spinner color='#303F9F' />}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    center: {
      alignItems: 'center',
      flex:1
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