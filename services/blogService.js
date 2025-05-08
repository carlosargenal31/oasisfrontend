// src/services/blogService.js
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
  // Obtener todos los blogs con filtros opcionales
  getBlogs(params = {}) {
    return axios.get(`${API_URL}/blogs`, { params });
  },
  
  // Obtener blogs destacados
  getFeaturedBlogs(limit = 2) {
    return axios.get(`${API_URL}/blogs/featured`, { 
      params: { limit } 
    });
  },
  
  // Obtener un blog específico por ID
  getBlog(id) {
    return axios.get(`${API_URL}/blogs/${id}`);
  },
  
  // Obtener todas las categorías de blogs
  getCategories() {
    return axios.get(`${API_URL}/blogs/categories`);
  },
  
  // Obtener blogs por autor
  getBlogsByAuthor(authorId, limit = 10) {
    return axios.get(`${API_URL}/blogs/author/${authorId}`, {
      params: { limit }
    });
  },
  
  // Crear un nuevo blog
  createBlog(blogData) {
    return axios.post(`${API_URL}/blogs`, blogData);
  },
  
  // Actualizar un blog existente
  updateBlog(id, blogData) {
    return axios.put(`${API_URL}/blogs/${id}`, blogData);
  },
  
  // Eliminar un blog
  deleteBlog(id) {
    return axios.delete(`${API_URL}/blogs/${id}`);
  },
  
  // Actualizar el estado de destacado de un blog
  updateFeaturedStatus(id, isFeatured) {
    return axios.put(`${API_URL}/blogs/${id}/featured`, { is_featured: isFeatured });
  },
  
  // Subir imagen para un blog
  uploadImage(formData) {
    return axios.post(`${API_URL}/blogs/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};