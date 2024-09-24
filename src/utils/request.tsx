import axios from 'axios';
import { GET_BASE_URL } from '../constants/apiEndpoints';
const service = axios.create({
  baseURL: GET_BASE_URL + '/backend/api/v1/', // url = base url + request url
  timeout: 30000,
  headers: { 'Access-Control-Allow-Origin': '*' },
});

// Request interceptors
service.interceptors.request.use(
  (config: any) => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Content-Type'] = 'application/json';
    // Add X-Access-Token header to every request, you can add other custom headers here

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response inte

service.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('error', error);

    return error.response;
  }
);

export default service;
