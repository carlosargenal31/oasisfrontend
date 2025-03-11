<template>
  <aside class="col-lg-4 col-xl-3 border-top-lg border-end-lg shadow-sm px-3 px-xl-4 px-xxl-5 pt-lg-2">
    <div class="offcanvas-lg offcanvas-start" id="filters-sidebar">
      <!-- Mobile Header (visible only on small screens) -->
      <div class="offcanvas-header d-flex d-lg-none align-items-center">
        <h2 class="h5 mb-0">Filters</h2>
        <button class="btn-close" type="button" data-bs-dismiss="offcanvas" data-bs-target="#filters-sidebar"></button>
      </div>
      
      <!-- Rent/Sale Toggle -->
      <div class="offcanvas-header d-block border-bottom pt-0 pt-lg-4 px-lg-0">
        <ul class="nav nav-tabs mb-0">
          <li class="nav-item">
            <a 
              class="nav-link d-flex align-items-center" 
              :class="{ 'active': listingType === 'rent' }"
              @click.prevent="$emit('update:listing-type', 'rent')"
              href="#"
            >
              <i class="fi-rent fs-base me-2"></i>For rent
            </a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link d-flex align-items-center" 
              :class="{ 'active': listingType === 'sale' }"
              @click.prevent="$emit('update:listing-type', 'sale')"
              href="#"
            >
              <i class="fi-home fs-base me-2"></i>For sale
            </a>
          </li>
        </ul>
      </div>
      
      <!-- Filter Content -->
      <div class="offcanvas-body py-lg-4">
        <!-- Location -->
        <div class="pb-4 mb-2">
          <h3 class="h6">Location</h3>
          <select class="form-select mb-2" v-model="filters.city" @change="updateFilters">
            <option value="">Choose city</option>
            <option value="New York">New York</option>
            <option value="Chicago">Chicago</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Miami">Miami</option>
          </select>
          <select class="form-select" v-model="filters.district" @change="updateFilters">
            <option value="">Choose district</option>
            <option value="Downtown">Downtown</option>
            <option value="Midtown">Midtown</option>
            <option value="Brooklyn">Brooklyn</option>
            <option value="Queens">Queens</option>
            <option value="The Bronx">The Bronx</option>
          </select>
        </div>
        
        <!-- Property Type -->
        <div class="pb-4 mb-2">
          <h3 class="h6">Property type</h3>
          <div class="overflow-auto" style="max-height: 11rem;">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="house" v-model="filters.propertyTypes" value="house" @change="updatePropertyTypeFilters">
              <label class="form-check-label fs-sm" for="house">House</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="apartment" v-model="filters.propertyTypes" value="apartment" checked @change="updatePropertyTypeFilters">
              <label class="form-check-label fs-sm" for="apartment">Apartment</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="room" v-model="filters.propertyTypes" value="room" @change="updatePropertyTypeFilters">
              <label class="form-check-label fs-sm" for="room">Room</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="office" v-model="filters.propertyTypes" value="office" @change="updatePropertyTypeFilters">
              <label class="form-check-label fs-sm" for="office">Office</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="commercial" v-model="filters.propertyTypes" value="commercial" @change="updatePropertyTypeFilters">
              <label class="form-check-label fs-sm" for="commercial">Commercial</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="land" v-model="filters.propertyTypes" value="land" @change="updatePropertyTypeFilters">
              <label class="form-check-label fs-sm" for="land">Land</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="daily" v-model="filters.propertyTypes" value="daily-rental" @change="updatePropertyTypeFilters">
              <label class="form-check-label fs-sm" for="daily">Daily rental</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="new-building" v-model="filters.propertyTypes" value="new-building" @change="updatePropertyTypeFilters">
              <label class="form-check-label fs-sm" for="new-building">New building</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="parking-lot" v-model="filters.propertyTypes" value="parking-lot" @change="updatePropertyTypeFilters">
              <label class="form-check-label fs-sm" for="parking-lot">Parking lot</label>
            </div>
          </div>
        </div>
        
        <!-- Price Range -->
        <div class="pb-4 mb-2">
          <h3 class="h6">{{ listingType === 'rent' ? 'Price per month' : 'Property price' }}</h3>
          
          <!-- Price Slider -->
          <Slider class="mb-4" v-model="priceRange" :min="sliderMin" :max="sliderMax" :step="100" :format="{prefix: '$', decimals: 0 }" />
          
          <div class="d-flex align-items-center">
            <div class="w-50 pe-2">
              <div class="input-group">
                <span class="input-group-text fs-base">$</span>
                <input 
                  class="form-control range-slider-value-min" 
                  type="text" 
                  v-model.number="filters.minPrice"
                  @change="updateFilters"
                >
              </div>
            </div>
            <div class="text-muted">&mdash;</div>
            <div class="w-50 ps-2">
              <div class="input-group">
                <span class="input-group-text fs-base">$</span>
                <input 
                  class="form-control range-slider-value-max" 
                  type="text" 
                  v-model.number="filters.maxPrice"
                  @change="updateFilters"
                >
              </div>
            </div>
          </div>
        </div>
        
        <!-- Beds & Baths -->
        <div class="pb-4 mb-2">
          <h3 class="h6 pt-1">Beds &amp; baths</h3>
          
          <!-- Bedrooms -->
          <label class="d-block fs-sm mb-1">Bedrooms</label>
          <div class="btn-group btn-group-sm" role="group" aria-label="Choose number of bedrooms">
            <input class="btn-check" type="radio" id="studio" name="bedrooms" v-model="filters.bedrooms" value="studio" @change="updateFilters">
            <label class="btn btn-outline-secondary fw-normal" for="studio">Studio</label>
            
            <input class="btn-check" type="radio" id="bedrooms-1" name="bedrooms" v-model="filters.bedrooms" value="1" @change="updateFilters">
            <label class="btn btn-outline-secondary fw-normal" for="bedrooms-1">1</label>
            
            <input class="btn-check" type="radio" id="bedrooms-2" name="bedrooms" v-model="filters.bedrooms" value="2" @change="updateFilters">
            <label class="btn btn-outline-secondary fw-normal" for="bedrooms-2">2</label>
            
            <input class="btn-check" type="radio" id="bedrooms-3" name="bedrooms" v-model="filters.bedrooms" value="3" @change="updateFilters">
            <label class="btn btn-outline-secondary fw-normal" for="bedrooms-3">3</label>
            
            <input class="btn-check" type="radio" id="bedrooms-4" name="bedrooms" v-model="filters.bedrooms" value="4+" @change="updateFilters">
            <label class="btn btn-outline-secondary fw-normal" for="bedrooms-4">4+</label>
          </div>
          
          <!-- Bathrooms -->
          <label class="d-block fs-sm pt-2 my-1">Bathrooms</label>
          <div class="btn-group btn-group-sm" role="group" aria-label="Choose number of bathrooms">
            <input class="btn-check" type="radio" id="bathrooms-1" name="bathrooms" v-model="filters.bathrooms" value="1" @change="updateFilters">
            <label class="btn btn-outline-secondary fw-normal" for="bathrooms-1">1</label>
            
            <input class="btn-check" type="radio" id="bathrooms-2" name="bathrooms" v-model="filters.bathrooms" value="2" @change="updateFilters">
            <label class="btn btn-outline-secondary fw-normal" for="bathrooms-2">2</label>
            
            <input class="btn-check" type="radio" id="bathrooms-3" name="bathrooms" v-model="filters.bathrooms" value="3" @change="updateFilters">
            <label class="btn btn-outline-secondary fw-normal" for="bathrooms-3">3</label>
            
            <input class="btn-check" type="radio" id="bathrooms-4" name="bathrooms" v-model="filters.bathrooms" value="4" @change="updateFilters">
            <label class="btn btn-outline-secondary fw-normal" for="bathrooms-4">4</label>
          </div>
        </div>
        
        <!-- Square Metres -->
        <div class="pb-4 mb-2">
          <h3 class="h6 pt-1">Square metres</h3>
          <div class="d-flex align-items-center">
            <input 
              class="form-control w-100" 
              type="number" 
              min="20" 
              max="500" 
              step="10" 
              placeholder="Min"
              v-model="filters.minArea"
              @change="updateFilters"
            >
            <div class="mx-2">&mdash;</div>
            <input 
              class="form-control w-100" 
              type="number" 
              min="20" 
              max="500" 
              step="10" 
              placeholder="Max"
              v-model="filters.maxArea"
              @change="updateFilters"
            >
          </div>
        </div>
        
        <!-- Amenities -->
        <div class="pb-4 mb-2">
          <h3 class="h6">Amenities</h3>
          <div class="overflow-auto" style="max-height: 11rem;">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="air-condition" v-model="filters.amenities" value="air-conditioning" checked @change="updateFilters">
              <label class="form-check-label fs-sm" for="air-condition">Air conditioning</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="balcony" v-model="filters.amenities" value="balcony" @change="updateFilters">
              <label class="form-check-label fs-sm" for="balcony">Balcony</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="garage" v-model="filters.amenities" value="garage" checked @change="updateFilters">
              <label class="form-check-label fs-sm" for="garage">Garage</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gym" v-model="filters.amenities" value="gym" @change="updateFilters">
              <label class="form-check-label fs-sm" for="gym">Gym</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="parking" v-model="filters.amenities" value="parking" @change="updateFilters">
              <label class="form-check-label fs-sm" for="parking">Parking</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="pool" v-model="filters.amenities" value="pool" @change="updateFilters">
              <label class="form-check-label fs-sm" for="pool">Pool</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="camera" v-model="filters.amenities" value="security-cameras" @change="updateFilters">
              <label class="form-check-label fs-sm" for="camera">Security cameras</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="wifi" v-model="filters.amenities" value="wifi" checked @change="updateFilters">
              <label class="form-check-label fs-sm" for="wifi">WiFi</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="laundry" v-model="filters.amenities" value="laundry" @change="updateFilters">
              <label class="form-check-label fs-sm" for="laundry">Laundry</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="dishwasher" v-model="filters.amenities" value="dishwasher" @change="updateFilters">
              <label class="form-check-label fs-sm" for="dishwasher">Dishwasher</label>
            </div>
          </div>
        </div>
        
        <!-- Pets -->
        <div class="pb-4 mb-2">
          <h3 class="h6">Pets</h3>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="allow-cats" v-model="filters.pets" value="cats-allowed" @change="updateFilters">
            <label class="form-check-label fs-sm" for="allow-cats">Cats allowed</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="allow-dogs" v-model="filters.pets" value="dogs-allowed" @change="updateFilters">
            <label class="form-check-label fs-sm" for="allow-dogs">Dogs allowed</label>
          </div>
        </div>
        
        <!-- Additional Options -->
        <div class="pb-4 mb-2">
          <h3 class="h6">Additional options</h3>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="verified" v-model="filters.additionalOptions" value="verified" @change="updateFilters">
            <label class="form-check-label fs-sm" for="verified">Verified</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="featured" v-model="filters.additionalOptions" value="featured" @change="updateFilters">
            <label class="form-check-label fs-sm" for="featured">Featured</label>
          </div>
        </div>
        
        <!-- Reset Filters Button -->
        <div class="border-top py-4">
          <button class="btn btn-outline-primary" type="button" @click="resetFilters">
            <i class="fi-rotate-right me-2"></i>Reset filters
          </button>
        </div>
      </div>
    </div>
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

