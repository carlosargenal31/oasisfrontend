<template>
  <div class="main-container bg-white">
    <div class="properties-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="properties-layout flex flex-col md:flex-row gap-6 pt-20 pb-10">
        <!-- Left Sidebar with Filters -->
        <div class="filters-column w-full md:w-72 flex-shrink-0 bg-white pb-6">
          <!-- Rent/Sale Toggle -->
          <div class="rent-sale-toggle flex mb-5">
            <button 
              class="toggle-btn flex-1 py-3 px-4 text-center active bg-blue-100 text-blue-600 font-medium rounded-l-md"
            >
              <svg class="inline-block mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-4h4v-2h-4V7h-2v4H8v2h4z" fill="currentColor"/>
              </svg>
              For rent
            </button>
            <button 
              @click="navigateToSale"
              class="toggle-btn flex-1 py-3 px-4 text-center text-gray-500 bg-gray-100 font-medium rounded-r-md"
            >
              <svg class="inline-block mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill="currentColor"/>
              </svg>
              For sale
            </button>
          </div>
          
          <!-- Location -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Location</h3>
            <div class="mb-3">
              <select v-model="filters.city" class="form-select w-full rounded-md border border-gray-300 py-2 px-3 text-black" @change="handleFilterChange">
                <option value="">Choose city</option>
                <option value="New York">New York</option>
                <option value="Chicago">Chicago</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Miami">Miami</option>
              </select>
            </div>
            <div>
              <select v-model="filters.district" class="form-select w-full rounded-md border border-gray-300 py-2 px-3 text-black" @change="handleFilterChange">
                <option value="">Choose district</option>
                <option value="Downtown">Downtown</option>
                <option value="Midtown">Midtown</option>
                <option value="Brooklyn">Brooklyn</option>
                <option value="Queens">Queens</option>
                <option value="The Bronx">The Bronx</option>
              </select>
            </div>
          </div>
          
          <!-- Property Type -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Property type</h3>
            <div class="property-types overflow-y-auto max-h-48">
              <div v-for="type in propertyTypes" :key="type.value" class="checkbox-item flex items-center mb-2">
                <input 
                  type="checkbox" 
                  :id="type.value" 
                  :value="type.value" 
                  v-model="selectedPropertyTypes"
                  @change="updatePropertyTypeFilters"
                  class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                >
                <label :for="type.value" class="ml-2 text-sm text-black">{{ type.label }}</label>
              </div>
            </div>
          </div>
          
          <!-- Price Range Component -->
          <PriceSlider 
            :is-rent="true"
            :initial-min-price="filters.minPrice"
            :initial-max-price="filters.maxPrice"
            @update:price="updatePriceRange"
          />
          
          <!-- Bedrooms -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Bedrooms</h3>
            <div class="flex space-x-2">
              <label 
                v-for="option in ['Studio', '1', '2', '3', '4+']" 
                :key="option"
                :class="[
                  'flex-1 py-2 px-2 text-center rounded-full border cursor-pointer text-sm',
                  filters.bedrooms === option.toLowerCase() 
                    ? 'border-blue-500 text-white bg-blue-500' 
                    : 'border-gray-300 text-gray-700 bg-white hover:border-blue-500'
                ]"
              >
                <input 
                  type="radio" 
                  :value="option.toLowerCase()" 
                  v-model="filters.bedrooms"
                  @change="handleFilterChange"
                  class="sr-only"
                >
                {{ option }}
              </label>
            </div>
          </div>
          
          <!-- Bathrooms -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Bathrooms</h3>
            <div class="flex space-x-2">
              <label 
                v-for="option in ['1', '2', '3', '4']" 
                :key="option"
                :class="[
                  'flex-1 py-2 px-2 text-center rounded-full border cursor-pointer text-sm',
                  filters.bathrooms === option 
                    ? 'border-blue-500 text-white bg-blue-500' 
                    : 'border-gray-300 text-gray-700 bg-white hover:border-blue-500'
                ]"
              >
                <input 
                  type="radio" 
                  :value="option" 
                  v-model="filters.bathrooms"
                  @change="handleFilterChange"
                  class="sr-only"
                >
                {{ option }}
              </label>
            </div>
          </div>
          
          <!-- Square Meters -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Square meters</h3>
            <div class="flex items-center">
              <input 
                type="number" 
                v-model="filters.minArea" 
                @change="handleFilterChange"
                placeholder="Min"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-black font-medium"
              >
              <span class="mx-3 text-gray-500">—</span>
              <input 
                type="number" 
                v-model="filters.maxArea" 
                @change="handleFilterChange"
                placeholder="Max"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-black font-medium"
              >
            </div>
          </div>
          
          <!-- Amenities -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Amenities</h3>
            <div class="amenities-list overflow-y-auto max-h-48">
              <div v-for="amenity in amenities" :key="amenity.value" class="checkbox-item flex items-center mb-2">
                <input 
                  type="checkbox" 
                  :id="amenity.value" 
                  :value="amenity.value" 
                  v-model="filters.amenities"
                  @change="handleFilterChange"
                  class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                >
                <label :for="amenity.value" class="ml-2 text-sm text-black">{{ amenity.label }}</label>
              </div>
            </div>
          </div>
          
          <!-- Pets -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Pets</h3>
            <div class="pets-list">
              <div v-for="pet in petOptions" :key="pet.value" class="checkbox-item flex items-center mb-2">
                <input 
                  type="checkbox" 
                  :id="pet.value" 
                  :value="pet.value" 
                  v-model="filters.pets"
                  @change="handleFilterChange"
                  class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                >
                <label :for="pet.value" class="ml-2 text-sm text-black">{{ pet.label }}</label>
              </div>
            </div>
          </div>
          
          <!-- Additional Options -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Additional options</h3>
            <div class="options-list">
              <div v-for="option in additionalOptions" :key="option.value" class="checkbox-item flex items-center mb-2">
                <input 
                  type="checkbox" 
                  :id="option.value" 
                  :value="option.value" 
                  v-model="filters.additionalOptions"
                  @change="handleFilterChange"
                  class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                >
                <label :for="option.value" class="ml-2 text-sm text-black">{{ option.label }}</label>
              </div>
            </div>
          </div>
          
          <!-- Reset Filters Button -->
          <button 
            @click="resetFilters" 
            class="reset-button w-full flex items-center justify-center py-3 px-4 border border-red-400 rounded-md bg-white text-red-500 hover:bg-red-50 transition"
          >
            <svg class="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16c1.671 0 3-1.329 3-3s-1.329-3-3-3-3 1.329-3 3 1.329 3 3 3z M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.182V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" fill="currentColor"/>
            </svg>
            Reset filters
          </button>
        </div>

        <!-- Main Content Area -->
        <div class="content-column flex-1">
          <!-- Breadcrumb -->
          <div class="breadcrumb flex items-center mb-4 text-sm">
            <a href="/" class="text-gray-600 hover:text-blue-500">Home</a>
            <span class="mx-2 text-gray-500">›</span>
            <span class="text-black">Property for rent</span>
          </div>
          
          <!-- Page Title -->
          <h1 class="text-2xl font-bold text-black mb-4">Property for rent</h1>
          
          <!-- Controls and Sorting -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-2">
              <span class="text-gray-500">Sort by:</span>
              <select 
                v-model="sortBy" 
                class="sort-select py-1 px-3 border border-gray-300 rounded-md bg-white text-black"
                @change="handleSortChange"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <!-- Results Count -->
          <div class="results-count text-gray-600 mb-4">
            {{ propertyStore.totalProperties }} results
          </div>
          
          <!-- Loading State -->
          <div v-if="propertyStore.loading" class="flex justify-center items-center py-20">
            <div class="spinner border-4 border-gray-200 border-t-blue-500 rounded-full w-10 h-10 animate-spin"></div>
          </div>
          
          <!-- Properties Grid -->
          <div v-else-if="!propertyStore.error && propertyStore.properties.length > 0" class="properties-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Property Card -->
            <div 
              v-for="property in sortedProperties" 
              :key="property.id" 
              class="property-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
              @mouseenter="hoveredPropertyId = property.id"
              @mouseleave="hoveredPropertyId = null"
            >
              <!-- Property Image -->
              <div class="property-image-container relative">
                <img 
                  :src="property.image || 'https://placehold.co/600x400?text=No+Image'" 
                  :alt="property.title" 
                  class="property-image w-full h-48 object-cover"
                >
                
                <!-- Badges -->
                <div class="property-badges absolute top-3 left-3">
                  <span v-if="property.isVerified" class="badge bg-green-500 text-white text-xs font-medium px-2 py-1 rounded block mb-1">Verified</span>
                  <span v-if="property.isNew" class="badge bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded block">NEW</span>
                </div>
                
                <!-- Favorite Button - Only visible on hover -->
                <button 
                  v-show="hoveredPropertyId === property.id || propertyStore.favorites.includes(property.id)"
                  @click.stop="toggleFavorite(property.id)" 
                  class="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    :class="propertyStore.favorites.includes(property.id) ? 'text-blue-500' : 'text-gray-400'"
                  >
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              
              <!-- Property Details -->
              <div @click="navigateToProperty(property.id)" class="cursor-pointer">
                <!-- For Rent Label - Keep this in red -->
                <div class="uppercase text-sm font-medium text-red-500 pt-4 px-4">
                  FOR RENT
                </div>
                
                <!-- Title and Area -->
                <h3 class="font-medium text-black px-4 mt-1">
                  {{ property.title }} | {{ property.square_feet }} sq.m
                </h3>
                
                <!-- Address -->
                <p class="text-sm text-gray-600 px-4 mt-1">{{ property.address }}</p>
                
                <!-- Price -->
                <div class="flex items-center px-4 mt-2 mb-4">
                  <svg class="mr-2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.52 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z" fill="currentColor"/>
                  </svg>
                  <span class="font-bold text-black">${{ formatPrice(property.price) }}</span>
                  <span class="text-sm text-gray-600 ml-1">/month</span>
                </div>
                
                <!-- Features -->
                <div class="grid grid-cols-3 border-t border-gray-200 text-sm text-gray-700">
                  <div class="flex items-center justify-center py-2">
                    <span class="mr-1">{{ property.bedrooms }}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 13C8.66 13 10 11.66 10 10C10 8.34 8.66 7 7 7C5.34 7 4 8.34 4 10C4 11.66 5.34 13 7 13ZM19 7H11V14H3V7H1V20H3V17H21V20H23V11C23 8.79 21.21 7 19 7Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div class="flex items-center justify-center py-2 border-l border-r border-gray-200">
                    <span class="mr-1">{{ property.bathrooms }}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 7C7 5.9 6.1 5 5 5C3.9 5 3 5.9 3 7H7ZM9 3C9 1.9 8.1 1 7 1C5.9 1 5 1.9 5 3H9ZM15 3C15 1.9 14.1 1 13 1C11.9 1 11 1.9 11 3H15ZM21 3C21 1.9 20.1 1 19 1C17.9 1 17 1.9 17 3H21ZM23 21H21V19H19V21H17V19H15V21H13V19H11V21H9V19H7V21H5V19H3V21H1V17H23V21ZM21 15H3V9H21V15Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div class="flex items-center justify-center py-2">
                    <span class="mr-1">{{ property.parkingSpaces || 0 }}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.29 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.5 16C5.67 16 5 15.33 5 14.5C5 13.67 5.67 13 6.5 13C7.33 13 8 13.67 8 14.5C8 15.33 7.33 16 6.5 16ZM17.5 16C16.67 16 16 15.33 16 14.5C16 13.67 16.67 13 17.5 13C18.33 13 19 13.67 19 14.5C19 15.33 18.33 16 17.5 16ZM5 11L6.5 6.5H17.5L19 11H5Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- No Results -->
          <div v-else-if="!propertyStore.error && propertyStore.properties.length === 0" class="flex flex-col items-center justify-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="text-gray-400 mb-4" viewBox="0 0 24 24">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
            <h3 class="text-lg font-medium text-black mb-2">No properties found</h3>
            <p class="text-gray-600 mb-4">Try adjusting your search criteria</p>
            <button 
              @click="resetFilters" 
              class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Reset Filters
            </button>
          </div>
          
          <!-- Error State -->
          <div v-else-if="propertyStore.error" class="flex flex-col items-center justify-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="text-blue-500 mb-4" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <p class="text-blue-500 font-medium mb-4">{{ propertyStore.error }}</p>
            <button 
              @click="fetchProperties" 
              class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Try Again
            </button>
          </div>
          
          <!-- Pagination -->
          <div v-if="totalPages > 1 && !propertyStore.loading" class="pagination flex justify-center mt-8">
            <button 
              class="page-btn border border-gray-300 rounded-md w-10 h-10 flex items-center justify-center mx-1" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              :disabled="currentPage === 1" 
              @click="changePage(currentPage - 1)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            
            <template v-for="page in pageNumbers" :key="page">
              <span v-if="page === '...'" class="page-ellipsis flex items-center justify-center w-10 h-10 mx-1">...</span>
              <button 
                v-else 
                class="page-btn border rounded-md w-10 h-10 flex items-center justify-center mx-1" 
                :class="currentPage === page ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-700'"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </template>
            
            <button 
              class="page-btn border border-gray-300 rounded-md w-10 h-10 flex items-center justify-center mx-1" 
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
              :disabled="currentPage === totalPages" 
              @click="changePage(currentPage + 1)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Map Component -->
    <PropertyMap 
      :isVisible="showMap" 
      :properties="propertyStore.properties" 
      @close="toggleMapView" 
    />
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted, nextTick, onUnmounted } from 'vue';
import { usePropertyStore } from '~/store/property';
import { useRoute, useRouter } from 'vue-router';
import PropertyMap from '~/components/PropertyMap.vue';
import PriceSlider from '~/components/PriceSlider.vue';

