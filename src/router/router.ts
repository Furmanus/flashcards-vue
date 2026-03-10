import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '../views/routes/home/HomeView.vue';
import CreateDeckView from '../views/routes/decksCreate/CreateDeckView.vue';

export const AppRoutes = {
  Home: '/',
  CreateDeck: '/decks/create/:deckId?',
};

const routes = [
  { path: AppRoutes.Home, component: HomeView },
  { path: AppRoutes.CreateDeck, component: CreateDeckView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
