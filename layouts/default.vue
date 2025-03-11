<script setup>
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
import AuthModals from '~/components/layout/AuthModals.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
    <AuthModals />
  </div>
</template>