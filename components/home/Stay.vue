<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePropertyService } from '~/services/propertyService';

// Inicializar el servicio de propiedades
const propertyService = usePropertyService();

// Estado para almacenar alojamientos
const accommodations = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Para la navegación del slider
const currentIndex = ref(0);
const visibleCount = ref(3); // Número de elementos visibles a la vez en pantallas grandes

// Función para cargar los alojamientos desde la API
const loadAccommodations = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Llamada a la API para obtener propiedades de la categoría "Alojamiento"
    const result = await propertyService.getPropertiesByCategory('Alojamiento', {
      limit: 20, // Pedir más propiedades para tener suficientes para el carrusel
      sort: 'rating-high' // Ordenar por mayor calificación
    });
    
    if (result && result.success) {
      console.log('Resultado de la API:', result.data);
      
      // Transformar las propiedades al formato que necesitamos para el carrusel
      const properties = result.data.properties || [];
      
      // Primero convertimos las propiedades al formato deseado
      const transformedProperties = properties.map(property => ({
        id: property.id,
        name: property.title,
        image: property.image || 'https://placehold.co/600x400?text=Sin+Imagen',
        rating: property.average_rating !== undefined ? Number(property.average_rating) : null,
        reviews: property.reviews_count || 0,
        address: property.address || 'Dirección no disponible',
        email: property.email || 'Sin correo',
        phone: property.phone || 'Sin teléfono',
        schedule: property.schedule || 'Horario no disponible',
        isFavorite: false // Por defecto no es favorito
      }));
      
      console.log('Propiedades transformadas:', transformedProperties);
      
      // Si no hay propiedades, mostramos un error
      if (transformedProperties.length === 0) {
        console.warn('No se encontraron alojamientos en la respuesta de la API');
        error.value = 'No se encontraron alojamientos disponibles';
        accommodations.value = [];
      } else {
        // Ahora cargamos las calificaciones desde la API para cada propiedad
        const propertiesWithRatings = await Promise.all(
          transformedProperties.map(async (property) => {
            // Solo consultamos la API si la calificación no está definida
            if (property.rating === null || property.rating === undefined) {
              try {
                console.log(`Cargando calificación para propiedad ${property.id}`);
                const rating = await propertyService.getPropertyRating(property.id);
                console.log(`Calificación obtenida para ${property.name}: ${rating}`);
                property.rating = rating;
              } catch (err) {
                console.error(`Error al cargar calificación para ${property.name}:`, err);
                property.rating = 0;
              }
            } else {
              console.log(`La propiedad ${property.name} ya tiene calificación: ${property.rating}`);
            }
            return property;
          })
        );
        
        console.log('Propiedades con calificaciones:', propertiesWithRatings);
        
        // Ordenamos por calificación de mayor a menor
        const sortedProperties = [...propertiesWithRatings].sort((a, b) => 
          (b.rating || 0) - (a.rating || 0)
        );
        
        console.log('Propiedades ordenadas por calificación:', 
          sortedProperties.map(p => `${p.name}: ${p.rating}`)
        );
        
        accommodations.value = sortedProperties;
      }
    } else {
      // Si hay un error en la respuesta
      console.error('Error en la respuesta de la API:', result);
      error.value = 'No se pudieron cargar los alojamientos';
      accommodations.value = [];
    }
  } catch (err) {
    console.error('Error al cargar alojamientos:', err);
    error.value = 'Error al cargar los alojamientos';
    accommodations.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Función para ir al slide anterior
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    // Volver al final si estamos al principio
    currentIndex.value = Math.max(0, accommodations.value.length - visibleCount.value);
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
  // Si no hay alojamientos, devolver array vacío
  if (accommodations.value.length === 0) {
    return [];
  }
  
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

// Función que genera las estrellas de calificación
const generateStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating || 0);
  const hasHalfStar = (rating || 0) - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Agregar estrellas llenas
  for (let i = 0; i < fullStars; i++) {
    stars.push({ type: 'full' });
  }

  // Agregar media estrella si es necesario
  if (hasHalfStar) {
    stars.push({ type: 'half' });
  }

  // Agregar estrellas vacías
  for (let i = 0; i < emptyStars; i++) {
    stars.push({ type: 'empty' });
  }

  return stars;
};

