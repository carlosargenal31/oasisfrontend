<template>
  <div class="container mx-auto px-4 py-5">
    <!-- Breadcrumb -->
    <div class="flex items-center mb-4 text-sm">
      <NuxtLink to="/" class="text-gray-500 hover:text-orange-600">Inicio</NuxtLink>
      <span class="mx-2 text-gray-400">></span>
      <span class="text-gray-700">Eventos</span>
    </div>

    <h1 class="text-3xl font-bold mb-6">Eventos en La Ceiba</h1>
    
    <!-- Loading state para destacados -->
    <div v-if="loadingFeatured" class="flex justify-center items-center h-32 mb-10">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
    </div>
    
    <!-- Eventos Destacados (3 columnas) -->
    <div v-else-if="featuredEvents.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pb-10 border-b">
      <div v-for="event in featuredEvents" :key="event.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-[500px] flex flex-col">
        <!-- Imagen del evento -->
        <div class="relative h-48">
          <NuxtLink :to="`/events/${event.id}`">
            <img 
              class="w-full h-full object-cover" 
              :src="event.image_url || getDefaultImage(event.id)" 
              :alt="event.event_name" 
            />
            <span class="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">Destacado</span>
          </NuxtLink>
        </div>
        
        <!-- Contenido del evento -->
        <div class="p-4 flex-1 flex flex-col">
          <!-- Tipo de evento y precio -->
          <div class="flex items-center justify-between mb-3">
            <span class="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded uppercase font-semibold">
              {{ translateEventType(event.event_type) }}
            </span>
            <span class="text-lg font-bold text-gray-800">
              {{ formatPrice(event.price) }}
            </span>
          </div>
          
          <!-- Título del evento -->
          <h2 class="text-lg font-bold mb-2 text-black line-clamp-2" style="height: 3rem;">
            <NuxtLink :to="`/events/${event.id}`" class="hover:text-orange-600">
              {{ event.event_name }}
            </NuxtLink>
          </h2>
          
          <!-- Fecha, hora y ubicación -->
          <div class="text-sm text-gray-600 mb-4">
            <div class="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(event.event_date) }} | {{ formatTime(event.event_time) }}</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="line-clamp-1">{{ event.location }}</span>
            </div>
          </div>
          
          <!-- Descripción -->
          <div class="flex-1 mb-4" style="min-height: 60px;">
            <p class="text-gray-600 text-sm line-clamp-3">
              {{ event.description || 'Sin descripción disponible.' }}
            </p>
          </div>
          
          <!-- Footer con información del organizador y enlace -->
          <div class="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
            <div class="flex items-center">
              <img 
                class="rounded-full w-8 h-8 mr-2 flex-shrink-0" 
                :src="event.profile_image || getCreatorImage(event.created_by)" 
                alt="Organizador" 
              />
              <div class="text-xs text-gray-600">
                <span class="line-clamp-1">Por {{ event.first_name }} {{ event.last_name }}</span>
              </div>
            </div>
            <NuxtLink 
              :to="`/events/${event.id}`" 
              class="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center whitespace-nowrap ml-2"
            >
              Ver detalles
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Contenido principal con sidebar -->
    <div class="flex flex-col md:flex-row">
      <!-- Sidebar izquierdo -->
      <div class="w-full md:w-1/4 md:pr-6 mb-8 md:mb-0">
        <!-- Ordenar por -->
        <div class="mb-6">
          <h3 class="text-sm text-gray-500 mb-2">Ordenar por:</h3>
          <select v-model="sortOption" @change="handleSortChange" class="w-full p-2 border rounded-md text-sm">
            <option value="date_asc">Fecha (próximos primero)</option>
            <option value="date_desc">Fecha (más lejanos primero)</option>
            <option value="name_asc">Nombre (A-Z)</option>
            <option value="name_desc">Nombre (Z-A)</option>
            <option value="price_asc">Precio (menor a mayor)</option>
            <option value="price_desc">Precio (mayor a menor)</option>
          </select>
        </div>

        <!-- Búsqueda -->
        <div class="mb-6">
          <div class="relative">
            <input 
              type="text" 
              v-model="searchTerm"
              placeholder="Buscar eventos..." 
              class="w-full p-2 pl-3 pr-10 border rounded-md text-sm"
              @keyup.enter="searchEvents"
            />
            <button @click="searchEvents" class="absolute right-2 top-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Filtro de fecha -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">Fecha</h3>
          <div class="space-y-2">
            <div>
              <label class="block text-sm text-gray-600 mb-1">Desde</label>
              <input 
                type="date" 
                v-model="dateFrom"
                class="w-full p-2 border rounded-md text-sm"
                @change="handleDateChange"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Hasta</label>
              <input 
                type="date" 
                v-model="dateTo"
                class="w-full p-2 border rounded-md text-sm"
                @change="handleDateChange"
              />
            </div>
          </div>
          <div class="mt-3 flex space-x-2">
            <button 
              @click="filterUpcomingEvents"
              class="px-3 py-1 text-xs text-white bg-orange-500 rounded-md hover:bg-orange-600"
            >
              Próximos eventos
            </button>
            <button 
              @click="resetDateFilters"
              class="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Limpiar
            </button>
          </div>
        </div>

        <!-- Tipos de eventos -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">Tipos de eventos</h3>
          <ul class="space-y-2">
            <li class="flex justify-between mb-2">
              <a href="#" @click.prevent="resetFilters" class="text-orange-600 font-medium hover:underline">
                Todos los tipos
              </a>
            </li>
            <li v-for="eventType in eventTypes" :key="eventType.name" class="flex justify-between">
              <a 
                href="#" 
                @click.prevent="filterByType(eventType.name)" 
                :class="[
                  'hover:text-orange-600', 
                  activeEventType === eventType.name ? 'text-orange-600 font-medium' : 'text-gray-700'
                ]"
              >
                {{ translateEventType(eventType.name) }}
              </a>
              <span class="text-gray-500">({{ eventType.count || 0 }})</span>
            </li>
          </ul>
        </div>

        <!-- Filtro de precio -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">Precio</h3>
          <div class="space-y-2">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="free-events"
                v-model="showFreeEvents"
                @change="filterByPrice"
                class="mr-2"
              />
              <label for="free-events" class="text-sm text-gray-600">Solo eventos gratuitos</label>
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Precio máximo</label>
              
              <!-- Slider para precio máximo -->
              <input 
                type="range" 
                v-model.number="maxPrice" 
                min="0" 
                max="1000" 
                step="50" 
                class="w-full mb-2"
                @input="filterByPrice"
              />
              
              
