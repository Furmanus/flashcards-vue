import type { DeckModel, FlashcardFolderModel, FlashcardModel } from '../interfaces/flashcards.interfaces.ts';

type FetchOptions = {
  signal?: AbortSignal;
};

class FlashcardsApiService {
  public async getDecks({}: FetchOptions = {}): Promise<DeckModel[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [];
  }

  public async getFolders({}: FetchOptions = {}): Promise<FlashcardFolderModel[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [];
  }

  public async getFlashcards({}: FetchOptions = {}): Promise<FlashcardModel[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [];
  }
}

export const flashcardsApiService = new FlashcardsApiService();
