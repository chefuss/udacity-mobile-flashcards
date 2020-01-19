import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Dashboard from './components/Dashboard'

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <View style={{ flex: 1 }} >
          <Dashboard />
        </View>
      </Provider>
    )
  }
}