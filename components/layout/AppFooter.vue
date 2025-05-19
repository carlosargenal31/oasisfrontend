<template>
  <!-- Footer-->
  <footer class="bg-gray-100 pt-10">
    <div class="container mx-auto px-4 pb-8">
      <!-- Links-->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <div class="flex flex-col md:flex-row justify-between">
            <div class="mb-8 md:mb-0 md:mr-12">
              <router-link class="inline-block mb-6" to="/">
                <h1 class="text-xl font-bold text-orange-600">En La Ceiba</h1>
              </router-link>
              
              <ul class="space-y-3">
                <li>
                  <a href="mailto:info@enlaceiba.com" class="text-gray-600 hover:text-orange-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@enlaceiba.com
                  </a>
                </li>
                <li>
                  <a href="tel:5043192355" class="text-gray-600 hover:text-orange-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    (504) 
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold text-gray-800 mb-4">Enlaces rápidos</h4>
              <ul class="space-y-3">
                <li>
                  <router-link to="/about" class="text-gray-600 hover:text-orange-600">Sobre Nosotros</router-link>
                </li>
                <li>
                  <router-link to="/properties/rent" class="text-gray-600 hover:text-orange-600">Comercios</router-link>
                </li>
                <li>
                  <router-link to="/events/grid" class="text-gray-600 hover:text-orange-600">Eventos</router-link>
                </li>
                <li>
                  <router-link to="/blog/grid" class="text-gray-600 hover:text-orange-600">Blog</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Área reservada para contenido futuro -->
        <div>
          <!-- He quitado las redes sociales según lo solicitado -->
        </div>
      </div>
      
      <div class="text-center mt-10">
        <p class="text-gray-600 text-sm">
          &copy; {{ new Date().getFullYear() }} En La Ceiba. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No special logic needed for the footer
</script>