<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Importar imagen de fondo
import heroImg from '@/assets/images/hero-image.jpg'

const router = useRouter();
const searchType = ref('rent');
const location = ref('');
const propertyType = ref('');
const price = ref(450000);

// Función para formatear el precio
const formatPrice = (value) => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const searchProperties = () => {
  const queryParams = new URLSearchParams();
  
  if (searchType.value) queryParams.append('type', searchType.value);
  if (location.value) queryParams.append('location', location.value);
  if (propertyType.value) queryParams.append('propertyType', propertyType.value);
  if (price.value) queryParams.append('maxPrice', price.value.toString());
  
  router.push({
    path: '/properties',
    query: Object.fromEntries(queryParams)
  });
};
</script>

<template>
  <!-- Hero con imagen a pantalla completa -->
  <section class="relative min-h-screen">
    <!-- Imagen de fondo -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="heroImg" 
        alt="Propiedad ideal" 
        class="w-full h-full object-cover"
      />
      <!-- Overlay para mejorar visibilidad del texto -->
      <div class="absolute inset-0 bg-blue-900/40"></div>
    </div>
    
    <!-- Contenido centrado -->
    <div class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
      <div class="text-center max-w-4xl mx-auto mb-12">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          La forma más fácil de encontrar una propiedad perfecta
        </h1>
      </div>
      
      <!-- Formulario de búsqueda simple -->
      <div class="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- Tipo: Alquiler/Venta -->
          <div class="flex-1 relative border-b md:border-b-0 md:border-r border-gray-200">
            <select 
              v-model="searchType"
              class="w-full h-full appearance-none bg-transparent px-6 py-4 pl-12 text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="rent">En alquiler</option>
              <option value="sale">En venta</option>
            </select>
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          
          <!-- Ubicación -->
          <div class="flex-1 relative border-b md:border-b-0 md:border-r border-gray-200">
            <select 
              v-model="location"
              class="w-full h-full appearance-none bg-transparent px-6 py-4 pl-12 text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="">Ubicación</option>
              <option value="new-york">Nueva York</option>
              <option value="chicago">Chicago</option>
              <option value="los-angeles">Los Ángeles</option>
              <option value="san-diego">San Diego</option>
              <option value="miami">Miami</option>
            </select>
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          
          <!-- Tipo de propiedad -->
          <div class="flex-1 relative border-b md:border-b-0 md:border-r border-gray-200">
            <select 
              v-model="propertyType"
              class="w-full h-full appearance-none bg-transparent px-6 py-4 pl-12 text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="">Tipo de propiedad</option>
              <option value="houses">Casas</option>
              <option value="apartments">Apartamentos</option>
              <option value="commercial">Comercial</option>
              <option value="daily-rental">Alquiler diario</option>
              <option value="new-buildings">Nuevas construcciones</option>
            </select>
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
          </div>
          
          <!-- Selector de precio -->
          <div class="flex-1 relative border-b md:border-b-0 md:border-r border-gray-200">
            <div class="flex items-center px-6 py-4 pl-12 h-full">
              <div class="text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-900 absolute left-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="mr-2">Precio</span>
                <div class="relative flex items-center">
                  <input 
                    type="range" 
                    v-model="price" 
                    min="0" 
                    max="1000000" 
                    step="10000"
                    class="w-24 md:w-32 h-1 bg-gray-300 rounded-lg appearance-none focus:outline-none"
                  >
                  <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-blue-900 text-xs font-semibold px-2 py-1 rounded-full shadow">
                    ${{ price.toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Botón de búsqueda -->
          <button 
            @click="searchProperties"
            class="bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 px-8 md:w-auto w-full transition duration-300 flex items-center justify-center"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>