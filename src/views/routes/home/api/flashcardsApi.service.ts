import type { DeckModel } from '../../../../interfaces/flashcards.interfaces.ts';

type FetchOptions = {
  signal?: AbortSignal;
};

class FlashcardsApiService {
  public async getDecks({}: FetchOptions = {}): Promise<DeckModel[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [];
  }
}

export const flashcardsApiService = new FlashcardsApiService();
