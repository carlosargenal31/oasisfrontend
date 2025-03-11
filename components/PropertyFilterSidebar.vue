<template>
  <aside class="filter-sidebar">
    <!-- Rent/Sale Toggle -->
    <div class="rent-sale-toggle">
      <button 
        @click="$emit('update:listingType', 'rent')"
        :class="['toggle-btn', listingType === 'rent' ? 'active' : '']"
      >
        <span class="icon-rent"></span>For rent
      </button>
      <button 
        @click="$emit('update:listingType', 'sale')"
        :class="['toggle-btn', listingType === 'sale' ? 'active' : '']"
      >
        <span class="icon-sale"></span>For sale
      </button>
    </div>
    
    <!-- Location -->
    <div class="filter-section">
      <h3 class="filter-title">Location</h3>
      <div class="form-group">
        <div class="select-wrapper">
          <select v-model="filters.city" class="form-select" @change="updateFilters">
            <option value="">Choose city</option>
            <option value="New York">New York</option>
            <option value="Chicago">Chicago</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Miami">Miami</option>
          </select>
          <div class="select-arrow"></div>
        </div>
      </div>
      <div class="form-group">
        <div class="select-wrapper">
          <select v-model="filters.district" class="form-select" @change="updateFilters">
            <option value="">Choose district</option>
            <option value="Downtown">Downtown</option>
            <option value="Midtown">Midtown</option>
            <option value="Brooklyn">Brooklyn</option>
            <option value="Queens">Queens</option>
            <option value="The Bronx">The Bronx</option>
          </select>
          <div class="select-arrow"></div>
        </div>
      </div>
    </div>
    
    <!-- Property Type -->
    <div class="filter-section">
      <h3 class="filter-title">Property type</h3>
      <div class="checkbox-list">
        <div v-for="type in propertyTypes" :key="type.value" class="checkbox-item">
          <input 
            type="checkbox" 
            :id="type.value" 
            :value="type.value" 
            v-model="filters.propertyTypes"
            class="checkbox-input"
            @change="updateFilters"
          >
          <label :for="type.value" class="checkbox-label">{{ type.label }}</label>
        </div>
      </div>
    </div>
    
    <!-- Price per month -->
    <div class="filter-section">
      <h3 class="filter-title">Price per month</h3>
      <div class="price-slider-container">
        <div class="price-value">${{ filters.minPrice }}</div>
        <div class="price-value price-value-right">${{ filters.maxPrice }}</div>
        
        <div class="slider-track">
          <div class="slider-fill" :style="{
            left: ((filters.minPrice - sliderMin) / (sliderMax - sliderMin)) * 100 + '%',
            width: ((filters.maxPrice - filters.minPrice) / (sliderMax - sliderMin)) * 100 + '%'
          }"></div>
        </div>
        
        <div class="slider-handle min-handle" :style="{
          left: ((filters.minPrice - sliderMin) / (sliderMax - sliderMin)) * 100 + '%'
        }"></div>
        
        <div class="slider-handle max-handle" :style="{
          left: ((filters.maxPrice - sliderMin) / (sliderMax - sliderMin)) * 100 + '%'
        }"></div>
        
        <input 
          type="range" 
          class="price-range min-range" 
          v-model.number="filters.minPrice" 
          :min="sliderMin" 
          :max="sliderMax" 
          step="100"
          @input="updateFilters"
        >
        <input 
          type="range" 
          class="price-range max-range" 
          v-model.number="filters.maxPrice" 
          :min="sliderMin" 
          :max="sliderMax" 
          step="100"
          @input="updateFilters"
        >
      </div>
      
      <div class="price-inputs">
        <div class="price-input-wrapper">
          <span class="price-currency">$</span>
          <input 
            type="text" 
            v-model.number="filters.minPrice" 
            class="price-input" 
            @change="updateFilters"
          >
        </div>
        <div class="price-separator">—</div>
        <div class="price-input-wrapper">
          <span class="price-currency">$</span>
          <input 
            type="text" 
            v-model.number="filters.maxPrice" 
            class="price-input" 
            @change="updateFilters"
          >
        </div>
      </div>
    </div>
    
    <!-- Beds & baths -->
    <div class="filter-section">
      <h3 class="filter-title">Beds & baths</h3>
      
      <div class="beds-baths-section">
        <h4 class="filter-subtitle">Bedrooms</h4>
        <div class="button-group">
          <button 
            v-for="option in bedroomOptions" 
            :key="option.value"
            type="button"
            class="option-button"
            :class="{ active: filters.bedrooms === option.value }"
            @click="selectBedrooms(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
      
      <div class="beds-baths-section">
        <h4 class="filter-subtitle">Bathrooms</h4>
        <div class="button-group">
          <button 
            v-for="option in bathroomOptions" 
            :key="option.value"
            type="button"
            class="option-button"
            :class="{ active: filters.bathrooms === option.value }"
            @click="selectBathrooms(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Square metres -->
    <div class="filter-section">
      <h3 class="filter-title">Square metres</h3>
      <div class="square-metres-inputs">
        <input 
          type="text" 
          v-model="filters.minArea" 
          class="area-input" 
          placeholder="Min"
          @change="updateFilters"
        >
        <div class="area-separator">—</div>
        <input 
          type="text" 
          v-model="filters.maxArea" 
          class="area-input" 
          placeholder="Max"
          @change="updateFilters"
        >
      </div>
    </div>
    
    <!-- Amenities -->
    <div class="filter-section">
      <h3 class="filter-title">Amenities</h3>
      <div class="checkbox-list">
        <div v-for="amenity in amenities" :key="amenity.value" class="checkbox-item">
          <input 
            type="checkbox" 
            :id="amenity.value" 
            :value="amenity.value" 
            v-model="filters.amenities"
            class="checkbox-input"
            @change="updateFilters"
          >
          <label :for="amenity.value" class="checkbox-label">{{ amenity.label }}</label>
        </div>
      </div>
    </div>
    
    <!-- Pets -->
    <div class="filter-section">
      <h3 class="filter-title">Pets</h3>
      <div class="checkbox-list">
        <div v-for="pet in petOptions" :key="pet.value" class="checkbox-item">
          <input 
            type="checkbox" 
            :id="pet.value" 
            :value="pet.value" 
            v-model="filters.pets"
            class="checkbox-input"
            @change="updateFilters"
          >
          <label :for="pet.value" class="checkbox-label">{{ pet.label }}</label>
        </div>
      </div>
    </div>
    
    <!-- Additional options -->
    <div class="filter-section">
      <h3 class="filter-title">Additional options</h3>
      <div class="checkbox-list">
        <div v-for="option in additionalOptions" :key="option.value" class="checkbox-item">
          <input 
            type="checkbox" 
            :id="option.value" 
            :value="option.value" 
            v-model="filters.additionalOptions"
            class="checkbox-input"
            @change="updateFilters"
          >
          <label :for="option.value" class="checkbox-label">{{ option.label }}</label>
        </div>
      </div>
    </div>
    
    <!-- Reset Filters Button -->
    <button class="reset-button" type="button" @click="resetFilters">
      Reset filters
    </button>
  </aside>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  listingType: {
    type: String,
    default: 'rent'
  },
  initialFilters: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:listingType', 'filter-changed']);

