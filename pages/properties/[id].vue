<template>
  <div class="container mx-auto px-4 py-8 bg-white property-page">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[600px]">
      <p class="text-xl text-gray-700">Loading property details...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="flex justify-center items-center min-h-[600px]">
      <p class="text-xl text-red-600">{{ error }}</p>
    </div>

    <!-- Content when data is loaded -->
    <div v-else-if="property">
      <!-- Breadcrumb -->
      <BreadcrumbNav :property="property" />

      <!-- Main content layout -->
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Left column - Images & Main Info -->
        <div class="md:w-2/3">
          <!-- Main image with gallery -->
          <div class="relative rounded-lg overflow-hidden mb-2">
            <!-- Main property image -->
            <img 
              :src="propertyImages[activeImageIndex]"
              :alt="property.title" 
              class="w-full h-[400px] object-cover"
            />
            
            <!-- Navigation arrows -->
            <button @click="goToPrevImage" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              <span class="text-gray-700">←</span>
            </button>
            
            <button @click="goToNextImage" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              <span class="text-gray-700">→</span>
            </button>
          </div>
          
          <!-- Thumbnails -->
          <div class="flex overflow-x-auto gap-2 mb-6">
            <div
              v-for="(image, index) in propertyImages"
              :key="index"
              @click="setActiveImage(index)"
              class="w-20 h-20 flex-shrink-0 cursor-pointer rounded overflow-hidden"
              :class="{'border-2 border-blue-500': index === activeImageIndex, 'border border-gray-200': index !== activeImageIndex}"
            >
              <img :src="image" :alt="'Thumbnail ' + (index + 1)" class="w-full h-full object-cover" />
            </div>
            <div class="w-20 h-20 flex-shrink-0 cursor-pointer rounded overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
              <div class="flex flex-col items-center">
                <span class="text-gray-700 text-lg">▶</span>
                <span class="text-gray-700 text-xs mt-1">Play video</span>
              </div>
            </div>
          </div>
          
          <!-- Property Main Info Component -->
          <PropertyMainInfo :property="property" />
          
          <!-- Reviews Section -->
          <div class="mt-6 mb-8">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-bold text-black">
                <i class="fi-star-filled mr-2 text-yellow-400"></i>
                {{ averageRating }} ({{ reviews.length }} reviews)
              </h2>
              <button @click="openReviewModal" class="btn-primary text-white bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded">
                <i class="fi-edit mr-1"></i>Add review
              </button>
            </div>
            
            <!-- Individual reviews -->
            <div v-for="(review, index) in reviews" :key="index" class="mb-4 pb-4 border-bottom border-b">
              <div class="flex justify-between mb-3">
                <div class="flex items-center">
                  <img class="rounded-full mr-3" :src="review.avatar" width="48" height="48" alt="Reviewer avatar" />
                  <div>
                    <h5 class="font-semibold mb-1">{{ review.name }}</h5>
                    <div class="flex text-yellow-400">
                      <span v-for="i in 5" :key="i" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                    </div>
                  </div>
                </div>
                <span class="text-gray-500 text-sm">{{ review.date }}</span>
              </div>
              <p class="text-gray-700 mb-3">{{ review.text }}</p>
              <div class="flex items-center">
                <button class="like-button flex items-center text-gray-500">
                  <i class="fi-like mr-1"></i>
                  <span>({{ review.likes }})</span>
                </button>
                <div class="border-end mx-2 h-4 border-l"></div>
                <button class="dislike-button flex items-center text-gray-500">
                  <i class="fi-dislike mr-1"></i>
                  <span>({{ review.dislikes }})</span>
                </button>
              </div>
            </div>
            
            <!-- Pagination for reviews -->
            <div class="flex justify-center mt-4" v-if="reviews.length > 4">
              <nav class="inline-flex rounded-md shadow-sm" aria-label="Reviews Pagination">
                <a href="#" class="px-3 py-2 border border-gray-300 bg-white rounded-l-md text-sm">Previous</a>
                <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-blue-800 text-white text-sm">1</a>
                <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm">2</a>
                <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm">...</a>
                <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm">5</a>
                <a href="#" class="px-3 py-2 border border-gray-300bg-white rounded-r-md text-sm">Next</a>
              </nav>
            </div>
          </div>
        </div>

        <!-- Right column - Property Details Sidebar -->
        <div class="md:w-1/3">
          <!-- Badges y Botones -->
          <div class="flex items-center mb-4">
            <span class="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium mr-2">Verified</span>
            <span v-if="property.isNew" class="bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium mr-2">New</span>
            
            <!-- Favorite & Share buttons -->
            <button @click="toggleFavorite" class="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm ml-2">
              <span :class="{'text-red-500': isFavorite, 'text-gray-600': !isFavorite}">♥</span>
            </button>
            <button class="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm ml-2">
              <span class="text-gray-600">↗</span>
            </button>
          </div>
          
          <!-- Monthly rent or Price -->
          <div class="mb-6">
            <h2 class="rent-title text-xl font-bold text-black mb-2">
              {{ property.status === 'for-rent' ? 'Monthly rent:' : 'Price:' }}
            </h2>
            <p class="rent-price text-3xl font-bold text-black">
              ${{ formatPrice(property.price) }} 
              <span v-if="property.status === 'for-rent'" class="text-base font-normal text-gray-700">/month</span>
            </p>
          </div>
          
          <!-- Property Details Card -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="details-title text-xl font-bold text-black mb-4">Property Details</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-700">Type:</span>
                <span class="font-medium text-gray-800">{{ property.property_type || 'apartment' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Area:</span>
                <span class="font-medium text-gray-800">{{ property.square_feet }} sq.m</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Built:</span>
                <span class="font-medium text-gray-800">{{ property.yearBuilt || '2015' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Bedrooms:</span>
                <span class="font-medium text-gray-800">{{ property.bedrooms }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Bathrooms:</span>
                <span class="font-medium text-gray-800">{{ property.bathrooms }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Parking places:</span>
                <span class="font-medium text-gray-800">{{ property.parkingSpaces || '2' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Pets allowed:</span>
                <span class="font-medium text-gray-800">{{ property.petsAllowed || 'cats only' }}</span>
              </div>
            </div>
          </div>
          
          <!-- Book a viewing/Contact button -->
          <button class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded mb-4 transition">
            {{ property.status === 'for-rent' ? 'Book a viewing' : 'Contact agent' }}
          </button>
          
          <!-- FAQ link -->
          <a href="#" class="flex items-center justify-center text-red-500 hover:text-red-600 mb-6">
            <span class="mr-2">?</span>
            Frequently asked questions
          </a>
          
          <!-- Amenities -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="amenities-title text-xl font-bold text-black mb-4">Amenities</h3>
            <div class="grid grid-cols-2 gap-y-3">
              <div v-for="(amenity, index) in property.amenities || defaultAmenities" :key="index" class="flex items-center">
                <span class="mr-2 text-gray-600">✓</span>
                <span class="text-gray-700">{{ amenity }}</span>
              </div>
            </div>
            <button v-if="(property.amenities?.length || defaultAmenities.length) > 8" class="text-red-500 mt-3">
              Show more
            </button>
          </div>
          
          <!-- Not included -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="not-included-title text-xl font-bold text-black mb-4">Not included {{ property.status === 'for-rent' ? 'in rent' : 'in price' }}</h3>
            <div class="grid grid-cols-2 gap-y-3">
              <div v-for="(item, index) in notIncludedItems" :key="index" class="flex items-center">
                <span class="mr-2 text-gray-600">✓</span>
                <span class="text-gray-700">{{ item }}</span>
              </div>
            </div>
          </div>
          
          <!-- Map Location -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="location-title text-xl font-bold text-black mb-4">Location</h3>
            <div class="relative mb-3">
              <img :src="getMapImage(property)" alt="Map" class="w-full h-[200px] object-cover rounded-md">
              <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                <a :href="getGoogleMapsUrl(property)" target="_blank" class="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get directions
                </a>
              </div>
            </div>
            <p class="text-center text-gray-700 text-sm mt-2">
              {{ property.address }}, {{ property.city }}, {{ property.state }} {{ property.zip_code }}
            </p>
          </div>
          
          <!-- Publication details -->
          <div class="flex flex-wrap text-sm text-gray-700">
            <div class="mr-4 pr-4 border-r border-gray-200">Published: <b class="text-gray-800">{{ formatDate(property.createdAt) }}</b></div>
            <div class="mr-4 pr-4 border-r border-gray-200">Ad number: <b class="text-gray-800">{{ property.id || '681013232' }}</b></div>
            <div>Views: <b class="text-gray-800">48</b></div>
          </div>
        </div>
      </div>
      
      <!-- Recently Viewed Section - Con propiedades en renta Y venta -->
      <div class="mt-10">
        <div class="flex justify-between items-center mb-6">
          <h2 class="recently-viewed-title text-2xl font-bold text-black">Recently viewed</h2>
          <a href="/properties" class="text-blue-600 flex items-center">
            View all <span class="ml-1">→</span>
          </a>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(listing, i) in recentlyViewed" :key="i" @click="navigateToProperty(listing.id)" class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300 cursor-pointer">
            <div class="relative">
              <img :src="listing.image || 'https://placehold.co/600x400?text=Property'" alt="Property" class="w-full h-48 object-cover" />
              <div class="absolute top-3 left-3">
                <span class="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Verified</span>
                <span v-if="listing.isNew" class="bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">New</span>
                <span v-if="listing.isFeatured" class="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded block">Featured</span>
              </div>
            </div>
            
            <div class="p-4">
              <div class="text-sm font-medium uppercase mb-1" :class="listing.status === 'for-rent' ? 'text-orange-500' : 'text-green-500'">
                {{ listing.status === 'for-sale' ? 'FOR SALE' : 'FOR RENT' }}
              </div>
              <h3 class="font-medium text-black mb-1">
                {{ listing.title }} | {{ listing.square_feet }} sq.m
              </h3>
              <p class="text-sm text-gray-700 mb-2">{{ listing.address }}</p>
              <div class="font-bold text-black mb-2">
                ${{ formatPrice(listing.price) }}
                <span v-if="listing.status === 'for-rent'" class="text-sm font-normal text-gray-700">/month</span>
              </div>
              <div class="flex justify-between text-sm text-gray-700">
                <span>{{ listing.bedrooms }} bed</span>
                <span>{{ listing.bathrooms }} bath</span>
                <span>{{ listing.parkingSpaces || '2' }} car</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Review Modal (Hidden by default) -->
      <div v-if="showReviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg w-full max-w-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold">Leave a Review</h3>
            <button @click="showReviewModal = false" class="text-gray-500 hover:text-gray-700">
              <span class="text-2xl">&times;</span>
            </button>
          </div>
          <form @submit.prevent="submitReview">
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Name <span class="text-red-500">*</span></label>
              <input type="text" v-model="newReview.name" class="w-full px-3 py-2 border rounded-md" required>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Email <span class="text-red-500">*</span></label>
              <input type="email" v-model="newReview.email" class="w-full px-3 py-2 border rounded-md" required>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Rating <span class="text-red-500">*</span></label>
              <div class="flex space-x-1">
                <button 
                  type="button"
                  v-for="star in 5"
                  :key="star"
                  @click="newReview.rating = star"
                  class="text-2xl focus:outline-none"
                  :class="newReview.rating >= star ? 'text-yellow-400' : 'text-gray-300'"
                >
                  ★
                </button>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Review <span class="text-red-500">*</span></label>
              <textarea v-model="newReview.text" rows="4" class="w-full px-3 py-2 border rounded-md" required></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-800 text-white font-medium py-2 px-4 rounded">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Not found state -->
    <div v-else class="flex justify-center items-center min-h-[600px]">
      <p class="text-xl text-gray-700">Property not found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePropertyStore } from '~/store/property';
import { useReviewStore } from '~/store/review';
import BreadcrumbNav from '~/components/BreadcrumbNav.vue';
import PropertyMainInfo from '~/components/PropertyMainInfo.vue';

// Initialize stores and router
const route = useRoute();
const router = useRouter();
const propertyStore = usePropertyStore();
const reviewStore = useReviewStore();
const propertyId = route.params.id;

// State variables
const isLoading = ref(true);
const error = ref(null);
const property = ref(null);
const isFavorite = ref(false);
const activeImageIndex = ref(0);
const showReviewModal = ref(false);

// New review form data
const newReview = ref({
  name: '',
  email: '',
  rating: 0,
  text: '',
  date: '',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  likes: 0,
  dislikes: 0
});

// Default values
const defaultAmenities = [
  'WiFi',
  'Heating',
  'Dishwasher',
  'Parking place',
  'Air conditioning',
  'Iron',
  'TV',
  'Laundry'
];

const notIncludedItems = [
  'Swimming pool',
  'Restaurant',
  'Spa lounge',
  'Bar'
];

// Reviews for this property
const reviews = computed(() => {
  return reviewStore.getReviewsForProperty(parseInt(propertyId));
});

// Calculate average rating
const averageRating = computed(() => {
  if (reviews.value.length === 0) return '0.0';
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0);
  return (sum / reviews.value.length).toFixed(1);
});

// Generar imágenes adicionales para cada propiedad
const getAdditionalImages = (propertyId, mainImage) => {
  // Base de imágenes según tipo de propiedad (usando el ID para determinar variedad)
  const propertyTypes = ['apartment', 'house', 'modern', 'luxury', 'villa'];
  const propertyType = propertyTypes[propertyId % propertyTypes.length];
  
  // Usaremos una mezcla de imágenes reales y placeholders
  const realImages = [
    mainImage,
    `https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80`, // Living room
    `https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80`, // Kitchen
    `https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80`, // Bedroom
    `https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80`, // Bathroom
    `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80`  // Exterior
  ];
  
  // Seleccionar un conjunto aleatorio pero determinístico de imágenes
  return [
    realImages[0], // Siempre incluir la imagen principal
    realImages[(propertyId % 5) + 1],
    realImages[((propertyId + 2) % 5) + 1],
    realImages[((propertyId + 4) % 5) + 1]
  ];
};

// Computed property for property images
const propertyImages = computed(() => {
  if (!property.value || !property.value.image) {
    return [
      'https://placehold.co/800x600?text=Property+Image+1',
      'https://placehold.co/800x600?text=Property+Image+2',
      'https://placehold.co/800x600?text=Property+Image+3',
      'https://placehold.co/800x600?text=Property+Image+4'
    ];
  }
  
  // Usar imágenes adicionales generadas dinámicamente
  return getAdditionalImages(property.value.id, property.value.image);
});

// Get map image based on property address
const getMapImage = (property) => {
  // En un entorno real, aquí podrías usar Google Maps Static API o similar
  return `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
    property.address + ', ' + property.city + ', ' + property.state
  )}&zoom=15&size=800x400&maptype=roadmap&markers=color:red%7C${encodeURIComponent(
    property.address + ', ' + property.city + ', ' + property.state
  )}&key=AIzaSyAepal9ym-eTRFBXfJ-URnDWn7HWmOuJIc`;
  
  // Como fallback, usar una imagen estática de mapa
  // return "https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?w=800&q=80";
};

// Get Google Maps URL for directions
const getGoogleMapsUrl = (property) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    property.address + ', ' + property.city + ', ' + property.state + ' ' + property.zip_code
  )}`;
};

// Recently viewed properties - asegurando una mezcla de alquiler y venta
const recentlyViewed = ref([]);

// Load recently viewed properties (mezclando propiedades en renta y venta)
const loadRecentlyViewed = () => {
  // En un sistema real, esto vendría del backend o del historial local
  let allProperties = [...propertyStore.properties];
  
  // Asegurarnos de que hay propiedades de ambos tipos
  const rentProperties = allProperties.filter(p => p.status === 'for-rent');
  const saleProperties = allProperties.filter(p => p.status === 'for-sale');
  
  // Si no hay propiedades en venta, mostrar un error en consola
  if (saleProperties.length === 0) {
    console.error("No hay propiedades en venta para mostrar en 'Recently viewed'");
  }
  
  // Filtramos para excluir la propiedad actual
  const currentPropertyId = parseInt(propertyId);
  
  // Tomar hasta 2 propiedades en renta (diferentes a la actual)
  const filteredRentProperties = rentProperties
    .filter(p => p.id !== currentPropertyId)
    .slice(0, 2);
    
  // Tomar hasta 2 propiedades en venta (diferentes a la actual)
  const filteredSaleProperties = saleProperties
    .filter(p => p.id !== currentPropertyId)
    .slice(0, 2);
  
  // Combinar y limitar a 4 propiedades
  recentlyViewed.value = [...filteredRentProperties, ...filteredSaleProperties].slice(0, 4);
};

// Fetch property data
const fetchPropertyData = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Usar el store para cargar la propiedad específica
    await propertyStore.fetchProperty(propertyId);
    
    // Verificar si se obtuvo la propiedad
    if (propertyStore.currentProperty) {
      property.value = propertyStore.currentProperty;
      
      // Verificar si está en favoritos
      isFavorite.value = propertyStore.favorites.includes(parseInt(propertyId));
      
      // Cargar propiedades recientes
      loadRecentlyViewed();
    } else {
      error.value = 'Property not found';
    }
  } catch (err) {
    console.error('Error loading property:', err);
    error.value = propertyStore.error || 'Failed to load property. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

// Image gallery functions
const goToPrevImage = () => {
  if (activeImageIndex.value === 0) {
    activeImageIndex.value = propertyImages.value.length - 1;
  } else {
    activeImageIndex.value--;
  }
};

const goToNextImage = () => {
  if (activeImageIndex.value === propertyImages.value.length - 1) {
    activeImageIndex.value = 0;
  } else {
    activeImageIndex.value++;
  }
};

const setActiveImage = (index) => {
  activeImageIndex.value = index;
};

// Toggle favorite status
const toggleFavorite = () => {
  if (property.value) {
    propertyStore.toggleFavorite(property.value.id);
    isFavorite.value = propertyStore.favorites.includes(property.value.id);
  }
};

// Format price with commas
const formatPrice = (price) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "Dec 9, 2020";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (err) {
    return "Dec 9, 2020";
  }
};

// Navigate to another property
const navigateToProperty = (id) => {
  console.log("Navegando a propiedad desde recently viewed:", id);
  
  // Si estamos en la misma ruta pero con diferente ID, forzar recarga
  if (route.name === route.name && route.params.id !== id.toString()) {
    router.replace(`/properties/${id}`);
    setTimeout(() => {
      fetchPropertyData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  } else {
    router.push(`/properties/${id}`);
  }
};

// Navegar al perfil del agente
const viewAgentProfile = () => {
  // Redirigir a la página del perfil del agente
  router.push('/agents');
};

// Review functions
const openReviewModal = () => {
  showReviewModal.value = true;
};

const submitReview = () => {
  const today = new Date();
  
  // Create the review object
  const review = {
    propertyId: parseInt(propertyId),
    name: newReview.value.name,
    email: newReview.value.email,
    rating: newReview.value.rating,
    text: newReview.value.text,
    date: today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    avatar: newReview.value.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
    likes: 0,
    dislikes: 0
  };
  
  // Add review to store
  reviewStore.addReview(review);
  
  // Reset form
  newReview.value = {
    name: '',
    email: '',
    rating: 0,
    text: '',
    date: '',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    likes: 0,
    dislikes: 0
  };
  
  // Close modal
  showReviewModal.value = false;
};

// Watch for changes in the property ID (for navigation between properties)
watch(() => route.params.id, (newId, oldId) => {
  if (newId !== oldId) {
    propertyId = newId;
    fetchPropertyData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Apply color fixes for consistent styling
const applyColorFixes = () => {
  setTimeout(() => {
    document.querySelectorAll('.property-title, .rent-title, .details-title, .amenities-title, .not-included-title, .section-title, .recently-viewed-title, .location-title')
      .forEach(el => {
        el.style.color = '#000000';
      });
    
    document.querySelectorAll('p, span, div:not(.bg-green-500):not(.bg-blue-500):not(.bg-red-500)')
      .forEach(el => {
        if (!el.closest('.bg-green-500') && !el.closest('.bg-blue-500') && !el.closest('.bg-red-500') && 
            !el.classList.contains('text-white')) {
          el.style.color = '#333333';
        }
      });
  }, 100);
};

// Fetch data when component mounts
onMounted(async () => {
  // Si es necesario, asegúrate de que el propertyStore tenga propiedades cargadas
  if (propertyStore.properties.length === 0) {
    await propertyStore.fetchProperties();
  }
  
  // Cargar los datos de la propiedad específica
  await fetchPropertyData();
  
  // Aplicar correcciones de color si es necesario
  applyColorFixes();
});
</script>

<style>
/* Ensure white background */
body, html {
  background-color: #ffffff !important;
}

/* Forzar colores de texto en elementos clave */
.property-page h1, 
.property-page h2, 
.property-page h3, 
.property-page h4, 
.property-page h5, 
.property-page h6 {
  color: #000000 !important;
}

.property-page p, 
.property-page span:not(.bg-green-500 span):not(.bg-blue-500 span):not(.bg-red-500 span):not(.text-white), 
.property-page div:not(.bg-green-500):not(.bg-blue-500):not(.bg-red-500) {
  color: #333333;
}

/* Específico para clases de títulos */
.property-title, 
.rent-title, 
.details-title, 
.amenities-title, 
.not-included-title, 
.section-title, 
.recently-viewed-title,
.location-title {
  color: #000000 !important;
}

/* Color naranja para "FOR RENT" */
.text-orange-500 {
  color: #F97316 !important;
}

/* Color verde brillante para "FOR SALE" */
.text-green-500 {
  color: #10b981 !important;
}

/* Excepciones para texto blanco en elementos con fondo de color */
.bg-green-500, 
.bg-blue-500, 
.bg-red-500, 
.text-white, 
button.bg-red-500 {
  color: #ffffff !important;
}

/* Gallery */
.thumbnail:hover {
  border-color: #0d6efd;
}

/* Buttons */
button.rounded-full {
  transition: all 0.2s ease;
}

button.rounded-full:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
}

/* Call to action */
.bg-red-500 {
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.bg-red-500:hover {
  background-color: #e53e3e;
  transform: translateY(-2px);
}

/* Cards hover effect */
.rounded-lg.shadow-sm {
  transition: all 0.3s ease;
}

.rounded-lg.shadow-sm:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Review styling */
.like-button, .dislike-button {
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.like-button:hover {
  color: #3b82f6;
}

.dislike-button:hover {
  color: #ef4444;
}

.btn-primary {
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
}
</style>
