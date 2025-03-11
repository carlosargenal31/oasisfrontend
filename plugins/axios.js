// plugins/axios.js
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBaseUrl || 'http://localhost:3000/api';
  
  console.log('API Base URL:', baseURL);
  
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  // Request interceptor
  axiosInstance.interceptors.request.use((config) => {
    if (process.client) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Para errores de autenticación, podemos redirigir al login
      if (error.response && error.response.status === 401 && process.client) {
        // Solo si no estamos ya en una página de autenticación
        const path = window.location.pathname;
        if (!path.startsWith('/auth/')) {
          localStorage.setItem('authRedirect', path);
          if (nuxtApp.$router) {
            nuxtApp.$router.push('/auth/login');
          }
        }
      }
      
      return Promise.reject(error);
    }
  );
  
  // Proporcionar axios a la aplicación
  return {
    provide: {
      axios: axiosInstance
    }
  };
});