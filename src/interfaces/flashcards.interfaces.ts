import type { CreateFlashcardSchema } from '../schema/flashcards.schema.ts';
import z from 'zod';

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
export type CreateFlashcardModel = z.infer<typeof CreateFlashcardSchema>;
