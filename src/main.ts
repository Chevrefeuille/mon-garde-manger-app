import { createApp, provide, h } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import './index.css';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './apollo';

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
})
  .use(createPinia())
  .use(router)
  .mount('#app');
