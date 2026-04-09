import type {
  CreateFlashcardModel,
  DeckModel,
  DeckModelWithFlashcards,
  DeckPresentationModel,
  FlashcardFolderModel,
  FlashcardModel,
  FolderPresentationModel,
} from '../interfaces/flashcards.interfaces.ts';
import {
  getDecksMockData,
  getFlashcardsMockData,
  getFoldersMockData,
  saveDecksMockData,
  saveFlashcardsMockData,
  saveFoldersMockData,
} from './flashcardsApi.mock.ts';
import { UncategorizedFlashcardsDeckId } from '../constants/flashcards.constants.ts';

type FetchOptions = {
  signal?: AbortSignal;
};

class FlashcardsApiService {
  public async getDecks({}: FetchOptions = {}): Promise<DeckPresentationModel[]> {
    await wait();

    const decks = getDecksMockData() as DeckPresentationModel[];
    const flashcards = await this.getFlashcards();

    for (const deck of decks) {
      deck.flashcardsCount = 0;
    }

    for (const flashcard of flashcards) {
      if (flashcard.deckId) {
        const deck = decks.find((deck) => deck.id === flashcard.deckId);

        if (deck) {
          if (!deck.flashcardsCount) {
            deck.flashcardsCount = 0;
          }

          deck.flashcardsCount += 1;
        }
      }
    }

    return decks;
  }

  public async getDeckDetails(id: string, {}: FetchOptions = {}): Promise<DeckModelWithFlashcards | undefined> {
    const decks = await this.getDecks();
    const flashcards = await this.getFlashcards();
    const deck = decks.find((deck) => deck.id === id);

    if (deck) {
      return {
        ...deck,
        flashcards: flashcards.filter((flashcard) => flashcard.deckId === deck.id),
      };
    }
  }

  public async createDeck(deckData: Omit<DeckModel, 'id'>, {}: FetchOptions = {}): Promise<void> {
    const decks = (await this.getDecks()) as DeckModel[];

    decks.push({
      ...deckData,
      id: crypto.randomUUID(),
    });

    saveDecksMockData(decks);
    await wait();
  }

  public async updateDeck(id: string, deckData: Omit<DeckModel, 'id'>, {}: FetchOptions = {}): Promise<void> {
    const decks = await this.getDecks();
    const deck = decks.find((deck) => deck.id === id);

    if (!deck) {
      throw new Error('Deck not found');
    }

    Object.assign(deck, deckData);

    saveDecksMockData(decks);
    await wait();
  }

  public async deleteDeck(id: string, {}: FetchOptions = {}): Promise<void> {
    const decks = await this.getDecks();

    saveDecksMockData(decks.filter((examinedDeck) => examinedDeck.id !== id));

    await wait();
  }

  public async getFlashcards({}: FetchOptions = {}): Promise<FlashcardModel[]> {
    await wait();

    return getFlashcardsMockData();
  }

  public async getFlashcardDetails(id: string, {}: FetchOptions = {}): Promise<FlashcardModel> {
    const flashcards = await this.getFlashcards();
    const editedFlashcard = flashcards.find((flashcard) => flashcard.id === id);

    if (!editedFlashcard) {
      return Promise.reject(new Error('Flashcard not found'));
    }

    return editedFlashcard;
  }

  public async getFolders({}: FetchOptions = {}): Promise<FolderPresentationModel[]> {
    const decks = await this.getDecks();
    const foldersCopy = getFoldersMockData() as FolderPresentationModel[];

    if (!foldersCopy.find((folder) => folder.id === UncategorizedFlashcardsDeckId)) {
      foldersCopy.push({
        id: UncategorizedFlashcardsDeckId,
        name: 'Uncategorized',
        decks: [],
      });
    }

    const uncategorizedFolder = foldersCopy.find((folder) => folder.id === UncategorizedFlashcardsDeckId);

    if (uncategorizedFolder) {
      uncategorizedFolder.decks = decks.filter((deck) => !deck.folderId);
    }

    for (const deck of decks) {
      const folder = foldersCopy.find((examinedFolder) => examinedFolder.id === deck.folderId);

      if (folder && !folder.decks.find((examinedDeck) => examinedDeck.id === deck.id)) {
        folder.decks.push(deck);
      }
    }

    return foldersCopy;
  }

  public async createFolder(folderData: Omit<FlashcardFolderModel, 'id'>, {}: FetchOptions = {}): Promise<void> {
    const folders = (await this.getFolders()) as FlashcardFolderModel[];

    folders.push(Object.assign({ id: crypto.randomUUID(), decks: [] }, folderData));

    saveFoldersMockData(folders);
    await wait();
  }

  public async updateFolder(id: string, folderData: Omit<FlashcardFolderModel, 'id'>, {}: FetchOptions = {}): Promise<void> {
    const folders = await this.getFolders();
    const folder = folders.find((folder) => folder.id === id);

    if (!folder) {
      throw new Error('Folder not found');
    }

    Object.assign(folder, folderData);

    saveFoldersMockData(folders);
    await wait();
  }

  public async deleteFolder(id: string, {}: FetchOptions = {}): Promise<void> {
    const folders = await this.getFolders();
    const folderIndex = folders.findIndex((folder) => folder.id === id);

    saveFoldersMockData(folders.filter((_, index) => index !== folderIndex));
  }

  public async createFlashcard(data: CreateFlashcardModel, FetcherOptions: FetchOptions = {}): Promise<FlashcardModel> {
    const flashcardModel = {
      id: crypto.randomUUID(),
      back: data.back,
      front: data.front,
      deckId: data.deckId,
      easinessFactor: 2.5,
      lastInterval: 0,
      nextReviewAt: new Date().toISOString(),
      repeats: 0,
    } satisfies FlashcardModel;
    const flashcards = (await this.getFlashcards(FetcherOptions)) as FlashcardModel[];

    flashcards.push(flashcardModel);

    saveFlashcardsMockData(flashcards);
    await wait();
    return flashcardModel;
  }

  public async updateFlashcard(id: string, data: CreateFlashcardModel, FetcherOptions: FetchOptions = {}): Promise<FlashcardModel> {
    const flashcards = await this.getFlashcards(FetcherOptions);
    const flashcard = flashcards.find((flashcard) => flashcard.id === id);

    if (!flashcard) {
      throw new Error('Flashcard not found');
    }

    Object.assign(flashcard, data);

    saveFlashcardsMockData(flashcards);
    await wait();
    return flashcard;
  }
}

export const flashcardsApiService = new FlashcardsApiService();

function wait() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 20));
}
