<template>
    <span>{{ formattedPrice }}</span>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useCurrency } from '~/utilities/currencyUtils';
  
  const props = defineProps({
    amount: {
      type: [Number, String],
      required: true
    },
    originalCurrency: {
      type: String,
      default: 'USD'
    }
  });
  
  const { formatCurrency, convertCurrency, getCurrentCurrency, setupCurrencyListener } = useCurrency();
  
  // Valores reactivos
  const currentCurrencyCode = ref(getCurrentCurrency());
  const convertedAmount = ref(0);
  
  // Calcular el precio formateado
  const formattedPrice = computed(() => {
    return formatCurrency(convertedAmount.value, currentCurrencyCode.value);
  });
  
  // Convertir el precio a la moneda actual
  const updatePrice = () => {
    const amount = parseFloat(props.amount);
    if (!isNaN(amount)) {
      convertedAmount.value = convertCurrency(
        amount,
        props.originalCurrency,
        currentCurrencyCode.value
      );
    }
  };
  
  // Escuchar cambios de moneda
  onMounted(() => {
    // Inicializar
    updatePrice();
    
    // Configurar listener para cambios de moneda
    setupCurrencyListener((newCurrency) => {
      currentCurrencyCode.value = newCurrency;
      updatePrice();
    });
  });
  
  // Actualizar cuando cambia el monto original
  watch(() => props.amount, updatePrice);
  </script>