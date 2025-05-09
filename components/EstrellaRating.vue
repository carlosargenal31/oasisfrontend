<!-- components/EstrellaRating.vue -->
<template>
  <div class="flex items-center">
    <div class="flex">
      <template v-for="n in 5" :key="n">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
          fill="currentColor"
          :class="getStarClass(n)"
          viewBox="0 0 24 24"
          class="mr-1"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      </template>
    </div>
    <span v-if="mostrarNumero" class="text-xs text-gray-500 ml-1">({{ formatearCalificacion }})</span>
  </div>
</template>

<script>
export default {
  name: 'EstrellaRating',
  props: {
    calificacion: {
      type: [Number, String],
      default: 0
    },
    mostrarNumero: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // Convertir calificación a un número para los cálculos
    calificacionNumerica() {
      const valor = parseFloat(this.calificacion);
      return isNaN(valor) ? 0 : valor;
    },
    // Formatear para mostrar siempre un decimal
    formatearCalificacion() {
      return this.calificacionNumerica.toFixed(1);
    }
  },
  methods: {
    getStarClass(position) {
      // Usar la propiedad computada para asegurar que siempre es un número
      const rating = this.calificacionNumerica;
      
      if (rating >= position) {
        return "text-yellow-400"; // Estrella completa
      } else if (rating >= position - 0.5) {
        return "text-yellow-400 opacity-60"; // Media estrella
      } else {
        return "text-gray-300"; // Estrella vacía
      }
    }
  },
  watch: {
    // Observar cambios en la calificación para debugging
    calificacion: {
      handler(newVal, oldVal) {
        console.log(`EstrellaRating - calificación cambió: ${oldVal} → ${newVal}`);
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.text-yellow-400 {
  color: #FBBF24 !important;
}
.text-gray-300 {
  color: #D1D5DB !important;
}
</style>