<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePropertyService } from '~/services/propertyService';
import EstrellaRating from '~/components/EstrellaRating.vue'; // Importamos el componente de estrellas

// Inicializar el servicio de propiedades
const propertyService = usePropertyService();

// Estado para almacenar restaurantes
const restaurants = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Obtener restaurantes para cada columna
const leftColumnRestaurants = computed(() => {
  if (restaurants.value.length === 0) return [];
  return restaurants.value.slice(0, 3); // Obtener los primeros 3 restaurantes para la columna izquierda
});

const rightColumnRestaurants = computed(() => {
  if (restaurants.value.length === 0) return [];
  return restaurants.value.slice(3, 6); // Obtener los siguientes 3 restaurantes para la columna derecha
});

// Función para cargar los restaurantes desde la API
const loadRestaurants = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Llamada a la API para obtener propiedades de la categoría "Restaurante y bar"
    const result = await propertyService.getPropertiesByCategoryFeatured('Restaurante y bar', {
      limit: 6, // Solo necesitamos 6 para el grid estático
      sort: 'newest' // Cambiar a 'newest' para obtener los más recientes primero
    });
    
    if (result && result.success) {
      console.log('Resultado de la API:', result.data);
      
      // Transformar las propiedades al formato que necesitamos para el grid
      const properties = result.data.properties || [];
      
      if (properties.length === 0) {
        console.warn('No se encontraron restaurantes en la respuesta de la API');
        error.value = 'No se encontraron restaurantes disponibles';
        restaurants.value = [];
        
      } else {
        // Primero convertimos las propiedades al formato deseado
        const transformedProperties = properties.map(property => ({
          id: property.id,
          name: property.title,
          image: property.image || null,
          rating: null, // Inicializamos rating como null para cargarlo después
          reviews: property.reviews_count || 0,
          address: property.address || 'La Ceiba, Honduras',
          phone: property.phone || 'Sin teléfono',
          email: property.email || 'Sin correo',
          isFavorite: false // Por defecto no es favorito
        }));
        
        console.log('Propiedades transformadas:', transformedProperties);
        
        // Guardamos las propiedades en el estado
        restaurants.value = transformedProperties;
        
        // Cargamos calificaciones mediante la función especializada
        await loadPropertyRatings();
        
        // Ordenamos por calificación después de cargar ratings
        sortRestaurantsByRating();
      }
    } else {
      // Si hay un error en la respuesta
      console.error('Error en la respuesta de la API:', result);
      error.value = 'No se pudieron cargar los restaurantes';
      restaurants.value = [];
    }
  } catch (err) {
    
    console.error('Error al cargar restaurantes:', err);
    error.value = 'Error al cargar los restaurantes';
    restaurants.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Función para cargar calificaciones de todas las propiedades
const loadPropertyRatings = async () => {
  if (restaurants.value.length === 0) return;
  
  try {
    console.log('Cargando calificaciones para', restaurants.value.length, 'restaurantes');
    
    // Buscamos propiedades sin calificación
    const propsToLoad = restaurants.value.filter(p => 
      p.rating === undefined || p.rating === null
    );
    
    console.log(`${propsToLoad.length} restaurantes necesitan cargar calificación`);
    
    // Para cada propiedad sin calificación, obtener su calificación
    const promises = propsToLoad.map(async (prop) => {
      try {
        const rating = await propertyService.getPropertyRating(prop.id);
        console.log(`Restaurante ${prop.id} - ${prop.name} - Rating: ${rating}`);
        
        // Asegurar que rating sea un número (convertir si es necesario)
        prop.rating = rating !== null && rating !== undefined ? Number(rating) : 0;
      } catch (err) {
        console.error(`Error al cargar rating para restaurante ${prop.id}:`, err);
        prop.rating = 0;
      }
    });
    
    await Promise.all(promises);
    console.log('Calificaciones cargadas correctamente');
    
    // Comprobar que todos los restaurantes tienen calificación ahora
    const missingRatings = restaurants.value.filter(p => 
      p.rating === undefined || p.rating === null
    ).length;
    
    if (missingRatings > 0) {
      console.warn(`Aún hay ${missingRatings} restaurantes sin calificación`);
    } else {
      console.log('Todos los restaurantes tienen calificación asignada');
    }
  } catch (error) {
    console.error('Error al cargar calificaciones:', error);
  }
};

// Función para ordenar restaurantes por calificación
const sortRestaurantsByRating = () => {
  // Ordenamos por calificación de mayor a menor
  restaurants.value.sort((a, b) => 
    (b.rating || 0) - (a.rating || 0)
  );
  
  console.log('Restaurantes ordenados por calificación:', 
    restaurants.value.map(p => `${p.name}: ${p.rating}`)
  );
};

// Cargar datos al montar el componente
onMounted(() => {
  loadRestaurants();
});
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-8"  v-if="restaurants.length > 0" >
    <!-- Encabezado de la sección -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-2 md:mb-0">
        ¿Con hambre? Aquí se come bien en La Ceiba
      </h2>
      <a href="properties/food" class="text-orange-600 font-medium flex items-center hover:underline">
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
        @click="loadRestaurants" 
        class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
      >
        Intentar de nuevo
      </button>
    </div>
    
    <!-- Mensaje si no hay resultados -->
    <div v-else-if="restaurants.length === 0" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <p class="text-lg text-gray-800">No se encontraron restaurantes disponibles.</p>
    </div>
    
    <!-- Grid de restaurantes (2 columnas) -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- COLUMNA IZQUIERDA -->
      <div>
        <!-- Restaurante 1 -->
        <div v-for="restaurant in leftColumnRestaurants" :key="restaurant.id" 
             class="bg-gray-50 rounded-lg p-4 mb-6 flex hover:shadow-md hover:transform hover:translate-y-[-2px] transition-all">
          <div class="w-16 h-16 flex-shrink-0 bg-white rounded-lg flex items-center justify-center mr-4">
            <div class="text-3xl text-gray-400 font-light">R</div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ restaurant.name }}</h3>
            
            <!-- Estrellas de calificación -->
            <div class="flex items-center mb-2 estrella-rating-container" style="color: #FBBF24">
              <div class="estrellas-wrapper" style="color: #FBBF24 !important; transform: scale(0.8); transform-origin: left;">
                <estrella-rating 
                  :calificacion="restaurant.rating || 0"
                  :mostrarNumero="true"
                />
              </div>
            </div>
            
            <!-- Dirección -->
            <div class="flex items-start mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm text-gray-600 line-clamp-2">{{ restaurant.address }}</span>
            </div>
            
            <!-- Teléfono -->
            <div v-if="restaurant.phone !== 'Sin teléfono'" class="flex items-center text-sm text-gray-500">
              <svg class="mr-1 text-gray-500 w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ restaurant.phone }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- COLUMNA DERECHA -->
      <div>
        <!-- Restaurante 2 -->
        <div v-for="restaurant in rightColumnRestaurants" :key="restaurant.id" 
             class="bg-gray-50 rounded-lg p-4 mb-6 flex hover:shadow-md hover:transform hover:translate-y-[-2px] transition-all">
          <div class="w-16 h-16 flex-shrink-0 bg-white rounded-lg flex items-center justify-center mr-4">
            <div class="text-3xl text-gray-400 font-light">R</div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ restaurant.name }}</h3>
            
            <!-- Estrellas de calificación -->
            <div class="flex items-center mb-2 estrella-rating-container" style="color: #FBBF24">
              <div class="estrellas-wrapper" style="color: #FBBF24 !important; transform: scale(0.8); transform-origin: left;">
                <estrella-rating 
                  :calificacion="restaurant.rating || 0"
                  :mostrarNumero="true"
                />
              </div>
            </div>
            
            <!-- Dirección -->
            <div class="flex items-start mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm text-gray-600 line-clamp-2">{{ restaurant.address }}</span>
            </div>
            
            <!-- Teléfono -->
            <div v-if="restaurant.phone !== 'Sin teléfono'" class="flex items-center text-sm text-gray-500">
              <svg class="mr-1 text-gray-500 w-4 h-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {{ restaurant.phone }}
            </div>
          </div>
        </div>
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

