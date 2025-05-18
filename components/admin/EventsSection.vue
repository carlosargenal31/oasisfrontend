<!-- components/admin/EventsSection.vue -->
<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h2 class="text-lg font-bold text-gray-800 mb-3 sm:mb-0">Gestión de Eventos</h2>
      <button
        @click="$emit('open-event-modal', null)"
        class="flex items-center justify-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Añadir Evento
      </button>
    </div>
      
    <!-- Filtros y Búsqueda -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
      <!-- Búsqueda -->
      <div class="relative mb-4">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar eventos..." 
          class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          @keyup.enter="searchEvents"
        />
        <button 
          @click="searchEvents" 
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
          <label class="block text-xs font-medium text-gray-700 mb-1">Tipo de Evento</label>
          <div class="relative">
            <select v-model="localFilters.event_type" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500" @change="updateFilter('event_type', localFilters.event_type)">
              <option value="">Todos</option>
              <option v-for="type in eventTypes" :key="type" :value="type">{{ type }}</option>
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
              <option value="activo">Activo</option>
              <option value="cancelado">Cancelado</option>
              <option value="pospuesto">Pospuesto</option>
              <option value="completado">Completado</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              
            </div>
          </div>
        </div>
          
        <div class="col-span-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Fecha</label>
          <div class="relative">
            <select v-model="localFilters.date_filter" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500" @change="updateFilter('date_filter', localFilters.date_filter)">
              <option value="">Todos</option>
              <option value="upcoming">Próximos</option>
              <option value="past">Pasados</option>
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
                <option value="event_date">Fecha</option>
                <option value="event_name">Nombre</option>
                <option value="event_type">Tipo</option>
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

    <!-- Tabla de Eventos -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Evento</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha/Hora</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipo</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Precio</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="event in safeEvents" :key="event.id" :class="{'bg-gray-50': event.status !== 'activo'}" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="event.image_url || '/img/event-placeholder.jpg'" alt="" class="h-10 w-10 rounded-lg object-cover shadow-sm border border-gray-200">
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 truncate max-w-xs">{{ event.event_name }}</div>
                    <div class="text-xs text-gray-500 truncate max-w-xs">{{ event.location }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(event.event_date) }}</div>
                <div class="text-xs text-gray-500">{{ formatTime(event.event_time) }}</div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full bg-gray-100 text-gray-800">
                  {{ event.event_type }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  getEventStatusClass(event.status)
                ]">
                  <span :class="[
                    'h-1.5 w-1.5 rounded-full mr-1',
                    getEventStatusDotClass(event.status)
                  ]"></span>
                  {{ capitalizeFirstLetter(event.status) }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                {{ formatCurrency(event.price) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex space-x-1">
                  <button
                    @click="$emit('open-event-modal', event)"
                    class="p-1.5 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-50"
                    title="Editar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    @click="$emit('toggle-event-featured', event)"
                    :class="[
                      'p-1.5 rounded-full',
                      event.is_featured ? 'text-purple-600 hover:text-purple-900 hover:bg-purple-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    ]"
                    :title="event.is_featured ? 'Quitar destacado' : 'Destacar'"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  
                  <button
                    @click="$emit('toggle-event-home', event)"
                    :class="[
                      'p-1.5 rounded-full',
                      event.is_home ? 'text-blue-600 hover:text-blue-900 hover:bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    ]"
                    :title="event.is_home ? 'Quitar de portada' : 'Mostrar en portada'"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </button>
                  
                  <button
                    @click="$emit('change-event-status', event)"
                    class="p-1.5 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-50"
                    title="Cambiar estado"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="safeEvents.length === 0">
              <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-base font-medium">No se encontraron eventos</p>
                <p class="text-sm mt-1">Intenta con otros filtros o crea un nuevo evento</p>
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
              <span class="font-medium">{{ safePaginationStart }}</span>-<span class="font-medium">{{ safePaginationEnd }}</span> de <span class="font-medium">{{ safeFilteredEvents.length }}</span>
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
    events: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Object,
      default: () => ({
        event_type: '',
        status: '',
        date_filter: '',
        sortBy: 'event_date',
        sortDirection: 'asc'
      })
    },
    filteredEvents: {
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
    }
  },
  data() {
    return {
      searchQuery: '',
      localFilters: {
        event_type: '',
        status: '',
        date_filter: '',
        sortBy: 'event_date',
        sortDirection: 'asc'
      },
      eventTypes: []
    }
  },
  computed: {
    safeEvents() {
      return this.events || [];
    },
    safeFilteredEvents() {
      return this.filteredEvents || [];
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
    
    // Extraer tipos de eventos únicos
    const types = new Set();
    this.safeEvents.forEach(event => {
      if (event.event_type) {
        types.add(event.event_type);
      }
    });
    this.eventTypes = Array.from(types).sort();
  },
  methods: {
    searchEvents() {
      this.$emit('search-events', this.searchQuery);
    },
    updateFilter(key, value) {
      this.$emit('update-filter', key, value);
    },
    formatDate(dateString) {
      if (!dateString) return '';
      
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
      } catch (error) {
        console.error('Error al formatear fecha:', error);
        return dateString;
      }
    },
    formatTime(timeString) {
      if (!timeString) return '';
      
      try {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
      } catch (error) {
        console.error('Error al formatear hora:', error);
        return timeString;
      }
    },
    formatCurrency(amount) {
      if (amount === 0 || amount === '0' || amount === '0.00') return 'Gratis';
      
      try {
        return new Intl.NumberFormat('es-HN', {
          style: 'currency',
          currency: 'HNL',
          minimumFractionDigits: 2
        }).format(amount);
      } catch (error) {
        console.error('Error al formatear moneda:', error);
        return `L ${amount}`;
      }
    },
    getEventStatusClass(status) {
      switch (status) {
        case 'activo':
          return 'bg-green-100 text-green-800';
        case 'cancelado':
          return 'bg-red-100 text-red-800';
        case 'pospuesto':
          return 'bg-yellow-100 text-yellow-800';
        case 'completado':
          return 'bg-blue-100 text-blue-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
    getEventStatusDotClass(status) {
      switch (status) {
        case 'activo':
          return 'bg-green-400';
        case 'cancelado':
          return 'bg-red-400';
        case 'pospuesto':
          return 'bg-yellow-400';
        case 'completado':
          return 'bg-blue-400';
        default:
          return 'bg-gray-400';
      }
    },
    capitalizeFirstLetter(string) {
      if (!string) return '';
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.localFilters = { ...newFilters };
      },
      deep: true
    },
    events: {
      handler(newEvents) {
        // Actualizar tipos de eventos cuando cambien los eventos
        const types = new Set();
        newEvents.forEach(event => {
          if (event.event_type) {
            types.add(event.event_type);
          }
        });
        this.eventTypes = Array.from(types).sort();
      },
      deep: true
    }
  }
}
</script>

<style scoped>
/* Opcional: Animaciones cuando cambia el contenido */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>