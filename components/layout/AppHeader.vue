<script lang="ts" setup>
// Importaciones necesarias
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useAuthStore } from '../store/auth';
// Importamos el nuevo componente UserAvatar
import UserAvatar from '~/components/UserAvatar.vue';

// Estado del header
const isStuck = ref(false);
const isMenuOpen = ref(false);
const isMounted = ref(false); // Para resolver problemas de hidratación

// Textos en español directamente
const texts = {
  addProperty: 'Añadir Propiedad',
  signIn: 'Iniciar Sesión',
  personalInfo: 'Información Personal',
  passwordAndSecurity: 'Contraseña y Seguridad',
  myProperties: 'Mis Propiedades',
  myBookings: 'Mis Reservas',
  myPurchases: 'Mis Compras',
  wishlist: 'Lista de Deseos',
  reviews: 'Reseñas',
  notifications: 'Notificaciones',
  help: 'Ayuda',
  signOut: 'Cerrar Sesión'
};

// Store de autenticación
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

// Manejar el scroll
const handleScroll = () => {
  isStuck.value = window.scrollY > 10;
};

// Alternar menú de usuario
const toggleUserMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}

// Cerrar menús al hacer clic fuera
const closeMenusIfOutside = (event) => {
  // Cerrar menú de usuario
  if (isMenuOpen.value && !event.target.closest('.user-dropdown')) {
    isMenuOpen.value = false;
  }
}

// Redirección directa a la página de login
const redirectToLogin = () => {
  window.location.href = 'http://localhost:3001/auth/login';
};

// Cerrar sesión
const logout = async () => {
  authStore.logout();
  // Limpiar tokens del localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token'); // Por si acaso también usas este nombre
  localStorage.removeItem('user');
  window.location.href = '/';
};

// Cargar información del usuario si tiene token pero no está autenticado
const loadUserInfo = async () => {
  try {
    // Verificar tanto 'token' como 'access_token' para compatibilidad
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    
    if (token && !authStore.isAuthenticated) {
      // Verificar si existe info de usuario en localStorage
      const userJson = localStorage.getItem('user');
      if (userJson) {
        try {
          const userData = JSON.parse(userJson);
          authStore.setUser(userData);
          authStore.isAuthenticated = true;
          console.log('Usuario cargado desde localStorage:', userData);
        } catch (e) {
          console.error('Error parsing user from localStorage', e);
        }
      } else {
        // Si no hay información de usuario, intentar obtenerla del servidor
        await authStore.fetchCurrentUser();
      }
    }
  } catch (error) {
    console.error('Error cargando información del usuario:', error);
  }
};

// Forzar la actualización del estado de autenticación
const checkAuthentication = () => {
  // Verificar todos los posibles nombres de token
  const token = localStorage.getItem('token') || localStorage.getItem('access_token');
  const userJson = localStorage.getItem('user');
  
  if (token && userJson) {
    try {
      const userData = JSON.parse(userJson);
      authStore.setUser(userData);
      authStore.isAuthenticated = true;
      console.log('Usuario autenticado:', userData);
    } catch (e) {
      console.error('Error parsing user from localStorage', e);
    }
  } else {
    console.log('No se encontró token o datos de usuario en localStorage');
  }
};

// Eventos del ciclo de vida
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', closeMenusIfOutside);
  // Importante: marcar como montado para resolver problemas de hidratación
  isMounted.value = true;
  
  // Inicializar el store de autenticación
  if (!authStore.isInitialized) {
    authStore.initialize();
  }
  
  // Verificar autenticación inmediatamente después de montar
  checkAuthentication();
  
  // Cargar información del usuario si es necesario
  loadUserInfo();

  // Log para depuración
  console.log('AppHeader montado, estado de autenticación:', isAuthenticated.value);
  console.log('Datos de usuario actuales:', user.value);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', closeMenusIfOutside);
});

// Observar cambios en el localStorage para reaccionar inmediatamente
watch(() => [localStorage.getItem('token'), localStorage.getItem('access_token')], ([newToken, newAccessToken]) => {
  if (newToken || newAccessToken) {
    console.log('Token actualizado en localStorage, verificando autenticación');
    checkAuthentication();
  } else {
    console.log('Token removido de localStorage, actualizando estado');
    authStore.isAuthenticated = false;
  }
});

