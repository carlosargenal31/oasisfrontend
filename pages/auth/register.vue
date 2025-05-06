<template>
  <div class="bg-white text-black p-6 rounded-lg shadow-lg max-w-md mx-auto">
    <div class="flex justify-center mb-6">
      <img src="~/public/images/oasis-logo.png" alt="OASIS Logo" class="h-16" />
    </div>
    
    <h1 class="text-2xl font-bold mb-6 text-center text-black">Crea tu cuenta</h1>

    <form @submit.prevent="handleRegister" class="space-y-6">
      <!-- Error Alert -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- Name Inputs -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-black mb-1">Nombre</label>
          <input 
            id="firstName" 
            v-model="firstName" 
            type="text" 
            required 
            class="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 text-black bg-white"
            placeholder="Juan"
          />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-black mb-1">Apellido</label>
          <input 
            id="lastName" 
            v-model="lastName" 
            type="text" 
            required 
            class="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 text-black bg-white"
            placeholder="Pérez"
          />
        </div>
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
        <label for="password" class="block text-sm font-medium text-black mb-1">Contraseña</label>
        <input 
          id="password" 
          v-model="password" 
          type="password" 
          required
          minlength="8"
          class="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 text-black bg-white"
          placeholder="••••••••"
        />
        <p class="mt-1 text-xs text-gray-500">
          La contraseña debe tener al menos 8 caracteres
        </p>
      </div>

      <!-- Confirm Password Input -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-black mb-1">
          Confirmar contraseña
        </label>
        <input 
          id="confirmPassword" 
          v-model="confirmPassword" 
          type="password" 
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500 text-black bg-white"
          placeholder="••••••••"
        />
      </div>

      <!-- Terms and Conditions -->
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input 
            id="terms" 
            v-model="agreeToTerms" 
            type="checkbox" 
            required
            class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="terms" class="text-black">
            Acepto los
            <NuxtLink to="/terms" class="text-orange-600 hover:underline">
              Términos de servicio
            </NuxtLink>
            y la
            <NuxtLink to="/privacy" class="text-orange-600 hover:underline">
              Política de privacidad
            </NuxtLink>
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        class="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-colors"
        :disabled="loading || password !== confirmPassword || !agreeToTerms"
      >
        <span v-if="loading">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creando cuenta...
        </span>
        <span v-else>Crear cuenta</span>
      </button>

      <!-- Sign In Link -->
      <div class="text-center text-sm text-black">
        ¿Ya tienes una cuenta? 
        <NuxtLink to="/auth/login" class="text-orange-600 hover:underline font-medium">
          Iniciar sesión
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

// Component state
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeToTerms = ref(false);
const error = ref('');
const loading = ref(false);

// Get router
const router = useRouter();

// Password validation
const passwordsMatch = computed(() => {
  if (!password.value || !confirmPassword.value) return true;
  return password.value === confirmPassword.value;
});

// Handle registration form submission
const handleRegister = async () => {
  // Validate form
  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden.';
    return;
  }

  if (!agreeToTerms.value) {
    error.value = 'Debes aceptar los Términos de servicio y la Política de privacidad.';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const response = await axios.post('http://localhost:3000/api/auth/register', {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value
    });
    
    if (response.data && response.data.success) {
      // Redirigir directamente a la página de inicio de sesión
      router.push('/auth/login');
    } else {
      error.value = response.data.message || 'Error en el registro. Por favor, inténtalo de nuevo.';
    }
  } catch (err) {
    console.error('Error de registro:', err);
    
    if (err.response && err.response.data) {
      error.value = err.response.data.message || 'Error en el registro. Por favor, inténtalo de nuevo.';
    } else {
      error.value = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
    }
  } finally {
    loading.value = false;
  }
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