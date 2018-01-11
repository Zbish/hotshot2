import React from 'react';
import _ from 'lodash';
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

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
export default App;
