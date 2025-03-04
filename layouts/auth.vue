<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md">
        <!-- Color mode switch -->
        <div class="absolute top-4 right-4">
          <button @click="toggleColorMode" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            <svg v-if="colorMode.value === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
        
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <h1 class="text-3xl font-bold text-blue-600 dark:text-blue-400">OASIS</h1>
        </div>
        
        <!-- Auth Content -->
        <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
          <slot />
        </div>
        
        <!-- Back to home -->
        <div class="mt-6 text-center">
          <NuxtLink to="/" class="text-blue-600 dark:text-blue-400 text-sm hover:underline">
            Back to Homepage
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Use the useColorMode composable from Nuxt
  const colorMode = useColorMode()
  
  // Toggle between light and dark mode
  const toggleColorMode = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
  </script>