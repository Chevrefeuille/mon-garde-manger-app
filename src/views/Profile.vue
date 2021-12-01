<template>
  <div v-if="user" class="container">
    <header>
      <h3>
        <strong>{{ user.name }}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{ user.accessToken.substring(0, 20) }} ...
      {{ user.accessToken.substr(user.accessToken.length - 20) }}
    </p>
    <p>
      <strong>Id:</strong>
      {{ user._id }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ user.email }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useUserStore } from '../stores/user.store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Profile',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const checkLoggedIn = (): void => {
      if (!userStore.user) {
        router.push('/login');
      }
    };

    onMounted(checkLoggedIn);

    return { user: userStore.user };
  },
});
</script>
