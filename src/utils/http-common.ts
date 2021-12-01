import axios from 'axios';
import router from '@/router';
import getAuthHeader from '../utils/auth-header';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

instance.interceptors.request.use((request) => {
  request.headers = getAuthHeader();
  return request;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(router);
    if (error.response.status === 403) {
      router.push('/login');
    }
    return Promise.reject(error);
  },
);
export default instance;
