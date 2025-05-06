<template>
  <div class="main-container bg-white">
    <div class="properties-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="properties-layout flex flex-col md:flex-row gap-6 pt-20 pb-10">
        <!-- Left Sidebar with Filters -->
        <div class="filters-column w-full md:w-72 flex-shrink-0 bg-white pb-6">
          <!-- Rent/Sale Toggle -->
          <div class="rent-sale-toggle flex mb-5">
            <button 
              @click="navigateToRent"
              class="toggle-btn flex-1 py-3 px-4 text-center text-gray-500 bg-gray-100 font-medium rounded-l-md"
            >
              <svg class="inline-block mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2v-4h4v-2h-4V7h-2v4H8v2h4z" fill="currentColor"/>
              </svg>
              En alquiler
            </button>
            <button 
              class="toggle-btn flex-1 py-3 px-4 text-center active bg-orange-100 text-orange-600 font-medium rounded-r-md"
            >
              <svg class="inline-block mr-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill="currentColor"/>
              </svg>
              En venta
            </button>
          </div>
          
          <!-- Location -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Ubicación</h3>
            <div class="mb-3">
              <select v-model="filters.city" class="form-select w-full rounded-md border border-gray-300 py-2 px-3 text-black" @change="handleFilterChange">
                <option value="">Seleccionar ciudad</option>
                <option v-for="city in availableCities" :key="city" :value="city">{{ city }}</option>
              </select>
            </div>
          </div>
          
          <!-- Property Type -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Tipo de propiedad</h3>
            <div class="property-types overflow-y-auto max-h-48">
              <div v-for="type in propertyTypes" :key="type.value" class="checkbox-item flex items-center mb-2">
                <input 
                  type="checkbox" 
                  :id="type.value" 
                  :value="type.value" 
                  v-model="selectedPropertyTypes"
                  @change="updatePropertyTypeFilters"
                  class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                >
                <label :for="type.value" class="ml-2 text-sm text-black">{{ type.label }}</label>
              </div>
            </div>
          </div>
          
          <!-- Price Range Component -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Precio de la propiedad</h3>
            <div class="price-range-slider mb-4 relative">
              <div class="relative w-full h-1 bg-gray-200 rounded-full my-6">
                <!-- Barra de rango de precio -->
                <div 
                  class="absolute h-1 bg-red-500 rounded-full"
                  :style="{
                    left: getLeftPosition() + '%',
                    width: getWidthPosition() + '%'
                  }"
                ></div>
                
                <!-- Control deslizante mínimo -->
                <div 
                  class="absolute w-4 h-4 bg-red-500 rounded-full -mt-1.5 transform -translate-x-1/2 cursor-grab"
                  :style="{ left: getLeftPosition() + '%' }"
                  @mousedown="startDragging('min')"
                  @touchstart="startDragging('min')"
                ></div>
                
                <!-- Control deslizante máximo -->
                <div 
                  class="absolute w-4 h-4 bg-red-500 rounded-full -mt-1.5 transform -translate-x-1/2 cursor-grab"
                  :style="{ left: getRightPosition() + '%' }"
                  @mousedown="startDragging('max')"
                  @touchstart="startDragging('max')"
                ></div>
              </div>
            </div>
            
            <div class="flex items-center mt-4">
              <div class="w-50 pe-2 flex-1">
                <div class="input-group flex items-center border border-gray-300 rounded-md">
                  <span class="pl-3 text-gray-500">L</span>
                  <input 
                    type="number" 
                    v-model.number="filters.minPrice" 
                    @change="handleFilterChange"
                    class="w-full p-2 border-none focus:ring-0 text-black font-medium"
                  >
                </div>
              </div>
              <div class="text-muted mx-2">—</div>
              <div class="w-50 ps-2 flex-1">
                <div class="input-group flex items-center border border-gray-300 rounded-md">
                  <span class="pl-3 text-gray-500">L</span>
                  <input 
                    type="number" 
                    v-model.number="filters.maxPrice" 
                    @change="handleFilterChange"
                    class="w-full p-2 border-none focus:ring-0 text-black font-medium"
                  >
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bedrooms -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Habitaciones</h3>
            <div class="flex space-x-2">
              <label 
                v-for="option in bedOptions" 
                :key="option.value"
                :class="[
                  'flex-1 py-2 px-2 text-center rounded-full border cursor-pointer text-sm',
                  filters.bedrooms === option.value 
                    ? 'border-orange-500 text-white bg-orange-500' 
                    : 'border-gray-300 text-gray-700 bg-white hover:border-orange-500'
                ]"
              >
                <input 
                  type="radio" 
                  :value="option.value" 
                  v-model="filters.bedrooms"
                  @change="handleFilterChange"
                  class="sr-only"
                >
                {{ option.label }}
              </label>
            </div>
          </div>
          
          <!-- Bathrooms -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Baños</h3>
            <div class="flex space-x-2">
              <label 
                v-for="option in bathOptions" 
                :key="option.value"
                :class="[
                  'flex-1 py-2 px-2 text-center rounded-full border cursor-pointer text-sm',
                  filters.bathrooms === option.value 
                    ? 'border-orange-500 text-white bg-orange-500' 
                    : 'border-gray-300 text-gray-700 bg-white hover:border-orange-500'
                ]"
              >
                <input 
                  type="radio" 
                  :value="option.value" 
                  v-model="filters.bathrooms"
                  @change="handleFilterChange"
                  class="sr-only"
                >
                {{ option.label }}
              </label>
            </div>
          </div>
          
          <!-- Square Meters -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Metros cuadrados</h3>
            <div class="flex items-center">
              <input 
                type="number" 
                v-model="filters.minArea" 
                @change="handleFilterChange"
                placeholder="Mín"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-black font-medium"
              >
              <span class="mx-3 text-gray-500">—</span>
              <input 
                type="number" 
                v-model="filters.maxArea" 
                @change="handleFilterChange"
                placeholder="Máx"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-black font-medium"
              >
            </div>
          </div>
          
          <!-- Amenities -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Comodidades</h3>
            <div class="amenities-list overflow-y-auto max-h-48">
              <div v-for="amenity in amenities" :key="amenity.value" class="checkbox-item flex items-center mb-2">
                <input 
                  type="checkbox" 
                  :id="amenity.value" 
                  :value="amenity.value" 
                  v-model="filters.amenities"
                  @change="handleFilterChange"
                  class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                >
                <label :for="amenity.value" class="ml-2 text-sm text-black">{{ amenity.label }}</label>
              </div>
            </div>
          </div>
          
          <!-- Additional Options -->
          <div class="filter-section mb-5">
            <h3 class="filter-title text-base font-medium text-black mb-3">Opciones adicionales</h3>
            <div class="options-list">
              <div v-for="option in additionalOptions" :key="option.value" class="checkbox-item flex items-center mb-2">
                <input 
                  type="checkbox" 
                  :id="option.value" 
                  :value="option.value" 
                  v-model="filters.additionalOptions"
                  @change="handleFilterChange"
                  class="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                >
                <label :for="option.value" class="ml-2 text-sm text-black">{{ option.label }}</label>
              </div>
            </div>
          </div>
          
          <!-- Reset Filters Button -->
          <button 
            @click="resetFilters" 
            class="reset-button w-full flex items-center justify-center py-3 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            <svg class="mr-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16c1.671 0 3-1.329 3-3s-1.329-3-3-3-3 1.329-3 3 1.329 3 3 3z M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.182V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z" fill="currentColor"/>
            </svg>
            Restablecer filtros
          </button>
        </div>

        <!-- Main Content Area -->
        <div class="content-column flex-1">
          <!-- Breadcrumb -->
          <div class="breadcrumb flex items-center mb-4 text-sm">
            <a href="/" class="text-gray-600 hover:text-orange-500">Inicio</a>
            <span class="mx-2 text-gray-500">›</span>
            <span class="text-black">Propiedades en venta</span>
          </div>
          
          <!-- Page Title -->
          <h1 class="text-2xl font-bold text-black mb-4">Propiedades en venta</h1>
          
          <!-- Controls and Sorting -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-2">
              <span class="text-gray-500">Ordenar por:</span>
              <select 
                v-model="sortBy" 
                class="sort-select py-1 px-3 border border-gray-300 rounded-md bg-white text-black"
                @change="handleSortChange"
              >
                <option value="newest">Más recientes</option>
                <option value="price-low">Precio: de menor a mayor</option>
                <option value="price-high">Precio: de mayor a menor</option>
              </select>
            </div>
          </div>
          
          <!-- Results Count -->
          <div class="results-count text-gray-600 mb-4">
            {{ totalProperties }} resultados
          </div>
          
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-20">
            <div class="spinner border-4 border-gray-200 border-t-orange-500 rounded-full w-10 h-10 animate-spin"></div>
          </div>
          
          <!-- Properties Grid -->
          <div v-else-if="!error && properties.length > 0" class="properties-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  :src="property.image || 'https://placehold.co/600x400?text=Sin+Imagen'" 
                  :alt="property.title" 
                  class="property-image w-full h-48 object-cover"
                >
                
                <!-- Badges -->
                <div class="property-badges absolute top-3 left-3">
                  <span v-if="property.isVerified" class="badge bg-green-500 text-white text-xs font-medium px-2 py-1 rounded block mb-1">Verificado</span>
                  <span v-if="property.isNew" class="badge bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded block">NUEVO</span>
                </div>
                
                <!-- Favorite Button - Only visible on hover -->
                <button 
                  v-show="hoveredPropertyId === property.id || isFavorite(property.id)"
                  @click.stop="toggleFavorite(property.id)" 
                  class="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    :class="isFavorite(property.id) ? 'text-orange-500' : 'text-gray-400'"
                  >
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
              
              <!-- Property Details -->
              <div @click="navigateToProperty(property.id)" class="cursor-pointer">
                <!-- For Sale Label -->
                <div class="uppercase text-sm font-medium text-green-500 pt-4 px-4">
                  EN VENTA
                </div>
                
                <!-- Title and Area -->
                <h3 class="font-medium text-black px-4 mt-1">
                  {{ property.title }} | {{ property.square_feet }} m²
                </h3>
                
                <!-- Address -->
                <p class="text-sm text-gray-600 px-4 mt-1">{{ property.address }}</p>
                
                <!-- Price -->
                <div class="flex items-center px-4 mt-2 mb-4">
                  <svg class="mr-2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.52 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.48 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.49 11.8 10.9Z" fill="currentColor"/>
                  </svg>
                  <span class="font-bold text-black">L {{ formatPrice(property.price) }}</span>
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
          <div v-else-if="!error && properties.length === 0" class="flex flex-col items-center justify-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="text-gray-400 mb-4" viewBox="0 0 24 24">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
            <h3 class="text-lg font-medium text-black mb-2">No se encontraron propiedades</h3>
            <p class="text-gray-600 mb-4">Intente ajustar sus criterios de búsqueda</p>
            <button 
              @click="resetFilters" 
              class="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
            >
              Restablecer filtros
            </button>
          </div>
          
          <!-- Error State -->
          <div v-else-if="error" class="flex flex-col items-center justify-center py-16">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="text-orange-500 mb-4" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <p class="text-orange-500 font-medium mb-4">{{ error }}</p>
            <button 
              @click="fetchProperties" 
              class="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
            >
              Intentar de nuevo
            </button>
          </div>
          
          <!-- Pagination -->
          <div v-if="totalPages > 1 && !loading" class="pagination flex justify-center mt-8">
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
                :class="currentPage === page ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300 text-gray-700'"
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
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '~/store/user';
import { useFavoritesStore } from '~/store/favorites';
import axios from 'axios';

