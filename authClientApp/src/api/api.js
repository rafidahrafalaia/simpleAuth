import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your API base URL
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // If the error status is 401, it means the token is expired or invalid
            // Redirect to login page using window.location.href
            window.location.href = '/login';

            // Clear any stored tokens
            localStorage.removeItem('Token'); // Replace 'Token' with the key you use for storing the JWT
        }
        return Promise.reject(error);
    }
);

export default api;
