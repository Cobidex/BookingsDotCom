import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Assuming your API is served at the same host as the frontend
  withCredentials: true, // Include credentials (cookies) with requests
});

export default api;
