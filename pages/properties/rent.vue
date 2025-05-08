<template>
  <div class="main-container bg-white">
    <div class="properties-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="properties-layout flex flex-col md:flex-row gap-6 pt-32 pb-10">
        <!-- Left Sidebar with Filters and Categories -->
        <div class="filters-column w-full md:w-72 flex-shrink-0 bg-white pb-6 mt-16">
          <!-- Search Bar -->
          <div class="search-container mb-6">
            <div class="relative flex items-center">
              <input 
                type="text" 
                placeholder="Search..." 
                class="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                v-model="searchQuery"
                @keyup.enter="handleSearch"
              >
              <span class="absolute left-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </span>
              <button 
                class="absolute right-0 bg-orange-500 text-white px-4 py-2 rounded-r-full hover:bg-orange-600 transition"
                @click="handleSearch"
              >
                Search
              </button>
            </div>
          </div>
          
          <!-- Tabs for toggling between Categories and Filters -->
          <div class="tabs flex mb-6 border-b">
            <button 
              class="tab-btn flex-1 py-3 text-center font-medium"
              :class="activeTab === 'categories' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'"
              @click="activeTab = 'categories'"
            >
              <span class="flex items-center justify-center">
                <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                </svg>
                Categories
              </span>
            </button>
            <button 
              class="tab-btn flex-1 py-3 text-center font-medium"
              :class="activeTab === 'filters' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'"
              @click="activeTab = 'filters'"
            >
              <span class="flex items-center justify-center">
                <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
                Filters
              </span>
            </button>
          </div>
          
          <!-- Categories View -->
          <div v-if="activeTab === 'categories'" class="categories-view">
            <div class="grid grid-cols-2 gap-4">
              <div 
                v-for="category in categories" 
                :key="category.id" 
                class="category-card flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition"
                @click="selectCategory(category.id)"
              >
                <div :class="['icon-circle w-12 h-12 rounded-full flex items-center justify-center mb-2', category.color]" v-html="category.icon"></div>
                <span class="text-sm text-center font-medium text-gray-800">{{ category.name }}</span>
              </div>
            </div>
          </div>
          
          <!-- Filters View -->
          <div v-else class="filters-view">
            
            <!-- Location -->
            <div class="filter-section mb-5">
              <h3 class="filter-title text-base font-medium text-black mb-3">Ubicación</h3>
              <div class="mb-3">
                <select 
                  v-model="filters.city" 
                  class="form-select w-full rounded-md border border-gray-300 py-2 px-3 text-black" 
                  @change="handleFilterChange"
                >
                  <option value="">Seleccionar ciudad</option>
                  <option v-for="city in availableCities" :key="city" :value="city">{{ city }}</option>
                </select>
              </div>
            </div>
            
            <!-- Business Category (antes Property Type) -->
            <div class="filter-section mb-5">
              <h3 class="filter-title text-base font-medium text-black mb-3">Tipo de negocio</h3>
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
            
            <!-- Schedule (Horario) - Nuevo filtro para tu modelo -->
            <div class="filter-section mb-5">
              <h3 class="filter-title text-base font-medium text-black mb-3">Horario</h3>
              <div class="mb-3">
                <select 
                  v-model="filters.schedule" 
                  class="form-select w-full rounded-md border border-gray-300 py-2 px-3 text-black" 
                  @change="handleFilterChange"
                >
                  <option value="">Cualquier horario</option>
                  <option value="matutino">Matutino</option>
                  <option value="vespertino">Vespertino</option>
                  <option value="nocturno">Nocturno</option>
                  <option value="24-horas">24 horas</option>
                </select>
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
        </div>

        <!-- Main Content Area -->
        <div class="content-column flex-1">
          <!-- Breadcrumb -->
          <div class="breadcrumb flex items-center mb-4 text-sm">
            <a href="/" class="text-gray-600 hover:text-orange-500">Inicio</a>
            <span class="mx-2 text-gray-500">›</span>
            <span class="text-black">Propiedades en alquiler</span>
          </div>
          
          <!-- Page Title -->
          <h1 class="text-2xl font-bold text-black mb-4">Propiedades en alquiler</h1>
          
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
                <option value="views-high">Más vistas</option>
                <option value="views-low">Menos vistas</option>
                <option value="title-asc">Título A-Z</option>
                <option value="title-desc">Título Z-A</option>
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
                <!-- Business Category Label -->
                <div class="uppercase text-sm font-medium text-red-500 pt-4 px-4">
                  {{ property.category || 'NEGOCIO' }}
                </div>
                
                <!-- Title -->
                <h3 class="font-medium text-black px-4 mt-1">
                  {{ property.title }}
                </h3>
                
                <!-- Address -->
                <p class="text-sm text-gray-600 px-4 mt-1">{{ property.address }}</p>
                
                <!-- Contact Information -->
                <div class="flex items-center px-4 mt-2">
                  <svg class="mr-2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                  </svg>
                  <span class="text-sm text-gray-600">{{ property.email || 'Sin correo' }}</span>
                </div>
                
                <div class="flex items-center px-4 mt-1 mb-4">
                  <svg class="mr-2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                  </svg>
                  <span class="text-sm text-gray-600">{{ property.phone || 'Sin teléfono' }}</span>
                </div>
                
                <!-- Schedule -->
                <div class="flex items-center px-4 mt-1 mb-4">
                  <svg class="mr-2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="currentColor"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
                  </svg>
                  <span class="text-sm text-gray-600">{{ property.schedule || 'Horario no disponible' }}</span>
                </div>
                
                <!-- Views Count -->
                <div class="flex items-center justify-end px-4 py-2 border-t border-gray-200 bg-gray-50">
                  <svg class="mr-1 text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                  </svg>
                  <span class="text-xs text-gray-500">{{ property.views || 0 }} vistas</span>
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

