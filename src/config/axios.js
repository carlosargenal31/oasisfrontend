// frontend/src/config/axios.js
import axios from 'axios';

// Configura la URL base del API
axios.defaults.baseURL = 'http://localhost:3000';

// Interceptor para agregar el token de autenticación a todas las solicitudes
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores comunes de respuesta
/// frontend/src/config/axios.js
axios.interceptors.response.use(
    response => response,
    error => {
      // Solo limpiar tokens en caso de error 401, sin redirecciones
      if (error.response && error.response.status === 401) {
        console.warn('Error de autenticación:', error.response.data);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
      return Promise.reject(error);
    }
  );

export default axios;