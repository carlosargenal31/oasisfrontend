<template>
    <div class="bg-white min-h-screen">
      <!-- Loading state -->
      <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy mx-auto mb-4"></div>
          <p class="text-lg font-medium text-gray-700">Cargando lista de deseos...</p>
        </div>
      </div>
  
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 py-4">
        <div class="container mx-auto px-4 flex items-center justify-between">
          <div class="flex items-center">
            <div class="text-2xl font-bold text-blue-500">OASIS</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center">
              <span class="mr-2 font-black">ES</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div class="flex items-center">
              <span class="mr-2 font-black">EUR</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <button class="bg-navy text-white px-4 py-2 rounded-md flex items-center" @click="redirectToAddProperty">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Añadir propiedad
            </button>
            <img class="h-10 w-10 rounded-full" :src="user.profile_image || '/img/default-avatar.png'" alt="Perfil de usuario">
          </div>
        </div>
      </header>
  
      <!-- Breadcrumb -->
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center text-blue-500 text-sm">
          <a href="/" class="hover:text-navy">Inicio</a>
          <span class="mx-2">/</span>
          <span class="text-gray-800">Lista de Deseos</span>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row">
          <!-- Left Sidebar -->
          <div class="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">
            <div class="bg-white shadow-sm rounded-lg overflow-hidden">
              <!-- User Profile -->
              <div class="p-4 text-center">
                <img :src="user.profile_image || '/img/default-avatar.png'" alt="Usuario" class="rounded-full w-24 h-24 mx-auto mb-4">
                <h3 class="text-xl font-bold text-black">{{ user.first_name }} {{ user.last_name }}</h3>
                <div class="flex justify-center my-2">
                  <span class="text-yellow-400">★★★★★</span>
                </div>
                <div class="text-gray-800 text-sm mt-2">
                  <div class="mb-1">
                    <i class="fas fa-phone mr-2"></i> {{ user.phone || 'No especificado' }}
                  </div>
                  <div>
                    <i class="fas fa-envelope mr-2"></i> {{ user.email }}
                  </div>
                </div>
              </div>
  
              <!-- Add Property Button -->
              <div class="px-4 pb-4">
                <button 
                  @click="redirectToAddProperty" 
                  class="w-full bg-navy text-white py-2 rounded flex justify-center items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Añadir propiedad
                </button>
              </div>
  
              <!-- Navigation Menu -->
              <div class="border-t border-gray-200">
                <a href="/account/account-info" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="text-black">Información Personal</span>
                </a>
                
                <a href="/account/properties" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span class="text-black">Mis Propiedades</span>
                </a>
                <a href="/account/bookings" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-black">Mis Reservas</span>
                </a>
                <a href="/account/purchases" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    <span class="text-black">Mis Compras</span>
  </a>
                <a href="/account/wishlist" class="flex items-center px-4 py-3 border-l-4 border-navy bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span class="text-navy font-medium">Lista de Deseos</span>
                </a>
                
                <a href="/logout" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span class="text-black">Cerrar Sesión</span>
                </a>
              </div>
            </div>
          </div>
  
          <!-- Main Content Area -->
          <div class="w-full md:w-2/3">
            <div class="flex items-center justify-between mb-4">
              <h1 class="text-2xl font-bold text-black">Lista de Deseos</h1>
              <button 
                v-if="favoritesStore.getFavoriteCount > 0"
                @click="clearAllFavorites" 
                class="text-red-500 hover:text-red-600 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar todo
              </button>
            </div>
  
            <!-- Loading state -->
            <div v-if="favoritesStore.isLoading" class="flex justify-center py-10">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy"></div>
            </div>
  
            <!-- No favorites state -->
            <div v-else-if="favoritesStore.getFavoriteCount === 0" class="bg-gray-50 rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Tu lista de deseos está vacía</h3>
              <p class="text-gray-600 mb-4">Agrega propiedades que te gusten para verlas aquí.</p>
              <button @click="redirectToSearch" class="bg-navy text-white py-2 px-4 rounded-md hover:bg-navy-dark transition flex items-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar propiedades
              </button>
            </div>
  
            <!-- Favorites List -->
            <div v-else class="space-y-4">
              <div 
                v-for="property in favoriteProperties" 
                :key="property.id" 
                class="card card-hover card-horizontal border-0 shadow-sm mb-4 bg-white"
              >
                <div class="md:flex">
                  <!-- Property Image -->
                  <div class="md:w-1/3 relative">
                    <img 
                      :src="property.image || '/img/property-placeholder.jpg'" 
                      alt="Imagen de propiedad" 
                      class="w-full h-full object-cover md:h-auto" 
                      style="min-height: 200px;"
                    >
                    <!-- Status badges -->
                    <div class="absolute top-2 left-2">
                      <span 
                        v-if="property.isVerified" 
                        class="bg-green-500 text-white text-xs px-2 py-1 rounded mb-1 inline-block"
                      >
                        Verificado
                      </span>
                      <span 
                        v-if="property.isNew" 
                        class="bg-blue-500 text-white text-xs px-2 py-1 rounded inline-block ml-1"
                      >
                        Nuevo
                      </span>
                    </div>
                    
                    <!-- Remove from Favorites Button -->
                    <div class="absolute top-2 right-2">
                      <button 
                        @click="removeFromFavorites(property.id)" 
                        class="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <!-- Property Details -->
                  <div class="p-4 md:p-6 flex-1">
                    <!-- Property Type Label -->
                    <div class="mb-1 uppercase text-sm font-medium" 
                      :class="property.status === 'for-rent' ? 'text-blue-500' : 'text-green-500'">
                    {{ property.status === 'for-rent' ? 'EN ALQUILER' : 'EN VENTA' }}
                  </div>
                  
                  <!-- Property Title -->
                  <h3 class="text-lg font-semibold text-black mb-1">
                    {{ property.title }} | {{ property.square_feet }} m²
                  </h3>
                  
                  <!-- Property Address -->
                  <p class="text-gray-600 text-sm mb-3">{{ property.address }}</p>
                  
                  <!-- Property Price -->
                  <div class="text-xl font-bold text-black mb-4 flex items-center">
                    <span class="mr-1">L</span> {{ formatPrice(property.price) }}
                    <span v-if="property.status === 'for-rent'" class="text-sm text-gray-500 ml-1">/mes</span>
                  </div>
                  
                  <!-- Property Features -->
                  <div class="flex items-center text-sm text-gray-600 mb-4">
                    <div class="flex items-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {{ property.bedrooms }} hab.
                    </div>
                    <div class="flex items-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {{ property.bathrooms }} baños
                    </div>
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                      {{ property.parkingSpaces || 0 }} parking
                    </div>
                  </div>
                  
                  <!-- Property Actions -->
                  <div class="flex flex-col sm:flex-row justify-between items-center">
                    <button 
                      @click="viewPropertyDetails(property.id)" 
                      class="bg-navy text-white px-4 py-2 rounded hover:bg-navy-dark transition mb-2 sm:mb-0"
                    >
                      Ver detalles
                    </button>
                    <button 
                      @click="contactAgent(property)" 
                      class="text-navy hover:text-navy-dark border border-navy rounded px-4 py-2 transition"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import axios from '~/src/config/axios'; // Ajusta la ruta según tu estructura
