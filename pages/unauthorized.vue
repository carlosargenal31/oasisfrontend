<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Access Denied</h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          You don't have permission to access this page. This area is restricted.
        </p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <NuxtLink to="/" class="btn-primary">
            Back to Home
          </NuxtLink>
          <button 
            @click="logout" 
            class="btn-outline"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  const logout = async () => {
    await authStore.logout();
    router.push('/auth/login');
  };
  </script>