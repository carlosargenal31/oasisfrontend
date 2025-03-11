<template>
    <!-- Categorías de propiedades -->
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="mb-10 text-center">
          <h2 class="text-3xl font-bold mb-2 text-gray-700">Explora por Categoría</h2>
          <p class="text-gray-700 max-w-2xl mx-auto">
            Encuentra la propiedad perfecta según tus necesidades específicas.
          </p>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <!-- Casa -->
          <div class="category-item">
            <router-link class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full" to="/properties/rent?category=houses">
              <div class="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-blue-50 category-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h3 class="text-base font-bold text-gray-700">Casas</h3>
            </router-link>
          </div>
  
          <!-- Apartamentos -->
          <div class="category-item">
            <router-link class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full" to="/properties/rent?category=apartments">
              <div class="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-blue-50 category-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17 11h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4"></path>
                  <path d="M17 17v-6"></path>
                  <path d="M17 5V3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v18h14v-2"></path>
                  <path d="M9 5h2"></path>
                  <path d="M9 9h2"></path>
                  <path d="M9 13h2"></path>
                </svg>
              </div>
              <h3 class="text-base font-bold text-gray-700">Apartamentos</h3>
            </router-link>
          </div>
  
          <!-- Comercial -->
          <div class="category-item">
            <router-link class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full" to="/properties/rent?category=commercial">
              <div class="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-blue-50 category-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
                  <path d="M3 9l2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                  <path d="M12 3v6"></path>
                </svg>
              </div>
              <h3 class="text-base font-bold text-gray-700">Comercial</h3>
            </router-link>
          </div>
  
          <!-- Alquiler Diario -->
          <div class="category-item">
            <router-link class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full" to="/properties/rent?category=daily-rental">
              <div class="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-blue-50 category-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                  <line x1="12" y1="4" x2="12" y2="10"></line>
                </svg>
              </div>
              <h3 class="text-base font-bold text-gray-700">Alquiler Diario</h3>
            </router-link>
          </div>
  
          <!-- Nuevas Construcciones -->
          <div class="category-item">
            <router-link class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full" to="/properties/sale?category=new-buildings">
              <div class="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-blue-50 category-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 22V9.76a2 2 0 0 1 .51-1.33L11.78 1a.7.7 0 0 1 .44 0l10.26 7.43a2 2 0 0 1 .51 1.33V22"></path>
                  <path d="M5 8v14"></path>
                  <path d="M19 8v14"></path>
                  <path d="M9 22v-6.07c0-.55.35-1.04.88-1.22a3.58 3.58 0 0 1 4.24 2.38c.13.36.46.61.84.61h0c.38 0 .72-.25.85-.61a3.58 3.58 0 0 1 4.23-2.38c.54.18.89.67.89 1.22V22"></path>
                </svg>
              </div>
              <h3 class="text-base font-bold text-gray-700">Construcciones</h3>
            </router-link>
          </div>
  
          <!-- Más opciones -->
          <div class="category-item">
            <div class="relative group">
              <button class="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full w-full">
                <div class="w-16 h-16 flex items-center justify-center rounded-full mb-4 bg-blue-50 category-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </div>
                <h3 class="text-base font-bold text-gray-700">Más</h3>
              </button>
              
              <!-- Menú desplegable -->
              <div class="absolute right-0 z-10 mt-2 hidden group-hover:block">
                <div class="bg-white rounded-md shadow-lg py-1 min-w-[200px]">
                  <router-link to="/properties/rent?category=rooms" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 4v16"></path>
                      <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
                      <path d="M2 17h20"></path>
                      <path d="M6 8v9"></path>
                    </svg>
                    <span class="font-medium">Habitaciones</span>
                  </router-link>
                  <router-link to="/properties/rent?category=offices" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    <span class="font-medium">Oficinas</span>
                  </router-link>
                  <router-link to="/properties/sale?category=land" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span class="font-medium">Terrenos</span>
                  </router-link>
                  <router-link to="/properties/sale?category=parking" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-[#1E3A8A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <path d="M9 9h6v6H9z"></path>
                    </svg>
                    <span class="font-medium">Estacionamiento</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>
  
<script setup>
// No se necesitan imports adicionales para este componente
</script>
  
<style scoped>
/* Efecto hover para las tarjetas */
.category-item a:hover, .category-item button:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

/* Estilos para el menú desplegable */
.group:hover .group-hover\:block {
  display: block;
}

/* Asegurar color de texto gris oscuro y negrita */
h2, h3, p {
  color: #374151 !important;
}

/* Títulos en negrita */
h3 {
  font-weight: 700 !important;
}
</style>