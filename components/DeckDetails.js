import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { gray, purple, white } from '../utils/colors'

export class DeckDetails extends Component {
    static navigationOptions = {
        title: 'Deck Details'
      }
    render() {
        const { deck } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={{fontSize: 32, marginTop: 10, marginBottom: 5}}>{deck.title}</Text>
                    <Text style={{color: gray, fontSize: 18}}>{deck.questions.length} cards</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.primaryBtn} onPress={()=> console.log('go to quiz')}>
                        <Text style={styles.btnText}>Take a Quiz</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.secondaryBtn} onPress={()=> this.props.navigation.navigate('AddCard', {deck})}>
                        <Text style={styles.secondaryText}>Add a card</Text>
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
    secondaryBtn: {
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
    return { deck: state[ownProps.navigation.state.params.deck] };
}
export default connect(mapStateToProps)(DeckDetails)