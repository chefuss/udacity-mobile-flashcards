import React, { Component } from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../actions'
import { getDecks } from '../utils/api'
import { purple, white } from '../utils/colors'
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
      <SafeAreaView style={styles.container}>
        <FlatList
        data={Object.values(decks)}
        renderItem={({item}) => <Deck title={item.title} navigateToDeckDetails={this.navigateToDeckDetails}/>}
        keyExtractor={this._keyExtractor}
        />
        <View>
            <TouchableOpacity style={styles.primaryBtn} onPress={()=> this.props.navigation.navigate('AddDeck')}>
                <Text style={styles.btnText}>Add a Deck</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    padding: 10
  },
  primaryBtn: {
    backgroundColor: purple,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 7,
    minWidth: 250,
    marginTop: 10,
    marginBottom: 10 
  },
  btnText: {
      color: white,
      textAlign: 'center',
      fontSize: 21
  }
});

function mapStateToProps (decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(Dashboard)