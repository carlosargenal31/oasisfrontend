<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Imagen para los destinos de La Ceiba
import destinationsImage from '@/assets/images/hero-image.jpg';

const router = useRouter();
const searchQuery = ref('');
const showCategories = ref(false);

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
                  class="py-4 pl-3 w-full text-gray-700 border-0 no-outline"
                />
              </div>
              
              <!-- Selector de categorías -->
              <div class="flex items-center border-t md:border-t-0 md:border-l border-gray-200 px-4 py-2 md:py-0 whitespace-nowrap">
                <svg class="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text-gray-700">Todas las categorías</span>
                <svg class="h-5 w-5 text-gray-400 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              
              <!-- Botón de búsqueda -->
              <button 
                @click="searchProperties"
                class="bg-orange-500 text-white font-medium py-3 md:py-4 px-6 md:px-8 w-full md:w-auto"
              >
                Buscar
              </button>
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