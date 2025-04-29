<template>
  <div class="filter-section mb-5">
    <div class="price-range-slider mb-4 relative">
      <div class="relative w-full h-1 bg-gray-200 rounded-full my-6">
        <!-- Barra de rango de precio -->
        <div 
          class="absolute h-1 bg-red-500 rounded-full"
          :style="{
            left: getLeftPosition() + '%',
            width: getWidthPosition() + '%'
          }"
        ></div>
        
        <!-- Control deslizante mínimo -->
        <div 
          class="absolute w-4 h-4 bg-red-500 rounded-full -mt-1.5 transform -translate-x-1/2 cursor-grab"
          :style="{ left: getLeftPosition() + '%' }"
          @mousedown="startDragging('min')"
          @touchstart="startDragging('min')"
        ></div>
        
        <!-- Control deslizante máximo -->
        <div 
          class="absolute w-4 h-4 bg-red-500 rounded-full -mt-1.5 transform -translate-x-1/2 cursor-grab"
          :style="{ left: getRightPosition() + '%' }"
          @mousedown="startDragging('max')"
          @touchstart="startDragging('max')"
        ></div>
      </div>
    </div>
    
    <!-- Campos de entrada manual -->
    <div class="flex items-center space-x-2">
      <div class="flex-1 flex items-center border border-gray-300 rounded-md">
        <span class="pl-3 text-gray-500">L</span>
        <input 
          type="number" 
          v-model.number="minPrice" 
          @change="handlePriceChange"
          class="w-full p-2 border-none focus:ring-0 text-black"
          min="0"
        >
      </div>
      <span class="text-gray-500">—</span>
      <div class="flex-1 flex items-center border border-gray-300 rounded-md">
        <span class="pl-3 text-gray-500">L</span>
        <input 
          type="number" 
          v-model.number="maxPrice" 
          @change="handlePriceChange"
          class="w-full p-2 border-none focus:ring-0 text-black"
          min="0"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Props
const props = defineProps({
  isRent: {
    type: Boolean,
    default: true
  },
  initialMinPrice: {
    type: Number,
    default: () => 5000
  },
  initialMaxPrice: {
    type: Number,
    default: () => 123500
  },
  currencySymbol: {
    type: String,
    default: 'L'
  }
});

// Eventos
const emit = defineEmits(['update:price']);

// Estado local
const minPrice = ref(props.initialMinPrice);
const maxPrice = ref(props.initialMaxPrice);
const draggingHandle = ref(null);

// Calcular los límites del slider según el tipo (renta o venta)
const sliderMin = computed(() => props.isRent ? 0 : 0);
const sliderMax = computed(() => props.isRent ? 300000 : 5000000);

// Observar cambios en las propiedades iniciales
watch(() => props.initialMinPrice, (newVal) => {
  minPrice.value = newVal;
});

watch(() => props.initialMaxPrice, (newVal) => {
  maxPrice.value = newVal;
});

watch(() => props.isRent, (isRent) => {
  // Ajustar precios cuando cambia entre alquiler y venta
  if (isRent) {
    if (maxPrice.value > 300000) {
      maxPrice.value = 500000;
      minPrice.value = 0;
    }
  } else {
    if (maxPrice.value < 100000) {
      maxPrice.value = 500000;
      minPrice.value = 0;
    }
  }
  emit('update:price', { min: minPrice.value, max: maxPrice.value });
});

// Obtener posición del control izquierdo (mínimo)
const getLeftPosition = () => {
  const range = sliderMax.value - sliderMin.value;
  if (range <= 0) return 0;
  
  let position = ((minPrice.value - sliderMin.value) / range) * 100;
  // Asegurar que está dentro de los límites
  position = Math.max(0, Math.min(position, 100));
  return position;
};

// Obtener posición del control derecho (máximo)
const getRightPosition = () => {
  const range = sliderMax.value - sliderMin.value;
  if (range <= 0) return 100;
  
  let position = ((maxPrice.value - sliderMin.value) / range) * 100;
  // Asegurar que está dentro de los límites
  position = Math.max(0, Math.min(position, 100));
  return position;
};

// Obtener ancho de la barra de rango
const getWidthPosition = () => {
  return getRightPosition() - getLeftPosition();
};

// Iniciar arrastre
const startDragging = (handle) => {
  draggingHandle.value = handle;
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('touchmove', handleDrag, { passive: false });
  document.addEventListener('touchend', stopDragging);
  
  // Cambiar estilo del cursor durante arrastre
  document.body.style.cursor = 'grabbing';
};

// Manejar arrastre
const handleDrag = (e) => {
  e.preventDefault();
  
  if (!draggingHandle.value) return;
  
  const sliderTrack = document.querySelector('.price-range-slider > div');
  if (!sliderTrack) return;
  
  const trackRect = sliderTrack.getBoundingClientRect();
  const trackWidth = trackRect.width;
  
  // Obtener posición X (manejar eventos táctiles y de ratón)
  let clientX;
  if (e.type === 'touchmove') {
    clientX = e.touches[0].clientX;
  } else {
    clientX = e.clientX;
  }
  
  // Calcular posición porcentual
  let percentPosition = (clientX - trackRect.left) / trackWidth;
  percentPosition = Math.min(Math.max(percentPosition, 0), 1);
  
  // Calcular precio según posición
  const priceRange = sliderMax.value - sliderMin.value;
  let priceValue;
  
  if (props.isRent) {
    // Para alquiler, redondear a múltiplos de 500
    priceValue = Math.round((percentPosition * priceRange + sliderMin.value) / 500) * 500;
  } else {
    // Para venta, redondear a múltiplos de 50000
    priceValue = Math.round((percentPosition * priceRange + sliderMin.value) / 50000) * 50000;
  }
  
  // Actualizar precio mínimo o máximo según qué control se está arrastrando
  if (draggingHandle.value === 'min') {
    // Asegurar que el precio mínimo no exceda el máximo
    const step = props.isRent ? 500 : 50000;
    minPrice.value = Math.min(priceValue, maxPrice.value - step);
  } else {
    // Asegurar que el precio máximo no sea menor que el mínimo
    const step = props.isRent ? 500 : 50000;
    maxPrice.value = Math.max(priceValue, minPrice.value + step);
  }
};

// Detener arrastre
const stopDragging = () => {
  if (draggingHandle.value) {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', stopDragging);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('touchend', stopDragging);
    
    // Restaurar estilo del cursor
    document.body.style.cursor = '';
    
    // Emitir evento de cambio
    emit('update:price', { min: minPrice.value, max: maxPrice.value });
    
    // Resetear estado de arrastre
    draggingHandle.value = null;
  }
};

// Manejar cambio de precio manual
const handlePriceChange = () => {
  // Asegurar que minPrice no sea mayor que maxPrice
  if (minPrice.value > maxPrice.value) {
    minPrice.value = maxPrice.value;
  }
  
  // Emitir evento de cambio
  emit('update:price', { min: minPrice.value, max: maxPrice.value });
};
</script>

<style scoped>
input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

.price-range-slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #ef4444;
  border-radius: 50%;
  cursor: pointer;
}

.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing;
}

/* Estilos para asegurar que el slider se mantenga dentro del sidebar */
.filter-section {
  max-width: 100%;
  overflow: hidden;
}

/* Asegurar que el input numérico no exceda el contenedor */
input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>