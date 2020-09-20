import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

export default class DeckQuiz extends Component {
  state = {
    currentQuestion: 0,
    cardFlipped: false,
    showResults: false,
    correctAnswers: 0,
  };

  flipCard = () => {
    this.setState((state) => ({ cardFlipped: !state.cardFlipped }));
  };

  gotToNextCard = (answer) => {
    const { cards } = this.props.route.params;
    this.setState((state) => ({
      currentQuestion: state.currentQuestion + 1,
      cardFlipped: false,
      correctAnswers: answer ? state.correctAnswers + 1 : state.correctAnswers,
      showResults: cards.length == state.currentQuestion + 1,
    }));
  };

  resetQuiz = () => {
    this.setState({
      currentQuestion: 0,
      cardFlipped: false,
      showResults: false,
      correctAnswers: 0,
    });
  };

  render() {
    const { cards } = this.props.route.params;
    const { showResults, cardFlipped, currentQuestion } = this.state;
    let card = null;
    if (cards.length == 0) {
      return (
        <View style={styles.container}>
          <Text style={{ marginTop: '50%', fontSize: 15, fontWeight: 'bold' }}>
            There are no cards for the quiz
          </Text>
        </View>
      );
    } else {
      card = cards[currentQuestion];
    }

    return (
      <View style={styles.container}>
        {cards.length && !showResults && (
          <View style={{ width: '100%' }}>
            <View style={{ padding: 5 }}>
              <Text>
                {currentQuestion + 1} / {cards.length}
              </Text>
            </View>

            {cardFlipped && (
              <View>
                <Text style={styles.cardText}>{card.answer}</Text>
                <TouchableOpacity
                  style={styles.flipBtn}
                  onPress={this.flipCard}>
                  <View>
                    <Text>Question</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {!cardFlipped && (
              <View style={{ width: '100%' }}>
                <Text style={styles.cardText}> {card.question} </Text>
                <TouchableOpacity
                  style={styles.flipBtn}
                  onPress={this.flipCard}>
                  <View>
                    <Text style={styles.flipBtnText}>Answer</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              style={[styles.answerBtn, { backgroundColor: 'green' }]}
              onPress={() => this.gotToNextCard(true)}>
              <View>
                <Text style={styles.answerBtnText}>Correct</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.answerBtn, { backgroundColor: 'red' }]}
              onPress={() => this.gotToNextCard(false)}>
              <View>
                <Text style={styles.answerBtnText}>Incorrect</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {showResults && (
          <View style={{ width: '100%' }}>
            <Text
              style={{
                marginTop: '50%',
                fontSize: 15,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {Math.round(this.state.correctAnswers / cards.length) * 100.0}%
              answers were correct
            </Text>

            <TouchableOpacity
              style={[
                styles.answerBtn,
                { backgroundColor: 'black', marginTop: '30%' },
              ]}
              onPress={() => this.resetQuiz()}>
              <View>
                <Text style={styles.answerBtnText}>Retake Quiz</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.answerBtn, { backgroundColor: 'black' }]}
              onPress={() => this.props.navigation.goBack()}>
              <View>
                <Text style={styles.answerBtnText}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cardText: {
    marginVertical: 50,
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign: 'center',
  },
  flipBtn: {
    marginTop: 5,
    alignItems: 'center',
    borderRadius: 3,
    padding: 10,
  },
  answerBtn: {
    marginHorizontal: '25%',
    width: '50%',
    marginTop: 5,
    alignItems: 'center',
    borderRadius: 3,
    padding: 10,
  },
  flipBtnText: {
    color: 'green',
  },
  answerBtnText: {
    color: 'white',
  },
});
