import type {
  DeckModel,
  DeckPresentationModel,
  FlashcardFolderModel,
  FlashcardModel,
  FolderPresentationModel,
} from '../interfaces/flashcards.interfaces.ts';
import { getDecksMockData, getFoldersMockData, saveDecksMockData, saveFoldersMockData } from './flashcardsApi.mock.ts';
import { UncategorizedFlashcardsDeckId } from '../constants/flashcards.constants.ts';

type FetchOptions = {
  signal?: AbortSignal;
};

class FlashcardsApiService {
  public async getDecks({}: FetchOptions = {}): Promise<DeckPresentationModel[]> {
    await wait();

    const decks = getDecksMockData() as DeckPresentationModel[];
    const flashcards = await this.getFlashcards();

    for (const flashcard of flashcards) {
      if (flashcard.deckId) {
        const deck = decks.find((deck) => deck.id === flashcard.deckId);

        if (deck) {
          deck.flashcards.push(flashcard);
        }
      }
    }

    return decks;
  }

  public async getDeckDetails(id: string, {}: FetchOptions = {}): Promise<DeckPresentationModel | undefined> {
    const decks = await this.getDecks();
    const flashcards = await this.getFlashcards();
    const deck = decks.find((deck) => deck.id === id);

    if (deck) {
      deck.flashcards = flashcards.filter((flashcard) => flashcard.deckId === deck.id);

      return deck;
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
    // TODO
    return [];
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
}

export const flashcardsApiService = new FlashcardsApiService();

function wait() {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 2));
}