// Router y ruta actual
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const favoritesStore = useFavoritesStore();

// Estado de las propiedades y filtros
const properties = ref([]);
const totalProperties = ref(0);
const loading = ref(true);
const error = ref(null);
const hoveredPropertyId = ref(null);
const selectedPropertyTypes = ref([]);

// Paginación
const currentPage = ref(1);
const itemsPerPage = ref(9);
const sortBy = ref('newest');

// Datos disponibles para selección - Lista actualizada y dinámica
const availableCities = ref([
  'Tegucigalpa',
  'Roatán',
  'San Pedro Sula',
  'La Ceiba',
  'Valle de Ángeles',
  'Comayagüela',
  'Puerto Cortés',
  'Copán Ruinas',
  'Comayagua',
  'Tela'
]);

// Opciones de habitaciones
const bedOptions = [
  { value: 'studio', label: 'Estudio' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4+' }
];

// Opciones de baños
const bathOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' }
];

// Property Types
const propertyTypes = [
  { value: 'house', label: 'Casa' },
  { value: 'apartment', label: 'Apartamento' },
  { value: 'room', label: 'Habitación' },
  { value: 'office', label: 'Oficina' },
  { value: 'commercial', label: 'Comercial' },
  { value: 'land', label: 'Terreno' },
  { value: 'daily-rental', label: 'Alquiler diario' },
  { value: 'new-building', label: 'Edificio nuevo' },
  { value: 'parking-lot', label: 'Estacionamiento' }
];

