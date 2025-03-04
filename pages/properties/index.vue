<template>
    <div class="container-custom py-12">
      <h1 class="text-3xl font-bold mb-6">Properties</h1>
      
      <!-- Filters -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Find Your Perfect Property</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Type Filter -->
          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-2">Property Type</label>
            <select v-model="filters.property_type" class="w-full px-4 py-2 border rounded-lg">
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          
          <!-- Price Range -->
          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
            <div class="flex space-x-2">
              <input v-model="filters.minPrice" type="number" placeholder="Min" class="w-1/2 px-4 py-2 border rounded-lg" />
              <input v-model="filters.maxPrice" type="number" placeholder="Max" class="w-1/2 px-4 py-2 border rounded-lg" />
            </div>
          </div>
          
          <!-- Location -->
          <div>
            <label class="block text-gray-700 dark:text-gray-300 mb-2">Location</label>
            <input v-model="filters.city" type="text" placeholder="City, neighborhood" class="w-full px-4 py-2 border rounded-lg" />
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-4">
          <button @click="clearFilters" class="px-4 py-2 border border-gray-300 rounded-lg">
            Clear Filters
          </button>
          <button @click="applyFilters" class="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Search Properties
          </button>
        </div>
      </div>
      
      <!-- Loading state -->
      <div v-if="propertyStore.loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      
      <!-- Error state -->
      <div v-else-if="propertyStore.error" class="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
        <p class="text-red-700 dark:text-red-300">{{ propertyStore.error }}</p>
      </div>
      
      <!-- Property grid -->
      <div v-else-if="propertyStore.properties.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="property in propertyStore.properties" :key="property.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div class="bg-gray-200 w-full h-48 flex items-center justify-center">
            <span class="text-gray-600">Property Image</span>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold">{{ property.title }}</h3>
              <span class="text-green-600 font-semibold">${{ formatPrice(property.price) }}</span>
            </div>
            <p class="text-gray-500 dark:text-gray-400 mb-4">
              {{ property.address }}, {{ property.city }}, {{ property.state }} {{ property.zip_code }}
            </p>
            <div class="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4">
              <span v-if="property.bedrooms" class="mr-4">{{ property.bedrooms }} Bedrooms</span>
              <span v-if="property.bathrooms" class="mr-4">{{ property.bathrooms }} Baths</span>
              <span v-if="property.square_feet">{{ property.square_feet }} sqft</span>
            </div>
            <NuxtLink :to="`/properties/${property.id}`" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">
              View Details →
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-else class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg text-center">
        <h3 class="text-xl font-semibold mb-2">No properties found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your filters or check back later.</p>
        <button @click="clearFilters" class="text-blue-600 dark:text-blue-400 font-medium">
          Clear all filters
        </button>
      </div>
  
      <!-- Add debug info (remove for production) -->
      <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Debug Info</h3>
        <pre class="text-xs overflow-auto">{{ JSON.stringify(propertyStore.$state, null, 2) }}</pre>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { usePropertyStore } from '~/store/property';
  
  // Initialize store
  const propertyStore = usePropertyStore();
  
  // Local filters state
  const filters = ref({
    property_type: '',
    minPrice: '',
    maxPrice: '',
    city: ''
  });
  
  // Apply filters and fetch properties
  const applyFilters = () => {
    const filterParams = {};
    
    if (filters.value.property_type) filterParams.property_type = filters.value.property_type;
    if (filters.value.minPrice) filterParams.minPrice = Number(filters.value.minPrice);
    if (filters.value.maxPrice) filterParams.maxPrice = Number(filters.value.maxPrice);
    if (filters.value.city) filterParams.city = filters.value.city;
    
    // Update store filters
    propertyStore.setFilters(filterParams);
    
    // Fetch properties with new filters
    propertyStore.fetchProperties();
  };
  
  // Clear all filters
  const clearFilters = () => {
    filters.value = {
      property_type: '',
      minPrice: '',
      maxPrice: '',
      city: ''
    };
    
    propertyStore.clearFilters();
    propertyStore.fetchProperties();
  };
  
  // Helper function to format prices
  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Fetch properties when the component mounts
  onMounted(() => {
    propertyStore.fetchProperties();
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