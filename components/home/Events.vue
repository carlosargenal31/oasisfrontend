<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Importar el router
import eventService from '~/services/eventService'; // Importar el servicio de eventos

// Inicializar el router
const router = useRouter();

// Estado para eventos
const events = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Para la navegación del slider
const currentIndex = ref(0);
const visibleCount = ref(2); // Número de elementos visibles en pantallas grandes

// Función para navegar a la página de detalles del evento
const navigateToEvent = (eventId) => {
  router.push(`/events/${eventId}`);
};

// Función para cargar los eventos destacados desde la API
const loadFeaturedEvents = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Obtener eventos destacados desde la API
    const result = await eventService.getFeaturedEvents(4); // Obtener 4 eventos destacados
    
    if (result && result.data && result.data.data) {
      // Transformar los eventos al formato que necesitamos para el carrusel
      const transformedEvents = result.data.data.map(event => ({
        id: event.id,
        name: event.event_name || event.title || '', 
        image: event.image_url || getDefaultImage(event.id),
        date: formatDate(event.event_date),
        time: formatTime(event.event_time),
        price: formatPrice(event.price),
        location: event.location,
        type: translateEventType(event.event_type),
        isFavorite: false // Por defecto no es favorito
      }));
      
      console.log('Eventos destacados transformados:', transformedEvents);
      
      // Guardar eventos en el estado
      events.value = transformedEvents;
      
    } else {
      // Si no hay eventos, usar datos de fallback
      console.warn('No se encontraron eventos destacados en la respuesta de la API, usando fallback');
      useFallbackEvents();
    }
  } catch (err) {
    console.error('Error al cargar eventos destacados:', err);
    error.value = 'Error al cargar los eventos destacados';
    // En caso de error, usar datos de fallback
    useFallbackEvents();
  } finally {
    isLoading.value = false;
  }
};

// Función para traducir tipos de eventos al español
const translateEventType = (type) => {
  if (!type) return '';
  
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
  
  return translations[type] || type.charAt(0).toUpperCase() + type.slice(1);
};

// Función para usar datos de fallback en caso de error
const useFallbackEvents = () => {
  // Datos de eventos para fallback
  events.value = [
    {
      id: 1,
      name: 'Simon Rock Concert',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      date: '15 de noviembre, 2025',
      time: '9:00 PM',
      price: 'L. 50.00',
      location: 'Teatro Manuel Bonilla, La Ceiba',
      type: 'Concierto',
      isFavorite: false
    },
    {
      id: 2,
      name: 'Holi Festival de Colores',
      image: 'https://images.unsplash.com/photo-1530988516432-a8e4a6aac9df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      date: '2 de diciembre, 2025',
      time: '10:00 AM',
      price: 'L. 35.00',
      location: 'Parque Central, La Ceiba',
      type: 'Festival',
      isFavorite: false
    },
    {
      id: 3,
      name: 'Torneo de Fútbol Catracho',
      image: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      date: '11 de noviembre, 2025',
      time: '6:00 PM',
      price: 'L. 40.00',
      location: 'Estadio Ceibeño, La Ceiba',
      type: 'Deporte',
      isFavorite: false
    },
    {
      id: 4,
      name: 'Conferencia TechCeiba 2025',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      date: '25 de noviembre, 2025',
      time: '9:00 AM',
      price: 'L. 75.00',
      location: 'Centro de Convenciones, La Ceiba',
      type: 'Conferencia',
      isFavorite: false
    }
  ];
};

// Función para formatear fechas (formato español)
const formatDate = (dateString) => {
  if (!dateString) return 'Próximamente';
  
  try {
    const date = new Date(dateString);
    // Opciones para formato español
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    
    return date.toLocaleDateString('es-ES', options);
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return dateString;
  }
};

// Función para formatear la hora
const formatTime = (timeString) => {
  if (!timeString) return 'Hora por confirmar';
  
  // Convertir formato HH:MM:SS a HH:MM AM/PM
  if (timeString.includes(':')) {
    const [hour, minute] = timeString.split(':');
    const hourNum = parseInt(hour);
    
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    
    return `${hour12}:${minute} ${ampm}`;
  }
  
  return timeString;
};

// Función para formatear el precio
const formatPrice = (price) => {
  if (price === 0 || price === '0' || price === '0.00') {
    return 'Gratis';
  }
  
  if (typeof price === 'number') {
    return `L. ${price.toFixed(2)}`;
  }
  
  if (typeof price === 'string' && price.startsWith('L.')) {
    return price;
  }
  
  return `L. ${price}`;
};

// Función para obtener imagen por defecto según ID
const getDefaultImage = (id) => {
  // Devolver una imagen predeterminada según el ID
  const images = [
    '/images/events/default1.jpg',
    '/images/events/default2.jpg',
    '/images/events/default3.jpg',
    '/images/events/default4.jpg',
    '/images/events/default5.jpg'
  ];
  
  // Como fallback alternativo si no hay imágenes disponibles
  const unsplashImages = [
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1530988516432-a8e4a6aac9df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  ];
  
  const index = id ? (id % images.length) : 0;
  return images[index] || unsplashImages[index % unsplashImages.length];
};

// Obtener eventos para visualización en el carrusel
const visibleItems = computed(() => {
  const startIndex = currentIndex.value;
  const endIndex = Math.min(startIndex + visibleCount.value, events.value.length);
  return events.value.slice(startIndex, endIndex);
});

// Función para ir al slide anterior
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    // Volver al final si estamos al principio
    currentIndex.value = Math.max(0, events.value.length - visibleCount.value);
  }
};

