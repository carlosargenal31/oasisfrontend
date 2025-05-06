<template>
  <div class="bg-white min-h-screen">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange mx-auto mb-4"></div>
        <p class="text-lg font-medium text-gray-700">Cargando reservas...</p>
      </div>
    </div>

    <!-- Encabezado principal con navegación (simplificado) -->
    <header class="bg-white border-b border-gray-200 py-4">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <div class="flex items-center">
          <div class="text-2xl font-bold text-orange-500">OASIS</div>
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
          <button class="bg-orange text-white px-4 py-2 rounded-md flex items-center" @click="redirectToAddProperty">
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
      <div class="flex items-center text-orange-500 text-sm">
        <a href="/" class="hover:text-orange">Inicio</a>
        <span class="mx-2">/</span>
        <span class="text-gray-800">Mis Reservas</span>
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
              class="w-full bg-orange text-white py-2 rounded flex justify-center items-center"
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
              
              <a href="/account/bookings" class="flex items-center px-4 py-3 border-l-4 border-orange bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-orange font-medium">Mis Reservas</span>
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
            <h1 class="text-2xl font-bold text-black">Mis Reservas</h1>
            <button 
              v-if="bookings.length > 0"
              @click="showDeleteAllModal = true" 
              class="text-red-500 hover:text-red-600 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Cancelar todas
            </button>
          </div>
          
          <p class="text-gray-600 mb-6">Aquí puede ver sus reservas y gestionarlas fácilmente.</p>
          
          <!-- Pestañas de navegación -->
          <div class="mb-6">
            <div class="border-b border-gray-200">
              <nav class="flex -mb-px">
                <button 
                  @click="activeTab = 'upcoming'" 
                  class="px-4 py-2 border-b-2 font-medium text-sm leading-5 focus:outline-none mr-8"
                  :class="activeTab === 'upcoming' ? 'border-orange text-orange' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" :class="activeTab === 'upcoming' ? 'text-orange' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Próximas
                </button>
                <button 
                  @click="activeTab = 'completed'" 
                  class="px-4 py-2 border-b-2 font-medium text-sm leading-5 focus:outline-none mr-8"
                  :class="activeTab === 'completed' ? 'border-orange text-orange' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" :class="activeTab === 'completed' ? 'text-orange' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Completadas
                </button>
                <button 
                  @click="activeTab = 'cancelled'" 
                  class="px-4 py-2 border-b-2 font-medium text-sm leading-5 focus:outline-none"
                  :class="activeTab === 'cancelled' ? 'border-orange text-orange' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" :class="activeTab === 'cancelled' ? 'text-orange' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Canceladas
                </button>
              </nav>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="isLoadingBookings" class="flex justify-center py-10">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
          </div>

          <!-- No bookings state -->
          <div v-else-if="filteredBookings.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No hay reservas {{ tabText }}</h3>
            <p class="text-gray-600 mb-4">Realice una reserva para una propiedad para que aparezca aquí.</p>
            <button @click="redirectToSearch" class="bg-orange text-white py-2 px-4 rounded-md hover:bg-orange-dark transition flex items-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar propiedades
            </button>
          </div>

          <!-- Bookings list -->
          <div v-else class="space-y-4">
            <div 
              v-for="booking in filteredBookings" 
              :key="booking.id" 
              class="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-200 overflow-hidden flex flex-col md:flex-row"
            >
              <!-- Property image -->
              <div class="md:w-1/3 relative">
                <img 
                  :src="booking.property?.image || '/img/property-placeholder.jpg'" 
                  alt="Imagen de propiedad" 
                  class="w-full h-full object-cover md:h-auto" 
                  style="min-height: 200px;"
                >
                <!-- Status badges -->
                <div class="absolute top-2 left-2">
                  <span 
                    v-if="isUpcoming(booking)" 
                    class="bg-orange-500 text-white text-xs px-2 py-1 rounded mb-1 inline-block"
                  >
                    Próxima
                  </span>
                </div>
              </div>
              
              <!-- Booking details -->
              <div class="p-4 md:p-6 flex-1 relative">
                <!-- Booking dropdown menu -->
                <div class="absolute top-4 right-4">
                  <div class="relative" ref="dropdownRef">
                    <button 
                      @click="toggleDropdown(booking.id)" 
                      class="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                    
                    <!-- Dropdown menu con opciones según el estado de la reserva -->
<div 
v-if="activeDropdown === booking.id"
class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200"
>
<!-- Ver detalles - disponible para todas las reservas -->
<button 
  @click="viewPropertyDetails(booking.property_id)" 
  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
  Ver detalles