// Initialize stores and router
const propertyStore = usePropertyStore();
const route = useRoute();
const router = useRouter();

// UI state
const sortBy = ref('newest');
const currentPage = ref(1);
const itemsPerPage = ref(9);
const hoveredPropertyId = ref(null);
const showMap = ref(false);

// Property Types
const propertyTypes = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'room', label: 'Room' },
  { value: 'office', label: 'Office' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land' },
  { value: 'daily-rental', label: 'Daily rental' },
  { value: 'new-building', label: 'New building' },
  { value: 'parking-lot', label: 'Parking lot' }
];

// Amenities options
const amenities = [
  { value: 'air-conditioning', label: 'Air conditioning' },
  { value: 'balcony', label: 'Balcony' },
  { value: 'garage', label: 'Garage' },
  { value: 'gym', label: 'Gym' },
  { value: 'parking', label: 'Parking' },
  { value: 'pool', label: 'Pool' },
  { value: 'security-cameras', label: 'Security cameras' },
  { value: 'wifi', label: 'WiFi' },
  { value: 'laundry', label: 'Laundry' },
  { value: 'dishwasher', label: 'Dishwasher' }
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

// Selected property types for multi-select
const selectedPropertyTypes = ref([]);

// Filters
const filters = ref({
  city: '',
  district: '',
  property_type: null,
  minPrice: 200,
  maxPrice: 5000,
  bedrooms: '',
  bathrooms: '',
  minArea: '',
  maxArea: '',
  amenities: [],
  pets: [],
  additionalOptions: [],
  status: 'for-rent' // Siempre en modo alquiler para esta página
});

// Navegación a la página de propiedades en venta
const navigateToSale = () => {
  router.push('/properties/sale');
};

// Update property type filters
const updatePropertyTypeFilters = () => {
  if (selectedPropertyTypes.value.length === 1) {
    filters.value.property_type = selectedPropertyTypes.value[0];
  } else if (selectedPropertyTypes.value.length > 1) {
    // Handle multiple selected types
    filters.value.property_type = selectedPropertyTypes.value;
  } else {
    filters.value.property_type = null;
  }
  handleFilterChange();
};

// Actualizar rango de precios desde el slider
const updatePriceRange = ({ min, max }) => {
  filters.value.minPrice = min;
  filters.value.maxPrice = max;
  handleFilterChange();
};

// Handle filter changes
const handleFilterChange = () => {
  currentPage.value = 1;
  
  // Convert bedrooms filter from "studio" to 0 for API compatibility
  let apiFilters = { ...filters.value };
  if (apiFilters.bedrooms === 'studio') {
    apiFilters.minBedrooms = 0;
    delete apiFilters.bedrooms;
  } else if (apiFilters.bedrooms) {
    apiFilters.minBedrooms = parseInt(apiFilters.bedrooms);
    delete apiFilters.bedrooms;
  }
  
  // Convert bathrooms filter for API compatibility
  if (apiFilters.bathrooms) {
    apiFilters.minBathrooms = parseInt(apiFilters.bathrooms);
    delete apiFilters.bathrooms;
  }
  
  // Process additional options
  if (apiFilters.additionalOptions && apiFilters.additionalOptions.length > 0) {
    apiFilters.verified = apiFilters.additionalOptions.includes('verified');
    apiFilters.featured = apiFilters.additionalOptions.includes('featured');
    delete apiFilters.additionalOptions;
  }
  
  propertyStore.setFilters(apiFilters);
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
    sort: sortBy.value,
    page: currentPage.value
  };
  
  // Add non-empty filters to query
  Object.entries(filters.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '' && 
        !(Array.isArray(value) && value.length === 0) && 
        key !== 'status') { // No necesitamos pasar status a la URL para esta página
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
  selectedPropertyTypes.value = [];
  
  filters.value = { 
    status: 'for-rent', // Siempre en modo alquiler para esta página
    city: '',
    district: '',
    property_type: null,
    minPrice: 200,
    maxPrice: 5000,
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    maxArea: '',
    amenities: [],
    pets: [],
    additionalOptions: []
  };
  
  propertyStore.clearFilters();
  propertyStore.setFilters({ 
    status: 'for-rent',
  });
  
  currentPage.value = 1;
  updateQueryParams();
  fetchProperties();
};

// Toggle favorite status for a property
const toggleFavorite = (propertyId) => {
  propertyStore.toggleFavorite(propertyId);
};

// Navigate to property detail page
const navigateToProperty = (propertyId) => {
  console.log("Navigating to property:", propertyId);
  router.push(`/properties/${propertyId}`);
};

// Toggle map view
const toggleMapView = () => {
  showMap.value = !showMap.value;
  
  if (showMap.value) {
    // Prevent scrolling on body when map is open
    document.body.style.overflow = 'hidden';
  } else {
    // Restore scrolling when map is closed
    document.body.style.overflow = '';
  }
};

// Format price with commas
const formatPrice = (price) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Handle escape key to close map
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && showMap.value) {
    toggleMapView();
  }
};