import { useFavoritesStore } from '~/store/favorites';

// Router
const router = useRouter();
const favoritesStore = useFavoritesStore();

// Estado del usuario
const user = ref({
  id: null,
  first_name: 'Usuario',
  last_name: '',
  email: '',
  phone: 'No especificado',
  profile_image: '/img/default-avatar.png'
});

// Estado de carga
const isLoading = ref(true);

// Notificación
const notification = ref({
  show: false,
  type: 'success',
  title: '',
  message: '',
  timeout: null
});

// Obtener propiedades favoritas
const favoriteProperties = computed(() => {
  return favoritesStore.getFavoriteProperties;
});

// Formatear precio con comas
const formatPrice = (price) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Método para ver detalles de propiedad
const viewPropertyDetails = (propertyId) => {
  router.push(`/properties/${propertyId}`);
};

// Método para contactar agente
const contactAgent = (property) => {
  // En una implementación real, aquí podríamos mostrar un modal o redirigir a una página de contacto
  // Por ahora, simplemente mostramos una notificación
  showNotification('info', `Contactando agente por propiedad: ${property.title}`);
};

// Redirigir a buscador de propiedades
const redirectToSearch = () => {
  router.push('/properties/rent');
};

// Redirigir a añadir propiedad
const redirectToAddProperty = () => {
  router.push('/properties/add');
};

