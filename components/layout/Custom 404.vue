<template>
    <div class="min-h-screen grid md:grid-cols-2">
      <!-- Columna izquierda (fondo oscuro) -->
      <div class="bg-gray-900 p-10 flex flex-col justify-center text-white">
        <h1 class="text-5xl md:text-6xl font-bold mb-4">
          Page Not Found.
        </h1>
        <p class="text-lg mb-10 text-gray-300">
          Sorry, we can't find the page you are looking for. We suggest you go to homepage while we are fixing the problem.
        </p>
        
        <!-- Decoración gráfica (línea curva) -->
        <svg class="w-20 h-20 mb-8 text-white opacity-80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30,40 Q50,10 70,60" stroke="currentColor" stroke-width="2" fill="none"/>
          <path d="M65,65 L70,60 L75,65" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
        
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <NuxtLink to="/" class="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium text-center">
            Go to homepage
          </NuxtLink>
          <NuxtLink to="/help-center" class="border border-white/30 hover:bg-white/10 text-white py-3 px-6 rounded-lg font-medium text-center">
            Visit help center
          </NuxtLink>
        </div>
      </div>
      
      <!-- Columna derecha (ilustración) -->
      <div class="bg-gray-100 flex items-center justify-center p-10">
        <div class="relative w-full max-w-md">
          <!-- Círculo de fondo -->
          <div class="absolute inset-0 rounded-full bg-white transform scale-125"></div>
          
          <!-- Ilustración de casa con señal 404 -->
          <div class="relative">
            <img src="/images/404-house.svg" class="w-full" alt="404 Error" 
                 onerror="this.onerror=null; this.src='https://via.placeholder.com/600x600?text=404+House'">
            
            <!-- Fallback si la imagen no carga -->
            <div class="absolute inset-0 flex items-center justify-center hidden error-fallback">
              <div class="relative">
                <!-- Casa simplificada -->
                <div class="w-64 h-40 mx-auto">
                  <div class="w-64 h-32 border-2 border-gray-400 relative">
                    <div class="absolute w-16 h-20 border-2 border-gray-400 bottom-0 left-6"></div>
                    <div class="absolute w-10 h-10 rounded-full border-2 border-gray-400 top-6 right-8"></div>
                  </div>
                  <div class="w-80 h-24 bg-transparent border-t-[30px] border-l-[25px] border-r-[25px] border-transparent border-t-gray-400 mx-auto -mt-6"></div>
                  
                  <!-- Señal 404 -->
                  <div class="absolute bottom-0 right-4 transform translate-y-1/2 -rotate-6">
                    <div class="bg-red-500 text-white text-2xl font-bold p-2 rounded transform rotate-3">
                      404
                    </div>
                    <div class="h-16 w-2 bg-gray-600 mx-auto -mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Configurar meta para la página
  useHead({
    title: 'Page Not Found - OASIS Real Estate',
    meta: [
      { name: 'description', content: 'Page not found - OASIS Real Estate' }
    ]
  });
  
  // Intentar cargar la imagen de la casa y mostrar fallback si falla
  onMounted(() => {
    const img = document.querySelector('img[alt="404 Error"]');
    const fallback = document.querySelector('.error-fallback');
    
    if (img && fallback) {
      img.addEventListener('error', () => {
        img.style.display = 'none';
        fallback.style.display = 'flex';
      });
    }
  });
  </script>