// Amenities options - Todas las comodidades solicitadas
const amenities = [
  { value: 'aerotermia', label: 'Aerotermia' },
  { value: 'agua-incluida', label: 'Agua incluida' },
  { value: 'aire-acondicionado', label: 'Aire acondicionado' },
  { value: 'alarma', label: 'Alarma' },
  { value: 'almacen', label: 'Almacén' },
  { value: 'alta-rentabilidad', label: 'Alta rentabilidad' },
  { value: 'amueblado', label: 'Amueblado' },
  { value: 'armarios-empotrados', label: 'Armarios empotrados' },
  { value: 'ascensor', label: 'Ascensor' },
  { value: 'balcon', label: 'Balcón' },
  { value: 'barbacoa', label: 'Barbacoa' },
  { value: 'calefaccion', label: 'Calefacción' },
  { value: 'chimenea', label: 'Chimenea' },
  { value: 'cocina-equipada', label: 'Cocina equipada' },
  { value: 'doble-altura', label: 'Doble altura' },
  { value: 'domotica', label: 'Domótica' },
  { value: 'edificable', label: 'Edificable' },
  { value: 'eficiencia-energetica-a', label: 'Eficiencia energética A' },
  { value: 'electricidad-incluida', label: 'Electricidad incluida' },
  { value: 'escaparate', label: 'Escaparate' },
  { value: 'esquina', label: 'Esquina' },
  { value: 'falso-techo', label: 'Falso techo' },
  { value: 'fibra-optica', label: 'Fibra óptica' },
  { value: 'facil-maniobra', label: 'Fácil maniobra' },
  { value: 'garaje', label: 'Garaje' },
  { value: 'gimnasio', label: 'Gimnasio' },
  { value: 'jacuzzi', label: 'Jacuzzi' },
  { value: 'jardines', label: 'Jardines' },
  { value: 'jardin', label: 'Jardín' },
  { value: 'lavadora', label: 'Lavadora' },
  { value: 'lavavajillas', label: 'Lavavajillas' },
  { value: 'licencia-actividad', label: 'Licencia actividad' },
  { value: 'locales-comerciales', label: 'Locales comerciales' },
  { value: 'parking', label: 'Parking' },
  { value: 'persiana-metalica', label: 'Persiana metálica' },
  { value: 'piscina', label: 'Piscina' },
  { value: 'piscina-comunitaria', label: 'Piscina comunitaria' },
  { value: 'primera-linea-playa', label: 'Primera línea playa' },
  { value: 'puerta-automatica', label: 'Puerta automática' },
  { value: 'recepcion', label: 'Recepción' },
  { value: 'reformado', label: 'Reformado' },
  { value: 'ropa-cama', label: 'Ropa cama' },
  { value: 'salas-reuniones', label: 'Salas reuniones' },
  { value: 'salida-humos', label: 'Salida humos' },
  { value: 'seguridad-24h', label: 'Seguridad 24h' },
  { value: 'servicios-conectados', label: 'Servicios conectados' },
  { value: 'suelo-radiante', label: 'Suelo radiante' },
  { value: 'suelo-tecnico', label: 'Suelo técnico' },
  { value: 'suministros-independientes', label: 'Suministros independientes' },
  { value: 'terraza', label: 'Terraza' },
  { value: 'totalmente-alquilado', label: 'Totalmente alquilado' },
  { value: 'trastero', label: 'Trastero' },
  { value: 'ubicacion-prime', label: 'Ubicación prime' },
  { value: 'urbanizacion-privada', label: 'Urbanización privada' },
  { value: 'urbanizado', label: 'Urbanizado' },
  { value: 'vigilancia-24h', label: 'Vigilancia 24h' },
  { value: 'vistas-mar', label: 'Vistas mar' },
  { value: 'vistas-montana', label: 'Vistas montaña' },
  { value: 'vistas-panoramicas', label: 'Vistas panorámicas' },
  { value: 'wifi', label: 'WiFi' },
  { value: 'zona-infantil', label: 'Zona infantil' }
];