// Initialize filters from URL query parameters
const initFromQueryParams = () => {
  const query = route.query;
  
  // Set sorting from query
  if (query.sort && ['newest', 'price-low', 'price-high'].includes(query.sort)) {
    sortBy.value = query.sort;
  }
  
  // Set page from query
  if (query.page && !isNaN(parseInt(query.page))) {
    currentPage.value = parseInt(query.page);
  }
  
  // Set property type from query
  if (query.property_type) {
    if (typeof query.property_type === 'string') {
      filters.value.property_type = query.property_type;
      selectedPropertyTypes.value = [query.property_type];
    } else if (Array.isArray(query.property_type)) {
      filters.value.property_type = query.property_type;
      selectedPropertyTypes.value = query.property_type;
    }
  }
  
  // Set other filters from query
  if (query.city) filters.value.city = query.city;
  if (query.district) filters.value.district = query.district;
  
  if (query.minPrice) filters.value.minPrice = parseInt(query.minPrice);
  if (query.maxPrice) filters.value.maxPrice = parseInt(query.maxPrice);
  
  if (query.bedrooms) filters.value.bedrooms = query.bedrooms;
  if (query.bathrooms) filters.value.bathrooms = query.bathrooms;
  
  if (query.minArea) filters.value.minArea = parseInt(query.minArea);
  if (query.maxArea) filters.value.maxArea = parseInt(query.maxArea);
  
  // Parse amenities and pets if they are in the URL
  if (query.amenities) {
    const amenitiesArray = Array.isArray(query.amenities) ? query.amenities : [query.amenities];
    filters.value.amenities = amenitiesArray;
  }
  
  if (query.pets) {
    const petsArray = Array.isArray(query.pets) ? query.pets : [query.pets];
    filters.value.pets = petsArray;
  }
  
  // Parse additional options
  if (query.verified === 'true') {
    filters.value.additionalOptions.push('verified');
  }
  
  if (query.featured === 'true') {
    filters.value.additionalOptions.push('featured');
  }
};

