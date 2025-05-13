<!-- components/EstrellaRating.vue -->
<template>
  <div class="flex items-center estrella-rating-component">
    <!-- Añadir un div para debugging que se pueda mostrar/ocultar -->
    <div v-if="debug" class="mr-2 text-xs bg-gray-200 px-1 rounded">
      Rating: {{ calificacionNumerica }} ({{ typeof calificacion }})
    </div>
    
    <div class="flex">
      <template v-for="n in 5" :key="n">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
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
    },
    debug: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // Convertir calificación a un número para los cálculos
    calificacionNumerica() {
      // Primero verificar si es null o undefined
      if (this.calificacion === null || this.calificacion === undefined) {
        console.warn('EstrellaRating recibió calificación null o undefined');
        return 0;
      }
      
      // Manejar el caso de string vacío
      if (this.calificacion === '') {
        return 0;
      }
      
      const valor = parseFloat(this.calificacion);
      if (isNaN(valor)) {
        console.warn(`EstrellaRating: valor no numérico: "${this.calificacion}"`);
        return 0;
      }
      return valor;
    },
    // Formatear para mostrar siempre un decimal
    formatearCalificacion() {
      return this.calificacionNumerica.toFixed(1);
    }
  },
  methods: {
    // Dentro del componente EstrellaRating
getStarClass(position) {
  // Asegurarse de que la calificación es un número
  const rating = this.calificacionNumerica;
  
  if (rating >= position) {
    return "estrella-llena"; // Estrella completa
  } else if (rating >= position - 0.5) {
    return "estrella-media"; // Media estrella
  } else {
    return "estrella-vacia"; // Estrella vacía
  }
}
  },
  watch: {
    // Observar cambios en la calificación para debugging
    calificacion: {
      handler(newVal, oldVal) {
        console.log(`EstrellaRating - calificación cambió: ${oldVal} → ${newVal} (${typeof newVal})`);
      },
      immediate: true
    }
  },
  mounted() {
    console.log(`EstrellaRating montado con calificación: ${this.calificacion} (${typeof this.calificacion})`);
  }
}
</script>

<style scoped>
/* Usar clases específicas en lugar de clases de Tailwind para evitar conflictos */
.estrella-llena {
  color: #FBBF24 !important;
}
.estrella-media {
  color: #FBBF24 !important;
  opacity: 0.7;
}
.estrella-vacia {
  color: #D1D5DB !important;
}

/* Asegurar que las estrellas tengan un tamaño mínimo visible */
svg {
  min-width: 16px;
  min-height: 16px;
}
</style>