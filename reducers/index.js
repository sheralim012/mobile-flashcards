import produce from 'immer';
import {ADD_CARD, ADD_DECK, DELETE_DECK, RECEIVE_DECKS} from "../actions";

const INITIAL_STATE = {
    decks: {},
}

const DeckReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                decks: action.payload,
            };
        case ADD_DECK:
            return {
                decks: {
                    ...state.decks,
                    [action.payload]: {
                        title: action.payload,
                        questions: [],
                    }
                }
            }
        case DELETE_DECK:
            let newDecks = Object.assign({}, state.decks);
            delete newDecks[action.payload]
            return {
                decks: newDecks,
            };
        case ADD_CARD:
            const {title, question, answer} = action.payload;
            return produce(state, draftState => {
                draftState.decks[title].questions.push({question, answer});
            });
        default:
            return state;
    }
};

export default DeckReducer;