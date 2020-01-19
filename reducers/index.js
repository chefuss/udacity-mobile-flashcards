import { GET_ALL_DECKS, ADD_NEW_DECK, ADD_NEW_CARD, REMOVE_DECK } from '../actions'

export default function decks(state = {}, action) {
    switch (action.type) {
        case GET_ALL_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_NEW_DECK:
            const title = action
            return {
                ...state,
                [title]: {
                    title,
                    questions: []
                }
            }
        case ADD_NEW_CARD:
            const { deckId, cardInfo } = action
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    questions: [...state[deckId].questions].concat(cardInfo)
                }
            }
    }
}