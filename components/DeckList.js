import React, {useEffect, useState,} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {fetchDecks} from "../utils/api";
import {receiveDecks} from "../actions";
import {getDecks} from "../selectors";
import {registerForPushNotificationsAsync, setExpoToken} from "../utils/helpers";

const DeckList = ({navigation}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        registerForPushNotificationsAsync()
            .then(setExpoToken);
    }, []);
    useEffect(() => {
        fetchDecks().then(data => {
            dispatch(receiveDecks(data))
        });
    }, [dispatch]);
    const decks = useSelector(getDecks)

    return (
        <View style={{flex: 1}}>
            {decks &&
            <FlatList data={Object.values(decks)} renderItem={({item}) =>
                <View style={styles.deckList}>
                    <Text style={styles.title}
                          onPress={() => navigation.navigate('DeckDetails', {title: item.title})}>{item.title}</Text>
                    <Text style={styles.cardsCount}>{item.questions.length} cards</Text>
                </View>
            }/>}
        </View>
    );
}

const styles = StyleSheet.create({
    deckList: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardsCount: {
        fontSize: 16,
        textAlign: 'center',
    }
});

export default DeckList;