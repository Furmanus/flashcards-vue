import { createApp } from 'vue';
import './style.css';
import 'primeicons/primeicons.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import { router } from './router/router.ts';
import Translation from './components/translation/Translation.vue';
import { PiniaColada } from '@pinia/colada';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(createPinia());
app.use(PiniaColada, {
  queryOptions: {
    staleTime: 60000,
  },
});
app.use(router);
app.component('Translation', Translation);
app.mount('#app');