// Método para eliminar de favoritos
const removeFromFavorites = async (propertyId) => {
  try {
    await favoritesStore.removeFavorite(propertyId);
    showNotification('success', 'Éxito', 'Propiedad eliminada de favoritos');
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error);
    showNotification('error', 'Error', 'Error al eliminar de favoritos');
  }
};

// Método para eliminar todos los favoritos
const clearAllFavorites = async () => {
  try {
    await favoritesStore.clearAllFavorites();
    showNotification('success', 'Éxito', 'Se eliminaron todos los favoritos');
  } catch (error) {
    console.error('Error al eliminar todos los favoritos:', error);
    showNotification('error', 'Error', 'No se pudieron eliminar los favoritos');
  }
};

// Mostrar notificación
const showNotification = (type, title, message) => {
  // Limpiar timeout existente
  if (notification.value.timeout) {
    clearTimeout(notification.value.timeout);
  }
  
  // Configurar notificación
  notification.value = {
    show: true,
    type,
    title,
    message,
    timeout: setTimeout(() => {
      notification.value.show = false;
    }, 5000)
  };
};

// Cargar datos del usuario
const loadUserData = async () => {
  try {
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      router.push('/auth/login');
      return;
    }
    
    // Conectamos con la API
    const response = await axios.get('/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      // Asignar datos del usuario
      user.value = {
        ...response.data.data.user,
        profile_image: response.data.data.user.profile_image || '/img/default-avatar.png'
      };
    } else {
      throw new Error('No se pudieron obtener los datos del usuario');
    }
  } catch (error) {
    console.error('Error cargando datos del usuario:', error);
    
    if (error.response && error.response.status === 401) {
      // Error de autenticación, redirigir al login
      router.push('/auth/login');
    } else {
      showNotification('error', 'Error', 'No se pudieron cargar los datos del perfil');
      
      // Usar valores predeterminados en caso de error
      user.value = {
        id: null,
        first_name: 'Usuario',
        last_name: '',
        email: '',
        phone: 'No especificado',
        profile_image: '/img/default-avatar.png'
      };
    }
  }
};

// Al montar el componente
onMounted(async () => {
  isLoading.value = true;
  try {
    // Verificar si hay un token
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/auth/login');
      return;
    }
    
    // Primero cargar datos del usuario para asegurar que estén disponibles
    await loadUserData();
    
    // Luego cargar favoritos
    await favoritesStore.fetchFavorites();
    
    // Si solo tenemos IDs de propiedades, cargar detalles completos
    if (favoritesStore.favorites.length > 0) {
      await favoritesStore.fetchFavoriteDetails();
    }
  } catch (error) {
    console.error('Error al inicializar página de favoritos:', error);
    showNotification('error', 'Error', 'No se pudieron cargar los favoritos');
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Custom styles for the wishlist component */
.bg-navy {
  background-color: #0a3364;
}

.bg-navy-dark {
  background-color: #072649;
}

.hover\:bg-navy-dark:hover {
  background-color: #072649;
}

.text-navy {
  color: #0a3364;
}

.hover\:text-navy-dark:hover {
  color: #072649;
}

.border-navy {
  border-color: #0a3364;
}

/* Notification styles */
.notification {
  position: fixed;
  top: 1rem;
  right: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 50;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  max-width: 24rem;
}

.notification-success {
  background-color: #10B981;
  color: white;
}

.notification-error {
  background-color: #EF4444;
  color: white;
}

.notification-info {
  background-color: #3B82F6;
  color: white;
}
</style>