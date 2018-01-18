import _ from 'lodash';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'

this.ref = firebase.firestore()

export const withoutTime = function (ticks) {
  const d = new Date(ticks);
  d.setHours(0, 0, 0, 0);
  return d;
}
// render If 
export const renderIf = function (condition, content, login) {
  if (condition) {
    return content;
  } else {
    return login;
  }
}

// Calling the following function will open the FB login dialogue:
export const facebookLogin = () => {
  return LoginManager
    .logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (!result.isCancelled) {
        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
        // get the access token
        return AccessToken.getCurrentAccessToken()
      }
    })
    .then(data => {
      if (data) {
        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
        // login with credential
        return firebase.auth().signInWithCredential(credential)
      }
    })
    .then((currentUser) => {
      if (currentUser) {
        console.info(JSON.stringify(currentUser.toJSON()))
      }
    })
    .catch((error) => {
      console.log(`Login fail with error: ${error}`)
    })
}