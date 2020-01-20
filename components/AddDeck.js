import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native'
import { gray, purple, white } from '../utils/colors'
import { addNewDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'

export class AddDeck extends Component {
    state = {
        deckTitle: ''
    }
    handleAddTitle = (input) => {
        this.setState({
            deckTitle: input
        })
    }
    onPressButton = () => {
        const { deckTitle } = this.state
        this.props.createNewDeck(deckTitle)
        saveDeckTitle(deckTitle)
        this.setState({
            deckTitle: ''
        })
        //return to home.
        this.props.navigation.navigate('Home')
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.heading}>Add a new deck</Text>
                <TextInput
                    onChangeText={this.handleAddTitle}
                    placeholder={'add your decktitle here'}
                    style={styles.input}>
                </TextInput>
                <TouchableOpacity style={styles.primaryBtn} onPress={this.onPressButton}>
                    <Text style={styles.btnText}>Add Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
    },
    heading: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom:10,
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
    },
    input: {
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 2,
        borderColor: gray,
        borderRadius: 8,
    }
})

const mapDispatchToProps = dispatch => ({
    createNewDeck: (title) => 
        dispatch(addNewDeck(title))
})
export default connect(null, mapDispatchToProps)(AddDeck)