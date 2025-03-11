// pages/favorites.vue
<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-semibold mb-6">My Favorite Properties</h1>
    
    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500">Loading your favorites...</p>
    </div>
    
    <div v-else-if="favorites.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">You haven't added any properties to your favorites yet.</p>
      <nuxt-link to="/properties" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Browse Properties
      </nuxt-link>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PropertyCard 
        v-for="property in favorites" 
        :key="property.id"
        :property="property"
        :is-favorite="true"
        @favorite-changed="onFavoriteChanged"
      />
    </div>
  </div>
</template>

<script>
import { userApi } from '~/services/api';
import PropertyCard from '~/components/property/PropertyCard.vue';

export default {
  components: {
    PropertyCard
  },
  
  middleware: 'auth',
  
  data() {
    return {
      favorites: [],
      loading: true
    };
  },
  
  async mounted() {
    await this.loadFavorites();
  },
  
  methods: {
    async loadFavorites() {
      try {
        this.loading = true;
        const response = await userApi.getFavorites();
        this.favorites = response.data.data;
      } catch (error) {
        console.error('Error loading favorites:', error);
        // Show error notification
      } finally {
        this.loading = false;
      }
    },
    
    onFavoriteChanged(isFavorite, propertyId) {
      if (!isFavorite) {
        // Remove from local list if unfavorited
        this.favorites = this.favorites.filter(p => p.id !== propertyId);
      }
    }
  }
};
</script>