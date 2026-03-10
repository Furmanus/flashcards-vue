export const HomeViewTranslations = {
  Heading: {
    Heading: ['Your Flashcards Decks'],
    Buttons: {
      NewFolder: ['New Folder'],
      NewDeck: ['New Deck'],
    },
  },
  ZeroState: {
    Heading: ['No decks yet'],
    Description: ['Get started by creating your first deck or folder.'],
    Buttons: {
      CreateFolder: ['Create Folder'],
      CreateDeck: ['Create Deck'],
    },
  },
  CreateFolder: {
    Name: {
      Label: ['Folder Name'],
      Placeholder: ['e.g., JavaScript'],
    },
    Buttons: {
      Cancel: ['Cancel'],
      Create: ['Create'],
    },
    Toast: {
      FailMessage: ['Failed to create folder'],
    },
  },
  Folders: {
    NoDataView: {
      Heading: ['No decks in this folder yet.'],
      Description: ['Create a deck and assign it here.'],
    },
    DeleteModal: {
      Heading: ['Confirm action'],
      Description: ['Are you sure you want to delete folder {folderName}?'],
      Buttons: {
        Cancel: ['Cancel'],
        Delete: ['Delete'],
      },
    },
    DeleteToast: {
      Success: ['Folder deleted successfully'],
      Fail: ['Failed to delete folder'],
    },
  },
  DeckList: {
    DeckCard: {
      CardQuantity: ['{quantity} cards'],
    },
    UncategorizedDecks: {
      Heading: ['Uncategorized decks'],
    },
  },
} as const;
