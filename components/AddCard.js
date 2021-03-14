import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {addCard} from "../actions";
import * as API from '../utils/api';

const AddCard = ({route, navigation}) => {
    const {title} = route.params;
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    return (
        <View>
            <TextInput style={styles.input} placeholder='Question' value={question} onChangeText={setQuestion}/>
            <TextInput style={styles.input} placeholder='Answer' value={answer} onChangeText={setAnswer}/>
            <TouchableOpacity onPress={() => {
                dispatch(addCard({
                    title,
                    question,
                    answer,
                }));
                API.addCard(title, question, answer);
                setQuestion('');
                setAnswer('');
                navigation.goBack();
            }}>
                <Text style={[styles.addCardBtn, {alignSelf: 'center'}]}>Add Card</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        margin: 20,
    },
    addCardBtn: {
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

export default AddCard;
