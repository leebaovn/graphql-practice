import axios from 'axios';
import queryString from 'query-string';


const axiosClient = axios.create({
  baseURL: "http://localhost:3003/graphql",
  headers: {
    'Content-Type': "application/json",
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
  //xu li token here
  const token = window.localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(async response => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {

  throw error;
});

export default axiosClient;