<!-- Input manual para precio exacto -->
              <div class="flex items-center">
                <span class="text-sm text-gray-500 mr-2">L.</span>
                <input 
                  type="number" 
                  v-model.number="maxPrice" 
                  min="0" 
                  max="50000" 
                  class="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                  @input="filterByPrice"
                  @change="filterByPrice"
                  placeholder="0"
                />
              </div>
              
              <div class="flex justify-between text-xs text-gray-500 mt-1">
                <span>L. 0</span>
                <span>L. {{ maxPrice }}</span>
              </div>
            </div>
          </div>
        </div>

        
          
       
      </div>

      <!-- Lista de eventos -->
      <div class="w-full md:w-3/4">
        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
        
        <!-- Error state -->
        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span class="block sm:inline">{{ error }}</span>
          <button 
            @click="fetchEvents" 
            class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Intentar de nuevo
          </button>
        </div>
        
        <!-- No results -->
        <div v-else-if="events.length === 0" class="text-center py-10">
          <p class="text-gray-500">No se encontraron eventos que coincidan con tu búsqueda.</p>
          <button 
            @click="resetFilters" 
            class="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Ver todos los eventos
          </button>
        </div>
        
        <!-- Lista de eventos ocupando ancho completo -->
<div v-else class="space-y-6">
  <div v-for="event in events" :key="event.id" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 h-[240px]">
    <div class="flex h-full">
      <!-- Imagen - reducida a 30% de ancho -->
      <div class="w-[30%] relative">
        <NuxtLink :to="`/events/${event.id}`">
          <img 
            class="w-full h-full object-cover" 
            :src="event.image_url || getDefaultImage(event.id)" 
            :alt="event.event_name" 
          />
          <!-- Estado badges -->
          <div class="absolute top-3 right-3 flex flex-col space-y-1">
            <span v-if="isEventToday(event.event_date)" class="bg-red-500 text-white text-xs px-2 py-1 rounded">Hoy</span>
            <span v-else-if="isEventThisWeek(event.event_date)" class="bg-blue-500 text-white text-xs px-2 py-1 rounded">Esta semana</span>
            <span v-if="event.status === 'pospuesto'" class="bg-yellow-500 text-white text-xs px-2 py-1 rounded">Pospuesto</span>
            <span v-else-if="event.status === 'cancelado'" class="bg-red-500 text-white text-xs px-2 py-1 rounded">Cancelado</span>
          </div>
        </NuxtLink>
      </div>
      
      <!-- Contenido - aumentado a 70% de ancho -->
      <div class="w-[70%] p-4 flex flex-col justify-center">
        <div>
          <!-- Tipo de evento y precio -->
          <div class="flex items-center justify-between mb-2">
            <span class="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded uppercase font-semibold">
              {{ translateEventType(event.event_type) }}
            </span>
            <span class="text-lg font-bold text-gray-800">
              {{ formatPrice(event.price) }}
            </span>
          </div>
          
          <!-- Título del evento -->
          <h2 class="text-xl font-bold mb-2 text-black line-clamp-1">
            <NuxtLink :to="`/events/${event.id}`" class="hover:text-orange-600">
              {{ event.event_name }}
            </NuxtLink>
          </h2>
          
          <!-- Fecha, hora y ubicación -->
          <div class="text-sm text-gray-600 mb-2">
            <div class="flex items-center flex-wrap gap-4 mb-1">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(event.event_date) }} | {{ formatTime(event.event_time) }}</span>
              </div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ event.location }}</span>
              </div>
            </div>
          </div>
          
          <!-- Descripción -->
          <p class="text-gray-600 text-sm mb-3 line-clamp-2">
            {{ event.description || 'Sin descripción disponible.' }}
          </p>
        </div>
        
        <!-- Footer con información del organizador y enlace -->
        <div class="flex justify-between items-center pt-2 border-t border-gray-100">
          <div class="flex items-center min-w-0 mr-4">
            <img 
              class="rounded-full w-8 h-8 mr-3 flex-shrink-0" 
              :src="event.profile_image || getCreatorImage(event.created_by)" 
              alt="Organizador" 
            />
            <div class="text-xs text-gray-600 min-w-0">
              <span>Por {{ event.first_name }} {{ event.last_name }}</span>
            </div>
          </div>
          <NuxtLink 
            :to="`/events/${event.id}`" 
            class="text-sm font-medium text-orange-500 hover:text-orange-600 flex items-center whitespace-nowrap"
          >
            Ver detalles
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</div>
        <!-- Paginación -->
        <div v-if="totalPages > 1" class="flex justify-center mt-10">
          <nav class="inline-flex items-center">
            <span class="text-sm text-gray-500 mr-4">Página {{ currentPage }} de {{ totalPages }}</span>
            <a 
              v-if="currentPage > 1"
              href="#" 
              @click.prevent="changePage(currentPage - 1)"
              class="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700 mr-1 hover:bg-gray-200 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <template v-for="page in paginationPages" :key="page">
              <a 
                v-if="page !== '...'"
                href="#" 
                @click.prevent="changePage(page)"
                :class="[
                  'w-8 h-8 flex items-center justify-center mx-1 rounded-full',
                  currentPage === page 
                    ? 'bg-orange-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                {{ page }}
              </a>
              <span 
                v-else
                class="w-8 text-center"
              >
                ...
              </span>
            </template>
            <a 
              v-if="currentPage < totalPages" 
              href="#" 
              @click.prevent="changePage(currentPage + 1)"
              class="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700 ml-1 hover:bg-gray-200 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import eventService from '@/services/eventService'

