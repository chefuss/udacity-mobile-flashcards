import React, { Component } from 'react'
import { SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../actions'
import { getDecks } from '../utils/api'
import Deck from './Deck'
import DeckDetails from './DeckDetails'
import AddCards from './AddCard'
import AddDeck from './AddDeck'
import { AppLoading } from 'expo'
import Constants from 'expo-constants'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export class Dashboard extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
    .then(decks => dispatch(getAllDecks(decks)))
    .then(() => this.setState(() => ({ ready: true})))
  }
  _keyExtractor = (item, index) => `list-item-${index}`;

  navigateToDeckDetails= (deck) => {
    this.props.navigation.navigate('DeckDetails', {deck})
  }
  render() {
    const {decks} = this.props
    const { ready } = this.state
    if (ready === false ) {
      return <AppLoading />
    }
    return (
      <FlatList
        style={styles.container}
        data={Object.values(decks)}
        renderItem={({item}) => <Deck title={item.title} navigateToDeckDetails={this.navigateToDeckDetails}/>}
        keyExtractor={this._keyExtractor}
      />
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    padding: 10
  }
});

function mapStateToProps (decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(Dashboard)