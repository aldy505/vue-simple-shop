import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import 'virtual:windi.css';
import '@fontsource/atkinson-hyperlegible';
import store from './store';
import App from './App.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('./pages/index.vue') },
    { path: '/checkout', component: () => import('./pages/checkout.vue') },
  ],
});

createApp(App).use(router).use(store).mount('#app');
