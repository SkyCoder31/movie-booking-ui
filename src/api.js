// src/api.js
import axios from 'axios';

// Your DEPLOYED API URL
const API_URL = 'https://movie-booking-api-3wep.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

// This is an "interceptor"
// It runs BEFORE every request is sent
api.interceptors.request.use(
  (config) => {
    // Get the user from localStorage
    const user = JSON.parse(localStorage.getItem('movieUser'));

    if (user && user.token) {
      // If we have a token, add it to the headers
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;