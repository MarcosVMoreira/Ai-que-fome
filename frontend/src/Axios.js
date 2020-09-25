import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/login',
  headers: { 'Content-Type': 'application/json' },
});

export default instance;
