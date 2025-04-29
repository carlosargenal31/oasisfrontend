<template>
  <div class="bg-white min-h-screen">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy mx-auto mb-4"></div>
        <p class="text-lg font-medium text-gray-700">Cargando propiedades...</p>
      </div>
    </div>

    <!-- Encabezado principal con navegación (simplificado) -->
    <header class="bg-white border-b border-gray-200 py-4">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <div class="flex items-center">
          <div class="text-2xl font-bold text-blue-500">OASIS</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <span class="mr-2 font-black">ES</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div class="flex items-center">
            <span class="mr-2 font-black">EUR</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button class="bg-navy text-white px-4 py-2 rounded-md flex items-center" @click="redirectToAddProperty">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Añadir propiedad
          </button>
          <img class="h-10 w-10 rounded-full" :src="user.profile_image || '/img/default-avatar.png'" alt="Perfil de usuario">
        </div>
      </div>
    </header>

    <!-- Navegación de migas de pan -->
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center text-blue-500 text-sm">
        <a href="/" class="hover:text-navy">Inicio</a>
        <span class="mx-2">/</span>
        <span class="text-gray-800">Mis Propiedades</span>
      </div>
    </div>

    <!-- Contenido principal con barra lateral -->
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row">
        <!-- Barra lateral izquierda - ancho aumentado -->
        <div class="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <!-- Perfil de usuario en la barra lateral -->
            <div class="p-4 text-center">
              <img :src="user.profile_image || '/img/default-avatar.png'" alt="Usuario" class="rounded-full w-24 h-24 mx-auto mb-4">
              <h3 class="text-xl font-bold text-black">{{ user.first_name }} {{ user.last_name }}</h3>
              <div class="flex justify-center my-2">
                <span class="text-yellow-400">★★★★★</span>
              </div>
              <div class="text-gray-800 text-sm mt-2">
                <div class="mb-1">
                  <i class="fas fa-phone mr-2"></i> {{ user.phone || 'No especificado' }}
                </div>
                <div>
                  <i class="fas fa-envelope mr-2"></i> {{ user.email }}
                </div>
              </div>
            </div>

            <!-- Botón añadir propiedad -->
            <div class="px-4 pb-4">
              <button 
                @click="redirectToAddProperty" 
                class="w-full bg-navy text-white py-2 rounded flex justify-center items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Añadir propiedad
              </button>
            </div>

            <!-- Menú de navegación -->
            <div class="border-t border-gray-200">
              <a href="/account/account-info" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-black">Información Personal</span>
              </a>
              
              <a href="/account/properties" class="flex items-center px-4 py-3 border-l-4 border-navy bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span class="text-navy font-medium">Mis Propiedades</span>
              </a>
              <a href="/account/bookings" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-black">Mis Reservas</span>
                </a>

                <a href="/account/purchases" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    <span class="text-black">Mis Compras</span>
  </a>
              <a href="/account/wishlist" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="text-black">Lista de Deseos</span>
              </a>
              
              <a href="/logout" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="text-black">Cerrar Sesión</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Área de contenido principal -->
        <div class="w-full md:w-2/3">
          <div class="flex items-center justify-between mb-4">
            <h1 class="text-2xl font-bold text-black">Mis Propiedades</h1>
            <button 
              v-if="properties.length > 0"
              @click="showDeleteAllModal = true" 
              class="text-red-500 hover:text-red-600 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar todo
            </button>
          </div>
          
          <p class="text-gray-600 mb-6">Aquí puede ver sus propiedades publicadas y editarlas fácilmente.</p>
          
          <!-- Pestañas de navegación -->
          <div class="mb-6">
            <div class="border-b border-gray-200">
              <nav class="flex -mb-px">
                <button 
                  @click="activeTab = 'published'" 
                  class="px-4 py-2 border-b-2 font-medium text-sm leading-5 focus:outline-none mr-8"
                  :class="activeTab === 'published' ? 'border-navy text-navy' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" :class="activeTab === 'published' ? 'text-navy' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Publicadas
                </button>
                <button 
                  @click="activeTab = 'sold'" 
                  class="px-4 py-2 border-b-2 font-medium text-sm leading-5 focus:outline-none mr-8"
                  :class="activeTab === 'sold' ? 'border-navy text-navy' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" :class="activeTab === 'sold' ? 'text-navy' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vendidas/Alquiladas
                </button>
                <button 
                  @click="activeTab = 'archived'" 
                  class="px-4 py-2 border-b-2 font-medium text-sm leading-5 focus:outline-none"
                  :class="activeTab === 'archived' ? 'border-navy text-navy' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" :class="activeTab === 'archived' ? 'text-navy' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Archivadas
                </button>
              </nav>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="isLoadingProperties" class="flex justify-center py-10">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
          </div>

          <!-- No properties state -->
          <div v-else-if="filteredProperties.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No hay propiedades {{ tabText }}</h3>
            <p class="text-gray-600 mb-4">Comience añadiendo una nueva propiedad a su cuenta.</p>
            <button @click="redirectToAddProperty" class="bg-navy text-white py-2 px-4 rounded-md hover:bg-navy-dark transition flex items-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Añadir propiedad
            </button>
          </div>

          <!-- Properties list -->
          <div v-else class="space-y-4">
            <div 
              v-for="property in filteredProperties" 
              :key="property.id" 
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 overflow-hidden flex flex-col md:flex-row"
            >
              <!-- Property image -->
              <div class="md:w-1/3 relative">
                <img 
                  :src="property.image || '/img/property-placeholder.jpg'" 
                  alt="Imagen de propiedad" 
                  class="w-full h-full object-cover md:h-auto" 
                  style="min-height: 200px;"
                >
                <!-- Status badges -->
                <div class="absolute top-2 left-2">
                  <span 
                    v-if="property.isNew" 
                    class="bg-blue-500 text-white text-xs px-2 py-1 rounded mb-1 inline-block"
                  >
                    Nuevo
                  </span>
                  <span 
                    v-if="property.isVerified" 
                    class="bg-green-500 text-white text-xs px-2 py-1 rounded inline-block ml-1"
                  >
                    Verificado
                  </span>
                </div>
                
                <!-- Botón de restauración rápida para propiedades archivadas -->
                <div 
                  v-if="activeTab === 'archived' && property.archived" 
                  class="absolute top-2 right-2 z-10"
                >
                  <button 
                    @click.stop="restoreProperty(property.id)" 
                    class="bg-white text-green-600 hover:bg-green-50 rounded-full p-2 shadow-md transition-colors"
                    title="Restaurar propiedad"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Property details -->
              <div class="p-4 md:p-6 flex-1 relative">
                <!-- Property dropdown menu -->
                <div class="absolute top-4 right-4">
                  <div class="relative" ref="dropdownRef">
                    <button 
                      @click="toggleDropdown(property.id)" 
                      class="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    
                    <!-- Dropdown menu with archive/restore options -->
                    <div 
                      v-if="activeDropdown === property.id"
                      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200"
                    >
                      <button 
                        @click="editProperty(property.id)" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </button>

                      <!-- Opción de archivado/restauración -->
                      <button 
                        v-if="!property.archived"
                        @click="archiveProperty(property.id)"
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                        Archivar
                      </button>

                      <button 
                        v-if="property.archived"
                        @click="restoreProperty(property.id)"
                        class="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-green-50 w-full text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Restaurar
                      </button>

                      

                      <!-- Opción de eliminar propiedad -->
                      <button 
                        @click="confirmDeleteProperty(property)" 
                        class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Property type label -->
                <div class="mb-1 uppercase text-sm font-medium" :class="property.status === 'for-rent' ? 'text-blue-500' : 'text-red-500'">
                  {{ property.status === 'for-rent' ? 'En alquiler' : property.status === 'for-sale' ? 'En venta' : property.status === 'archived' ? 'Archivada' : property.status }}
                </div>
                
                <h3 
                  @click="navigateToPropertyDetails(property.id)" 
                  class="text-lg font-semibold text-black mb-1 cursor-pointer hover:text-blue-800"
                >
                  {{ property.title }} | {{ property.square_feet }} m²
                </h3>
                
                <!-- Property address -->
                <p class="text-gray-600 text-sm mb-3">{{ property.address }}</p>
                
                <!-- Property price -->
                <div class="text-xl font-bold text-black mb-4 flex items-center">
                  <span class="mr-1">L</span> {{ formatPrice(property.price) }}
                  <span v-if="property.status === 'for-rent'" class="text-sm text-gray-500 ml-1">/mes</span>
                </div>

                <!-- Property features -->
                <div class="flex items-center text-sm text-gray-600 mb-4">
                  <div class="flex items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {{ property.bedrooms }} hab.
                  </div>
                  <div class="flex items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ property.bathrooms }} baños
                  </div>
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      {{ property.parkingSpaces || 0 }} parking
                    </div>
                  </div>

                  <!-- Property views and status -->
                  <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div class="flex items-center text-sm text-gray-600 mb-2 sm:mb-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {{ property.views || 0 }} visitas
                    </div>
                    <div>
                      <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                        :class="getStatusClass(property)"
                      >
                        {{ getStatusText(property) }}
                      </span>
                    </div>
                  </div>

                  <!-- Badge que indique cuándo fue archivada la propiedad -->
                  <div 
                    v-if="property.archived && property.archived_at" 
                    class="text-xs text-gray-500 mt-2"
                  >
                    Archivada el {{ formatDate(property.archived_at) }}
                    <span v-if="property.archived_reason">
                      - {{ property.archived_reason }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pagination if needed -->
            <div v-if="totalPages > 1" class="mt-6 flex justify-center">
              <nav class="flex items-center">
                <button 
                  @click="changePage(currentPage - 1)" 
                  :disabled="currentPage === 1"
                  class="px-2 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div class="px-4 py-1 text-gray-700">
                  Página {{ currentPage }} de {{ totalPages }}
                </div>
                
                <button 
                  @click="changePage(currentPage + 1)" 
                  :disabled="currentPage === totalPages"
                  class="px-2 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de confirmación para eliminar propiedad -->
      <div v-if="propertyToDelete" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 class="text-xl font-bold text-red-600 mb-4">¿Está seguro?</h3>
          <p class="text-gray-700 mb-4">Esta acción eliminará permanentemente la propiedad "{{ propertyToDelete.title }}" y no se puede deshacer.</p>
          <div class="flex justify-end space-x-3">
            <button @click="propertyToDelete = null" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
              Cancelar
            </button>
            <button @click="deleteProperty(propertyToDelete.id)" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Eliminar
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de confirmación para eliminar todas las propiedades -->
      <div v-if="showDeleteAllModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 class="text-xl font-bold text-red-600 mb-4">¿Está seguro?</h3>
          <p class="text-gray-700 mb-6">Esta acción eliminará permanentemente todas sus propiedades {{ tabText }} y no se puede deshacer.</p>
          <div class="flex justify-end space-x-3">
            <button @click="showDeleteAllModal = false" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
              Cancelar
            </button>
            <button @click="deleteAllProperties" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Eliminar todas
            </button>
          </div>
        </div>
      </div>

      <!-- Modal para solicitar razón de archivado -->
      <div v-if="showArchiveModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 class="text-xl font-bold text-navy mb-4">Archivar Propiedad</h3>
          <p class="text-gray-700 mb-4">
            Esta propiedad será archivada y no aparecerá en los listados públicos. Podrá restaurarla más tarde.
          </p>
          
          <div class="mb-4">
            <label for="archiveReason" class="block text-sm font-medium text-gray-700 mb-1">
              Razón de archivado (opcional)
            </label>
            <textarea 
              id="archiveReason"
              v-model="archiveReason"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-navy focus:border-navy"
              placeholder="Ejemplo: Ya no está disponible, Propiedad vendida por fuera, etc."
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              @click="cancelArchive" 
              class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button 
              @click="confirmArchive" 
              class="px-4 py-2 bg-navy text-white rounded hover:bg-navy-dark"
            >
              Archivar
            </button>
          </div>
        </div>
      </div>

      <!-- Toast de notificación -->
      <div v-if="notification.show" 
        class="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 flex items-start max-w-sm transition-all duration-300"
        :class="{'bg-green-50': notification.type === 'success', 'bg-red-50': notification.type === 'error', 'bg-blue-50': notification.type === 'info'}"
      >
        <div v-if="notification.type === 'success'" class="text-green-500 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div v-if="notification.type === 'error'" class="text-red-500 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div v-if="notification.type === 'info'" class="text-blue-500 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div class="font-medium" 
            :class="{
              'text-green-800': notification.type === 'success', 
              'text-red-800': notification.type === 'error',
              'text-blue-800': notification.type === 'info'
            }"
          >
            {{ notification.title }}
          </div>
          <div class="text-sm text-gray-600">{{ notification.message }}</div>
        </div>
        <button @click="notification.show = false" class="ml-auto text-gray-400 hover:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from '~/src/config/axios'; // Ajusta la ruta según tu estructura

  // Router
  const router = useRouter();

  // Estado del usuario
  const user = ref({
    id: null,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    profile_image: ''
  });

  // Estado de las propiedades
  const properties = ref([]);
  const activeTab = ref('published');
  const isLoading = ref(true);
  const isLoadingProperties = ref(true);
  const activeDropdown = ref(null);
  const dropdownRef = ref(null);
  const propertyToDelete = ref(null);
  const showDeleteAllModal = ref(false);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const itemsPerPage = ref(10);

  // Variables de estado para el modal de archivado
  const showArchiveModal = ref(false);
  const archiveReason = ref('');
  const propertyToArchive = ref(null);

  // Notificación
  const notification = ref({
    show: false,
    type: 'success',
    title: '',
    message: '',
    timeout: null
  });

  

  // Computed property para el texto según la pestaña activa
  const tabText = computed(() => {
    if (activeTab.value === 'published') {
      return 'publicadas';
    } else if (activeTab.value === 'sold') {
      return 'vendidas/alquiladas';
    } else if (activeTab.value === 'archived') {
      return 'archivadas';
    }
    return '';
  });

  const navigateToPropertyDetails = (propertyId) => {
    router.push(`/properties/${propertyId}`);
  };

  // Redirigir a la página de añadir propiedad
  const redirectToAddProperty = () => {
    router.push('/properties/add-property');
  };

  // Formatear precio con separadores de miles
  const formatPrice = (price) => {
    if (!price) return '0';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    
    // Comprobar si la fecha es válida
    if (isNaN(date.getTime())) return 'Fecha inválida';
    
    // Formatear la fecha en formato local (español)
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return date.toLocaleDateString('es-ES', options);
  };

  // Obtener clase CSS según el estado de la propiedad
  const getStatusClass = (property) => {
    if (property.archived) {
      return 'bg-gray-100 text-gray-800';
    } else if (property.status === 'sold' || property.status === 'rented') {
      return 'bg-orange-100 text-orange-800';
    } else if (property.isFeatured) {
      return 'bg-purple-100 text-purple-800';
    } else if (property.isVerified) {
      return 'bg-green-100 text-green-800';
    } else if (property.status === 'for-rent') {
      return 'bg-blue-100 text-blue-800';
    } else if (property.status === 'for-sale') {
      return 'bg-red-100 text-red-800';
    } else {
      return 'bg-blue-100 text-blue-800';
    }
  };

  // Obtener texto según el estado de la propiedad
  const getStatusText = (property) => {
    if (property.archived) {
      return 'Archivada';
    } else if (property.status === 'sold') {
      return 'Vendida';
    } else if (property.status === 'rented') {
      return 'Alquilada';
    } else if (property.isFeatured) {
      return 'Destacada';
    } else if (property.isVerified) {
      return 'Verificada';
    } else if (property.status === 'for-rent') {
      return 'En alquiler';
    } else if (property.status === 'for-sale') {
      return 'En venta';
    } else {
      return 'Publicada';
    }
  };

  // Toggle dropdown menu for property actions
  const toggleDropdown = (propertyId) => {
    if (activeDropdown.value === propertyId) {
      activeDropdown.value = null;
    } else {
      activeDropdown.value = propertyId;
    }
  };

  const handleClickOutside = (event) => {
  // Si no hay dropdownRef, no hacer nada
  if (!dropdownRef.value) return;
  
  // Si es un solo elemento (no un array)
  if (!Array.isArray(dropdownRef.value)) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      activeDropdown.value = null;
    }
  } 
  // Si es un array de elementos
  else {
    const clickedOutside = !dropdownRef.value.some(
      ref => ref && ref.contains && ref.contains(event.target)
    );
    
    if (clickedOutside) {
      activeDropdown.value = null;
    }
  }
};

  // Cargar los datos del usuario
  const loadUserData = async () => {
    try {
      isLoading.value = true;
      
      // Obtener token del localStorage
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        console.error('No hay token de autenticación');
        router.push('/auth/login');
        return;
      }
      
      // Conectamos con la API
      const response = await axios.get('/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.success) {
        // Asignar datos del usuario
        user.value = response.data.data.user || {};
      } else {
        throw new Error('No se pudieron obtener los datos del usuario');
      }
    } catch (error) {
      console.error('Error cargando datos del usuario:', error);
      
      if (error.response && error.response.status === 401) {
        // Error de autenticación, redirigir al login
        router.push('/auth/login');
      } else {
        showNotification('error', 'Error', 'No se pudieron cargar los datos del perfil');
      }
    } finally {
      isLoading.value = false;
    }
  };

  const loadProperties = async () => {
  try {
    isLoadingProperties.value = true;
    
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }
    
    // Simplificar la solicitud al máximo
    // Solo filtrar por host_id sin parámetros adicionales
    const response = await axios.get('/api/properties', {
      params: {
        host_id: user.value.id
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      console.log("Propiedades recibidas:", response.data.data);
      properties.value = response.data.data.properties || [];
      totalPages.value = response.data.data.totalPages || 1;
    } else {
      throw new Error('No se pudieron obtener las propiedades');
    }
  } catch (error) {
    console.error('Error cargando propiedades:', error);
    console.error('Detalles del error:', error.response?.data || error.message);
    showNotification('error', 'Error', 'No se pudieron cargar las propiedades');
    properties.value = [];
    totalPages.value = 1;
  } finally {
    isLoadingProperties.value = false;
  }
};

const filteredProperties = computed(() => {
  console.log("Propiedades disponibles para filtrar:", properties.value);
  
  if (activeTab.value === 'published') {
    return properties.value.filter(p => 
      p.status === 'for-rent' || p.status === 'for-sale'
    );
  } else if (activeTab.value === 'sold') {
    return properties.value.filter(p => 
      p.status === 'sold' || p.status === 'rented'
    );
  } else if (activeTab.value === 'archived') {
    return properties.value.filter(p => 
      p.archived === 1 || p.archived === true
    );
  }
  
  // Si no hay filtro, devolver todas
  return properties.value;
});

  // Cambiar página
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      loadProperties();
    }
  };

  const editProperty = (propertyId) => {
    router.push(`/properties/edit/${propertyId}`);
  };

  // Promocionar propiedad
  const promoteProperty = async (propertyId) => {
    try {
      // Obtener token del localStorage
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        console.error('No hay token de autenticación');
        return;
      }
      
      // Conectamos con la API
      const response = await axios.put(`/api/properties/${propertyId}/promote`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.success) {
        showNotification('success', 'Éxito', 'La propiedad ha sido destacada');
        
        // Actualizar la propiedad en la lista local
        const propertyIndex = properties.value.findIndex(p => p.id === propertyId);
        if (propertyIndex !== -1) {
          properties.value[propertyIndex].isFeatured = true;
        }
      } else {
        throw new Error('No se pudo destacar la propiedad');
      }
    } catch (error) {
      console.error('Error al destacar la propiedad:', error);
      showNotification('error', 'Error', 'No se pudo destacar la propiedad');
    } finally {
      activeDropdown.value = null;
    }
  };

  // Abrir el modal de archivo
  const showArchivePropertyModal = (property) => {
    propertyToArchive.value = property;
    archiveReason.value = ''; // Reiniciar el motivo
    showArchiveModal.value = true;
    activeDropdown.value = null; // Cerrar el dropdown si está abierto
  };

  // Cancelar el archivado
  const cancelArchive = () => {
    showArchiveModal.value = false;
    propertyToArchive.value = null;
    archiveReason.value = '';
  };

  // Actualiza la función archiveProperty para usar métodos existentes
