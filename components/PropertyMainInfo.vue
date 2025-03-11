<template>
    <div class="property-main-info mb-8">
      <!-- Property Title -->
      <h1 class="text-3xl font-bold text-black mb-2">{{ property.title }}</h1>
      <p class="text-gray-700 mb-4">{{ property.address }}, {{ property.city }}, {{ property.state }} {{ property.zip_code }}</p>
      
      <!-- Features Icons -->
      <div class="flex mb-8">
        <div class="flex items-center mr-6">
          <span class="font-semibold mr-1 text-black">{{ property.bedrooms }}</span>
          <span class="text-gray-700">bed</span>
        </div>
        <div class="flex items-center mr-6">
          <span class="font-semibold mr-1 text-black">{{ property.bathrooms }}</span>
          <span class="text-gray-700">bath</span>
        </div>
        <div class="flex items-center mr-6">
          <span class="font-semibold mr-1 text-black">{{ property.parkingSpaces || '2' }}</span>
          <span class="text-gray-700">car</span>
        </div>
        <div class="flex items-center">
          <span class="font-semibold mr-1 text-black">{{ property.square_feet }}</span>
          <span class="text-gray-700">sq.m</span>
        </div>
      </div>
      
      <!-- Overview -->
      <div class="mb-8">
        <h2 class="section-title text-2xl font-bold text-black mb-4">Overview</h2>
        <p class="text-gray-700 leading-relaxed">
          {{ property.description || 'Description not available.' }}
        </p>
      </div>
      
      <!-- Agent Info - Con link al perfil -->
      <div>
        <h2 class="section-title text-2xl font-bold text-black mb-4">
          {{ property.status === 'for-rent' ? 'Rental agent' : 'Sales agent' }}
        </h2>
        <div class="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div class="md:w-1/4 bg-gray-100 flex items-center justify-center py-8">
            <a href="/agents" class="cursor-pointer">
              <img src="https://placehold.co/200x200?text=Agent" alt="Agent" class="w-32 h-32 object-cover rounded-full hover:opacity-90 transition-opacity" />
            </a>
          </div>
          <div class="md:w-3/4 p-6">
            <div class="flex items-start justify-between">
              <div>
                <blockquote class="text-gray-700 italic mb-4">
                  "Amet libero morbi venenatis ut est. Iaculis leo ultricies nunc id ante adipiscing. Vel metus odio at faucibus ac. Neque id placerat et id ut."
                </blockquote>
                <h3 class="text-xl font-bold text-black">
                  <a href="/agents" class="hover:text-blue-600 transition-colors">
                    Kristin Watson
                  </a>
                </h3>
                <p class="text-gray-700">Imperial Property Group {{ property.status === 'for-rent' ? 'Rental' : 'Sales' }} Agent</p>
                <div class="flex mt-4 space-x-2">
                  <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">f</a>
                  <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600">t</a>
                  <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-pink-600">i</a>
                </div>
              </div>
              <div class="text-right">
                <div class="flex text-yellow-500">
                  <span>★★★★★</span>
                </div>
                <a href="/agents" class="text-gray-700 text-sm hover:text-blue-600 transition-colors">
                  24 reviews
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
  // Props
  defineProps({
    property: {
      type: Object,
      required: true
    }
  });
  </script>
    
  <style scoped>
  .property-main-info {
    position: relative;
  }
  </style>