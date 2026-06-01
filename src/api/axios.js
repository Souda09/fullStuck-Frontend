import axios from 'axios';

// 1. Axios Instance Create karna
const API = axios.create({
  // Is URL ko check karein ke sahi deployed backend URL hai
  baseURL: 'https://full-stuck-backend.vercel.app/api/auth', 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 2. Interceptor: Har protected API request ke sath Token automatic pass karna
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. 🔴 MOST IMPORTANT: Defaut Export line taake error solve ho jaye!
export default API;