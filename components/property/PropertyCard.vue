<template>
  <div class="property-card" @click="goToPropertyDetail">
    <!-- Property Image -->
    <div class="property-image-container">
      <img 
        :src="property.image || 'https://placehold.co/600x400?text=No+Image'" 
        :alt="property.title" 
        class="property-image"
      >
      
      <!-- Status Badges -->
      <div class="badge-container">
        <span v-if="property.status === 'verified'" class="badge verified">Verified</span>
        <span v-if="property.isNew" class="badge new">New</span>
        <span v-if="property.isFeatured" class="badge featured">Featured</span>
      </div>
      
      <!-- Favorite Button -->
      <button 
        @click.stop="toggleFavorite" 
        class="favorite-btn"
      >
        <i class="fi-heart" :class="{ 'is-favorite': isFavorite }"></i>
      </button>
    </div>
    
    <!-- Property Details -->
    <div class="property-details">
      <!-- For Rent/Sale Label -->
      <div class="property-label">
        FOR {{ property.status === 'for-rent' ? 'RENT' : 'SALE' }}
      </div>
      
      <!-- Property Title and Size -->
      <h3 class="property-title">
        {{ property.title || `${property.property_type} | ${property.square_feet} sq.ft` }}
      </h3>
      
      <!-- Property Location -->
      <p class="property-location">
        {{ property.address }}, {{ property.city }}
      </p>
      
      <!-- Property Price -->
      <div class="property-price">
        ${{ formatPrice(property.price) }}
        <span v-if="property.status === 'for-rent'" class="price-period">/month</span>
      </div>
      
      <!-- Property Features -->
      <div class="property-features">
        <div class="feature">
          <span class="feature-value">{{ property.bedrooms }}</span>
          <i class="fi-bed"></i>
        </div>
        <div class="feature">
          <span class="feature-value">{{ property.bathrooms }}</span>
          <i class="fi-bath"></i>
        </div>
        <div class="feature">
          <span class="feature-value">{{ property.square_feet }}</span>
          <i class="fi-ruler"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/auth';

const props = defineProps({
  property: {
    type: Object,
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

// Toggle favorite status
const toggleFavorite = (event) => {
  event.preventDefault();
  event.stopPropagation();
  
  // If user is not logged in, redirect to login
  if (!authStore.isAuthenticated) {
    localStorage.setItem('authRedirect', router.currentRoute.value.fullPath);
    router.push('/auth/login');
    return;
  }
  
  // Toggle favorite state
  isFavorite.value = !isFavorite.value;
  
  // Emit event to parent
  emit('favorite-changed', {
    propertyId: props.property.id,
    isFavorite: isFavorite.value
  });
};

// Navigate to property detail page - asegurándose de usar el ID correcto
const goToPropertyDetail = () => {
  console.log("Navegando a propiedad con ID:", props.property.id);
  router.push(`/properties/${props.property.id}`);
};

// Format price with commas
const formatPrice = (price) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<style scoped>
.property-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.property-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.property-card:hover .property-image {
  transform: scale(1.05);
}

.badge-container {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 500;
  border-radius: 4px;
  text-transform: uppercase;
}

.verified {
  background-color: #28a745;
  color: white;
}

.new {
  background-color: #007bff;
  color: white;
}

.featured {
  background-color: #dc3545;
  color: white;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.fi-heart {
  color: #aaa;
  font-size: 16px;
}

.fi-heart.is-favorite {
  color: #ff3b30;
}

.property-details {
  padding: 16px;
}

.property-label {
  font-size: 11px;
  color: #ff5a5f;
  margin-bottom: 8px;
  font-weight: 500;
}

.property-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.property-location {
  font-size: 13px;
  color: #777;
  margin-bottom: 10px;
}

.property-price {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.price-period {
  font-size: 14px;
  font-weight: 400;
  color: #777;
}

.property-features {
  display: flex;
  gap: 15px;
  font-size: 13px;
  color: #777;
}

.feature {
  display: flex;
  align-items: center;
  gap: 5px;
}

.feature-value {
  font-weight: 500;
}
</style>