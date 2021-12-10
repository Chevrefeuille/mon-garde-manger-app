<template>
  <nav
    id="header"
    class="flex items-center justify-between flex-wrap bg-lime-300 p-6 mb-4 shadow-md"
  >
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      Pantry
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="lg:flex-grow">
        <router-link
          to="/"
          class="block mt-4 lg:inline-block lg:mt-0 text-stone-800 hover:text-stone-400 mr-4"
        >
          Home
        </router-link>
        <router-link
          to="/about"
          class="block mt-4 lg:inline-block lg:mt-0 text-stone-800 hover:text-stone-400 mr-4"
        >
          About
        </router-link>
        <router-link
          to="/pantry"
          class="block mt-4 lg:inline-block lg:mt-0 text-stone-800 hover:text-stone-400 mr-4"
        >
          My pantry
        </router-link>
      </div>
      <div v-if="isAuthenticated && user">
        <router-link
          to="/profile"
          class="block mt-4 lg:inline-block lg:mt-0 text-stone-800 hover:text-stone-400 mr-4"
        >
          Profile
        </router-link>
        <a
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-stone-800 border-stone-800 hover:border-transparent hover:text-stone-400 hover:bg-white mt-4 lg:mt-0"
          href="#"
          @click.prevent="logoutAndRedirect"
        >
          Log out
        </a>
      </div>
      <div v-if="!isAuthenticated && !loading">
        <a
          href="#"
          class="inline-block text-sm px-4 py-2 leading-none border rounded text-stone-800 border-stone-800 hover:border-transparent hover:text-stone-400 hover:bg-white mt-4 lg:mt-0 mr-4"
          @click.prevent="login"
        >
          Log in
        </a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../auth/useAuthService';

export default defineComponent({
  name: 'Header',
  setup() {
    const router = useRouter();

    const { loginWithRedirect, logout, isAuthenticated, loading, user } =
      useAuth();

    const logoutAndRedirect = (): void => {
      logout();
      router.push({ path: '/' });
    };
    const login = (): void => loginWithRedirect();

    return { login, logoutAndRedirect, isAuthenticated, loading, user };
  },
});
</script>
