<template>
    <div class="bg-white rounded-lg shadow-lg p-4">
      <form @submit.prevent="searchProperties" class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <!-- Tipo de operación (Venta/Alquiler) -->
        <div class="flex-1">
          <div class="relative">
            <select v-model="searchForm.status" class="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-900">
              <option value="rent">En alquiler</option>
              <option value="sale">En venta</option>
            </select>
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Ubicación -->
        <div class="flex-1">
          <div class="relative">
            <select v-model="searchForm.location" class="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-900">
              <option value="">Ubicación</option>
              <option value="new-york">Nueva York</option>
              <option value="los-angeles">Los Ángeles</option>
              <option value="chicago">Chicago</option>
              <option value="miami">Miami</option>
            </select>
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Tipo de propiedad -->
        <div class="flex-1">
          <div class="relative">
            <select v-model="searchForm.type" class="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-900">
              <option value="">Tipo de propiedad</option>
              <option value="house">Casas</option>
              <option value="apartment">Apartamentos</option>
              <option value="commercial">Comercial</option>
              <option value="land">Terrenos</option>
            </select>
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Rango de precio -->
        <div class="flex-1">
          <div class="relative">
            <select v-model="searchForm.priceRange" class="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-900">
              <option value="">Rango de precio</option>
              <option value="0-100000">$0 - $100,000</option>
              <option value="100000-300000">$100,000 - $300,000</option>
              <option value="300000-500000">$300,000 - $500,000</option>
              <option value="500000+">$500,000+</option>
            </select>
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Botón de búsqueda -->
        <div class="flex-none">
          <button type="submit" class="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Estado para el formulario de búsqueda
  const searchForm = ref({
    status: 'rent',
    type: '',
    location: '',
    priceRange: ''
  });
  
  // Función para manejar la búsqueda de propiedades
  const searchProperties = () => {
    const queryParams = new URLSearchParams();
    
    if (searchForm.value.status) queryParams.append('status', searchForm.value.status);
    if (searchForm.value.type) queryParams.append('type', searchForm.value.type);
    if (searchForm.value.location) queryParams.append('location', searchForm.value.location);
    if (searchForm.value.priceRange) queryParams.append('priceRange', searchForm.value.priceRange);
    
    router.push({
      path: '/properties',
      query: Object.fromEntries(queryParams)
    });
  };
  </script>