<template>
    <div class="container-custom py-12">
      <h1 class="text-3xl font-bold mb-6">Saved Properties</h1>
      
      <!-- Loading State -->
      <div v-if="userStore.loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="userStore.error" class="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
        <p class="text-red-700 dark:text-red-300">{{ userStore.error }}</p>
      </div>
      
      <!-- Favorites Grid -->
      <div v-else-if="userStore.favorites.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="favorite in userStore.favorites" 
          :key="favorite.id" 
          class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
        >
          <!-- Remove from favorites button -->
          <button 
            @click="removeFromFavorites(favorite.property_id)" 
            class="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          <!-- Property Image -->
          <div class="bg-gray-200 w-full h-48 flex items-center justify-center">
            <span class="text-gray-600">Property Image</span>
          </div>
          
          <!-- Property Info -->
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold">{{ favorite.property?.title || 'Property' }}</h3>
              <span class="text-green-600 font-semibold">${{ formatPrice(favorite.property?.price) }}</span>
            </div>
            <p class="text-gray-500 dark:text-gray-400 mb-4">
              {{ getPropertyAddress(favorite.property) }}
            </p>
            <div class="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4">
              <span v-if="favorite.property?.bedrooms" class="mr-4">{{ favorite.property.bedrooms }} Bedrooms</span>
              <span v-if="favorite.property?.bathrooms" class="mr-4">{{ favorite.property.bathrooms }} Baths</span>
              <span v-if="favorite.property?.square_feet">{{ favorite.property.square_feet }} sqft</span>
            </div>
            <NuxtLink :to="`/properties/${favorite.property_id}`" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
              View Details →
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg text-center">
        <h3 class="text-xl font-semibold mb-2">No saved properties</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          You haven't saved any properties yet. Browse properties and click the heart icon to save them.
        </p>
        <NuxtLink to="/properties" class="text-blue-600 dark:text-blue-400 font-medium">
          Browse Properties
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useUserStore } from '~/store/user';
  
  // Initialize store
  const userStore = useUserStore();
  
  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Format property address
  const getPropertyAddress = (property) => {
    if (!property) return 'Address not available';
    
    const parts = [
      property.address,
      property.city,
      property.state,
      property.zip_code
    ].filter(Boolean);
    
    return parts.join(', ');
  };
  
  // Remove property from favorites
  const removeFromFavorites = async (propertyId) => {
    if (!propertyId) return;
    
    try {
      await userStore.removeFromFavorites(propertyId);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };
  
  // Fetch favorites when component mounts
  onMounted(() => {
    userStore.fetchFavorites();
  });
  
  // Page meta
  definePageMeta({
    middleware: ['auth']
  });
  </script>
  
  <style scoped>
  .container-custom {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  </style>