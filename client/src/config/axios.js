// In client/src/config/axios.js
import axios from 'axios';

// Set the base URL for all API requests
axios.defaults.baseURL = 'https://r5wa3jwp5s.us-east-1.awsapprunner.com';

// Call API locally
// axios.defaults.baseURL = 'http://localhost:5000';

// Enable credentials for cross-origin requests
axios.defaults.withCredentials = false;

// Add default headers
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
