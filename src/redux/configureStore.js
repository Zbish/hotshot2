// configureStore.js
import { createStore, combineReducers } from 'redux'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import RootStackNavigator from '../screens/navigator';
import {StackNavigator } from "react-navigation";
import firebase from 'react-native-firebase';


export default function configureStore() {

  const navReducer = (state, action) => {
    const nextState = RootStackNavigator.router.getStateForAction(action, state);
    return nextState || state;
  };

  const appReducer = combineReducers({
    nav: navReducer,
    ...rootReducer
  });

  let store = createStore(appReducer)
  return store
}