// Additional options
const additionalOptions = [
  { value: 'verified', label: 'Verificado' },
  { value: 'featured', label: 'Destacado' },
  { value: 'new', label: 'Nuevo' }
];

// Filtros
const filters = ref({
  city: '',
  property_type: null,
  minPrice: 0,   // Ajustados para propiedades en venta
  maxPrice: 5000000,  // Ajustados para propiedades en venta
  bedrooms: '',
  bathrooms: '',
  minArea: '',
  maxArea: '',
  amenities: [],
  additionalOptions: [],
  status: 'for-sale' // Siempre en modo venta para esta página
});

// API URL
const API_URL = process.env.API_URL || 'http://localhost:3000/api';



// Navegación a la página de propiedades en alquiler
const navigateToRent = () => {
  router.push('/properties/rent');
};

// Verificar si una propiedad es favorita
const isFavorite = (propertyId) => {
  return favoritesStore.isFavorite(propertyId);
};

// Alternar estado de favorito
const toggleFavorite = async (propertyId) => {
  try {
    // Buscar la propiedad completa por ID
    const property = properties.value.find(p => p.id === propertyId);
    
    if (property) {
      // Usar el objeto completo de la propiedad si está disponible
      await favoritesStore.toggleFavorite(property);
    } else {
      // Usar solo el ID si no se encuentra la propiedad
      await favoritesStore.toggleFavorite(propertyId);
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};

// Actualizar los tipos de propiedad seleccionados
const updatePropertyTypeFilters = () => {
  if (selectedPropertyTypes.value.length === 1) {
    filters.value.property_type = selectedPropertyTypes.value[0];
  } else if (selectedPropertyTypes.value.length > 1) {
    // Manejo de múltiples tipos seleccionados
    filters.value.property_type = selectedPropertyTypes.value;
  } else {
    filters.value.property_type = null;
  }
  handleFilterChange();
};

// Funciones para controlar el slider de precios
const getLeftPosition = () => {
  const sliderMin = 0;
  const sliderMax = 5000000;
  const range = sliderMax - sliderMin;
  if (range <= 0) return 0;
  
  let position = ((filters.value.minPrice - sliderMin) / range) * 100;
  // Asegurar que está dentro de los límites
  position = Math.max(0, Math.min(position, 100));
  return position;
};

const getRightPosition = () => {
  const sliderMin = 0;
  const sliderMax = 5000000;
  const range = sliderMax - sliderMin;
  if (range <= 0) return 100;
  
  let position = ((filters.value.maxPrice - sliderMin) / range) * 100;
  // Asegurar que está dentro de los límites
  position = Math.max(0, Math.min(position, 100));
  return position;
};

const getWidthPosition = () => {
  return getRightPosition() - getLeftPosition();
};

// Variables para el control del slider
const draggingHandle = ref(null);

// Iniciar arrastre
const startDragging = (handle) => {
  draggingHandle.value = handle;
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchmove', handleDrag, { passive: false });
  document.addEventListener('touchend', stopDragging);
  
  // Cambiar estilo del cursor durante arrastre
  document.body.style.cursor = 'grabbing';
};

// Manejar arrastre
const handleDrag = (e) => {
  e.preventDefault();
  
  if (!draggingHandle.value) return;
  
  const sliderTrack = document.querySelector('.price-range-slider > div');
  if (!sliderTrack) return;
  
  const trackRect = sliderTrack.getBoundingClientRect();
  const trackWidth = trackRect.width;
  
  // Obtener posición X (manejar eventos táctiles y de ratón)
  let clientX;
  if (e.type === 'touchmove') {
    clientX = e.touches[0].clientX;
  } else {
    clientX = e.clientX;
  }
  
  // Calcular posición porcentual
  let percentPosition = (clientX - trackRect.left) / trackWidth;
  percentPosition = Math.min(Math.max(percentPosition, 0), 1);
  
  // Calcular precio según posición
  const sliderMin = 0;
  const sliderMax = 5000000;
  const priceRange = sliderMax - sliderMin;
  let priceValue = Math.round((percentPosition * priceRange + sliderMin) / 50000) * 50000;
  
  // Actualizar precio mínimo o máximo según qué control se está arrastrando
  if (draggingHandle.value === 'min') {
    // Asegurar que el precio mínimo no exceda el máximo
    filters.value.minPrice = Math.min(priceValue, filters.value.maxPrice - 50000);
  } else {
    // Asegurar que el precio máximo no sea menor que el mínimo
    filters.value.maxPrice = Math.max(priceValue, filters.value.minPrice + 50000);
  }
};

// Detener arrastre
const stopDragging = () => {
  if (draggingHandle.value) {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDragging);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', stopDragging);
    
    // Restaurar estilo del cursor
    document.body.style.cursor = '';
    
    // Aplicar cambios de filtro
    handleFilterChange();
    
    // Resetear estado de arrastre
    draggingHandle.value = null;
  }
};

// Actualizar rango de precios desde el slider
const updatePriceRange = ({ min, max }) => {
  filters.value.minPrice = min;
  filters.value.maxPrice = max;
  handleFilterChange();
};

// Manejar cambios en los filtros
const handleFilterChange = () => {
  currentPage.value = 1;
  updateQueryParams();
  fetchProperties();
};

// Manejar cambios en la ordenación
const handleSortChange = () => {
  currentPage.value = 1;
  updateQueryParams();
};

// Actualizar los parámetros de la URL
const updateQueryParams = () => {
  // Construir objeto de query
  const query = {
    sort: sortBy.value,
    page: currentPage.value
  };
  
  // Agregar filtros no vacíos a la query
  Object.entries(filters.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '' && 
        !(Array.isArray(value) && value.length === 0) && 
        key !== 'status') { // No necesitamos pasar status a la URL para esta página
      query[key] = value;
    }
  });
  
  // Actualizar URL sin refrescar la página
  router.replace({ query });
};

