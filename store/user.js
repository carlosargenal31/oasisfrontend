// store/user.js
export const useUserStore = defineStore('user', {
    state: () => ({
      profile: null,
      favorites: [],
      loading: false,
      error: null
    }),
    
    actions: {
      // Fetch user profile
      async fetchProfile() {
        this.loading = true;
        this.error = null;
        
        try {
          const { $axios } = useNuxtApp();
          const response = await $axios.get('/users/profile');
          
          this.profile = response.data;
        } catch (error) {
          console.error('Error fetching user profile:', error);
          this.error = 'Failed to load profile. Please try again.';
        } finally {
          this.loading = false;
        }
      },
      
      // Update user profile
      async updateProfile(profileData) {
        this.loading = true;
        this.error = null;
        
        try {
          const { $axios } = useNuxtApp();
          const response = await $axios.put('/users/profile', profileData);
          
          this.profile = response.data;
          
          // Update auth store user data if needed
          const authStore = useAuthStore();
          if (authStore.user) {
            authStore.user = {
              ...authStore.user,
              ...profileData
            };
            
            // Update localStorage
            if (process.client) {
              localStorage.setItem('user', JSON.stringify(authStore.user));
            }
          }
          
          return { success: true };
        } catch (error) {
          console.error('Error updating profile:', error);
          this.error = error.response?.data?.message || 'Failed to update profile. Please try again.';
          return { success: false, error: this.error };
        } finally {
          this.loading = false;
        }
      },
      
      // Change password
      async changePassword(passwordData) {
        this.loading = true;
        this.error = null;
        
        try {
          const { $axios } = useNuxtApp();
          await $axios.put('/users/password', passwordData);
          
          return { success: true };
        } catch (error) {
          console.error('Error changing password:', error);
          this.error = error.response?.data?.message || 'Failed to change password. Please try again.';
          return { success: false, error: this.error };
        } finally {
          this.loading = false;
        }
      },
      
      // Fetch user's favorite properties
      async fetchFavorites() {
        this.loading = true;
        this.error = null;
        
        try {
          const { $axios } = useNuxtApp();
          const response = await $axios.get('/users/favorites');
          
          this.favorites = response.data;
        } catch (error) {
          console.error('Error fetching favorites:', error);
          this.error = 'Failed to load favorites. Please try again.';
        } finally {
          this.loading = false;
        }
      },
      
      // Add property to favorites
      async addToFavorites(propertyId) {
        try {
          const { $axios } = useNuxtApp();
          await $axios.post(`/users/favorites/${propertyId}`);
          
          // Refresh favorites
          await this.fetchFavorites();
          
          return { success: true };
        } catch (error) {
          console.error('Error adding to favorites:', error);
          return { 
            success: false, 
            error: error.response?.data?.message || 'Failed to add property to favorites.' 
          };
        }
      },
      
      // Remove property from favorites
      async removeFromFavorites(propertyId) {
        try {
          const { $axios } = useNuxtApp();
          await $axios.delete(`/users/favorites/${propertyId}`);
          
          // Remove from local state
          this.favorites = this.favorites.filter(fav => fav.property_id !== propertyId);
          
          return { success: true };
        } catch (error) {
          console.error('Error removing from favorites:', error);
          return { 
            success: false, 
            error: error.response?.data?.message || 'Failed to remove property from favorites.' 
          };
        }
      },
      
      // Check if a property is in favorites
      isPropertyFavorite(propertyId) {
        return this.favorites.some(fav => fav.property_id === propertyId);
      }
    }
  });