import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/theme/main.pcss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

// TODO move
const checkColorScheme = (e: MediaQueryList | MediaQueryListEvent) => {
  if (e.matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
checkColorScheme(matchMedia);
matchMedia.addEventListener('change', (e) => checkColorScheme(e));
