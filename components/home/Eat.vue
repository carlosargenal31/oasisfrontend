<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Banner Taxi 488 (lado izquierdo) -->
        <div class="lg:w-1/3 bg-indigo-50 rounded-lg p-6 h-full">
          <div class="flex flex-col h-full">
            <div class="mb-2">
              <h2 class="text-3xl font-bold">
                <span class="text-red-500 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Taxi <span class="text-gray-900">488</span>
                </span>
              </h2>
              <p class="text-gray-600 mt-2">The best way to get wherever you're going!</p>
            </div>
            <div class="flex-grow flex items-center justify-center">
              <img src="@/assets/images/taxi.svg" alt="Taxi" class="w-full max-w-xs" />
            </div>
          </div>
        </div>
        
        <!-- Where to eat (lado derecho) -->
        <div class="lg:w-2/3">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-3xl font-bold text-gray-900">Where to eat</h2>
            <a href="#" class="text-orange-700 font-medium flex items-center">
              Ver todo
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
          
          <!-- Cuadrícula de restaurantes -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <!-- COLUMNA IZQUIERDA -->
            <div>
              <!-- Pina Pizza Restaurant -->
              <div class="bg-gray-50 rounded-lg p-4 mb-6 flex">
                <div class="w-16 h-16 flex-shrink-0 bg-white rounded-lg flex items-center justify-center mr-4">
                  <img src="@/assets/images/brands/01.svg" alt="Pina Pizza Restaurant" class="w-14 h-14 object-contain" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-1 text-gray-900">Pina Pizza Restaurant</h3>
                  <div class="flex items-center mb-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-bold text-sm ml-1">5.0</span>
                    <span class="text-gray-500 text-sm ml-1">(48)</span>
                  </div>
                  <div class="flex items-center mb-1 text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    $$
                  </div>
                  <div class="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    1.4 km from center
                  </div>
                </div>
              </div>
              
              <!-- KFC -->
              <div class="bg-gray-50 rounded-lg p-4 mb-6 flex">
                <div class="w-16 h-16 flex-shrink-0 bg-white rounded-lg flex items-center justify-center mr-4">
                  <img src="@/assets/images/brands/02.svg" alt="KFC" class="w-14 h-14 object-contain" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-1 text-gray-900">KFC</h3>
                  <div class="flex items-center mb-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-bold text-sm ml-1">4.0</span>
                    <span class="text-gray-500 text-sm ml-1">(18)</span>
                  </div>
                  <div class="flex items-center mb-1 text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    $
                  </div>
                  <div class="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    1.8 km from center
                  </div>
                </div>
              </div>
              
              <!-- Yum Restaurant -->
              <div class="bg-gray-50 rounded-lg p-4 flex">
                <div class="w-16 h-16 flex-shrink-0 bg-white rounded-lg flex items-center justify-center mr-4">
                  <img src="@/assets/images/brands/03.svg" alt="Yum Restaurant" class="w-14 h-14 object-contain" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-1 text-gray-900">Yum Restaurant</h3>
                  <div class="flex items-center mb-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-bold text-sm ml-1">4.6</span>
                    <span class="text-gray-500 text-sm ml-1">(48)</span>
                  </div>
                  <div class="flex items-center mb-1 text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    $
                  </div>
                  <div class="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    2.4 km from center
                  </div>
                </div>
              </div>
            </div>
            
            <!-- COLUMNA DERECHA -->
            <div>
              <!-- Tosaka Sushi Bar -->
              <div class="bg-gray-50 rounded-lg p-4 mb-6 flex">
                <div class="w-16 h-16 flex-shrink-0 bg-white rounded-lg flex items-center justify-center mr-4">
                  <img src="@/assets/images/brands/04.svg" alt="Tosaka Sushi Bar" class="w-14 h-14 object-contain" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-1 text-gray-900">Tosaka Sushi Bar</h3>
                  <div class="flex items-center mb-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-bold text-sm ml-1">5.0</span>
                    <span class="text-gray-500 text-sm ml-1">(28)</span>
                  </div>
                  <div class="flex items-center mb-1 text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    $$$
                  </div>
                  <div class="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    2.5 km from center
                  </div>
                </div>
              </div>
              
              <!-- Dunkin' Donuts -->
              <div class="bg-gray-50 rounded-lg p-4 mb-6 flex">
                <div class="w-16 h-16 flex-shrink-0 bg-white rounded-lg flex items-center justify-center mr-4">
                  <img src="@/assets/images/brands/05.svg" alt="Dunkin' Donuts" class="w-14 h-14 object-contain" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-1 text-gray-900">Dunkin' Donuts</h3>
                  <div class="flex items-center mb-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-bold text-sm ml-1">5.0</span>
                    <span class="text-gray-500 text-sm ml-1">(43)</span>
                  </div>
                  <div class="flex items-center mb-1 text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    $
                  </div>
                  <div class="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    1.8 km from center
                  </div>
                </div>
              </div>
              
              <!-- Spicy Bar-Restaurant -->
              <div class="bg-gray-50 rounded-lg p-4 flex">
                <div class="w-16 h-16 flex-shrink-0 bg-white rounded-lg flex items-center justify-center mr-4">
                  <img src="@/assets/images/brands/06.svg" alt="Spicy Bar-Restaurant" class="w-14 h-14 object-contain" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-1 text-gray-900">Spicy Bar-Restaurant</h3>
                  <div class="flex items-center mb-1 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="font-bold text-sm ml-1">5.0</span>
                    <span class="text-gray-500 text-sm ml-1">(32)</span>
                  </div>
                  <div class="flex items-center mb-1 text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    $$$
                  </div>
                  <div class="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    0.4 km from center
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No se requiere lógica adicional para este componente
</script>

<style scoped>
/* Fondos */
.bg-indigo-50 {
  background-color: #EEF2FF;
}

.bg-gray-50 {
  background-color: #F9FAFB;
}

/* Colores */
.text-red-500 {
  color: #FD5631;
}

.text-yellow-400 {
  color: #FBBF24;
}

.text-orange-700 {
  color: #fd5631;
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

/* Interactividad */
.bg-gray-50:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

/* Bordes y espaciado */
.rounded-lg {
  border-radius: 0.5rem;
}

.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>