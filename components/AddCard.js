import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/decks'
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
class AddCard extends Component {
  state = {
    question: null,
    answer: null,
  };

  handleChangeQuestion = (text) => {
    this.setState({ question: text });
  };

  handleChangeAnswer = (text) => {
    this.setState({ answer: text });
  };

  handleAddQuestion = () => {
    const { dispatch, navigation } = this.props
    const { deck } = this.props.route.params
    const { question, answer } = this.state

    this.setState({ question: null, answer: null })

    dispatch(handleAddQuestion(deck, question, answer, () => navigation.navigate('Deck', { deck: deck })))
  };

  render() {
    const { question, answer } = this.state;
    const { deck } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{deck}</Text>
        <Text style={styles.addQuestion}>Add Question</Text>

        <TextInput
          value={question}
          style={styles.textField}
          onChangeText={this.handleChangeQuestion}
          placeholder="Enter Question"
        />
        <TextInput
          value={answer}
          style={styles.textField}
          onChangeText={this.handleChangeAnswer}
          placeholder="Enter Answer"
        />
        <TouchableOpacity disabled={!(question && answer)} onPress={this.handleAddQuestion}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Question</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default connect()(AddCard)

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  textField: {
    padding: 5,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: 'lightgray',
  },
  deckTitle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  addQuestion: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
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
  },
});
