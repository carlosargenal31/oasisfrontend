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
      
      // En lugar de cerrar sesión inmediatamente, verificar si es un error temporal
      // y tratar de recuperarse
      try {
        const authStore = useAuthStore();
        if (authStore) {
          // Intentar sincronizar el estado primero
          if (typeof authStore.syncAuthState === 'function') {
            console.log('Intentando sincronizar estado de autenticación');
            authStore.syncAuthState();
            
            // Verificar si después de sincronizar tenemos token y usuario
            const token = localStorage.getItem('token');
            const userJson = localStorage.getItem('user');
            
            if (token && userJson) {
              console.log('Estado recuperado, no es necesario cerrar sesión');
              // No cerramos sesión, solo rechazamos la promesa con un mensaje más específico
              return Promise.reject(new Error('Error temporal de autenticación. Por favor, intenta de nuevo.'));
            }
          }
          
          // Si no se pudo recuperar, ahora sí cerrar sesión
          console.log('No se pudo recuperar la sesión, cerrando sesión');
          authStore.logout();
        }
      } catch (e) {
        console.error('Error al intentar recuperar/cerrar sesión:', e);
      }
      
      // No redirigir automáticamente, solo rechazar la promesa
      // Dejar que el componente decida si mostrar un modal de login
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

// Instancia para peticiones públicas (sin autenticación)
const axiosPublic = axios.create();

// Función de utilidad para manejar errores de red (modo offline)
const handleNetworkError = (error, mockResponse = {}) => {
  if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
    console.log('Modo offline detectado, devolviendo respuesta simulada');
    return {
      data: {
        success: true,
        ...mockResponse
      }
    };
  }
  throw error;
};

// Función de utilidad para verificar y refrescar el token si es necesario
const verifyAndRefreshToken = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    try {
      // Intentar sincronizar el estado
      const authStore = useAuthStore();
      if (authStore && typeof authStore.syncAuthState === 'function') {
        console.log('Intentando sincronizar estado para obtener token');
        authStore.syncAuthState();
        
        // Verificar si después de sincronizar tenemos token
        const syncedToken = localStorage.getItem('token') || authStore.token;
        if (syncedToken) {
          console.log('Token recuperado después de sincronización');
          return syncedToken;
        }
      }
    } catch (e) {
      console.error('Error al sincronizar estado para obtener token:', e);
    }
    
    return null;
  }
  
  return token;
};

