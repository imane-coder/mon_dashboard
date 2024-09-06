import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // URL de base de l'API
  headers: {
    'Content-Type': 'application/json',
  },
});



const axiosInstancee = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;
