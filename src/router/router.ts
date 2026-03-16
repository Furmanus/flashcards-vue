import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '../views/routes/home/HomeView.vue';
import CreateDeckView from '../views/routes/decksCreate/CreateDeckView.vue';
import DeckDetails from '../views/routes/deckDetails/DeckDetails.vue';

export const AppRoutes = {
  Home: '/',
  CreateDeck: '/decks/create/:deckId?',
  DeckDetails: '/decks/:deckId',
  CreateFlashcard: '/flashcards/create/',
  EditFlashcard: '/flashcards/edit/:flashcardId',
};

const routes = [
  { path: AppRoutes.Home, component: HomeView },
  { path: AppRoutes.CreateDeck, component: CreateDeckView },
  { path: AppRoutes.DeckDetails, component: DeckDetails },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