const emit = defineEmits(['update:listing-type', 'filter-changed']);

// Slider configuration
const sliderMin = ref(0);
const sliderMax = ref(props.listingType === 'rent' ? 5000 : 1000000);
const priceRange = ref([1100, 3000]);

// Watch for listing type changes to adjust price range
watch(() => props.listingType, (newValue) => {
  if (newValue === 'rent') {
    sliderMax.value = 5000;
    if (filters.maxPrice > 5000) {
      filters.maxPrice = 5000;
    }
  } else {
    sliderMax.value = 1000000;
    if (filters.maxPrice < 10000) {
      filters.maxPrice = 250000;
      filters.minPrice = 90000;
    }
  }
  priceRange.value = [filters.minPrice, filters.maxPrice];
});

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
  amenities: ['air-conditioning', 'wifi'],
  pets: [],
  additionalOptions: []
});

// Watch for changes in price range to update filters
watch(priceRange, (newValue) => {
  filters.minPrice = newValue[0];
  filters.maxPrice = newValue[1];
  updateFilters();
});

// Watch for initialFilters prop changes
watch(() => props.initialFilters, (newFilters) => {
  // Merge initial filters with current model
  Object.keys(newFilters).forEach(key => {
    if (newFilters[key] !== undefined && newFilters[key] !== null) {
      filters[key] = newFilters[key];
    }
  });
  
  // Update price range slider
  priceRange.value = [filters.minPrice, filters.maxPrice];
}, { immediate: true, deep: true });

