import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import store from './store';

const test = async () => {
  const response = await axios.get('http://localhost:5000/api/ingredients');
  const json = await response.data;
  console.log(json);
};

test();

createApp(App).use(store).mount('#app');
