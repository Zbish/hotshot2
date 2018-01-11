import React from 'react';
import { StyleSheet, Image, Text, View, Button, FlatList } from 'react-native';
import _ from 'lodash';
import Game from './src/components/Game';
import RootNavigator from './src/screens/navigator'
import { addNavigationHelpers } from "react-navigation";
import { connect, Provider } from 'react-redux';
import configureStore from './src/redux/configureStore'

const store = configureStore()

const AppWithNavigationState = connect(state => {
  return {
    nav: state.nav,
  }
})(({ dispatch, nav }) => (
  <RootNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
));

class App extends React.Component {
 
  // addData() {
  //   this.ref.add({
  //     team2: 'D2',
  //     team1: 'D1',
  //     match: 7,
  //     group: 'D',
  //     date: 'June 16 2018 16:00',
  //     stadium: 'Spartak(Moscow)',
  //     score: {
  //       team2: 0,
  //       team1: 0
  //     }
  //   });
  // }

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
      // <View style={styles.container}>
      //   {/* <FlatList
      //     data={games}
      //     extraData={this.state}
      //     renderItem={({ item }) => <Game item={item} />}
      //     keyExtractor={(item, index) => index}
      //   /> */}
      //   {/* <Button title={'add'} onPress={()=>this.addData()}></Button> */}
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },

});

export default App;