// Variables reactivas
const events = ref([])
const featuredEvents = ref([])
const loading = ref(true)
const loadingFeatured = ref(true)
const error = ref(null)
const eventTypes = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(5)  // *** CAMBIADO DE 10 A 5 ***
const totalEventsCount = ref(0)
const searchTerm = ref('')
const sortOption = ref('date_asc')
const activeEventType = ref('')
const dateFrom = ref('')
const dateTo = ref('')
const showFreeEvents = ref(false)
const maxPrice = ref(1000)
const statusFilters = ref({
  activo: true,
  pospuesto: false,
  cancelado: false
})

// Para compatibilidad con Nuxt
definePageMeta({
  title: 'Eventos La Ceiba',
})

// Función para traducir tipos de evento al español
const translateEventType = (type) => {
  if (!type) return ''
  
  const translations = {
    'festival': 'Festival',
    'concierto': 'Concierto',
    'feria': 'Feria',
    'taller': 'Taller',
    'conferencia': 'Conferencia',
    'webinar': 'Webinar',
    'curso': 'Curso',
    'exposición': 'Exposición',
    'networking': 'Networking'
  }
  
  return translations[type] || type.charAt(0).toUpperCase() + type.slice(1)
}

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    // Inicializar con todos los datos
    currentPage.value = 1;
    
    // Cargar datos iniciales
    await Promise.all([
      fetchFeaturedEvents(),
      fetchEventTypes()
    ])
    
    // Cargar eventos (con la página inicial)
    await fetchEvents()
  } catch (err) {
    console.error('Error al inicializar los eventos:', err)
  }
})

