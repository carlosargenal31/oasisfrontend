<script lang="ts" setup>
// Importaciones necesarias
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useAuthStore } from '~/store/auth';
// Use Nuxt's built-in i18n composable
import { useI18n } from '#imports';

// Estado del header
const isStuck = ref(false);
const isMenuOpen = ref(false);
const isLanguageMenuOpen = ref(false);
const isCurrencyMenuOpen = ref(false);

// Store de autenticación
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const user = computed(() => authStore.user);

// i18n setup
const { locale } = useI18n();

// Estado para idioma y moneda
const currentLanguage = ref('EN');
const currentCurrency = ref('USD');

// Opciones disponibles
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' }
];

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' }
];

// Función para obtener la moneda almacenada o usar el valor predeterminado
const getStoredPreference = (key, defaultValue) => {
  if (process.client) {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

// Manejar el scroll
const handleScroll = () => {
  isStuck.value = window.scrollY > 10;
};

// Alternar menús
const toggleUserMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  // Cerrar otros menús si están abiertos
  if (isMenuOpen.value) {
    isLanguageMenuOpen.value = false;
    isCurrencyMenuOpen.value = false;
  }
}

const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value;
  // Cerrar otros menús si están abiertos
  if (isLanguageMenuOpen.value) {
    isMenuOpen.value = false;
    isCurrencyMenuOpen.value = false;
  }
}

const toggleCurrencyMenu = () => {
  isCurrencyMenuOpen.value = !isCurrencyMenuOpen.value;
  // Cerrar otros menús si están abiertos
  if (isCurrencyMenuOpen.value) {
    isMenuOpen.value = false;
    isLanguageMenuOpen.value = false;
  }
}

// Cambiar idioma o moneda
const changeLanguage = (langCode) => {
  currentLanguage.value = langCode.toUpperCase();
  isLanguageMenuOpen.value = false;
  
  // Guardar en localStorage
  if (process.client) {
    localStorage.setItem('userLanguage', langCode.toUpperCase());
  }
  
  // Cambiar el idioma de la aplicación
  locale.value = langCode.toLowerCase();
  
  // Emitir un evento para que otros componentes puedan responder
  window.dispatchEvent(new CustomEvent('language-changed', { detail: langCode }));
}

const changeCurrency = (currCode) => {
  currentCurrency.value = currCode;
  isCurrencyMenuOpen.value = false;
  
  // Guardar en localStorage
  if (process.client) {
    localStorage.setItem('userCurrency', currCode);
  }
  
  // Emitir un evento para que otros componentes puedan responder
  window.dispatchEvent(new CustomEvent('currency-changed', { detail: currCode }));
}

// Cerrar menús al hacer clic fuera
const closeMenusIfOutside = (event) => {
  // Cerrar menú de usuario
  if (isMenuOpen.value && !event.target.closest('.user-dropdown')) {
    isMenuOpen.value = false;
  }
  
  // Cerrar menú de idioma
  if (isLanguageMenuOpen.value && !event.target.closest('.language-dropdown')) {
    isLanguageMenuOpen.value = false;
  }
  
  // Cerrar menú de moneda
  if (isCurrencyMenuOpen.value && !event.target.closest('.currency-dropdown')) {
    isCurrencyMenuOpen.value = false;
  }
}

// Abrir modal de autenticación
const openAuthModal = () => {
  const event = new CustomEvent('open-auth-modal');
  window.dispatchEvent(event);
};

// Cerrar sesión
const logout = async () => {
  await authStore.logout();
  window.location.href = '/';
};

// Eventos del ciclo de vida
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', closeMenusIfOutside);

  // Inicializar con valores guardados
  currentLanguage.value = getStoredPreference('userLanguage', 'EN');
  currentCurrency.value = getStoredPreference('userCurrency', 'USD');
  
  // Sincronizar con i18n
  locale.value = currentLanguage.value.toLowerCase();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', closeMenusIfOutside);
});
</script>