// Apply color fixes for consistent styling
const applyTitleColorFix = () => {
  nextTick(() => {
    // Fix text colors for titles and headings to ensure they're black
    document.querySelectorAll('h1, h2, h3.filter-title').forEach(el => {
      el.style.color = '#000000';
    });
    
    // Ensure property titles are black
    document.querySelectorAll('.property-card h3').forEach(el => {
      el.style.color = '#000000';
    });
    
    // Ensure price text is black
    document.querySelectorAll('.property-card .font-bold').forEach(el => {
      el.style.color = '#000000';
    });
  });
};

// Fetch properties on mount and initialize from query params if present
onMounted(() => {
  // Establecer explícitamente que solo queremos propiedades de alquiler
  propertyStore.clearFilters();
  propertyStore.setFilters({ status: 'for-rent' });
  
  // Initialize from query parameters
  initFromQueryParams();
  
  // Fetch properties data
  fetchProperties();
  
  // Apply title color fix for consistent styling
  applyTitleColorFix();
  
  // Listen for Escape key to close map view
  document.addEventListener('keydown', handleKeyDown);
});

// Clean up event listener on unmount
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>
<style scoped>
/* Main container */
.main-container {
  min-height: 100vh;
  background-color: #ffffff;
}

.properties-container {
  width: 100%;
}

