<template>
  <div class="main-container">
    <div class="properties-container">
      <div class="properties-layout">
        <!-- Left Sidebar with Filters -->
        <div class="filters-column">
          <!-- Rent/Sale Toggle -->
          <div class="rent-sale-toggle">
            <button 
              @click="listingType = 'rent'"
              :class="['toggle-btn', listingType === 'rent' ? 'active' : '']"
            >
              <i class="icon-rent"></i>For rent
            </button>
            <button 
              @click="listingType = 'sale'"
              :class="['toggle-btn', listingType === 'sale' ? 'active' : '']"
            >
              <i class="icon-sale"></i>For sale
            </button>
          </div>
          
          <!-- Location -->
          <div class="filter-section">
            <h3 class="filter-title">Location</h3>
            <div class="filter-dropdown mb-3">
              <select v-model="filters.city" class="form-select" @change="handleFilterChange">
                <option value="">Choose city</option>
                <option value="New York">New York</option>
                <option value="Chicago">Chicago</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Miami">Miami</option>
              </select>
            </div>
            <div class="filter-dropdown">
              <select v-model="filters.district" class="form-select" @change="handleFilterChange">
                <option value="">Choose district</option>
                <option value="Downtown">Downtown</option>
                <option value="Midtown">Midtown</option>
                <option value="Uptown">Uptown</option>
                <option value="West Side">West Side</option>
                <option value="East Side">East Side</option>
              </select>
            </div>
          </div>
          
          <!-- Property Type -->
          <div class="filter-section">
            <h3 class="filter-title">Property type</h3>
            <div class="property-types">
              <div v-for="type in propertyTypes" :key="type.value" class="checkbox-item">
                <input 
                  type="checkbox" 
                  :id="type.value" 
                  :value="type.value" 
                  v-model="selectedPropertyTypes"
                  @change="updatePropertyTypeFilters"
                >
                <label :for="type.value">{{ type.label }}</label>
              </div>
            </div>
          </div>
          
          <!-- Price Range -->
          <div class="filter-section">
            <h3 class="filter-title">Price per month</h3>
            <div class="price-range-slider">
              <div class="price-slider-container">
                <div class="slider-track"></div>
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="100"
                  v-model.number="filters.minPrice" 
                  @change="handleFilterChange"
                  class="price-slider"
                >
                <input 
                  type="range" 
                  min="0" 
                  max="5000" 
                  step="100"
                  v-model.number="filters.maxPrice" 
                  @change="handleFilterChange"
                  class="price-slider"
                >
              </div>
            </div>
            <div class="price-inputs">
              <div class="price-input-group">
                <span class="price-symbol">$</span>
                <input 
                  type="number" 
                  v-model="filters.minPrice" 
                  @change="handleFilterChange"
                  class="price-input"
                >
              </div>
              <div class="price-separator">—</div>
              <div class="price-input-group">
                <span class="price-symbol">$</span>
                <input 
                  type="number" 
                  v-model="filters.maxPrice" 
                  @change="handleFilterChange"
                  class="price-input"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content Area -->
        <div class="content-column">
          <!-- Breadcrumb -->
          <div class="breadcrumb">
            <router-link to="/" class="breadcrumb-item">Home</router-link>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item active">Property for {{ listingType }}</span>
          </div>

          <!-- Page Title and Controls -->
          <div class="content-header">
            <h1 class="page-title">Property for {{ listingType }}</h1>
            <div class="header-controls">
              <div class="sort-control">
                <span class="sort-label">Sort by:</span>
                <select v-model="sortBy" class="sort-select" @change="handleSortChange">
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
              <button class="map-view-btn">
                <i class="icon-map"></i>
                Map view
              </button>
            </div>
          </div>
          
          <!-- Results Count -->
          <div class="results-count">
            {{ propertyStore.totalProperties }} results
          </div>
          
          <!-- Loading State -->
          <div v-if="propertyStore.loading" class="loading-container">
            <div class="spinner"></div>
          </div>
          
          <!-- Properties Grid -->
          <div v-if="!propertyStore.error && propertyStore.properties.length > 0" class="properties-grid">
            <div v-for="property in sortedProperties" :key="property.id" class="property-card-wrapper">
              <!-- Click event will navigate to property detail page -->
              <div @click="navigateToProperty(property.id)" class="property-card">
                <!-- Property Image -->
                <div class="property-image-container">
                  <img :src="property.image || 'https://placehold.co/600x400?text=No+Image'" :alt="property.title" class="property-image">
                  <!-- Tags/Badges -->
                  <div class="property-badges">
                    <span v-if="property.isNew" class="badge new">NEW</span>
                    <span v-if="property.isFeatured" class="badge featured">FEATURED</span>
                  </div>
                  <!-- Favorite Button -->
                  <button class="favorite-btn" @click.stop="toggleFavorite(property.id)">
                    <i class="icon-heart" :class="{ 'is-favorite': propertyStore.favorites.includes(property.id) }"></i>
                  </button>
                </div>
                
                <!-- Property Details -->
                <div class="property-details">
                  <div class="property-type">FOR {{ property.status === 'for-rent' ? 'RENT' : 'SALE' }}</div>
                  <h3 class="property-title">{{ property.title }}</h3>
                  <p class="property-location">{{ property.address }}</p>
                  <div class="property-price">
                    ${{ formatPrice(property.price) }}
                    <span v-if="property.status === 'for-rent'" class="price-period">/month</span>
                  </div>
                  <div class="property-features">
                    <div class="feature">
                      <span>{{ property.bedrooms }}</span>
                      <i class="icon-bed"></i>
                    </div>
                    <div class="feature">
                      <span>{{ property.bathrooms }}</span>
                      <i class="icon-bath"></i>
                    </div>
                    <div class="feature">
                      <span>{{ property.square_feet }}</span>
                      <i class="icon-area"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- No Results -->
          <div v-else-if="!propertyStore.error && propertyStore.properties.length === 0" class="no-results">
            <div class="no-results-icon">🏠</div>
            <h3>No properties found</h3>
            <p>Try adjusting your search criteria</p>
            <button @click="resetFilters" class="reset-btn">Reset Filters</button>
          </div>
          
          <!-- Error State -->
          <div v-else-if="propertyStore.error" class="error-container">
            <p class="error-message">{{ propertyStore.error }}</p>
            <button @click="fetchProperties" class="retry-btn">Try Again</button>
          </div>
          
          <!-- Pagination -->
          <div v-if="totalPages > 1 && !propertyStore.loading" class="pagination">
            <button 
              class="page-btn" 
              :disabled="currentPage === 1" 
              @click="changePage(currentPage - 1)"
            >
              <i class="icon-chevron-left"></i>
            </button>
            
            <template v-for="page in pageNumbers" :key="page">
              <span v-if="page === '...'" class="page-ellipsis">...</span>
              <button 
                v-else 
                class="page-btn" 
                :class="{ active: currentPage === page }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </template>
            
            <button 
              class="page-btn" 
              :disabled="currentPage === totalPages" 
              @click="changePage(currentPage + 1)"
            >
              <i class="icon-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { usePropertyStore } from '~/store/property';
