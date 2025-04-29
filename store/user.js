// store/user.js
import { defineStore } from 'pinia';
import { useAuthStore } from './auth';
import { useUserService } from '../services/userService';

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null,
    favorites: [],
    bookings: [],
    properties: [], // Para anfitriones
    loading: false,
    loadingFavorites: false,
    loadingBookings: false,
    loadingProperties: false,
    error: null
  }),
  
  getters: {
    getProfile: (state) => state.profile,
    
    getFullName: (state) => {
      if (!state.profile) return '';
      return `${state.profile.first_name} ${state.profile.last_name}`;
    },
    
    getFavorites: (state) => state.favorites,
    
    getBookings: (state) => state.bookings,
    
    getProperties: (state) => state.properties,
    
    isPropertyFavorite: (state) => (propertyId) => {
      return state.favorites.some(fav => fav.id === propertyId);
    }
  },
  
  actions: {
    // Actualizar estado
    setProfile(profile) {
      this.profile = profile;
    },
    
    setFavorites(favorites) {
      this.favorites = favorites;
    },
    
    setBookings(bookings) {
      this.bookings = bookings;
    },
    
    setProperties(properties) {
      this.properties = properties;
    },
    
    setLoading(loading) {
      this.loading = loading;
    },
    
    setError(error) {
      this.error = error;
    },
    
    // Acciones con API
    async fetchProfile() {
      this.loading = true;
      this.error = null;
      
      try {
        const userService = useUserService();
        const response = await userService.getUserProfile();
        
        if (response.success && response.data) {
          this.profile = response.data;
          
          // Actualizar también los datos en el store de auth
          const authStore = useAuthStore();
          if (authStore.user) {
            authStore.setUser({
              ...authStore.user,
              ...response.data
            });
          }
          
          return { success: true };
        } else {
          this.error = 'No se pudo obtener el perfil de usuario';
          return { success: false, error: this.error };
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        this.error = error.response?.data?.message || 'Failed to load profile. Please try again.';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    async updateProfile(profileData) {
      this.loading = true;
      this.error = null;
      
      try {
        const userService = useUserService();
        const response = await userService.updateUserProfile(profileData);
        
        if (response.success) {
          // Actualizar el estado local
          await this.fetchProfile();
          
          return { success: true };
        } else {
          this.error = response.message || 'No se pudo actualizar el perfil';
          return { success: false, error: this.error };
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        this.error = error.response?.data?.message || 'Failed to update profile. Please try again.';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    async uploadAvatar(formData) {
      this.loading = true;
      this.error = null;
      
      try {
        const userService = useUserService();
        const response = await userService.uploadAvatar(formData);
        
        if (response.success) {
          // Refrescar el perfil para obtener la URL actualizada del avatar
          await this.fetchProfile();
          return { success: true };
        } else {
          this.error = response.message || 'No se pudo subir la imagen';
          return { success: false, error: this.error };
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        this.error = error.response?.data?.message || 'Failed to upload avatar. Please try again.';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    async changePassword(passwordData) {
      this.loading = true;
      this.error = null;
      
      try {
        const userService = useUserService();
        const response = await userService.updatePassword(passwordData);
        
        if (response.success) {
          return { success: true };
        } else {
          this.error = response.message || 'No se pudo cambiar la contraseña';
          return { success: false, error: this.error };
        }
      } catch (error) {
        console.error('Error changing password:', error);
        this.error = error.response?.data?.message || 'Failed to change password. Please try again.';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    async fetchFavorites() {
      this.loadingFavorites = true;
      this.error = null;
      
      try {
        const userService = useUserService();
        const response = await userService.getFavorites();
        
        if (response.success && response.data) {
          this.favorites = response.data;
          return { success: true };
        } else {
          this.error = 'No se pudieron cargar los favoritos';
          return { success: false, error: this.error };
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        this.error = error.response?.data?.message || 'Failed to load favorites. Please try again.';
        return { success: false, error: this.error };
      } finally {
        this.loadingFavorites = false;
      }
    },
    
    async addToFavorites(propertyId) {
      try {
        const userService = useUserService();
        const response = await userService.addToFavorites(propertyId);
        
        if (response.success) {
          // Refresh favorites list
          await this.fetchFavorites();
          return { success: true };
        } else {
          return { 
            success: false, 
            error: response.message || 'No se pudo añadir a favoritos'
          };
        }
      } catch (error) {
        console.error('Error adding to favorites:', error);
        return { 
          success: false, 
          error: error.response?.data?.message || 'Failed to add property to favorites.' 
        };
      }
    },
    
    async removeFromFavorites(propertyId) {
      try {
        const userService = useUserService();
        const response = await userService.removeFromFavorites(propertyId);
        
        if (response.success) {
          // Update local state directly for immediate UI response
          this.favorites = this.favorites.filter(fav => fav.id !== propertyId);
          return { success: true };
        } else {
          return { 
            success: false, 
            error: response.message || 'No se pudo eliminar de favoritos'
          };
        }
      } catch (error) {
        console.error('Error removing from favorites:', error);
        return { 
          success: false, 
          error: error.response?.data?.message || 'Failed to remove property from favorites.' 
        };
      }
    },
    
    async fetchBookings() {
      this.loadingBookings = true;
      this.error = null;
      
      try {
        const userService = useUserService();
        const response = await userService.getUserBookings();
        
        if (response.success && response.data) {
          this.bookings = response.data;
          return { success: true };
        } else {
          this.error = 'No se pudieron cargar las reservas';
          return { success: false, error: this.error };
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        this.error = error.response?.data?.message || 'Failed to load bookings. Please try again.';
        return { success: false, error: this.error };
      } finally {
        this.loadingBookings = false;
      }
    },
    
    async cancelBooking(bookingId) {
      try {
        const userService = useUserService();
        const response = await userService.cancelBooking(bookingId);
        
        if (response.success) {
          // Refrescar la lista de reservas
          await this.fetchBookings();
          return { success: true };
        } else {
          return { 
            success: false, 
            error: response.message || 'No se pudo cancelar la reserva'
          };
        }
      } catch (error) {
        console.error('Error canceling booking:', error);
        return { 
          success: false, 
          error: error.response?.data?.message || 'Failed to cancel booking.' 
        };
      }
    },
    
    async deleteAccount() {
      this.loading = true;
      this.error = null;
      
      try {
        const userService = useUserService();
        const response = await userService.deleteAccount();
        
        if (response.success) {
          // Logout user
          const authStore = useAuthStore();
          authStore.logout();
          
          return { success: true };
        } else {
          this.error = response.message || 'No se pudo eliminar la cuenta';
          return { success: false, error: this.error };
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        this.error = error.response?.data?.message || 'Failed to delete account. Please try again.';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    }
  }
});