<template>
  <header 
    class="fixed top-0 left-0 w-full bg-white z-50 transition-all duration-300"
    :class="{ 'shadow-md': isStuck }"
  >
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <NuxtLink to="/" class="text-2xl font-bold text-blue-500">
          OASIS
        </NuxtLink>

        <!-- Acciones del header -->
        <div class="flex items-center gap-4">
          <!-- Selector de idioma -->
          <div class="relative language-dropdown">
            <button 
              @click="toggleLanguageMenu"
              class="flex items-center text-blue-900 hover:text-blue-700 px-2"
            >
              <span>{{ currentLanguage }}</span>
              <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <!-- Menú desplegable de idiomas -->
            <div 
              v-if="isLanguageMenuOpen"
              class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50"
            >
              <ul class="py-1">
                <li v-for="lang in languages" :key="lang.code">
                  <button
                    @click="changeLanguage(lang.code)"
                    class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    :class="{ 'bg-gray-100': currentLanguage === lang.code.toUpperCase() }"
                  >
                    <span>{{ lang.name }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Selector de moneda -->
          <div class="relative currency-dropdown">
            <button 
              @click="toggleCurrencyMenu"
              class="flex items-center text-blue-900 hover:text-blue-700 px-2"
            >
              <span>{{ currentCurrency }}</span>
              <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <!-- Menú desplegable de monedas -->
            <div 
              v-if="isCurrencyMenuOpen"
              class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-50"
            >
              <ul class="py-1">
                <li v-for="currency in currencies" :key="currency.code">
                  <button
                    @click="changeCurrency(currency.code)"
                    class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    :class="{ 'bg-gray-100': currentCurrency === currency.code }"
                  >
                    <span class="mr-2">{{ currency.symbol }}</span>
                    <span>{{ currency.name }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <!-- Botón para añadir propiedad -->
          <NuxtLink 
            to="/vendor/add-property" 
            class="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors flex items-center"
          >
            <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span class="text-white font-medium">{{ $t('addProperty') }}</span>
          </NuxtLink>
          
          <!-- Cuando NO está autenticado: mostrar Sign in (ahora a la derecha) -->
          <template v-if="!isAuthenticated">
            <button 
              @click="openAuthModal"
              class="flex items-center text-blue-900 hover:text-blue-700"
            >
              <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>{{ $t('signIn') }}</span>
            </button>
          </template>
          
          <!-- Cuando SÍ está autenticado: mostrar foto de perfil con menú desplegable -->
          <template v-else>
            <div class="relative user-dropdown">
              <button 
                @click="toggleUserMenu"
                class="w-10 h-10 rounded-full overflow-hidden focus:outline-none"
              >
                <img 
                  :src="user?.avatar || 'https://via.placeholder.com/40'" 
                  alt="User Avatar" 
                  class="w-full h-full object-cover"
                />
              </button>
              
              <!-- Menú desplegable -->
              <div
                v-if="isMenuOpen"
                class="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg overflow-hidden z-50"
              >
                <!-- Información del usuario -->
                <div class="p-4 border-b border-gray-200">
                  <div class="flex items-start">
                    <img
                      :src="user?.avatar || 'https://via.placeholder.com/60'"
                      alt="User Avatar"
                      class="w-14 h-14 rounded-full mr-3"
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
                      {{ $t('personalInfo') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/account/security" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <svg class="w-5 h-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      {{ $t('passwordAndSecurity') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/account/properties" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <svg class="w-5 h-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      {{ $t('myProperties') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/account/wishlist" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <svg class="w-5 h-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      {{ $t('wishlist') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/account/reviews" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <svg class="w-5 h-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      {{ $t('reviews') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/account/notifications" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <svg class="w-5 h-5 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                      {{ $t('notifications') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/help-center" class="px-4 py-2 text-gray-700 hover:bg-gray-100 block">
                      {{ $t('help') }}
                    </NuxtLink>
                  </li>
                  <li>
                    <button 
                      @click="logout" 
                      class="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {{ $t('signOut') }}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>