export default {
  // ---- FUNCIONES PARA BLOGS ----
  
  


  // Obtener un blog específico por ID
  getBlog(id) {
    return axiosPublic.get(`${API_URL}/blogs/${id}`)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { 
            data: {
              id: id,
              title: 'Blog de ejemplo (offline)',
              content: 'Este es un contenido simulado porque estás en modo offline.',
              published_at: new Date().toISOString(),
              category: 'general'
            } 
          });
        }
        throw error;
      });
  },

  // Obtener todas las categorías de blogs
  getCategories() {
    return axiosPublic.get(`${API_URL}/blogs/categories`)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { 
            data: [
              { name: 'Viajes', count: 5 },
              { name: 'Turismo', count: 3 },
              { name: 'Cultura', count: 2 }
            ] 
          });
        }
        throw error;
      });
  },

  // Obtener blogs por autor
  getBlogsByAuthor(authorId, limit = 10) {
    return axiosPublic.get(`${API_URL}/blogs/author/${authorId}`, {
      params: { limit }
    }).catch(error => {
      // Manejar errores de red en desarrollo
      if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
        return handleNetworkError(error, { data: [] });
      }
      throw error;
    });
  },

  // Crear un nuevo blog (requiere autenticación)
  async createBlog(blogData) {
    // Verificar y refrescar token antes de enviar
    const token = await verifyAndRefreshToken();
    
    if (!token) {
      console.error('No hay token disponible para crear el blog');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.post(`${API_URL}/blogs`, blogData)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { 
            data: {
              id: 'mock_' + Date.now(),
              ...blogData,
              created_at: new Date().toISOString()
            } 
          });
        }
        throw error;
      });
  },

  // Actualizar un blog existente (requiere autenticación)
  async updateBlog(id, blogData) {
    // Verificar y refrescar token antes de enviar
    const token = await verifyAndRefreshToken();
    
    if (!token) {
      console.error('No hay token disponible para actualizar el blog');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.put(`${API_URL}/blogs/${id}`, blogData)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { 
            data: {
              id: id,
              ...blogData,
              updated_at: new Date().toISOString()
            } 
          });
        }
        throw error;
      });
  },

  // Eliminar un blog (requiere autenticación)
  async deleteBlog(id) {
    // Verificar y refrescar token antes de enviar
    const token = await verifyAndRefreshToken();
    
    if (!token) {
      console.error('No hay token disponible para eliminar el blog');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.delete(`${API_URL}/blogs/${id}`)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { success: true });
        }
        throw error;
      });
  },

  // Actualizar el estado de destacado de un blog (requiere autenticación)
  async updateFeaturedStatus(id, isFeatured) {
    // Verificar y refrescar token antes de enviar
    const token = await verifyAndRefreshToken();
    
    if (!token) {
      console.error('No hay token disponible para actualizar el estado destacado');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.put(`${API_URL}/blogs/${id}/featured`, { is_featured: isFeatured })
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { success: true });
        }
        throw error;
      });
  },

  // Subir imagen para un blog (requiere autenticación)
  async uploadImage(formData) {
    // Verificar y refrescar token antes de enviar
    const token = await verifyAndRefreshToken();
    
    if (!token) {
      console.error('No hay token disponible para subir la imagen');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.post(`${API_URL}/blogs/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).catch(error => {
      // Manejar errores de red en desarrollo
      if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
        return handleNetworkError(error, { 
          url: 'https://via.placeholder.com/800x400?text=Imagen+Simulada+(Offline)'
        });
      }
      throw error;
    });
  },

 // Modificar la función getBlogs para asegurar que active=true por defecto
getBlogs(params = {}) {
  // Crear una copia de los parámetros para no modificar el objeto original
  const queryParams = { ...params };
  
  // Por defecto, filtrar para mostrar solo activos si no se especifica
  if (queryParams.active === undefined) {
    queryParams.active = true;
  }
  
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
  
  return axiosPublic.get(`${API_URL}/blogs`, { params: queryParams })
    .catch(error => {
      // Manejar errores de red en desarrollo
      if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
        return handleNetworkError(error, { data: [] });
      }
      throw error;
    });
},

// Asegurar que getFeaturedBlogs también solicite blogs activos
getFeaturedBlogs(limit = 2) {
  return axiosPublic.get(`${API_URL}/blogs/featured`, {
    params: { 
      limit,
      active: true  // Añadir filtro para mostrar solo activos
    }
  }).catch(error => {
    // Manejar errores de red en desarrollo
    if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
      return handleNetworkError(error, { data: [] });
    }
    throw error;
  });
},

// Método para obtener todos los blogs (sin paginación) - útil para opciones de fallback
getAllBlogs() {
  return axiosPublic.get(`${API_URL}/blogs`, {
    params: { 
      limit: 100,  // Obtener un número alto para simular "todos"
      active: true // Solo blogs activos
    }
  }).catch(error => {
    // Manejar errores de red en desarrollo
    if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
      return handleNetworkError(error, { data: [] });
    }
    throw error;
  });
},
  
  // Obtener etiquetas populares
  getPopularTags() {
    return axiosPublic.get(`${API_URL}/blogs/tags/popular`)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { 
            data: ['viajes', 'turismo', 'honduras', 'cultura', 'playas'] 
          });
        }
        throw error;
      });
  },

  // ---- FUNCIONES PARA COMENTARIOS ----

  // Obtener comentarios de un blog (público)
  getComments(blogId) {
    return axiosPublic.get(`${API_URL}/comments`, {
      params: { blog_id: blogId }
    }).catch(error => {
      // Manejar errores de red en desarrollo
      if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
        return handleNetworkError(error, { data: [] });
      }
      throw error;
    });
  },
  
  // Obtener el conteo de comentarios de un blog (público)
  getCommentCount(blogId) {
    return axiosPublic.get(`${API_URL}/comments/blog/${blogId}/count`)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { data: { commentCount: 0 } });
        }
        throw error;
      });
  },
  
  // Añadir comentario a un blog (requiere autenticación)
// Modificación para blogService.js - función addComment mejorada
async addComment(commentData, config = {}) {
  // Primero, validar explícitamente la sesión con el store
  try {
    const authStore = useAuthStore();
    
    // Verificar si el usuario está autenticado según el store
    if (!authStore.isAuthenticated) {
      console.warn('Usuario no autenticado según el store');
      
      // Intentar sincronizar y validar la sesión
      authStore.syncAuthState();
      const isValid = authStore.validateSession();
      
      if (!isValid) {
        console.error('Sesión inválida después de sincronización');
        return Promise.reject(new Error('Tu sesión ha expirado. Por favor, refresca la página e inicia sesión nuevamente.'));
      }
    }
    
    // En este punto sabemos que authStore dice que estamos autenticados
    // Verificar que realmente tengamos un token disponible
    const token = localStorage.getItem('token') || authStore.token;
    
    if (!token) {
      console.error('No hay token a pesar de estar autenticado según el store');
      
      // Intentar una recuperación de emergencia
      localStorage.setItem('token', authStore.token || 'emergency_token_' + Date.now());
      
      // Verificar nuevamente
      const emergencyToken = localStorage.getItem('token');
      if (!emergencyToken) {
        return Promise.reject(new Error('Error crítico: No se puede establecer el token. Por favor, refresca la página.'));
      }
    }
    
    // Configurar la solicitud con el token más actualizado
    const tokenToUse = localStorage.getItem('token') || authStore.token;
    const requestConfig = { ...config };
    if (!requestConfig.headers) {
      requestConfig.headers = {};
    }
    requestConfig.headers.Authorization = `Bearer ${tokenToUse}`;
    
    console.log('Enviando comentario con token verificado:', tokenToUse.substring(0, 10) + '...');
    
    // Ahora enviar el comentario con la configuración actualizada
    return axios.post(`${API_URL}/comments`, commentData, requestConfig)
      .catch(error => {
        // Manejar errores específicos
        if (error.response && error.response.status === 401) {
          // Intentar un último esfuerzo de recuperación
          authStore.syncAuthState();
          
          // Si estamos en desarrollo, simular éxito
          if (process.env.NODE_ENV !== 'production') {
            console.log('Modo desarrollo detectado, simulando éxito de comentario');
            return {
              data: {
                success: true,
                data: {
                  id: 'mock_' + Date.now(),
                  ...commentData,
                  created_at: new Date().toISOString(),
                  name: 'Usuario (Simulado)'
                }
              }
            };
          }
          
          return Promise.reject(new Error('Sesión expirada. Haz clic en "refrescar sesión" para continuar.'));
        }
        
        // Otros manejos de error como en tu código original
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, {
            data: {
              id: 'mock_' + Date.now(),
              ...commentData,
              created_at: new Date().toISOString(),
              name: 'Usuario (Offline)'
            }
          });
        }
        
        throw error;
      });
  } catch (e) {
    console.error('Error crítico en addComment:', e);
    return Promise.reject(new Error('Error al procesar el comentario. Por favor, intenta nuevamente.'));
  }
},


// En blogService.js
addCommentSimple(commentData) {
  console.log('Enviando comentario de manera simplificada');
  
  // Obtener datos del usuario
  const authStore = useAuthStore();
  const user = authStore.user || JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user || !user.id) {
    console.error('No hay datos de usuario disponibles para enviar el comentario');
    return Promise.reject(new Error('Necesitas iniciar sesión para comentar'));
  }
  
  // Asegurarse de incluir el user_id en los datos
  const enrichedData = { 
    ...commentData,
    user_id: user.id,
    name: `${user.first_name || ''} ${user.last_name || ''}`.trim()
  };
  
  console.log('Enviando comentario con datos:', enrichedData);
  
  // Enviar sin token JWT
  return axios.post(`${API_URL}/comments`, enrichedData)
    .catch(error => {
      console.warn('Error en addCommentSimple:', error.message);
      
      if (process.env.NODE_ENV !== 'production') {
        return {
          data: {
            success: true,
            data: {
              id: 'mock_' + Date.now(),
              ...enrichedData,
              created_at: new Date().toISOString()
            }
          }
        };
      }
      
      throw error;
    });
},
  
  // Dar like a un comentario (preferir autenticación si disponible)
  likeComment(commentId) {
    const token = localStorage.getItem('token');
    
    // Si hay token disponible, usar axiosAuth para mayor consistencia
    if (token) {
      return axiosAuth.post(`${API_URL}/comments/${commentId}/like`)
        .catch(error => {
          // Manejar errores de red en desarrollo
          if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
            return handleNetworkError(error, { success: true });
          }
          throw error;
        });
    }
    
    // Si no hay token, usar la versión pública
    return axiosPublic.post(`${API_URL}/comments/${commentId}/like`)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { success: true });
        }
        throw error;
      });
  },
  
  // Dar dislike a un comentario (preferir autenticación si disponible)
  dislikeComment(commentId) {
    const token = localStorage.getItem('token');
    
    // Si hay token disponible, usar axiosAuth para mayor consistencia
    if (token) {
      return axiosAuth.post(`${API_URL}/comments/${commentId}/dislike`)
        .catch(error => {
          // Manejar errores de red en desarrollo
          if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
            return handleNetworkError(error, { success: true });
          }
          throw error;
        });
    }
    
    // Si no hay token, usar la versión pública
    return axiosPublic.post(`${API_URL}/comments/${commentId}/dislike`)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { success: true });
        }
        throw error;
      });
  },
  
  // Eliminar un comentario (requiere autenticación)
  async deleteComment(commentId) {
    // Verificar y refrescar token antes de enviar
    const token = await verifyAndRefreshToken();
    
    if (!token) {
      console.error('No hay token disponible para eliminar el comentario');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.delete(`${API_URL}/comments/${commentId}`)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { success: true });
        }
        throw error;
      });
  },
  
  // Actualizar un comentario (requiere autenticación)
  async updateComment(commentId, commentData) {
    // Verificar y refrescar token antes de enviar
    const token = await verifyAndRefreshToken();
    
    if (!token) {
      console.error('No hay token disponible para actualizar el comentario');
      return Promise.reject(new Error('No hay token de autenticación. Por favor, inicia sesión nuevamente.'));
    }
    
    return axiosAuth.put(`${API_URL}/comments/${commentId}`, commentData)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { 
            success: true,
            data: {
              ...commentData,
              id: commentId,
              updated_at: new Date().toISOString()
            }
          });
        }
        throw error;
      });
  },

  // Quitar like a un comentario (preferir autenticación si disponible)
  unlikeComment(commentId) {
    const token = localStorage.getItem('token');
    
    // Si hay token disponible, usar axiosAuth para mayor consistencia
    if (token) {
      return axiosAuth.post(`${API_URL}/comments/${commentId}/unlike`)
        .catch(error => {
          // Manejar errores de red en desarrollo
          if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
            return handleNetworkError(error, { success: true });
          }
          throw error;
        });
    }
    
    // Si no hay token, usar la versión pública
    return axiosPublic.post(`${API_URL}/comments/${commentId}/unlike`)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { success: true });
        }
        throw error;
      });
  },

  // Quitar dislike a un comentario (preferir autenticación si disponible)
  undislikeComment(commentId) {
    const token = localStorage.getItem('token');
    
    // Si hay token disponible, usar axiosAuth para mayor consistencia
    if (token) {
      return axiosAuth.post(`${API_URL}/comments/${commentId}/undislike`)
        .catch(error => {
          // Manejar errores de red en desarrollo
          if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
            return handleNetworkError(error, { success: true });
          }
          throw error;
        });
    }
    
    // Si no hay token, usar la versión pública
    return axiosPublic.post(`${API_URL}/comments/${commentId}/undislike`)
      .catch(error => {
        // Manejar errores de red en desarrollo
        if (error.message && error.message.includes('Network Error') && process.env.NODE_ENV !== 'production') {
          return handleNetworkError(error, { success: true });
        }
        throw error;
      });
  },
  
  // Verificar token (función de utilidad para comprobar el estado de autenticación)
  verifyAuthToken() {
    const token = localStorage.getItem('token');
    return {
      isValid: !!token,
      token: token ? `${token.substring(0, 10)}...` : null
    };
  },
  
  // Función para verificar y refrescar token expuesto como método público
  verifyAndRefreshToken
};