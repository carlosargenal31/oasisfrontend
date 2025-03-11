<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <div>{{ error.message }}</div>
    <button @click="handleError">Go back</button>
  </div>
</template>

<script setup>
// Definir props
const props = defineProps({
  error: Object
});

// Usar composables para obtener el router
const router = useRouter();

// Método para manejar el error
const handleError = () => {
  // Limpiar el error
  clearError();
  // Redirigir a la página de inicio
  router.push('/');
};
</script>

<style scoped>
.error-page {
  padding: 2rem;
  text-align: center;
}
</style>