<script>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '~/store/user';
import { useFavoritesStore } from '~/store/favorites';
import { usePropertyService } from '~/services/propertyService';
import axios from 'axios';

export default {
  name: 'PropertyFinder',
  
  setup() {
    // Router y ruta actual
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const favoritesStore = useFavoritesStore();
    const propertyService = usePropertyService();

    // Estado de búsqueda
    const searchQuery = ref('');
    
    // Estado de modo de vista
    const activeTab = ref('categories');
    
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

    // Datos disponibles para selección
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

    // Property Types (actualizados a categorías de negocios)
    const propertyTypes = [
      { value: 'Gym', label: 'Gimnasio' },
      { value: 'Balneario', label: 'Balneario' },
      { value: 'Belleza', label: 'Belleza' },
      { value: 'Futbol', label: 'Fútbol' },
      { value: 'Motocross', label: 'Motocross' },
      { value: 'Cafetería', label: 'Cafetería' },
      { value: 'Restaurante', label: 'Restaurante' },
      { value: 'Bar y restaurante', label: 'Bar y Restaurante' },
      { value: 'Comida rápida', label: 'Comida Rápida' },
      { value: 'Otro', label: 'Otro' },
      { value: 'Repostería', label: 'Repostería' },
      { value: 'Heladería', label: 'Heladería' },
      { value: 'Bebidas', label: 'Bebidas' },
      { value: 'Bar', label: 'Bar' },
      { value: 'Hotel', label: 'Hotel' },
      { value: 'Motel', label: 'Motel' },
      { value: 'Casino', label: 'Casino' },
      { value: 'Cine', label: 'Cine' },
      { value: 'Videojuegos', label: 'Videojuegos' }
    ];

    // Amenities options - Lista reducida para categorías de negocios
    const amenities = [
      { value: 'wifi', label: 'WiFi' },
      { value: 'aire-acondicionado', label: 'Aire acondicionado' },
      { value: 'estacionamiento', label: 'Estacionamiento' },
      { value: 'terraza', label: 'Terraza' },
      { value: 'delivery', label: 'Delivery' },
      { value: 'música-en-vivo', label: 'Música en vivo' },
      { value: 'area-niños', label: 'Área de niños' },
      { value: 'reservaciones', label: 'Reservaciones' },
      { value: 'acceso-discapacitados', label: 'Acceso para discapacitados' },
      { value: 'pago-tarjeta', label: 'Pago con tarjeta' }
    ];
    
    // Additional options
    const additionalOptions = [
      { value: 'verified', label: 'Verificado' },
      { value: 'featured', label: 'Destacado' },
      { value: 'new', label: 'Nuevo' },
      { value: 'popular', label: 'Más visitados' }
    ];

    // Filtros actualizados para modelo de negocio
    const filters = ref({
      city: '',
      property_type: null, // Ahora representa la categoría del negocio
      schedule: '', // Horario del negocio
      amenities: [],
      additionalOptions: [],
      status: 'active' // Estado activo para negocios
    });
    
    // Categorías actualizadas para tipos de negocios
    const categories = ref([
      { 
        id: 'accommodation',
        name: 'Alojamiento',
        color: 'bg-blue-100 text-blue-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bed-double-icon lucide-bed-double"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></svg>'
      },
      { 
        id: 'food',
        name: 'Restaurante y Bar',
        color: 'bg-yellow-100 text-yellow-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-crossed-icon lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>'
      },
      { 
        id: 'shopping',
        name: 'Compras',
        color: 'bg-red-100 text-red-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>'
      },
      { 
        id: 'art',
        name: 'Arte e Historia',
        color: 'bg-green-100 text-green-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-landmark-icon lucide-landmark"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>'
      },
      {
        id: 'entertainment',
        name: 'Entretenimiento',
        color: 'bg-red-100 text-red-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket-icon lucide-ticket"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>'
      },
      { 
        id: 'medicine',
        name: 'Salud',
        color: 'bg-blue-100 text-blue-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-medical-icon lucide-briefcase-medical"><path d="M12 11v4"/><path d="M14 13h-4"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M18 6v14"/><path d="M6 6v14"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>'
      },
      
      {
        id: 'beauty',
        name: 'Belleza',
        color: 'bg-yellow-100 text-yellow-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>'
      },
      
      {
        id: 'auto',
        name: 'Alquiler de Vehículos',
        color: 'bg-blue-100 text-blue-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car-front-icon lucide-car-front"><path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>'
      },
      { 
        id: 'fitness',
        name: 'Deporte y Fitness',
        color: 'bg-red-100 text-red-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dumbbell-icon lucide-dumbbell"><path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/></svg>'
      },
      
      { 
        id: 'nightlife',
        name: 'Vida Nocturna',
        color: 'bg-indigo-100 text-indigo-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-martini-icon lucide-martini"><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></svg>'
      }
    ]);

    // API URL
    const API_URL = process.env.API_URL || 'http://localhost:3000/api';

    // Manejar la búsqueda
    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        // Actualizar filtros o realizar búsqueda específica
        console.log('Buscando:', searchQuery.value);
        currentPage.value = 1;
        fetchProperties();
      }
    };
    
    // Navegación a la página de detalles de propiedad
    const navigateToProperty = (propertyId) => {
      router.push(`/properties/${propertyId}`);
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
    
    // Seleccionar categoría
    const selectCategory = (categoryId) => {
      console.log('Categoría seleccionada:', categoryId);
      // Filtrar por categoría
      currentPage.value = 1;
      
      // Mapear ID de categoría a tipos de propiedad correspondientes
      const categoryMapping = {
        'food': ['Restaurante', 'Cafetería', 'Bar', 'Comida rápida', 'Repostería', 'Heladería', 'Bebidas', 'Bar y restaurante'],
        'fitness': ['Gym', 'Futbol', 'Motocross'],
        'nightlife': ['Bar', 'Casino', 'Bar y restaurante'],
        'beauty': ['Belleza'],
        'entertainment': ['Cine', 'Videojuegos', 'Casino']
      };
      
      // Obtener tipos de propiedad según la categoría
      const propertyTypesForCategory = categoryMapping[categoryId] || [];
      
      // Limpiar filtros actuales
      resetFilters();
      
      // Aplicar los nuevos filtros
      if (propertyTypesForCategory.length > 0) {
        selectedPropertyTypes.value = propertyTypesForCategory;
        updatePropertyTypeFilters();
      }
      
      // Actualizar parámetros y buscar
      updateQueryParams();
      fetchProperties();
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
      fetchProperties();
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
      
      // Agregar búsqueda si existe
      if (searchQuery.value) {
        query.q = searchQuery.value;
      }
      
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
      page: currentPage.value,
      limit: itemsPerPage.value
    };
    
    // Agregar parámetro de búsqueda solo si hay texto
    if (searchQuery.value.trim()) {
      apiFilters.q = searchQuery.value;
    }
    
    // Aplicar category (antiguamente property_type)
    if (filters.value.property_type) {
      apiFilters.category = filters.value.property_type;
    }
    
    // Aplicar filtros de ubicación
    if (filters.value.city) {
      apiFilters.address = filters.value.city; // Buscar por dirección en lugar de city
    }
    
    // Aplicar filtro de horario
    if (filters.value.schedule) {
      apiFilters.schedule = filters.value.schedule;
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
      
      if (filters.value.additionalOptions.includes('popular')) {
        apiFilters.popular = true;
      }
    }
    
    // Realizar petición a la API usando el servicio
    const result = await propertyService.getProperties(apiFilters);
console.log('Respuesta completa:', result); // Para debugging

if (result && result.success) {
  // Intenta diferentes estructuras posibles
  properties.value = result.properties || result.data?.properties || [];
  totalProperties.value = result.data?.total || result.total || 0;
  
  console.log('Propiedades cargadas:', properties.value.length);
} else{
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

    // Ordenar propiedades (actualizado para el nuevo modelo)
    const sortedProperties = computed(() => {
      let result = [...properties.value];
      
      if (sortBy.value === 'newest') {
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      } else if (sortBy.value === 'views-high') {
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
      } else if (sortBy.value === 'views-low') {
        result.sort((a, b) => (a.views || 0) - (b.views || 0));
      } else if (sortBy.value === 'title-asc') {
        result.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy.value === 'title-desc') {
        result.sort((a, b) => b.title.localeCompare(a.title));
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
  searchQuery.value = '';
  selectedPropertyTypes.value = [];
  
  filters.value = { 
    // Elimina el filtro de status
    city: '',
    property_type: null,
    schedule: '',
    amenities: [],
    additionalOptions: []
  };
  
  currentPage.value = 1;
  updateQueryParams();
  fetchProperties();
};

    // Formatear precio con comas (por si acaso hay campo price en el futuro)
    const formatPrice = (price) => {
      if (!price) return "0";
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Inicializar filtros desde parámetros de URL
    const initFromQueryParams = () => {
      const query = route.query;
      
      // Establecer búsqueda desde query
      if (query.q) {
        searchQuery.value = query.q;
      }
      
      // Establecer ordenación desde query
      if (query.sort && ['newest', 'views-high', 'views-low', 'title-asc', 'title-desc'].includes(query.sort)) {
        sortBy.value = query.sort;
      }
      
      // Establecer página desde query
      if (query.page && !isNaN(parseInt(query.page))) {
        currentPage.value = parseInt(query.page);
      }
      
      // Establecer tipo de propiedad/categoría desde query
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
      if (query.schedule) filters.value.schedule = query.schedule;
      
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
      
      if (query.popular === 'true') {
        filters.value.additionalOptions.push('popular');
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

    return {
      // Estados
      activeTab,
      searchQuery,
      properties,
      totalProperties,
      loading,
      error,
      hoveredPropertyId,
      selectedPropertyTypes,
      currentPage,
      sortBy,
      filters,
      
      // Datos
      availableCities,
      propertyTypes,
      amenities,
      additionalOptions,
      categories,
      
      // Computados
      sortedProperties,
      totalPages,
      pageNumbers,
      
      // Métodos
      handleSearch,
      isFavorite,
      toggleFavorite,
      updatePropertyTypeFilters,
      handleFilterChange,
      handleSortChange,
      changePage,
      resetFilters,
      selectCategory,
      navigateToProperty,
      formatPrice
    };
  }
};
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
  padding-top: 32px; /* Ajustado para evitar solapamiento con el header */
}

/* Sidebar y Filtros */
.filters-column {
  background-color: #ffffff;
  border-radius: 8px;
  margin-top: 64px; /* Agregado para dar espacio al header */
}

/* Search container */
.search-container input {
  transition: all 0.2s ease;
}

.search-container input:focus {
  box-shadow: 0 0 0 3px rgba(253, 86, 49, 0.3);
}

.search-container button {
  background-color: #fd5631;
  transition: all 0.2s ease;
}

.search-container button:hover {
  background-color: #e04a29;
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

.text-red-500 {
  color: #f56565 !important;
}

.bg-primary, .bg-orange-500 {
  background-color: #fd5631 !important;
}

.bg-red-500 {
  background-color: #fd5631 !important;
}

.bg-red-100 {
  background-color: #fff1ee !important;
}

.bg-orange-100 {
  background-color: #fff1ee !important;
}

.border-primary, .border-orange-500 {
  border-color: #fd5631 !important;
}

.border-red-500 {
  border-color: #fd5631 !important;
}

.hover\:bg-primary:hover, .hover\:bg-orange-500:hover {
  background-color: #fd5631 !important;
}

.hover\:text-primary:hover, .hover\:text-orange-500:hover {
  color: #fd5631 !important;
}

.hover\:bg-orange-600:hover {
  background-color: #e04a29 !important;
}

.hover\:bg-red-600:hover {
  background-color: #e04a29 !important;
}

.hover\:border-orange-500:hover {
  border-color: #fd5631 !important;
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

.price-range-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #fd5631;
  border-radius: 50%;
  cursor: pointer;
}

.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}

/* Estilos para categorías */
.categories-view {
  padding-top: 4px;
}

.category-card {
  transition: all 0.2s ease;
  background-color: white;
  border: 1px solid #e5e7eb;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}

.category-card:hover .icon-circle {
  transform: scale(1.05);
}

/* Tabs para alternar entre Categorías y Filtros */
.tabs {
  margin-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.tab-btn {
  flex: 1;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  text-align: center;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tab-btn.text-orange-500, .tab-btn.text-red-500 {
  color: #fd5631 !important;
  border-bottom: 2px solid #fd5631;
}
</style>