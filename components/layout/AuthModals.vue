<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '~/store/auth';

// Auth store
const authStore = useAuthStore();

// Estado del modal
const isModalOpen = ref(false);

// Login form data
const email = ref('');
const password = ref('');
const showPassword = ref(false);

// Método para iniciar sesión
const handleLogin = async () => {
  try {
    const result = await authStore.login({
      email: email.value,
      password: password.value
    });
    
    if (result.success) {
      // Cerrar modal
      isModalOpen.value = false;
    } else {
      // Manejar error
      alert(result.error || 'Error al iniciar sesión');
    }
  } catch (error) {
    console.error('Error de inicio de sesión:', error);
    alert('Ocurrió un error al intentar iniciar sesión');
  }
};

// Método para registro
const handleSignUp = () => {
  // Redirigir a la página de registro
  window.location.href = '/register';
};

// Método para abrir/cerrar el modal
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

// Cierra el modal cuando se hace clic fuera de él
const closeModalIfOutside = (event) => {
  const modal = document.querySelector('.auth-modal-content');
  if (modal && !modal.contains(event.target) && isModalOpen.value) {
    isModalOpen.value = false;
  }
};

// Escuchar el evento personalizado para abrir el modal
const listenForOpenModal = () => {
  window.addEventListener('open-auth-modal', () => {
    isModalOpen.value = true;
  });
};

// Configurar manejadores de eventos
onMounted(() => {
  document.addEventListener('mousedown', closeModalIfOutside);
  listenForOpenModal();
});

onUnmounted(() => {
  document.removeEventListener('mousedown', closeModalIfOutside);
  window.removeEventListener('open-auth-modal', () => {});
});
</script>

<template>
  <!-- Overlay del modal -->
  <div 
    v-if="isModalOpen"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
  >
    <!-- Modal de autenticación -->
    <div class="auth-modal-content bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
      <div class="flex flex-col md:flex-row h-full">
        <!-- Columna izquierda -->
        <div class="md:w-1/2 bg-gray-50 p-8">
          <button 
            @click="toggleModal"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <h2 class="text-3xl font-bold text-gray-800">Hey there!</h2>
          <h3 class="text-2xl font-semibold text-gray-800 mb-8">Welcome back.</h3>
          
          <div class="flex justify-center mb-8">
            <img src="~assets/images/signin.svg" alt="Login" class="w-64" 
                 onerror="this.src='https://via.placeholder.com/300x300?text=Login+Illustration'">
          </div>
          
          <p class="text-center text-gray-600">
            Don't have an account? 
            <a @click.prevent="handleSignUp" href="#" class="text-red-500 font-medium hover:underline">Sign up here</a>
          </p>
        </div>
        
        <!-- Columna derecha -->
        <div class="md:w-1/2 p-8">
          <!-- Botones sociales -->
          <button class="flex items-center justify-center w-full mb-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.01 14.92C15.1 18.18 13.64 19 12 19c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.31 0 2.46.42 3.35 1.13l-1.36 1.37c-.43-.3-1.12-.65-1.99-.65-1.83 0-3.32 1.54-3.32 3.42 0 1.89 1.49 3.42 3.32 3.42 1.98 0 2.73-1.01 2.85-1.86h-2.85v-1.86h4.75c.05.31.09.61.09.94 0 2.84-1.92 4.85-4.83 5.01z" fill="#4285F4"/>
            </svg>
            <span class="text-gray-700">Sign in with Google</span>
          </button>
          
          <button class="flex items-center justify-center w-full mb-6 p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-7H9v-2h2V8.5c0-1.49.6-2.85 2.4-2.85h1.6v2h-1.1c-.32 0-.9.16-.9.8V10h2l-.2 2h-1.8v7z" fill="#1877F2"/>
            </svg>
            <span class="text-gray-700">Sign in with Facebook</span>
          </button>
          
          <!-- Divisor -->
          <div class="flex items-center mb-6">
            <div class="flex-grow h-px bg-gray-300"></div>
            <span class="px-4 text-gray-500 text-sm">Or</span>
            <div class="flex-grow h-px bg-gray-300"></div>
          </div>
          
          <!-- Formulario -->
          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <label for="email" class="block text-gray-700 mb-2">Email address</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                placeholder="Enter your email"
                required
              >
            </div>
            
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <label for="password" class="block text-gray-700">Password</label>
                <a href="#" class="text-red-500 text-sm hover:underline">Forgot password?</a>
              </div>
              <div class="relative">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="password" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                  placeholder="Enter password"
                  required
                >
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <svg v-if="showPassword" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>