const fetchEvents = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Construir parámetros
    const params = {
      offset: (currentPage.value - 1) * itemsPerPage.value,
      limit: itemsPerPage.value  // Ahora es 5
    }
    
    // FILTRO DE ORDENACIÓN
    if (sortOption.value) {
      switch (sortOption.value) {
        case 'date_asc':
          params.sort_by = 'event_date'
          params.sort_order = 'asc'
          break
        case 'date_desc':
          params.sort_by = 'event_date'
          params.sort_order = 'desc'
          break
        case 'name_asc':
          params.sort_by = 'event_name'
          params.sort_order = 'asc'
          break
        case 'name_desc':
          params.sort_by = 'event_name'
          params.sort_order = 'desc'
          break
        case 'price_asc':
          params.sort_by = 'price'
          params.sort_order = 'asc'
          break
        case 'price_desc':
          params.sort_by = 'price'
          params.sort_order = 'desc'
          break
      }
    }
    
    // FILTRO DE BÚSQUEDA
    if (searchTerm.value && searchTerm.value.trim() !== '') {
      params.search = searchTerm.value.trim()
    }
    
    // FILTRO POR TIPO DE EVENTO
    if (activeEventType.value) {
      params.event_type = activeEventType.value
    }
    
    // FILTRO DE FECHAS
    if (dateFrom.value) {
      params.date_from = dateFrom.value
    }
    
    if (dateTo.value) {
      params.date_to = dateTo.value
    }
    
    // FILTRO DE PRECIO
    if (showFreeEvents.value) {
      params.price = 0
    } else if (maxPrice.value < 1000) {
      params.price_max = maxPrice.value
    }
    
    // FILTRO DE ESTADO
    const activeStatuses = Object.entries(statusFilters.value)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      
    if (activeStatuses.length > 0 && activeStatuses.length < 3) {
      params.status = activeStatuses.join(',')
    }
    
    // Debug log
    console.log('Params siendo enviados:', params)
    
    // Hacer la solicitud
    const response = await eventService.getEvents(params)
    
    // Procesar respuesta
    if (response?.data?.data?.events) {
      events.value = response.data.data.events
      totalEventsCount.value = response.data.data.total || 0
    } else if (Array.isArray(response?.data?.data)) {
      events.value = response.data.data
      totalEventsCount.value = response.headers['x-total-count'] || events.value.length * 2
    } else if (Array.isArray(response?.data)) {
      events.value = response.data
      totalEventsCount.value = response.headers['x-total-count'] || events.value.length * 2
    }
    
  } catch (err) {
    console.error('Error fetching events:', err)
    error.value = 'Error al cargar los eventos. Por favor, intenta de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}

// Obtener eventos destacados desde la API (3 eventos)
const fetchFeaturedEvents = async () => {
  loadingFeatured.value = true
  
  try {
    const response = await eventService.getFeaturedEvents(3)
    
    if (response?.data?.data) {
      featuredEvents.value = response.data.data
    } else if (Array.isArray(response?.data)) {
      featuredEvents.value = response.data
    } else {
      featuredEvents.value = []
    }
  } catch (err) {
    console.error('Error fetching featured events:', err)
    featuredEvents.value = []
  } finally {
    loadingFeatured.value = false
  }
}

// Obtener tipos de eventos desde la API
const fetchEventTypes = async () => {
  try {
    const response = await eventService.getEventTypes()
    
    if (!response?.data?.data) {
      throw new Error('No se pudieron cargar los tipos de eventos')
    }
    
    const typesList = response.data.data
    
    // Formatear tipos con su conteo
    eventTypes.value = await Promise.all(typesList.map(async (type) => {
      try {
        const countResponse = await eventService.getEvents({
          event_type: type,
          count_only: true
        })
        
        let count = 0
        if (countResponse?.data?.data?.total) {
          count = countResponse.data.data.total
        } else if (countResponse?.data?.total) {
          count = countResponse.data.total
        }
        
        return { name: type, count }
      } catch (error) {
        console.error(`Error obteniendo conteo para tipo ${type}:`, error)
        return { name: type, count: 0 }
      }
    }))
  } catch (err) {
    console.error('Error fetching event types:', err)
    
    // Datos de fallback
    eventTypes.value = [
      { name: 'festival', count: 2 },
      { name: 'concierto', count: 3 },
      { name: 'feria', count: 1 },
      { name: 'taller', count: 1 },
      { name: 'conferencia', count: 1 },
      { name: 'webinar', count: 1 },
      { name: 'curso', count: 1 }
    ]
  }
}

// Cambiar la página actual
const changePage = (page) => {
  if (page === currentPage.value) return
  
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchEvents()
}

// Manejar cambio en la ordenación
const handleSortChange = () => {
  currentPage.value = 1
  fetchEvents()
}

// Filtrar por tipo de evento
const filterByType = (type) => {
  activeEventType.value = type
  currentPage.value = 1
  fetchEvents()
}

// Manejar cambios en las fechas
const handleDateChange = () => {
  currentPage.value = 1
  fetchEvents()
}

// Filtrar eventos próximos
const filterUpcomingEvents = () => {
  // Establecer fecha de hoy
  const today = new Date()
  dateFrom.value = today.toISOString().split('T')[0]
  
  // Establecer fecha un mes después
  const nextMonth = new Date()
  nextMonth.setMonth(nextMonth.getMonth() + 1)
  dateTo.value = nextMonth.toISOString().split('T')[0]
  
  currentPage.value = 1
  fetchEvents()
}

// Resetear filtros de fecha
const resetDateFilters = () => {
  dateFrom.value = ''
  dateTo.value = ''
  currentPage.value = 1
  fetchEvents()
}

// Filtrar por precio
const filterByPrice = () => {
  currentPage.value = 1
  fetchEvents()
}

// Filtrar por estado
const filterByStatus = () => {
  currentPage.value = 1
  fetchEvents()
}

// Resetear todos los filtros
const resetFilters = () => {
  activeEventType.value = ''
  searchTerm.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  showFreeEvents.value = false
  maxPrice.value = 1000
  statusFilters.value = {
    activo: true,
    pospuesto: false,
    cancelado: false
  }
  currentPage.value = 1
  sortOption.value = 'date_asc'
  fetchEvents()
}

// Buscar eventos
const searchEvents = () => {
  currentPage.value = 1
  fetchEvents()
}

// Computados
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(totalEventsCount.value / itemsPerPage.value))
})

