<template>
    <div class="container-custom py-12">
      <h1 class="text-3xl font-bold mb-6">My Bookings</h1>
      
      <!-- Loading State -->
      <div v-if="bookingStore.loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="bookingStore.error" class="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
        <p class="text-red-700 dark:text-red-300">{{ bookingStore.error }}</p>
      </div>
      
      <!-- Booking list -->
      <div v-else-if="bookingStore.bookings.length > 0">
        <!-- Filter buttons -->
        <div class="flex overflow-x-auto space-x-2 pb-4 mb-6">
          <button 
            v-for="status in bookingStatuses" 
            :key="status.value"
            @click="setStatusFilter(status.value)"
            class="px-4 py-2 rounded-full whitespace-nowrap"
            :class="[
              currentStatusFilter === status.value 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            ]"
          >
            {{ status.label }}
          </button>
        </div>
        
        <!-- Bookings grid -->
        <div class="space-y-6">
          <div 
            v-for="booking in filteredBookings" 
            :key="booking.id" 
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div class="p-6">
              <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <!-- Booking details -->
                <div class="flex-grow">
                  <h3 class="text-xl font-bold mb-2">{{ booking.property?.title || 'Property' }}</h3>
                  <p class="text-gray-600 dark:text-gray-400 mb-2">
                    {{ formatDateRange(booking.check_in_date, booking.check_out_date) }}
                  </p>
                  <div class="flex items-center mb-4">
                    <span 
                      class="inline-block px-3 py-1 rounded-full text-sm"
                      :class="getStatusClass(booking.status)"
                    >
                      {{ capitalizeFirstLetter(booking.status) }}
                    </span>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Guests:</strong> {{ booking.guest_count }}
                  </p>
                  <p class="text-gray-700 dark:text-gray-300 text-sm">
                    <strong>Booking ID:</strong> {{ booking.id }}
                  </p>
                </div>
                
                <!-- Booking price and actions -->
                <div class="flex flex-col items-end">
                  <div class="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                    ${{ formatPrice(booking.total_price) }}
                  </div>
                  
                  <div class="flex flex-col gap-2">
                    <NuxtLink :to="`/bookings/${booking.id}`" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm">
                      View Details
                    </NuxtLink>
                    
                    <button 
                      v-if="booking.status === 'confirmed' || booking.status === 'pending'"
                      @click="openCancelDialog(booking.id)"
                      class="text-red-600 hover:text-red-800 dark:text-red-400 text-sm"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-else class="bg-gray-100 dark:bg-gray-700 p-8 rounded-lg text-center">
        <h3 class="text-xl font-semibold mb-2">No bookings found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">You don't have any bookings yet.</p>
        <NuxtLink to="/properties" class="text-blue-600 dark:text-blue-400 font-medium">
          Browse properties
        </NuxtLink>
      </div>
      
      <!-- Cancel Booking Dialog -->
      <div v-if="showCancelDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
          <h3 class="text-xl font-bold mb-4">Cancel Booking</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6">
            Are you sure you want to cancel this booking? This action cannot be undone.
          </p>
          <div class="flex justify-end gap-4">
            <button 
              @click="showCancelDialog = false" 
              class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg"
            >
              Keep Booking
            </button>
            <button 
              @click="confirmCancelBooking" 
              class="px-4 py-2 bg-red-600 text-white rounded-lg"
              :disabled="cancelLoading"
            >
              <span v-if="cancelLoading">Cancelling...</span>
              <span v-else>Yes, Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useBookingStore } from '~/store/booking';
  
  // Get router
  const router = useRouter();
  
  // Initialize store
  const bookingStore = useBookingStore();
  
  // Local state
  const currentStatusFilter = ref('all');
  const showCancelDialog = ref(false);
  const cancelBookingId = ref(null);
  const cancelLoading = ref(false);
  
  // Define booking statuses
  const bookingStatuses = [
    { value: 'all', label: 'All Bookings' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];
  
  // Filter bookings by status
  const filteredBookings = computed(() => {
    if (currentStatusFilter.value === 'all') {
      return bookingStore.bookings;
    }
    return bookingStore.bookings.filter(booking => booking.status === currentStatusFilter.value);
  });
  
  // Set status filter
  const setStatusFilter = (status) => {
    currentStatusFilter.value = status;
  };
  
  // Open cancel dialog
  const openCancelDialog = (bookingId) => {
    cancelBookingId.value = bookingId;
    showCancelDialog.value = true;
  };
  
  // Confirm booking cancellation
  const confirmCancelBooking = async () => {
    if (!cancelBookingId.value) return;
    
    cancelLoading.value = true;
    
    try {
      const result = await bookingStore.cancelBooking(cancelBookingId.value);
      
      if (result.success) {
        showCancelDialog.value = false;
      } else {
        // TODO: Show error message
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      cancelLoading.value = false;
    }
  };
  
  // Format date range
  const formatDateRange = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 'Dates not specified';
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    return `${checkInDate.toLocaleDateString()} - ${checkOutDate.toLocaleDateString()}`;
  };
  
  // Format price
  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Capitalize first letter
  const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  // Fetch bookings when component mounts
  onMounted(() => {
    bookingStore.fetchUserBookings();
  });
  
  // Page meta
  definePageMeta({
    middleware: ['auth']
  });
  </script>
  
  <style scoped>
  .container-custom {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  </style>