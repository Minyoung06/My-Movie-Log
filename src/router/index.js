import { createRouter, createWebHistory } from 'vue-router';
import TestPage from '../views/TestPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'test',
      component: TestPage,
    },
  ],
});

export default router;