import { useRoute, useRouter } from 'vue-router';

// Initialize stores and router
const propertyStore = usePropertyStore();
const route = useRoute();
const router = useRouter();

// UI state
const listingType = ref('rent');
const sortBy = ref('newest');
const currentPage = ref(1);
const itemsPerPage = ref(9);
const filters = ref({
  city: '',
  district: '',
  property_type: null,
  minPrice: 0,
  maxPrice: 5000,
  minBedrooms: null,
  minBathrooms: null
});

// Property Types
const propertyTypes = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'room', label: 'Room' },
  { value: 'office', label: 'Office' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' }
];

// Selected property types for multi-select
const selectedPropertyTypes = ref([]);

// Update property type filters
const updatePropertyTypeFilters = () => {
  if (selectedPropertyTypes.value.length === 1) {
    filters.value.property_type = selectedPropertyTypes.value[0];
  } else {
    filters.value.property_type = null;
  }
  handleFilterChange();
};

// Fetch properties on mount and initialize from query params if present
onMounted(() => {
  initFromQueryParams();
  fetchProperties();
});

// Initialize filters from URL query parameters
const initFromQueryParams = () => {
  const query = route.query;
  
  // Set listing type from query
  if (query.type === 'rent' || query.type === 'sale') {
    listingType.value = query.type;
  }
  
  // Set sorting from query
  if (query.sort && ['newest', 'price-low', 'price-high'].includes(query.sort)) {
    sortBy.value = query.sort;
  }
  
  // Set page from query
  if (query.page && !isNaN(parseInt(query.page))) {
    currentPage.value = parseInt(query.page);
  }
  
  // Set filters from query
  if (query.property_type) {
    filters.value.property_type = query.property_type;
    selectedPropertyTypes.value = [query.property_type];
  }
  
  if (query.city) filters.value.city = query.city;
  if (query.district) filters.value.district = query.district;
  
  if (query.minPrice) filters.value.minPrice = parseInt(query.minPrice);
  if (query.maxPrice) filters.value.maxPrice = parseInt(query.maxPrice);
  if (query.minBedrooms) filters.value.minBedrooms = parseInt(query.minBedrooms);
  if (query.minBathrooms) filters.value.minBathrooms = parseInt(query.minBathrooms);
  
  // Apply status filter based on listing type
  applyStatusFilter();
};