.properties-layout {
  padding-top: 80px; /* Adjusted to prevent header overlap */
}

/* Sidebar & Filters */
.filters-column {
  background-color: #ffffff;
  border-radius: 8px;
}

.toggle-btn {
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  color: #3b82f6;
}

.filter-title {
  color: #000000 !important;
  font-weight: 500;
}

/* Custom input styles */
input[type="checkbox"], input[type="radio"] {
  cursor: pointer;
}

.form-select {
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Property cards */
.property-card {
  cursor: pointer;
  transition: transform 0.3s ease;
}

.property-card:hover .property-image {
  transform: scale(1.05);
}

/* Badges */
.badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  font-weight: 600;
}

/* Spinner animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Primary color */
.text-primary, .text-blue-500 {
  color: #3b82f6 !important;
}

.text-red-500 {
  color: #f56565 !important;
}

.bg-primary, .bg-blue-500 {
  background-color: #3b82f6 !important;
}

.bg-red-500 {
  background-color: #f56565 !important;
}

.bg-red-100 {
  background-color: #fee2e2 !important;
}

.bg-blue-100 {
  background-color: #dbeafe !important;
}

.border-primary, .border-blue-500 {
  border-color: #3b82f6 !important;
}

.border-red-400 {
  border-color: #f87171 !important;
}

