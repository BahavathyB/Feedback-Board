import axios from 'axios';

const api = axios.create({
  baseURL: 'https://feedbacks-757d.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;