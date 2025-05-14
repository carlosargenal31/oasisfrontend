<template>
  <div class="main-container bg-white">
    <div class="properties-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="properties-layout flex flex-col md:flex-row gap-6 pt-32 pb-10">
        <!-- Left Sidebar with Filters (sin pestañas) -->
        <div class="filters-column w-full md:w-72 flex-shrink-0 bg-white pb-6 mt-16">
          <!-- Search Bar -->
          <div class="search-container mb-6">
            <div class="relative flex items-center">
              <input 
                type="text" 
                placeholder="Buscar lugares" 
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
                Buscar
              </button>
            </div>
          </div>
          
          <!-- Filters View (ahora siempre visible) -->
          <div class="filters-view">
            <!-- Categoría con Iconos -->
            <div class="filter-section mb-5">
              <h3 class="filter-title text-base font-medium text-black mb-3">Categoría</h3>
              <div class="category-icons grid grid-cols-3 gap-3 mb-3">
                <div 
                  class="category-card flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition"
                  :class="{'border-orange-500 shadow-sm': filters.category === 'Alojamiento'}"
                  @click="selectCategory('Alojamiento')"
                >
                  <div class="icon-circle w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bed-double-icon lucide-bed-double"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></svg>
                  </div>
                  <span class="text-xs text-center font-medium text-gray-800">Alojamiento</span>
                </div>
                
                <div 
                  class="category-card flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition"
                  :class="{'border-orange-500 shadow-sm': filters.category === 'Restaurante y bar'}"
                  @click="selectCategory('Restaurante y bar')"
                >
                  <div class="icon-circle w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-yellow-100 text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils-crossed-icon lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/></svg>
                  </div>
                  <span class="text-xs text-center font-medium text-gray-800">Restaurante y Bar</span>
                </div>
                
                <div 
                  class="category-card flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition"
                  :class="{'border-orange-500 shadow-sm': filters.category === 'Entretenimiento'}"
                  @click="selectCategory('Entretenimiento')"
                >
                  <div class="icon-circle w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-red-100 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket-icon lucide-ticket"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
                  </div>
                  <span class="text-xs text-center font-medium text-gray-800">Entretenimiento</span>
                </div>
              </div>
            </div>
            
            <!-- Tipo de negocio -->
            <div class="filter-section mb-5">
  <h3 class="filter-title text-base font-medium text-black mb-3">Tipo de negocio</h3>
  <div class="property-types overflow-y-auto max-h-48">
    <div v-for="type in filteredPropertyTypes" :key="type.value" class="checkbox-item flex items-center mb-2">
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
            <span class="text-black">¿Qué hacer en La Ceiba?</span>
          </div>
          
          <!-- Page Title -->
          <h1 class="text-2xl font-bold text-black mb-4">¿Qué hacer en La Ceiba?</h1>
          
          <!-- Controls and Sorting -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-2">
              <span class="text-gray-500">Ordenar por:</span>
              <select 
                v-model="sortBy" 
                class="sort-select py-1 px-3 border border-gray-300 rounded-md bg-white text-black"
                @change="handleSortChange"
              >
                <option value="id-asc">Ascendente</option>
                <option value="newest">Más recientes</option>
                <option value="views-high">Más vistas</option>
                <option value="views-low">Menos vistas</option>
                <option value="title-asc">Título A-Z</option>
                <option value="title-desc">Título Z-A</option>
                <option value="rating-high">Mayor calificación</option>
                <option value="rating-low">Menor calificación</option>
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
                
                <!-- Rating (Calificación) - MOVIDO AQUÍ ANTES DEL CORREO -->
               <!-- Rating (Calificación) -->
<div class="flex items-center px-4 mt-2 mb-3">
  <svg class="mr-2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/>
  </svg>
  <estrella-rating 
    :calificacion="typeof property.average_rating === 'number' ? property.average_rating : 0"
    :mostrarNumero="true"
  />
</div>
                
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
import EstrellaRating from '~/components/EstrellaRating.vue'; // Importar componente de estrellas
import axios from 'axios';

