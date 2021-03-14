export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        payload: decks,
    }
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        payload: title,
    }
}

export function deleteDeck(title) {
    return {
        type: DELETE_DECK,
        payload: title,
    }
}

export function addCard(data) {
    return {
        type: ADD_CARD,
        payload: data,
    }
}
