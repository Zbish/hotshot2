import React, { Component } from 'react';
import { View } from 'react-native'
import { LoginButton, AccessToken } from 'react-native-fbsdk'

export default class FacebookLoginButton extends Component {

    render() {
        return (
            <View>
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("Login failed with error: " + result.error);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                AccessToken.getCurrentAccessToken().then(token =>{
                                    this.props.facebook(token)
                                })
                                    .catch((error) => {
                                        console.log(`Login fail with error: ${error}`)
                                    })
                            }
                        }
                    }
                    onLogoutFinished={() => alert("User logged out")} />
            </View>
        );
    }
}
