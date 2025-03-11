<!-- 
Componente de Mapa para Properties
Este componente se puede incluir directamente en el index.vue

Instrucciones:
1. Guarda este archivo como PropertyMap.vue en la carpeta components
2. Impórtalo en index.vue: import PropertyMap from '~/components/PropertyMap.vue';
3. Añade el componente al template donde está el div id="map-overlay"
-->

<template>
    <div 
      id="map-overlay"
      :class="{ 'hidden': !isVisible }"
      @click.self="$emit('close')"
    >
      <div class="map-container">
        <button 
          @click="$emit('close')" 
          class="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        
        <div class="map-content h-full w-full">
          <!-- Aquí iría el mapa real, como una alternativa usamos una simulación mejorada -->
          <div 
            id="map-canvas" 
            class="h-full w-full bg-gray-100 flex flex-col items-center justify-center p-4"
            ref="mapCanvas"
          >
            <h2 class="text-xl font-bold text-gray-900 mb-4">Map View</h2>
            
            <!-- Simulación de mapa con propiedades -->
            <div class="w-full h-full relative bg-blue-50 rounded-lg overflow-hidden">
              <!-- Background mapa -->
              <div class="absolute inset-0 bg-opacity-40 bg-blue-100">
                <!-- Líneas de cuadrícula simulando calles -->
                <div class="grid-lines"></div>
                
                <!-- Añadir algunos nombres de calles simulados -->
                <div class="street-names">
                  <div class="street horizontal" style="top: 25%">Main Street</div>
                  <div class="street horizontal" style="top: 50%">Oak Avenue</div>
                  <div class="street horizontal" style="top: 75%">Pine Road</div>
                  
                  <div class="street vertical" style="left: 25%">1st Avenue</div>
                  <div class="street vertical" style="left: 50%">Broadway</div>
                  <div class="street vertical" style="left: 75%">Park Place</div>
                </div>
              </div>
              
              <!-- Marcadores de propiedades -->
              <div 
                v-for="property in properties" 
                :key="property.id"
                class="property-marker"
                :class="{
                  'rental-marker': property.status === 'for-rent',
                  'sale-marker': property.status === 'for-sale'
                }"
                :style="{
                  left: getPositionForProperty(property.id).x + '%',
                  top: getPositionForProperty(property.id).y + '%'
                }"
                @click="propertyClicked(property)"
                @mouseover="hoveredProperty = property"
                @mouseleave="hoveredProperty = null"
              >
                <div class="marker-dot"></div>
                
                <!-- Tooltip al pasar el mouse -->
                <div 
                  v-show="hoveredProperty && hoveredProperty.id === property.id"
                  class="property-tooltip"
                >
                  <div class="font-bold text-sm">{{ property.title }}</div>
                  <div class="text-xs">{{ formatPrice(property.price) }}</div>
                  <div class="text-xs mt-1">
                    <span class="mr-1">{{ property.bedrooms }} bed</span>
                    <span class="mr-1">{{ property.bathrooms }} bath</span>
                    <span>{{ property.square_feet }} sq.ft</span>
                  </div>
                </div>
              </div>
              
              <!-- Indicador de "Usted está aquí" -->
              <div class="you-are-here" style="left: 50%; top: 50%">
                <div class="pulse-dot"></div>
                <div class="you-are-here-label">You are here</div>
              </div>
              
              <!-- Leyenda -->
              <div class="map-legend">
                <div class="legend-item">
                  <div class="legend-dot rental-dot"></div>
                  <span>For Rent</span>
                </div>
                <div class="legend-item">
                  <div class="legend-dot sale-dot"></div>
                  <span>For Sale</span>
                </div>
              </div>
            </div>
            
            <p class="text-gray-600 mt-2 text-center">
              This is a simulated map view. In a real implementation, this would be integrated with Google Maps or similar service.
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Props
  const props = defineProps({
    isVisible: {
      type: Boolean,
      default: false
    },
    properties: {
      type: Array,
      default: () => []
    }
  });
  
  // Emitir eventos
  defineEmits(['close', 'property-click']);
  
  // Estado
  const hoveredProperty = ref(null);
  const mapCanvas = ref(null);
  const propertyPositions = ref({});
  
  // Al hacer clic en una propiedad
  const propertyClicked = (property) => {
    // Emitir evento al componente padre
    emit('property-click', property.id);
  };
  
  // Generar posición consistente para cada propiedad basada en su ID
  const getPositionForProperty = (id) => {
    // Si ya tenemos una posición para esta propiedad, devolverla
    if (propertyPositions.value[id]) {
      return propertyPositions.value[id];
    }
    
    // Sino, generar una nueva posición y guardarla
    // Usamos el ID para generar una posición pseudo-aleatoria pero consistente
    const seed = id * 1000;
    const x = ((seed % 73) / 73) * 70 + 15; // Entre 15% y 85%
    const y = ((seed % 91) / 91) * 70 + 15; // Entre 15% y 85%
    
    propertyPositions.value[id] = { x, y };
    return propertyPositions.value[id];
  };
  
  // Formatear precio
  const formatPrice = (price) => {
    if (!price) return "$0";
    
    const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${formatted}`;
  };
  
  // Inicializar posiciones al montar el componente
  onMounted(() => {
    // Generar posiciones para todas las propiedades
    props.properties.forEach(property => {
      getPositionForProperty(property.id);
    });
    
    // Aquí se inicializaría un mapa real con una API como Google Maps
    /*
    if (window.google && window.google.maps && mapCanvas.value) {
      const map = new google.maps.Map(mapCanvas.value, {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        styles: [
          // Estilos personalizados para el mapa
        ]
      });
      
      // Añadir marcadores para cada propiedad
      props.properties.forEach(property => {
        if (property.lat && property.lng) {
          new google.maps.Marker({
            position: { lat: property.lat, lng: property.lng },
            map: map,
            title: property.title,
            icon: property.status === 'for-rent' ? rentMarkerIcon : saleMarkerIcon
          });
        }
      });
    }
    */
  });
  </script>
  
  <style scoped>
  #map-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
  }
  
  #map-overlay.hidden {
    display: none;
  }
  
  .map-container {
    width: 90%;
    max-width: 1200px;
    height: 80vh;
    background-color: white;
    border-radius: 0.5rem;
    position: relative;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  
  .map-content {
    padding: 1rem;
    overflow: hidden;
    border-radius: 0.5rem;
  }
  
  /* Estilos para la simulación de mapa */
  .grid-lines {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px);
    background-size: 50px 50px;
  }
  
  .street {
    position: absolute;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.75rem;
    font-weight: 500;
    pointer-events: none;
    white-space: nowrap;
  }
  
  .horizontal {
    left: 10px;
    transform: translateY(-50%);
  }
  
  .vertical {
    top: 10px;
    transform: translateX(-50%) rotate(-90deg);
    transform-origin: left center;
  }
  
  .property-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 5;
    cursor: pointer;
  }
  
  .marker-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #ef4444;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: transform 0.2s ease;
  }
  
  .property-marker:hover .marker-dot {
    transform: scale(1.2);
  }
  
  .rental-marker .marker-dot {
    background-color: #ef4444;
  }
  
  .sale-marker .marker-dot {
    background-color: #3b82f6;
  }
  
  .property-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 4px;
    padding: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    white-space: nowrap;
    margin-bottom: 5px;
    z-index: 10;
    min-width: 120px;
  }
  
  .property-tooltip:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
  
  .you-are-here {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 4;
  }
  
  .pulse-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #1a56db;
    border: 3px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 0 rgba(26, 86, 219, 0.4);
    animation: pulse 2s infinite;
  }
  
  .you-are-here-label {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    margin-top: 5px;
    font-size: 0.75rem;
    color: #1a56db;
    font-weight: 500;
    white-space: nowrap;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(26, 86, 219, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(26, 86, 219, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(26, 86, 219, 0);
    }
  }
  
  .map-legend {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: white;
    border-radius: 4px;
    padding: 0.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    z-index: 10;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
  }
  
  .legend-item:last-child {
    margin-bottom: 0;
  }
  
  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
  
  .rental-dot {
    background-color: #ef4444;
  }
  
  .sale-dot {
    background-color: #3b82f6;
  }
  </style>