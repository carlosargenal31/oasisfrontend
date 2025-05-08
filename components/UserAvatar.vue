<template>
  <div 
    class="user-avatar flex items-center justify-center overflow-hidden" 
    :class="[
      sizeClasses[size], 
      classNames
    ]"
  >
    <img 
      v-if="profileImage && !imageError" 
      :src="profileImage" 
      :alt="userName" 
      class="w-full h-full object-cover"
      @error="handleImageError"
    />
    <div 
      v-else 
      class="flex items-center justify-center w-full h-full font-medium bg-orange-100 text-orange-800"
    >
      {{ initials }}
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  classNames: {
    type: String,
    default: ''
  }
});

// Estado para manejar errores de carga de imagen
const imageError = ref(false);

// Manejar error de carga de imagen
const handleImageError = () => {
  imageError.value = true;
};

// Calcular la URL de la imagen de perfil
const profileImage = computed(() => {
  if (!props.user) return null;
  // Usar profile_image si está disponible
  return props.user.profile_image || null;
});

// Calcular iniciales del usuario
const initials = computed(() => {
  if (!props.user) return '?';
  
  const firstName = props.user.first_name || '';
  const lastName = props.user.last_name || '';
  
  if (!firstName && !lastName) return '?';
  
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
});

// Calcular el nombre completo del usuario
const userName = computed(() => {
  if (!props.user) return 'Usuario';
  
  const firstName = props.user.first_name || '';
  const lastName = props.user.last_name || '';
  
  if (!firstName && !lastName) return 'Usuario';
  
  return `${firstName} ${lastName}`.trim();
});

// Clases de tamaño
const sizeClasses = {
  sm: 'w-8 h-8 rounded-full text-xs',
  md: 'w-10 h-10 rounded-full text-sm',
  lg: 'w-16 h-16 rounded-full text-lg',
  xl: 'w-24 h-24 rounded-full text-xl'
};
</script>