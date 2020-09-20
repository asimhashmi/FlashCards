import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { handleAddDeck } from '../actions/decks'
import { connect } from 'react-redux'

class NewDeck extends Component {
  state = {
    title: ''
  }
  handleTitleChange = (text) => {
    this.setState({ title: text })
  }
  handleSubmit = () => {
    const { dispatch, navigation } = this.props
    dispatch(handleAddDeck(this.state.title, () => navigation.navigate('Decks')))
  }
  render() {
    return <View style={styles.container}>
      <Text style={styles.deckTitle}>What's the title of your deck?</Text>
      <TextInput
        value={this.state.title}
        style={styles.textField}
        onChangeText={this.handleTitleChange}
        placeholder="Enter Title"
      />

      <TouchableOpacity disabled={!(this.state.title)} onPress={this.handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Deck</Text>
        </View>
      </TouchableOpacity>
    </View>
  }
}

export default connect()(NewDeck)
const styles = StyleSheet.create({
  container: {
    marginTop: '40%',
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
    marginBottom: '20%'
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