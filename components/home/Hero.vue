<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Imagen para los destinos de La Ceiba
import destinationsImage from '@/assets/images/hero-image.jpg';
import { usePropertyService } from '~/services/propertyService';

const router = useRouter();
const searchQuery = ref('');
const showCategories = ref(false);
const propertyService = usePropertyService();
const properties = ref([]);
const totalProperties = ref(0);
const error = ref(null);
const showResults = ref(false);

const searchProperties = () => {
  const queryParams = new URLSearchParams();
  
  if (searchQuery.value) {
    queryParams.append('q', searchQuery.value);
  }
  
  const basePath = '/properties/rent';
  const queryString = queryParams.toString();
  const url = queryString ? `${basePath}?${queryString}` : basePath;
  
  router.push(url);
};

const checkSearchLength = () => {
  if (searchQuery.value.trim().length >= 3) {
    handleSearch();
  } else {
    properties.value = []
     showResults.value = false;
  }
};

    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        console.log('Buscando:', searchQuery.value);
        
        // loading.value = true;
        
        // Especificar los campos donde queremos buscar
        const searchFields = ['title', 'category', 'property_type'];
        
        propertyService.searchProperties(searchQuery.value, searchFields)
          .then(result => {
            console.log('Resultado de búsqueda:', result);
            
            if (result && result.success) {
              properties.value = result.data?.properties || [];
              totalProperties.value = result.data?.total || properties.value.length;
              console.log('Propiedades encontradas:', JSON.stringify(properties.value, null, 2));
              showResults.value = true;
              
              // Cargar calificaciones para las propiedades encontradas
              // loadPropertyRatings();
            } else {
              error.value = 'No se pudieron cargar los resultados de búsqueda';
              properties.value = [];
              totalProperties.value = 0;
            }
          })
          .catch(err => {
            console.error('Error en búsqueda:', err);
            error.value = 'Error al buscar propiedades';
            properties.value = [];
            totalProperties.value = 0;
          })
          .finally(() => {
            // loading.value = false;
          });
      }
    };

    const searchContainer = ref(null);

const handleClickOutside = (event) => {
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    showResults.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

  
</script>

<template>
  <section class="bg-white relative pb-12 md:pb-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <!-- Columna de texto y búsqueda -->
        <div class="md:col-span-5 z-10 pt-8 md:pt-12">
          <!-- Título y subtítulo -->
          <div class="pb-8 md:pb-12">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">
              <span class="text-gray-900">Empieza a explorar</span>
              <br class="hidden md:block" />
              <span class="text-orange-500">La Ceiba</span>
            </h1>
            
            <p class="text-gray-600 text-lg">
              Descubre los mejores lugares para hospedarte, comer, comprar o visitar en "La Novia de Honduras".
            </p>
          </div>
          
          <!-- Buscador -->
         <div class="search-component" ref="searchContainer" >
    <!-- Buscador mejorado -->
    <div class="relative mb-8">
      <div class="flex flex-col md:flex-row rounded-full shadow-lg overflow-hidden bg-white">
        <!-- Campo de búsqueda -->
        <div class="flex items-center pl-5 flex-grow search-input-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="¿Qué estás buscando?"
            v-model="searchQuery"
            @input="checkSearchLength"
            @focus="showResults = true"
            class="py-4 pl-3 w-full text-gray-700 border-0 no-outline"
          />
        </div>
        
        <!-- Botón de búsqueda -->
        <button
          @click="handleSearch"
          class="bg-orange-500 text-white font-medium py-3 md:py-4 px-6 md:px-8 w-full md:w-auto"
        >
          Buscar
        </button>
      </div>
      
      <!-- Resultados de búsqueda mejorados -->
      <div v-if="showResults && properties.length > 0" 
           class="search-results absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-50">
        <div class="p-4">
          <div class="text-lg font-semibold text-gray-800 mb-2">Resultados destacados</div>
          
          <!-- Grid de resultados: 2 filas de 3 elementos -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(property, index) in properties.slice(0, 6)" :key="property.id" 
                 class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
                 @click="selectProperty(property)">
              
              <!-- Imagen de la propiedad -->
              <div class="h-40 overflow-hidden bg-gray-200">
                <img v-if="property.image" :src="property.image" class="w-full h-full object-cover" :alt="property.title">
                <div v-else class="flex items-center justify-center h-full bg-gray-100 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 22V12h6v10" />
                  </svg>
                </div>
              </div>
              
              <!-- Información de la propiedad -->
              <div class="p-4">
                <div class="flex items-center mb-2">
                  <h3 class="font-semibold text-gray-800 truncate">{{ property.title }}</h3>
                  <span v-if="property.isVerified" class="ml-2 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                
                <!-- Categoría y tipo -->
                <div class="flex items-center text-sm mb-2">
                  <span class="bg-orange-100 text-orange-600 rounded-full px-2 py-1 text-xs">{{ property.category }}</span>
                  <span class="ml-2 text-gray-600">{{ property.property_type }}</span>
                </div>
                
                <!-- Descripción -->
                <p class="text-gray-600 text-sm truncate">
                  {{ property.description || 'Sin descripción disponible' }}
                </p>
                
                <!-- Ubicación -->
                <div class="flex items-center mt-2 text-xs text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="truncate">{{ property.address || 'Dirección no disponible' }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Mostrar más resultados si hay más de 6 propiedades -->
          <div v-if="properties.length > 6" class="mt-3 text-center">
            <button @click="viewAllResults" class="text-orange-500 hover:text-orange-600 text-sm font-medium">
              Ver todos los resultados ({{ properties.length }})
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mensaje cuando no hay resultados -->
      <div v-if="showResults && searchQuery && properties.length === 0 && !loading" 
           class="search-results absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-50">
        <div class="p-4 text-center">
          <p class="text-gray-600">No se encontraron resultados para "{{ searchQuery }}"</p>
        </div>
      </div>
      
      <!-- Mensaje de cargando -->
      <div v-if="loading" 
           class="search-results absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-50">
        <div class="p-4 text-center">
          <div class="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-orange-500 border-r-2 border-orange-500 border-b-2 border-orange-500 border-transparent"></div>
          <p class="text-gray-600 mt-2">Buscando...</p>
        </div>
      </div>
    </div>
  </div>
        </div>
        
        <!-- Columna de imagen -->
        <div class="md:col-span-7 order-first md:order-last">
          <div class="h-64 md:h-96 w-full rounded-lg overflow-hidden">
            <img 
              :src="destinationsImage" 
              alt="La Ceiba destinations" 
              class="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-orange-500 {
  color: #FF5A3C;
}

.bg-orange-500 {
  background-color: #FF5A3C;
}

.shadow-lg {
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
}

.no-outline {
  outline: none !important;
}

.no-outline:focus {
  outline: none !important;
}

.rounded-full {
  border-radius: 9999px;
}

.rounded-lg {
  border-radius: 0.5rem;
}

input {
  outline: none;
  border: none;
}

input:focus {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

/* Remove orange outline/lines when input is focused */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  box-shadow: 0 0 0px 1000px white inset !important;
  -webkit-text-fill-color: #374151 !important;
  border: none !important;
  outline: none !important;
}
</style>