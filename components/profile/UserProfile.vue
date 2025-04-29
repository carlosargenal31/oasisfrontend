<template>
    <div class="user-profile">
      <!-- Loading spinner -->
      <div v-if="userStore.loading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
      
      <!-- Error message -->
      <div v-else-if="userStore.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md" role="alert">
        {{ userStore.error }}
      </div>
      
      <!-- Profile content -->
      <div v-else-if="profile" class="profile-container">
        <!-- Profile header with avatar -->
        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div class="flex flex-col items-center">
              <div class="relative">
                <img 
                  :src="profile.profile_image || 'https://via.placeholder.com/120'" 
                  alt="Avatar de perfil"
                  class="rounded-full object-cover w-24 h-24 md:w-32 md:h-32"
                />
                <label 
                  for="avatar-upload" 
                  class="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <Icon name="ph:camera" class="h-5 w-5 text-gray-700" />
                </label>
              </div>
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*" 
                class="hidden"
                @change="handleAvatarUpload" 
              />
              <button 
                class="mt-2 text-sm text-primary-500 hover:text-primary-600 transition-colors"
                @click="document.getElementById('avatar-upload').click()"
              >
                Cambiar foto
              </button>
            </div>
            
            <div class="user-info text-center md:text-left">
              <h2 class="text-2xl font-bold text-gray-900">{{ profile.first_name }} {{ profile.last_name }}</h2>
              <p class="text-gray-500 mb-1">{{ profile.email }}</p>
              <p class="text-gray-500 mb-2" v-if="profile.phone">{{ profile.phone }}</p>
              <div class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                {{ getRoleLabel }}
              </div>
              <p class="text-gray-500 mt-2">
                <span class="inline-flex items-center">
                  <Icon name="ph:calendar" class="mr-1 h-4 w-4" />
                  Miembro desde {{ formatDate(profile.created_at) }}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <!-- Profile form -->
        <form @submit.prevent="updateProfile" class="profile-form">
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-4 bg-gray-50 border-b">
              <h3 class="text-lg font-medium text-gray-900">Información personal</h3>
            </div>
            <div class="p-6">
              <!-- Alert for success message -->
              <div v-if="successMessage" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                {{ successMessage }}
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- First name -->
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    v-model="formData.first_name" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <!-- Last name -->
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    v-model="formData.last_name" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="formData.email" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <!-- Phone -->
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="formData.phone" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div class="flex justify-end mt-6">
                <button 
                  type="submit" 
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  :disabled="userStore.loading"
                >
                  <span v-if="userStore.loading" class="mr-2">
                    <span class="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  </span>
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </form>
        
        <!-- Password change section -->
        <form @submit.prevent="changePassword" class="password-form mt-6">
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-4 bg-gray-50 border-b">
              <h3 class="text-lg font-medium text-gray-900">Cambiar contraseña</h3>
            </div>
            <div class="p-6">
              <!-- Alert for password success message -->
              <div v-if="passwordSuccessMessage" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                {{ passwordSuccessMessage }}
              </div>
              
              <!-- Alert for password error message -->
              <div v-if="passwordError" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {{ passwordError }}
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Current password -->
                <div class="md:col-span-2">
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
                  <input 
                    type="password" 
                    id="currentPassword" 
                    v-model="passwordData.currentPassword" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <!-- New password -->
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
                  <input 
                    type="password" 
                    id="newPassword" 
                    v-model="passwordData.newPassword" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                
                <!-- Confirm password -->
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    v-model="passwordData.confirmPassword" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                  
                  <div v-if="passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword" 
                       class="mt-1 text-sm text-red-600">
                    Las contraseñas no coinciden
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end mt-6">
                <button 
                  type="submit" 
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                  :disabled="passwordLoading || !canSubmitPassword"
                >
                  <span v-if="passwordLoading" class="mr-2">
                    <span class="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  </span>
                  Actualizar contraseña
                </button>
              </div>
            </div>
          </div>
        </form>
        
        <!-- Danger zone -->
        <div class="danger-zone mt-6">
          <div class="bg-white rounded-lg shadow overflow-hidden border border-red-200">
            <div class="p-4 bg-red-50 border-b border-red-200">
              <h3 class="text-lg font-medium text-red-700">Zona de peligro</h3>
            </div>
            <div class="p-6">
              <p class="text-red-600 mb-4">
                La eliminación de tu cuenta es permanente y no se puede deshacer.
                Todos tus datos personales serán eliminados.
              </p>
              
              <button 
                type="button" 
                class="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                @click="confirmDeleteAccount"
              >
                Eliminar mi cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty state -->
      <div v-else class="text-center py-8">
        <p class="text-gray-500 mb-4">No se encontró información de perfil.</p>
        <button 
          class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          @click="loadProfile"
        >
          Recargar
        </button>
      </div>
      
      <!-- Delete Account Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="p-4 border-b">
            <h3 class="text-lg font-medium text-gray-900">Confirmar eliminación</h3>
          </div>
          <div class="p-6">
            <p class="text-gray-700 mb-4">¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no puede deshacerse.</p>
            <div class="flex items-start mb-4">
              <input 
                type="checkbox" 
                v-model="deleteConfirmation" 
                id="deleteConfirmCheck"
                class="mt-1 h-4 w-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
              >
              <label class="ml-2 block text-sm text-gray-700" for="deleteConfirmCheck">
                Confirmo que quiero eliminar mi cuenta permanentemente
              </label>
            </div>
          </div>
          <div class="p-4 bg-gray-50 flex justify-end space-x-3">
            <button 
              type="button" 
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              @click="showDeleteModal = false"
            >
              Cancelar
            </button>
            <button 
              type="button" 
              class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              :disabled="!deleteConfirmation || deleteLoading" 
              @click="deleteAccount"
            >
              <span v-if="deleteLoading" class="mr-2">
                <span class="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              </span>
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, reactive } from 'vue';
  import { useUserStore } from '../../store/user';
  import { useAuthStore } from '../../store/auth';
  
  // Stores
  const userStore = useUserStore();
  const authStore = useAuthStore();
  
  // Reactive references
  const formData = reactive({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  
  const passwordData = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const successMessage = ref('');
  const passwordSuccessMessage = ref('');
  const passwordError = ref('');
  const passwordLoading = ref(false);
  const deleteConfirmation = ref(false);
  const deleteLoading = ref(false);
  const showDeleteModal = ref(false);
  
  // Computed properties
  const profile = computed(() => userStore.profile);
  
  const getRoleLabel = computed(() => {
    if (!profile.value || !profile.value.role) return 'Usuario';
    
    const roleLabels = {
      'guest': 'Huésped',
      'host': 'Anfitrión',
      'admin': 'Administrador'
    };
    
    return roleLabels[profile.value.role] || profile.value.role;
  });
  
  const canSubmitPassword = computed(() => {
    return (
      passwordData.currentPassword &&
      passwordData.newPassword && 
      passwordData.confirmPassword && 
      passwordData.newPassword === passwordData.confirmPassword
    );
  });
  
  // Methods
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const loadProfile = async () => {
    const result = await userStore.fetchProfile();
    
    if (result.success && userStore.profile) {
      // Populate form with profile data
      formData.first_name = userStore.profile.first_name || '';
      formData.last_name = userStore.profile.last_name || '';
      formData.email = userStore.profile.email || '';
      formData.phone = userStore.profile.phone || '';
    }
  };
  
  const updateProfile = async () => {
    successMessage.value = '';
    
    const result = await userStore.updateProfile(formData);
    
    if (result.success) {
      successMessage.value = 'Perfil actualizado correctamente';
      setTimeout(() => {
        successMessage.value = '';
      }, 3000);
    }
  };
  
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('profile_image', file);
    
    // Upload avatar
    const result = await userStore.uploadAvatar(formData);
    
    if (result.success) {
      // Toast or notification could be shown here
      console.log('Avatar actualizado correctamente');
    }
  };
  
  const changePassword = async () => {
    passwordSuccessMessage.value = '';
    passwordError.value = '';
    
    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      passwordError.value = 'Las contraseñas no coinciden';
      return;
    }
    
    passwordLoading.value = true;
    
    try {
      const result = await userStore.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (result.success) {
        passwordSuccessMessage.value = 'Contraseña actualizada correctamente';
        // Reset form
        passwordData.currentPassword = '';
        passwordData.newPassword = '';
        passwordData.confirmPassword = '';
        
        setTimeout(() => {
          passwordSuccessMessage.value = '';
        }, 3000);
      } else {
        passwordError.value = result.error || 'Error al actualizar la contraseña';
      }
    } catch (error) {
      passwordError.value = 'Error al actualizar la contraseña';
    } finally {
      passwordLoading.value = false;
    }
  };
  
  const confirmDeleteAccount = () => {
    showDeleteModal.value = true;
    deleteConfirmation.value = false;
  };
  
  const deleteAccount = async () => {
    if (!deleteConfirmation.value) return;
    
    deleteLoading.value = true;
    
    try {
      const result = await userStore.deleteAccount();
      
      if (result.success) {
        // User will be logged out and redirected to home
        window.location.href = '/';
      } else {
        alert(result.error || 'Error al eliminar la cuenta');
      }
    } catch (error) {
      alert('Error al eliminar la cuenta');
    } finally {
      deleteLoading.value = false;
      showDeleteModal.value = false;
    }
  };
  
  // Lifecycle hooks
  onMounted(() => {
    loadProfile();
  });
  </script>