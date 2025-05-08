<script setup>
import { ref, computed } from 'vue';

// Datos de alojamientos con imágenes de ejemplo (7 propiedades)
const accommodations = ref([
  {
    id: 1,
    name: 'Berlin Business Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    rating: 5.0,
    reviews: 48,
    price: '$$',
    distance: '1.4 km from center',
    isFavorite: false
  },
  {
    id: 2,
    name: 'Big Tree Cottage',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    rating: 4.8,
    reviews: 24,
    price: '$$$',
    distance: '0.5 km from center',
    isFavorite: false
  },
  {
    id: 3,
    name: 'Grand Resort & Spa',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    rating: 4.9,
    reviews: 43,
    price: '$$$',
    distance: '1.8 km from center',
    isFavorite: false
  },
  {
    id: 4,
    name: 'Merry Berry Motel',
    image: 'https://images.unsplash.com/photo-1631049552057-ce02161d0ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    rating: 4.5,
    reviews: 13,
    price: '$$',
    distance: '0.4 km from center',
    isFavorite: false
  },
  {
    id: 5,
    name: 'Riverside Inn',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    rating: 4.6,
    reviews: 32,
    price: '$$',
    distance: '2.1 km from center',
    isFavorite: false
  },
  {
    id: 6,
    name: 'Urban Loft Suites',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    rating: 4.7,
    reviews: 56,
    price: '$$$',
    distance: '0.7 km from center',
    isFavorite: false
  },
  {
    id: 7,
    name: 'Heritage Boutique Hotel',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    rating: 4.3,
    reviews: 27,
    price: '$$',
    distance: '1.2 km from center',
    isFavorite: false
  }
]);

// Para la navegación del slider
const currentIndex = ref(0);
const visibleCount = ref(3); // Número de elementos visibles a la vez en pantallas grandes

// Función para ir al slide anterior
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    // Volver al final si estamos al principio
    currentIndex.value = accommodations.value.length - visibleCount.value;
  }
};

// Función para ir al siguiente slide
const nextSlide = () => {
  if (currentIndex.value < accommodations.value.length - visibleCount.value) {
    currentIndex.value++;
  } else {
    // Volver al inicio si estamos al final
    currentIndex.value = 0;
  }
};

// Calcular los elementos visibles según el índice actual
const visibleItems = computed(() => {
  const startIndex = currentIndex.value;
  const endIndex = Math.min(startIndex + visibleCount.value, accommodations.value.length);
  return accommodations.value.slice(startIndex, endIndex);
});

// Función para alternar favoritos
const toggleFavorite = (id) => {
  const accommodation = accommodations.value.find(item => item.id === id);
  if (accommodation) {
    accommodation.isFavorite = !accommodation.isFavorite;
  }
};
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Encabezado de la sección -->
    <div class="flex flex-row justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">
        Explora y descansa: hospedaje en La Ceiba
      </h2>
      <a href="/catalog" class="text-orange-600 font-medium flex items-center hover:underline">
        Ver todo
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>

    <!-- Contenedor del carrusel con controles de navegación -->
    <div class="relative">
      <!-- Botón de navegación izquierda -->
      <button 
        @click="prevSlide" 
        class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 focus:outline-none"
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Grid de alojamientos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
        <div v-for="accommodation in visibleItems" :key="accommodation.id" 
             class="bg-white rounded-lg overflow-hidden shadow-md">
          <!-- Imagen con botón de favoritos -->
          <div class="relative">
            <img 
              :src="accommodation.image" 
              :alt="accommodation.name" 
              class="w-full h-56 md:h-64 object-cover"
            />
            <button 
              @click="toggleFavorite(accommodation.id)" 
              class="absolute top-3 right-3 bg-white rounded-full p-2 shadow heart-btn"
              :class="{ 'favorite': accommodation.isFavorite }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 heart-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>
          
          <!-- Información del alojamiento -->
          <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ accommodation.name }}
            </h3>
            
            <!-- Detalles en línea -->
            <div class="flex items-center flex-wrap gap-4 text-sm">
              <!-- Rating -->
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="font-bold ml-1">{{ accommodation.rating.toFixed(1) }}</span>
                <span class="text-gray-500 ml-1">({{ accommodation.reviews }})</span>
              </div>
              
              <!-- Precio -->
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="ml-1">{{ accommodation.price }}</span>
              </div>
              
              <!-- Distancia -->
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="ml-1">{{ accommodation.distance }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de navegación derecha -->
      <button 
        @click="nextSlide" 
        class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 focus:outline-none"
        aria-label="Siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Indicador de paginación (puntos) -->
      <div class="flex justify-center mt-6">
        <button 
          v-for="i in Math.ceil(accommodations.length / visibleCount)" 
          :key="i" 
          @click="currentIndex = (i - 1) * visibleCount"
          class="w-2 h-2 mx-1 rounded-full transition-colors duration-200"
          :class="currentIndex >= (i - 1) * visibleCount && currentIndex < i * visibleCount ? 'bg-orange-600' : 'bg-gray-300'"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Estilo para los corazones (botón de favorito) */
.heart-icon {
  stroke: #e53e3e; /* Borde rojo */
  stroke-width: 1.5;
  fill: white; /* Relleno blanco */
  transition: fill 0.2s ease;
}

/* Cuando el ratón está sobre el botón */
.heart-btn:hover .heart-icon {
  fill: #e53e3e; /* Relleno rojo al pasar el cursor */
}

/* Cuando está marcado como favorito */
.favorite .heart-icon {
  fill: #e53e3e; /* Relleno rojo cuando es favorito */
}
</style>