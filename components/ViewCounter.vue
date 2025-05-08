<template>
    <div class="view-counter">
      <span class="material-icons">visibility</span>
      Vistas: <b class="view-count" :class="{ 'updated': wasUpdated }">{{ formattedCount }}</b>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    count: {
      type: Number,
      required: true,
      default: 0
    }
  });
  
  // Estado para animación
  const wasUpdated = ref(false);
  
  // Formatear contador (por ejemplo, 1000 -> 1k)
  const formattedCount = computed(() => {
    if (props.count >= 1000000) {
      return (props.count / 1000000).toFixed(1) + 'M';
    } else if (props.count >= 1000) {
      return (props.count / 1000).toFixed(1) + 'k';
    }
    return props.count;
  });
  
  // Activar animación cuando cambia el contador
  watch(() => props.count, (newCount, oldCount) => {
    if (newCount > oldCount) {
      wasUpdated.value = true;
      setTimeout(() => {
        wasUpdated.value = false;
      }, 1000);
    }
  });
  </script>
  
  <style scoped>
  .view-counter {
    display: flex;
    align-items: center;
    color: #000000;
  }
  
  .material-icons {
    color: #fd5631; /* orange-800 */
    font-size: 18px;
    margin-right: 4px;
  }
  
  .view-count {
    font-weight: bold;
    margin-left: 4px;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  .updated {
    animation: pulse 0.5s ease-in-out;
  }
  </style>