import axios from 'axios';
import {API_BASE_URL} from '../constants/global';
import {showErrorToast} from '../utils/toastUtils'; // Adjust the import path

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_FAKE_BASEURL || API_BASE_URL, // Set your base URL here
  timeout: 10000, // Set a timeout limit
});

// Axios middleware for handling requests, responses, and errors
api.interceptors.request.use(
  (config) => {
    // Modify the config object if needed (e.g., add headers, tokens, etc.)
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`; // Example for adding token
    return config;
  },
  (error) => {
    // Handle request errors here
    showErrorToast('Request failed. Please try again.'); // Show toast on request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Handle successful responses here
    return response; // Only return the data portion of the response
  },
  (error) => {
    // Centralized error handling for failed responses
    if (error.response) {
      // Server responded with a status other than 2xx
      showErrorToast(error.response.data.message || 'An error occurred.'); // Show toast on response error
      if (error.response.status === 401) {
        // Handle unauthorized errors (e.g., redirect to login)
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.response.status === 500) {
        showErrorToast(error.response.data.message || 'Server error, please try again later.');
      }
    } else if (error.request) {
      // No response received (network errors)
      console.error('Network Error:', error.request);
      showErrorToast('Network error, please check your connection.'); // Show toast for network error
    } else {
      // Something else caused an error
      console.error('Error:', error.message);
      showErrorToast('An error occurred, please try again.'); // General error toast
    }
    return Promise.reject(error);
  }
);

export default api;
