import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login
      if (window.location.pathname !== '/auth/login') {
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

export default {
  // Auth
  login(credentials) {
    return apiClient.post('/login', credentials);
  },
  
  register(userData) {
    return apiClient.post('/register', userData);
  },
  
  requestPasswordReset(email) {
    return apiClient.post('/request-reset', { email });
  },
  
  resetPassword(data) {
    return apiClient.post('/reset-password', data);
  },
  
  changePassword(data) {
    return apiClient.post('/change-password', data);
  },
  
  // User
  getCurrentUser() {
    return apiClient.get('/user');
  },
  
  updateUser(id, userData) {
    return apiClient.put(`/user/${id}`, userData);
  },
  
  // Properties
  getProperties(params) {
    return apiClient.get('/properties', { params });
  },
  
  getProperty(id) {
    return apiClient.get(`/properties/${id}`);
  },
  
  createProperty(propertyData) {
    return apiClient.post('/properties', propertyData);
  },
  
  updateProperty(id, propertyData) {
    return apiClient.put(`/properties/${id}`, propertyData);
  },
  
  deleteProperty(id) {
    return apiClient.delete(`/properties/${id}`);
  },
  
  searchProperties(params) {
    return apiClient.get('/properties/search', { params });
  },
  
  // Bookings
  getBookings(params) {
    return apiClient.get('/', { params });
  },
  
  getBooking(id) {
    return apiClient.get(`/${id}`);
  },
  
  createBooking(bookingData) {
    return apiClient.post('/', bookingData);
  },
  
  updateBookingStatus(id, status) {
    return apiClient.put(`/${id}/status`, { status });
  },
  
  // Reviews
  getReviews(params) {
    return apiClient.get('/', { params });
  },
  
  getReview(id) {
    return apiClient.get(`/${id}`);
  },
  
  createReview(reviewData) {
    return apiClient.post('/', reviewData);
  },
  
  updateReview(id, reviewData) {
    return apiClient.put(`/${id}`, reviewData);
  },
  
  deleteReview(id) {
    return apiClient.delete(`/${id}`);
  },
  
  // Messages
  sendMessage(messageData) {
    return apiClient.post('/', messageData);
  },
  
  getUserConversations(userId) {
    return apiClient.get(`/conversations/${userId}`);
  },
  
  getConversation(user1Id, user2Id) {
    return apiClient.get(`/${user1Id}/${user2Id}`);
  },
  
  markAsRead(conversationId, userId) {
    return apiClient.put(`/read/${conversationId}/${userId}`);
  },
  
  deleteMessage(messageId) {
    return apiClient.delete(`/${messageId}`);
  },
  
  // Payments
  createPayment(paymentData) {
    return apiClient.post('/', paymentData);
  },
  
  getPayments() {
    return apiClient.get('/');
  },
  
  getPayment(id) {
    return apiClient.get(`/${id}`);
  },
  
  refundPayment(id) {
    return apiClient.post(`/${id}/refund`);
  }
};