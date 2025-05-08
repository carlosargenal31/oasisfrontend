// frontend/src/config/axios.js
import axios from 'axios';

// Configura la URL base del API (asegúrate de que la URL no termine en /api)
axios.defaults.baseURL = 'http://localhost:3000/api';

// Interceptor para agregar el token de autenticación a todas las solicitudes
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Para debugging - muestra la URL completa antes de enviar la solicitud
    console.log('URL de solicitud:', config.baseURL + config.url);
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores comunes de respuesta
axios.interceptors.response.use(
  response => response,
  error => {
    // Solo limpiar tokens en caso de error 401, sin redirecciones
    if (error.response && error.response.status === 401) {
      console.warn('Error de autenticación:', error.response.data);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    
    // Para debugging - muestra más información sobre el error
    console.error('Error de API:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    
    return Promise.reject(error);
  }
);

export default axios;