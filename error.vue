<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full text-center">
        <!-- 404 Error -->
        <template v-if="error.statusCode === 404">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </template>
        
        <!-- 500 Error -->
        <template v-else-if="error.statusCode === 500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Server Error</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Something went wrong on our servers. We're working to fix the issue.
          </p>
        </template>
        
        <!-- Fallback for other errors -->
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-amber-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            {{ error.statusCode ? `Error ${error.statusCode}` : 'An Error Occurred' }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            {{ error.message || 'We encountered an unexpected error. Please try again.' }}
          </p>
        </template>
        
        <!-- Error details for development -->
        <div v-if="process.dev && error.stack" class="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-left overflow-x-auto">
          <pre class="text-xs text-red-600 dark:text-red-400">{{ error.stack }}</pre>
        </div>
        
        <!-- Actions -->
        <div class="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button 
            @click="handleError" 
            class="btn-primary"
          >
            Try Again
          </button>
          <NuxtLink to="/" class="btn-outline">
            Back to Home
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Define props
  const props = defineProps({
    error: Object
  });
  
  // Clear error and either reload or return to the previous page
  const handleError = () => {
    clearError({ redirect: '/' });
  };
  </script>