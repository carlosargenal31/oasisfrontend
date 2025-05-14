// src/services/blogService.js
import axios from 'axios';
import { useAuthStore } from '@/store/auth'; // Importamos el store de autenticación
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

// Crear dos instancias de axios: una con autenticación y otra sin ella
// Instancia para peticiones que requieren autenticación
const axiosAuth = axios.create();

// Interceptor para añadir el token de autenticación a las peticiones
axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token encontrado y añadido a la petición');
    } else {
      console.warn('⚠️ No se encontró token para la solicitud autenticada');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar errores de autenticación
axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el error es 401 (No autorizado)
    if (error.response && error.response.status === 401) {
      console.error('Error de autenticación:', error.response.data);
      // Cerrar sesión si hay error de autenticación
      try {
        const authStore = useAuthStore();
        if (authStore) {
          console.log('Cerrando sesión debido a error de autenticación');
          authStore.logout();
        }
      } catch (e) {
        console.error('Error al intentar cerrar sesión:', e);
      }
      
      // Redirigir a login
      if (window.location.pathname !== '/login') {
        localStorage.setItem('redirect_after_login', window.location.pathname);
        // Usar router si está disponible, o redirección manual si no
        try {
          const router = window.router; // Asumiendo que el router está disponible globalmente
          if (router) router.push('/login');
          else window.location.href = '/login';
        } catch (e) {
          console.error('Error al redirigir:', e);
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

// Instancia para peticiones públicas (sin autenticación)
const axiosPublic = axios.create();

export default {
  // ---- FUNCIONES PARA BLOGS ----
  
  // Obtener todos los blogs con filtros opcionales
  getBlogs(params = {}) {
    // Crear una copia de los parámetros para no modificar el objeto original
    const queryParams = { ...params };
    
    // Transformar los parámetros de ordenación
    if (queryParams.sort) {
      // Manejar los valores amigables para el usuario
      if (queryParams.sort === 'newest') {
        queryParams.sort_by = 'published_at';
        queryParams.sort_order = 'desc';
      } else if (queryParams.sort === 'oldest') {
        queryParams.sort_by = 'published_at';
        queryParams.sort_order = 'asc';
      } else if (queryParams.sort === 'popular') {
        queryParams.sort_by = 'comments_count';
        queryParams.sort_order = 'desc';
      }
      
      // Eliminar el parámetro original 'sort' para evitar conflictos
      delete queryParams.sort;
    }
    
    return axiosPublic.get(`${API_URL}/blogs`, { params: queryParams });
  },

  // Obtener blogs destacados
  getFeaturedBlogs(limit = 2) {
    return axiosPublic.get(`${API_URL}/blogs/featured`, {
      params: { limit }
    });
  },

  // Obtener un blog específico por ID
  getBlog(id) {
    return axiosPublic.get(`${API_URL}/blogs/${id}`);
  },

  // Obtener todas las categorías de blogs
  getCategories() {
    return axiosPublic.get(`${API_URL}/blogs/categories`);
  },

  // Obtener blogs por autor
  getBlogsByAuthor(authorId, limit = 10) {
    return axiosPublic.get(`${API_URL}/blogs/author/${authorId}`, {
      params: { limit }
    });
  },

  // Crear un nuevo blog (requiere autenticación)
  createBlog(blogData) {
    // Verificar autenticación antes de enviar
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible para crear el blog');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.post(`${API_URL}/blogs`, blogData);
  },

  // Actualizar un blog existente (requiere autenticación)
  updateBlog(id, blogData) {
    // Verificar autenticación antes de enviar
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible para actualizar el blog');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.put(`${API_URL}/blogs/${id}`, blogData);
  },

  // Eliminar un blog (requiere autenticación)
  deleteBlog(id) {
    // Verificar autenticación antes de enviar
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible para eliminar el blog');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.delete(`${API_URL}/blogs/${id}`);
  },

  // Actualizar el estado de destacado de un blog (requiere autenticación)
  updateFeaturedStatus(id, isFeatured) {
    // Verificar autenticación antes de enviar
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible para actualizar el estado destacado');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.put(`${API_URL}/blogs/${id}/featured`, { is_featured: isFeatured });
  },

  // Subir imagen para un blog (requiere autenticación)
  uploadImage(formData) {
    // Verificar autenticación antes de enviar
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible para subir la imagen');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.post(`${API_URL}/blogs/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // Método para obtener todos los blogs (sin paginación) - útil para opciones de fallback
  getAllBlogs() {
    return axiosPublic.get(`${API_URL}/blogs`, {
      params: { limit: 100 } // Obtener un número alto para simular "todos"
    });
  },
  
  // Obtener etiquetas populares
  getPopularTags() {
    return axiosPublic.get(`${API_URL}/blogs/tags/popular`);
  },

  // ---- FUNCIONES PARA COMENTARIOS ----

  // Obtener comentarios de un blog (público)
  getComments(blogId) {
    return axiosPublic.get(`${API_URL}/comments`, {
      params: { blog_id: blogId }
    });
  },
  
  // Obtener el conteo de comentarios de un blog (público)
  getCommentCount(blogId) {
    return axiosPublic.get(`${API_URL}/comments/blog/${blogId}/count`);
  },
  
  // Añadir comentario a un blog (requiere autenticación)
  addComment(commentData) {
    // Verificar si hay token disponible
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible para enviar el comentario');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    // Imprimir información detallada para depuración
    console.log('Enviando comentario con token:', token.substring(0, 10) + '...');
    console.log('Datos del comentario:', JSON.stringify(commentData));
    
    // Llamar a la API con autenticación
    return axiosAuth.post(`${API_URL}/comments`, commentData)
      .catch(error => {
        console.error('Error al enviar comentario:', error.response ? error.response.data : error.message);
        throw error;
      });
  },
  
  // Dar like a un comentario (público, no requiere autenticación)
  likeComment(commentId) {
    return axiosPublic.post(`${API_URL}/comments/${commentId}/like`);
  },
  
  // Dar dislike a un comentario (público, no requiere autenticación)
  dislikeComment(commentId) {
    return axiosPublic.post(`${API_URL}/comments/${commentId}/dislike`);
  },
  
  // Eliminar un comentario (requiere autenticación)
  deleteComment(commentId) {
    // Verificar si hay token disponible
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible para eliminar el comentario');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.delete(`${API_URL}/comments/${commentId}`);
  },
  
  // Actualizar un comentario (requiere autenticación)
  updateComment(commentId, commentData) {
    // Verificar si hay token disponible
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible para actualizar el comentario');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.put(`${API_URL}/comments/${commentId}`, commentData);
  },

  // Quitar like a un comentario (público, no requiere autenticación)
  unlikeComment(commentId) {
    return axiosPublic.post(`${API_URL}/comments/${commentId}/unlike`);
  },

  // Quitar dislike a un comentario (público, no requiere autenticación)
  undislikeComment(commentId) {
    return axiosPublic.post(`${API_URL}/comments/${commentId}/undislike`);
  },
  
  // Verificar token (función de utilidad para comprobar el estado de autenticación)
  verifyAuthToken() {
    const token = localStorage.getItem('token');
    return {
      isValid: !!token,
      token: token ? `${token.substring(0, 10)}...` : null
    };
  }
};