const archiveProperty = (propertyId) => {
  const property = properties.value.find(p => p.id === propertyId);
  if (property) {
    showArchivePropertyModal(property);
  }
};

// Modifica confirmArchive para usar la ruta correcta
const confirmArchive = async () => {
  if (!propertyToArchive.value) return;
  
  try {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }
    
    showNotification('info', 'Procesando', 'Archivando propiedad...');
    showArchiveModal.value = false;
    
    // Usar la ruta específica para archivar
    const response = await axios.patch(`/api/properties/${propertyToArchive.value.id}/archive`, {
      reason: archiveReason.value || null
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      showNotification('success', 'Éxito', 'Propiedad archivada correctamente');
      
      // Actualizar la propiedad en la lista local
      const propertyIndex = properties.value.findIndex(p => p.id === propertyToArchive.value.id);
      if (propertyIndex !== -1) {
        properties.value[propertyIndex].archived = 1;
        properties.value[propertyIndex].status = 'unavailable';
        properties.value[propertyIndex].archived_reason = archiveReason.value || null;
        properties.value[propertyIndex].archived_at = new Date().toISOString();
      }
      
      // Recargar propiedades para asegurar datos actualizados
      loadProperties();
    } else {
      throw new Error('No se pudo archivar la propiedad');
    }
  } catch (error) {
    console.error('Error al archivar la propiedad:', error);
    showNotification('error', 'Error', 'No se pudo archivar la propiedad');
  } finally {
    propertyToArchive.value = null;
    archiveReason.value = '';
  }
};

  // Restaurar propiedad archivada
  const restoreProperty = async (propertyId) => {
    try {
      // Obtener token del localStorage
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        console.error('No hay token de autenticación');
        return;
      }
      
      // Mostrar mensaje de carga
      showNotification('info', 'Procesando', 'Restaurando propiedad...');
      
      // Conectamos con la API - usando el nuevo endpoint patch /:id/restore
      const response = await axios.patch(`/api/properties/${propertyId}/restore`, {
        status: 'for-rent'  // Por defecto restauramos como "en alquiler", pero podría ser configurable
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.success) {
        showNotification('success', 'Éxito', 'Propiedad restaurada correctamente');
        
        // Actualizar la propiedad en la lista local
        const propertyIndex = properties.value.findIndex(p => p.id === propertyId);
        if (propertyIndex !== -1) {
          properties.value[propertyIndex].archived = false;
          properties.value[propertyIndex].status = 'for-rent';
        }
        
        // Opcionalmente, recargar propiedades para asegurar datos actualizados
        loadProperties();
      } else {
        throw new Error('No se pudo restaurar la propiedad');
      }
    } catch (error) {
      console.error('Error al restaurar la propiedad:', error);
      let errorMessage = 'No se pudo restaurar la propiedad';
      
      // Mostrar mensaje de error específico si está disponible
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      
      showNotification('error', 'Error', errorMessage);
    } finally {
      activeDropdown.value = null;
    }
  };

  // Confirmar eliminación de propiedad
  const confirmDeleteProperty = (property) => {
    propertyToDelete.value = property;
    activeDropdown.value = null;
  };

  // Eliminar propiedad
  const deleteProperty = async (propertyId) => {
    try {
      // Obtener token del localStorage
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        console.error('No hay token de autenticación');
        return;
      }
      
      // Conectamos con la API
      const response = await axios.delete(`/api/properties/${propertyId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data && response.data.success) {
        showNotification('success', 'Éxito', 'La propiedad ha sido eliminada');
        
        // Eliminar la propiedad de la lista local
        properties.value = properties.value.filter(p => p.id !== propertyId);
      } else {
        throw new Error('No se pudo eliminar la propiedad');
      }
    } catch (error) {
      console.error('Error al eliminar la propiedad:', error);
      showNotification('error', 'Error', 'No se pudo eliminar la propiedad');
    } finally {
      propertyToDelete.value = null;
    }
  };

  // Eliminar todas las propiedades
  const deleteAllProperties = async () => {
    try {
      // Obtener token del localStorage
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        console.error('No hay token de autenticación');
        return;
      }
      
      // ID de propiedades a eliminar según la pestaña activa
      const propertyIds = filteredProperties.value.map(p => p.id);
      
      if (propertyIds.length === 0) {
        showNotification('error', 'Error', 'No hay propiedades para eliminar');
        showDeleteAllModal.value = false;
        return;
      }
      
      // Conectamos con la API
      const response = await axios.post('/api/properties/batch-delete', {
        propertyIds
      }, { headers: {
         'Authorization': `Bearer ${token}`
       }
     });
     
     if (response.data && response.data.success) {
       showNotification('success', 'Éxito', 'Todas las propiedades han sido eliminadas');
       
       // Eliminar las propiedades de la lista local
       properties.value = properties.value.filter(p => !propertyIds.includes(p.id));
     } else {
       throw new Error('No se pudieron eliminar las propiedades');
     }
   } catch (error) {
     console.error('Error al eliminar las propiedades:', error);
     showNotification('error', 'Error', 'No se pudieron eliminar las propiedades');
   } finally {
     showDeleteAllModal.value = false;
   }
 };

 // Mostrar notificación
 const showNotification = (type, title, message) => {
   // Limpiar timeout existente
   if (notification.value.timeout) {
     clearTimeout(notification.value.timeout);
   }
   
   // Configurar notificación
   notification.value.type = type;
   notification.value.title = title;
   notification.value.message = message;
   notification.value.show = true;
   
   // Ocultar después de 5 segundos
   notification.value.timeout = setTimeout(() => {
     notification.value.show = false;
   }, 5000);
 };

 // Watch para cuando cambia la pestaña
 watch(activeTab, () => {
   // Reset pagination when changing tabs
   currentPage.value = 1;
   // Cargar propiedades según la pestaña seleccionada
   loadProperties();
 });

 // Al montar el componente
 onMounted(async () => {
   document.addEventListener('click', handleClickOutside);
   
   // Verificar si hay un token
   const token = localStorage.getItem('access_token');
   if (!token) {
     router.push('/auth/login');
     return;
   }
   
   // Cargar datos
   await loadUserData();
   await loadProperties();
 });

 // Antes de desmontar el componente
 onBeforeUnmount(() => {
   document.removeEventListener('click', handleClickOutside);
 });
 </script>

 <style>
 /* Colores personalizados */
 .bg-navy {
   background-color: #0a3364;
 }

 .bg-navy-dark {
   background-color: #072649;
 }

 .text-navy {
   color: #0a3364;
 }

 .border-navy {
   border-color: #0a3364;
 }

 .hover\:bg-navy:hover {
   background-color: #0a3364;
 }

 .hover\:bg-navy-dark:hover {
   background-color: #072649;
 }

 .hover\:text-navy:hover {
   color: #0a3364;
 }

 /* Estilos de enfoque */
 .focus\:ring-navy:focus {
   --tw-ring-color: #0a3364;
   --tw-ring-opacity: 0.5;
   box-shadow: 0 0 0 3px rgba(10, 51, 100, 0.5);
 }

 .focus\:border-navy:focus {
   border-color: #0a3364;
 }

 /* Animación del spinner */
 @keyframes spin {
   from {
     transform: rotate(0deg);
   }
   to {
     transform: rotate(360deg);
   }
 }

 .animate-spin {
   animation: spin 1s linear infinite;
 }

 /* Transiciones */
 .transition {
   transition-property: background-color, border-color, color, fill, stroke, box-shadow;
   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
   transition-duration: 150ms;
 }
 </style>