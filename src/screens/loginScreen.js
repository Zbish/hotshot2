import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import Games from '../components/Games'
import { connect } from 'react-redux'
import { createUser, signInUser, facebookLogin } from '../redux/actions/actions'
import LoginForm from '../components/LoginForm'

class loginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false
        };
    }
    register(email, password) {
        this.setState({loading:true})
        this.props.create(email, password).then(() => {
            this.props.navigation.navigate("HomeScreen");
            this.setState({loading:false})
        })
    }
    sign(email, password) {
        this.setState({loading:true})
        this.props.signIn(email, password).then(() => {
            this.props.navigation.navigate("HomeScreen");
            this.setState({loading:false})
        })
    }
    facebook() {
        this.setState({loading:true})
        this.props.facebookSignIn().then(() => {
            this.props.navigation.navigate("HomeScreen");
            setTimeout(()=>{this.setState({loading:false})}, 1000); 
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    {this.state.loading && <ActivityIndicator size="large" color="#FF5722" style={styles.indicator} />}
                    {!this.state.loading && <LoginForm
                        register={(email, password) => this.register(email, password)}
                        sign={(email, password) => this.sign(email, password)}
                        facebook={() => this.facebook()}
                    />}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#F5FCFF',
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
        facebookSignIn: () => dispatch(facebookLogin())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(loginScreen)