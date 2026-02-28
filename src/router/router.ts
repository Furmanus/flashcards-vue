import { createWebHistory, createRouter } from 'vue-router';
import HomeView from '../views/routes/home/HomeView.vue';
import CreateDeckView from '../views/routes/decksCreate/CreateDeckView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/decks/:deckId?', component: CreateDeckView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
