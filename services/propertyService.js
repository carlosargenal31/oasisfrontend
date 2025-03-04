// services/propertyService.js
export const usePropertyService = () => {
    const config = useRuntimeConfig();
    const { $axios } = useNuxtApp();
    
    // Fetch properties from API
    const getProperties = async (params = {}) => {
      try {
        const response = await $axios.get('/properties', { params });
        return response.data;
      } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
      }
    };
    
    // Get a single property by ID
    const getProperty = async (id) => {
      try {
        const response = await $axios.get(`/properties/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching property ${id}:`, error);
        return null;
      }
    };
    
    // Create a new property
    const createProperty = async (propertyData) => {
      try {
        const response = await $axios.post('/properties', propertyData);
        return response.data;
      } catch (error) {
        console.error('Error creating property:', error);
        throw error;
      }
    };
    
    // Update a property
    const updateProperty = async (id, propertyData) => {
      try {
        const response = await $axios.put(`/properties/${id}`, propertyData);
        return response.data;
      } catch (error) {
        console.error(`Error updating property ${id}:`, error);
        throw error;
      }
    };
    
    // Delete a property
    const deleteProperty = async (id) => {
      try {
        const response = await $axios.delete(`/properties/${id}`);
        return response.data;
      } catch (error) {
        console.error(`Error deleting property ${id}:`, error);
        throw error;
      }
    };
    
    return {
      getProperties,
      getProperty,
      createProperty,
      updateProperty,
      deleteProperty
    };
  };
  
 