<template>
  <div id="main">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Header from './components/Header.vue';
import { useAuth } from './auth/useAuthService';

export default defineComponent({
  name: 'App',
  components: {
    Header,
  },
  setup() {
    const { initializeAuth } = useAuth();
    onMounted(() =>
      initializeAuth({
        domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
        client_id: import.meta.env.VITE_AUTH0_CLIENT_ID as string,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        scope: 'openid profile email',
      }),
    );
  },
});
</script>