// Cargar datos al montar el componente
onMounted(() => {
  loadAccommodations();
  
  // Ajustar la cantidad visible según el ancho de la pantalla
  const handleResize = () => {
    if (window.innerWidth < 768) {
      visibleCount.value = 1;
    } else if (window.innerWidth < 1024) {
      visibleCount.value = 2;
    } else {
      visibleCount.value = 3;
    }
  };
  
  // Configurar el listener para resize
  handleResize();
  window.addEventListener('resize', handleResize);
  
  // Limpiar listener al desmontar
  return () => {
    window.removeEventListener('resize', handleResize);
  };
});
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Encabezado de la sección -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-2 md:mb-0">
        Explora y descansa: hospedaje en La Ceiba
      </h2>
      <a href="properties/rent" class="text-orange-600 font-medium flex items-center hover:underline">
        Ver todo
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
    
    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="spinner border-4 border-gray-200 border-t-orange-500 rounded-full w-10 h-10 animate-spin"></div>
    </div>
    
    <!-- Mensaje de error -->
    <div v-else-if="error" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-lg text-gray-800 mb-4">{{ error }}</p>
      <button 
        @click="loadAccommodations" 
        class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
      >
        Intentar de nuevo
      </button>
    </div>
    
    <!-- Mensaje si no hay resultados -->
    <div v-else-if="accommodations.length === 0" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p class="text-lg text-gray-800">No se encontraron alojamientos disponibles.</p>
    </div>
    
    <!-- Contenedor del carrusel con controles de navegación -->
    <div v-else class="relative">
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
        <!-- Property Card - Iterate through visible items -->
        <div v-for="accommodation in visibleItems" :key="accommodation.id" 
             class="bg-white rounded-lg overflow-hidden shadow-md">
          <!-- Property Image -->
          <div class="relative">
            <img 
              :src="accommodation.image" 
              :alt="accommodation.name" 
              class="w-full h-56 md:h-64 object-cover"
              @error="$event.target.src = 'https://placehold.co/600x400?text=Sin+Imagen'"
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
          
          <!-- Property Details -->
          <div class="p-4">
            <!-- Categoría (ALOJAMIENTO) -->
            <div class="uppercase text-sm font-medium text-orange-500 mb-1">
              ALOJAMIENTO
            </div>
            
            <!-- Nombre del alojamiento -->
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              {{ accommodation.name }}
            </h3>
            
            <!-- Dirección -->
            <p class="text-sm text-gray-600 mb-2">{{ accommodation.address }}</p>
            
            <!-- Estrellas de calificación -->
            <div class="flex items-center mb-3">
              <!-- Renderizar estrellas según la calificación -->
              <span v-for="(star, index) in generateStars(accommodation.rating)" :key="index" class="inline-block">
                <svg v-if="star.type === 'full'" class="w-4 h-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg v-else-if="star.type === 'half'" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="halfStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="50%" stop-color="#FBBF24" />
                      <stop offset="50%" stop-color="#D1D5DB" />
                    </linearGradient>
                  </defs>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#halfStarGradient)" />
                </svg>
                <svg v-else class="w-4 h-4 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </span>
              
              <!-- Mostrar valor numérico de calificación -->
              <span class="ml-1 text-sm text-gray-600">({{ (accommodation.rating || 0).toFixed(1) }})</span>
            </div>
            
            <!-- Datos de contacto -->
            <div v-if="accommodation.email !== 'Sin correo'" class="flex items-center mt-2">
              <svg class="mr-2 text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-sm text-gray-600">{{ accommodation.email }}</span>
            </div>
            
            <div v-if="accommodation.phone !== 'Sin teléfono'" class="flex items-center mt-2">
              <svg class="mr-2 text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-sm text-gray-600">{{ accommodation.phone }}</span>
            </div>
            
            <!-- Reseñas -->
            <div class="flex items-center mt-2">
              <svg class="mr-2 text-gray-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span class="text-sm text-gray-600" v-if="accommodation.reviews > 0">{{ accommodation.reviews }} reseñas</span>
              <span class="text-sm text-gray-600" v-else>Sin reseñas</span>
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
      <div v-if="accommodations.length > visibleCount.value" class="flex justify-center mt-6">
        <button 
          v-for="i in Math.ceil(accommodations.length / visibleCount)" 
          :key="i" 
          @click="currentIndex = (i - 1) * visibleCount"
          class="w-2 h-2 mx-1 rounded-full transition-colors duration-200"
          :class="currentIndex >= (i - 1) * visibleCount && currentIndex < i * visibleCount ? 'bg-orange-600' : 'bg-gray-300'"
          :aria-label="`Página ${i} de ${Math.ceil(accommodations.length / visibleCount)}`"
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

/* Animación de spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Estrellas */
.text-yellow-400 {
  color: #FBBF24 !important;
}

.text-gray-300 {
  color: #D1D5DB !important;
}
</style>