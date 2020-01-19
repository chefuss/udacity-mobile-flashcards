import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { getAllDecks } from '../actions'
import { getDecks } from '../utils/api';

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
    render() {
        const decks = this.props
        return (
            <View style={styles.container}>
                <Text>Dashboard</Text>
                <Text>{JSON.stringify(decks)}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

function mapStateToProps (decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(Dashboard)