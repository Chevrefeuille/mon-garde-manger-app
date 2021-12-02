<template>
  <nav
    id="header"
    class="flex items-center justify-between flex-wrap bg-teal-500 p-6 mb-4"
  >
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="lg:flex-grow">
        <router-link
          to="/"
          class="
            block
            mt-4
            lg:inline-block lg:mt-0
            text-teal-200
            hover:text-white
            mr-4
          "
        >
          Mon Garde Manger
        </router-link>
        <router-link
          to="/about"
          class="
            block
            mt-4
            lg:inline-block lg:mt-0
            text-teal-200
            hover:text-white
            mr-4
          "
        >
          About
        </router-link>
      </div>
      <div v-if="status.loggedIn">
        <router-link
          to="/profile"
          class="
            block
            mt-4
            lg:inline-block lg:mt-0
            text-teal-200
            hover:text-white
            mr-4
          "
        >
          Profile
        </router-link>
        <a
          class="
            inline-block
            text-sm
            px-4
            py-2
            leading-none
            border
            rounded
            text-white
            border-white
            hover:border-transparent hover:text-teal-500 hover:bg-white
            mt-4
            lg:mt-0
          "
          href
          @click.prevent="logout"
        >
          Log out
        </a>
      </div>
      <div v-if="!status.loggedIn">
        <router-link
          to="/login"
          class="
            inline-block
            text-sm
            px-4
            py-2
            leading-none
            border
            rounded
            text-white
            border-white
            hover:border-transparent hover:text-teal-500 hover:bg-white
            mt-4
            lg:mt-0
            mr-4
          "
        >
          Log in
        </router-link>
        <router-link
          to="/signin"
          class="
            inline-block
            text-sm
            px-4
            py-2
            leading-none
            border
            rounded
            text-white
            border-white
            hover:border-transparent hover:text-teal-500 hover:bg-white
            mt-4
            lg:mt-0
          "
        >
          Sign in
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../stores/user.store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Header',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const logout = (): void => {
      userStore.logout();
      router.push('/login');
    };
    return {
      status: userStore.status,
      login: userStore.login,
      signin: userStore.signin,
      logout: logout,
    };
  },
});
</script>
