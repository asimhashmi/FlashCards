import { AsyncStorage } from 'react-native';
const decks = {
  'Deck 1': {
    title: 'Deck 1',
    questions: [
      {
        question: 'What is my name?',
        answer: 'Asim',
      },
    ],
  },
  'Deck 2': {
    title: 'Deck 2',
    questions: [{ question: 'What is my name?', answer: 'Asim' }],
  },
};

export async function initializeStorage() {
  await AsyncStorage.setItem('FlashCards', JSON.stringify(decks));
  return 'success';
}

export async function getDecks() {
  const data = await AsyncStorage.getItem('FlashCards');
  return JSON.parse(data);
}

export async function getDeck(deck) {
  const decks = await getDecks();
  return decks[deck];
}

export async function addCardToDeck(title, question, answer) {
  const newCard = {
    question: question,
    answer: answer,
  };
  const deck = await getDeck(title);
  deck.questions.push(newCard);
  await AsyncStorage.mergeItem(
    'FlashCards',
    JSON.stringify({
      [title]: deck,
    })
  );
  return await getDeck(title);
}

export async function addDeck(title) {
  await AsyncStorage.mergeItem(
    'FlashCards',
    JSON.stringify({
      [title]: {
        title: title,
        questions: [],
      },
    })
  );
}
