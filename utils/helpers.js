import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

export const STORAGE_KEY = 'mobile-flashcards:storage'
export const NOTIFICATION_KEY = 'mobile-flashcards:notification2'

const setDummyData = () => {
    const dummyData = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        },
        PHP: {
            title: 'PHP',
            questions: [
                {
                    question: 'Q1',
                    answer: 'A1',
                },
                {
                    question: 'Q2',
                    answer: 'A2',
                },
                {
                    question: 'Q3',
                    answer: 'A3',
                },
            ]
        },
        Python: {
            title: 'Python',
            questions: [
                {
                    question: 'Q1',
                    answer: 'A1',
                },
                {
                    question: 'Q2',
                    answer: 'A2',
                },
                {
                    question: 'Q3',
                    answer: 'A3',
                },
            ]
        },
    };

    AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(dummyData),
    );

    return dummyData;
};

export const formatDecks = decks => {
    return decks === null ? setDummyData() : JSON.parse(decks);
}

export const setExpoToken = token => {
    return AsyncStorage.setItem(
        NOTIFICATION_KEY,
        JSON.stringify(token),
    );
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function schedulePushNotification() {
    const trigger = new Date(Date.now() + 24 * 60 * 60 * 1000);
    trigger.setHours(20);
    trigger.setMinutes(0);
    trigger.setSeconds(0);

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Don't forget to Study",
            body: 'Don\'t forget to take a quiz today.',
        },
        trigger,
    });
}

export async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
