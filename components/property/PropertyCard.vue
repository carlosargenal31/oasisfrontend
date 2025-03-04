<template>
    <div class="card group overflow-hidden transition-all duration-300">
      <!-- Property Image -->
      <div class="relative overflow-hidden h-56">
        <img 
          :src="property.image" 
          :alt="property.title" 
          class="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        >
        
        <!-- Status Badge -->
        <div 
          :class="[
            'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold', 
            property.status === 'for-sale' ? 'bg-blue-500 text-white' : 'bg-amber-500 text-white'
          ]"
        >
          {{ formatStatus(property.status) }}
        </div>
        
        <!-- Price Badge -->
        <div class="absolute bottom-3 left-3 bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-sm">
          {{ formatPrice(property.price) }}
        </div>
      </div>
      
      <!-- Property Details -->
      <div class="p-5">
        <h3 class="text-xl font-semibold mb-2 line-clamp-1">
          {{ property.title }}
        </h3>
        
        <!-- Location -->
        <div class="flex items-center text-gray-600 dark:text-gray-400 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-sm line-clamp-1">{{ property.address }}</span>
        </div>
        
        <!-- Short Description -->
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {{ property.description }}
        </p>
        
        <!-- Features -->
        <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{{ property.bedrooms }} Beds</span>
          </div>
          
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <span>{{ property.bathrooms }} Baths</span>
          </div>
          
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span>{{ formatArea(property.area) }}</span>
          </div>
        </div>
        
        <!-- View Details Button -->
        <div class="mt-4">
          <NuxtLink 
            :to="`/properties/${property.id}`" 
            class="inline-block w-full text-center py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-200 rounded-md font-medium transition-colors"
          >
            View Details
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    property: {
      type: Object,
      required: true
    }
  });
  
  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Format status
  const formatStatus = (status) => {
    switch (status) {
      case 'for-sale':
        return 'For Sale';
      case 'for-rent':
        return 'For Rent';
      case 'sold':
        return 'Sold';
      case 'rented':
        return 'Rented';
      default:
        return status;
    }
  };
  
  // Format area
  const formatArea = (area) => {
    return `${area} sqft`;
  };
  </script>