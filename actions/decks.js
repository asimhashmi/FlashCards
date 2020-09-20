import * as Api from '../utils/api'

export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'
export const INITIAL_DATA = 'INITIAL_DATA'

function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

function addQuestion(deck, question, answer) {
  return {
    type: ADD_QUESTION,
    deck,
    question,
    answer
  }
}

function initalData(decks) {
  return {
    type: INITIAL_DATA,
    decks
  }
}

export function handleAddDeck(title, fn) {
  return (dispatch) => Api.addDeck(title).then(() => {
    dispatch(addDeck(title))
    fn()
  })
}

export function handleAddQuestion(deck, question, answer, fn) {
  return (dispatch) => Api.addCardToDeck(deck, question, answer)
    .then(() => {
      dispatch(addQuestion(deck, question, answer))
      fn()
    })
}

export function handleDeleteDeck() {
  return (dispatch) => () => 1
}

export function handleInitialData() {
  return (dispatch) => Api.getDecks().then((decks) => dispatch(initalData(decks)))
}