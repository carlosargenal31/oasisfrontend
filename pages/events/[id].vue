<template>
  <div>
    <!-- Header con logo y navegación -->
    <header class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-2">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="text-orange-500 font-bold flex items-center mr-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Finder
            </div>
            <nav class="hidden md:flex space-x-4 text-sm">
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Demos</a>
              <a href="/" class="px-3 py-2 rounded-md hover:bg-gray-100">Home</a>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Catalog</a>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Account</a>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Vendor</a>
              <a href="/events/grid" class="px-3 py-2 rounded-md bg-orange-100 text-orange-500 font-medium">Eventos</a>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Sign In" class="pl-10 pr-4 py-1 border border-gray-300 rounded-md text-sm" />
            </div>
            <a href="#" class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
            </a>
            <button class="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded">Add Event</button>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-5 max-w-6xl">
      <!-- Breadcrumb Navigation -->
      <div class="flex text-sm text-gray-500 mb-4">
        <a href="/" class="hover:text-orange-500">Home</a>
        <span class="mx-2">»</span>
        <a href="/events/grid" class="hover:text-orange-500">Eventos</a>
        <span class="mx-2">»</span>
        <span>{{ event.event_name }}</span>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center h-40">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <span class="block sm:inline">{{ error }}</span>
        <a href="/events/grid" class="text-red-700 font-medium hover:underline">Volver a eventos</a>
      </div>
      
      <template v-else>
        <!-- Status Alert -->
        <div v-if="event.status === 'cancelado'" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium">Este evento ha sido cancelado.</p>
            </div>
          </div>
        </div>
        
        <div v-else-if="event.status === 'pospuesto'" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium">Este evento ha sido pospuesto. La nueva fecha será anunciada pronto.</p>
            </div>
          </div>
        </div>
        
        <!-- Countdown for upcoming events -->
        <div v-if="isUpcomingEvent && event.status === 'activo'" class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-blue-700 font-medium">Este evento comienza en {{ daysUntilEvent }} días ({{ formatDate(event.event_date) }} a las {{ formatTime(event.event_time) }}).</p>
            </div>
          </div>
        </div>
        
        <!-- Event Title -->
        <div class="flex flex-col md:flex-row justify-between items-start mb-6">
          <h1 class="text-3xl font-bold mb-2 md:mb-0">{{ event.event_name }}</h1>
          <div class="flex items-center">
            <span class="bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-sm uppercase font-semibold mr-3">
              {{ translateEventType(event.event_type) }}
            </span>
            <span v-if="event.price > 0" class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              {{ formatPrice(event.price) }}
            </span>
            <span v-else class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              Gratis
            </span>
          </div>
        </div>
        
        <!-- Event Details -->
        <div class="flex flex-col lg:flex-row gap-8 mb-10">
          <!-- Left Column - Main Content -->
          <div class="w-full lg:w-2/3">
            <!-- Featured Image -->
            <div class="rounded-lg overflow-hidden mb-6">
              <img 
                class="w-full h-auto max-h-96 object-cover"
                :src="event.image_url || getDefaultImage()"
                :alt="event.event_name"
              />
            </div>
            
            <!-- Event Information Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <!-- Date and Time Card -->
              <div class="p-4 bg-white rounded-lg shadow border border-gray-100">
                <div class="flex items-start">
                  <div class="p-2 bg-orange-100 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-gray-500 mb-1">Fecha y Hora</h3>
                    <p class="text-gray-800 font-medium">{{ formatDate(event.event_date) }}</p>
                    <p class="text-gray-800">{{ formatTime(event.event_time) }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Location Card -->
              <div class="p-4 bg-white rounded-lg shadow border border-gray-100">
                <div class="flex items-start">
                  <div class="p-2 bg-orange-100 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-sm font-semibold text-gray-500 mb-1">Ubicación</h3>
                    <p class="text-gray-800 font-medium">{{ event.location }}</p>
                    <button 
                      @click="openMap"
                      class="text-orange-500 text-sm hover:underline mt-1 flex items-center"
                    >
                      Ver en mapa
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Event Description -->
            <div class="mb-8">
              <h2 class="text-xl font-bold mb-4">Descripción del Evento</h2>
              <div class="prose prose-lg max-w-none mb-6 text-gray-600">
                <div v-if="event.description" v-html="formattedDescription"></div>
                <p v-else class="text-gray-600">
                  No hay descripción disponible para este evento.
                </p>
              </div>
            </div>
            
            <!-- Share Options -->
            <div class="mb-8">
              <h3 class="text-lg font-bold mb-3">Comparte este evento</h3>
              <div class="flex space-x-3">
                <button @click.prevent="shareOnFacebook" class="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </button>
                <button @click.prevent="shareOnTwitter" class="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button @click.prevent="shareOnWhatsApp" class="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </button>
                <button @click.prevent="shareByEmail" class="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
                <button @click.prevent="copyEventLink" class="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div v-if="linkCopied" class="mt-2 text-sm text-green-600">
                ¡Enlace copiado al portapapeles!
              </div>
            </div>
            
            
            <!-- Related Events -->
            <div v-if="relatedEvents.length > 0" class="mb-8">
              <h3 class="text-lg font-bold mb-3">Eventos Relacionados</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="relatedEvent in relatedEvents" :key="relatedEvent.id" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div class="relative">
                    <NuxtLink :to="`/events/${relatedEvent.id}`">
                      <img 
                        class="w-full h-32 object-cover" 
                        :src="relatedEvent.image_url || getDefaultImage(relatedEvent.id)" 
                        :alt="relatedEvent.event_name" 
                      />
                      <div class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span class="text-white font-medium">Ver detalles</span>
                      </div>
                    </NuxtLink>
                  </div>
                  <div class="p-3">
                    <div class="text-xs text-orange-500 font-semibold mb-1">{{ formatDate(relatedEvent.event_date) }}</div>
                    <h4 class="text-sm font-medium mb-1">
                      <NuxtLink :to="`/events/${relatedEvent.id}`" class="hover:text-orange-500">
                        {{ relatedEvent.event_name }}
                      </NuxtLink>
                    </h4>
                    <div class="flex items-center text-xs text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{{ truncateLocation(relatedEvent.location, 30) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Column - Sidebar -->
          <div class="w-full lg:w-1/3">
       
            
            <!-- Add to Calendar Card -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
              <div class="p-4">
                <h3 class="text-lg font-bold text-gray-800 mb-3">Añadir al calendario</h3>
                <div class="space-y-2">
                  <button 
                    @click="addToGoogleCalendar" 
                    class="w-full py-2 px-3 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="#4285F4">
                      <path d="M21.56 2.44A.54.54 0 0 0 21 2H3a.54.54 0 0 0-.56.44A12 12 0 0 0 12 22a12 12 0 0 0 9.56-19.56zM12 20a10 10 0 0 1-8.42-4.58h16.84A10 10 0 0 1 12 20z" />
                      <path d="M8.54 12.04c0 .55.2 1.01.59 1.38.39.38.87.56 1.44.56.54 0 1.02-.18 1.4-.54.39-.36.58-.82.58-1.38 0-.55-.2-1.02-.58-1.4a1.9 1.9 0 0 0-1.4-.56c-.58 0-1.05.19-1.44.57-.4.37-.59.84-.59 1.37zm7.9 0c0 .55.2 1.01.59 1.38.39.38.88.56 1.45.56.54 0 1.02-.18 1.4-.54.39-.36.58-.82.58-1.38 0-.55-.2-1.02-.58-1.4a1.9 1.9 0 0 0-1.4-.56c-.58 0-1.06.19-1.45.57-.4.37-.59.84-.59 1.37z" />
                    </svg>
                    <span class="text-sm">Google Calendar</span>
                  </button>
                  <button 
                    @click="addToOutlookCalendar" 
                    class="w-full py-2 px-3 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="#0078D4">
                      <path d="M21.5 4h-19A1.5 1.5 0 0 0 1 5.5v13A1.5 1.5 0 0 0 2.5 20h19a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 21.5 4zM8 16H4v-5h4v5zm6 0h-4v-5h4v5zm6 0h-4v-5h4v5zm0-7H4V6h16v3z" />
                    </svg>
                    <span class="text-sm">Outlook Calendar</span>
                  </button>
                  <button 
                    @click="addToAppleCalendar" 
                    class="w-full py-2 px-3 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="#999999">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z" />
                    </svg>
                    <span class="text-sm">Apple Calendar</span>
                  </button>
                  <button 
                    @click="downloadICalFile" 
                    class="w-full py-2 px-3 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="#666666">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                    </svg>
                    <span class="text-sm">Descargar .ics</span>
                  </button>
                </div>
              </div>
            </div>
            
           
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import eventService from '@/services/eventService'

// Imágenes por defecto (fallback)
import defaultImage from "@/assets/images/blog/01.jpg"

const route = useRoute()

// Variables reactivas
const event = ref({})
const loading = ref(true)
const error = ref(null)
const relatedEvents = ref([])
const attendees = ref(1)
const bookingForm = ref({
  name: '',
  email: '',
  phone: ''
})
const isBookingSubmitting = ref(false)
const linkCopied = ref(false)

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    await fetchEvent()
  } catch (err) {
    console.error('Error inicializando página de evento:', err)
  }
})

