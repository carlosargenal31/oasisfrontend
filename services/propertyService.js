// services/propertyService.js
export const usePropertyService = () => {
  const config = useRuntimeConfig();
  const { $axios } = useNuxtApp();
  
  // ================================
  // MÉTODOS ORIGINALES (para admin)
  // ================================
  
  // Fetch properties from API - ORIGINAL
  const getProperties = async (params = {}) => {
    try {
      const response = await $axios.get('/properties', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return { success: false, data: { properties: [], total: 0 } };
    }
  };
  
  // Obtener propiedades por categoría - ORIGINAL
  const getPropertiesByCategory = async (category, params = {}) => {
    try {
      const response = await $axios.get(`/properties/categories/${category}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching properties by category ${category}:`, error);
      return { success: false, data: { properties: [], total: 0 } };
    }
  };

  const getPropertiesByCategoryFeatured = async (category, params = {}) => {
    try {
      const response = await $axios.get(`/properties/categories/featured/${category}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching properties by category ${category}:`, error);
      return { success: false, data: { properties: [], total: 0 } };
    }
  };
  
  // Obtener propiedades por categoría Y tipo - ORIGINAL MEJORADO
  const getPropertiesByCategoryAndType = async (category, propertyType, params = {}) => {
    try {
      if (!category) {
        console.error('Error: Se requiere una categoría');
        return { success: false, data: { properties: [], total: 0 }, error: 'Categoría no proporcionada' };
      }
      
      // Clonar los parámetros básicos
      const queryParams = { ...params };
      
      // Asegurarse de que la categoría esté incluida
      queryParams.category = category;
      
      // Añadir el tipo de propiedad al objeto de parámetros
      if (propertyType) {
        if (Array.isArray(propertyType)) {
          // Si es un array, lo dejamos como está para que Axios lo maneje
          queryParams.property_type = propertyType;
        } else {
          queryParams.property_type = propertyType;
        }
      }
      
      console.log(`Solicitud API - Categoría: ${category}, Tipo: ${JSON.stringify(propertyType)}`);
      console.log('Parámetros completos:', queryParams);
      
      // Usar la ruta de categoría y pasar el tipo de propiedad como parámetro
      const response = await $axios.get(`/properties/categories/${category}`, { 
        params: queryParams 
      });
      
      if (response.data && response.data.success) {
        console.log(`Respuesta exitosa: ${response.data.data.properties?.length || 0} propiedades encontradas`);
        
        // Verificar que las propiedades devueltas coincidan con los filtros aplicados
        if (propertyType && response.data.data.properties?.length > 0) {
          const propiedadesFiltradasPorTipo = response.data.data.properties.filter(prop => {
            if (Array.isArray(propertyType)) {
              return propertyType.includes(prop.property_type);
            } else {
              return prop.property_type === propertyType;
            }
          });
          
          if (propiedadesFiltradasPorTipo.length !== response.data.data.properties.length) {
            console.warn('Advertencia: El API devolvió propiedades que no coinciden con los tipos solicitados');
            console.log(`Filtradas: ${propiedadesFiltradasPorTipo.length}, Total: ${response.data.data.properties.length}`);
            
            // Sobrescribir propiedades con las filtradas correctamente
            return {
              success: true,
              data: {
                properties: propiedadesFiltradasPorTipo,
                total: propiedadesFiltradasPorTipo.length,
                page: response.data.data.page,
                limit: response.data.data.limit,
                totalPages: Math.ceil(propiedadesFiltradasPorTipo.length / response.data.data.limit)
              }
            };
          }
        }
        
        return response.data;
      } else {
        console.error('Error en respuesta del API:', response.data);
        return {
          success: false,
          data: { properties: [], total: 0 },
          error: response.data?.message || 'Error desconocido al obtener propiedades'
        };
      }
    } catch (error) {
      console.error(`Error obteniendo propiedades por categoría ${category} y tipo ${propertyType}:`, error);
      return {
        success: false,
        data: { properties: [], total: 0 },
        error: error.message || 'Error en la solicitud al API'
      };
    }
  };
  
  // Get all main categories - ORIGINAL
  const getMainCategories = async () => {
    try {
      const response = await $axios.get('/properties/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { success: false, data: [] };
    }
  };
  
  // Get a single property by ID - ORIGINAL
  const getProperty = async (id) => {
    try {
      const response = await $axios.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      return null;
    }
  };
  
  // Create a new property - ORIGINAL
  const createProperty = async (propertyData) => {
    try {
      const response = await $axios.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  };
  
  // Update a property - ORIGINAL
  const updateProperty = async (id, propertyData) => {
    try {
      const response = await $axios.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating property ${id}:`, error);
      throw error;
    }
  };
  
  // Delete a property - ORIGINAL
  const deleteProperty = async (id) => {
    try {
      const response = await $axios.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting property ${id}:`, error);
      throw error;
    }
  };
  
  // Get featured properties - ORIGINAL
  const getFeaturedProperties = async (limit = 6, status = null) => {
    try {
      const params = { limit };
      if (status) params.status = status;
      
      const response = await $axios.get('/properties/featured', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      return { success: false, data: [] };
    }
  };
  
  // Get recent properties - ORIGINAL
  const getRecentProperties = async (limit = 6, status = null) => {
    try {
      const params = { limit };
      if (status) params.status = status;
      
      const response = await $axios.get('/properties/recent', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent properties:', error);
      return { success: false, data: [] };
    }
  };
  
  // Get popular properties - ORIGINAL
  const getPopularProperties = async (limit = 6) => {
    try {
      const response = await $axios.get('/properties/popular', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular properties:', error);
      return { success: false, data: [] };
    }
  };
  
  // Search properties by query - ORIGINAL MEJORADO
  const searchProperties = async (query, fields = [], params = {}) => {
    try {
      if (!query) {
        console.error('Error: Término de búsqueda no proporcionado');
        return { 
          success: false, 
          data: { properties: [], total: 0 },
          error: 'Se requiere un término de búsqueda'
        };
      }
      
      // Combinar parámetros de búsqueda con sort, page, limit, etc.
      const queryParams = { 
        q: query,
        ...params 
      };
      
      // Si se proporcionan campos específicos para buscar
      if (fields && fields.length > 0) {
        queryParams.searchFields = fields.join(',');
      }
      
      // Imprimir parámetros completos para debug
      console.log('Enviando búsqueda con parámetros:', JSON.stringify(queryParams, null, 2));
      
      const response = await $axios.get('/properties/search', { params: queryParams });
      
      // Validar respuesta
      if (response.data && response.data.success) {
        const { properties = [], total = 0 } = response.data.data || {};
        console.log(`Búsqueda exitosa: ${properties.length} resultados de ${total} totales`);
        
        // Filtrar categoría/tipo si corresponde
        if (params.category || params.property_type) {
          console.log('Respuesta contiene filtros de categoría/tipo');
        }
        
        return response.data;
      } else {
        console.warn('Respuesta de búsqueda sin éxito:', response.data);
        return { 
          success: false, 
          data: { properties: [], total: 0 },
          error: response.data?.message || 'Error desconocido en la búsqueda'
        };
      }
    } catch (error) {
      console.error('Error searching properties:', error);
      return { 
        success: false, 
        data: { properties: [], total: 0 },
        error: error.message || 'Error en la solicitud de búsqueda'
      };
    }
  };

  // ================================
  // NUEVOS MÉTODOS PARA PROPIEDADES ACTIVAS (para usuarios públicos)
  // ================================
  
  // Método para obtener solo propiedades activas
  const getActiveProperties = async (params = {}) => {
    try {
      const response = await $axios.get('/properties/active', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching active properties:', error);
      return { success: false, data: { properties: [], total: 0 } };
    }
  };

  // Método para buscar en propiedades activas
  const searchActiveProperties = async (query, fields = [], params = {}) => {
    try {
      if (!query) {
        console.error('Error: Término de búsqueda no proporcionado');
        return { 
          success: false, 
          data: { properties: [], total: 0 },
          error: 'Se requiere un término de búsqueda'
        };
      }
      
      // Combinar parámetros de búsqueda con sort, page, limit, etc.
      const queryParams = { 
        q: query,
        ...params 
      };
      
      // Si se proporcionan campos específicos para buscar
      if (fields && fields.length > 0) {
        queryParams.searchFields = fields.join(',');
      }
      
      console.log('Enviando búsqueda activa con parámetros:', JSON.stringify(queryParams, null, 2));
      
      const response = await $axios.get('/properties/active/search', { params: queryParams });
      
      // Validar respuesta
      if (response.data && response.data.success) {
        const { properties = [], total = 0 } = response.data.data || {};
        console.log(`Búsqueda activa exitosa: ${properties.length} resultados de ${total} totales`);
        
        return response.data;
      } else {
        console.warn('Respuesta de búsqueda activa sin éxito:', response.data);
        return { 
          success: false, 
          data: { properties: [], total: 0 },
          error: response.data?.message || 'Error desconocido en la búsqueda'
        };
      }
    } catch (error) {
      console.error('Error searching active properties:', error);
      return { 
        success: false, 
        data: { properties: [], total: 0 },
        error: error.message || 'Error en la solicitud de búsqueda activa'
      };
    }
  };

  // Método para obtener propiedades activas por categoría
  const getActivePropertiesByCategory = async (category, params = {}) => {
    try {
      const response = await $axios.get(`/properties/active/categories/${category}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching active properties by category ${category}:`, error);
      return { success: false, data: { properties: [], total: 0 } };
    }
  };

  // Método para obtener propiedades activas por categoría y tipo
  const getActivePropertiesByCategoryAndType = async (category, propertyType, params = {}) => {
    try {
      if (!category) {
        console.error('Error: Se requiere una categoría');
        return { success: false, data: { properties: [], total: 0 }, error: 'Categoría no proporcionada' };
      }
      
      // Clonar los parámetros básicos
      const queryParams = { ...params };
      
      // Asegurarse de que la categoría esté incluida
      queryParams.category = category;
      
      // Añadir el tipo de propiedad al objeto de parámetros
      if (propertyType) {
        if (Array.isArray(propertyType)) {
          queryParams.property_type = propertyType;
        } else {
          queryParams.property_type = propertyType;
        }
      }
      
      console.log(`Solicitud API activa - Categoría: ${category}, Tipo: ${JSON.stringify(propertyType)}`);
      console.log('Parámetros completos (activos):', queryParams);
      
      // Usar la ruta de categoría activa
      const response = await $axios.get(`/properties/active/categories/${category}`, { 
        params: queryParams 
      });
      
      if (response.data && response.data.success) {
        console.log(`Respuesta activa exitosa: ${response.data.data.properties?.length || 0} propiedades encontradas`);
        return response.data;
      } else {
        console.error('Error en respuesta del API activo:', response.data);
        return {
          success: false,
          data: { properties: [], total: 0 },
          error: response.data?.message || 'Error desconocido al obtener propiedades activas'
        };
      }
    } catch (error) {
      console.error(`Error obteniendo propiedades activas por categoría ${category} y tipo ${propertyType}:`, error);
      return {
        success: false,
        data: { properties: [], total: 0 },
        error: error.message || 'Error en la solicitud al API de propiedades activas'
      };
    }
  };

  // Método para obtener categorías principales activas
  const getActiveMainCategories = async (params = {}) => {
    try {
      const response = await $axios.get('/properties/active/categories', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching active main categories:', error);
      return { success: false, data: [] };
    }
  };

  // Método para obtener propiedades destacadas activas
  const getActiveFeaturedProperties = async (limit = 6, status = null) => {
    try {
      const params = { limit };
      if (status) params.status = status;
      
      const response = await $axios.get('/properties/active/featured', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching active featured properties:', error);
      return { success: false, data: [] };
    }
  };

  // Método para obtener propiedades recientes activas
  const getActiveRecentProperties = async (limit = 6, status = null) => {
    try {
      const params = { limit };
      if (status) params.status = status;
      
      const response = await $axios.get('/properties/active/recent', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching active recent properties:', error);
      return { success: false, data: [] };
    }
  };

  // Método para obtener propiedades populares activas
  const getActivePopularProperties = async (limit = 6) => {
    try {
      const response = await $axios.get('/properties/active/popular', { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching active popular properties:', error);
      return { success: false, data: [] };
    }
  };

  // ================================
  // MÉTODOS COMPARTIDOS
  // ================================

  // Increment property views - MEJORADO
  const incrementPropertyViews = async (id) => {
    try {
      if (!id) {
        console.error('Error: ID de propiedad requerido para incrementar vistas');
        return { success: false };
      }
      
      // Verificar si ya hemos visitado esta propiedad en esta sesión
      const viewedProperties = JSON.parse(localStorage.getItem('viewedProperties') || '[]');
      
      // Solo enviar la solicitud si no hemos visto la propiedad en esta sesión
      if (!viewedProperties.includes(parseInt(id))) {
        console.log(`Incrementando vistas para propiedad ${id}`);
        const response = await $axios.post(`/properties/${id}/view`);
        
        if (response.data && response.data.success) {
          // Añadir a las propiedades ya vistas
          viewedProperties.push(parseInt(id));
          localStorage.setItem('viewedProperties', JSON.stringify(viewedProperties));
          
          console.log('Vista registrada exitosamente en el servidor');
          return response.data;
        }
      } else {
        console.log(`Propiedad ${id} ya vista en esta sesión, no se incrementa el contador`);
        // Retornar "éxito" aunque no incrementamos, para no mostrar error al usuario
        return { success: true, message: 'Vista ya registrada en esta sesión' };
      }
      
      return { success: false };
    } catch (error) {
      console.error(`Error incrementando vistas para propiedad ${id}:`, error);
      return { success: false, error: error.message };
    }
  };
  
  // Get similar properties
  const getSimilarProperties = async (id, limit = 4) => {
    try {
      const response = await $axios.get(`/properties/${id}/similar`, { params: { limit } });
      return response.data;
    } catch (error) {
      console.error(`Error fetching similar properties for ${id}:`, error);
      return { success: false, data: [] };
    }
  };
  
  // Obtener la calificación promedio de una propiedad
  const getPropertyRating = async (propertyId) => {
    try {
      console.log(`Solicitando rating para propiedad ${propertyId}`);
      const response = await $axios.get(`/reviews/property/${propertyId}/rating`);
      console.log('Respuesta rating:', response.data);
      
      if (response.data && response.data.success) {
        // Asegurar que se retorne un número
        const rating = response.data.data.averageRating;
        return rating !== null && rating !== undefined ? Number(rating) : 0;
      }
      console.log(`No se encontró rating para propiedad ${propertyId}, retornando 0`);
      return 0;
    } catch (error) {
      console.error(`Error al obtener calificación para propiedad ${propertyId}:`, error);
      return 0;
    }
  };
  
  // Obtener todas las reseñas de una propiedad
  const getPropertyReviews = async (propertyId) => {
    try {
      const response = await $axios.get('/reviews', { 
        params: { property_id: propertyId } 
      });
      
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data.reviews
        };
      }
      return { success: false, data: [] };
    } catch (error) {
      console.error(`Error al obtener reseñas para propiedad ${propertyId}:`, error);
      return { success: false, data: [] };
    }
  };
  
  return {
    // MÉTODOS ORIGINALES (para admin)
    getProperties,
    getPropertiesByCategory,
    getPropertiesByCategoryFeatured,
    getPropertiesByCategoryAndType,
    getMainCategories,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    getFeaturedProperties,
    getRecentProperties,
    getPopularProperties,
    searchProperties,
    
    // NUEVOS MÉTODOS ACTIVOS (para usuarios públicos)
    getActiveProperties,
    searchActiveProperties,
    getActivePropertiesByCategory,
    getActivePropertiesByCategoryAndType,
    getActiveMainCategories,
    getActiveFeaturedProperties,
    getActiveRecentProperties,
    getActivePopularProperties,
    
    // MÉTODOS COMPARTIDOS
    incrementPropertyViews,
    getSimilarProperties,
    getPropertyRating,
    getPropertyReviews
  };
};