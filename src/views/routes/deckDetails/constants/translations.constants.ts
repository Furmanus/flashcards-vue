export const DeckDetailsTranslations = {
  Heading: {
    BackButton: ['Back to decks'],
    EditButton: ['Edit'],
    DeleteButton: ['Delete'],
    Actions: {
      StudyDueCards: ['Study due cards: {quantity}'],
      StudyAllCards: ['Study All Cards'],
      ExitStudyMode: ['Exit Study Mode'],
    },
  },
  Content: {
    ZeroState: {
      Heading: ['No flashcards in this deck'],
      Description: ['Create your first flashcard to get started.'],
      AddFlashcardButton: ['Add Flashcard'],
    },
    DeleteModal: {
      Heading: ['Confirm action'],
      Description: ['Are you sure you want to delete deck {deckName}?'],
      Buttons: {
        Cancel: ['No, keep it'],
        Delete: ['Yes, delete'],
      },
    },
  },
  FlashcardList: {
    FlashcardCard: {
      DueIcon: ['Due'],
      NextReview: ['Next review: {date}'],
    },
  },
  StudyMode: {
    Heading: ['Card {current} of {total}'],
    Flashcard: {
      HeadingFront: ['Question:'],
      HeadingBack: ['Answer:'],
      FlipButton: ['Click to flip'],
      RemindMe: {
        Title: ['Remind me again in:'],
      },
    },
    Buttons: {
      Next: ['Next'],
      Previous: ['Previous'],
    },
  },
} as const;
