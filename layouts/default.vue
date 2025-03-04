<template>
    <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <app-header />
      <main class="flex-grow">
        <slot />
      </main>
      <app-footer />
    </div>
  </template>
  
  <script setup>
  import AppHeader from '~/components/layout/AppHeader.vue'
  import AppFooter from '~/components/layout/AppFooter.vue'
  </script>