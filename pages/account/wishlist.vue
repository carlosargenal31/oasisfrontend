<!-- Sección de listado de negocios simplificada -->
<template>
  <div class="bg-white min-h-screen">
    <!-- Loading state -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange mx-auto mb-4"></div>
        <p class="text-lg font-medium text-gray-700">Cargando información...</p>
      </div>
    </div>

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 py-4">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <div class="flex items-center">
          <div class="text-2xl font-bold text-orange-500">OASIS</div>
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
          <img class="h-10 w-10 rounded-full" :src="user.profile_image || '/img/default-avatar.png'" alt="Perfil de usuario">
        </div>
      </div>
    </header>

    <!-- Breadcrumb -->
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center text-orange-500 text-sm">
        <a href="/" class="hover:text-orange">Inicio</a>
        <span class="mx-2">/</span>
        <span class="text-gray-800">Favoritos</span>
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

            <!-- Navigation Menu - Simplificado -->
            <div class="border-t border-gray-200">
              <a href="/account/account-info" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-black">Información Personal</span>
              </a>
              
              <a href="/account/wishlist" class="flex items-center px-4 py-3 border-l-4 border-orange bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="text-orange font-medium">Favoritos</span>
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
            <h1 class="text-2xl font-bold text-black">Favoritos</h1>
            <button 
              v-if="favoriteProperties.length > 0"
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
          <div v-if="isLoading" class="flex justify-center py-10">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
          </div>

          <!-- No favorites state -->
          <div v-else-if="favoriteProperties.length === 0" class="bg-gray-50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Tu favoritos está vacía</h3>
            <p class="text-gray-600 mb-4">Agrega lugares que te gusten para verlas aquí.</p>
            <button @click="redirectToSearch" class="bg-orange text-white py-2 px-4 rounded-md hover:bg-orange-dark transition flex items-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar lugares
            </button>
          </div>

          <!-- Favorites List - Lista simple con imágenes -->
          <div v-else class="divide-y divide-gray-100">
            <div 
              v-for="property in favoriteProperties" 
              :key="property.id" 
              class="py-5"
            >
              <div class="flex">
                <!-- Imagen del negocio -->
                <div class="w-24 h-24 flex-shrink-0 mr-4 rounded-lg overflow-hidden">
                  <img 
                    :src="property.image || '/img/property-placeholder.jpg'" 
                    alt="Imagen de negocio" 
                    class="w-full h-full object-cover"
                  >
                </div>
                
                <!-- Detalles del negocio en el centro -->
                <div class="flex-grow pr-4">
                  <!-- Nombre del negocio -->
                  <h3 class="text-lg font-medium text-black">{{ property.title }}</h3>
                  
                  <!-- Dirección del negocio -->
                  <p class="text-sm text-gray-600 mt-1">{{ property.address || 'No hay dirección disponible' }}</p>
                  
                  <!-- Enlace "Ver detalles" -->
                  <button 
                    @click="viewPropertyDetails(property.id)" 
                    class="text-orange-500 hover:text-orange-600 text-sm font-medium mt-2"
                  >
                    Ver detalles
                  </button>
                </div>
                
                <!-- Botón para quitar de favoritos (icono de papelera) -->
                <button 
                  @click.stop="removeFromFavorites(property.id)" 
                  class="text-red-500 hover:text-red-600 p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '~/src/config/axios'; 
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

// Obtener comercios favoritos
const favoriteProperties = ref([]);

// Método para ver detalles de propiedad
const viewPropertyDetails = (propertyId) => {
  router.push(`/properties/${propertyId}`);
};

// Redirigir a buscador de comercios
const redirectToSearch = () => {
  router.push('/properties/rent');
};

// Método para eliminar de favoritos
const removeFromFavorites = async (propertyId) => {
  try {
    await favoritesStore.removeFavorite(propertyId);
    // Actualizar la lista de favoritos
    favoriteProperties.value = favoriteProperties.value.filter(p => p.id !== propertyId);
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
    favoriteProperties.value = [];
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

// Cargar datos del usuario y favoritos
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
    }
  }
};

// Cargar favoritos
const loadFavorites = async () => {
  try {
    // Obtener favoritos del store
    await favoritesStore.fetchFavorites();
    
    // Si hay favoritos, cargar sus detalles
    if (favoritesStore.favorites.length > 0) {
      await favoritesStore.fetchFavoriteDetails();
    }
    
    // Asignar los favoritos a la variable local
    favoriteProperties.value = favoritesStore.getFavoriteProperties;
  } catch (error) {
    console.error('Error cargando favoritos:', error);
    showNotification('error', 'Error', 'No se pudieron cargar los favoritos');
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
    
    // Cargar datos del usuario
    await loadUserData();
    
    // Cargar favoritos
    await loadFavorites();
  } catch (error) {
    console.error('Error al inicializar favoritos:', error);
    showNotification('error', 'Error', 'No se pudieron cargar los favoritos');
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Custom styles for the wishlist component */
.bg-orange {
  background-color: #fd5631;
}

.bg-orange-dark {
  background-color: #fd5631;
}

.hover\:bg-orange-dark:hover {
  background-color: #fd5631;
}

.text-orange, .text-orange-500 {
  color: #fd5631;
}

.hover\:text-orange-dark:hover, .hover\:text-orange-600:hover {
  color: #fd5631;
}

.bg-orange-50 {
  background-color: #fff8f6;
}

.border-orange {
  border-color: #fd5631;
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
  background-color: #fd5631;
  color: white;
}
</style>