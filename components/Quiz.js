import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {getDecks} from "../selectors";

const Quiz = ({route, navigation}) => {
        const {title} = route.params;
        const [quiz, setQuiz] = useState([]);
        const [questionToShow, setQuestionToShow] = useState(0);
        const [showAnswer, setShowAnswer] = useState(false);
        const [isQuizFinished, setIsQuizFinished] = useState(false);
        const decks = useSelector(getDecks);

        const resetQuiz = () => {
            setQuiz(decks[title].questions.map((question, index) => ({
                index,
                question: question.question,
                answer: question.answer,
                isAnswered: false,
                isCorrect: false,
            })));
            setQuestionToShow(0);
            setShowAnswer(false);
            setIsQuizFinished(false);
        };

        useEffect(() => {
            resetQuiz();
        }, [title, decks]);

        useEffect(() => {
            if (quiz.length > 0) {
                setIsQuizFinished(quiz.every(q => q.isAnswered));
            }
        }, [quiz]);

        return (
            <View style={{marginTop: 30}}>
                {quiz.length > 0
                    ? <View>
                        {isQuizFinished
                            ?
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontSize: 36}}>Quiz Finished</Text>
                                <Text style={{
                                    fontSize: 36,
                                    color: 'red'
                                }}>Result: {Math.round(quiz.filter(q => q.isCorrect === true).length / quiz.length * 100)} %</Text>
                                <Text style={{fontSize: 16, marginTop: 100}} onPress={() => resetQuiz()}>Restart Quiz</Text>
                                <Text style={{fontSize: 16, marginTop: 20}} onPress={() => navigation.goBack()}>Back to
                                    Deck</Text>
                            </View>
                            :
                            <View>
                                <Text style={{fontSize: 18}}>{questionToShow + 1} / {quiz.length}</Text>
                                {quiz[questionToShow] &&
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text
                                        style={{fontSize: 36}}>{showAnswer ? quiz[questionToShow].answer : quiz[questionToShow].question}?</Text>
                                    {showAnswer
                                        ? <Text style={{color: 'red',}} onPress={() => setShowAnswer(false)}>Question</Text>
                                        : <Text style={{color: 'red',}} onPress={() => setShowAnswer(true)}>Answer</Text>
                                    }
                                    <TouchableOpacity onPress={() => {
                                        setQuiz([
                                            ...quiz.slice(0, questionToShow),
                                            Object.assign({}, quiz[questionToShow], {isAnswered: true, isCorrect: true}),
                                            ...quiz.slice(questionToShow + 1)
                                        ]);
                                        setQuestionToShow(questionToShow + 1);
                                    }}>
                                        <Text style={[styles.correctBtn, {alignSelf: 'center'}]}>Correct</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        setQuiz([
                                            ...quiz.slice(0, questionToShow),
                                            Object.assign({}, quiz[questionToShow], {isAnswered: true, isCorrect: false}),
                                            ...quiz.slice(questionToShow + 1)
                                        ]);
                                        setQuestionToShow(questionToShow + 1);
                                    }}>
                                        <Text style={[styles.incorrectBtn, {alignSelf: 'center'}]}>Incorrect</Text>
                                    </TouchableOpacity>
                                </View>
                                }
                            </View>
                        }
                    </View>
                    : <Text style={{fontSize: 36, color: 'red', textAlign: 'center'}}>Sorry, you cannot take a quiz
                        because there are no cards in the deck.
                    </Text>
                }
            </View>
        );
    }
;

const styles = StyleSheet.create({
        deckDetail: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 30,
        },
        correctBtn: {
            textAlign: 'center',
            color: '#fff',
            backgroundColor: 'green',
            padding: 10,
            height: 45,
            width: 100,
            marginTop: 10,
            borderRadius: 3,
            justifyContent: 'center',
        },
        incorrectBtn: {
            textAlign: 'center',
            color: '#fff',
            backgroundColor: 'red',
            padding: 10,
            height: 45,
            width: 100,
            marginTop: 10,
            borderRadius: 3,
            justifyContent: 'center',
        }
    }
);

export default Quiz;