// Slider configuration
const sliderMin = ref(0);
const sliderMax = ref(5000);

// Property Types
const propertyTypes = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'room', label: 'Room' },
  { value: 'office', label: 'Office' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' }
];

// Bedroom options
const bedroomOptions = [
  { value: 'studio', label: 'Studio' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];

// Bathroom options
const bathroomOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' }
];

// Amenities
const amenities = [
  { value: 'air-conditioning', label: 'Air conditioning' },
  { value: 'balcony', label: 'Balcony' },
  { value: 'garage', label: 'Garage' },
  { value: 'gym', label: 'Gym' },
  { value: 'parking', label: 'Parking' },
  { value: 'pool', label: 'Pool' }
];

// Pet options
const petOptions = [
  { value: 'cats-allowed', label: 'Cats allowed' },
  { value: 'dogs-allowed', label: 'Dogs allowed' }
];

// Additional options
const additionalOptions = [
  { value: 'verified', label: 'Verified' },
  { value: 'featured', label: 'Featured' }
];

// Initialize filters with defaults
const filters = reactive({
  city: '',
  district: '',
  propertyTypes: [],
  minPrice: 1100,
  maxPrice: 3000,
  bedrooms: '',
  bathrooms: '',
  minArea: '',
  maxArea: '',
  amenities: [],
  pets: [],
  additionalOptions: []
});

// Watch for initialFilters prop changes
watch(() => props.initialFilters, (newFilters) => {
  // Merge initial filters with current model
  Object.keys(newFilters).forEach(key => {
    if (newFilters[key] !== undefined && newFilters[key] !== null) {
      filters[key] = newFilters[key];
    }
  });
}, { immediate: true, deep: true });

// Select bedrooms
const selectBedrooms = (value) => {
  filters.bedrooms = filters.bedrooms === value ? '' : value;
  updateFilters();
};

// Select bathrooms
const selectBathrooms = (value) => {
  filters.bathrooms = filters.bathrooms === value ? '' : value;
  updateFilters();
};

