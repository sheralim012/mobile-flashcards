import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {addDeck} from "../actions";
import * as API from '../utils/api';

const AddDeck = ({navigation}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    return (
        <View>
            <Text style={{fontSize: 30, textAlign: 'center', marginTop: 30}}>What is the title of your new deck?</Text>
            <TextInput style={styles.input} placeholder='Deck Title' value={title} onChangeText={setTitle}/>
            <TouchableOpacity onPress={() => {
                dispatch(addDeck(title));
                API.addDeck(title);
                setTitle('');
                navigation.navigate('DeckDetails', {title: title});
            }}>
                <Text style={[styles.addDeckBtn, {alignSelf: 'center'}]}>Create Deck</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        margin: 20,
    },
    addDeckBtn: {
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
});

export default AddDeck;