// Watch for changes in listing type
watch(listingType, () => {
  currentPage.value = 1;
  applyStatusFilter();
  updateQueryParams();
  fetchProperties();
});

// Watch for changes in sort
watch(sortBy, () => {
  updateQueryParams();
});

// Apply listing type to filters
const applyStatusFilter = () => {
  filters.value.status = listingType.value === 'rent' ? 'for-rent' : 'for-sale';
};

// Handle filter changes
const handleFilterChange = () => {
  currentPage.value = 1;
  updateQueryParams();
  fetchProperties();
};

// Handle sort changes
const handleSortChange = () => {
  currentPage.value = 1;
  updateQueryParams();
};

// Update URL query parameters
const updateQueryParams = () => {
  // Build query object
  const query = {
    type: listingType.value,
    sort: sortBy.value,
    page: currentPage.value
  };
  
  // Add non-empty filters to query
  Object.entries(filters.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      query[key] = value;
    }
  });
  
  // Update URL without refreshing page
  router.replace({ query });
};

// Fetch properties with current filters and pagination
const fetchProperties = () => {
  const params = {
    page: currentPage.value,
    limit: itemsPerPage.value
  };
  
  propertyStore.setFilters(filters.value);
  propertyStore.fetchProperties(params);
};

// Sort properties
const sortedProperties = computed(() => {
  let result = [...propertyStore.properties];
  
  if (sortBy.value === 'newest') {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy.value === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  }
  
  return result;
});

// Pagination
const totalPages = computed(() => {
  return Math.ceil(propertyStore.totalProperties / itemsPerPage.value);
});

const pageNumbers = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  // If there are few pages, show all of them
  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    let start = Math.max(2, currentPage.value - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages.value - 1, start + maxVisiblePages - 3);
    
    // Adjust if we're near the end
    if (end === totalPages.value - 1) {
      start = Math.max(2, end - (maxVisiblePages - 3));
    }
    
    // Add ellipsis if needed
    if (start > 2) {
      pages.push('...');
    }
    
    // Add pages in range
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add ellipsis if needed
    if (end < totalPages.value - 1) {
      pages.push('...');
    }
    
    // Always show last page
    pages.push(totalPages.value);
  }
  
  return pages;
});

// Change page
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    updateQueryParams();
    fetchProperties();
    
    // Scroll to top of results
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

// Reset all filters
const resetFilters = () => {
  filters.value = { 
    status: listingType.value === 'rent' ? 'for-rent' : 'for-sale',
    city: '',
    district: '',
    property_type: null,
    minPrice: 0,
    maxPrice: 5000,
    minBedrooms: null,
    minBathrooms: null
  };
  selectedPropertyTypes.value = [];
  propertyStore.clearFilters();
  currentPage.value = 1;
  updateQueryParams();
  fetchProperties();
};

// Toggle favorite status for a property
const toggleFavorite = (propertyId) => {
  propertyStore.toggleFavorite(propertyId);
};

// Navegación a la página de detalle de propiedad
const navigateToProperty = (propertyId) => {
  console.log("Navegando a propiedad:", propertyId);
  router.push(`/properties/${propertyId}`);
};

// Format price with commas
const formatPrice = (price) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<style scoped>
/* ===== Main Container ===== */
.main-container {
  background-color: #ffffff;
  min-height: 100vh;
}

.properties-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.properties-layout {
  display: flex;
  gap: 30px;
}

.filters-column {
  width: 280px;
  flex-shrink: 0;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
}

.content-column {
  flex: 1;
}