/* Estilos para el contenedor de estrellas */
.estrella-rating-container {
  color: #FBBF24 !important;
}

.estrellas-wrapper :deep(.text-yellow-400) {
  color: #FBBF24 !important;
}

.estrellas-wrapper :deep(.text-gray-300) {
  color: #D1D5DB !important;
}

/* Asegurar que las estrellas sean visibles */
.estrellas-wrapper :deep(svg) {
  min-width: 16px;
  min-height: 16px;
  color: inherit;
}

/* Para limitar texto a cierto número de líneas */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Colores personalizados */
.text-orange-600 {
  color: #FD5631;
}

.bg-gray-50 {
  background-color: #F9FAFB;
}

.bg-orange-500 {
  background-color: #FD5631;
}

.bg-orange-600 {
  background-color: #E04424;
}

.text-gray-900 {
  color: #1F2937;
}

.text-gray-600 {
  color: #4B5563;
}

.text-gray-500 {
  color: #6B7280;
}

.text-gray-400 {
  color: #9CA3AF;
}

/* Interactividad */
.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.hover\:translate-y-\[-2px\]:hover {
  transform: translateY(-2px);
}

.transition-all {
  transition: all 0.2s ease;
}

/* Añadimos min-width para elementos flexibles */
.min-w-0 {
  min-width: 0;
}

/* Ajustamos el flex-shrink para que los iconos no se reduzcan */
.flex-shrink-0 {
  flex-shrink: 0;
}
</style>