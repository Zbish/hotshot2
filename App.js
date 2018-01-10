import React from 'react';
import { StyleSheet, Platform, Image, Text, View,Button } from 'react-native';

import firebase from 'react-native-firebase';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
      
    };
    this.ref = firebase.firestore().collection('gamesSchedule')
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
}

componentWillUnmount() {
    this.unsubscribe();
}
onCollectionUpdate = (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log('we got data' , doc.data())
  })
  // querySnapshot.docChanges.forEach((doc) => {
  //   console.log('we got data' , doc)
  // })
  // console.log('2222' , querySnapshot.data())
}
  AddData(){
    this.ref.add({
      title: 'game number 10',
      complete: false,
      time:'12/5/1254',
      test:'ok'
    });
  }
  getData(){
    console.log('sagsua')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/RNFirebase512x512.png')} style={[styles.logo]} />
        <Text style={styles.welcome}>
          hello firebase
        </Text>
        <Button title={'add'} onPress={()=>this.addData()}></Button>
        <Button title={'get'} onPress={ ()=>this.getData()}></Button>
        {/* <View style={styles.modules}>
          <Text style={styles.modulesHeader}>The following Firebase modules are enabled:</Text>
          {firebase.admob.nativeModuleExists && <Text style={styles.module}>Admob</Text>}
          {firebase.analytics.nativeModuleExists && <Text style={styles.module}>Analytics</Text>}
          {firebase.auth.nativeModuleExists && <Text style={styles.module}>Authentication</Text>}
          {firebase.crash.nativeModuleExists && <Text style={styles.module}>Crash Reporting</Text>}
          {firebase.firestore.nativeModuleExists && <Text style={styles.module}>Cloud Firestore</Text>}
          {firebase.messaging.nativeModuleExists && <Text style={styles.module}>Messaging</Text>}
          {firebase.perf.nativeModuleExists && <Text style={styles.module}>Performance Monitoring</Text>}
          {firebase.database.nativeModuleExists && <Text style={styles.module}>Realtime Database</Text>}
          {firebase.config.nativeModuleExists && <Text style={styles.module}>Remote Config</Text>}
          {firebase.storage.nativeModuleExists && <Text style={styles.module}>Storage</Text>}
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