// Obtener evento desde la API
const fetchEvent = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    if (!id) {
      throw new Error('ID de evento no proporcionado')
    }
    
    // Llamar al servicio de evento para obtener datos
    const response = await eventService.getEvent(id)
    
    // Verificar si tenemos datos válidos
    if (response && response.data && response.data.data) {
      event.value = response.data.data
    } else if (response && response.data) {
      event.value = response.data
    } else {
      throw new Error('Formato de respuesta inválido')
    }
    
    // Una vez que tenemos el evento, obtener eventos relacionados
    await fetchRelatedEvents(event.value.event_type, id)
    
  } catch (err) {
    console.error('Error al obtener evento:', err)
    error.value = 'Error al cargar el evento. Por favor, intenta de nuevo más tarde.'
    
    // Datos de fallback para desarrollo
    event.value = {
      id: 1,
      event_name: 'Gran Desfile del Carnaval de La Amistad',
      event_date: '2025-05-17',
      event_time: '15:00:00',
      price: 0.00,
      location: 'Avenida San Isidro, La Ceiba',
      description: 'El desfile principal con carrozas, comparsas, música y baile por las calles principales de La Ceiba.',
      event_type: 'festival',
      status: 'activo',
      created_by: 1,
      first_name: 'Admin',
      last_name: 'User'
    }
  } finally {
    loading.value = false
  }
}