/* ===== Rent/Sale Toggle ===== */
.rent-sale-toggle {
  display: flex;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.toggle-btn {
  flex: 1;
  padding: 12px;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #555;
  transition: all 0.3s ease;
}

.toggle-btn.active {
  background-color: #ffffff;
  color: #ff5a5f;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* ===== Filter Sections ===== */
.filter-section {
  margin-bottom: 25px;
}

.filter-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
}

.filter-dropdown {
  margin-bottom: 10px;
}

.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  color: #333;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6'%3E%3Cpath fill='%23666' d='M0 0l6 6 6-6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
}

/* ===== Property Types ===== */
.property-types {
  max-height: 200px;
  overflow-y: auto;
}

.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox-item input[type="checkbox"] {
  margin-right: 10px;
  accent-color: #ff5a5f;
}

.checkbox-item label {
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

/* ===== Price Range ===== */
.price-range-slider {
  margin-bottom: 15px;
}

.price-slider-container {
  position: relative;
  height: 5px;
  background-color: #ddd;
  border-radius: 5px;
  margin: 20px 0;
}

.slider-track {
  position: absolute;
  height: 100%;
  background-color: #ff5a5f;
  border-radius: 5px;
}

.price-slider {
  position: absolute;
  top: -7px;
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #ff5a5f;
  border-radius: 50%;
}

.price-inputs {
  display: flex;
  align-items: center;
}

.price-input-group {
  position: relative;
  flex: 1;
}

.price-symbol {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.price-input {
  width: 100%;
  padding: 8px 8px 8px 25px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.price-separator {
  margin: 0 10px;
  color: #999;
}

/* ===== Content Header ===== */
.breadcrumb {
  display: flex;
  font-size: 14px;
  margin-bottom: 15px;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
}

.breadcrumb-item.active {
  color: #333;
  font-weight: 500;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #ccc;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.sort-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-label {
  font-size: 14px;
  color: #666;
}

.sort-select {
  padding: 8px 30px 8px 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6'%3E%3Cpath fill='%23666' d='M0 0l6 6 6-6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
}

.map-view-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.map-view-btn:hover {
  color: #ff5a5f;
}

.results-count {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

/* ===== Properties Grid ===== */
.properties-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.property-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.property-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.property-card:hover .property-image {
  transform: scale(1.05);
}

.property-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.badge {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  color: white;
}

.badge.new {
  background-color: #2196f3;
}

.badge.featured {
  background-color: #ff5a5f;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.icon-heart {
  color: #ccc;
  font-size: 16px;
}

.icon-heart.is-favorite {
  color: #ff5a5f;
}

.property-details {
  padding: 15px;
}

.property-type {
  font-size: 12px;
  color: #ff5a5f;
  margin-bottom: 8px;
  font-weight: 500;
  text-transform: uppercase;
}

.property-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.property-location {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

.property-price {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}

.property-features {
  display: flex;
  gap: 15px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #666;
}

/* ===== Loading, Error, No Results ===== */
.loading-container,
.error-container,
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #ff5a5f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #ff5a5f;
  margin-bottom: 15px;
  font-size: 16px;
}

.retry-btn,
.reset-btn {
  padding: 10px 20px;
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.retry-btn:hover,
.reset-btn:hover {
  background-color: #ff4146;
}

.no-results-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

/* ===== Pagination ===== */
.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 30px;
}

.page-btn {
  min-width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #ff5a5f;
  color: #ff5a5f;
}

.page-btn.active {
  background-color: #ff5a5f;
  border-color: #ff5a5f;
  color: white;
}

.page-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.page-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 35px;
  height: 35px;
  font-size: 14px;
  color: #666;
}

/* ===== Icons ===== */
.icon-rent:before {
  content: "🏢";
  margin-right: 5px;
}

.icon-sale:before {
  content: "🏠";
  margin-right: 5px;
}

.icon-map:before {
  content: "🗺️";
  margin-right: 5px;
}

.icon-heart:before {
  content: "♡";
}

.icon-heart.is-favorite:before {
  content: "♥";
}

.icon-bed:before {
  content: "🛏️";
}

.icon-bath:before {
  content: "🚿";
}

.icon-area:before {
  content: "📏";
}

.icon-chevron-left:before {
  content: "←";
}

.icon-chevron-right:before {
  content: "→";
}

/* ===== Responsive Styles ===== */
@media (max-width: 1024px) {
  .properties-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .properties-layout {
    flex-direction: column;
  }
  
  .filters-column {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .content-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}

@media (max-width: 576px) {
  .properties-grid {
    grid-template-columns: 1fr;
  }
  
  .header-controls {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>