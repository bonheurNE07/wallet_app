import axios from 'axios'

// create an axios instance with the base url for thr backend API
const api = axios.create({
    // baseURL: 'https://wallet-app-1mdo.onrender.com/api/', http://127.0.0.1:8000/
    baseURL: 'http://127.0.0.1:8000/api/',
});

// Add a resquest interceptor to include the authorization token in every request 
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken"); // retrieve token from localStrorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach token to the Authorization header
        }
        return config; // pass the update config to the request
    },
    (error) => Promise.reject(error)// handle request errors
);

// Add a response interceptor to handle 401 errors (unauthorized)
api.interceptors.response.use(
    (response) => response, // pass through successful responses
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("accessToken"); // remove invalid token
            window.location.href = "/login"; // redirect user to login page
        }
        return Promise.reject(error); // handle other response errors
    }
);

export default api; // export the axios instance for use throughout the app