// frontend/services/api.js
import axios from 'axios';

const API_URL = process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(config => {
  if (process.client) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth services
export const authApi = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
  changePassword: (passwordData) => api.post('/auth/change-password', passwordData)
};

// User services
export const userApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  getFavorites: () => api.get('/users/favorites'),
  addFavorite: (propertyId) => api.post(`/users/favorites/${propertyId}`),
  removeFavorite: (propertyId) => api.delete(`/users/favorites/${propertyId}`)
};

// Property services
export const propertyApi = {
  getProperties: (params) => api.get('/properties', { params }),
  getProperty: (id) => api.get(`/properties/${id}`),
  createProperty: (propertyData) => api.post('/properties', propertyData),
  updateProperty: (id, propertyData) => api.put(`/properties/${id}`, propertyData),
  deleteProperty: (id) => api.delete(`/properties/${id}`),
  searchProperties: (query) => api.get('/properties/search', { params: { q: query } })
};

// Booking services
export const bookingApi = {
  getBookings: () => api.get('/bookings'),
  getBooking: (id) => api.get(`/bookings/${id}`),
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  cancelBooking: (id) => api.patch(`/bookings/${id}/cancel`)
};

export default {
  auth: authApi,
  users: userApi,
  properties: propertyApi,
  bookings: bookingApi
};