// Obtener propiedades de la API
const fetchProperties = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Convertir filtros a formato API
    const apiFilters = {
      status: 'for-sale',
      page: currentPage.value,
      limit: itemsPerPage.value
    };
    
    // Aplicar property_type
    if (filters.value.property_type) {
      apiFilters.property_type = filters.value.property_type;
    }
    
    // Aplicar filtros de precio
    if (filters.value.minPrice) {
      apiFilters.minPrice = filters.value.minPrice;
    }
    
    if (filters.value.maxPrice) {
      apiFilters.maxPrice = filters.value.maxPrice;
    }
    
    // Aplicar filtros de ubicación
    if (filters.value.city) {
      apiFilters.city = filters.value.city;
    }
    
    // Convertir bedrooms de "studio" a 0 para API
    if (filters.value.bedrooms === 'studio') {
      apiFilters.minBedrooms = 0;
    } else if (filters.value.bedrooms) {
      apiFilters.minBedrooms = parseInt(filters.value.bedrooms);
    }
    
    // Convertir bathrooms para API
    if (filters.value.bathrooms) {
      apiFilters.minBathrooms = parseInt(filters.value.bathrooms);
    }
    
    // Aplicar filtros de área
    if (filters.value.minArea) {
      apiFilters.minArea = parseInt(filters.value.minArea);
    }
    
    if (filters.value.maxArea) {
      apiFilters.maxArea = parseInt(filters.value.maxArea);
    }
    
    // Aplicar filtros de amenidades
    if (filters.value.amenities && filters.value.amenities.length > 0) {
      apiFilters.amenities = filters.value.amenities;
    }
    
    // Aplicar opciones adicionales
    if (filters.value.additionalOptions && filters.value.additionalOptions.length > 0) {
      if (filters.value.additionalOptions.includes('verified')) {
        apiFilters.verified = true;
      }
      
      if (filters.value.additionalOptions.includes('featured')) {
        apiFilters.featured = true;
      }
      
      if (filters.value.additionalOptions.includes('new')) {
        apiFilters.isNew = true;
      }
    }
    
    // Realizar petición a la API
    const response = await axios.get(`${API_URL}/properties`, { 
      params: apiFilters 
    });
    
    if (response.data && response.data.success) {
      properties.value = response.data.data.properties;
      totalProperties.value = response.data.data.total;
    } else {
      error.value = 'No se pudieron cargar las propiedades';
      properties.value = [];
      totalProperties.value = 0;
    }
  } catch (err) {
    console.error('Error al obtener propiedades:', err);
    error.value = 'No se pudieron cargar las propiedades. Por favor, inténtelo de nuevo.';
    properties.value = [];
    totalProperties.value = 0;
  } finally {
    loading.value = false;
  }
};

