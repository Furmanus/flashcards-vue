export type DeckModel = {
  id: string;
  name: string;
  folder?: FlashcardFolderModel;
};

export type FlashcardModel = {
  id: string;
  front: string;
  back: string;
  deck: DeckModel;
  repeats: number;
  easinessFactor: number;
  nextReviewAt: Date;
  lastInterval: number;
};

export type FlashcardFolderModel = {
  id: string;
  name: string;
};