// Obtener eventos relacionados por tipo, excluyendo el actual
const fetchRelatedEvents = async (eventType, currentEventId) => {
  if (!eventType) return
  
  try {
    const response = await eventService.getEvents({
      event_type: eventType,
      limit: 4,
      exclude_id: currentEventId
    })
    
    if (response && response.data && response.data.data && response.data.data.events) {
      relatedEvents.value = response.data.data.events
    } else if (response && response.data && Array.isArray(response.data.data)) {
      relatedEvents.value = response.data.data
    } else if (response && Array.isArray(response.data)) {
      relatedEvents.value = response.data
    }
  } catch (err) {
    console.error('Error al obtener eventos relacionados:', err)
    // Datos de fallback para desarrollo
    relatedEvents.value = [
      {
        id: 2,
        event_name: 'Concierto de Clausura del Carnaval',
        event_date: '2025-05-17',
        event_time: '20:00:00',
        location: 'Estadio Municipal Ceibeño',
        event_type: 'concierto'
      },
      {
        id: 3,
        event_name: 'Feria Gastronómica Ceibeña',
        event_date: '2025-05-16',
        event_time: '10:00:00',
        location: 'Parque Swinford',
        event_type: 'feria'
      }
    ]
  }
}

// Computados
const formattedDescription = computed(() => {
  if (!event.value.description) return ''
  
  // Convertir los saltos de línea en <br>
  return event.value.description.replace(/\n/g, '<br>')
})

