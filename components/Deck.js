import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Api from '../utils/api'
import { clearNotification, setLocalNotifications } from '../utils/helpers'

function Deck(props) {
  const { deck } = props;

  const navigateAddCard = () => {
    props.navigation.navigate('Add Card', { deck: deck.title })
  }

  const navigateDeckQuiz = () => {
    clearNotification().then(setLocalNotifications)
    props.navigation.navigate('DeckQuiz', { cards: deck.questions })
  }


  return (
    <View style={styles.container}>
      {deck && (
        <View>
          <Text style={styles.cardTitle}>{deck.title}</Text>
          <Text style={styles.cardSubtitle}>
            Cards: {deck && deck.questions.length}
          </Text>
          <TouchableOpacity activeOpacity="0.6" onPress={navigateAddCard}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add Card</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity="0.6" onPress={navigateDeckQuiz}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Take Quiz</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function mapStateToProps({ decks }, props) {
  const { deck } = props.route.params

  return {
    deck: decks[deck]
  }
}
export default connect(mapStateToProps)(Deck)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 50,
  },
  button: {
    marginTop: 5,
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: 'black',
    padding: 10,
  },
  buttonText: {
    color: 'white',
  }
});
