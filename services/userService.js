// services/userService.js
export const useUserService = () => {
    const { $axios } = useNuxtApp();
    
    /**
     * Obtiene el perfil del usuario actual
     */
    const getUserProfile = async () => {
      try {
        const response = await $axios.get('/users/profile');
        return response.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
    };
    
    /**
     * Actualiza el perfil del usuario
     * @param {Object} profileData - Datos del perfil a actualizar
     */
    const updateUserProfile = async (profileData) => {
      try {
        const response = await $axios.put('/users/profile', profileData);
        return response.data;
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
    };
    
    /**
     * Actualiza la contraseña del usuario
     * @param {Object} passwordData - Objeto con currentPassword y newPassword
     */
    const updatePassword = async (passwordData) => {
      try {
        const response = await $axios.put('/users/password', passwordData);
        return response.data;
      } catch (error) {
        console.error('Error updating password:', error);
        throw error;
      }
    };
    
    /**
     * Sube una imagen de perfil del usuario
     * @param {FormData} formData - FormData con la imagen a subir
     */
    const uploadAvatar = async (formData) => {
      try {
        const response = await $axios.post('/users/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error uploading avatar:', error);
        throw error;
      }
    };
    
    /**
     * Obtiene las propiedades favoritas del usuario
     */
    const getFavorites = async () => {
      try {
        const response = await $axios.get('/users/favorites');
        return response.data;
      } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
      }
    };
    
    /**
     * Añade una propiedad a favoritos
     * @param {number} propertyId - ID de la propiedad a añadir
     */
    const addToFavorites = async (propertyId) => {
      try {
        const response = await $axios.post(`/users/favorites/${propertyId}`);
        return response.data;
      } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error;
      }
    };
    
    /**
     * Elimina una propiedad de favoritos
     * @param {number} propertyId - ID de la propiedad a eliminar
     */
    const removeFromFavorites = async (propertyId) => {
      try {
        const response = await $axios.delete(`/users/favorites/${propertyId}`);
        return response.data;
      } catch (error) {
        console.error('Error removing from favorites:', error);
        throw error;
      }
    };
    
    /**
     * Elimina la cuenta de usuario actual
     */
    const deleteAccount = async () => {
      try {
        const authStore = useAuthStore();
        const userId = authStore.user?.id;
        
        if (!userId) {
          throw new Error('No user ID available');
        }
        
        const response = await $axios.delete(`/users/${userId}`);
        return response.data;
      } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
      }
    };
    
    /**
     * Obtiene las reservas del usuario
     */
    const getUserBookings = async () => {
      try {
        const response = await $axios.get('/bookings');
        return response.data;
      } catch (error) {
        console.error('Error fetching user bookings:', error);
        throw error;
      }
    };
    
    /**
     * Cancela una reserva
     * @param {number} bookingId - ID de la reserva a cancelar
     */
    const cancelBooking = async (bookingId) => {
      try {
        const response = await $axios.patch(`/bookings/${bookingId}/cancel`);
        return response.data;
      } catch (error) {
        console.error('Error canceling booking:', error);
        throw error;
      }
    };
    
    return {
      getUserProfile,
      updateUserProfile,
      updatePassword,
      uploadAvatar,
      getFavorites,
      addToFavorites,
      removeFromFavorites,
      deleteAccount,
      getUserBookings,
      cancelBooking
    };
  };