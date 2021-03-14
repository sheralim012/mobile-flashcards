import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatDecks, STORAGE_KEY} from './helpers'

export const fetchDecks = () => {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(formatDecks)
};

export const addDeck = title => {
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: [],
        }
    }))
}

export const deleteDeck = title => {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(decks => {
            const data = JSON.parse(decks)
            data[title] = undefined
            delete data[title]
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
}

export const addCard = (title, question, answer) => {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(decks => {
            const data = JSON.parse(decks)
            data[title].questions = [...data[title].questions, {question, answer}]
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
};