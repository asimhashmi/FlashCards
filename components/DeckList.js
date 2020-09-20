import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as API from '../utils/api';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { setLocalNotifications } from '../utils/helpers'

function DeckList({ decks, navigation }) {
  setLocalNotifications()
  return (
    <ScrollView>
      {Object.values(decks).map((deck) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Deck', { deck: deck.title })}>
          <View style={styles.deck}>
            <Text style={styles.deckTitle}>{deck.title}</Text>
            <Text style={styles.cards}>Cards: {deck.questions.length}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function mapStateToProps({ decks }) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckList);
const styles = StyleSheet.create({
  deck: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 20,
  },
  cards: {
    fontSize: 10,
  },
});
