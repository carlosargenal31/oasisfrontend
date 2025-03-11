<template>
    <div>
      <h1 class="text-2xl font-bold mb-6 text-center">Reset Your Password</h1>
      
      <div v-if="resetSuccess" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
        <p class="font-bold">Request Sent</p>
        <p>We've sent password reset instructions to your email. Please check your inbox.</p>
      </div>
      
      <form v-else @submit.prevent="handleResetRequest" class="space-y-6">
        <!-- Error Alert -->
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>
        
        <!-- Instructions -->
        <p class="text-gray-600 dark:text-gray-400">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            required 
            class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="your@email.com"
          />
        </div>
        
        <!-- Submit Button -->
        <button 
          type="submit" 
          class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          :disabled="loading"
        >
          <span v-if="loading">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
          <span v-else>Send Reset Link</span>
        </button>
        
        <!-- Back to Login -->
        <div class="text-center text-sm">
          Remember your password? 
          <NuxtLink to="/auth/login" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Log in
          </NuxtLink>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Component state
  const email = ref('');
  const error = ref('');
  const loading = ref(false);
  const resetSuccess = ref(false);
  
  // Handle reset password request
  const handleResetRequest = async () => {
    if (!email.value) {
      error.value = 'Please enter your email address.';
      return;
    }
    
    loading.value = true;
    error.value = '';
    
    try {
      const { authApi } = await import('~/services/api');
      
      await authApi.requestPasswordReset({ email: email.value });
      
      // Mostrar mensaje de éxito
      resetSuccess.value = true;
    } catch (err) {
      console.error('Reset password error:', err);
      
      if (err.response && err.response.data && err.response.data.message) {
        error.value = err.response.data.message;
      } else {
        error.value = 'Failed to send reset instructions. Please try again.';
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