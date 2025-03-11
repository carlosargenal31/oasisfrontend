<template>
  <button 
    @click="toggleFavorite" 
    class="btn btn-icon btn-light btn-xs text-primary rounded-circle" 
    type="button"
    :class="{ 'text-danger': isFavorite }"
  >
    <i class="fi-heart"></i>
  </button>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/auth';

const props = defineProps({
  propertyId: {
    type: Number,
    required: true
  },
  initialIsFavorite: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['favorite-changed']);
const router = useRouter();
const authStore = useAuthStore();
const isFavorite = ref(props.initialIsFavorite);

const toggleFavorite = async () => {
  try {
    // If user is not logged in, redirect to login
    if (!authStore.isAuthenticated) {
      localStorage.setItem('authRedirect', router.currentRoute.value.fullPath);
      router.push('/auth/login');
      return;
    }
    
    // Toggle favorite state
    isFavorite.value = !isFavorite.value;
    
    // In a real-world application, you would call an API here
    // Example:
    // if (isFavorite.value) {
    //   await userApi.addFavorite(props.propertyId);
    // } else {
    //   await userApi.removeFavorite(props.propertyId);
    // }
    
    // Emit event to parent
    emit('favorite-changed', {
      propertyId: props.propertyId,
      isFavorite: isFavorite.value
    });
  } catch (error) {
    console.error('Error toggling favorite:', error);
    // Revert state on error
    isFavorite.value = !isFavorite.value;
  }
};
</script>

<style scoped>
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-light {
  background-color: #fff;
  border-color: #fff;
}

.text-primary {
  color: #0d6efd !important;
}

.text-danger {
  color: #dc3545 !important;
}

.rounded-circle {
  border-radius: 50% !important;
}

.btn-xs {
  padding: 0.25rem;
  font-size: 0.875rem;
  line-height: 1;
}
</style>