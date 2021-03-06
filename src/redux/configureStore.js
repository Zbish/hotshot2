// configureStore.js
import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import RootStackNavigator from '../screens/navigator';
import {StackNavigator } from "react-navigation";


export default function configureStore() {

  const navReducer = (state, action) => {
    const nextState = RootStackNavigator.router.getStateForAction(action, state);
    return nextState || state;
  };

  const appReducer = combineReducers({
    nav: navReducer,
    ...rootReducer
  });

  let store = createStore(appReducer,applyMiddleware(thunk))
  return store
}