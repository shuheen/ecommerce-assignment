import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://fakestoreapi.com', // Set your base URL here
  timeout: 10000, // Set a timeout limit
});

// Axios middleware for handling requests, responses, and errors
api.interceptors.request.use(
  (config) => {
    // Modify the config object if needed (e.g., add headers, tokens, etc.)
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`; // Example for adding token
    console.log('Request:', config); // For debugging
    return config;
  },
  (error) => {
    // Handle request errors here
    console.error('Request Error:', error);
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
      console.error('Response Error:', error.response.data.message || error.response.statusText);
      if (error.response.status === 401) {
        // Handle unauthorized errors (e.g., redirect to login)
        console.log('Unauthorized! Redirecting to login...');
        // Optionally, clear any sensitive data and redirect
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.response.status === 500) {
        console.log('Server error, please try again later.');
      } else {
        console.log(`Error: ${error.response.data.message || 'An error occurred.'}`);
      }
    } else if (error.request) {
      // No response received (network errors)
      console.error('Network Error:', error.request);
      console.log('Network error, please check your connection.');
    } else {
      // Something else caused an error
      console.error('Error:', error.message);
      console.log('An error occurred, please try again.');
    }
    return Promise.reject(error);
  }
);

export default api;
