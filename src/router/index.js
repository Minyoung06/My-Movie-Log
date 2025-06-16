import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

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
    {
      path: '/favorites',
      name: 'Favorites',
      component: Favorites,
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true },
    },
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

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isLoggedIn = !!userStore.userInfo.id;

  if (isLoggedIn && (to.path === '/login' || to.path === '/signup')) {
    return next('/');
  }

  if (!isLoggedIn && to.meta.requiresAuth) {
    return next('/login');
  }

  next();
});

export default router;
