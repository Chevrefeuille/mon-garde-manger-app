import axios from 'axios';

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

export default instance;