export default {
  name: 'PropertyFinder',
  
  // Registrar el componente de estrellas
  components: {
    EstrellaRating
  },
  
  setup() {
    // Router y ruta actual
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();
    const favoritesStore = useFavoritesStore();
    const propertyService = usePropertyService();

    // Estado de búsqueda
    const searchQuery = ref('');
    
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
      property_type: null,
      category: null,
      amenities: [],
      status: 'active'
    });
    
    // Categorías actualizadas para tipos de negocios (mantenidas para referencia)
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
        id: 'entertainment',
        name: 'Entretenimiento',
        color: 'bg-red-100 text-red-600',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket-icon lucide-ticket"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>'
      }
    ]);

    // Método para filtrar property types basados en la categoría seleccionada
    const filteredPropertyTypes = computed(() => {
      if (!filters.value.category) {
        return propertyTypes;
      }
      
      const alojamientoTypes = ['Hotel', 'Motel'];
      const restauranteTypes = ['Cafetería', 'Restaurante', 'Bar y restaurante', 
                              'Comida rápida', 'Repostería', 'Heladería', 
                              'Bebidas', 'Bar', 'Otro'];
      const entretenimientoTypes = ['Gym', 'Balneario', 'Belleza', 'Futbol', 
                                  'Motocross', 'Casino', 'Cine', 'Videojuegos', 'Otro'];
      
      if (filters.value.category === 'Alojamiento') {
        return propertyTypes.filter(type => alojamientoTypes.includes(type.value));
      } else if (filters.value.category === 'Restaurante y bar') {
        return propertyTypes.filter(type => restauranteTypes.includes(type.value));
      } else if (filters.value.category === 'Entretenimiento') {
        return propertyTypes.filter(type => entretenimientoTypes.includes(type.value));
      }
      
      return propertyTypes;
    });

    // Método para cargar las calificaciones de las propiedades
    const loadPropertyRatings = async () => {
  if (properties.value.length === 0) return;
  
  try {
    console.log('Cargando calificaciones para', properties.value.length, 'propiedades');
    
    // Buscamos propiedades sin calificación
    const propsToLoad = properties.value.filter(p => 
      p.average_rating === undefined || p.average_rating === null
    );
    
    console.log(`${propsToLoad.length} propiedades necesitan cargar calificación`);
    
    // Para cada propiedad sin calificación, obtener su calificación
    const promises = propsToLoad.map(async (prop) => {
      try {
        const rating = await propertyService.getPropertyRating(prop.id);
        console.log(`Propiedad ${prop.id} - ${prop.title} - Rating: ${rating}`);
        
        // Asegurar que rating sea un número (convertir si es necesario)
        prop.average_rating = rating !== null && rating !== undefined ? Number(rating) : 0;
      } catch (err) {
        console.error(`Error al cargar rating para propiedad ${prop.id}:`, err);
        prop.average_rating = 0;
      }
    });
    
    await Promise.all(promises);
    console.log('Calificaciones cargadas correctamente');
    
    // Comprobar que todas las propiedades tienen calificación ahora
    const missingRatings = properties.value.filter(p => 
      p.average_rating === undefined || p.average_rating === null
    ).length;
    
    if (missingRatings > 0) {
      console.warn(`Aún hay ${missingRatings} propiedades sin calificación`);
    } else {
      console.log('Todas las propiedades tienen calificación asignada');
    }
  } catch (error) {
    console.error('Error al cargar calificaciones:', error);
  }
};

    // API URL
    // const API_URL = process.env.API_URL || 'http://localhost:3000/api';

    // Manejar la búsqueda
    const handleSearch = () => {
      if (searchQuery.value.trim()) {
        console.log('Buscando:', searchQuery.value);
        currentPage.value = 1;
        loading.value = true;
        
        // Especificar los campos donde queremos buscar
        const searchFields = ['title', 'category', 'property_type'];
        
        propertyService.searchProperties(searchQuery.value, searchFields)
          .then(result => {
            console.log('Resultado de búsqueda:', result);
            
            if (result && result.success) {
              properties.value = result.data?.properties || [];
              totalProperties.value = result.data?.total || properties.value.length;
              console.log('Propiedades encontradas:', properties.value.length);
              
              // Cargar calificaciones para las propiedades encontradas
              loadPropertyRatings();
            } else {
              error.value = 'No se pudieron cargar los resultados de búsqueda';
              properties.value = [];
              totalProperties.value = 0;
            }
          })
          .catch(err => {
            console.error('Error en búsqueda:', err);
            error.value = 'Error al buscar propiedades';
            properties.value = [];
            totalProperties.value = 0;
          })
          .finally(() => {
            loading.value = false;
          });
        
        // Actualizar la URL para reflejar la búsqueda
        router.replace({ 
          query: { 
            ...route.query,
            q: searchQuery.value,
            page: 1
          }
        });
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
    
    // Seleccionar categoría (versión modificada para trabajar directamente con el selector)
    const selectCategory = (categoryValue) => {
      console.log('Categoría seleccionada:', categoryValue);
      
      // Verificar si la categoría está cambiando
      const categoryChanged = filters.value.category !== categoryValue;
      
      // Establecer la categoría
      filters.value.category = categoryValue;
      
      // Reiniciar la página
      currentPage.value = 1;
      
      // Si la categoría cambió, verificar los tipos de propiedad seleccionados
      if (categoryChanged) {
        const alojamientoTypes = ['Hotel', 'Motel'];
        const restauranteTypes = ['Cafetería', 'Restaurante', 'Bar y restaurante', 
                                'Comida rápida', 'Repostería', 'Heladería', 
                                'Bebidas', 'Bar', 'Otro'];
        const entretenimientoTypes = ['Gym', 'Balneario', 'Belleza', 'Futbol', 
                                    'Motocross', 'Casino', 'Cine', 'Videojuegos', 'Otro'];
        
        let validTypes = [];
        
        if (categoryValue === 'Alojamiento') {
          validTypes = alojamientoTypes;
        } else if (categoryValue === 'Restaurante y bar') {
          validTypes = restauranteTypes;
        } else if (categoryValue === 'Entretenimiento') {
          validTypes = entretenimientoTypes;
        }
        
        // Filtrar los tipos de propiedad seleccionados para mantener solo los compatibles
        if (selectedPropertyTypes.value.length > 0) {
          const compatibleTypes = selectedPropertyTypes.value.filter(type => validTypes.includes(type));
          
          // Si hay tipos compatibles, actualizar la selección
          if (compatibleTypes.length > 0) {
            selectedPropertyTypes.value = compatibleTypes;
            
            if (compatibleTypes.length === 1) {
              filters.value.property_type = compatibleTypes[0];
            } else {
              filters.value.property_type = compatibleTypes;
            }
          } else {
            // Si no hay tipos compatibles, limpiar la selección
            selectedPropertyTypes.value = [];
            filters.value.property_type = null;
          }
        }
      }
      
      // Actualizar parámetros de URL y buscar propiedades
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
  const handleSortChange = async () => {
  console.log('Cambiando ordenación a:', sortBy.value);
  
  // Si estamos ordenando por calificación, asegurarse de que se han cargado
  if (sortBy.value === 'rating-high' || sortBy.value === 'rating-low') {
    console.log('Ordenando por rating, verificando datos...');
    
    // Buscamos propiedades sin calificación
    const propsWithoutRating = properties.value.filter(p => 
      p.average_rating === undefined || p.average_rating === null
    );
    
    // Solo cargamos ratings si es necesario
    if (propsWithoutRating.length > 0) {
      console.log(`${propsWithoutRating.length} propiedades necesitan cargar calificación`);
      await loadPropertyRatings();
    }
    
    // Solo actualizamos los parámetros de URL sin hacer fetchProperties
    currentPage.value = 1;
    updateQueryParams();
    
    // Asegurarnos de que la ordenación se refleja en la UI (aunque ya está manejada por el computed)
    console.log('Ordenación en cliente completada');
    
    // Importante: aquí NO llamamos a fetchProperties() para evitar la llamada al backend
    // El ordenamiento se maneja a través de la computed property sortedProperties
    loading.value = false;
  } else {
    // Para otros tipos de ordenación, usamos el flujo normal
    currentPage.value = 1;
    updateQueryParams();
    fetchProperties();
  }
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
            key !== 'status') {
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

    // Obtener propiedades de la API (MÉTODO MODIFICADO)
   const fetchProperties = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Si estamos ordenando por rating, cargar todas las propiedades sin filtros adicionales
    const isRatingSort = sortBy.value === 'rating-high' || sortBy.value === 'rating-low';
    
    // Convertir filtros a formato API (simplificamos si es ordenación por rating)
    const apiFilters = {
      page: currentPage.value,
      limit: isRatingSort ? 100 : itemsPerPage.value, // Aumentamos el límite para obtener más propiedades
      sort: isRatingSort ? 'newest' : sortBy.value // Usamos 'newest' como alternativa segura
    };
    
    // Solo agregamos filtros adicionales si no estamos ordenando por rating
    if (!isRatingSort) {
      if (filters.value.city) {
        apiFilters.city = filters.value.city;
      }
      
      if (filters.value.amenities && filters.value.amenities.length > 0) {
        apiFilters.amenities = filters.value.amenities;
      }
      
      if (filters.value.property_type) {
        apiFilters.property_type = filters.value.property_type;
      }
    }
    
    let result;
    
    // Si hay término de búsqueda, usar la búsqueda
    if (searchQuery.value.trim()) {
      const searchFields = ['title', 'category', 'property_type'];
      result = await propertyService.searchProperties(searchQuery.value, searchFields);
    }
    // Si no hay búsqueda, usar el método más adecuado según los filtros
    else {
      result = await propertyService.getProperties(apiFilters);
    }
    
    console.log('Respuesta del API:', result);
    
    // Procesar resultados
    if (result && result.success) {
      properties.value = result.data?.properties || [];
      totalProperties.value = result.data?.total || 0;
      
      console.log('Propiedades cargadas:', properties.value.length);
      
      // Aplicar filtro de categoría en el cliente si es necesario
      if (filters.value.category && properties.value.length > 0) {
        const filtered = properties.value.filter(property => 
          property.category === filters.value.category
        );
        
        console.log(`Filtrado por categoría '${filters.value.category}': ${filtered.length} propiedades`);
        
        properties.value = filtered;
        totalProperties.value = filtered.length;
      }
      
      // Cargar calificaciones para las propiedades
      await loadPropertyRatings();
      
      // Importante: Si estamos ordenando por rating, lo hacemos directamente aquí
      // en lugar de dejarlo solo para el computed property
      if (isRatingSort) {
        console.log('Aplicando ordenación por rating directamente a propiedades');
        if (sortBy.value === 'rating-high') {
          properties.value.sort((a, b) => {
            const ratingA = parseFloat(a.average_rating) || 0;
            const ratingB = parseFloat(b.average_rating) || 0;
            return ratingB - ratingA;
          });
        } else { // rating-low
          properties.value.sort((a, b) => {
            const ratingA = parseFloat(a.average_rating) || 0;
            const ratingB = parseFloat(b.average_rating) || 0;
            return ratingA - ratingB;
          });
        }
      }
      
    } else {
      error.value = 'No se pudieron cargar las propiedades';
      properties.value = [];
      totalProperties.value = 0;
    }
  } catch (err) {
    console.error('Error al obtener propiedades:', err);
    error.value = 'Error al cargar las propiedades. Por favor, inténtelo de nuevo.';
    properties.value = [];
    totalProperties.value = 0;
  } finally {
    loading.value = false;
  }
};
    // Ordenar propiedades (actualizado para el nuevo modelo)
   const sortedProperties = computed(() => {
  let result = [...properties.value];
  console.log('Ordenando propiedades, método:', sortBy.value);
  
  // Log de calificaciones para depuración
  console.log('Calificaciones de propiedades:');
  result.forEach(prop => {
    console.log(`${prop.id} - ${prop.title}: ${prop.average_rating || 0}`);
  });
  
  if (sortBy.value === 'id-asc') {
    result.sort((a, b) => a.id - b.id);
  } else if (sortBy.value === 'newest') {
    result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
  } else if (sortBy.value === 'views-high') {
    result.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (sortBy.value === 'views-low') {
    result.sort((a, b) => (a.views || 0) - (b.views || 0));
  } else if (sortBy.value === 'title-asc') {
    result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  } else if (sortBy.value === 'title-desc') {
    result.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
  } else if (sortBy.value === 'rating-high') {
    // Mejorado: Asegurar que las calificaciones sean números y manejar nulos/undefined
    result.sort((a, b) => {
      const ratingA = parseFloat(a.average_rating) || 0;
      const ratingB = parseFloat(b.average_rating) || 0;
      return ratingB - ratingA;
    });
    console.log('Después de ordenar por rating-high:', result.map(p => `${p.title}: ${p.average_rating || 0}`));
  } else if (sortBy.value === 'rating-low') {
    // Mejorado: Asegurar que las calificaciones sean números y manejar nulos/undefined
    result.sort((a, b) => {
      const ratingA = parseFloat(a.average_rating) || 0;
      const ratingB = parseFloat(b.average_rating) || 0;
      return ratingA - ratingB;
    });
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
        city: '',
        property_type: null,
        category: null,
        amenities: [],
        status: 'active'
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
      } else {
        searchQuery.value = ''; // Limpiar búsqueda si no está en URL
      }
      
      // Establecer ordenación desde query
      if (query.sort && ['id-asc', 'newest', 'views-high', 'views-low', 'title-asc', 'title-desc', 'rating-high', 'rating-low'].includes(query.sort)) {
        sortBy.value = query.sort;
      }
      
      // Establecer página desde query
      if (query.page && !isNaN(parseInt(query.page))) {
        currentPage.value = parseInt(query.page);
      }
      
      // Establecer categoría desde query
      if (query.category) {
        filters.value.category = query.category;
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
      
      // Parsear amenidades si están en la URL
      if (query.amenities) {
        const amenitiesArray = Array.isArray(query.amenities) ? query.amenities : [query.amenities];
        filters.value.amenities = amenitiesArray;
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
      filteredPropertyTypes,
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
      formatPrice,
      loadPropertyRatings
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