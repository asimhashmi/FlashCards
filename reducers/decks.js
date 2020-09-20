import { ADD_DECK, DELETE_DECK, ADD_QUESTION, INITIAL_DATA } from '../actions/decks'

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      }
    case DELETE_DECK:
      return {}

    case ADD_QUESTION:
      return {
        ...state,
        [action.deck]: {
          ...state[action.deck],
          questions: [
            ...state[action.deck]['questions'],
            {
              question: action.question,
              answer: action.answer
            }
          ]
        }
      }
    case INITIAL_DATA:
      return {
        ...state,
        ...action.decks
      }
    default:
      return {}
  }
}