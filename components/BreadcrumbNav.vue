<template>
    <div class="flex items-center text-sm text-gray-600 mb-4">
      <a href="/" class="hover:text-orange-600 text-gray-600">Home</a>
      <span class="mx-2 text-gray-600">›</span>
      <a :href="property?.status === 'for-rent' ? '/properties?type=rent' : '/properties?type=sale'" class="hover:text-orange-600 text-gray-600">
        Property for {{ property?.status === 'for-rent' ? 'rent' : 'sale' }}
      </a>
      <span class="mx-2 text-gray-600">›</span>
      <span class="text-orange-600">{{ property?.title || 'Property Details' }}</span>
    </div>
  </template>
    
  <script setup>
  // Property is passed as a prop from the parent component
  defineProps({
    property: {
      type: Object,
      required: true
    }
  });
  </script>