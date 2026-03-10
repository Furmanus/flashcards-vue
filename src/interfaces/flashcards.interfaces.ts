export type DeckModel = {
  id: string;
  name: string;
  description?: string;
  folderId?: string;
};

export type FlashcardModel = {
  id: string;
  front: string;
  back: string;
  deckId: string;
  repeats: number;
  easinessFactor: number;
  nextReviewAt: Date;
  lastInterval: number;
};

export type FlashcardFolderModel = {
  id: string;
  name: string;
};

export type FolderPresentationModel = FlashcardFolderModel & { decks: DeckModel[] };
export type DeckPresentationModel = DeckModel & { flashcards: FlashcardModel[] };