</button>

<!-- Ver recibo - disponible para reservas pendientes, confirmadas o completadas, pero no canceladas -->
<button 
  v-if="booking.status !== 'cancelled'"
  @click="showReceiptModal(booking.id)" 
  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
  Ver recibo
</button>

<!-- Hacer reseña - solo para reservas completadas -->


<!-- Cancelar reserva - solo para reservas pendientes o confirmadas -->
<button 
  v-if="canCancelBooking(booking)"
  @click="confirmCancelBooking(booking)" 
  class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  Cancelar reserva
</button>
</div>
                  </div>
                </div>
                
                <!-- Property type label -->
                <div class="mb-1 uppercase text-sm font-medium" :class="getStatusClass(booking)">
                  {{ getStatusText(booking) }}
                </div>
                
                <h3 
                  @click="navigateToPropertyDetails(booking.property_id)" 
                  class="text-lg font-semibold text-black mb-1 cursor-pointer hover:text-orange-800"
                >
                  {{ booking.property?.title || 'Propiedad' }}
                </h3>
                
                <!-- Property address -->
                <p class="text-gray-600 text-sm mb-3">{{ booking.property?.address || 'Dirección no disponible' }}</p>
                
                <!-- Booking price -->
                <div class="text-xl font-bold text-black mb-4">
                  <span class="mr-1">L</span> {{ formatPrice(booking.total_price) }}
                  <span v-if="booking.property?.status === 'for-rent'" class="text-sm text-gray-500 ml-1">total</span>
                </div>

                <!-- Booking dates -->
                <div class="flex items-center text-sm text-gray-600 mb-4">
                  <div class="flex items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ formatDateRange(booking.check_in_date, booking.check_out_date) }}
                  </div>
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {{ booking.guests }} huéspedes
                  </div>
                </div>

                <!-- Status badges mejorado para no mostrar "Pendiente de pago" -->
<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
<div class="flex items-center text-sm text-gray-600 mb-2 sm:mb-0">
  <span class="text-gray-600">Reserva #{{ booking.id }}</span>
</div>
<div>
  <!-- Mostrar el estado de la reserva, pero no mostrar "Pendiente de pago" -->
  <span 
    v-if="booking.status !== 'pending'"
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
    :class="getStatusClass(booking)"
  >
    {{ getStatusText(booking) }}
  </span>
</div>
</div>

                <!-- Cancelación reason if applicable -->
                <div 
                  v-if="booking.status === 'cancelled' && booking.cancellation_reason" 
                  class="text-xs text-gray-500 mt-2"
                >
                  Motivo de cancelación: {{ booking.cancellation_reason }}
                </div>

                <!-- Countdown to check-in for upcoming bookings -->
                <div 
                  v-if="isUpcoming(booking)" 
                  class="mt-3 text-sm font-medium"
                  :class="getDaysLeftClass(booking)"
                >
                  {{ getDaysLeftText(booking) }}
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

<!-- Modal de confirmación para cancelar reserva -->
<div v-if="bookingToCancel" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
<h3 class="text-xl font-bold text-red-600 mb-4">¿Está seguro?</h3>
<p class="text-gray-700 mb-4">Esta acción cancelará su reserva para "{{ bookingToCancel.property?.title || 'esta propiedad' }}". ¿Desea continuar?</p>
<div class="flex justify-end space-x-3">
<button @click="bookingToCancel = null" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
  Regresar
</button>
<button @click="cancelBooking(bookingToCancel.id)" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
  Cancelar Reserva
</button>
</div>
</div>
</div>

<!-- Modal de confirmación para cancelar todas las reservas -->
<div v-if="showDeleteAllModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
<div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
<h3 class="text-xl font-bold text-red-600 mb-4">¿Está seguro?</h3>
<p class="text-gray-700 mb-6">Esta acción cancelará todas sus reservas {{ tabText }} y no se puede deshacer.</p>
<div class="flex justify-end space-x-3">
<button @click="showDeleteAllModal = false" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
  Cancelar
</button>
<button @click="cancelAllBookings" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
  Cancelar todas
</button>
</div>
</div>
</div>

