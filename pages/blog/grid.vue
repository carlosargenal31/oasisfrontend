<template>
    <div class="container mx-auto px-4 py-5">
      <!-- Breadcrumb -->
      <div class="flex items-center mb-4 text-sm">
        <NuxtLink to="/" class="text-gray-500 hover:text-orange-600">Home</NuxtLink>
        <span class="mx-2 text-gray-400">></span>
        <span class="text-gray-700">Blog</span>
      </div>
  
      <h1 class="text-3xl font-bold mb-6">Noticias y perspectivas de La Ceiba</h1>
      
      <!-- Sponsored posts -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 pb-10 border-b">
        <!-- Article 1 -->
        <div>
          <div class="relative mb-3">
            <NuxtLink to="/blog/single">
              <img class="rounded-lg w-full h-40 object-cover" :src="b6" alt="Post image" />
              <span class="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">Destacado</span>
            </NuxtLink>
          </div>
          <div class="mb-4">
            <div class="text-orange-500 text-xs font-semibold uppercase mb-1">ARQUITECTURA</div>
            <h2 class="text-xl font-medium mb-2">
              <NuxtLink to="/blog/single" class="title-link">10 Edificios Históricos que Debes Visitar en La Ceiba</NuxtLink>
            </h2>
            <p class="text-gray-600 text-sm mb-4">
              Descubre la rica historia arquitectónica de La Ceiba a través de sus edificios más emblemáticos. Desde la Catedral San Isidro hasta el Paseo de los Ceibeños, estos monumentos cuentan la historia de la ciudad.
            </p>
            <div class="flex items-center">
              <img class="rounded-full w-8 h-8" src="@/assets/images/blog/11.jpg" alt="Avatar" />
              <div class="ml-2">
                <h6 class="text-sm font-medium">Carlos Mendoza</h6>
                <div class="flex text-gray-500 text-xs">
                  <span class="mr-2">Abr 28</span>
                  <span>0 comentarios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Article 2 -->
        <div>
          <div class="relative mb-3">
            <NuxtLink to="/blog/single">
              <img class="rounded-lg w-full h-40 object-cover" :src="b7" alt="Post image" />
              <span class="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">Destacado</span>
            </NuxtLink>
          </div>
          <div class="mb-4">
            <div class="text-orange-500 text-xs font-semibold uppercase mb-1">TURISMO</div>
            <h2 class="text-xl font-medium mb-2">
              <NuxtLink to="/blog/single" class="title-link">Guía Completa para Disfrutar del Gran Carnaval de La Ceiba</NuxtLink>
            </h2>
            <p class="text-gray-600 text-sm mb-4">
              Todo lo que necesitas saber para disfrutar al máximo de la fiesta más grande de Honduras. Descubre las mejores carrozas, conciertos y eventos del famoso carnaval ceibeño.
            </p>
            <div class="flex items-center">
              <img class="rounded-full w-8 h-8" src="@/assets/images/blog/11.jpg" alt="Avatar" />
              <div class="ml-2">
                <h6 class="text-sm font-medium">Laura Martínez</h6>
                <div class="flex text-gray-500 text-xs">
                  <span class="mr-2">Mar 15</span>
                  <span>3 comentarios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main content with sidebar -->
      <div class="flex flex-col md:flex-row">
        <!-- Left sidebar -->
        <div class="w-full md:w-1/4 md:pr-6 mb-8 md:mb-0">
          <!-- Sort by -->
          <div class="mb-6">
            <div class="flex items-center mb-2">
              <span class="text-sm text-gray-500">Ordenar por:</span>
            </div>
            <select class="w-full p-2 border rounded-md text-sm">
              <option>Más recientes</option>
              <option>Más antiguos</option>
              <option>Populares</option>
            </select>
          </div>
  
          <!-- Search -->
          <div class="mb-6">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Buscar artículo por palabras clave..." 
                class="w-full p-2 pl-3 pr-10 border rounded-md text-sm"
              />
              <button class="absolute right-2 top-2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
  
          <!-- Categories -->
          <div class="mb-6">
            <h3 class="text-lg font-medium mb-3">Categorías</h3>
            <ul class="space-y-2">
              <li class="flex justify-between">
                <a href="#" class="text-gray-700 hover:text-orange-600">Arquitectura</a>
                <span class="text-gray-500">(2)</span>
              </li>
              <li class="flex justify-between">
                <a href="#" class="text-gray-700 hover:text-orange-600">Turismo</a>
                <span class="text-gray-500">(4)</span>
              </li>
              <li class="flex justify-between">
                <a href="#" class="text-gray-700 hover:text-orange-600">Gastronomía</a>
                <span class="text-gray-500">(3)</span>
              </li>
              <li class="flex justify-between">
                <a href="#" class="text-gray-700 hover:text-orange-600">Cultura</a>
                <span class="text-gray-500">(1)</span>
              </li>
              <li class="flex justify-between">
                <a href="#" class="text-gray-700 hover:text-orange-600">Playas</a>
                <span class="text-gray-500">(8)</span>
              </li>
            </ul>
          </div>
  
          <!-- Popular Tags -->
          <div class="mb-6">
            <h3 class="text-lg font-medium mb-3">Etiquetas Populares</h3>
            <div class="flex flex-wrap gap-2">
              <a href="#" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200">Carnaval</a>
              <a href="#" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200">Playa</a>
              <a href="#" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200">Comida</a>
              <a href="#" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200">Pico Bonito</a>
              <a href="#" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200">Centro</a>
              <a href="#" class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200">Islas</a>
            </div>
          </div>
  
          
        </div>
  
        <!-- Articles list -->
        <div class="w-full md:w-3/4">
          <!-- Article 1 -->
          <div class="mb-8 border-b pb-8">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                <div class="relative">
                  <NuxtLink to="/blog/single">
                    <img class="rounded-lg w-full h-36 object-cover" :src="b6" alt="Post image" />
                    <span class="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded">Nuevo</span>
                  </NuxtLink>
                </div>
              </div>
              <div class="md:w-2/3">
                <div class="text-orange-500 text-xs font-semibold uppercase mb-1">TURISMO</div>
                <h2 class="text-xl font-medium mb-2">
                  <NuxtLink to="/blog/single" class="title-link">5 Razones para Visitar el Parque Nacional Pico Bonito</NuxtLink>
                </h2>
                <p class="text-gray-600 text-sm mb-4">
                  Descubre la biodiversidad increíble, cascadas majestuosas y aventuras emocionantes que ofrece este tesoro natural cercano a La Ceiba. Una experiencia imperdible para los amantes de la naturaleza.
                </p>
                <div class="flex items-center">
                  <img class="rounded-full w-8 h-8" src="@/assets/images/blog/11.jpg" alt="Avatar" />
                  <div class="ml-2">
                    <h6 class="text-sm font-medium">Elena Rodríguez</h6>
                    <div class="flex text-gray-500 text-xs">
                      <span class="mr-2">May 24</span>
                      <span>3 comentarios</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Article 2 -->
          <div class="mb-8 border-b pb-8">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                <NuxtLink to="/blog/single">
                  <img class="rounded-lg w-full h-36 object-cover" :src="b7" alt="Post image" />
                </NuxtLink>
              </div>
              <div class="md:w-2/3">
                <div class="text-orange-500 text-xs font-semibold uppercase mb-1">GASTRONOMÍA</div>
                <h2 class="text-xl font-medium mb-2">
                  <NuxtLink to="/blog/single" class="title-link">Los 10 Mejores Restaurantes de Mariscos en La Ceiba</NuxtLink>
                </h2>
                <p class="text-gray-600 text-sm mb-4">
                  Un recorrido por los mejores lugares para disfrutar de la deliciosa cocina del mar ceibeño. Desde el tradicional pescado frito hasta ceviches innovadores que no te puedes perder.
                </p>
                <div class="flex items-center">
                  <img class="rounded-full w-8 h-8" src="@/assets/images/blog/11.jpg" alt="Avatar" />
                  <div class="ml-2">
                    <h6 class="text-sm font-medium">Roberto Castillo</h6>
                    <div class="flex text-gray-500 text-xs">
                      <span class="mr-2">May 17</span>
                      <span>4 comentarios</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Article 3 -->
          <div class="mb-8 border-b pb-8">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                <NuxtLink to="/blog/single">
                  <img class="rounded-lg w-full h-36 object-cover" :src="b8" alt="Post image" />
                </NuxtLink>
              </div>
              <div class="md:w-2/3">
                <div class="text-orange-500 text-xs font-semibold uppercase mb-1">CULTURA</div>
                <h2 class="text-xl font-medium mb-2">
                  <NuxtLink to="/blog/single" class="title-link">Guía para el Festival Cultural Garífuna en La Ceiba</NuxtLink>
                </h2>
                <p class="text-gray-600 text-sm mb-4">
                  Descubre las tradiciones, música y danzas de la cultura garífuna en este emocionante festival anual. Una oportunidad para sumergirse en las raíces culturales de la costa norte hondureña.
                </p>
                <div class="flex items-center">
                  <img class="rounded-full w-8 h-8" src="@/assets/images/blog/11.jpg" alt="Avatar" />
                  <div class="ml-2">
                    <h6 class="text-sm font-medium">María Velásquez</h6>
                    <div class="flex text-gray-500 text-xs">
                      <span class="mr-2">May 10</span>
                      <span>2 comentarios</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Article 4 -->
          <div class="mb-8 border-b pb-8">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                <NuxtLink to="/blog/single">
                  <img class="rounded-lg w-full h-36 object-cover" :src="b9" alt="Post image" />
                </NuxtLink>
              </div>
              <div class="md:w-2/3">
                <div class="text-orange-500 text-xs font-semibold uppercase mb-1">PLAYAS</div>
                <h2 class="text-xl font-medium mb-2">
                  <NuxtLink to="/blog/single" class="title-link">Cómo Planificar un Fin de Semana en Cayos Cochinos</NuxtLink>
                </h2>
                <p class="text-gray-600 text-sm mb-4">
                  Todo lo que necesitas saber para disfrutar de este paraíso cercano a La Ceiba. Desde cómo llegar hasta las mejores actividades de snorkel y buceo en sus aguas cristalinas.
                </p>
                <div class="flex items-center">
                  <img class="rounded-full w-8 h-8" src="@/assets/images/blog/11.jpg" alt="Avatar" />
                  <div class="ml-2">
                    <h6 class="text-sm font-medium">David Hernández</h6>
                    <div class="flex text-gray-500 text-xs">
                      <span class="mr-2">Apr 30</span>
                      <span>Sin comentarios</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Article 5 -->
          <div class="mb-8 border-b pb-8">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                <NuxtLink to="/blog/single">
                  <img class="rounded-lg w-full h-36 object-cover" :src="b10" alt="Post image" />
                </NuxtLink>
              </div>
              <div class="md:w-2/3">
                <div class="text-orange-500 text-xs font-semibold uppercase mb-1">GASTRONOMÍA</div>
                <h2 class="text-xl font-medium mb-2">
                  <NuxtLink to="/blog/single" class="title-link">La Ruta del Baleada: Los Mejores Lugares en La Ceiba</NuxtLink>
                </h2>
                <p class="text-gray-600 text-sm mb-4">
                  Descubre dónde encontrar las baleadas más auténticas y deliciosas de la ciudad. Desde las tradicionales hasta las gourmet, te llevamos por un recorrido del platillo más popular de Honduras.
                </p>
                <div class="flex items-center">
                  <img class="rounded-full w-8 h-8" src="@/assets/images/blog/11.jpg" alt="Avatar" />
                  <div class="ml-2">
                    <h6 class="text-sm font-medium">Sofía Mendoza</h6>
                    <div class="flex text-gray-500 text-xs">
                      <span class="mr-2">Apr 19</span>
                      <span>2 comentarios</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Article 6 -->
          <div class="mb-8">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                <NuxtLink to="/blog/single">
                  <img class="rounded-lg w-full h-36 object-cover" :src="b11" alt="Post image" />
                </NuxtLink>
              </div>
              <div class="md:w-2/3">
                <div class="text-orange-500 text-xs font-semibold uppercase mb-1">NATURALEZA</div>
                <h2 class="text-xl font-medium mb-2">
                  <NuxtLink to="/blog/single" class="title-link">Avistamiento de Manatíes: Una Experiencia Única en La Ceiba</NuxtLink>
                </h2>
                <p class="text-gray-600 text-sm mb-4">
                  Todo lo que necesitas saber para observar a estos fascinantes mamíferos acuáticos en su hábitat natural. Una guía de las mejores épocas y lugares para esta aventura ecológica imperdible.
                </p>
                <div class="flex items-center">
                  <img class="rounded-full w-8 h-8" src="@/assets/images/blog/11.jpg" alt="Avatar" />
                  <div class="ml-2">
                    <h6 class="text-sm font-medium">Fernando López</h6>
                    <div class="flex text-gray-500 text-xs">
                      <span class="mr-2">Apr 06</span>
                      <span>5 comentarios</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Pagination -->
          <div class="flex justify-center mt-10">
            <nav class="inline-flex">
              <a href="#" class="w-8 h-8 flex items-center justify-center bg-orange-600 text-white rounded-full">1</a>
              <a href="#" class="w-8 h-8 flex items-center justify-center text-gray-700 mx-1 hover:bg-gray-100 rounded-full">2</a>
              <a href="#" class="w-8 h-8 flex items-center justify-center text-gray-700 mx-1 hover:bg-gray-100 rounded-full">3</a>
              <span class="w-8 h-8 flex items-center justify-center text-gray-500">...</span>
              <a href="#" class="w-8 h-8 flex items-center justify-center text-gray-700 mx-1 hover:bg-gray-100 rounded-full">8</a>
              <a href="#" class="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700 ml-1 hover:bg-gray-200 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Importación de imágenes para los posts
  import b6 from "@/assets/images/blog/06.jpg"
  import b7 from "@/assets/images/blog/07.jpg"
  import b8 from "@/assets/images/blog/08.jpg"
  import b9 from "@/assets/images/blog/09.jpg"
  import b10 from "@/assets/images/blog/10.jpg"
  import b11 from "@/assets/images/blog/11.jpg"
  
  // Para compatibilidad con Nuxt
  definePageMeta({
    title: 'Blog La Ceiba',
  })
  </script>
  
  <style scoped>
  /* Estilo para las etiquetas de categoría */
  .text-xs.font-semibold.uppercase {
    letter-spacing: 0.05em;
  }
  
  /* Estilos adicionales para refinamiento */
  .rounded-lg {
    border-radius: 0.5rem;
  }
  
  .border-b {
    border-color: #edf2f7;
  }
  
  /* Clase específica para forzar el color negro en los títulos */
  .title-link {
    color: #1a202c !important; /* Equivalente a text-gray-900 pero con !important */
  }
  
  .title-link:hover {
    color: #dd6b20 !important; /* Equivalente a hover:text-orange-600 pero con !important */
  }
  
  /* Fallback para asegurar que todos los títulos sean negros */
  h2 a, h2 a:link, h2 a:visited {
    color: #1a202c !important;
  }
  h2 a:hover {
    color: #dd6b20 !important;
  }
  </style>