// store/booking.js
export const useBookingStore = defineStore('booking', {
  state: () => ({
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null
  }),
  
  actions: {
    // Fetch user bookings
    async fetchUserBookings() {
      this.loading = true;
      this.error = null;
      
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get('/bookings');
        
        this.bookings = response.data;
      } catch (error) {
        console.error('Error fetching bookings:', error);
        this.error = 'Failed to load your bookings. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    
    // Fetch a single booking
    async fetchBooking(id) {
      this.loading = true;
      this.error = null;
      
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.get(`/bookings/${id}`);
        
        this.currentBooking = response.data;
      } catch (error) {
        console.error(`Error fetching booking ${id}:`, error);
        this.error = 'Failed to load booking details. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    
    // Create a new booking
    async createBooking(bookingData) {
      this.loading = true;
      this.error = null;
      
      try {
        const { $axios } = useNuxtApp();
        const response = await $axios.post('/bookings', bookingData);
        
        // Add the new booking to the list
        this.bookings.unshift(response.data);
        
        return { success: true, booking: response.data };
      } catch (error) {
        console.error('Error creating booking:', error);
        this.error = error.response?.data?.message || 'Failed to create booking. Please try again.';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    },
    
    // Cancel a booking
    async cancelBooking(id) {
      this.loading = true;
      this.error = null;
      
      try {
        const { $axios } = useNuxtApp();
        await $axios.patch(`/bookings/${id}/cancel`);
        
        // Update booking status in local state
        const index = this.bookings.findIndex(booking => booking.id === id);
        if (index !== -1) {
          this.bookings[index].status = 'cancelled';
        }
        
        if (this.currentBooking?.id === id) {
          this.currentBooking.status = 'cancelled';
        }
        
        return { success: true };
      } catch (error) {
        console.error(`Error cancelling booking ${id}:`, error);
        this.error = error.response?.data?.message || 'Failed to cancel booking. Please try again.';
        return { success: false, error: this.error };
      } finally {
        this.loading = false;
      }
    }
  }
});