const isUpcomingEvent = computed(() => {
  if (!event.value.event_date) return false
  
  const eventDate = new Date(event.value.event_date)
  const today = new Date()
  
  // Resetear las horas para comparar solo fechas
  today.setHours(0, 0, 0, 0)
  eventDate.setHours(0, 0, 0, 0)
  
  return eventDate >= today
})

const daysUntilEvent = computed(() => {
  if (!event.value.event_date) return 0
  
  const eventDate = new Date(event.value.event_date)
  const today = new Date()
  
  // Resetear las horas para comparar solo fechas
  today.setHours(0, 0, 0, 0)
  eventDate.setHours(0, 0, 0, 0)
  
  // Calcular la diferencia en días
  const differenceInTime = eventDate.getTime() - today.getTime()
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))
  
  return differenceInDays > 0 ? differenceInDays : 0
})

// Métodos
const validateAttendees = () => {
  // Asegurarse de que el número de asistentes esté entre 1 y 10
  if (attendees.value < 1) attendees.value = 1
  if (attendees.value > 10) attendees.value = 10
}

const incrementAttendees = () => {
  if (attendees.value < 10) {
    attendees.value++
  }
}

const decrementAttendees = () => {
  if (attendees.value > 1) {
    attendees.value--
  }
}

const calculateSubtotal = () => {
  return parseFloat(event.value.price || 0) * attendees.value
}

const calculateTax = () => {
  return calculateSubtotal() * 0.15
}

const calculateTotal = () => {
  return calculateSubtotal() + calculateTax()
}

const submitBooking = async () => {
  if (event.value.status !== 'activo') {
    alert('Lo sentimos, este evento no está disponible para reservas.')
    return
  }
  
  // Validación básica
  if (!bookingForm.value.name || !bookingForm.value.email) {
    alert('Por favor, completa los campos requeridos (nombre y email).')
    return
  }
  
  isBookingSubmitting.value = true
  
  try {
    // Aquí iría la llamada a la API para guardar la reserva
    // const response = await eventService.createBooking({
    //   event_id: event.value.id,
    //   attendees: attendees.value,
    //   name: bookingForm.value.name,
    //   email: bookingForm.value.email,
    //   phone: bookingForm.value.phone,
    //   total: calculateTotal()
    // })
    
    // Simulamos una espera
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mostrar confirmación
    alert(`¡Reserva realizada con éxito! Te esperamos en ${event.value.event_name}.`)
    
    // Resetear formulario
    bookingForm.value = {
      name: '',
      email: '',
      phone: ''
    }
    attendees.value = 1
  } catch (error) {
    console.error('Error al realizar la reserva:', error)
    alert('Lo sentimos, ha ocurrido un error al procesar tu reserva. Por favor, intenta de nuevo más tarde.')
  } finally {
    isBookingSubmitting.value = false
  }
}

const openMap = () => {
  if (!event.value.location) return
  
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.value.location)}`
  window.open(mapUrl, '_blank')
}

const getDirectionsUrl = (location) => {
  if (!location) return '#'
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`
}

// Métodos para compartir
const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`¡Asiste a ${event.value.event_name} el ${formatDate(event.value.event_date)}!`)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareOnWhatsApp = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`¡Hola! Te invito a asistir a ${event.value.event_name} el ${formatDate(event.value.event_date)}. Más información aquí: `)
  window.open(`https://wa.me/?text=${text}${url}`, '_blank')
}

