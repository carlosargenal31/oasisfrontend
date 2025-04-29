<template>
    <div class="profile-page bg-gray-50 min-h-screen py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Sidebar con navegación de perfil -->
          <div class="w-full md:w-1/4">
            <ProfileSidebar :activeTab="activeTab" @tab-change="changeTab" />
          </div>
          
          <!-- Contenido principal -->
          <div class="w-full md:w-3/4">
            <div v-if="activeTab === 'profile'">
              <UserProfile />
            </div>
            
            <div v-else-if="activeTab === 'favorites'">
              <UserFavorites />
            </div>
            
            <div v-else-if="activeTab === 'bookings'">
              <UserBookings />
            </div>
            
            <div v-else-if="activeTab === 'properties'" v-show="isHost">
              <UserProperties />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useAuthStore } from '../store/auth';
  import { useUserStore } from '../store/user';
  import { useRoute, useRouter } from 'vue-router';
  
  // Stores
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const route = useRoute();
  const router = useRouter();
  
  // Estado
  const activeTab = ref('profile');
  
  // Propiedades computadas
  const isHost = computed(() => {
    return authStore.user?.role === 'host' || authStore.user?.role === 'admin';
  });
  
  // Métodos
  const changeTab = (tab) => {
    activeTab.value = tab;
    if (route.query.tab !== tab) {
      router.replace({ query: { ...route.query, tab } });
    }
  };
  
  // Ciclo de vida
  onMounted(async () => {
    // Si no está autenticado, el middleware se encargará de redirigir
    if (!authStore.isAuthenticated) return;
    
    // Iniciar carga de datos
    userStore.fetchProfile();
    
    // Establecer tab activo desde query params
    if (route.query.tab) {
      const validTabs = ['profile', 'favorites', 'bookings', 'properties'];
      if (validTabs.includes(route.query.tab)) {
        activeTab.value = route.query.tab;
      }
    }
    
    // Si es la tab de propiedades pero no es host, redirigir a perfil
    if (activeTab.value === 'properties' && !isHost.value) {
      activeTab.value = 'profile';
      router.replace({ query: { ...route.query, tab: 'profile' } });
    }
  });
  
  // Definimos que esta página requiere autenticación
  definePageMeta({
    requiresAuth: true
  });
  </script>