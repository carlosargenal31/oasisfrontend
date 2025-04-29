<template>
    <div class="user-favorites">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Mis propiedades favoritas</h3>
        </div>
        
        <div class="p-6">
          <!-- Loading state -->
          <div v-if="userStore.loadingFavorites" class="flex justify-center py-6">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
          
          <!-- Error state -->
          <div v-else-if="userStore.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {{ userStore.error }}
          </div>
          
          <!-- Empty state -->
          <div v-else-if="favorites.length === 0" class="text-center py-10">
            <div class="empty-state">
              <Icon name="ph:heart" class="h-16 w-16 mx-auto text-gray-300" />
              <h4 class="mt-4 text-lg font-medium text-gray-900">No tienes propiedades favoritas</h4>
              <p class="mt-2 text-gray-500">Cuando marques una propiedad como favorita, aparecerá aquí.</p>
              <router-link to="/properties" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                Explorar propiedades
              </router-link>
            </div>
          </div>
          
          <!-- Favorites grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="property in favorites" :key="property.id" class="relative">
              <div class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <!-- Favorite button -->
                <button 
                  class="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10 text-red-500"
                  @click="removeFromFavorites(property.id)"
                >
                  <Icon name="ph:heart-fill" class="h-5 w-5" />
                </button>
                
                <!-- Property image -->
                <div class="relative h-48">
                  <img 
                    :src="property.main_image || 'https://via.placeholder.com/300x200'" 
                    alt="Imagen de propiedad"
                    class="absolute h-full w-full object-cover"
                  />
                </div>
                
                <div class="p-4">
                  <h5 class="text-lg font-medium text-gray-900 mb-1">{{ property.title }}</h5>
                  <p class="text-gray-500 text-sm mb-2 flex items-center">
                    <Icon name="ph:map-pin" class="h-4 w-4 mr-1" />
                    {{ property.location }}
                  </p>
                  <p class="text-gray-900 font-medium">
                    <span class="mr-1">${{ property.price }}</span>
                    <span class="text-gray-500 text-sm">/ noche</span>
                  </p>
                  
                  <div class="mt-4 pt-4 border-t">
                    <router-link 
                      :to="`/properties/${property.id}`" 
                      class="inline-flex items-center text-sm text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      Ver detalles
                      <Icon name="ph:arrow-right" class="ml-1 h-4 w-4" />
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue';
  import { useUserStore } from '../../store/user';
  import { useRouter } from 'vue-router';
  
  // Stores
  const userStore = useUserStore();
  const router = useRouter();
  
  // Computed properties
  const favorites = computed(() => userStore.favorites || []);
  
  // Methods
  const removeFromFavorites = async (propertyId) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta propiedad de tus favoritos?')) {
      await userStore.removeFromFavorites(propertyId);
    }
  };
  
  // Lifecycle hooks
  onMounted(async () => {
    await userStore.fetchFavorites();
  });
  </script>