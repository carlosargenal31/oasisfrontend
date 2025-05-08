// services/propertyService.js
export const usePropertyService = () => {
  const config = useRuntimeConfig();
  const { $axios } = useNuxtApp();
  
  // Fetch properties from API - Ruta corregida sin /api al principio
  const getProperties = async (params = {}) => {
    try {
      const response = await $axios.get('/properties', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Get a single property by ID - Ruta corregida sin /api al principio
  const getProperty = async (id) => {
    try {
      const response = await $axios.get(`/properties/${id}`);
      
      // Incrementar contador de vistas al obtener detalles
      // Esto se puede hacer en paralelo sin esperar la respuesta
      incrementViews(id).catch(err => console.warn('Error incrementing views:', err));
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      return { success: false, error: error.message };
    }
  };
  
  // Incrementar vistas de una propiedad - Ruta corregida sin /api al principio
  const incrementViews = async (id) => {
    try {
      const response = await $axios.post(`/properties/${id}/view`);
      return response.data;
    } catch (error) {
      console.error(`Error incrementing views for property ${id}:`, error);
      return { success: false, error: error.message };
    }
  };
  
  // Obtener propiedades destacadas - Ruta corregida sin /api al principio
  const getFeaturedProperties = async (limit = 6, status = null) => {
    try {
      const params = { limit };
      if (status) params.status = status;
      
      const response = await $axios.get('/properties/featured', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Obtener propiedades recientes - Ruta corregida sin /api al principio
  const getRecentProperties = async (limit = 6, status = null) => {
    try {
      const params = { limit };
      if (status) params.status = status;
      
      const response = await $axios.get('/properties/recent', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching recent properties:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Obtener propiedades populares (más vistas) - Ruta corregida sin /api al principio
  const getPopularProperties = async (limit = 6) => {
    try {
      const params = { limit };
      
      const response = await $axios.get('/properties/popular', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular properties:', error);
      return { success: false, error: error.message };
    }
  };
  
  // Obtener propiedades similares a una dada - Ruta corregida sin /api al principio
  const getSimilarProperties = async (id, limit = 4) => {
    try {
      const params = { limit };
      
      const response = await $axios.get(`/properties/${id}/similar`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching similar properties for ${id}:`, error);
      return { success: false, error: error.message };
    }
  };
  
  // Create a new property - Ruta corregida sin /api al principio
  const createProperty = async (propertyData) => {
    try {
      const response = await $axios.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  };
  
  // Update a property - Ruta corregida sin /api al principio
  const updateProperty = async (id, propertyData) => {
    try {
      const response = await $axios.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating property ${id}:`, error);
      throw error;
    }
  };
  
  // Delete a property - Ruta corregida sin /api al principio
  const deleteProperty = async (id) => {
    try {
      const response = await $axios.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting property ${id}:`, error);
      throw error;
    }
  };
  
  // Archivar una propiedad (soft delete) - Ruta corregida sin /api al principio
  const archiveProperty = async (id, reason = null) => {
    try {
      const response = await $axios.patch(`/properties/${id}/archive`, { reason });
      return response.data;
    } catch (error) {
      console.error(`Error archiving property ${id}:`, error);
      throw error;
    }
  };
  
  // Restaurar una propiedad archivada - Ruta corregida sin /api al principio
  const restoreProperty = async (id, status = 'active') => {
    try {
      const response = await $axios.patch(`/properties/${id}/restore`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error restoring property ${id}:`, error);
      throw error;
    }
  };
  
  return {
    getProperties,
    getProperty,
    incrementViews,
    getFeaturedProperties,
    getRecentProperties,
    getPopularProperties,
    getSimilarProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    archiveProperty,
    restoreProperty
  };
};