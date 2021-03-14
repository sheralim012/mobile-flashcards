import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DeckList from "./components/DeckList";
import DeckDetails from "./components/DeckDetails";
import store from "./utils/store";
import AddCard from "./components/AddCard";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddDeck from "./components/AddDeck";
import Quiz from "./components/Quiz";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: {
                    fontSize: 18,
                    paddingBottom: 10
                },
            }}
        >
            <Tab.Screen name="DeckList" options={{title: 'Decks'}} component={DeckList}/>
            <Tab.Screen name="AddDeck" options={{title: 'Add Deck'}} component={AddDeck}/>
        </Tab.Navigator>
    );
};

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home}/>
                    <Stack.Screen
                        name="DeckDetails"
                        component={DeckDetails}
                        options={({route}) =>
                            ({title: route.params.title})}
                    />
                    <Stack.Screen name="AddCard" options={{title: 'Add Card'}} component={AddCard}/>
                    <Stack.Screen name="Quiz" options={{title: 'Quiz'}} component={Quiz}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
};

export default App;
