<template>
  <div class="bg-gray-50 rounded-lg p-6 mb-6">
    <h3 class="amenities-title text-xl font-bold text-black mb-4">Comodidades</h3>
    <div class="grid grid-cols-2 gap-y-3">
      <div v-for="(amenity, index) in displayedAmenities" :key="index" class="flex items-center">
        <i class="material-icons mr-2 text-gray-600">{{ getAmenityIcon(amenity) }}</i>
        <span class="text-gray-700">{{ translateAmenity(amenity) }}</span>
      </div>
    </div>
    <button 
      v-if="isCollapsed && amenities.length > maxDisplayed" 
      @click="toggleShowMore" 
      class="text-red-500 mt-3 hover:underline"
    >
      Mostrar más
    </button>
    <button 
      v-else-if="!isCollapsed && amenities.length > maxDisplayed" 
      @click="toggleShowMore" 
      class="text-red-500 mt-3 hover:underline"
    >
      Mostrar menos
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  amenities: {
    type: Array,
    default: () => [
      'WiFi',
      'Heating',
      'Dishwasher',
      'Parking place',
      'Air conditioning',
      'Iron',
      'TV',
      'Laundry',
      'Security cameras',
      'No smoking',
      'Double bed',
      'Single bed'
    ]
  },
  maxDisplayed: {
    type: Number,
    default: 8
  }
});

const isCollapsed = ref(true);
const displayedAmenities = computed(() => {
  if (isCollapsed.value && props.amenities.length > props.maxDisplayed) {
    return props.amenities.slice(0, props.maxDisplayed);
  }
  return props.amenities;
});

const toggleShowMore = () => {
  isCollapsed.value = !isCollapsed.value;
};

// Obtener icono para cada comodidad
const getAmenityIcon = (amenity) => {
  const amenityIcons = {
    'WiFi': 'wifi',
    'Heating': 'whatshot',
    'Dishwasher': 'local_laundry_service',
    'Parking place': 'local_parking',
    'Air conditioning': 'ac_unit',
    'Iron': 'iron',
    'TV': 'tv',
    'Laundry': 'local_laundry_service',
    'Security cameras': 'security',
    'No smoking': 'smoke_free',
    'Double bed': 'king_bed',
    'Single bed': 'single_bed'
  };

  return amenityIcons[amenity] || 'check';
};

// Traducción de amenidades
const translateAmenity = (amenity) => {
  const translations = {
    'WiFi': 'WiFi',
    'Heating': 'Calefacción',
    'Dishwasher': 'Lavavajillas',
    'Parking place': 'Estacionamiento',
    'Air conditioning': 'Aire acondicionado',
    'Iron': 'Plancha',
    'TV': 'Televisión',
    'Laundry': 'Lavandería',
    'Security cameras': 'Cámaras de seguridad',
    'No smoking': 'Prohibido fumar',
    'Double bed': 'Cama doble',
    'Single bed': 'Cama individual'
  };

  return translations[amenity] || amenity;
};
</script>

<style scoped>
.material-icons {
  font-size: 24px;
}
</style>