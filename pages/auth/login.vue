<template>
  <div class="bg-white text-black p-6 rounded-lg shadow-lg max-w-md mx-auto">
    <div class="flex justify-center mb-6">
      <img src="~/public/images/logolcb.png" alt="OASIS Logo" class="h-16" />
    </div>
    
    <h1 class="text-2xl font-bold mb-6 text-center text-black">Inicia sesión en tu cuenta</h1>
    
    <form @submit.prevent="handleLogin" class="space-y-6">
      <!-- Error Alert -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>
      
      <!-- Success Alert -->
      <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ success }}</span>
      </div>
      
      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm font-medium text-black mb-1">Correo electrónico</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          required 
          class="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 text-black bg-white"
          placeholder="tu@correo.com"
        />
      </div>
      
      <!-- Password Input -->
      <div>
        <div class="flex justify-between">
          <label for="password" class="block text-sm font-medium text-black mb-1">Contraseña</label>
          <a href="/auth/login?forgotPassword=true" class="text-sm text-orange-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <input 
          id="password" 
          v-model="password" 
          type="password" 
          required 
          class="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 text-black bg-white"
          placeholder="••••••••"
        />
      </div>
      
      <!-- Forgot password form -->
      <div v-if="showForgotPasswordForm" class="bg-orange-50 p-4 rounded border border-orange-100">
        <h3 class="text-lg font-medium mb-2 text-black">Reestablece tu contraseña</h3>
        <p class="text-sm text-gray-600 mb-3">Ingresa tu correo electrónico y te enviaremos instrucciones para reestablecer tu contraseña.</p>
        
        <div class="mb-4">
          <label for="resetEmail" class="block text-sm font-medium text-black mb-1">Correo electrónico</label>
          <input 
            id="resetEmail" 
            v-model="resetEmail" 
            type="email" 
            required 
            class="w-full px-4 py-2 border rounded-lg text-black bg-white"
            placeholder="tu@correo.com"
          />
        </div>
        
        <div class="flex space-x-2">
          <button 
            type="button"
            @click="handleResetPassword" 
            class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 focus:outline-none"
            :disabled="resetLoading"
          >
            <span v-if="resetLoading">Enviando...</span>
            <span v-else>Enviar enlace</span>
          </button>
          <button 
            type="button"
            @click="showForgotPasswordForm = false" 
            class="px-4 py-2 border rounded hover:bg-gray-50 focus:outline-none text-black"
          >
            Cancelar
          </button>
        </div>
      </div>
      
      <!-- Remember Me -->
      <div class="flex items-center">
        <input 
          id="remember" 
          v-model="rememberMe" 
          type="checkbox" 
          class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
        />
        <label for="remember" class="ml-2 block text-sm text-black">
          Recordarme
        </label>
      </div>
      
      <!-- Submit Button -->
      <button 
        type="submit" 
        class="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors"
        :disabled="loading"
      >
        <span v-if="loading">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Iniciando sesión...
        </span>
        <span v-else>Iniciar sesión</span>
      </button>
      
      <!-- Sign Up Link -->
      <div class="text-center text-sm text-black">
        ¿No tienes una cuenta? 
        <NuxtLink to="/auth/register" class="text-orange-600 hover:underline font-medium">
          Regístrate
        </NuxtLink>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Component state
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const error = ref('');
const success = ref('');
const loading = ref(false);

// Forgot password
const showForgotPasswordForm = ref(false);
const resetEmail = ref('');
const resetLoading = ref(false);

// Obtener el router
const router = useRouter();
const route = useRoute();

// Check for remembered email and query parameters on mount
onMounted(() => {
  if (process.client) {
    // Check for remembered email
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      email.value = rememberedEmail;
      rememberMe.value = true;
    }
    
    // Check if forgot password query param is present
    if (route.query.forgotPassword === 'true') {
      showForgotPasswordForm.value = true;
    }
  }
});

// Handle password reset request
const handleResetPassword = async () => {
  if (!resetEmail.value) {
    error.value = 'Por favor, ingresa tu correo electrónico.';
    return;
  }
  
  resetLoading.value = true;
  error.value = '';
  
  try {
    const response = await axios.post('http://localhost:3000/api/auth/request-reset', {
      email: resetEmail.value
    });
    
    if (response.data && response.data.success) {
      success.value = 'Se han enviado instrucciones para reestablecer tu contraseña a tu correo electrónico.';
      showForgotPasswordForm.value = false;
    } else {
      error.value = 'Error al enviar instrucciones de restablecimiento. Por favor, inténtalo de nuevo.';
    }
  } catch (err) {
    console.error('Error de restablecimiento de contraseña:', err);
    
    if (err.response && err.response.data) {
      error.value = err.response.data.message || 'Error al enviar instrucciones de restablecimiento. Por favor, inténtalo de nuevo.';
    } else {
      error.value = `Error: ${err.message}`;
    }
  } finally {
    resetLoading.value = false;
  }
};

// Función de inicio de sesión
const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = '';
    success.value = '';
    
    console.log('Intentando iniciar sesión con:', email.value, password.value);
    
    // Hacer una solicitud directa a la API
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value
    });
    
    console.log('Respuesta de inicio de sesión:', response);
    
    if (response.data && response.data.success && response.data.data) {
      // Extraer datos de la respuesta
      const { user, accessToken, refreshToken } = response.data.data;
      
      console.log('Inicio de sesión exitoso. Usuario:', user.first_name, user.last_name);
      
      // Guardar en localStorage
      localStorage.setItem('access_token', accessToken); // Nombre correcto para el token
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      if (rememberMe.value) {
        localStorage.setItem('rememberedEmail', email.value);
      }
      
      success.value = '¡Inicio de sesión exitoso! Redirigiendo...';
      
      // Redirigir directamente a la página de información de cuenta
      setTimeout(() => {
        router.push('/account/account-info');
      }, 1000);
    } else {
      error.value = 'Formato de respuesta inesperado';
    }
  } catch (err) {
    console.error('Error de inicio de sesión:', err);
    
    if (err.response && err.response.data) {
      error.value = err.response.data.message || 'Error de inicio de sesión';
    } else {
      error.value = `Error: ${err.message}`;
    }
  } finally {
    loading.value = false;
  }
};

// Use demo account for quick testing
const useDemoAccount = () => {
  email.value = 'cliente@example.com';
  password.value = 'password123';
  handleLogin();
};

// Layout setup
definePageMeta({
  layout: 'auth'
});
</script>

<style>
/* Estilos adicionales para garantizar fondo blanco y texto negro */
body {
  background-color: white;
  color: black;
}
</style>