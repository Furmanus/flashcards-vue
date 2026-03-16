import type { DeckModel, FlashcardFolderModel, FlashcardModel } from '../interfaces/flashcards.interfaces.ts';

export function getFoldersMockData(): FlashcardFolderModel[] {
  return JSON.parse(localStorage.getItem('folders') || '[]');
}

export function getDecksMockData(): DeckModel[] {
  return JSON.parse(localStorage.getItem('decks') || '[]');
}

export function getFlashcardsMockData(): FlashcardModel[] {
  return JSON.parse(localStorage.getItem('flashcards') || '[]');
}

export function saveFoldersMockData(folders: FlashcardFolderModel[]) {
  localStorage.setItem('folders', JSON.stringify(folders));
}

export function saveDecksMockData(decks: DeckModel[]) {
  localStorage.setItem('decks', JSON.stringify(decks));
}

export function saveFlashcardsMockData(flashcards: FlashcardModel[]) {
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
}