// Generar array de páginas para la paginación
const paginationPages = computed(() => {
  if (totalPages.value <= 7) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  }
  
  const pages = []
  const currentPageNum = currentPage.value
  
  // Siempre mostrar primera página
  pages.push(1)
  
  // Mostrar puntos suspensivos si la página actual está lejos del inicio
  if (currentPageNum > 3) {
    pages.push('...')
  }
  
  // Añadir páginas alrededor de la página actual
  for (let i = Math.max(2, currentPageNum - 1); i <= Math.min(totalPages.value - 1, currentPageNum + 1); i++) {
    pages.push(i)
  }
  
  // Mostrar puntos suspensivos si la página actual está lejos del final
  if (currentPageNum < totalPages.value - 2) {
    pages.push('...')
  }
  
  // Siempre mostrar última página
  if (totalPages.value > 1) {
    pages.push(totalPages.value)
  }
  
  return pages
})

// Utilidades
const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  
  // Opciones para formato español
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  
  try {
    return date.toLocaleDateString('es-ES', options)
  } catch (e) {
    // Fallback en caso de error con el formato
    return date.toLocaleDateString('en-US', options)
  }
}

const formatTime = (timeString) => {
  if (!timeString) return ''
  
  // Convertir formato HH:MM:SS a HH:MM AM/PM
  const [hour, minute] = timeString.split(':')
  const hourNum = parseInt(hour)
  
  const ampm = hourNum >= 12 ? 'PM' : 'AM'
  const hour12 = hourNum % 12 || 12
  
  return `${hour12}:${minute} ${ampm}`
}

const formatPrice = (price) => {
  if (price === 0 || price === '0' || price === '0.00') {
    return 'Gratis'
  }
  
  return `L. ${parseFloat(price).toFixed(2)}`
}

const isEventToday = (dateString) => {
  if (!dateString) return false
  
  const eventDate = new Date(dateString)
  const today = new Date()
  
  return eventDate.getDate() === today.getDate() && 
         eventDate.getMonth() === today.getMonth() && 
         eventDate.getFullYear() === today.getFullYear()
}

