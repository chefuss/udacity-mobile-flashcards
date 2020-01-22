import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, purple, white } from '../utils/colors'

export class Quiz extends Component {
    state =  {
        currentQuestion: 0,
        corrects: 0,
        wrong: 0,
        showingQuestion: true,
        total: 0
    }
    handleAnswer = (question, userAnswer) => {
        const { answer } = question
        if (answer.toLowerCase() === userAnswer) {
            this.setState({
                corrects: this.state.corrects + 1,
            })
        } else {
            this.setState({
                wrong: this.state.wrong + 1,
            })
        }
        this.setState({
            total: this.state.total + 1
        })
       
        this.setState({
            showingQuestion: true,
            currentQuestion: this.state.currentQuestion + 1,
        })
    }
    resetQuiz = (state) => {
        this.setState({
            currentQuestion: 0,
            corrects: 0,
            wrong: 0,
            showingQuestion: true,
            total: 0
        });
    }

    render() {
        const { deck } = this.props
        const questions = deck.questions;
        const question = questions[this.state.currentQuestion]
        if (questions.length === 0 ) {
            return (
                <View style={styles.container}>
                    <Text style={styles.heading}>There are no cards for this Deck</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCard', {deck})}>
                        <Text>Add Card to deck</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        if (this.state.total === questions.length) {
            const { corrects, wrong } = this.state
            return (
                <View style={styles.container}>
                    <Text style={styles.heading}>Should show results</Text>
                    <View style={styles.section}>
                        <Text>Total of correct questions: {corrects}</Text>
                        <Text>Total of wrong questions: {wrong}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.correctBtn} onPress={() => this.resetQuiz(this.state)}>
                            <Text style={styles.btnText}>Reset quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.correctBtn} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.btnText}>Go back to deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.heading}>{deck.title}</Text>
                    <View>
                        <Text style={{fontSize: 18, color: gray}}>Card {this.state.currentQuestion + 1} of { questions.length }</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    {
                        this.state.showingQuestion === true ?
                        <View style={styles.section}>
                            <Text style={{fontSize: 18, color: gray}}>Question:</Text>
                            <Text style={styles.question}>{question.question}</Text>
                        </View>
                         :
                         <View style={styles.section}>
                         <Text style={{fontSize: 18, color: gray}}>Answer:</Text>
                         <Text style={styles.question}>{question.answer}</Text>
                     </View>
                    }
                </View>
                <View style={styles.section}>
                    <TouchableWithoutFeedback onPress={()=> this.setState({showingQuestion: !this.state.showingQuestion })}>
                        {
                            this.state.showingQuestion === true ?
                            <Text>Show answer</Text> :
                            <Text>Show question</Text>
                        }
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.correctBtn} onPress={() => this.handleAnswer(question, 'true')}>
                        <Text style={styles.btnText}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.wrongBtn} onPress={() => this.handleAnswer(question, 'false')}>
                        <Text style={styles.secondaryText}>Wrong</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
    section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    question: {
        fontSize: 32,
        color: purple
    },
    heading: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom:10,
    },
    correctBtn: {
        backgroundColor: purple,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 7,
        minWidth: 250,
        marginTop: 10,
        marginBottom: 10 
    },
    wrongBtn: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 3,
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
    secondaryText: {
        color: purple,
        textAlign: 'center',
        fontSize: 21
    }
})
function mapStateToProps(state, ownProps) {
    return { deck: ownProps.navigation.state.params.deck };
}

export default connect(mapStateToProps)(Quiz)