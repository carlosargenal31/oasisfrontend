<template>
    <div class="recently-viewed mt-10">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Recently viewed</h2>
        <a href="/properties" class="text-blue-500 flex items-center">
          View all <span class="ml-1">→</span>
        </a>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Property card -->
        <div v-for="(listing, i) in recentlyViewed" :key="i" class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300">
          <div class="relative">
            <img :src="listing.image" alt="Property" class="w-full h-48 object-cover" />
            <div class="absolute top-3 left-3">
              <span class="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Verified</span>
              <span v-if="listing.isNew" class="bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">New</span>
              <span v-if="listing.isFeatured" class="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded block">Featured</span>
            </div>
            <button class="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
              <span class="text-gray-400">♡</span>
            </button>
          </div>
          
          <div class="p-4">
            <div class="text-sm font-medium text-blue-500 uppercase mb-1">
              {{ listing.status === 'for-sale' ? 'FOR SALE' : 'FOR RENT' }}
            </div>
            <h3 class="font-medium text-gray-900 mb-1">
              {{ listing.title }} | {{ listing.square_feet }} sq.m
            </h3>
            <p class="text-sm text-gray-500 mb-2">{{ listing.address }}</p>
            <div class="font-bold text-gray-900 mb-2">
              ${{ formatPrice(listing.price) }}
              <span v-if="listing.status === 'for-rent'" class="text-sm font-normal text-gray-500">/month</span>
            </div>
            <div class="flex justify-between text-sm text-gray-500">
              <span>{{ listing.bedrooms }} <i class="text-gray-400">bed</i></span>
              <span>{{ listing.bathrooms }} <i class="text-gray-400">bath</i></span>
              <span>{{ listing.parkingSpaces }} <i class="text-gray-400">car</i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Props
  defineProps({
    recentlyViewed: {
      type: Array,
      required: true
    },
    formatPrice: {
      type: Function,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .recently-viewed {
    position: relative;
    margin-bottom: 20px;
  }
  </style>