// Observar cambios en la autenticación
watch(() => authStore.isAuthenticated, (newValue) => {
  console.log('Estado de autenticación cambiado a:', newValue);
});

// Observar cambios en los datos del usuario
watch(() => authStore.user, (newValue) => {
  console.log('Datos de usuario actualizados:', newValue);
}, { deep: true });
</script>

<template>
  <header 
    class="fixed top-0 left-0 w-full bg-white z-50 transition-all duration-300"
    :class="{ 'shadow-md': isStuck }"
  >
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <!-- Logo with image -->
        <NuxtLink to="/" class="flex items-center">
          <!-- Logo - usando la imagen 3 o 4 -->
          <img src="~/public/images/logolcb.png" alt="OASIS Real Estate" class="h-10 mr-2" />
          <!-- También puedes añadir el texto "REAL ESTATE" como en la imagen 4 -->
        </NuxtLink>

        <!-- Acciones del header -->
        <div class="flex items-center gap-4">
          
          <!-- Botón para añadir propiedad con el estilo de la imagen 2 -->
          <NuxtLink 
            to="/properties/add-property" 
            class="bg-orange-700 text-white px-4 py-2 rounded hover:bg-orange-800 transition-colors flex items-center"
          >
            <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span class="text-white font-medium">{{ texts.addProperty }}</span>
          </NuxtLink>
          
          <!-- Renderizado condicional con isMounted para evitar errores de hidratación -->
          <client-only>
            <!-- Añadimos debug para ver el estado de autenticación -->
            <!-- <div class="text-xs text-gray-500">Auth: {{ isAuthenticated ? 'Sí' : 'No' }}</div> -->
            
            <!-- Cuando NO está autenticado: mostrar Sign in con redirección directa -->
            <template v-if="!isAuthenticated">
              <button 
                @click="redirectToLogin"
                class="flex items-center text-orange-900 hover:text-orange-700"
              >
                <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>{{ texts.signIn }}</span>
              </button>
            </template>
            
            <!-- Cuando SÍ está autenticado: mostrar foto de perfil con menú desplegable -->
            <template v-else>
              <div class="relative user-dropdown">
                <button 
                  @click="toggleUserMenu"
                  class="focus:outline-none"
                >
                  <!-- Usando nuestro componente UserAvatar -->
                  <UserAvatar 
                    :user="user" 
                    size="md"
                  />
                </button>
                
                <!-- Menú desplegable -->
                <div
                  v-if="isMenuOpen"
                  class="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200"
                >
                  <!-- Información del usuario -->
                  <div class="p-4 border-b border-gray-200 bg-gray-50">
                    <div class="flex items-start">
                      <!-- Avatar del usuario en tamaño grande -->
                      <UserAvatar 
                        :user="user" 
                        size="lg"
                        class="mr-3"
                      />
                      <div>
                        <h5 class="font-semibold text-gray-800">{{ user?.first_name }} {{ user?.last_name }}</h5>
                        <div class="flex text-yellow-400 my-1">
                          <svg v-for="i in 5" :key="i" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                        <div class="text-sm text-gray-600">
                          <p>{{ user?.phone || '(302) 555-0107' }}</p>
                          <p>{{ user?.email }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Opciones del menú -->
                  <ul class="py-1">
                    <li>
                      <NuxtLink to="/account/account-info" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <svg class="w-5 h-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        {{ texts.personalInfo }}
                      </NuxtLink>
                    </li>
                    
                    <li>
                      <NuxtLink to="/account/properties" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <svg class="w-5 h-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        {{ texts.myProperties }}
                      </NuxtLink>
                    </li>
                    <li>
                      
                      <NuxtLink to="/account/bookings" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <svg class="w-5 h-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        {{ texts.myBookings }}
                      </NuxtLink>
                    </li>
                    <!-- Elemento Mis Compras -->
<li>
  <NuxtLink to="/account/purchases" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
    <svg class="w-5 h-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
    {{ texts.myPurchases }}
  </NuxtLink>
</li>
                    <li>
                      <NuxtLink to="/account/wishlist" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <svg class="w-5 h-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {{ texts.wishlist }}
                      </NuxtLink>
                    </li>
                    
                    <li>
                      <button 
                        @click="logout" 
                        class="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {{ texts.signOut }}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </client-only>
        </div>
      </div>
    </div>
  </header>
</template>