<!-- components/admin/BusinessSection.vue -->
<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h2 class="text-lg font-bold text-gray-800 mb-3 sm:mb-0">Gestión de Comercios</h2>
      <button
        @click="$emit('open-business-modal', null)"
        class="flex items-center justify-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Añadir Comercio
      </button>
    </div>
      
    <!-- Filtros y Búsqueda -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
      <!-- Búsqueda -->
      <div class="relative mb-4">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar comercios..." 
          class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          @keyup.enter="searchBusinesses"
        />
        <button 
          @click="searchBusinesses" 
          class="absolute right-3 top-2 text-gray-400 hover:text-orange-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
        
      <!-- Filtros -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="col-span-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Categoría</label>
          <div class="relative">
            <select v-model="localFilters.category" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500" @change="updateFilter('category', localFilters.category)">
              <option value="">Todas</option>
              <option value="Alojamiento">Alojamiento</option>
              <option value="Restaurante y bar">Restaurante y bar</option>
              <option value="Entretenimiento">Entretenimiento</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              
            </div>
          </div>
        </div>
          
        <div class="col-span-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Tipo</label>
          <div class="relative">
            <select v-model="localFilters.property_type" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500" @change="updateFilter('property_type', localFilters.property_type)">
              <option value="">Todos</option>
              <template v-if="localFilters.category === 'Alojamiento'">
                <option v-for="type in propertyTypes.Alojamiento" :key="type" :value="type">{{ type }}</option>
              </template>
              <template v-else-if="localFilters.category === 'Restaurante y bar'">
                <option v-for="type in propertyTypes['Restaurante y bar']" :key="type" :value="type">{{ type }}</option>
              </template>
              <template v-else-if="localFilters.category === 'Entretenimiento'">
                <option v-for="type in propertyTypes.Entretenimiento" :key="type" :value="type">{{ type }}</option>
              </template>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              
            </div>
          </div>
        </div>
          
        <div class="col-span-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Estado</label>
          <div class="relative">
            <select v-model="localFilters.status" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500" @change="updateFilter('status', localFilters.status)">
              <option value="">Todos</option>
              <option value="active">Activo</option>
              <option value="archived">Inactivo</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              
            </div>
          </div>
        </div>

        <!-- Orden -->
        <div class="col-span-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Ordenar por</label>
          <div class="flex items-center">
            <div class="relative flex-grow">
              <select v-model="localFilters.sortBy" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white" @change="updateFilter('sortBy', localFilters.sortBy)">
                <option value="title">Nombre</option>
                <option value="category">Categoría</option>
                <option value="property_type">Tipo</option>
                <option value="average_rating">Calificación</option>
                <option value="views">Vistas</option>
                <option value="created_at">Fecha de creación</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
            <button 
              @click="$emit('toggle-sort-direction')" 
              class="ml-2 p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-orange-600"
              title="Cambiar dirección"
            >
              <svg v-if="localFilters.sortDirection === 'asc'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de Comercios -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Comercio</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría/Tipo</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Calificación</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vistas</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="business in safeBusinesses" :key="business.id" :class="{'bg-gray-50': business.archived}" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="business.image || '/img/business-placeholder.jpg'" alt="" class="h-10 w-10 rounded-lg object-cover shadow-sm border border-gray-200">
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 truncate max-w-xs">{{ business.title }}</div>
                    <div class="text-xs text-gray-500 truncate max-w-xs">{{ business.address }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div>
                  <span class="px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {{ business.category }}
                  </span>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                  {{ business.property_type }}
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  business.archived ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                ]">
                  <span :class="[
                    'h-1.5 w-1.5 rounded-full mr-1',
                    business.archived ? 'bg-red-400' : 'bg-green-400'
                  ]"></span>
                  {{ business.archived ? 'Inactivo' : 'Activo' }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <span :class="['text-yellow-400', {'opacity-40': !business.average_rating}]">★</span>
                  <span class="ml-1 text-sm text-gray-700">{{ business.average_rating || '0.0' }}</span>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                {{ business.views || 0 }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex space-x-1">
                  <button
                    @click="$emit('open-business-modal', business)"
                    class="p-1.5 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-50"
                    title="Editar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <div class="relative">
                    <button
                      @click="$emit('toggle-business-featured', business)"
                      @mouseenter="$emit('update-tooltip', !canBeHighlighted(business) && !business.isFeatured ? business.id : null)"
                      @mouseleave="$emit('update-tooltip', null)"
                      :class="[
                        'p-1.5 rounded-full',
                        business.isFeatured ? 'text-purple-600 hover:text-purple-900 hover:bg-purple-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      ]"
                      :disabled="!canBeHighlighted(business)"
                      :title="business.isFeatured ? 'Quitar destacado' : 'Destacar'"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                    
                    <!-- Tooltip -->
                    <div 
                      v-if="showTooltipFor === business.id" 
                      class="absolute z-10 bg-black bg-opacity-80 text-white text-xs rounded py-1 px-2 -left-20 -bottom-1 w-40"
                    >
                      <div class="absolute bottom-1 left-20 -mb-1 transform rotate-45 w-2 h-2 bg-black bg-opacity-80"></div>
                      <p v-if="business.category === 'Alojamiento'">
                        Límite alcanzado: 10 destacados
                      </p>
                      <p v-else-if="business.category === 'Restaurante y bar'">
                        Límite alcanzado: 6 destacados
                      </p>
                      <p v-else>
                        Límite alcanzado
                      </p>
                    </div>
                  </div>
                  
                  <button
                    @click="$emit('toggle-business-status', business)"
                    :class="[
                      'p-1.5 rounded-full',
                      !business.archived ? 'text-red-600 hover:text-red-900 hover:bg-red-50' : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                    ]"
                    :title="!business.archived ? 'Desactivar' : 'Activar'"
                  >
                    <svg v-if="!business.archived" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  
                  <!-- Botón para ver razón de archivo -->
                  <button
                    v-if="business.archived"
                    @click="$emit('show-archive-reason', business)"
                    class="p-1.5 text-blue-600 hover:text-blue-900 rounded-full hover:bg-blue-50"
                    title="Ver razón"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="safeBusinesses.length === 0">
              <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-base font-medium">No se encontraron comercios</p>
                <p class="text-sm mt-1">Intenta con otros filtros o crea un nuevo comercio</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Paginación compacta -->
      <div class="px-4 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-700">
              <span class="font-medium">{{ safePaginationStart }}</span>-<span class="font-medium">{{ safePaginationEnd }}</span> de <span class="font-medium">{{ safeFilteredBusinesses.length }}</span>
            </p>
          </div>
          <div class="flex items-center space-x-1">
            <button 
              @click="$emit('change-page', currentPage - 1)" 
              :disabled="currentPage === 1"
              :class="[
                'p-1.5 border border-gray-300 rounded-md',
                currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-700 hover:text-orange-600'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex space-x-1">
              <button 
                v-for="page in safeDisplayPages" 
                :key="page"
                @click="$emit('change-page', page)"
                :class="[
                  'px-2.5 py-1 rounded-md',
                  page === '...' ? 'text-gray-500 cursor-default' : 'border border-gray-300',
                  currentPage === page ? 'bg-orange-600 text-white border-orange-600' : 'hover:bg-gray-50 text-gray-700 hover:text-orange-600'
                ]"
              >
                {{ page }}
              </button>
            </div>
            <button 
              @click="$emit('change-page', currentPage + 1)" 
              :disabled="currentPage >= totalPages"
              :class="[
                'p-1.5 border border-gray-300 rounded-md',
                currentPage >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-700 hover:text-orange-600'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    businesses: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Object,
      default: () => ({
        category: '',
        property_type: '',
        status: '',
        sortBy: 'title',
        sortDirection: 'asc'
      })
    },
    filteredBusinesses: {
      type: Array,
      default: () => []
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    paginationStart: {
      type: Number,
      default: 0
    },
    paginationEnd: {
      type: Number,
      default: 0
    },
    displayPages: {
      type: Array,
      default: () => [1]
    },
    showTooltipFor: {
      type: [String, Number, null],
      default: null
    }
  },
  data() {
    return {
      searchQuery: '',
      localFilters: {
        category: '',
        property_type: '',
        status: '',
        sortBy: 'title',
        sortDirection: 'asc'
      },
      propertyTypes: {
        'Alojamiento': ['Hotel', 'Motel'],
        'Restaurante y bar': ['Cafetería', 'Restaurante', 'Bar y restaurante', 'Comida rápida', 'Repostería', 'Heladería', 'Bebidas', 'Bar'],
        'Entretenimiento': ['Gym', 'Balneario', 'Belleza', 'Futbol', 'Motocross', 'Casino', 'Cine', 'Videojuegos']
      }
    }
  },
  computed: {
    safeBusinesses() {
      // En lugar de usar paginatedBusinesses, usar directamente los businesses que recibe como prop
      return this.businesses || [];
    },
    safeFilteredBusinesses() {
      return this.filteredBusinesses || [];
    },
    safePaginationStart() {
      return this.paginationStart || 0;
    },
    safePaginationEnd() {
      return this.paginationEnd || 0;
    },
    safeDisplayPages() {
      return this.displayPages || [1];
    }
  },
  created() {
    // Sincronizar valores locales con props
    this.localFilters = { ...this.filters };
  },
  methods: {
    searchBusinesses() {
      this.$emit('search-businesses', this.searchQuery);
    },
    updateFilter(key, value) {
      this.$emit('update-filter', key, value);
    },
    canBeHighlighted(business) {
      // Si ya está destacado, siempre permitir (para poder quitarlo)
      if (business.isFeatured) return true;
      
      // Si está archivado, no permitir destacar
      if (business.archived) return false;
      
      // Esta función podría ser provista por el componente padre
      // Acá simplificamos para permitir destacar
      return true;
    }
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.localFilters = { ...newFilters };
      },
      deep: true
    }
  }
}
</script>