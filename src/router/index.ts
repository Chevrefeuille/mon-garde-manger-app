import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Signin from '../views/Signin.vue';
import Login from '../views/Login.vue';
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
    path: '/signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
