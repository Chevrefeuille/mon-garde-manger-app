import { createRouter, createWebHistory } from 'vue-router';
import { useRouteGuard } from '../auth/useRouterGuard';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Profile from '../views/Profile.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: useRouteGuard,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
