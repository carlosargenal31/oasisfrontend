import { defineStore } from 'pinia';
import api from '@/services/api';

export const useBookingStore = defineStore('booking', {
  // State
  state: () => ({
    bookings: [],
    currentBooking: null,
    isLoading: false,
    error: null,
    filters: {
      status: '',
      propertyId: '',
      userId: '',
      startDate: '',
      endDate: ''
    },
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  }),

  // Getters
  getters: {
    userBookings: (state) => (userId) => {
      return state.bookings.filter(booking => booking.userId === userId);
    },
    
    propertyBookings: (state) => (propertyId) => {
      return state.bookings.filter(booking => booking.propertyId === propertyId);
    },
    
    filteredBookings: (state) => {
      let result = [...state.bookings];
      
      // Apply filters
      if (state.filters.status) {
        result = result.filter(booking => booking.status === state.filters.status);
      }
      
      if (state.filters.propertyId) {
        result = result.filter(booking => booking.propertyId === state.filters.propertyId);
      }
      
      if (state.filters.userId) {
        result = result.filter(booking => booking.userId === state.filters.userId);
      }
      
      if (state.filters.startDate) {
        const startDate = new Date(state.filters.startDate);
        result = result.filter(booking => new Date(booking.checkIn) >= startDate);
      }
      
      if (state.filters.endDate) {
        const endDate = new Date(state.filters.endDate);
        result = result.filter(booking => new Date(booking.checkOut) <= endDate);
      }
      
      return result;
    },
    
    paginatedBookings: (state) => {
      const startIndex = (state.pagination.page - 1) * state.pagination.limit;
      const endIndex = startIndex + state.pagination.limit;
      return state.filteredBookings.slice(startIndex, endIndex);
    }
  },

  // Actions
  actions: {
    // Update filters
    setFilters(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
      this.pagination.page = 1; // Reset to first page
    },
    
    // Reset filters
    resetFilters() {
      this.filters = {
        status: '',
        propertyId: '',
        userId: '',
        startDate: '',
        endDate: ''
      };
      this.pagination.page = 1;
    },
    
    // Set pagination page
    setPage(page) {
      this.pagination.page = page;
    },
    
    // Fetch all bookings with optional filters
    async fetchBookings(params = {}) {
      this.isLoading = true;
      this.error = null;
      
      try {
        // Combine store filters with any additional params
        const queryParams = {
          ...this.filters,
          page: this.pagination.page,
          limit: this.pagination.limit,
          ...params
        };
        
        const response = await api.getBookings(queryParams);
        
        // If API returns paginated data
        if (response.data.pagination) {
          this.pagination = {
            ...this.pagination,
            total: response.data.pagination.total,
            totalPages: response.data.pagination.totalPages
          };
          this.bookings = response.data.bookings;
        } else {
          // If API returns just an array of bookings
          this.bookings = response.data;
        }
        
        return this.bookings;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch bookings';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Fetch a single booking by ID
    async fetchBooking(id) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.getBooking(id);
        this.currentBooking = response.data;
        return this.currentBooking;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch booking';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Create a new booking
    async createBooking(bookingData) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.createBooking(bookingData);
        // Add the new booking to the local state
        this.bookings.unshift(response.data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create booking';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Update a booking status
    async updateBookingStatus(id, status) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.updateBookingStatus(id, status);
        
        // Update the booking in the local state
        const index = this.bookings.findIndex(b => b.id === id);
        if (index !== -1) {
          this.bookings[index] = response.data;
        }
        
        // Update current booking if it's the same one
        if (this.currentBooking && this.currentBooking.id === id) {
          this.currentBooking = response.data;
        }
        
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update booking status';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Check if a property is available for the given dates
    async checkAvailability(propertyId, checkIn, checkOut) {
      this.isLoading = true;
      this.error = null;
      
      try {
        // This would be a custom endpoint in your API
        const response = await api.checkAvailability({
          propertyId,
          checkIn,
          checkOut
        });
        
        return response.data.available;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to check availability';
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});