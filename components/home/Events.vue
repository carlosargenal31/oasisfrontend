<script setup>
import { ref, computed } from 'vue';

// Datos de eventos con imágenes de ejemplo
const events = ref([
  {
    id: 1,
    name: 'Simon Rock Concert',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'Nov 15',
    time: '21:00',
    price: '$50',
    isFavorite: false
  },
  {
    id: 2,
    name: 'Holi Festival',
    image: 'https://images.unsplash.com/photo-1530988516432-a8e4a6aac9df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'Dec 2',
    time: '10:00',
    price: '$35',
    isFavorite: false
  },
  {
    id: 3,
    name: 'Football Match',
    image: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'Nov 11',
    time: '18:00',
    price: '$40',
    isFavorite: false
  },
  {
    id: 4,
    name: 'Tech Conference',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'Nov 25',
    time: '09:00',
    price: '$75',
    isFavorite: false
  }
]);

// Para la navegación del slider
const currentIndex = ref(0);
const visibleCount = ref(2); // Número de elementos visibles en pantallas grandes

// Función para ir al slide anterior
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    // Volver al final si estamos al principio
    currentIndex.value = events.value.length - visibleCount.value;
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

// Calcular los elementos visibles según el índice actual
const visibleItems = computed(() => {
  const startIndex = currentIndex.value;
  const endIndex = Math.min(startIndex + visibleCount.value, events.value.length);
  return events.value.slice(startIndex, endIndex);
});

// Función para alternar favoritos
const toggleFavorite = (id) => {
  const event = events.value.find(item => item.id === id);
  if (event) {
    event.isFavorite = !event.isFavorite;
  }
};

// Para filtros de fecha
const selectedDate = ref(null);
const selectedMonth = ref('May');
const selectedYear = ref('2025');

const filterByDate = (filter) => {
  selectedDate.value = filter;
  // Aquí iría la lógica de filtrado basada en el filtro seleccionado
  currentIndex.value = 0; // Resetea al principio cuando cambia el filtro
};

// Estado del datepicker
const showDatepicker = ref(false);

// Función para mostrar/ocultar el datepicker
const toggleDatepicker = () => {
  showDatepicker.value = !showDatepicker.value;
};

// Función para seleccionar una fecha
const selectDate = (day, month) => {
  selectedDate.value = `${day} ${month}`;
  // Aquí iría la lógica para filtrar eventos por la fecha seleccionada
  showDatepicker.value = false; // Cierra el datepicker
};

