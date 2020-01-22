import React, {Component} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView} from 'react-native'
import { gray, purple, white } from '../utils/colors'
import { addNewCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'

export class AddCard extends Component {
    static navigationOptions = {
        title: 'Add Card'
      }
    state = {
        question: '',
        answer: ''
    }
    handleAddQuestion = (input) => {
        this.setState({
            question: input
        })
    }
    handleAddAnswer = (input) => {
        this.setState({
            answer: input
        })
    }
    onPressButton = () => {
        const { question, answer } = this.state

        const deckId = this.props.navigation.state.params.deck
        this.props.createNewCard(deckId, {question, answer})
        addCardToDeck(deckId, {question, answer})
        this.setState({
            question: '',
            answer: ''
        })
        //return to deck.
        this.props.navigation.navigate('DeckDetails', deckId)
    }
    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.heading}>Add a new card to your mobileFlashCards!</Text>
                <TextInput
                    onChangeText={this.handleAddQuestion}
                    placeholder={'add your question here'}
                    style={styles.input}>
                </TextInput>
                <TextInput
                    onChangeText={this.handleAddAnswer}
                    placeholder={'add your answer here: the questions is true or false'}
                    style={styles.input}>
                </TextInput>
                <TouchableOpacity style={styles.primaryBtn} onPress={this.onPressButton}>
                    <Text style={styles.btnText}>Add Card</Text>
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
    createNewCard: (deckId, question, answer) => 
        dispatch(addNewCard(deckId, question, answer))
})
export default connect(null, mapDispatchToProps)(AddCard)