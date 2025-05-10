// src/services/eventService.js
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

// Configurar interceptor para incluir token en las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default {
  // Obtener todos los eventos con filtros opcionales
  getEvents(params = {}) {
  // Crear una copia de los parámetros para no modificar el objeto original
  const queryParams = { ...params };
  
  // Asegurarse de que los parámetros de paginación sean números
  if (queryParams.limit !== undefined) {
    queryParams.limit = parseInt(queryParams.limit)
  }
  if (queryParams.offset !== undefined) {
    queryParams.offset = parseInt(queryParams.offset)
  }
  
  // Los parámetros de precio deben ser números
  if (queryParams.price_max !== undefined) {
    queryParams.price_max = parseFloat(queryParams.price_max)
  }
  
  // Filtros específicos de estado (múltiples estados separados por coma)
  // No necesitamos transformarlo, solo asegurarnos de que llegue como string
  
  // Log de debug para verificar qué se está enviando
  console.log('Query params en eventService:', queryParams)
  
  return axios.get(`${API_URL}/events`, { params: queryParams });
},
  
  // Obtener eventos destacados
  getFeaturedEvents(limit = 3) {
    return axios.get(`${API_URL}/events/featured`, { 
      params: { limit } 
    });
  },
  
  // Obtener eventos para la página de inicio
  getHomeEvents(limit = 6) {
    return axios.get(`${API_URL}/events/home`, { 
      params: { limit } 
    });
  },
  
  // Obtener próximos eventos
  getUpcomingEvents(limit = 6) {
    return axios.get(`${API_URL}/events/upcoming`, { 
      params: { limit } 
    });
  },
  
  // Obtener un evento específico por ID
  getEvent(id) {
    return axios.get(`${API_URL}/events/${id}`);
  },
  
  // Obtener todos los tipos de eventos
  getEventTypes() {
    return axios.get(`${API_URL}/events/types`);
  },
  
  // Obtener eventos por creador
  getEventsByCreator(creatorId, limit = 10) {
    return axios.get(`${API_URL}/events/creator/${creatorId}`, {
      params: { limit }
    });
  },
  
  // Crear un nuevo evento
  createEvent(eventData) {
    return axios.post(`${API_URL}/events`, eventData);
  },
  
  // Actualizar un evento existente
  updateEvent(id, eventData) {
    return axios.put(`${API_URL}/events/${id}`, eventData);
  },
  
  // Eliminar un evento
  deleteEvent(id) {
    return axios.delete(`${API_URL}/events/${id}`);
  },
  
  // Actualizar el estado de destacado de un evento
  updateFeaturedStatus(id, isFeatured) {
    return axios.put(`${API_URL}/events/${id}/featured`, { is_featured: isFeatured });
  },
  
  // Actualizar el estado de visualización en inicio
  updateHomeStatus(id, isHome) {
    return axios.put(`${API_URL}/events/${id}/home`, { is_home: isHome });
  },
  
  // Actualizar el estado del evento
  updateEventStatus(id, status) {
    return axios.put(`${API_URL}/events/${id}/status`, { status });
  },
  
  // Subir imagen para un evento
  uploadImage(formData) {
    return axios.post(`${API_URL}/events/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  // Método para obtener todos los eventos (sin paginación) - útil para opciones de fallback
  getAllEvents() {
    return axios.get(`${API_URL}/events`, { 
      params: { limit: 100 } // Obtener un número alto para simular "todos"
    });
  }
};