// Ordenar propiedades
const sortedProperties = computed(() => {
  let result = [...properties.value];
  
  if (sortBy.value === 'newest') {
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } else if (sortBy.value === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  }
  
  return result;
});

// Paginación
const totalPages = computed(() => {
  return Math.ceil(totalProperties.value / itemsPerPage.value);
});

const pageNumbers = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  // Si hay pocas páginas, mostramos todas
  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Siempre mostrar la primera página
    pages.push(1);
    
    // Calcular rango alrededor de la página actual
    let start = Math.max(2, currentPage.value - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages.value - 1, start + maxVisiblePages - 3);
    
    // Ajustar si estamos cerca del final
    if (end === totalPages.value - 1) {
      start = Math.max(2, end - (maxVisiblePages - 3));
    }
    
    // Agregar elipsis si es necesario
    if (start > 2) {
      pages.push('...');
    }
    
    // Agregar páginas en el rango
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Agregar elipsis si es necesario
    if (end < totalPages.value - 1) {
      pages.push('...');
    }
    
    // Siempre mostrar la última página
    pages.push(totalPages.value);
  }
  
  return pages;
});

// Cambiar página
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    updateQueryParams();
    fetchProperties();
    
    // Scroll al principio de los resultados
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

// Resetear todos los filtros
const resetFilters = () => {
  selectedPropertyTypes.value = [];
  
  filters.value = { 
    status: 'for-sale', // Siempre en modo venta para esta página
    city: '',
    property_type: null,
    minPrice: 0,   // Valores ajustados para propiedades en venta
    maxPrice: 5000000,  // Valores ajustados para propiedades en venta
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    maxArea: '',
    amenities: [],
    additionalOptions: []
  };
  
  currentPage.value = 1;
  updateQueryParams();
  fetchProperties();
};