.hover\:bg-primary:hover, .hover\:bg-blue-500:hover {
  background-color: #3b82f6 !important;
}

.hover\:text-primary:hover, .hover\:text-blue-500:hover {
  color: #3b82f6 !important;
}

.hover\:bg-blue-600:hover {
  background-color: #2563eb !important;
}

.hover\:bg-red-50:hover {
  background-color: #fef2f2 !important;
}

/* Text color overrides */
h1, h2, h3, h4, h5, h6 {
  color: #000000 !important;
}

.property-card h3 {
  color: #000000 !important;
}

.property-card .font-bold {
  color: #000000 !important;
}

.text-black {
  color: #000000 !important;
}

/* Favorite button - Only visible on hover or if favorited */
.property-image-container .absolute.top-3.right-3 {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.property-card:hover .property-image-container .absolute.top-3.right-3,
.property-image-container .absolute.top-3.right-3 .text-blue-500 {
  opacity: 1;
}

/* Correcciones para los filtros */
input[type="checkbox"]:checked {
  background-color: #3b82f6 !important;
  border-color: #3b82f6 !important;
}

.btn-check:checked + .btn-outline-secondary {
  background-color: #3b82f6 !important;
  border-color: #3b82f6 !important;
  color: white !important;
}

/* Direcciones en gris oscuro, pero no blanco */
.property-card p.text-sm, .text-gray-600 {
  color: #4B5563 !important;
}

/* Ajuste de la tarjeta para separar la parte superior (imagen) de la información */
.property-card > div {
  border-top: 1px solid #e5e7eb;
}

/* Estilos adicionales para botones y campos de formulario */
button.bg-blue-500, button.border-blue-500, button.text-blue-500 {
  background-color: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

button.text-blue-500 {
  color: #3b82f6;
}

button.hover\:bg-blue-500:hover {
  background-color: #3b82f6 !important;
  color: white !important;
}

/* Ajuste de padding adicional para el contenido */
.properties-layout {
  padding-top: 100px !important; /* Para evitar superposición con la barra de navegación */
}

/* Fix for small screens */
@media (max-width: 768px) {
  .properties-layout {
    padding-top: 60px;
  }
  
  .properties-grid {
    grid-template-columns: 1fr;
  }
}
</style>