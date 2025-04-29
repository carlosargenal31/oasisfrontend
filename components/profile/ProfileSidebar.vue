<template>
    <div class="profile-sidebar">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="bg-gray-50 p-4 border-b">
          <h2 class="text-lg font-medium text-gray-900">Mi cuenta</h2>
        </div>
        
        <div class="divide-y">
          <button 
            class="w-full text-left py-3 px-4 flex items-center transition-colors duration-200"
            :class="{ 
              'bg-primary-500 text-white hover:bg-primary-600': activeTab === 'profile',
              'text-gray-700 hover:bg-gray-50': activeTab !== 'profile'
            }"
            @click="changeTab('profile')"
          >
            <Icon name="ph:user" class="mr-2 h-5 w-5" />
            Perfil
          </button>
          
          <button 
            class="w-full text-left py-3 px-4 flex items-center transition-colors duration-200"
            :class="{ 
              'bg-primary-500 text-white hover:bg-primary-600': activeTab === 'favorites',
              'text-gray-700 hover:bg-gray-50': activeTab !== 'favorites'
            }"
            @click="changeTab('favorites')"
          >
            <Icon name="ph:heart" class="mr-2 h-5 w-5" />
            Favoritos
          </button>
          
          <button 
            class="w-full text-left py-3 px-4 flex items-center transition-colors duration-200"
            :class="{ 
              'bg-primary-500 text-white hover:bg-primary-600': activeTab === 'bookings',
              'text-gray-700 hover:bg-gray-50': activeTab !== 'bookings'
            }"
            @click="changeTab('bookings')"
          >
            <Icon name="ph:calendar-check" class="mr-2 h-5 w-5" />
            Mis reservas
          </button>
          
          <button 
            v-if="isHost"
            class="w-full text-left py-3 px-4 flex items-center transition-colors duration-200"
            :class="{ 
              'bg-primary-500 text-white hover:bg-primary-600': activeTab === 'properties',
              'text-gray-700 hover:bg-gray-50': activeTab !== 'properties'
            }"
            @click="changeTab('properties')"
          >
            <Icon name="ph:house" class="mr-2 h-5 w-5" />
            Mis propiedades
          </button>
        </div>
      </div>
      
      <div class="mt-4 bg-white rounded-lg shadow p-4">
        <button 
          class="w-full py-2 px-4 border border-red-500 text-red-500 rounded-md hover:bg-red-50 flex items-center justify-center transition-colors duration-200"
          @click="logout"
        >
          <Icon name="ph:sign-out" class="mr-2 h-5 w-5" />
          Cerrar sesión
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useAuthStore } from '../../store/auth';
  import { useRouter } from 'vue-router';
  
  // Props
  const props = defineProps({
    activeTab: {
      type: String,
      default: 'profile'
    }
  });
  
  // Emits
  const emit = defineEmits(['tab-change']);
  
  // Stores
  const authStore = useAuthStore();
  const router = useRouter();
  
  // Computed properties
  const isHost = computed(() => {
    return authStore.user?.role === 'host' || authStore.user?.role === 'admin';
  });
  
  // Methods
  const changeTab = (tab) => {
    emit('tab-change', tab);
  };
  
  const logout = async () => {
    await authStore.logout();
    router.push('/');
  };
  </script>
  
  <style scoped>
  .profile-sidebar {
    position: sticky;
    top: 1rem;
  }
  </style>