// Función para ir al siguiente slide
const nextSlide = () => {
  if (currentIndex.value < events.value.length - visibleCount.value) {
    currentIndex.value++;
  } else {
    // Volver al inicio si estamos al final
    currentIndex.value = 0;
  }
};

// Función para alternar favoritos
const toggleFavorite = (id) => {
  const event = events.value.find(item => item.id === id);
  if (event) {
    event.isFavorite = !event.isFavorite;
  }
};

// Cargar eventos al montar el componente
onMounted(() => {
  loadFeaturedEvents();
  
  // Ajustar la cantidad visible según el ancho de la pantalla
  const handleResize = () => {
    if (window.innerWidth < 768) {
      visibleCount.value = 1;
    } else {
      visibleCount.value = 2;
    }
  };
  
  // Configurar el listener para resize
  handleResize();
  window.addEventListener('resize', handleResize);
  
  // Limpiar listener al desmontar
  return () => {
    window.removeEventListener('resize', handleResize);
  };
});
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Encabezado con título -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
        ¡La Ceiba está que arde! Próximos eventos
      </h2>
      
      <!-- Enlace para ver todos los eventos -->
      <a href="/events/grid" class="text-orange-600 font-medium flex items-center hover:underline">
        Ver todo
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>

    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="spinner border-4 border-gray-200 border-t-orange-500 rounded-full w-10 h-10 animate-spin"></div>
    </div>
    
    <!-- Mensaje de error -->
    <div v-else-if="error" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-lg text-gray-800 mb-4">{{ error }}</p>
      <button 
        @click="loadFeaturedEvents" 
        class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
      >
        Intentar de nuevo
      </button>
    </div>

    <!-- Mensaje si no hay eventos -->
    <div v-else-if="events.length === 0" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <p class="text-lg text-gray-800">No se encontraron eventos destacados</p>
    </div>

    <!-- Contenedor del carrusel -->
    <div v-else class="relative">
      <!-- Botón de navegación izquierda -->
      <button 
        @click="prevSlide" 
        class="absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Grid de eventos destacados -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          v-for="event in visibleItems" 
          :key="event.id" 
          class="rounded-lg overflow-hidden shadow-md cursor-pointer relative"
          @click="navigateToEvent(event.id)"
        >
          <!-- Tarjeta de evento -->
          <div class="relative h-80">
            <!-- Imagen de fondo -->
            <img 
              :src="event.image" 
              :alt="event.name" 
              class="w-full h-full object-cover"
              @error="$event.target.src = 'https://placehold.co/800x600?text=Evento'"
            />
            
            <!-- Badge Destacado -->
            <span class="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">Destacado</span>
            
            <!-- Overlay para mejorar legibilidad -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
            
            <!-- Información del evento -->
            <div class="absolute bottom-0 left-0 p-6 text-white" style="color: white !important;">
              <!-- Tipo de evento -->
              <span class="bg-orange-500 text-white text-xs px-2 py-1 rounded uppercase font-semibold mb-3 inline-block">
                {{ event.type }}
              </span>
              
              <!-- Título del evento -->
              <h3 class="text-2xl font-bold mb-3" style="color: white !important;">
                {{ event.name }}
              </h3>
              
              <!-- Fecha y hora -->
              <div class="flex items-center space-x-2 mb-2" style="color: white !important;">
                <svg class="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="color: white !important;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span style="color: white !important;">{{ event.date }} | {{ event.time }}</span>
              </div>
              
              <!-- Ubicación -->
              <div class="flex items-center mb-4">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span style="color: white !important;">{{ event.location }}</span>
              </div>
            </div>
            
            <!-- Botón de tickets y favoritos -->
            <div class="absolute bottom-6 right-6">
              <div class="flex">
                <button 
                  class="bg-orange-500 hover:bg-orange-600 text-white rounded-l-full py-2 px-4"
                  @click.stop="navigateToEvent(event.id)"
                >
                  Tickets desde {{ event.price }}
                </button>
                <button 
                  @click.stop="toggleFavorite(event.id)" 
                  class="bg-orange-500 hover:bg-orange-600 text-white rounded-r-full w-10 h-10 flex items-center justify-center"
                >
                  <svg 
                    class="w-5 h-5" 
                    :class="{'fill-white': event.isFavorite, 'fill-none': !event.isFavorite}"
                    stroke="white" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de navegación derecha -->
      <button 
        @click="nextSlide" 
        class="absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        aria-label="Siguiente"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- Indicadores de paginación (puntos) -->
      <div class="flex justify-center mt-6">
        <div
          v-for="i in Math.ceil(events.length / visibleCount)"
          :key="i"
          class="w-2 h-2 mx-1 rounded-full cursor-pointer"
          :class="currentIndex >= (i - 1) * visibleCount && currentIndex < i * visibleCount ? 'bg-orange-600' : 'bg-gray-300'"
          @click="currentIndex = (i - 1) * visibleCount"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Animación de spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Estilos básicos para transiciones suaves */
button, a {
  transition: all 0.2s ease;
}

/* Para el icono de corazón */
svg {
  transition: fill 0.2s ease;
}

/* Mejorar contraste del texto sobre fondo de imagen */
.text-white {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

/* Colores personalizados */
.text-orange-600 {
  color: #FD5631;
}

.bg-orange-500 {
  background-color: #FD5631;
}

.bg-orange-600 {
  background-color: #E04424;
}

.bg-green-500 {
  background-color: #10b981;
}

/* Efectos de hover */
.hover\:bg-orange-600:hover {
  background-color: #E04424;
}

/* Efectos de cursor */
.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

/* Shadow effects */
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>