<!-- Modal para ver recibo de reserva con precio mensual directo -->
<div v-if="showReceiptModalId" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-xl font-bold text-orange">Recibo de Reserva</h3>
      <button @click="showReceiptModalId = null" class="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div v-if="receiptBooking" class="border border-gray-200 rounded-lg p-4 mb-4">
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Reserva #:</span>
        <span class="font-medium">{{ receiptBooking.id }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Propiedad:</span>
        <span class="font-medium">{{ receiptBooking.property?.title || 'Propiedad' }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Fechas:</span>
        <span class="font-medium">{{ formatDateRange(receiptBooking.check_in_date, receiptBooking.check_out_date) }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Huéspedes:</span>
        <span class="font-medium">{{ receiptBooking.guests }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Estado:</span>
        <span class="font-medium">{{ getStatusText(receiptBooking) }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Método de pago:</span>
        <span class="font-medium">Tarjeta de crédito</span>
      </div>
      <div class="flex justify-between mb-2">
        <span class="text-gray-600">Estado de pago:</span>
        <span class="font-medium">{{ receiptBooking.status === 'completed' ? 'Pagado' : 'Confirmado' }}</span>
      </div>
      
      <!-- Sección de detalles de pago -->
      <div class="mt-4 pt-4 border-t border-gray-200">
        <div class="mb-2 font-medium text-orange">Detalles de Pago:</div>
        
        <!-- Si la reserva está completada, mostrar que está pagada en su totalidad -->
        <template v-if="receiptBooking.status === 'completed'">
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Total pagado:</span>
            <span class="font-medium">L {{ formatPrice(receiptBooking.total_price) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Saldo pendiente:</span>
            <span class="font-medium">L 0</span>
          </div>
        </template>
        
        <!-- Si la reserva no está completada, mostrar desglose de pagos -->
        <template v-else>
          <!-- Obtener precio mensual del precio por noche o propiedad.pricePerMonth -->
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Pago inicial (primer mes):</span>
            <span class="font-medium">L {{ formatPrice(getPropertyMonthlyPrice(receiptBooking)) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Depósito de seguridad:</span>
            <span class="font-medium">L {{ formatPrice(getPropertyMonthlyPrice(receiptBooking)) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Total pagado:</span>
            <span class="font-medium">L {{ formatPrice(getPropertyMonthlyPrice(receiptBooking) * 2) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Saldo pendiente:</span>
            <span class="font-medium">L {{ formatPrice(receiptBooking.total_price - (getPropertyMonthlyPrice(receiptBooking) * 2)) }}</span>
          </div>
        </template>
      </div>

      <div class="border-t border-gray-200 pt-2 mt-2">
        <div class="flex justify-between font-bold">
          <span>Total del contrato:</span>
          <span>L {{ formatPrice(receiptBooking.total_price) }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end space-x-3">
      <button @click="downloadReceipt" class="px-4 py-2 bg-orange text-white rounded hover:bg-orange-800 transition">
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
:class="{'bg-green-50': notification.type === 'success', 'bg-red-50': notification.type === 'error', 'bg-orange-50': notification.type === 'info'}"
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
<div v-if="notification.type === 'info'" class="text-orange-500 mr-3">
<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</div>
<div>
<div class="font-medium" 
:class="{
  'text-green-800': notification.type === 'success', 
  'text-red-800': notification.type === 'error',
  'text-orange-800': notification.type === 'info'
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
// Por esto (ajusta la ruta según tu estructura):
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

// Estado de las reservas
const bookings = ref([]);
const activeTab = ref('upcoming');
const isLoading = ref(true);
const isLoadingBookings = ref(true);
const activeDropdown = ref(null);
const dropdownRef = ref(null);
const bookingToCancel = ref(null);
const showDeleteAllModal = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = ref(10);
const showReceiptModalId = ref(null);
const receiptBooking = ref(null);

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
  if (activeTab.value === 'upcoming') {
    return 'próximas';
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
  router.push('/properties/rent');
};

// Función para calcular el precio mensual basado en el total y la duración
const getMonthlyPrice = (booking) => {
  if (!booking) return 0;
  
  try {
    // Calcular la duración del contrato en meses
    const checkInDate = new Date(booking.check_in_date);
    const checkOutDate = new Date(booking.check_out_date);
    
    // Si las fechas no son válidas, usar un valor por defecto
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      console.warn('Fechas de reserva inválidas, usando precio dividido por 6 meses');
      return Math.round(booking.total_price / 6);
    }
    
    // Calcular número de meses (redondeando hacia arriba)
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.ceil(diffDays / 30); // Considerando 30 días por mes
    
    if (months <= 0) {
      console.warn('Duración calculada inválida, usando precio dividido por 6 meses');
      return Math.round(booking.total_price / 6);
    }
    
    // Calcular precio mensual
    return Math.round(booking.total_price / months);
  } catch (error) {
    console.error('Error calculando precio mensual:', error);
    return Math.round(booking.total_price / 6); // Valor por defecto
  }
};

// Función para obtener el precio mensual de la propiedad
const getPropertyMonthlyPrice = (booking) => {
  if (!booking) return 0;
  
  // Si la propiedad tiene un precio mensual directo, usarlo
  if (booking.property && booking.property.price) {
    return booking.property.price;
  }
  
  // Si la reserva tiene un precio mensual calculado previamente, usarlo
  if (booking.monthly_price) {
    return booking.monthly_price;
  }
  
  // De lo contrario, calcular el precio mensual a partir del precio total
  return getMonthlyPrice(booking);
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

// Ver detalles de la propiedad (reemplaza viewBookingDetails)
const viewPropertyDetails = (propertyId) => {
  if (!propertyId) {
    showNotification('error', 'Error', 'No se encontró el ID de la propiedad');
    return;
  }
  
  // Navegar a la página de detalles de la propiedad en lugar de la página de reserva
  router.push(`/properties/${propertyId}`);
  activeDropdown.value = null;
};

// Función para crear una reseña
const createReview = (propertyId) => {
  if (!propertyId) {
    showNotification('error', 'Error', 'No se encontró el ID de la propiedad');
    return;
  }
  
  // Navegar a la página de crear reseña para la propiedad
  router.push(`/properties/${propertyId}/reviews/create`);
  activeDropdown.value = null;
};

// Formatear rango de fechas
const formatDateRange = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 'Fechas no disponibles';
  
  return `${formatDate(checkIn)} - ${formatDate(checkOut)}`;
};

// Verificar si una reserva es próxima
const isUpcoming = (booking) => {
  if (!booking.check_in_date) return false;
  
  const today = new Date();
  const checkInDate = new Date(booking.check_in_date);
  
  return booking.status !== 'cancelled' && 
         booking.status !== 'completed' && 
         checkInDate > today;
};

// Obtener los días restantes para una reserva
const getDaysLeft = (booking) => {
  if (!booking.check_in_date) return 0;
  
  const today = new Date();
  const checkInDate = new Date(booking.check_in_date);
  const diffTime = Math.abs(checkInDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Obtener texto de días restantes
const getDaysLeftText = (booking) => {
  const days = getDaysLeft(booking);
  
  if (days === 0) {
    return '¡Hoy es el día!';
  } else if (days === 1) {
    return '¡Mañana es el día!';
  } else {
    return `Faltan ${days} días`;
  }
};

// Obtener clase CSS para días restantes
const getDaysLeftClass = (booking) => {
  const days = getDaysLeft(booking);
  
  if (days <= 3) {
    return 'text-red-600';
  } else if (days <= 7) {
    return 'text-orange-600';
  } else {
    return 'text-green-600';
  }
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
  
  return methods[method] || method || 'Tarjeta de crédito';
};

// Obtener clase CSS según el estado de la reserva
const getStatusClass = (booking) => {
  if (booking.status === 'cancelled') {
    return 'text-red-600';
  } else if (booking.status === 'completed') {
    return 'text-green-600';
  } else if (booking.status === 'confirmed') {
    return 'text-orange-600';
  } else {
    return 'text-orange-600';
  }
};

// Obtener texto según el estado de la reserva
const getStatusText = (booking) => {
  if (booking.status === 'cancelled') {
    return 'Cancelada';
  } else if (booking.status === 'completed') {
    return 'Completada';
  } else if (booking.status === 'confirmed') {
    return 'Confirmada';
  } else {
    return 'Pendiente';
  }
};

// Obtener clase CSS según el estado del pago
const getPaymentStatusClass = (booking) => {
  if (!booking.payment_status) {
    return 'bg-yellow-100 text-yellow-800';
  }
  
  if (booking.payment_status === 'completed') {
    return 'bg-green-100 text-green-800';
  } else if (booking.payment_status === 'pending') {
    return 'bg-yellow-100 text-yellow-800';
  } else if (booking.payment_status === 'failed') {
    return 'bg-red-100 text-red-800';
  } else {
    return 'bg-gray-100 text-gray-800';
  }
};

// Obtener texto según el estado del pago
const getPaymentStatusText = (booking) => {
  if (!booking.payment_status) {
    return 'Pendiente de pago';
  }
  
  if (booking.payment_status === 'completed') {
    return 'Pagado';
  } else if (booking.payment_status === 'pending') {
    return 'Pendiente';
  } else if (booking.payment_status === 'failed') {
    return 'Fallido';
  } else {
    return booking.payment_status;
  }
};

// Verificar si se puede cancelar una reserva - solo si faltan más de 48 horas
const canCancelBooking = (booking) => {
  // Si la reserva ya está cancelada o completada, no se puede cancelar
  if (booking.status === 'cancelled' || booking.status === 'completed') {
    return false;
  }
  
  // Verificar si faltan más de 48 horas para el check-in
  if (booking.check_in_date) {
    const checkInDate = new Date(booking.check_in_date);
    const now = new Date();
    
    // Calcular la diferencia en horas
    const diffTime = checkInDate.getTime() - now.getTime();
    const diffHours = diffTime / (1000 * 60 * 60);
    
    // Solo permitir cancelaciones si faltan más de 48 horas
    if (diffHours <= 48) {
      return false;
    }
  }
  
  // En todos los demás casos (pending o confirmed con más de 48 horas), se puede cancelar
  return true;
};

// Toggle dropdown menu for booking actions
const toggleDropdown = (bookingId) => {
  if (activeDropdown.value === bookingId) {
    activeDropdown.value = null;
  } else {
    activeDropdown.value = bookingId;
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

// Ver detalles de la reserva
const viewBookingDetails = (bookingId) => {
  router.push(`/bookings/${bookingId}`);
  activeDropdown.value = null;
};

// Imprimir recibo
const printReceipt = () => {
  window.print();
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

// Generar y descargar recibo como PDF usando formato idéntico al mostrado
const downloadReceipt = async () => {
  if (!receiptBooking.value) return;

  try {
    showNotification('info', 'Procesando', 'Generando PDF...');
    
    // PASO 1: Calcular valores correctos (igual que en el modal)
    const monthlyPrice = getPropertyMonthlyPrice(receiptBooking.value);
    const initialPayment = monthlyPrice;
    const securityDeposit = monthlyPrice;
    const totalPaid = initialPayment + securityDeposit; // Primer mes + depósito
    const remainingBalance = receiptBooking.value.total_price - totalPaid;
    
    // PASO 2: Crear una fecha formateada similar a la del PDF
    const currentDate = new Date().toLocaleDateString('es-ES', {
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
    
    // PASO 3: Crear contenido HTML idéntico al formato del PDF
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Recibo de Reserva #${receiptBooking.value.id}</title>
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
            margin-bottom: 20px;
          }
          .header h1 {
            color: #fd5631;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .label {
            font-weight: 500;
            color: #444;
          }
          .value {
            text-align: right;
            font-weight: 400;
          }
          .bold {
            font-weight: bold;
          }
          .divider {
            height: 1px;
            background-color: #fd5631;
            margin: 20px 0;
          }
          .details-title {
            color: #fd5631;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .total-row {
            font-weight: bold;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 0.9em;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="date-header" style="text-align: right; margin-bottom: 10px; font-size: 12px; color: #666;">
          ${currentDate}, ${new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})} p.m.
          <span style="margin-left: 20px;">Recibo de Reserva #${receiptBooking.value.id}</span>
        </div>
        
        <div class="container">
          <div class="header">
            <h1>Recibo de Reserva</h1>
          </div>
          
          <div class="info-row">
            <span class="label">Reserva #:</span>
            <span class="value">${receiptBooking.value.id}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Propiedad:</span>
            <span class="value">${receiptBooking.value.property?.title || 'Propiedad'}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Fechas:</span>
            <span class="value">${formatDate(receiptBooking.value.check_in_date)} - ${formatDate(receiptBooking.value.check_out_date)}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Huéspedes:</span>
            <span class="value">${receiptBooking.value.guests}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Estado:</span>
            <span class="value">${getStatusText(receiptBooking.value)}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Método de pago:</span>
            <span class="value">Tarjeta de crédito</span>
          </div>
          
          <div class="info-row">
            <span class="label">Estado de pago:</span>
            <span class="value">Confirmado</span>
          </div>
          
          <div class="details-title">Detalles de Pago:</div>
          
          <div class="info-row">
            <span class="label">Pago inicial (primer mes):</span>
            <span class="value">L ${formatPrice(initialPayment)}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Depósito de seguridad:</span>
            <span class="value">L ${formatPrice(securityDeposit)}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Total pagado:</span>
            <span class="value">L ${formatPrice(totalPaid)}</span>
          </div>
          
          <div class="info-row">
            <span class="label">Saldo pendiente:</span>
            <span class="value">L ${formatPrice(remainingBalance)}</span>
          </div>
          
          <div class="divider"></div>
          
          <div class="info-row total-row">
            <span class="label">Total del contrato:</span>
            <span class="value">L ${formatPrice(receiptBooking.value.total_price)}</span>
          </div>
          
          <div class="footer">
            <p>Fecha de emisión: ${currentDate}</p>
            <p>OASIS - Su plataforma de reservas de confianza</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    // PASO 4: Almacenar directamente todos los valores calculados en el objeto window
    // para asegurar que estén disponibles durante la impresión
    window.receiptValues = {
      id: receiptBooking.value.id,
      propertyTitle: receiptBooking.value.property?.title || 'Propiedad',
      checkInDate: formatDate(receiptBooking.value.check_in_date),
      checkOutDate: formatDate(receiptBooking.value.check_out_date),
      guests: receiptBooking.value.guests,
      status: getStatusText(receiptBooking.value),
      initialPayment: formatPrice(initialPayment),
      securityDeposit: formatPrice(securityDeposit),
      totalPaid: formatPrice(totalPaid),
      remainingBalance: formatPrice(remainingBalance),
      totalPrice: formatPrice(receiptBooking.value.total_price)
    };
    
    // PASO 5: Forzar los valores correctos durante la impresión
    // Crear un nuevo documento HTML simple que no dependa de la integración JS
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl, '_blank');
    
    if (printWindow) {
      printWindow.onload = function() {
        // Dar tiempo para que el documento se renderice completamente
        setTimeout(() => {
          try {
            // Forzar los valores correctos directamente en el DOM
            printWindow.document.title = `Recibo de Reserva #${receiptBooking.value.id}`;
            printWindow.print();
            showNotification('success', 'Recibo listo', 'Por favor seleccione "Guardar como PDF" en el diálogo de impresión.');
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
      link.download = `Recibo-Reserva-${receiptBooking.value.id}.html`;
      link.click();
      
      URL.revokeObjectURL(blobUrl);
      showNotification('info', 'Recibo HTML descargado', 'Abra el archivo HTML y use la función de imprimir del navegador para crear el PDF.');
    }
    
  } catch (error) {
    console.error('Error al generar el recibo:', error);
    showNotification('error', 'Error', 'No se pudo generar el recibo. Por favor, intente nuevamente.');
  }
};

// Hook adicional para obtener información completa de la propiedad
const loadPropertyDetailsForReceipt = async (booking) => {
  if (!booking || !booking.property_id) {
    console.warn('No se puede cargar detalles de la propiedad: falta property_id');
    return booking;
  }
  
  try {
    console.log(`Obteniendo detalles completos para la propiedad #${booking.property_id}`);
    
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.warn('No se encontró token para obtener detalles de la propiedad');
      return booking;
    }
    
    // Solicitar detalles completos de la propiedad
    const response = await axios.get(`/api/properties/${booking.property_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      // Asignar la propiedad completa a la reserva
      booking.property = response.data.data;
      
      console.log('Propiedad cargada correctamente:', booking.property);
      
      // Si la propiedad tiene un precio, asignarlo como monthly_price a la reserva
      if (booking.property.price) {
        booking.monthly_price = booking.property.price;
        console.log(`Precio mensual asignado: ${booking.monthly_price}`);
      }
    }
    
    return booking;
  } catch (error) {
    console.error('Error cargando detalles de la propiedad:', error);
    return booking;
  }
};

// Función mejorada para mostrar el recibo
const showReceiptModal = async (bookingId) => {
  try {
    const booking = bookings.value.find(b => b.id === bookingId);
    
    if (booking) {
      // Cargar detalles completos de la propiedad antes de mostrar el recibo
      receiptBooking.value = await loadPropertyDetailsForReceipt({...booking});
      showReceiptModalId.value = bookingId;
    } else {
      showNotification('error', 'Error', 'No se encontró la reserva');
    }
    
    activeDropdown.value = null;
  } catch (error) {
    console.error('Error al mostrar el recibo:', error);
    showNotification('error', 'Error', 'No se pudo cargar el recibo');
  }
};

// Cancelar una reserva (implementación real)
const cancelBooking = async (bookingId) => {
  try {
    showNotification('info', 'Procesando', 'Cancelando reserva...');
    
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }
    
    // Usar la misma ruta que tu API
    const response = await axios.patch(`/api/bookings/${bookingId}/cancel`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      const bookingIndex = bookings.value.findIndex(b => b.id === bookingId);
      if (bookingIndex !== -1) {
        bookings.value[bookingIndex].status = 'cancelled';
        bookings.value[bookingIndex].cancellation_reason = 'Cancelada por el usuario';
      }
      
      showNotification('success', 'Éxito', 'Reserva cancelada correctamente');
      
      // Recargar las reservas para datos actualizados
      loadBookings();
    } else {
      throw new Error('No se pudo cancelar la reserva');
    }
  } catch (error) {
    console.error('Error cancelando la reserva:', error);
    
    // Mostrar el mensaje de error del servidor si está disponible
    if (error.response && error.response.data && error.response.data.message) {
      showNotification('error', 'Error', error.response.data.message);
    } else {
      showNotification('error', 'Error', 'No se pudo cancelar la reserva');
    }
  } finally {
    bookingToCancel.value = null;
  }
};

// Computed property para filtrar reservas según la pestaña seleccionada
const filteredBookings = computed(() => {
  if (activeTab.value === 'upcoming') {
    // Pendientes y confirmadas con fecha futura o de hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer a las 00:00:00 para comparar solo la fecha
    
    return bookings.value.filter(b => {
      // Verificar si el estado es adecuado
      const validStatus = b.status === 'pending' || b.status === 'confirmed';
      
      // Convertir check_in_date a un objeto Date y establecer a 00:00:00
      const checkInDate = new Date(b.check_in_date);
      checkInDate.setHours(0, 0, 0, 0);
      
      // La reserva es "próxima" si está pendiente/confirmada Y la fecha de entrada es hoy o después
      return validStatus && checkInDate >= today;
    });
  } else if (activeTab.value === 'completed') {
    // Completadas o con fecha pasada
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return bookings.value.filter(b => {
      if (b.status === 'completed') return true;
      
      const checkOutDate = new Date(b.check_out_date);
      checkOutDate.setHours(0, 0, 0, 0);
      
      return b.status !== 'cancelled' && checkOutDate < today;
    });
  } else if (activeTab.value === 'cancelled') {
    // Canceladas
    return bookings.value.filter(b => b.status === 'cancelled');
  }
  
  // Si no hay filtro, devolver todas
  return bookings.value;
});

// Cambiar página
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    loadBookings();
  }
};

// Cancelar todas las reservas (implementación real)
const cancelAllBookings = async () => {
  try {
    // Mostrar mensaje de carga
    showNotification('info', 'Procesando', 'Cancelando reservas...');
    
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      return;
    }
    
    // Obtener IDs de las reservas que se pueden cancelar
    const bookingsToCancel = filteredBookings.value
      .filter(b => canCancelBooking(b))
      .map(b => b.id);
    
    if (bookingsToCancel.length === 0) {
      showNotification('error', 'Error', 'No hay reservas que se puedan cancelar');
      showDeleteAllModal.value = false;
      return;
    }
    
    // Petición a la API para cancelar todas las reservas
    const response = await axios.post('/api/bookings/batch-cancel', {
      bookingIds: bookingsToCancel
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      showNotification('success', 'Éxito', `${bookingsToCancel.length} reservas canceladas correctamente`);
      
      // Recargar las reservas para asegurar datos actualizados
      loadBookings();
    } else {
      throw new Error('No se pudieron cancelar las reservas');
    }
    
  } catch (error) {
    console.error('Error en cancelación masiva de reservas:', error);
    
    showNotification('error', 'Error', 'No se pudieron cancelar las reservas');
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
  
  // Solo cargar reservas si tenemos datos de usuario
  if (user.value && user.value.id) {
    loadBookings();
  }
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
  
  // Cargar datos de usuario primero
  await loadUserData();
  
  // Solo cargar reservas si tenemos datos de usuario
  if (user.value && user.value.id) {
    await loadBookings();
  } else {
    console.error('No se pudieron cargar las reservas porque faltan datos de usuario');
  }
});

// Antes de desmontar el componente
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Redirigir a añadir propiedad
const redirectToAddProperty = () => {
  router.push('/properties/create');
};

// Cargar los datos del usuario (versión mejorada)
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
    console.error('Detalles del error:', error.response?.data || error.message);
    
    showNotification('error', 'Error', 'No se pudieron cargar los datos del usuario');
    
    // Si es error de autenticación, redirigir al login
    if (error.response && error.response.status === 401) {
      router.push('/auth/login');
    }
  } finally {
    isLoading.value = false;
  }
};

// Cargar reservas desde la API - Filtrar para mostrar solo propiedades de alquiler
const loadBookings = async () => {
  try {
    isLoadingBookings.value = true;
    
    console.log("Iniciando carga de reservas...");
    
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      showNotification('error', 'Error de autenticación', 'Por favor, inicie sesión nuevamente');
      return;
    }
    
    if (!user.value || !user.value.id) {
      console.error('No hay datos de usuario para cargar reservas');
      showNotification('error', 'Error', 'No se pudieron cargar los datos del usuario');
      return;
    }
    
    console.log("Cargando reservas para usuario ID:", user.value.id);
    
    // Construir parámetros según el activeTab
    const params = {};
    
    // Aplicar filtros según la pestaña activa
    if (activeTab.value === 'upcoming') {
      params.status = ['pending', 'confirmed'];
    } else if (activeTab.value === 'completed') {
      params.status = ['completed'];
    } else if (activeTab.value === 'cancelled') {
      params.status = ['cancelled'];
    }
    
    params.page = currentPage.value;
    params.limit = itemsPerPage.value;
    params.user_id = user.value.id;
    
    // IMPORTANTE: Marcar que queremos solo alquileres (propiedades for-rent)
    params.is_purchase = false;
    
    console.log("Parámetros de búsqueda:", params);
    
    // Hacer la solicitud a la API
    const response = await axios.get('/api/bookings', {
      params,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log("Respuesta completa de la API:", response);
    
    if (response.data && response.data.success) {
      console.log("Reservas recibidas:", response.data.data);
      bookings.value = response.data.data.bookings || [];
      totalPages.value = response.data.data.totalPages || 1;
      
      console.log(`Se cargaron ${bookings.value.length} reservas`);
      
      // Validación adicional: filtrar solo propiedades de alquiler
      bookings.value = bookings.value.filter(booking => 
        booking.property && booking.property.status === 'for-rent'
      );
      
      // Si las reservas no tienen datos de propiedad, cargarlos
      if (bookings.value.length > 0) {
        await loadPropertyDetailsForBookings(bookings.value);
      }
    } else {
      throw new Error('No se pudieron obtener las reservas');
    }
  } catch (error) {
    console.error('Error cargando reservas:', error);
    console.error('Detalles del error:', error.response?.data || error.message);
    
    // Inicializar con array vacío
    bookings.value = [];
    totalPages.value = 1;
    
    showNotification('error', 'Error', 'No se pudieron cargar las reservas');
  } finally {
    isLoadingBookings.value = false;
  }
};

// Función para cargar detalles de propiedades para las reservas
const loadPropertyDetailsForBookings = async (bookingsData) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) return;
  
  console.log("Cargando detalles de propiedades para las reservas...");
  
  for (const booking of bookingsData) {
    if (!booking.property && booking.property_id) {
      try {
        console.log(`Cargando detalles para propiedad ID: ${booking.property_id}`);
        
        const propertyResponse = await axios.get(`/api/properties/${booking.property_id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (propertyResponse.data && propertyResponse.data.success) {
          booking.property = propertyResponse.data.data;
          console.log(`Propiedad ${booking.property_id} cargada correctamente`);
          
          // Guardar el precio mensual en la reserva para usarlo en los recibos
          if (booking.property.price) {
            booking.monthly_price = booking.property.price;
          }
        }
      } catch (propError) {
        console.error(`Error cargando detalles de la propiedad ID ${booking.property_id}:`, propError);
      }
    }
  }
};

// Confirmar cancelación de reserva
const confirmCancelBooking = (booking) => {
  bookingToCancel.value = booking;
  activeDropdown.value = null;
};
</script>

<style>
/* Colores personalizados */
.bg-orange {
  background-color: #fd5631;
}

.bg-orange-dark {
  background-color: #fd5631;
}

.text-orange {
  color: #fd5631;
}

.border-orange {
  border-color: #fd5631;
}

.hover\:bg-orange:hover {
  background-color: #fd5631;
}

.hover\:bg-orange-dark:hover {
  background-color: #fd5631;
}

.hover\:text-orange:hover {
  color: #fd5631;
}

/* Estilos de enfoque */
.focus\:ring-orange:focus {
  --tw-ring-color: #fd5631;
  --tw-ring-opacity: 0.5;
  box-shadow: 0 0 0 3px rgba(10, 51, 100, 0.5);
}

.focus\:border-orange:focus {
  border-color: #fd5631;
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

/* Estilos específicos para la impresión del recibo */
@media print {
  body * {
    visibility: hidden;
  }
  
  .showReceiptModalId * {
    visibility: visible;
  }
  
  .showReceiptModalId {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>