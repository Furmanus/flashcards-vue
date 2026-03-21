export const CreateFlashcardTranslations = {
  Heading: {
    Main: ['Create Flashcard'],
    DeckDescription: ['Deck: {deckName}'],
  },
  Navigation: {
    BackToDeck: ['Back to deck'],
  },
  FormFields: {
    Question: {
      Label: ['Question'],
      Placeholder: ['e.g., What is JavaScript?'],
      Tip: ['Tip: You can use Markdown to format your question.'],
    },
    Answer: {
      Label: ['Answer'],
      Placeholder: ['e.g., A programming language that conforms to the ECMAScript specification.'],
      Tip: ['Tip: You can use Markdown to format your answer.'],
    },
  },
  Buttons: {
    Cancel: ['Cancel'],
    Edit: ['Edit Flashcard'],
    Create: ['Create Flashcard'],
  },
} as const;
