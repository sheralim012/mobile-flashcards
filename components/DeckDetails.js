import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import DeckItem from "./DeckItem";
import * as API from "../utils/api";
import {deleteDeck} from "../actions";
import {getDecks} from "../selectors";

const DeckDetails = ({route, navigation}) => {
    const dispatch = useDispatch();
    const {title} = route.params;
    const [deck, setDeck] = useState(null);
    const decks = useSelector(getDecks);

    useEffect(() => {
        setDeck(decks[title]);
    }, [title, decks]);

    return (
        <View style={styles.deckDetail}>
            {deck && <DeckItem deck={deck}/>}
            <TouchableOpacity onPress={() => {
                navigation.navigate('AddCard', {title: deck.title})
            }} style={{marginTop: 50}}>
                <Text style={styles.addCardBtn}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Quiz', {title: deck.title});
            }}>
                <Text style={styles.startQuizBtn}>Start Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                API.deleteDeck(deck.title);
                dispatch(deleteDeck(deck.title));
                navigation.navigate('Home');
            }}>
                <Text style={styles.deleteDeckBtn}>Delete Deck</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    deckDetail: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30,
    },
    addCardBtn: {
        textAlign: 'center',
        color: '#000',
        backgroundColor: '#fff',
        padding: 10,
        height: 45,
        width: 100,
        marginTop: 10,
        borderRadius: 3,
        justifyContent: 'center',
    },
    startQuizBtn: {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#000',
        padding: 10,
        height: 45,
        width: 100,
        marginTop: 10,
        borderRadius: 3,
        justifyContent: 'center',
    },
    deleteDeckBtn: {
        textAlign: 'center',
        color: 'red',
        padding: 10,
        height: 45,
        width: 100,
        marginTop: 10,
        justifyContent: 'center',
    },
});

export default DeckDetails;