// Navegar a página de detalles de propiedad
const navigateToProperty = (propertyId) => {
  router.push(`/properties/${propertyId}`);
};

// Formatear precio con comas
const formatPrice = (price) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Inicializar filtros desde parámetros de URL
const initFromQueryParams = () => {
  const query = route.query;
  
  // Establecer ordenación desde query
  if (query.sort && ['newest', 'price-low', 'price-high'].includes(query.sort)) {
    sortBy.value = query.sort;
  }
  
  // Establecer página desde query
  if (query.page && !isNaN(parseInt(query.page))) {
    currentPage.value = parseInt(query.page);
  }
  
  // Establecer tipo de propiedad desde query
  if (query.property_type) {
    if (typeof query.property_type === 'string') {
      filters.value.property_type = query.property_type;
      selectedPropertyTypes.value = [query.property_type];
    } else if (Array.isArray(query.property_type)) {
      filters.value.property_type = query.property_type;
      selectedPropertyTypes.value = query.property_type;
    }
  }
  
  // Establecer otros filtros desde query
  if (query.city) filters.value.city = query.city;
  
  if (query.minPrice) filters.value.minPrice = parseInt(query.minPrice);
  if (query.maxPrice) filters.value.maxPrice = parseInt(query.maxPrice);
  
  if (query.bedrooms) filters.value.bedrooms = query.bedrooms;
  if (query.bathrooms) filters.value.bathrooms = query.bathrooms;
  
  if (query.minArea) filters.value.minArea = parseInt(query.minArea);
  if (query.maxArea) filters.value.maxArea = parseInt(query.maxArea);
  
  // Parsear amenidades si están en la URL
  if (query.amenities) {
    const amenitiesArray = Array.isArray(query.amenities) ? query.amenities : [query.amenities];
    filters.value.amenities = amenitiesArray;
  }
  
  // Parsear opciones adicionales
  if (query.verified === 'true') {
    filters.value.additionalOptions.push('verified');
  }
  
  if (query.featured === 'true') {
    filters.value.additionalOptions.push('featured');
  }
  
  if (query.isNew === 'true') {
    filters.value.additionalOptions.push('new');
  }
};

