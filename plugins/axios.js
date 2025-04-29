// plugins/axios.js
import axios from 'axios';
import { useAuthStore } from '../store/auth';

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
    async (error) => {
      const originalRequest = error.config;
      
      // Para errores de autenticación y token expirado
      if (error.response && error.response.status === 401 && process.client) {
        const authStore = useAuthStore();
        const refreshToken = localStorage.getItem('refreshToken');
        
        // Intenta refrescar el token si existe refresh token y no hemos intentado refrescar ya
        if (refreshToken && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Llamada para refrescar token sin usar el interceptor (para evitar loop)
            const response = await axios.post(`${baseURL}/auth/refresh`, { 
              refreshToken 
            });
            
            if (response.data && response.data.accessToken) {
              // Actualizar token en localStorage y store
              localStorage.setItem('token', response.data.accessToken);
              authStore.setToken(response.data.accessToken, refreshToken);
              
              // Actualizar el token en la solicitud original y reintentarla
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
              return axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            console.error('Error al refrescar token:', refreshError);
          }
        }
        
        // Si no se pudo refrescar o no hay refresh token, redirigir al login
        // Solo si no estamos ya en una página de autenticación
        const path = window.location.pathname;
        if (!path.startsWith('/auth/')) {
          localStorage.setItem('authRedirect', path);
          authStore.logout();
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