const shareByEmail = () => {
  const subject = encodeURIComponent(`Invitación: ${event.value.event_name}`)
  const body = encodeURIComponent(`¡Hola! Te invito a asistir a ${event.value.event_name} el ${formatDate(event.value.event_date)} en ${event.value.location}. Más información aquí: ${window.location.href}`)
  window.location.href = `mailto:?subject=${subject}&body=${body}`
}

const copyEventLink = () => {
  navigator.clipboard.writeText(window.location.href)
    .then(() => {
      linkCopied.value = true
      setTimeout(() => {
        linkCopied.value = false
      }, 3000)
    })
    .catch(err => {
      console.error('Error al copiar el enlace:', err)
      alert('No se pudo copiar el enlace. Por favor, inténtalo manualmente.')
    })
}

const contactOrganizer = () => {
  // Aquí podríamos abrir un modal de contacto o redireccionar
  alert(`Para contactar a ${event.value.first_name} ${event.value.last_name}, por favor envía un correo a organizador@ejemplo.com`)
}

// Funciones para añadir al calendario
const addToGoogleCalendar = () => {
  if (!event.value.event_date || !event.value.event_time) return
  
  const startDate = new Date(`${event.value.event_date}T${event.value.event_time}`)
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // Duración de 2 horas por defecto
  
  const googleParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.value.event_name,
    dates: `${formatCalendarDate(startDate)}/${formatCalendarDate(endDate)}`,
    details: event.value.description || 'Sin descripción',
    location: event.value.location || '',
  })
  
  window.open(`https://calendar.google.com/calendar/render?${googleParams.toString()}`, '_blank')
}

const addToOutlookCalendar = () => {
  // Outlook Web usa parámetros similares a Google Calendar
  addToGoogleCalendar()
}

const addToAppleCalendar = () => {
  // Para Apple Calendar, lo mejor es descargar el archivo .ics
  downloadICalFile()
}

const downloadICalFile = () => {
  if (!event.value.event_date || !event.value.event_time) return
  
  const startDate = new Date(`${event.value.event_date}T${event.value.event_time}`)
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000) // Duración de 2 horas por defecto
  
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${event.value.event_name}`,
    `DTSTART:${formatCalendarDate(startDate)}`,
    `DTEND:${formatCalendarDate(endDate)}`,
    `DESCRIPTION:${event.value.description || 'Sin descripción'}`,
    `LOCATION:${event.value.location || ''}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n')
  
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `evento-${slugify(event.value.event_name)}.ics`
  link.click()
}

// Utilidades
const formatCalendarDate = (date) => {
  return date.toISOString().replace(/-|:|\.\d+/g, '')
}

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Reemplaza espacios con -
    .replace(/[^\w\-]+/g, '')       // Elimina caracteres especiales
    .replace(/\-\-+/g, '-')         // Reemplaza múltiples - con uno solo
    .replace(/^-+/, '')             // Elimina - del inicio
    .replace(/-+$/, '')             // Elimina - del final
}

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

const truncateLocation = (location, length) => {
  if (!location) return ''
  if (location.length <= length) return location
  
  return location.substring(0, length) + '...'
}

const getDefaultImage = () => {
  return defaultImage
}

const getCreatorImage = (creatorId) => {
  return `/images/avatars/avatar${(creatorId % 5) + 1}.jpg`
}

const capitalizeFirst = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}
</script>

<style scoped>
.prose {
  max-width: 100%;
  color: #4b5563;
}

.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

/* Colores específicos */
.text-orange-500 {
  color: #f97316;
}

.bg-orange-500 {
  background-color: #f97316;
}

.bg-orange-100 {
  background-color: #ffedd5;
}

.hover\:bg-orange-600:hover {
  background-color: #ea580c;
}

.hover\:text-orange-500:hover {
  color: #f97316;
}

/* Remove spinner from number input */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>