// Aplicar correcciones de color para estilo consistente
const applyColorFix = () => {
  nextTick(() => {
    // Corregir colores de texto para títulos y encabezados
    document.querySelectorAll('h1, h2, h3.filter-title').forEach(el => {
      el.style.color = '#000000';
    });
    
    // Asegurar que los títulos de propiedades sean negros
    document.querySelectorAll('.property-card h3').forEach(el => {
      el.style.color = '#000000';
    });
    
    // Asegurar que el texto de precios sea negro
    document.querySelectorAll('.property-card .font-bold').forEach(el => {
      el.style.color = '#000000';
    });
    
    // Asegurar que los inputs tengan texto negro
    document.querySelectorAll('input[type="number"]').forEach(el => {
      el.style.color = '#000000';
    });
  });
};

// Inicializar componente
onMounted(async () => {
 
  
  // Inicializar desde parámetros de URL
  initFromQueryParams();
  
  // Obtener datos
  await Promise.all([
    fetchProperties(),
    favoritesStore.fetchFavorites()
  ]);
  
  // Aplicar corrección de colores
  applyColorFix();
});

// Observar cambios en los parámetros de la URL
watch(() => route.query, () => {
  initFromQueryParams();
  fetchProperties();
}, { deep: true });
</script>

<style scoped>
/* Contenedor principal */
.main-container {
  min-height: 100vh;
  background-color: #ffffff;
}

.properties-container {
  width: 100%;
}

.properties-layout {
  padding-top: 80px; /* Ajustado para evitar solapamiento con el header */
}

/* Sidebar y Filtros */
.filters-column {
  background-color: #ffffff;
  border-radius: 8px;
}

.toggle-btn {
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  color: #fd5631;
}

.filter-title {
  color: #000000 !important;
  font-weight: 500;
}

/* Estilos personalizados para inputs */
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

/* Tarjetas de propiedades */
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

/* Animación de spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Color primario */
.text-primary, .text-orange-500 {
  color: #fd5631 !important;
}

.text-green-500 {
  color: #10b981 !important;
}

.bg-primary, .bg-orange-500 {
  background-color: #fd5631 !important;
}

.bg-red-500 {
  background-color: #f56565 !important;
}

.bg-red-100 {
  background-color: #fee2e2 !important;
}

.bg-orange-100 {
  background-color: #dbeafe !important;
}

.border-primary, .border-orange-500 {
  border-color: #fd5631 !important;
}

.border-red-400 {
  border-color: #f87171 !important;
}

.hover\:bg-primary:hover, .hover\:bg-orange-500:hover {
  background-color: #fd5631 !important;
}

.hover\:text-primary:hover, .hover\:text-orange-500:hover {
  color: #fd5631 !important;
}

.hover\:bg-orange-600:hover {
  background-color: #2563eb !important;
}

.hover\:bg-red-50:hover {
  background-color: #fef2f2 !important;
}

.hover\:bg-red-600:hover {
  background-color: #dc2626 !important;
}

/* Sobrescrituras de color de texto */
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

/* Botón favorito - Solo visible en hover o si es favorito */
.property-image-container .absolute.top-3.right-3 {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.property-card:hover .property-image-container .absolute.top-3.right-3,
.property-image-container .absolute.top-3.right-3 .text-orange-500 {
  opacity: 1;
}

/* Correcciones para los filtros */
input[type="checkbox"]:checked {
  background-color: #fd5631 !important;
  border-color: #fd5631 !important;
}

.btn-check:checked + .btn-outline-secondary {
  background-color: #fd5631 !important;
  border-color: #fd5631 !important;
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
button.bg-orange-500, button.border-orange-500, button.text-orange-500 {
  background-color: #fd5631;
  border-color: #fd5631;
  color: white;
}

button.text-orange-500 {
  color: #fd5631;
}

button.hover\:bg-orange-500:hover {
  background-color: #fd5631 !important;
  color: white !important;
}

/* Ajuste de padding adicional para el contenido */
.properties-layout {
  padding-top: 100px !important; /* Para evitar superposición con la barra de navegación */
}

/* Correcciones para pantallas pequeñas */
@media (max-width: 768px) {
  .properties-layout {
    padding-top: 60px;
  }
  
  .properties-grid {
    grid-template-columns: 1fr;
  }
}

/* Slider de precio - asegurar números negros */
input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
  color: #000000 !important;
  font-weight: 500;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
  color: #000000 !important;
  font-weight: 500;
}

.price-range-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #ef4444;
  border-radius: 50%;
  cursor: pointer;
}

.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}
</style>