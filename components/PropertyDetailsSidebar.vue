<template>
    <div class="property-details-sidebar">
      <!-- Monthly rent -->
      <div class="mb-6">
        <h2 class="text-xl font-bold text-gray-700 mb-2">Monthly rent:</h2>
        <p class="text-3xl font-bold text-gray-900">${{ formatPrice(property.price) }} <span class="text-base font-normal text-gray-500">/month</span></p>
      </div>
      
      <!-- Property Details Card -->
      <div class="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Property Details</h3>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Type:</span>
            <span class="font-medium">{{ property.property_type || 'apartment' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Apartment area:</span>
            <span class="font-medium">{{ property.square_feet }} sq.m</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Built:</span>
            <span class="font-medium">{{ property.yearBuilt || '2015' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Bedrooms:</span>
            <span class="font-medium">{{ property.bedrooms }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Bathrooms:</span>
            <span class="font-medium">{{ property.bathrooms }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Parking places:</span>
            <span class="font-medium">{{ property.parkingSpaces || '2' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Pets allowed:</span>
            <span class="font-medium">{{ property.petsAllowed || 'cats only' }}</span>
          </div>
        </div>
      </div>
      
      <!-- Book a viewing button -->
      <button class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded mb-4 transition">
        Book a viewing
      </button>
      
      <!-- FAQ link -->
      <a href="#" class="flex items-center justify-center text-red-500 hover:text-red-600 mb-6">
        <span class="mr-2">?</span>
        Frequently asked questions
      </a>
      
      <!-- Amenities -->
      <div class="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
        <div class="grid grid-cols-2 gap-y-3">
          <div v-for="(amenity, index) in amenities" :key="index" class="flex items-center">
            <span class="mr-2 text-gray-400">✓</span>
            <span>{{ amenity }}</span>
          </div>
        </div>
        <button v-if="amenities.length > 8" class="text-red-500 mt-3">
          Show more
        </button>
      </div>
      
      <!-- Not included -->
      <div class="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Not included in rent</h3>
        <div class="grid grid-cols-2 gap-y-3">
          <div v-for="(item, index) in notIncluded" :key="index" class="flex items-center">
            <span class="mr-2 text-gray-400">✓</span>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
      
      <!-- Publication details -->
      <div class="flex flex-wrap text-sm text-gray-500">
        <div class="mr-4 pr-4 border-r border-gray-200">Published: <b>{{ formatDate(property.createdAt) }}</b></div>
        <div class="mr-4 pr-4 border-r border-gray-200">Ad number: <b>{{ property.id || '681013232' }}</b></div>
        <div>Views: <b>48</b></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Props
  const props = defineProps({
    property: {
      type: Object,
      required: true
    },
    amenities: {
      type: Array,
      default: () => []
    },
    formatPrice: {
      type: Function,
      required: true
    },
    formatDate: {
      type: Function,
      required: true
    }
  });
  
  // Not included amenities
  const notIncluded = ref([
    'Swimming pool',
    'Restaurant',
    'Spa lounge',
    'Bar'
  ]);
  </script>
  
  <style scoped>
  .property-details-sidebar {
    position: relative;
  margin-bottom: 20px;
  }
  </style>