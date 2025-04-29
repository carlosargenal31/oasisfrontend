<template>
    <div class="user-bookings">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Mis reservas</h3>
        </div>
        
        <div class="p-6">
          <!-- Loading state -->
          <div v-if="loading" class="flex justify-center py-6">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
          
          <!-- Error state -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {{ error }}
          </div>
          
          <!-- Empty state -->
          <div v-else-if="bookings.length === 0" class="text-center py-10">
            <div class="empty-state">
              <Icon name="ph:calendar-x" class="h-16 w-16 mx-auto text-gray-300" />
              <h4 class="mt-4 text-lg font-medium text-gray-900">No tienes reservas activas</h4>
              <p class="mt-2 text-gray-500">Cuando realices una reserva, aparecerá aquí.</p>
              <router-link to="/properties" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                Encontrar alojamiento
              </router-link>
            </div>
          </div>
          
          <!-- Bookings list -->
          <div v-else class="space-y-6">
            <div v-for="booking in bookings" :key="booking.id" class="booking-item">
              <div class="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div class="md:flex">
                  <div class="md:flex-shrink-0 md:w-1/3 h-48 md:h-auto relative">
                    <img 
                      :src="booking.property?.main_image || 'https://via.placeholder.com/300x200'" 
                      class="absolute h-full w-full object-cover"
                      alt="Imagen de propiedad"
                    />
                  </div>
                  <div class="p-4 md:p-6 md:flex-1">
                    <div class="flex flex-wrap justify-between items-start">
                      <h4 class="text-lg font-medium text-gray-900 mb-1">{{ booking.property?.title }}</h4>
                      <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1" 
                        :class="{
                          'bg-green-100 text-green-800': booking.status === 'confirmed',
                          'bg-yellow-100 text-yellow-800': booking.status === 'pending',
                          'bg-red-100 text-red-800': booking.status === 'cancelled',
                          'bg-gray-100 text-gray-800': booking.status === 'completed'
                        }"
                      >
                        {{ getStatusLabel(booking.status) }}
                      </span>
                    </div>
                    
                    <p class="text-gray-500 text-sm mb-3 flex items-center">
                      <Icon name="ph:map-pin" class="h-4 w-4 mr-1" />
                      {{ booking.property?.location }}
                    </p>
                    
                    <div class="flex items-center mb-3">
                      <Icon name="ph:calendar" class="h-4 w-4 mr-1 text-gray-400" />
                      <span class="text-gray-600">{{ formatDate(booking.check_in) }} - {{ formatDate(booking.check_out) }}</span>
                    </div>
                    
                    <p class="text-gray-900 font-medium mb-4">
                      <span class="text-gray-500">Total:</span> ${{ booking.total_price }}
                    </p>
                    
                    <div class="mt-4 pt-4 border-t flex flex-wrap gap-3">
                      <router-link 
                        :to="`/bookings/${booking.id}`" 
                        class="inline-flex items-center px-3 py-1.5 border border-primary-500 text-primary-500 rounded-md text-sm hover:bg-primary-50 transition-colors"
                      >
                        Ver detalles
                      </router-link>
                      
                      <button 
                        v-if="booking.status === 'confirmed' || booking.status === 'pending'"
                        class="inline-flex items-center px-3 py-1.5 border border-red-500 text-red-500 rounded-md text-sm hover:bg-red-50 transition-colors"
                        @click="cancelBooking(booking.id)"
                      >
                        Cancelar reserva
                      </button>
                    </div>
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
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '../../store/user';
  import { useRouter } from 'vue-router';
  
  // Stores
  const userStore = useUserStore();
  const router = useRouter();
  
  // Estado
  const bookings = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Obtener etiqueta de estado
  const getStatusLabel = (status) => {
    const statusLabels = {
      'pending': 'Pendiente',
      'confirmed': 'Confirmada',
      'cancelled': 'Cancelada',
      'completed': 'Completada'
    };
    
    return statusLabels[status] || status;
  };
  
  // Cancelar reserva
  const cancelBooking = async (bookingId) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      const result = await userStore.cancelBooking(bookingId);
      
      if (result.success) {
        // Toast o notificación
        // La lista de reservas ya se refrescará por la función cancelBooking
      }
    }
  };
  
  // Cargar reservas
  const loadBookings = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      // En entorno real, usarías el store de usuario para cargar las reservas
      // const result = await userStore.fetchBookings();
      // if (result.success) {
      //   bookings.value = userStore.bookings;
      // }
      
      // Datos de ejemplo
      setTimeout(() => {
        bookings.value = [
          {
            id: 1,
            property: {
              id: 101,
              title: 'Apartamento en la playa',
              location: 'Cancún, México',
              main_image: 'https://via.placeholder.com/300x200?text=Apartamento'
            },
            check_in: '2023-06-15',
            check_out: '2023-06-20',
            total_price: 1250,
            status: 'confirmed'
          },
          {
            id: 2,
            property: {
              id: 102,
              title: 'Casa de montaña',
              location: 'Aspen, Colorado',
              main_image: 'https://via.placeholder.com/300x200?text=Casa'
            },
            check_in: '2023-07-10',
            check_out: '2023-07-15',
            total_price: 1800,
            status: 'pending'
          }
        ];
        
        loading.value = false;
      }, 1000);
      
      // Ejemplo para estado vacío:
      // bookings.value = [];
    } catch (err) {
      console.error('Error loading bookings:', err);
      error.value = 'No se pudieron cargar las reservas. Por favor, intenta de nuevo.';
      loading.value = false;
    }
  };
  
  // Ciclo de vida
  onMounted(() => {
    loadBookings();
  });
  </script>