<template>
  <nav
    id="header"
    class="flex items-center justify-between flex-wrap bg-teal-500 p-6 mb-4"
  >
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
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
          Home
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
        <router-link
          to="/signin"
          class="
            block
            mt-4
            lg:inline-block lg:mt-0
            text-teal-200
            hover:text-white
            mr-4
          "
        >
          Sign in
        </router-link>
        <router-link
          to="/login"
          class="
            block
            mt-4
            lg:inline-block lg:mt-0
            text-teal-200
            hover:text-white
          "
        >
          Log in
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>
