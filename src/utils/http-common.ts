import axios from 'axios';
import getAuthHeader from '../utils/auth-header';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

instance.interceptors.request.use(async (request) => {
  request.headers = await getAuthHeader();
  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      //todo
    }
    return Promise.reject(error);
  },
);
export default instance;
