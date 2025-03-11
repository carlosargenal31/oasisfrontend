<template>
  <div class="property-gallery">
    <!-- Main image with navigation -->
    <div class="relative rounded-lg overflow-hidden mb-2">
      <img 
        :src="propertyImages[activeIndex]"
        alt="Property Image" 
        class="w-full h-[400px] object-cover"
      />
      
      <!-- Navigation arrows -->
      <button 
        @click="$emit('prev-image')" 
        class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
      >
        <span class="text-gray-700">←</span>
      </button>
      
      <button 
        @click="$emit('next-image')" 
        class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
      >
        <span class="text-gray-700">→</span>
      </button>
      
      <!-- Badges -->
      <div class="absolute top-3 left-3">
        <span class="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">Verified</span>
        <span v-if="isNew" class="bg-blue-500 ml-2 text-white px-2 py-1 rounded text-sm font-medium">New</span>
      </div>
      
      <!-- Favorite button -->
      <button 
        @click="$emit('toggle-favorite')" 
        class="absolute top-3 right-3 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
      >
        <span :class="{'text-red-500': isFavorite, 'text-gray-400': !isFavorite}">♥</span>
      </button>
    </div>
    
    <!-- Thumbnails -->
    <div class="flex overflow-x-auto gap-2 mb-4">
      <div
        v-for="(image, index) in propertyImages"
        :key="index"
        @click="$emit('set-active', index)"
        class="w-20 h-20 flex-shrink-0 cursor-pointer rounded overflow-hidden"
        :class="{'border-2 border-blue-500': index === activeIndex, 'border border-gray-200': index !== activeIndex}"
      >
        <img :src="image" :alt="'Thumbnail ' + (index + 1)" class="w-full h-full object-cover" />
      </div>
      <div class="w-20 h-20 flex-shrink-0 cursor-pointer rounded overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
        <div class="flex flex-col items-center">
          <span class="text-gray-500 text-lg">▶</span>
          <span class="text-gray-500 text-xs mt-1">Play video</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  propertyImages: {
    type: Array,
    required: true
  },
  activeIndex: {
    type: Number,
    default: 0
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
});

defineEmits(['prev-image', 'next-image', 'set-active', 'toggle-favorite']);
</script>

<style scoped>
.property-gallery {
  position: relative;
  margin-bottom: 20px;
}
</style>