// Función para cambiar de mes
const changeMonth = (direction) => {
  // Aquí iría la lógica para cambiar el mes (anterior/siguiente)
  // Por simplicidad, no implementamos esta funcionalidad completa
};
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-8">
    <!-- Encabezado con título y filtros de fecha -->
    <div class="flex flex-col md:flex-row justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
        ¡La Ceiba está que arde! Próximos eventos
      </h2>
      
      <!-- Filtros de fecha -->
      <div class="flex items-center space-x-3">
        <!-- Selector de fecha -->
        <div class="relative">
          <button 
            @click="toggleDatepicker"
            class="pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none text-gray-500"
            :class="{'border-orange-200 bg-orange-50': showDatepicker}"
          >
            Choose date
          </button>
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          
          <!-- Datepicker (oculto por defecto) -->
          <div v-if="showDatepicker" class="absolute top-12 left-0 z-50 bg-white rounded-lg shadow-lg p-4 w-80">
            <!-- Navegación del mes y año -->
            <div class="flex justify-between items-center mb-4">
              <button class="p-1 text-black hover:text-gray-600">&lt;</button>
              <div class="flex items-center">
                <span class="text-lg font-medium text-black">May</span>
                <svg class="w-4 h-4 ml-1 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
                <span class="text-lg font-medium ml-3 text-black">2025</span>
              </div>
              <button class="p-1 text-black hover:text-gray-600">&gt;</button>
            </div>
            
            <!-- Días de la semana -->
            <div class="grid grid-cols-7 text-center mb-2">
              <div class="text-black font-medium">Sun</div>
              <div class="text-black font-medium">Mon</div>
              <div class="text-black font-medium">Tue</div>
              <div class="text-black font-medium">Wed</div>
              <div class="text-black font-medium">Thu</div>
              <div class="text-black font-medium">Fri</div>
              <div class="text-black font-medium">Sat</div>
            </div>
            
            <!-- Días del mes -->
            <div class="grid grid-cols-7 gap-y-2 text-center">
              <!-- Primera semana (días anteriores en gris claro) -->
              <button @click="selectDate(27, 'Apr')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">27</button>
              <button @click="selectDate(28, 'Apr')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">28</button>
              <button @click="selectDate(29, 'Apr')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">29</button>
              <button @click="selectDate(30, 'Apr')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">30</button>
              <button @click="selectDate(1, 'May')" class="w-10 h-10 rounded-full bg-orange-100 text-orange-500 font-medium hover:bg-orange-200">1</button>
              <button @click="selectDate(2, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">2</button>
              <button @click="selectDate(3, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">3</button>
              
              <!-- Segunda semana -->
              <button @click="selectDate(4, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">4</button>
              <button @click="selectDate(5, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">5</button>
              <button @click="selectDate(6, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">6</button>
              <button @click="selectDate(7, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">7</button>
              <button @click="selectDate(8, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">8</button>
              <button @click="selectDate(9, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">9</button>
              <button @click="selectDate(10, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">10</button>
              
              <!-- Tercera semana -->
              <button @click="selectDate(11, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">11</button>
              <button @click="selectDate(12, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">12</button>
              <button @click="selectDate(13, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">13</button>
              <button @click="selectDate(14, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">14</button>
              <button @click="selectDate(15, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">15</button>
              <button @click="selectDate(16, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">16</button>
              <button @click="selectDate(17, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">17</button>
              
              <!-- Cuarta semana -->
              <button @click="selectDate(18, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">18</button>
              <button @click="selectDate(19, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">19</button>
              <button @click="selectDate(20, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">20</button>
              <button @click="selectDate(21, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">21</button>
              <button @click="selectDate(22, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">22</button>
              <button @click="selectDate(23, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">23</button>
              <button @click="selectDate(24, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">24</button>
              
              <!-- Quinta semana -->
              <button @click="selectDate(25, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">25</button>
              <button @click="selectDate(26, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">26</button>
              <button @click="selectDate(27, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">27</button>
              <button @click="selectDate(28, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">28</button>
              <button @click="selectDate(29, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">29</button>
              <button @click="selectDate(30, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">30</button>
              <button @click="selectDate(31, 'May')" class="w-10 h-10 text-black hover:bg-gray-100 rounded-full">31</button>
              
              <!-- Sexta semana (días del siguiente mes en gris) -->
              <button @click="selectDate(1, 'Jun')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">1</button>
              <button @click="selectDate(2, 'Jun')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">2</button>
              <button @click="selectDate(3, 'Jun')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">3</button>
              <button @click="selectDate(4, 'Jun')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">4</button>
              <button @click="selectDate(5, 'Jun')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">5</button>
              <button @click="selectDate(6, 'Jun')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">6</button>
              <button @click="selectDate(7, 'Jun')" class="w-10 h-10 text-gray-400 hover:bg-gray-100 rounded-full">7</button>
            </div>
          </div>
        </div>
        
        <!-- Botones de filtro rápido -->
        <button 
          @click="filterByDate('tomorrow')" 
          class="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium transition"
          :class="{'bg-orange-100 text-orange-700': selectedDate === 'tomorrow'}"
        >
          Tomorrow
        </button>
        <button 
          @click="filterByDate('weekend')" 
          class="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium transition"
          :class="{'bg-orange-100 text-orange-700': selectedDate === 'weekend'}"
        >
          This weekend
        </button>
        
        <!-- Ver todos los eventos -->
        <a href="/events/grid" class="text-orange-600 font-medium flex items-center hover:underline ml-3">
          Ver todo
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Contenedor del carrusel -->
    <div class="relative">
      <!-- Botón de navegación izquierda -->
      <button 
        @click="prevSlide" 
        class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        aria-label="Anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Grid de eventos (estilo como la tercera imagen) -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="event in visibleItems" :key="event.id" 
             class="rounded-lg overflow-hidden shadow-md">
          <!-- Tarjeta de evento -->
          <div class="relative h-80">
            <!-- Imagen de fondo -->
            <img 
              :src="event.image" 
              :alt="event.name" 
              class="w-full h-full object-cover"
            />
            
            <!-- Overlay para mejorar legibilidad -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
            
            <!-- Información del evento -->
            <div class="absolute bottom-0 left-0 p-6 text-white" style="color: white !important;">
              <!-- Fecha y hora -->
              <div class="flex items-center space-x-2 mb-2" style="color: white !important;">
                <svg class="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="color: white !important;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span style="color: white !important;">{{ event.date }}</span>
                
                <svg class="w-5 h-5 ml-4" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="color: white !important;">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span style="color: white !important;">{{ event.time }}</span>
              </div>
              
              <!-- Nombre del evento -->
              <h3 class="text-2xl font-bold mb-4" style="color: white !important;">
                {{ event.name }}
              </h3>
            </div>
            
            <!-- Botón de tickets y favoritos -->
            <div class="absolute bottom-6 right-6">
              <div class="flex">
                <button 
                  class="bg-orange-500 hover:bg-orange-600 text-white rounded-l-full py-2 px-4"
                >
                  Tickets from {{ event.price }}
                </button>
                <button 
                  @click="toggleFavorite(event.id)" 
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
        class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md"
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
/* Estilos básicos para transiciones suaves */
button, a {
  transition: all 0.2s ease;
}

/* Para el icono de corazón */
svg {
  transition: fill 0.2s ease;
}
</style>