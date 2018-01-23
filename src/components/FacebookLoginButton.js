import React, { Component } from 'react';
import { View } from 'react-native'
import { LoginButton, AccessToken } from 'react-native-fbsdk'
import firebase from 'react-native-firebase'
this.ref = firebase.firestore()

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

                                AccessToken.getCurrentAccessToken().then(data => {
                                    if (data) {
                                        // create a new firebase credential with the token
                                        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                                        // login with credential
                                        return firebase.auth().signInWithCredential(credential)
                                    }
                                })
                                    .then((currentUser) => {
                                        if (currentUser) {
                                                this.props.facebook(currentUser)
                                                                                }
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
