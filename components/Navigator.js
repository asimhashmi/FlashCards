import * as React from 'react';
import { StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DeckList from './DeckList';
import NewDeck from './NewDeck';
import AddCard from './AddCard';
import DeckQuiz from './DeckQuiz';
import Deck from './Deck';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Your Decks" component={DeckList} />
      <Stack.Screen
        name="DeckQuiz"
        component={DeckQuiz}
        options={{ title: 'Quiz' }}
      />
      <Stack.Screen
        name="Deck"
        component={Deck}
        options={({ route }) => ({ title: route.params.deck })}
      />

      <Stack.Screen name="Add Card" component={AddCard} />
    </Stack.Navigator>
  );
}

export default function Navigator({ decks, handleAddQuestion }) {
  return (
    <React.Fragment>
      <StatusBar barStyle="default" backgroundColor="black" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Decks"
            component={Stacks}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cards" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Add Deck"
            component={NewDeck}
            options={{
              tabBarIcon: ({ color }) => (
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
}
