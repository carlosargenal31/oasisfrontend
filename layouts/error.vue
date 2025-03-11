<template>
  <!-- Usamos directamente el componente Custom404 -->
  <Custom404 v-if="error?.statusCode === 404" />
  
  <!-- Para otros errores, usamos un diseño similar pero adaptado -->
  <div v-else class="min-h-screen grid md:grid-cols-2">
    <!-- Columna izquierda (fondo oscuro) -->
    <div class="bg-gray-900 p-10 flex flex-col justify-center text-white">
      <h1 class="text-5xl md:text-6xl font-bold mb-4">
        An Error Occurred.
      </h1>
      <p class="text-lg mb-10 text-gray-300">
        Sorry, something went wrong. We are already working on fixing it.
      </p>
      
      <!-- Código de error si está disponible -->
      <div v-if="error?.statusCode" class="mb-8 inline-block">
        <span class="text-2xl font-mono bg-red-500/20 py-1 px-3 rounded">
          Error {{ error.statusCode }}
        </span>
      </div>
      
      <!-- Decoración gráfica (línea curva) -->
      <svg class="w-20 h-20 mb-8 text-white opacity-80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,40 Q50,10 70,60" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M65,65 L70,60 L75,65" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>
      
      <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button @click="handleError" class="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-medium text-center">
          Try again
        </button>
        <NuxtLink to="/" class="border border-white/30 hover:bg-white/10 text-white py-3 px-6 rounded-lg font-medium text-center">
          Go to homepage
        </NuxtLink>
      </div>
    </div>
    
    <!-- Columna derecha (ilustración) -->
    <div class="bg-gray-100 flex items-center justify-center p-10">
      <div class="relative w-full max-w-md mx-auto">
        <!-- Ilustración de error genérico -->
        <img src="/images/error.svg" class="w-full" alt="Error" 
             onerror="this.onerror=null; this.src='https://via.placeholder.com/600x600?text=Error'">
      </div>
    </div>
  </div>
</template>

<script setup>
// Props que proporciona Nuxt para la página de error
defineProps({
  error: Object
});

// Métodos
const handleError = () => {
  // Limpiar el error y recargar la página
  clearError({ redirect: '/' });
};
</script>