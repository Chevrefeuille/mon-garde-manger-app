import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 403) {
      //todo
    }
    return Promise.reject(error);
  },
);
export default instance;
