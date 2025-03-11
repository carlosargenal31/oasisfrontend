<template>
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Propiedades Destacadas</h2>
          <router-link to="/properties" class="text-blue-900 font-semibold flex items-center hover:underline">
            Ver todas
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="property in featuredProperties" :key="property.id" class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <!-- Imagen de la propiedad -->
            <div class="relative">
              <img :src="property.image" :alt="property.title" class="w-full h-56 object-cover">
              <div class="absolute top-4 left-4">
                <span class="bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded">{{ property.status }}</span>
                <span v-if="property.isNew" class="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded ml-2">Nuevo</span>
              </div>
            </div>
            
            <!-- Detalles de la propiedad -->
            <div class="p-6">
              <div class="text-xl font-bold text-blue-900 mb-2">${{ property.price.toLocaleString() }}</div>
              <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ property.title }}</h3>
              <div class="flex items-center text-gray-500 text-sm mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ property.location }}
              </div>
              
              <!-- Características -->
              <div class="flex justify-between pt-4 border-t border-gray-200">
                <div class="flex items-center text-gray-600 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {{ property.bedrooms }} hab.
                </div>
                <div class="flex items-center text-gray-600 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {{ property.bathrooms }} baños
                </div>
                <div class="flex items-center text-gray-600 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {{ property.area }} m²
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Datos de ejemplo para propiedades destacadas
  const featuredProperties = ref([
    { 
      id: 1, 
      title: 'Villa de Lujo', 
      price: 875000, 
      location: 'Miami, FL', 
      bedrooms: 4, 
      bathrooms: 3, 
      area: 280, 
      image: '/images/properties/property-1.jpg',
      status: 'En venta',
      isNew: true
    },
    { 
      id: 2, 
      title: 'Apartamento moderno', 
      price: 320000, 
      location: 'Nueva York, NY', 
      bedrooms: 2, 
      bathrooms: 2, 
      area: 95, 
      image: '/images/properties/property-2.jpg',
      status: 'En venta',
      isNew: false
    },
    { 
      id: 3, 
      title: 'Casa Familiar', 
      price: 450000, 
      location: 'Los Ángeles, CA', 
      bedrooms: 3, 
      bathrooms: 2, 
      area: 165, 
      image: '/images/properties/property-3.jpg',
      status: 'En venta',
      isNew: true
    },
    { 
      id: 4, 
      title: 'Piso Céntrico', 
      price: 2800, 
      location: 'Chicago, IL', 
      bedrooms: 2, 
      bathrooms: 1, 
      area: 85, 
      image: '/images/properties/property-4.jpg',
      status: 'En alquiler',
      isNew: false
    },
    { 
      id: 5, 
      title: 'Loft Industrial', 
      price: 2250, 
      location: 'Brooklyn, NY', 
      bedrooms: 1, 
      bathrooms: 1, 
      area: 75, 
      image: '/images/properties/property-5.jpg',
      status: 'En alquiler',
      isNew: true
    },
    { 
      id: 6, 
      title: 'Casa de Playa', 
      price: 690000, 
      location: 'San Diego, CA', 
      bedrooms: 4, 
      bathrooms: 3, 
      area: 210, 
      image: '/images/properties/property-6.jpg',
      status: 'En venta',
      isNew: false
    }
  ]);
  </script>