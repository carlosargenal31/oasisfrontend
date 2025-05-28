// src/services/eventService.js - Frontend
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

// Configurar interceptor para incluir token en las peticiones
axios.interceptors.request.use(
  (config) => {
    // CORRECCIÓN: Usar 'access_token' en lugar de 'token'
    const token = localStorage.getItem('access_token');
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
    const queryParams = { ...params };
    
    if (queryParams.limit !== undefined) {
      queryParams.limit = parseInt(queryParams.limit)
    }
    if (queryParams.offset !== undefined) {
      queryParams.offset = parseInt(queryParams.offset)
    }
    
    if (queryParams.price_max !== undefined) {
      queryParams.price_max = parseFloat(queryParams.price_max)
    }
    
    console.log('Query params en eventService:', queryParams)
    
    return axios.get(`${API_URL}/events`, { params: queryParams });
  },
  
  getFeaturedEvents(limit = 3) {
    return axios.get(`${API_URL}/events/featured`, { 
      params: { limit } 
    });
  },
  
  getHomeEvents(limit = 6) {
    return axios.get(`${API_URL}/events/home`, { 
      params: { limit } 
    });
  },
  
  getUpcomingEvents(limit = 6) {
    return axios.get(`${API_URL}/events/upcoming`, { 
      params: { limit } 
    });
  },
  
  getEvent(id) {
    return axios.get(`${API_URL}/events/${id}`);
  },
  
  getEventTypes() {
    return axios.get(`${API_URL}/events/types`);
  },
  
  getEventsByCreator(creatorId, limit = 10) {
    return axios.get(`${API_URL}/events/creator/${creatorId}`, {
      params: { limit }
    });
  },
  
  createEvent(eventData) {
    return axios.post(`${API_URL}/events`, eventData);
  },
  
  updateEvent(id, eventData) {
    return axios.put(`${API_URL}/events/${id}`, eventData);
  },
  
  deleteEvent(id) {
    return axios.delete(`${API_URL}/events/${id}`);
  },
  
  // CORRECCIÓN: Usar PATCH en lugar de PUT para coincidir con las rutas
  updateFeaturedStatus(id, isFeatured) {
    return axios.patch(`${API_URL}/events/${id}/featured`, { is_featured: isFeatured });
  },
  
  // CORRECCIÓN: Usar PATCH en lugar de PUT
  updateHomeStatus(id, isHome) {
    return axios.patch(`${API_URL}/events/${id}/home`, { is_home: isHome });
  },
  
  // CORRECCIÓN: Usar PATCH en lugar de PUT
  updateEventStatus(id, status) {
    return axios.patch(`${API_URL}/events/${id}/status`, { status });
  },
  
  uploadImage(formData) {
    return axios.post(`${API_URL}/events/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  
  getAllEvents() {
    return axios.get(`${API_URL}/events`, { 
      params: { limit: 100 }
    });
  }
};