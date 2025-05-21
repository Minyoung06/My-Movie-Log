import { createRouter, createWebHistory } from 'vue-router';

import TestPage from '../views/TestPage.vue';

import Home from '../views/HomePage.vue';
import Search from '../views/SearchPage.vue';
import Detail from '../views/DetailPage.vue';
import Favorites from '../views/FavoritesPage.vue';
import Profile from '../views/ProfilePage.vue';
import Login from '../views/LoginPage.vue';
import Signup from '../views/SignupPage.vue';
import NotFound from '../views/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/search', name: 'Search', component: Search },
    { path: '/detail/:id', name: 'Detail', component: Detail, props: true },
    { path: '/favorites', name: 'Favorites', component: Favorites },
    { path: '/profile', name: 'Profile', component: Profile },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { hideLayout: true },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: { hideLayout: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: { hideLayout: true },
    },
    { path: '/test', name: 'test', component: TestPage },
  ],
});

export default router;
