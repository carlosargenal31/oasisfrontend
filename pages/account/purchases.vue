<template>
  <div class="bg-white min-h-screen">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy mx-auto mb-4"></div>
        <p class="text-lg font-medium text-gray-700">Cargando compras...</p>
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
        <span class="text-gray-800">Mis Compras</span>
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
              
              <a href="/account/properties" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span class="text-black">Mis Propiedades</span>
              </a>
              
              <a href="/account/bookings" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-black">Mis Reservas</span>
              </a>
              
              <a href="/account/purchases" class="flex items-center px-4 py-3 border-l-4 border-navy bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="text-navy font-medium">Mis Compras</span>
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
            <h1 class="text-2xl font-bold text-black">Mis Compras</h1>
            <button 
              v-if="purchases.length > 0"
              @click="showDeleteAllModal = true" 
              class="text-red-500 hover:text-red-600 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Cancelar todas
            </button>
          </div>
          
          <p class="text-gray-600 mb-6">Aquí puede ver sus compras de propiedades en venta y gestionarlas fácilmente.</p>
          
          <!-- Pestañas de navegación -->
          <div class="mb-6">
            <div class="border-b border-gray-200">
              <nav class="flex -mb-px">
                <button 
                  @click="activeTab = 'pending'" 
                  class="px-4 py-2 border-b-2 font-medium text-sm leading-5 focus:outline-none mr-8"
                  :class="activeTab === 'pending' ? 'border-navy text-navy' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" :class="activeTab === 'pending' ? 'text-navy' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Pendientes
                </button>
                <button 
                  @click="activeTab = 'completed'" 
                  class="px-4 py-2 border-b-2 font-medium text-sm leading-5 focus:outline-none mr-8"
                  :class="activeTab === 'completed' ? 'border-navy text-navy' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" :class="activeTab === 'completed' ? 'text-navy' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Finalizadas
                </button>
                <button 
                  @click="activeTab = 'cancelled'" 
                  class="px-4 py-2 border-b-2 font-medium text-sm leading-5 focus:outline-none"
                  :class="activeTab === 'cancelled' ? 'border-navy text-navy' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" :class="activeTab === 'cancelled' ? 'text-navy' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Canceladas
                </button>
              </nav>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="isLoadingPurchases" class="flex justify-center py-10">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
          </div>

          <!-- No purchases state -->
          <div v-else-if="filteredPurchases.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No hay compras {{ tabText }}</h3>
            <p class="text-gray-600 mb-4">Realice una compra de propiedad para que aparezca aquí.</p>
            <button @click="redirectToSearch" class="bg-navy text-white py-2 px-4 rounded-md hover:bg-navy-dark transition flex items-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar propiedades
            </button>
          </div>

          <!-- Purchases list -->
          <div v-else class="space-y-4">
            <div 
              v-for="purchase in filteredPurchases" 
              :key="purchase.id" 
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 overflow-hidden flex flex-col md:flex-row"
            >
              <!-- Property image -->
              <div class="md:w-1/3 relative">
                <img 
                  :src="purchase.property?.image || '/img/property-placeholder.jpg'" 
                  alt="Imagen de propiedad" 
                  class="w-full h-full object-cover md:h-auto" 
                  style="min-height: 200px;"
                >
                <!-- Status badges -->
                <div class="absolute top-2 left-2">
                  <span 
                    v-if="isPending(purchase)" 
                    class="bg-blue-500 text-white text-xs px-2 py-1 rounded mb-1 inline-block"
                  >
                    Pendiente
                  </span>
                </div>
              </div>
              
              <!-- Purchase details -->
              <div class="p-4 md:p-6 flex-1 relative">
                <!-- Purchase dropdown menu -->
                <div class="absolute top-4 right-4">
                  <div class="relative" ref="dropdownRef">
                    <button 
                      @click="toggleDropdown(purchase.id)" 
                      class="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    
                    <!-- Dropdown menu con opciones según el estado de la compra -->
                    <div 
                      v-if="activeDropdown === purchase.id"
                      class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200"
                    >
                      <!-- Ver detalles - disponible para todas las compras -->
                      <button 
                        @click="viewPropertyDetails(purchase.property_id)" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver detalles
                      </button>

                      <!-- Completar compra - solo para compras pendientes o confirmadas -->
                      <button 
                        v-if="isPending(purchase)"
                        @click="showCompleteModal(purchase.id)" 
                        class="flex items-center px-4 py-2 text-sm text-green-600 hover:bg-green-50 w-full text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completar compra
                      </button>

                      <!-- Ver contrato/escritura - para compras completadas -->
                      <button 
                        v-if="purchase.status === 'completed'"
                        @click="showContractModal(purchase.id)" 
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Ver escritura
                      </button>

                      <!-- Cancelar compra - solo para compras pendientes o confirmadas -->
                      <button 
                        v-if="canCancelPurchase(purchase)"
                        @click="confirmCancelPurchase(purchase)" 
                        class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Cancelar compra
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Property type label -->
                <div class="mb-1 uppercase text-sm font-medium" :class="getStatusClass(purchase)">
                  {{ getStatusText(purchase) }}
                </div>
                
                <h3 
                  @click="navigateToPropertyDetails(purchase.property_id)" 
                  class="text-lg font-semibold text-black mb-1 cursor-pointer hover:text-blue-800"
                >
                  {{ purchase.property?.title || 'Propiedad' }}
                </h3>
                
                <!-- Property address -->
                <p class="text-gray-600 text-sm mb-3">{{ purchase.property?.address || 'Dirección no disponible' }}</p>
                
                <!-- Purchase price -->
                <div class="text-xl font-bold text-black mb-4">
                  <span class="mr-1">L</span> {{ formatPrice(purchase.total_price) }}
                </div>

                <!-- Purchase date -->
                <div class="flex items-center text-sm text-gray-600 mb-4">
                  <div class="flex items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Fecha de compra: {{ formatDate(purchase.created_at) }}
                  </div>
                </div>

                <!-- Status badges -->
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div class="flex items-center text-sm text-gray-600 mb-2 sm:mb-0">
                    <span class="text-gray-600">Compra #{{ purchase.id }}</span>
                  </div>
                  <div>
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                      :class="getStatusClass(purchase)"
                    >
                      {{ getStatusText(purchase) }}
                    </span>
                  </div>
                </div>

                <!-- Cancelación reason if applicable -->
                <div 
                  v-if="purchase.status === 'cancelled' && purchase.cancellation_reason" 
                  class="text-xs text-gray-500 mt-2"
                >
                  Motivo de cancelación: {{ purchase.cancellation_reason }}
                </div>

                <!-- Days to closing for pending purchases -->
                <div 
                  v-if="isPending(purchase) && purchase.closing_date" 
                  class="mt-3 text-sm font-medium"
                  :class="getClosingDaysLeftClass(purchase)"
                >
                  {{ getClosingDaysLeftText(purchase) }}
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
    </div>

    <!-- Modal de confirmación para cancelar compra -->
    <div v-if="purchaseToCancel" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-red-600 mb-4">¿Está seguro?</h3>
        <p class="text-gray-700 mb-4">Esta acción cancelará su compra de "{{ purchaseToCancel.property?.title || 'esta propiedad' }}". ¿Desea continuar?</p>
        <div class="flex justify-end space-x-3">
          <button @click="purchaseToCancel = null" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
            Regresar
          </button>
          <button @click="cancelPurchase(purchaseToCancel.id)" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Cancelar Compra
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para completar compra -->
    <div v-if="purchaseToComplete" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-green-600 mb-4">Completar Compra</h3>
        <p class="text-gray-700 mb-4">Al completar esta compra, se generará un contrato para "{{ purchaseToComplete.property?.title || 'esta propiedad' }}" y su estado cambiará a "Completada". ¿Desea continuar?</p>
        <div class="flex justify-end space-x-3">
          <button @click="purchaseToComplete = null" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
            Cancelar
          </button>
          <button @click="completePurchase(purchaseToComplete.id)" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Completar Compra
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación para cancelar todas las compras -->
    <div v-if="showDeleteAllModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-red-600 mb-4">¿Está seguro?</h3>
        <p class="text-gray-700 mb-6">Esta acción cancelará todas sus compras {{ tabText }} y no se puede deshacer.</p>
        <div class="flex justify-end space-x-3">
          <button @click="showDeleteAllModal = false" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
            Cancelar
          </button>
          <button @click="cancelAllPurchases" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Cancelar todas
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para ver contrato/escritura de la propiedad -->
    <div v-if="showContractModalId" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold text-navy">Escritura de Propiedad</h3>
          <button @click="showContractModalId = null" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="contractPurchase" class="border border-gray-200 rounded-lg p-4 mb-4">
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Compra #:</span>
            <span class="font-medium">{{ contractPurchase.id }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Propiedad:</span>
            <span class="font-medium">{{ contractPurchase.property?.title || 'Propiedad' }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Fecha de compra:</span>
            <span class="font-medium">{{ formatDate(contractPurchase.created_at) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Comprador:</span>
            <span class="font-medium">{{ contractPurchase.guest_name }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Estado:</span>
            <span class="font-medium">{{ getStatusText(contractPurchase) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Método de pago:</span>
            <span class="font-medium">{{ formatPaymentMethod(contractPurchase.payment_method) }}</span>
          </div>
          
          <!-- Sección de detalles de propiedad -->
          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="mb-2 font-medium text-navy">Detalles de la Propiedad:</div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Dirección:</span>
              <span class="font-medium">{{ contractPurchase.property?.address || 'No disponible' }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Ciudad:</span>
              <span class="font-medium">{{ contractPurchase.property?.city || 'No disponible' }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Área:</span>
              <span class="font-medium">{{ contractPurchase.property?.square_feet || 'No disponible' }} m²</span>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-2 mt-2">
            <div class="flex justify-between font-bold">
              <span>Precio total:</span>
              <span>L {{ formatPrice(contractPurchase.total_price) }}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button @click="downloadContract" class="px-4 py-2 bg-navy text-white rounded hover:bg-blue-800 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar PDF
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
import axios from '~/src/config/axios';

// Router
const router = useRouter();

// Estado del usuario
const user = ref({
  id: null,
  first_name: 'Daniel',
  last_name: 'Jones',
  email: 'daniel.jones@email.com',
  phone: '31553157',
  profile_image: ''
});

// Estado de las compras
const purchases = ref([]);
const activeTab = ref('pending'); // Cambio a 'pending' para mostrar pendientes primero
const isLoading = ref(true);
const isLoadingPurchases = ref(true);
const activeDropdown = ref(null);
const dropdownRef = ref(null);
const purchaseToCancel = ref(null);
const purchaseToComplete = ref(null); // Nuevo: compra para completar
const showDeleteAllModal = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = ref(10);
const showContractModalId = ref(null);
const contractPurchase = ref(null);

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
  if (activeTab.value === 'pending') {
    return 'pendientes';
  } else if (activeTab.value === 'completed') {
    return 'completadas';
  } else if (activeTab.value === 'cancelled') {
    return 'canceladas';
  }
  return '';
});

// Navegar a los detalles de la propiedad
const navigateToPropertyDetails = (propertyId) => {
  router.push(`/properties/${propertyId}`);
};

// Redirigir a la página de búsqueda
const redirectToSearch = () => {
  router.push('/properties/sale');
};

// Formatear método de pago
const formatPaymentMethod = (method) => {
  const methods = {
    'credit_card': 'Tarjeta de crédito',
    'debit_card': 'Tarjeta de débito',
    'bank_transfer': 'Transferencia bancaria',
    'cash': 'Efectivo',
    'paypal': 'PayPal'
  };
  
  return methods[method] || method || 'No especificado';
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
    day: 'numeric'
  };
  
  return date.toLocaleDateString('es-ES', options);
};

// Ver detalles de la propiedad
const viewPropertyDetails = (propertyId) => {
  if (!propertyId) {
    showNotification('error', 'Error', 'No se encontró el ID de la propiedad');
    return;
  }
  
  // Navegar a la página de detalles de la propiedad
  router.push(`/properties/${propertyId}`);
  activeDropdown.value = null;
};

// Verificar si una compra está pendiente
const isPending = (purchase) => {
  return purchase.status === 'pending' || purchase.status === 'confirmed';
};

// Obtener clase CSS según el estado de la compra
const getStatusClass = (purchase) => {
  if (purchase.status === 'cancelled') {
    return 'text-red-600';
  } else if (purchase.status === 'completed') {
    return 'text-green-600';
  } else if (purchase.status === 'confirmed') {
    return 'text-blue-600';
  } else {
    return 'text-orange-600';
  }
};

// Obtener texto según el estado de la compra
const getStatusText = (purchase) => {
  if (purchase.status === 'cancelled') {
    return 'Cancelada';
  } else if (purchase.status === 'completed') {
    return 'Completada';
  } else if (purchase.status === 'confirmed') {
    return 'Confirmada';
  } else {
    return 'Pendiente';
  }
};

// Obtener clase CSS para días restantes hasta el cierre
const getClosingDaysLeftClass = (purchase) => {
  const days = getClosingDaysLeft(purchase);
  
  if (days <= 3) {
    return 'text-red-600';
  } else if (days <= 7) {
    return 'text-orange-600';
  } else {
    return 'text-green-600';
  }
};

// Obtener los días restantes hasta el cierre
const getClosingDaysLeft = (purchase) => {
  if (!purchase.closing_date) return 0;
  
  const today = new Date();
  const closingDate = new Date(purchase.closing_date);
  const diffTime = Math.abs(closingDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Obtener texto de días restantes hasta el cierre
const getClosingDaysLeftText = (purchase) => {
  const days = getClosingDaysLeft(purchase);
  
  if (days === 0) {
    return '¡Hoy es la firma!';
  } else if (days === 1) {
    return '¡Mañana es la firma!';
  } else {
    return `Faltan ${days} días para la firma`;
  }
};

// Verificar si se puede cancelar una compra
const canCancelPurchase = (purchase) => {
  // Si la compra ya está cancelada o completada, no se puede cancelar
  if (purchase.status === 'cancelled' || purchase.status === 'completed') {
    return false;
  }
  
  // En todos los demás casos (pending o confirmed), se puede cancelar
  return true;
};

// Toggle dropdown menu for purchase actions
const toggleDropdown = (purchaseId) => {
  if (activeDropdown.value === purchaseId) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = purchaseId;
  }
};

// Handle click outside to close dropdown
const handleClickOutside = (event) => {
  if (!dropdownRef.value) return;
  
  if (!Array.isArray(dropdownRef.value)) {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      activeDropdown.value = null;
    }
  } else {
    const clickedOutside = !dropdownRef.value.some(
      ref => ref && ref.contains && ref.contains(event.target)
    );
    
    if (clickedOutside) {
      activeDropdown.value = null;
    }
  }
};

// Función mejorada para formatear precios
const formatPrice = (price) => {
  if (price === undefined || price === null) return '0';
  
  // Convertir a número y redondear
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) return '0';
  
  // Formatear con separadores de miles
  return numericPrice.toLocaleString('es-HN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

// Confirmar cancelación de compra
const confirmCancelPurchase = (purchase) => {
  purchaseToCancel.value = purchase;
  activeDropdown.value = null;
};

// Mostrar modal para completar compra
const showCompleteModal = (purchaseId) => {
  const purchase = purchases.value.find(p => p.id === purchaseId);
  if (purchase) {
    purchaseToComplete.value = purchase;
  }
  activeDropdown.value = null;
};

// Función para completar una compra 
const completePurchase = async (purchaseId) => {
  try {
    showNotification('info', 'Procesando', 'Completando compra...');
    
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }
    
    // Actualizar el estado de la compra a "completed"
    const response = await axios.put(`/api/bookings/${purchaseId}/status`, {
      status: 'completed'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      const purchaseIndex = purchases.value.findIndex(p => p.id === purchaseId);
      if (purchaseIndex !== -1) {
        purchases.value[purchaseIndex].status = 'completed';
      }
      
      showNotification('success', 'Éxito', 'Compra completada correctamente');
      
      // Recargar las compras para datos actualizados
      loadPurchases();
      
      // Mostrar modal de contrato
      showContractModal(purchaseId);
    } else {
      throw new Error('No se pudo completar la compra');
    }
  } catch (error) {
    console.error('Error completando la compra:', error);
    
    // Mostrar el mensaje de error del servidor si está disponible
    if (error.response && error.response.data && error.response.data.message) {
      showNotification('error', 'Error', error.response.data.message);
    } else {
      showNotification('error', 'Error', 'No se pudo completar la compra');
    }
  } finally {
    purchaseToComplete.value = null;
  }
};

// Cancelar una compra
const cancelPurchase = async (purchaseId) => {
  try {
    showNotification('info', 'Procesando', 'Cancelando compra...');
    
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }
    
    // Usar la misma ruta que tu API para cancelaciones
    const response = await axios.patch(`/api/bookings/${purchaseId}/cancel`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      const purchaseIndex = purchases.value.findIndex(p => p.id === purchaseId);
      if (purchaseIndex !== -1) {
        purchases.value[purchaseIndex].status = 'cancelled';
        purchases.value[purchaseIndex].cancellation_reason = 'Cancelada por el usuario';
      }
      
      showNotification('success', 'Éxito', 'Compra cancelada correctamente');
      
      // Recargar las compras para datos actualizados
      loadPurchases();
    } else {
      throw new Error('No se pudo cancelar la compra');
    }
  } catch (error) {
    console.error('Error cancelando la compra:', error);
    
    // Mostrar el mensaje de error del servidor si está disponible
    if (error.response && error.response.data && error.response.data.message) {
      showNotification('error', 'Error', error.response.data.message);
    } else {
      showNotification('error', 'Error', 'No se pudo cancelar la compra');
    }
  } finally {
    purchaseToCancel.value = null;
  }
};

// Cancelar todas las compras
const cancelAllPurchases = async () => {
  try {
    // Mostrar mensaje de carga
    showNotification('info', 'Procesando', 'Cancelando compras...');
    
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }
    
    // Obtener IDs de las compras que se pueden cancelar
    const purchasesToCancel = filteredPurchases.value
      .filter(p => canCancelPurchase(p))
      .map(p => p.id);
    
    if (purchasesToCancel.length === 0) {
      showNotification('error', 'Error', 'No hay compras que se puedan cancelar');
      showDeleteAllModal.value = false;
      return;
    }
    
    // Petición a la API para cancelar todas las compras
    const response = await axios.post('/api/bookings/batch-cancel', {
      bookingIds: purchasesToCancel
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      showNotification('success', 'Éxito', `${purchasesToCancel.length} compras canceladas correctamente`);
      
      // Recargar las compras para asegurar datos actualizados
      loadPurchases();
    } else {
      throw new Error('No se pudieron cancelar las compras');
    }
    
  } catch (error) {
    console.error('Error en cancelación masiva de compras:', error);
    
    showNotification('error', 'Error', 'No se pudieron cancelar las compras');
  } finally {
    showDeleteAllModal.value = false;
  }
};

// Mostrar modal del contrato/escritura
const showContractModal = async (purchaseId) => {
  try {
    const purchase = purchases.value.find(p => p.id === purchaseId);
    
    if (purchase) {
      // Cargar detalles completos de la propiedad antes de mostrar el contrato
      contractPurchase.value = await loadPropertyDetailsForPurchase({...purchase});
      showContractModalId.value = purchaseId;
    } else {
      showNotification('error', 'Error', 'No se encontró la compra');
    }
    
    activeDropdown.value = null;
  } catch (error) {
    console.error('Error al mostrar el contrato:', error);
    showNotification('error', 'Error', 'No se pudo cargar el contrato');
  }
};

// Hook para obtener información completa de la propiedad
const loadPropertyDetailsForPurchase = async (purchase) => {
  if (!purchase || !purchase.property_id) {
    console.warn('No se puede cargar detalles de la propiedad: falta property_id');
    return purchase;
  }
  
  try {
    console.log(`Obteniendo detalles completos para la propiedad #${purchase.property_id}`);
    
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.warn('No se encontró token para obtener detalles de la propiedad');
      return purchase;
    }
    
    // Solicitar detalles completos de la propiedad
    const response = await axios.get(`/api/properties/${purchase.property_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      // Asignar la propiedad completa a la compra
      purchase.property = response.data.data;
      
      console.log('Propiedad cargada correctamente:', purchase.property);
    }
    
    return purchase;
  } catch (error) {
    console.error('Error cargando detalles de la propiedad:', error);
    return purchase;
  }
};

// Función para generar y descargar el contrato de compra como PDF
const downloadContract = async () => {
  if (!contractPurchase.value) return;

  try {
    showNotification('info', 'Procesando', 'Generando PDF...');
    
    // Crear una fecha formateada para el documento
    const currentDate = new Date().toLocaleDateString('es-ES', {
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
    
    // Crear contenido HTML para la escritura/contrato
    const contractHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Escritura de Propiedad #${contractPurchase.value.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
            line-height: 1.6;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #0a3364;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .header h2 {
            color: #666;
            font-size: 18px;
            font-weight: normal;
            margin-top: 0;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #0a3364;
            margin: 20px 0 10px 0;
            padding-bottom: 5px;
            border-bottom: 1px solid #ddd;
          }
          .legal-text {
            margin: 20px 0;
            text-align: justify;
          }
          .signature-area {
            margin-top: 50px;
            display: flex;
            justify-content: space-between;
          }
          .signature {
            width: 45%;
            text-align: center;
          }
          .signature-line {
            border-top: 1px solid #000;
            margin-top: 50px;
            padding-top: 10px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 0.9em}
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ESCRITURA DE COMPRAVENTA DE BIEN INMUEBLE</h1>
            <h2>OASIS REAL ESTATE</h2>
          </div>
          
          <div class="legal-text">
            En la ciudad de ${contractPurchase.value.property?.city || 'Tegucigalpa'}, Honduras, a los ${new Date().getDate()} días del mes de ${new Date().toLocaleString('es-ES', {month: 'long'})} del año ${new Date().getFullYear()}, comparecen:
          </div>

          <div class="section-title">IDENTIFICACIÓN DE LAS PARTES</div>
          
          <div class="legal-text">
            <strong>VENDEDOR:</strong> OASIS REAL ESTATE S.A., con RTN No. 08019999123456, representada por su Gerente General, debidamente autorizado mediante Testimonio de Escritura Pública otorgada ante el Notario Luis Martínez, e inscrita en el Registro Mercantil bajo el asiento 12345, folio 678, tomo 91011, en adelante "EL VENDEDOR".
          </div>
          
          <div class="legal-text">
            <strong>COMPRADOR:</strong> ${contractPurchase.value.guest_name}, mayor de edad, con tarjeta de identidad/pasaporte número [NÚMERO], de nacionalidad hondureña, de este domicilio, en adelante "EL COMPRADOR".
          </div>

          <div class="section-title">OBJETO DEL CONTRATO</div>
          
          <div class="legal-text">
            EL VENDEDOR transfiere a favor de EL COMPRADOR el pleno dominio, posesión y demás derechos que le corresponden sobre el bien inmueble que a continuación se describe:
          </div>
          
          <div class="legal-text">
            <strong>DESCRIPCIÓN DEL INMUEBLE:</strong> ${contractPurchase.value.property?.title || 'Propiedad'}, ubicado en ${contractPurchase.value.property?.address || 'dirección no disponible'}, ${contractPurchase.value.property?.city || 'ciudad no especificada'}, con un área de ${contractPurchase.value.property?.square_feet || 'área no especificada'} metros cuadrados.
          </div>

          <div class="section-title">PRECIO Y FORMA DE PAGO</div>
          
          <div class="legal-text">
            El precio pactado por la compraventa del inmueble es de L ${formatPrice(contractPurchase.value.total_price)} (${numeroALetras(contractPurchase.value.total_price)} LEMPIRAS EXACTOS), que EL COMPRADOR ha pagado en su totalidad a EL VENDEDOR, quien por este medio otorga formal recibo y finiquito.
          </div>

          <div class="section-title">DECLARACIONES Y GARANTÍAS</div>
          
          <div class="legal-text">
            EL VENDEDOR declara y garantiza que el inmueble objeto de este contrato se encuentra libre de gravámenes, hipotecas, embargos, anotaciones, limitaciones de dominio y condiciones resolutorias, y que se encuentra al día en el pago de impuestos, tasas y contribuciones.
          </div>

          <div class="section-title">GASTOS E IMPUESTOS</div>
          
          <div class="legal-text">
            Los gastos notariales, registrales e impuestos que genere esta escritura serán por cuenta de EL COMPRADOR.
          </div>

          <div class="signature-area">
            <div class="signature">
              <div class="signature-line">EL VENDEDOR</div>
              <div>OASIS REAL ESTATE S.A.</div>
              <div>RTN No. 08019999123456</div>
            </div>
            <div class="signature">
              <div class="signature-line">EL COMPRADOR</div>
              <div>${contractPurchase.value.guest_name}</div>
              <div>Identidad/Pasaporte: [NÚMERO]</div>
            </div>
          </div>

          <div class="footer">
            <p>Fecha de emisión: ${currentDate}</p>
            <p>OASIS REAL ESTATE | La mejor opción en bienes raíces</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // Función auxiliar para convertir números a letras (simplificada)
    function numeroALetras(numero) {
      const unidades = ['', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
      const decenas = ['', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
      const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
      
      // Función simplificada para ejemplificar
      if (numero < 10) return unidades[numero];
      if (numero < 100) return decenas[Math.floor(numero/10)];
      if (numero < 1000) return centenas[Math.floor(numero/100)];
      if (numero < 1000000) return 'MIL';
      return 'MILLONES';
    }
    
    // Crear un nuevo documento HTML y abrirlo para impresión
    const blob = new Blob([contractHTML], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl, '_blank');
    
    if (printWindow) {
      printWindow.onload = function() {
        // Dar tiempo para que el documento se renderice completamente
        setTimeout(() => {
          try {
            // Forzar título correcto
            printWindow.document.title = `Escritura de Propiedad #${contractPurchase.value.id}`;
            printWindow.print();
            showNotification('success', 'Escritura lista', 'Por favor seleccione "Guardar como PDF" en el diálogo de impresión.');
          } catch (printError) {
            console.error('Error durante la impresión:', printError);
            showNotification('error', 'Error', 'Ocurrió un problema al generar el PDF.');
          }
        }, 1000);
      };
      
      // Asegurar que la ventana de impresión tenga el foco
      setTimeout(() => {
        if (printWindow && !printWindow.closed) {
          printWindow.focus();
        }
      }, 500);
    } else {
      // Alternativa si la ventana de impresión es bloqueada
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `Escritura-Propiedad-${contractPurchase.value.id}.html`;
      link.click();
      
      URL.revokeObjectURL(blobUrl);
      showNotification('info', 'Escritura HTML descargada', 'Abra el archivo HTML y use la función de imprimir del navegador para crear el PDF.');
    }
    
  } catch (error) {
    console.error('Error al generar la escritura:', error);
    showNotification('error', 'Error', 'No se pudo generar la escritura. Por favor, intente nuevamente.');
  }
};

// Computed property para filtrar compras según la pestaña seleccionada
const filteredPurchases = computed(() => {
  if (activeTab.value === 'pending') {
    // Pendientes y confirmadas
    return purchases.value.filter(p => p.status === 'pending' || p.status === 'confirmed');
  } else if (activeTab.value === 'completed') {
    // Completadas
    return purchases.value.filter(p => p.status === 'completed');
  } else if (activeTab.value === 'cancelled') {
    // Canceladas
    return purchases.value.filter(p => p.status === 'cancelled');
  }
  
  // Si no hay filtro, devolver todas
  return purchases.value;
});

// Cambiar página
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    loadPurchases();
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
  
  // Solo cargar compras si tenemos datos de usuario
  if (user.value && user.value.id) {
    loadPurchases();
  }
});

