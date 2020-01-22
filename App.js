import React, { Component } from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers'
import MainNavigation from './components/MainNavigation'
import { AddDeck } from './components/AddDeck';
import { white } from './utils/colors';
import { setLocalNotification } from './utils/notifications'


export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={{ flex: 1 }} >
          <MainNavigation />
        </View>
      </Provider>
    )
  }
}