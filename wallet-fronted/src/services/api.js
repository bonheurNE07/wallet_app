import axios from 'axios'

const api = axios.create({
    baseURL: 'https://wallet-app-o7pf.onrender.com/api/',
});

export default api;