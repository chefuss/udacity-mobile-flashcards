import React, { Component } from 'react'
import { SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../actions'
import { getDecks } from '../utils/api'
import Deck from './Deck'
import DeckDetails from './DeckDetails'
import { AppLoading } from 'expo'
import Constants from 'expo-constants'

export class Dashboard extends Component {
  state = {
    ready: false
  }

  componentDidMount() {
    const { dispatch } = this.props
    getDecks()
    .then(decks => dispatch(getAllDecks(decks)))
    .then(() => this.setState(() => ({ ready: true})))
  }
  _keyExtractor = (item, index) => index;
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
        renderItem={({item}) => <DeckDetails title={item.title} />}
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