// Function to emit filter changes
const updateFilters = () => {
  // Ensure minPrice is not greater than maxPrice
  if (filters.minPrice > filters.maxPrice) {
    filters.minPrice = filters.maxPrice;
  }
  
  // Convert filter model to API format
  const apiFilters = {
    property_type: filters.propertyTypes.length === 1 ? filters.propertyTypes[0] : null,
    status: props.listingType === 'rent' ? 'for-rent' : 'for-sale',
    minPrice: filters.minPrice ? Number(filters.minPrice) : null,
    maxPrice: filters.maxPrice ? Number(filters.maxPrice) : null,
    bedrooms: filters.bedrooms || null,
    bathrooms: filters.bathrooms || null,
    city: filters.city || null,
    district: filters.district || null,
    minArea: filters.minArea ? Number(filters.minArea) : null,
    maxArea: filters.maxArea ? Number(filters.maxArea) : null,
    amenities: filters.amenities.length > 0 ? filters.amenities : null,
    pets: filters.pets.length > 0 ? filters.pets : null,
    verified: filters.additionalOptions.includes('verified'),
    featured: filters.additionalOptions.includes('featured')
  };
  
  emit('filter-changed', apiFilters);
};

// Reset filters to default
const resetFilters = () => {
  filters.city = '';
  filters.district = '';
  filters.propertyTypes = [];
  filters.minPrice = 1100;
  filters.maxPrice = 3000;
  filters.bedrooms = '';
  filters.bathrooms = '';
  filters.minArea = '';
  filters.maxArea = '';
  filters.amenities = [];
  filters.pets = [];
  filters.additionalOptions = [];
  
  updateFilters();
};
</script>

<style scoped>
.filter-sidebar {
  background-color: #fff;
  border-radius: 0;
  padding: 1.5rem;
  width: 100%;
  max-width: 100%;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-title {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
}

.filter-subtitle {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

/* Rent/Sale Toggle */
.rent-sale-toggle {
  display: flex;
  margin-bottom: 1.5rem;
  overflow: hidden;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.toggle-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: #666;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background-color: #fff;
  color: #ff5a5f;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.icon-rent::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff5a5f'%3E%3Cpath d='M12 2.5a5.5 5.5 0 0 0-5.5 5.5v6.5H5v-3H1.5V20H22v-8.5h-3.5v3h-1.5V8a5.5 5.5 0 0 0-5-5.5zm-3.5 5.5a3.5 3.5 0 0 1 7 0V14h-7V8z'/%3E%3C/svg%3E");
  background-size: cover;
}

.icon-sale::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff5a5f'%3E%3Cpath d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z'/%3E%3C/svg%3E");
  background-size: cover;
}

/* Form Group */
.form-group {
  margin-bottom: 0.75rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

/* Select styling */
.select-wrapper {
  position: relative;
  width: 100%;
}

.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #333;
  appearance: none;
  background-color: #fff;
  cursor: pointer;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #666;
  pointer-events: none;
}

/* Checkbox styling */
.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
}

.checkbox-input {
  margin-right: 0.5rem;
  cursor: pointer;
}

.checkbox-label {
  font-size: 0.875rem;
  color: #333;
  cursor: pointer;
}

/* Price Range Slider */
.price-slider-container {
  position: relative;
  height: 4px;
  margin: 2rem 0 1.5rem;
}

.price-value {
  position: absolute;
  top: -1.5rem;
  left: 0;
  font-size: 0.75rem;
  color: #666;
}

.price-value-right {
  left: auto;
  right: 0;
}

.slider-track {
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
}

.slider-fill {
  position: absolute;
  height: 4px;
  background-color: #ff5a5f;
  border-radius: 2px;
}

.slider-handle {
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #ff5a5f;
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.price-range {
  position: absolute;
  width: 100%;
  height: 20px;
  top: -8px;
  background: none;
  -webkit-appearance: none;
  appearance: none; /* Add this line */
  pointer-events: none;
  z-index: 2;
  opacity: 0;
}

.price-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff5a5f;
  cursor: pointer;
  pointer-events: auto;
}

.min-range {
  z-index: 3;
}

/* Price Inputs */
.price-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input-wrapper {
  position: relative;
  flex: 1;
}

.price-currency {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 0.875rem;
}

.price-input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #333;
}

.price-separator {
  color: #666;
  font-size: 0.875rem;
}

/* Beds & Baths */
.beds-baths-section {
  margin-bottom: 1rem;
}

.beds-baths-section:last-child {
  margin-bottom: 0;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.option-button {
  padding: 0.5rem 0.75rem;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-button.active {
  background-color: #ff5a5f;
  color: white;
  border-color: #ff5a5f;
}

/* Square Metres */
.square-metres-inputs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.area-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #333;
}

.area-separator {
  color: #666;
  font-size: 0.875rem;
}

/* Reset Button */
.reset-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #fff;
  border: 1px solid #ff5a5f;
  border-radius: 4px;
  color: #ff5a5f;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.reset-button:hover {
  background-color: #ff5a5f;
  color: white;
}
</style>