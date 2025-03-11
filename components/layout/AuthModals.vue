<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '~/store/auth';

// Auth store
const authStore = useAuthStore();

// Estado de los modales
const isLoginModalOpen = ref(false);
const isRegisterModalOpen = ref(false);

// Login form data
const loginEmail = ref('');
const loginPassword = ref('');
const showLoginPassword = ref(false);

// Register form data
const firstName = ref('');
const lastName = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const confirmPassword = ref('');
const showRegisterPassword = ref(false);
const showConfirmPassword = ref(false);
const agreeToTerms = ref(false);
const registerError = ref('');
const registerLoading = ref(false);

// Método para iniciar sesión
const handleLogin = async () => {
  try {
    const result = await authStore.login({
      email: loginEmail.value,
      password: loginPassword.value
    });
    
    if (result.success) {
      // Cerrar modal
      isLoginModalOpen.value = false;
      
      // Redirigir o recargar la página según sea necesario
      window.location.reload();
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
const handleRegister = async () => {
  registerError.value = '';
  
  // Validación básica
  if (!firstName.value || !lastName.value || !registerEmail.value || !registerPassword.value) {
    registerError.value = 'Por favor completa todos los campos';
    return;
  }
  
  if (registerPassword.value !== confirmPassword.value) {
    registerError.value = 'Las contraseñas no coinciden';
    return;
  }
  
  if (registerPassword.value.length < 8) {
    registerError.value = 'La contraseña debe tener al menos 8 caracteres';
    return;
  }
  
  if (!agreeToTerms.value) {
    registerError.value = 'Debes aceptar los términos y condiciones';
    return;
  }
  
  try {
    registerLoading.value = true;
    
    const result = await authStore.register({
      first_name: firstName.value,
      last_name: lastName.value,
      email: registerEmail.value,
      password: registerPassword.value
    });
    
    if (result.success) {
      // Cerrar modal y redirigir
      isRegisterModalOpen.value = false;
      window.location.reload();
    } else {
      registerError.value = result.error || 'Error al registrarse';
    }
  } catch (error) {
    console.error('Error de registro:', error);
    registerError.value = 'Ocurrió un error inesperado';
  } finally {
    registerLoading.value = false;
  }
};

// Método para abrir modal de login
const openLoginModal = () => {
  isLoginModalOpen.value = true;
  isRegisterModalOpen.value = false;
};

// Método para abrir modal de registro
const openRegisterModal = () => {
  isRegisterModalOpen.value = true;
  isLoginModalOpen.value = false;
};

// Método para cerrar todos los modales
const closeModals = () => {
  isLoginModalOpen.value = false;
  isRegisterModalOpen.value = false;
};

// Cierra el modal cuando se hace clic fuera de él
const closeModalIfOutside = (event) => {
  const loginModal = document.querySelector('.login-modal-content');
  const registerModal = document.querySelector('.register-modal-content');
  
  if (loginModal && !loginModal.contains(event.target) && isLoginModalOpen.value) {
    isLoginModalOpen.value = false;
  }
  
  if (registerModal && !registerModal.contains(event.target) && isRegisterModalOpen.value) {
    isRegisterModalOpen.value = false;
  }
};

// Escuchar el evento personalizado para abrir el modal
const listenForOpenModal = () => {
  window.addEventListener('open-auth-modal', (e) => {
    // Si el evento tiene detalles adicionales, usar esa información
    if (e.detail && e.detail.type === 'register') {
      openRegisterModal();
    } else {
      openLoginModal();
    }
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

// Exponer métodos para uso externo
defineExpose({
  openLoginModal,
  openRegisterModal,
  closeModals
});
</script>

<template>
  <!-- Modal de Login -->
  <div 
    v-if="isLoginModalOpen"
    class="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 overflow-y-auto p-4"
    style="min-height: 100vh"
  >
    <!-- Modal de autenticación -->
    <div class="login-modal-content bg-white rounded-lg shadow-xl w-full max-w-5xl my-8 mx-auto">
      <div class="flex flex-col md:flex-row">
        <!-- Columna izquierda -->
        <div class="md:w-1/2 bg-gray-50 p-8 relative">
          <button 
            @click="closeModals"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <h2 class="text-4xl font-bold" style="color: #000000;">Hey there!</h2>
          <h3 class="text-3xl font-semibold mb-8" style="color: #000000;">Welcome back.</h3>
          
          <div class="flex justify-center mb-8">
            <img src="~/assets/images/signin.svg" alt="Login" class="w-80" 
                 onerror="this.src='https://via.placeholder.com/400x400?text=Login+Illustration'">
          </div>
          
          <p class="text-center" style="color: #4B5563;">
            Don't have an account? 
            <a @click.prevent="openRegisterModal" href="#" class="text-red-500 font-medium hover:underline">Sign up here</a>
          </p>
        </div>
        
        <!-- Columna derecha -->
        <div class="md:w-1/2 p-8">
          <!-- Botones sociales -->
          <button class="flex items-center justify-center w-full mb-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span class="text-gray-800 font-medium">Sign in with Google</span>
          </button>
          
          <button class="flex items-center justify-center w-full mb-6 p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.007 3H3.993A.993.993 0 003 3.993v16.013c0 .55.444.994.993.994h8.621v-6.972h-2.346v-2.716h2.346V9.31c0-2.325 1.42-3.591 3.494-3.591.993 0 1.847.074 2.096.107v2.43h-1.438c-1.128 0-1.346.537-1.346 1.324v1.734h2.69l-.35 2.716h-2.34V21h4.587a.993.993 0 00.993-.994V3.993A.993.993 0 0020.007 3z" fill="#1877F2"/>
            </svg>
            <span class="text-gray-800 font-medium">Sign in with Facebook</span>
          </button>
          
          <!-- Divisor -->
          <div class="flex items-center mb-6">
            <div class="flex-grow h-px bg-gray-300"></div>
            <span class="px-4 text-gray-600 text-sm">Or</span>
            <div class="flex-grow h-px bg-gray-300"></div>
          </div>
          
          <!-- Formulario -->
          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <label for="email" class="block text-gray-700 mb-2 font-medium">Email address</label>
              <input 
                type="email" 
                id="email" 
                v-model="loginEmail" 
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-700" 
                placeholder="Enter your email"
                required
              >
            </div>
            
            <div class="mb-6">
              <div class="flex justify-between items-center mb-2">
                <label for="password" class="block text-gray-700 font-medium">Password</label>
                <a href="#" class="text-red-500 text-sm hover:underline">Forgot password?</a>
              </div>
              <div class="relative">
                <input 
                  :type="showLoginPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="loginPassword" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-700" 
                  placeholder="Enter password"
                  required
                >
                <button 
                  type="button"
                  @click="showLoginPassword = !showLoginPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                >
                  <svg v-if="showLoginPassword" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              class="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-lg font-medium"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal de Registro -->
  <div 
    v-if="isRegisterModalOpen"
    class="fixed inset-0 flex items-start justify-center z-50 bg-black bg-opacity-50 overflow-y-auto p-4"
    style="min-height: 100vh"
  >
    <!-- Modal de registro -->
    <div class="register-modal-content bg-white rounded-lg shadow-xl w-full max-w-4xl my-8 mx-auto">
      <div class="flex flex-col md:flex-row">
        <!-- Columna izquierda -->
        <div class="md:w-1/2 bg-gray-50 p-8 relative">
          <button 
            @click="closeModals"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <h2 class="text-4xl font-bold" style="color: #000000;">Join Oasis.</h2>
          <h3 class="text-3xl font-semibold mb-6" style="color: #000000;">Get premium benefits:</h3>
          
          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-red-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-gray-700">Add and promote your listings</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-red-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-gray-700">Easily manage your wishlist</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-red-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span class="text-gray-700">Leave reviews</span>
            </li>
          </ul>
          
          <div class="flex justify-center mb-8">
            <img src="~/assets/images/signup.svg" alt="Registration" class="w-72" 
                 onerror="this.src='https://via.placeholder.com/350x350?text=Signup+Illustration'">
          </div>
          
          <p class="text-center" style="color: #4B5563;">
            Already have an account? 
            <a @click.prevent="openLoginModal" href="#" class="text-red-500 font-medium hover:underline">Sign in</a>
          </p>
        </div>
        
        <!-- Columna derecha -->
        <div class="md:w-1/2 p-8">
          <!-- Mensaje de error -->
          <div v-if="registerError" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ registerError }}
          </div>
          
          <!-- Botones sociales -->
          <button class="flex items-center justify-center w-full mb-3 p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span class="text-gray-800 font-medium">Sign in with Google</span>
          </button>
          
          <button class="flex items-center justify-center w-full mb-6 p-3 border border-gray-300 rounded-md hover:bg-gray-50">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.007 3H3.993A.993.993 0 003 3.993v16.013c0 .55.444.994.993.994h8.621v-6.972h-2.346v-2.716h2.346V9.31c0-2.325 1.42-3.591 3.494-3.591.993 0 1.847.074 2.096.107v2.43h-1.438c-1.128 0-1.346.537-1.346 1.324v1.734h2.69l-.35 2.716h-2.34V21h4.587a.993.993 0 00.993-.994V3.993A.993.993 0 0020.007 3z" fill="#1877F2"/>
            </svg>
            <span class="text-gray-800 font-medium">Sign in with Facebook</span>
          </button>
          
          <!-- Divisor -->
          <div class="flex items-center mb-6">
            <div class="flex-grow h-px bg-gray-300"></div>
            <span class="px-4 text-gray-600 text-sm">Or</span>
            <div class="flex-grow h-px bg-gray-300"></div>
          </div>
          
          <!-- Formulario -->
          <form @submit.prevent="handleRegister">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label for="first-name" class="block text-gray-700 mb-2 font-medium">First name</label>
                <input 
                  type="text" 
                  id="first-name" 
                  v-model="firstName" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-700" 
                  placeholder="Enter first name"
                  required
                >
              </div>
              <div>
                <label for="last-name" class="block text-gray-700 mb-2 font-medium">Last name</label>
                <input 
                  type="text" 
                  id="last-name" 
                  v-model="lastName" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-700" 
                  placeholder="Enter last name"
                  required
                >
              </div>
            </div>
            
            <div class="mb-4">
              <label for="register-email" class="block text-gray-700 mb-2 font-medium">Email address</label>
              <input 
                type="email" 
                id="register-email" 
                v-model="registerEmail" 
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-700" 
                placeholder="Enter your email"
                required
              >
            </div>
            
            <div class="mb-4">
              <label for="register-password" class="block text-gray-700 mb-2 font-medium">
                Password <span class="text-sm text-gray-600">min. 8 char</span>
              </label>
              <div class="relative">
                <input 
                  :type="showRegisterPassword ? 'text' : 'password'" 
                  id="register-password" 
                  v-model="registerPassword" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-700" 
                  placeholder="Create a password"
                  required
                  minlength="8"
                >
                <button 
                  type="button"
                  @click="showRegisterPassword = !showRegisterPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                >
                  <svg v-if="showRegisterPassword" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="mb-4">
              <label for="confirm-password" class="block text-gray-700 mb-2 font-medium">Confirm password</label>
              <div class="relative">
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  id="confirm-password" 
                  v-model="confirmPassword" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700 placeholder-gray-700" 
                  placeholder="Confirm your password"
                  required
                >
                <button 
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                >
                  <svg v-if="showConfirmPassword" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="mb-6">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    v-model="agreeToTerms" 
                    class="h-4 w-4 text-red-500 focus:ring-red-400 border-gray-300 rounded"
                  >
                </div>
                <label for="terms" class="ml-2 text-sm text-gray-700">
                  By joining, I agree to the 
                  <a href="#" class="text-red-500 hover:underline">Terms of use</a> and 
                  <a href="#" class="text-red-500 hover:underline">Privacy policy</a>
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              class="w-full bg-red-500 text-white py-3 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-lg font-medium"
              :disabled="registerLoading"
            >
              <span v-if="registerLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
              <span v-else>Sign up</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>