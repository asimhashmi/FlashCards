import * as React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import * as Api from './utils/api';
import { Provider, connect } from 'react-redux';
import { handleInitialData } from './actions/decks'
import Navigator from './components/Navigator'
import { createStore } from 'redux';
import reducers from './reducers'
import middleware from './middleware'


const store = createStore(reducers, middleware)


class FlashCards extends React.Component {
  state = {
    decks: {}
  };

  componentDidMount() {
    Api.initializeStorage().then(() => this.props.dispatch(handleInitialData()))
  }

  handleAddQuestion = async (deck, question, answer) => {
    const updatedDeck = await Api.addCardToDeck(deck, question, answer)
    this.setState((prevState) => ({
      decks: {
        ...prevState['decks'],
        [deck]: updatedDeck
      }
    }))
  };

  render() {
    return (

          <Navigator />
    );
  }
}

const ConnectFlashCards = connect()(FlashCards)

export default function App() {
  return(
    <Provider store={store}>
    <ConnectFlashCards />
    </Provider>
  )
}
