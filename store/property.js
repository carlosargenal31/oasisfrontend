// store/property.js
export const usePropertyStore = defineStore('property', {
    state: () => ({
      properties: [],
      currentProperty: null,
      loading: false,
      error: null,
      totalProperties: 0,
      filters: {
        property_type: null,
        minPrice: null,
        maxPrice: null,
        minBedrooms: null,
        minBathrooms: null,
        city: null,
      }
    }),
    
    actions: {
      async fetchProperties(params = {}) {
        this.loading = true;
        this.error = null;
        
        try {
          const { $axios } = useNuxtApp();
          const response = await $axios.get('/properties', { 
            params: {
              ...this.filters,
              ...params
            }
          });
          
          // Logging for debugging
          console.log('API Response:', response.data);
          
          if (response.data) {
            this.properties = response.data.properties || response.data || [];
            this.totalProperties = response.data.total || this.properties.length || 0;
          } else {
            this.properties = [];
            this.totalProperties = 0;
          }
        } catch (error) {
          console.error('Error in fetchProperties:', error);
          this.error = 'Failed to load properties. Please try again.';
        } finally {
          this.loading = false;
        }
      },
      
      async fetchProperty(id) {
        this.loading = true;
        this.error = null;
        
        try {
          const { $axios } = useNuxtApp();
          const response = await $axios.get(`/properties/${id}`);
          
          if (response.data) {
            this.currentProperty = response.data;
          } else {
            this.error = 'Property not found';
          }
        } catch (error) {
          console.error(`Error in fetchProperty(${id}):`, error);
          this.error = 'Failed to load property details. Please try again.';
        } finally {
          this.loading = false;
        }
      },
      
      setFilters(filters) {
        this.filters = { ...this.filters, ...filters };
      },
      
      clearFilters() {
        this.filters = {
          property_type: null,
          minPrice: null,
          maxPrice: null,
          minBedrooms: null,
          minBathrooms: null,
          city: null,
        };
      }
    }
  });