// Cargar datos del usuario
const loadUserData = async () => {
  try {
    isLoading.value = true;
    
    console.log("Iniciando carga de datos del usuario...");
    
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      router.push('/auth/login');
      return;
    }
    
    // Conectar con la API
    console.log("Enviando solicitud a la API para obtener perfil de usuario");
    const response = await axios.get('/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log("Respuesta de la API de usuario:", response);
    
    if (response.data && response.data.success) {
      // Asignar datos del usuario
      user.value = response.data.data.user || {};
      console.log("Datos de usuario cargados correctamente:", user.value);
      
      // Si no hay ID de usuario, mostrar error
      if (!user.value.id) {
        console.error("El usuario no tiene ID");
        showNotification('error', 'Error', 'Datos de usuario incompletos');
      }
    } else {
      throw new Error('No se pudieron obtener los datos del usuario');
    }
  } catch (error) {
    console.error('Error cargando datos del usuario:', error);
    
    showNotification('error', 'Error', 'No se pudieron cargar los datos del usuario');
    
    // Si es error de autenticación, redirigir al login
    if (error.response && error.response.status === 401) {
      router.push('/auth/login');
    }
  } finally {
    isLoading.value = false;
  }
};

// Cargar compras desde la API - Filtrar para mostrar solo propiedades de venta
const loadPurchases = async () => {
  try {
    isLoadingPurchases.value = true;
    
    console.log("Iniciando carga de compras...");
    
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      showNotification('error', 'Error de autenticación', 'Por favor, inicie sesión nuevamente');
      return;
    }
    
    if (!user.value || !user.value.id) {
      console.error('No hay datos de usuario para cargar compras');
      showNotification('error', 'Error', 'No se pudieron cargar los datos del usuario');
      return;
    }
    
    console.log("Cargando compras para usuario ID:", user.value.id);
    
    // Construir parámetros según el activeTab
    const params = {};
    
    // Aplicar filtros según la pestaña activa
    if (activeTab.value === 'pending') {
      params.status = ['pending', 'confirmed'];
    } else if (activeTab.value === 'completed') {
      params.status = ['completed'];
    } else if (activeTab.value === 'cancelled') {
      params.status = ['cancelled'];
    }
    
    params.page = currentPage.value;
    params.limit = itemsPerPage.value;
    params.user_id = user.value.id;
    
    // IMPORTANTE: Marcar que queremos solo compras (propiedades for-sale)
    params.is_purchase = true;
    
    console.log("Parámetros de búsqueda para compras:", params);
    
    // Hacer la solicitud a la API
    const response = await axios.get('/api/bookings', {
      params,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log("Respuesta completa de la API de compras:", response);
    
    if (response.data && response.data.success) {
      console.log("Compras recibidas:", response.data.data);
      purchases.value = response.data.data.bookings || [];
      totalPages.value = response.data.data.totalPages || 1;
      
      console.log(`Se cargaron ${purchases.value.length} compras`);
      
      // Validación adicional: filtrar solo propiedades de venta
      purchases.value = purchases.value.filter(purchase => 
        purchase.property && purchase.property.status === 'for-sale'
      );
      
      // Cargar datos de propiedades para las compras
      if (purchases.value.length > 0) {
        await loadPropertyDetailsForPurchases(purchases.value);
      }
    } else {
      throw new Error('No se pudieron obtener las compras');
    }
  } catch (error) {
    console.error('Error cargando compras:', error);
    
    // Inicializar con array vacío
    purchases.value = [];
    totalPages.value = 1;
    
    showNotification('error', 'Error', 'No se pudieron cargar las compras');
  } finally {
    isLoadingPurchases.value = false;
  }
};

// Función para cargar detalles de propiedades para las compras
const loadPropertyDetailsForPurchases = async (purchasesData) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) return;
  
  console.log("Cargando detalles de propiedades para las compras...");
  
  for (const purchase of purchasesData) {
    if (!purchase.property && purchase.property_id) {
      try {
        console.log(`Cargando detalles para propiedad ID: ${purchase.property_id}`);
        
        const propertyResponse = await axios.get(`/api/properties/${purchase.property_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (propertyResponse.data && propertyResponse.data.success) {
          purchase.property = propertyResponse.data.data;
          console.log(`Propiedad ${purchase.property_id} cargada correctamente`);
        }
      } catch (propError) {
        console.error(`Error cargando detalles de la propiedad ID ${purchase.property_id}:`, propError);
      }
    }
  }
};

// Redirigir a añadir propiedad
const redirectToAddProperty = () => {
  router.push('/properties/create');
};

// Al montar el componente
onMounted(async () => {
  document.addEventListener('click', handleClickOutside);
  
  // Verificar si hay un token
  const token = localStorage.getItem('access_token');
  if (!token) {
    router.push('/auth/login');
    return;
  }
  
  // Cargar datos de usuario primero
  await loadUserData();
  
  // Solo cargar compras si tenemos datos de usuario
  if (user.value && user.value.id) {
    await loadPurchases();
  } else {
    console.error('No se pudieron cargar las compras porque faltan datos de usuario');
  }
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