const isEventThisWeek = (dateString) => {
  if (!dateString) return false
  
  const eventDate = new Date(dateString)
  const today = new Date()
  const oneWeekLater = new Date()
  oneWeekLater.setDate(today.getDate() + 7)
  
  return eventDate >= today && eventDate <= oneWeekLater
}

const getDefaultImage = (id) => {
  // Devolver una imagen predeterminada según el ID
  const images = [
    '/images/events/default1.jpg',
    '/images/events/default2.jpg',
    '/images/events/default3.jpg',
    '/images/events/default4.jpg',
    '/images/events/default5.jpg'
  ]
  const index = id ? (id % images.length) : 0
  return images[index]
}

const getCreatorImage = (creatorId) => {
  // Función para obtener la imagen del creador si no está disponible
  return `/images/avatars/avatar${(creatorId % 5) + 1}.jpg`
}

// Observadores
watch(currentPage, () => {
  // Scroll to top cuando cambia la página
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
/* Altura fija para todas las tarjetas de lista */
.h-\[240px\] {
  height: 240px;
}

/* Altura fija para todas las tarjetas destacadas */
.h-\[500px\] {
  height: 500px;
}

/* Asegurar que los títulos sean negros */
h2.text-black,
h2.text-black a {
  color: #000000 !important;
}

h2.text-black a:hover {
  color: #ea580c !important; /* orange-600 */
}

/* Estilos para truncamiento de texto */
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

/* Distribución exacta de ancho para lista de eventos */
.w-\[30\%\] {
  width: 30%;
}

.w-\[70\%\] {
  width: 70%;
}

/* Altura mínima para la descripción en eventos destacadas */
.min-h-\[60px\] {
  min-height: 60px;
}

/* Estilos para las imágenes */
.h-48 {
  height: 12rem;
}

/* Flexbox helper para mantener elementos al final */
.mt-auto {
  margin-top: auto;
}

/* Estilo para las etiquetas de tipo de evento */
.text-xs.font-semibold.uppercase {
  letter-spacing: 0.05em;
}

/* Estilos para los badges */
.bg-green-500 {
  background-color: #10b981;
}

.bg-orange-100 {
  background-color: #ffedd5;
}

.bg-orange-500 {
  background-color: #f97316;
}

.bg-red-500 {
  background-color: #ef4444;
}

.bg-blue-500 {
  background-color: #3b82f6;
}

.bg-yellow-500 {
  background-color: #eab308;
}

/* Colores de texto */
.text-orange-500 {
  color: #f97316;
}

.text-gray-400 {
  color: #9ca3af;
}

.text-gray-600 {
  color: #4b5563;
}

.text-gray-800 {
  color: #1f2937;
}

/* Hover states */
.hover\:text-orange-600:hover {
  color: #ea580c;
}

.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Transiciones */
.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
}

/* Border styles */
.border-gray-200 {
  border-color: #e5e7eb;
}

.border-gray-100 {
  border-color: #f3f4f6;
}

/* Espaciado */
.gap-6 {
  gap: 1.5rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

/* Padding y margin */
.p-4 {
  padding: 1rem;
}

.p-6 {
  padding: 1.5rem;
}

.mr-6 {
  margin-right: 1.5rem;
}

/* Border radius */
.rounded {
  border-radius: 0.25rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-full {
  border-radius: 50%;
}

/* Estilos para el manejo del espacio del usuario */
.min-w-0 {
  min-width: 0;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.flex-wrap {
  flex-wrap: wrap;
}

/* Responsive específico para móviles */
@media (max-width: 767px) {
  .h-\[240px\] {
    height: auto;
    min-height: 200px;
  }
  
  .h-\[500px\] {
    height: auto;
    min-height: 450px;
  }
  
  .w-\[30\%\],
  .w-\[70\%\] {
    width: 100%;
  }
  
  .flex {
    flex-direction: column;
  }
  
  .h-48 {
    height: 200px;
  }
  
  /* Ajustes para el footer en móvil */
  .flex.justify-between {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .mr-6 {
    margin-right: 0;
  }
  
  .whitespace-nowrap {
    white-space: normal;
  }
}

@media (max-width: 639px) {
  .flex-wrap {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Animación de carga */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Estilos adicionales para mejorar la presentación */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Hover smoothing */
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
}

/* Asegurar que los elementos SVG se alineen correctamente */
svg {
  vertical-align: middle;
}

/* Estilos para mejorar la responsividad de los elementos flex */
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-4 {
  gap: 1rem;
}

/* Color específico para los iconos */
.text-gray-400 svg {
  color: #9ca3af;
}

/* Estilos específicos para el input de precio */
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>