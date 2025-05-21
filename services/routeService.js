// services/routeService.js
export const useRouteService = () => {
  const { $axios } = useNuxtApp();
  
  /**
   * Geocodifica una dirección utilizando el backend
   * @param {string} address - Dirección a geocodificar
   * @returns {Promise<Object>} - Coordenadas y detalles de la dirección
   */
  const geocodeAddress = async (address) => {
    try {
      if (!address || address.trim() === '') {
        throw new Error('Se requiere una dirección para geocodificar');
      }
      
      const response = await $axios.get('/routes/geocode', {
        params: { address }
      });
      
      if (response.data && response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data?.message || 'Error en la geocodificación');
      }
    } catch (error) {
      console.error('Error en geocodeAddress:', error);
      throw error;
    }
  };
  
  /**
   * Calcula la ruta entre dos puntos utilizando el backend
   * @param {Object} origin - Coordenadas o dirección de origen
   * @param {Object} destination - Coordenadas o dirección de destino
   * @returns {Promise<Object>} - Detalles de la ruta
   */
  const calculateRoute = async (origin, destination) => {
    try {
      let params = {};
      
      // Configurar parámetros según lo que se proporcione
      if (typeof origin === 'string') {
        params.originAddress = origin;
      } else if (origin && origin.lat && origin.lng) {
        params.originLat = origin.lat;
        params.originLng = origin.lng;
      } else {
        throw new Error('Se requiere un origen válido');
      }
      
      if (typeof destination === 'string') {
        params.destinationAddress = destination;
      } else if (destination && destination.lat && destination.lng) {
        params.destinationLat = destination.lat;
        params.destinationLng = destination.lng;
      } else {
        throw new Error('Se requiere un destino válido');
      }
      
      const response = await $axios.get('/routes/calculate', { params });
      
      if (response.data && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data?.message || 'Error al calcular la ruta');
      }
    } catch (error) {
      console.error('Error en calculateRoute:', error);
      throw error;
    }
  };
  
  return {
    geocodeAddress,
    calculateRoute
  };
};