// Update property type filters
const updatePropertyTypeFilters = () => {
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
  
  if (props.listingType === 'rent') {
    filters.minPrice = 1100;
    filters.maxPrice = 3000;
  } else {
    filters.minPrice = 90000;
    filters.maxPrice = 250000;
  }
  
  filters.bedrooms = '';
  filters.bathrooms = '';
  filters.minArea = '';
  filters.maxArea = '';
  filters.amenities = ['air-conditioning', 'wifi'];
  filters.pets = [];
  filters.additionalOptions = [];
  
  // Update price range slider
  priceRange.value = [filters.minPrice, filters.maxPrice];
  
  updateFilters();
};
</script>

<style scoped>
/* Reset button styles */
.btn-outline-primary {
  color: #fd5631;
  border-color: #fd5631;
}

.btn-outline-primary:hover {
  background-color: #fd5631;
  color: white;
}

/* Radio button group styles */
.btn-outline-secondary {
  border-color: #dfe2e6;
  color: #5d6974;
}

.btn-check:checked + .btn-outline-secondary {
  background-color: #fd5631;
  border-color: #fd5631;
  color: white;
}

/* Icons */
.fi-rent::before {
  content: "🏢";
  font-size: 18px;
}

.fi-home::before {
  content: "🏠";
  font-size: 18px;
}

.fi-rotate-right::before {
  content: "↻";
}

/* Responsive styles */
@media (max-width: 991.98px) {
  .offcanvas-lg {
    position: fixed;
    bottom: 0;
    z-index: 1045;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    visibility: hidden;
    background-color: white;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }
  
  .offcanvas-lg.show {
    transform: translateX(0);
    visibility: visible;
  }
}

@media (min-width: 992px) {
  .offcanvas-lg {
    position: static;
    display: block !important;
    transform: none !important;
    width: auto !important;
    height: auto !important;
    visibility: visible !important;
  }
}
</style>