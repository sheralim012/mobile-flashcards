import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DeckItem = ({navigation, deck}) => {
    return (
        <View>
            <Text style={styles.title} onPress={() => navigation.navigate('DeckDetails', {
                deck
            })}>{deck.title}</Text>
            <Text style={styles.cardsCount}>{deck.questions.length} cards</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default DeckItem;
