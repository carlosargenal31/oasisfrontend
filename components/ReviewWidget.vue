<template>
    <div class="review-widget">
      <!-- Encabezado con Rating Promedio -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-black">
          <span class="material-icons text-yellow-400 align-middle">star</span>
          {{ averageRating }} ({{ reviews.length }} reseñas)
        </h2>
        <button 
          v-if="!hideAddButton" 
          @click="$emit('add-review')" 
          class="btn-primary text-white bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded"
        >
          <span class="material-icons align-middle mr-1">edit</span>Añadir reseña
        </button>
        <!-- Indicador de carga -->
      <div v-if="loading" class="flex justify-center py-4">
        <div class="spinner border-4 border-gray-200 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>
      </div>
      
      <!-- Mensaje de no hay reseñas -->
      <div v-else-if="reviews.length === 0" class="text-center py-8 text-gray-500">
        No hay reseñas disponibles para esta propiedad.
      </div>
      
      <!-- Lista de reseñas -->
      <div v-else v-for="(review, index) in displayedReviews" :key="index" class="mb-4 pb-4 border-b">
        <div class="flex justify-between mb-3">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-bold mr-3">
              {{ review.reviewer_name ? review.reviewer_name.charAt(0).toUpperCase() : 'U' }}
            </div>
            <div>
              <h5 class="font-semibold mb-1 text-black">{{ review.reviewer_name }}</h5>
              <div class="flex text-yellow-400">
                <span v-for="i in 5" :key="i" class="material-icons text-sm" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'">star</span>
              </div>
            </div>
          </div>
          <span class="text-gray-500 text-sm">{{ formatDate(review.created_at) }}</span>
        </div>
        <p class="text-gray-700 mb-3">{{ review.comment }}</p>
        <div class="flex items-center">
          <button @click="handleLike(review)" class="like-button flex items-center text-gray-500 hover:text-blue-500">
            <span class="material-icons align-middle mr-1">thumb_up</span>
            <span>({{ review.likes || 0 }})</span>
          </button>
          <div class="border-l mx-2 h-4"></div>
          <button @click="handleDislike(review)" class="dislike-button flex items-center text-gray-500 hover:text-red-500">
            <span class="material-icons align-middle mr-1">thumb_down</span>
            <span>({{ review.dislikes || 0 }})</span>
          </button>
        </div>
      </div>
      
      <!-- Paginación -->
      <div class="flex justify-center mt-4" v-if="totalPages > 1">
        <nav class="inline-flex rounded-md shadow-sm" aria-label="Paginación de reseñas">
          <button 
            @click="currentPage > 1 && (currentPage--)"
            :disabled="currentPage === 1"
            class="px-3 py-2 border border-gray-300 rounded-l-md text-sm"
            :class="currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'"
          >
            Anterior
          </button>
          
          <template v-for="page in totalPages" :key="page">
            <button 
              @click="currentPage = page"
              class="px-3 py-2 border-t border-b border-gray-300 text-sm"
              :class="currentPage === page ? 'bg-blue-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
            >
              {{ page }}
            </button>
          </template>
          
          <button 
            @click="currentPage < totalPages && (currentPage++)"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 border border-gray-300 rounded-r-md text-sm"
            :class="currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'"
          >
            Siguiente
          </button>
        </nav>
      </div>
    </div>
</div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  // Props
  const props = defineProps({
    propertyId: {
      type: Number,
      required: true
    },
    reviews: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    hideAddButton: {
      type: Boolean,
      default: false
    },
    itemsPerPage: {
      type: Number,
      default: 3
    }
  });
  
  // Emits
  const emit = defineEmits(['add-review', 'like', 'dislike']);
  
  // Estado local
  const currentPage = ref(1);
  
  // Calcular calificación promedio
  const averageRating = computed(() => {
    if (props.reviews.length === 0) return '0.0';
    const sum = props.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / props.reviews.length).toFixed(1);
  });
  
  // Paginación
  const totalPages = computed(() => {
    return Math.ceil(props.reviews.length / props.itemsPerPage);
  });
  
  const displayedReviews = computed(() => {
    const start = (currentPage.value - 1) * props.itemsPerPage;
    const end = start + props.itemsPerPage;
    return props.reviews.slice(start, end);
  });
  
  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (err) {
      return "Sin fecha";
    }
  };
  
  // Manejadores para likes y dislikes
  const handleLike = (review) => {
    emit('like', review);
  };
  
  const handleDislike = (review) => {
    emit('dislike', review);
  };
  
  // Observar cambios en reviews para resetear paginación si es necesario
  watch(() => props.reviews.length, () => {
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value;
    }
  });
  </script>
  
  <style scoped>
  .spinner {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .material-icons {
    font-size: 20px;
    line-height: 1;
    vertical-align: middle;
  }
  </style>
      
      