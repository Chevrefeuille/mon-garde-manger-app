<template>
  <div v-if="user" class="container">
    <header>
      <h3>
        <strong>{{ user.name }}</strong
        >'s profile
      </h3>
    </header>
    <p>
      <strong>Email:</strong>
      {{ user.email }}
    </p>
    <img :src="user.picture" alt="User's profile picture" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuth } from '../auth/useAuthService';

export default defineComponent({
  name: 'Profile',
  setup() {
    const { user } = useAuth();

    return { user };
  },
});
</script>
