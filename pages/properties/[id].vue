<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
  <div class="container mx-auto px-4 py-8 bg-white property-page pt-20">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[600px]">
      <div class="spinner border-4 border-gray-200 border-t-orange-800 rounded-full w-10 h-10 animate-spin"></div>
      <p class="text-xl text-black ml-4">Cargando detalles de la propiedad...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="flex flex-col justify-center items-center min-h-[600px]">
      <p class="text-xl text-red-600 mb-4">{{ error }}</p>
      <button @click="fetchPropertyData" class="bg-orange-800 text-white py-2 px-4 rounded hover:bg-orange-900">
        Intentar de nuevo
      </button>
    </div>

    <!-- Contenido cuando los datos están cargados -->
    <div v-else-if="property">
      <!-- Breadcrumb -->
      <div class="breadcrumb flex items-center mb-4 text-sm">
        <a href="/" class="text-black hover:text-orange-800">Inicio</a>
        <span class="mx-2 text-black">›</span>
        <a :href="property.status === 'for-rent' ? '/properties/rent' : '/properties/sale'" class="text-black hover:text-orange-800">
          {{ property.status === 'for-rent' ? 'Propiedades en alquiler' : 'Propiedades en venta' }}
        </a>
        <span class="mx-2 text-black">›</span>
        <span class="text-black">{{ property.title }}</span>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <!-- Columna izquierda - Imágenes e información principal -->
        <div class="md:w-2/3">
          <!-- Imagen principal con galería -->
          <div class="relative rounded-lg overflow-hidden mb-4">
            <!-- Imagen principal de la propiedad -->
            <img 
              :src="propertyImages[activeImageIndex]"
              :alt="property.title" 
              class="w-full h-[400px] object-cover"
            />
            
            <!-- Flechas de navegación -->
            <button @click="goToPrevImage" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              <span class="material-icons text-gray-700">arrow_back</span>
            </button>
            
            <button @click="goToNextImage" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              <span class="material-icons text-gray-700">arrow_forward</span>
            </button>
          </div>
          
          <!-- Miniaturas de imágenes debajo de la imagen principal -->
          <div class="flex overflow-x-auto gap-2 mb-6">
            <div
              v-for="(image, index) in propertyImages"
              :key="index"
              @click="setActiveImage(index)"
              class="w-20 h-20 flex-shrink-0 cursor-pointer rounded overflow-hidden"
              :class="{'border-2 border-orange-800': index === activeImageIndex, 'border border-gray-200': index !== activeImageIndex}"
            >
              <img :src="image" :alt="'Miniatura ' + (index + 1)" class="w-full h-full object-cover" />
            </div>
          </div>
          
          <!-- Título y dirección DESPUÉS de las imágenes, como en la referencia -->
          <h1 class="text-3xl font-bold text-black mb-4">{{ property.title }}</h1>
          
          <div class="flex items-center text-black mb-6">
            <span class="material-icons mr-2">place</span>
            <p>{{ property.address }}, {{ property.city }}, {{ property.state }} {{ property.zip_code }}</p>
          </div>
          
          <!-- Características principales -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="flex items-center">
              <span class="material-icons text-black mr-2">hotel</span>
              <span class="text-black">{{ property.bedrooms }} Habitaciones</span>
            </div>
            <div class="flex items-center">
              <span class="material-icons text-black mr-2">bathtub</span>
              <span class="text-black">{{ property.bathrooms }} Baños</span>
            </div>
            <div class="flex items-center">
              <span class="material-icons text-black mr-2">straighten</span>
              <span class="text-black">{{ property.square_feet }} m²</span>
            </div>
          </div>
          
          <!-- Descripción de la propiedad -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-black mb-3">Descripción</h2>
            <p class="text-black whitespace-pre-line">{{ property.description }}</p>
          </div>

          <!-- Sección de anfitrión corregida -->
<div class="rental-agent bg-white rounded-lg shadow-sm overflow-hidden mb-8">
  <div class="p-6">
    <div class="flex flex-col md:flex-row items-start">
      <div class="w-full md:w-1/3">
        <img 
          :src="getHostImage()" 
          alt="Host Avatar" 
          class="w-full h-auto rounded"
        />
      </div>
      
      <div class="w-full md:w-2/3 md:pl-6 mt-4 md:mt-0">
        <div class="text-orange-500 float-right">
          <span class="text-2xl">"</span>
        </div>
        
        <!-- Mostrar biografía real cuando está disponible -->
        <p class="text-black mb-4" v-if="property.host_bio || (hostData && hostData.bio)">
          {{ property.host_bio || (hostData && hostData.bio) }}
        </p>
        <p class="text-black mb-4" v-else>
          {{ hostName }} es un anfitrión con experiencia en el sector inmobiliario. Consulta sus propiedades disponibles.
        </p>
        
        <h3 class="text-xl font-semibold mb-1">
          <a href="#" @click.prevent="viewHostProperties()" class="text-orange-800 hover:text-orange-900">
            {{ hostName }}
          </a>
        </h3>
        
        <p class="text-black mb-2">{{ hostRole }}</p>
        
        <!-- Sección de estrellas mejorada para mostrar medias estrellas -->
<div class="flex items-center mb-4">
  <div class="flex">
    <!-- Iteramos 5 veces para las 5 estrellas -->
    <template v-for="i in 5" :key="i">
      <!-- Estrella completa si el rating es al menos i -->
      <span v-if="hostRating >= i" class="material-icons text-sm text-yellow-400">star</span>
      
      <!-- Media estrella si el rating está entre i-0.75 e i-0.25 -->
      <span v-else-if="hostRating > i-0.75 && hostRating < i-0.25" class="material-icons text-sm text-yellow-400">star_half</span>
      
      <!-- Estrella vacía en otros casos -->
      <span v-else class="material-icons text-sm text-gray-300">star</span>
    </template>
  </div>
  <span class="text-black ml-2">{{ hostReviews }} reseñas</span>
</div>
        
        <div class="flex items-center text-sm text-black mb-3">
          <span class="material-icons text-orange-800 mr-1">home</span>
          <span>{{ hostProperties.length || property.host_properties_count || 0 }} propiedades</span>
        </div>
        
        <!-- Corrección enlaces de redes sociales -->
        <div class="flex space-x-3 mt-2" v-if="hasSocialLinks">
          <a v-if="getSocialLink('facebook')" :href="`https://${getSocialLink('facebook')}`" target="_blank" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a v-if="getSocialLink('twitter')" :href="`https://${getSocialLink('twitter')}`" target="_blank" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300">
            <i class="fab fa-twitter"></i>
          </a>
          <a v-if="getSocialLink('instagram')" :href="`https://${getSocialLink('instagram')}`" target="_blank" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300">
            <i class="fab fa-instagram"></i>
          </a>
          <a v-if="getSocialLink('linkedin')" :href="`https://${getSocialLink('linkedin')}`" target="_blank" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a v-if="getSocialLink('pinterest')" :href="`https://${getSocialLink('pinterest')}`" target="_blank" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-300">
            <i class="fab fa-pinterest-p"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
          
          <!-- Sección de reseñas -->
          <div class="reviews-section mt-8">
            <div class="flex items-center mb-4">
  <span class="text-yellow-400 material-icons mr-2">star</span>
  <span class="text-2xl font-bold text-black">{{ averageRating }} ({{ reviews.length }} reseñas)</span>
  <div class="ml-auto">
    <button @click="openReviewModal" class="bg-orange-800 hover:bg-orange-900 text-white py-2 px-4 rounded flex items-center">
      <span class="material-icons mr-1 text-white">edit</span>
      <span class="text-white">Añadir reseña</span>
    </button>
  </div>
</div>
            
            <div class="flex justify-between items-center mb-4">
              <div class="text-black">
                <span class="font-medium">Ordenar por:</span>
                <select v-model="sortOption" class="ml-2 p-2 border rounded text-black">
                  <option value="newest">Más recientes</option>
                  <option value="oldest">Más antiguas</option>
                  <option value="highest">Mayor calificación</option>
                  <option value="lowest">Menor calificación</option>
                </select>
              </div>
            </div>

            <!-- Estado de carga -->
            <div v-if="loadingReviews" class="flex justify-center py-4">
              <div class="spinner border-4 border-gray-200 border-t-orange-800 rounded-full w-8 h-8 animate-spin"></div>
            </div>
            
            <!-- Mensaje sin reseñas -->
            <div v-else-if="reviews.length === 0" class="text-center py-8">
              <p class="text-black mb-4">No hay reseñas disponibles para esta propiedad.</p>
              <button 
                @click="openReviewModal" 
                class="bg-orange-800 hover:bg-orange-900 text-white py-2 px-4 rounded"
              >
                <span class="material-icons align-middle mr-1">edit</span>Sé el primero en dejar una reseña
              </button>
            </div>
            
            <!-- Lista de reseñas -->
            <div v-else class="space-y-6">
              <div v-for="(review, index) in sortedReviews" :key="index" class="border-b border-gray-200 pb-6 mb-6 last:border-0">
                <div class="flex items-start">
                  <div class="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img :src="getReviewerAvatar(review)" :alt="review.reviewer_name" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between items-center mb-2">
                      <h3 class="text-lg font-medium text-black">{{ review.reviewer_name }}</h3>
                      <span class="text-black">{{ formatDate(review.created_at) }}</span>
                    </div>
                    <div class="flex items-center mb-3">
                      <div class="flex text-yellow-400">
                        <span v-for="i in 5" :key="i" class="material-icons text-sm" 
                              :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'">star</span>
                      </div>
                    </div>
                    <p class="text-black mb-3">{{ review.comment }}</p>
                    <div class="flex items-center">
                      <button @click="handleLikeReview(review)" class="flex items-center text-black hover:text-orange-800 mr-4">
                        <span class="material-icons mr-1 text-sm">thumb_up</span>
                        <span>({{ review.likes || 0 }})</span>
                      </button>
                      <button @click="handleDislikeReview(review)" class="flex items-center text-black hover:text-red-500">
                        <span class="material-icons mr-1 text-sm">thumb_down</span>
                        <span>({{ review.dislikes || 0 }})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Paginación -->
            <div class="flex justify-center mt-6" v-if="reviews.length > reviewsPerPage">
              <div class="flex">
                <button 
                  @click="currentPage > 1 && (currentPage--)"
                  :disabled="currentPage === 1"
                  class="mx-1 px-3 py-1 rounded"
                  :class="currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-orange-800 text-white hover:bg-orange-900'"
                >
                  Anterior
                </button>
                
                <button 
                  v-for="page in totalPages" 
                  :key="page" 
                  @click="currentPage = page"
                  class="mx-1 px-3 py-1 rounded"
                  :class="currentPage === page ? 'bg-orange-900 text-white' : 'bg-orange-800 text-white hover:bg-orange-900'"
                >
                  {{ page }}
                </button>
                
                <button 
                  @click="currentPage < totalPages && (currentPage++)"
                  :disabled="currentPage === totalPages"
                  class="mx-1 px-3 py-1 rounded"
                  :class="currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-orange-800 text-white hover:bg-orange-900'"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna derecha - Barra lateral de detalles de la propiedad -->
        <div class="md:w-1/3">
          <!-- Insignias y Botones -->
          <div class="flex items-center mb-4">
            <span v-if="property.isVerified" class="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium mr-2">Verificado</span>
            <span v-if="property.isNew" class="bg-orange-800 text-white px-2 py-1 rounded text-sm font-medium mr-2">Nuevo</span>
            <span v-if="property.isFeatured" class="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium mr-2">Destacado</span>
            
            <!-- Botones de favorito y compartir -->
            <button @click="toggleFavorite" class="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm ml-2">
              <span class="material-icons" :class="isFavorite ? 'text-red-500' : 'text-gray-600'">favorite</span>
            </button>
            <button @click="shareProperty" class="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm ml-2">
              <span class="material-icons text-gray-600">share</span>
            </button>
          </div>
          
          <!-- Precio mensual o precio de venta -->
          <div class="mb-6">
            <h2 class="rent-title text-xl font-bold text-black mb-2">
              {{ property.status === 'for-rent' ? 'Renta mensual:' : 'Precio:' }}
            </h2>
            <p class="rent-price text-3xl font-bold text-black">
              L {{ formatPrice(property.price) }} 
              <span v-if="property.status === 'for-rent'" class="text-base font-normal text-black">/mes</span>
            </p>
          </div>
          
          <!-- Detalles de la propiedad -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="details-title text-xl font-bold text-black mb-4">Detalles de la Propiedad</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-black">Tipo:</span>
                <span class="font-medium text-black">{{ translatePropertyType(property.property_type) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-black">Área:</span>
                <span class="font-medium text-black">{{ property.square_feet }} m²</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-black">Habitaciones:</span>
                <span class="font-medium text-black">{{ property.bedrooms }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-black">Baños:</span>
                <span class="font-medium text-black">{{ property.bathrooms }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-black">Estacionamientos:</span>
                <span class="font-medium text-black">{{ property.parkingSpaces || '0' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-black">Mascotas permitidas:</span>
                <span class="font-medium text-black">{{ translatePetsAllowed(property.pets_allowed) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Botón de reserva/contacto -->
<button @click="navigateToBooking" class="w-full bg-orange-800 hover:bg-orange-900 text-white font-medium py-3 px-4 rounded mb-4 transition">
  {{ property.status === 'for-rent' ? 'Renta Ya' : 'Compra Ya' }}
</button>
          
          <!-- Enlace a FAQ -->
          <a href="#" class="flex items-center justify-center text-orange-800 hover:text-orange-900 mb-6">
            <span class="material-icons mr-2">help</span>
            Preguntas frecuentes
          </a>
          
          <!-- Comodidades -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="amenities-title text-xl font-bold text-black mb-4">Comodidades</h3>
            <div class="grid grid-cols-2 gap-y-3">
              <div v-for="(amenity, index) in property.amenities" :key="index" class="flex items-center">
                <span class="material-icons mr-2 text-orange-800">{{ getAmenityIcon(amenity) }}</span>
                <span class="text-black">{{ translateAmenity(amenity) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Ubicación en mapa -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="location-title text-xl font-bold text-black mb-4">Ubicación</h3>
            <div class="relative mb-3">
              <!-- Mapa interactivo de Leaflet -->
              <div id="propertyMap" class="w-full h-[200px] rounded-md"></div>
              
              <!-- Botón para abrir Google Maps -->
              <div class="absolute bottom-3 right-3">
                <a :href="getGoogleMapsUrl(property)" target="_blank" class="bg-orange-800 text-white py-2 px-4 rounded-md hover:bg-orange-900 transition-colors flex items-center">
                  <span class="material-icons mr-2">directions</span>
                  Cómo llegar
                </a>
              </div>
            </div>
            <!-- Dirección debajo del mapa -->
            <p class="text-center text-black text-sm mt-2">
              {{ property.address }}, {{ property.city }}, {{ property.state }} {{ property.zip_code }}
            </p>
          </div>
          
          <!-- Detalles de publicación -->
          <div class="flexflex-wrap text-sm text-black">
  <div class="mr-4 pr-4 border-r border-gray-200">Publicado: <b class="text-black">{{ formatDate(property.created_at) }}</b></div>
  <div class="mr-4 pr-4 border-r border-gray-200">Nº anuncio: <b class="text-black">{{ property.id }}</b></div>
  <div class="flex items-center">
    <span class="material-icons mr-1 text-orange-800">visibility</span>
    Vistas: <b class="text-black ml-1">{{ property.views || viewCount }}</b>
  </div>
</div>
        </div>
      </div>
      
      <!-- Sección de Propiedades Similares -->
      <div class="mt-10">
        <div class="flex justify-between items-center mb-6">
          <h2 class="similar-properties-title text-2xl font-bold text-black">Propiedades similares</h2>
          <a :href="property.status === 'for-rent' ? '/properties/rent' : '/properties/sale'" class="text-orange-800 flex items-center">
            Ver todas <span class="ml-1">→</span>
          </a>
        </div>
        
        <div v-if="isLoadingSimilar" class="flex justify-center py-8">
          <div class="spinner border-4 border-gray-200 border-t-orange-800 rounded-full w-8 h-8 animate-spin"></div>
        </div>
        
        <div v-else-if="similarProperties.length === 0" class="text-center py-8 text-black">
          No se encontraron propiedades similares.
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(listing, i) in similarProperties" :key="i" @click="navigateToProperty(listing.id)" class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300 cursor-pointer">
            <div class="relative">
              <img :src="listing.image || getRandomPropertyImage()" alt="Propiedad" class="w-full h-48 object-cover" />
              <div class="absolute top-3 left-3">
                <span v-if="listing.isVerified" class="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Verificado</span>
                <span v-if="listing.isNew" class="bg-orange-800 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Nuevo</span>
                <span v-if="listing.isFeatured" class="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded block">Destacado</span>
              </div>
            </div>
            
            <div class="p-4">
              <div class="text-sm font-medium uppercase mb-1" :class="listing.status === 'for-rent' ? 'text-orange-800' : 'text-green-500'">
                {{ listing.status === 'for-sale' ? 'EN VENTA' : 'EN RENTA' }}
              </div>
              <h3 class="font-medium text-black mb-1">
                {{ listing.title }} | {{ listing.square_feet }} m²
              </h3>
              <p class="text-sm text-black mb-2">{{ listing.address }}</p>
              <div class="font-bold text-black mb-2">
                L {{ formatPrice(listing.price) }}
                <span v-if="listing.status === 'for-rent'" class="text-sm font-normal text-black">/mes</span>
              </div>
              <div class="flex justify-between text-sm text-black">
                <span>{{ listing.bedrooms }} hab</span>
                <span>{{ listing.bathrooms }} baños</span>
                <span>{{ listing.parkingSpaces || '0' }} est</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Modal de Reseñas (Oculto por defecto) -->
      <div v-if="showReviewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg w-full max-w-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-black">Dejar una Reseña</h3>
            <button @click="showReviewModal = false" class="text-gray-500 hover:text-gray-700">
              <span class="text-2xl">&times;</span>
            </button>
          </div>
          <form @submit.prevent="submitReview">
            <div class="mb-4">
              <label class="block text-black mb-2">Nombre <span class="text-red-500">*</span></label>
              <input type="text" v-model="newReview.reviewer_name" class="w-full px-3 py-2 border rounded-md text-black" required>
            </div>
            <div class="mb-4">
              <label class="block text-black mb-2">Email <span class="text-red-500">*</span></label>
              <input type="email" v-model="newReview.email" class="w-full px-3 py-2 border rounded-md text-black" required>
            </div>
            <div class="mb-4">
              <label class="block text-black mb-2">Calificación <span class="text-red-500">*</span></label>
              <div class="flex space-x-2">
                <button 
                  type="button"
                  v-for="star in 5"
                  :key="star"
                  @click="newReview.rating = star"
                  class="text-3xl focus:outline-none"
                >
                  <span class="material-icons" :class="newReview.rating >= star ? 'text-yellow-400' : 'text-gray-300'">star</span>
                </button>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-black mb-2">Reseña <span class="text-red-500">*</span></label>
              <textarea v-model="newReview.comment" rows="4" class="w-full px-3 py-2 border rounded-md text-black" required></textarea>
            </div>
            <button 
  type="submit" 
  class="w-full bg-orange-800 text-white font-medium py-2 px-4 rounded hover:bg-orange-900"
  :disabled="submittingReview"
>
  <span v-if="submittingReview" class="text-white">Enviando...</span>
  <span v-else class="text-white">Enviar Reseña</span>
</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Estado de no encontrado -->
    <div v-else class="flex justify-center items-center min-h-[600px]">
      <p class="text-xl text-black">Propiedad no encontrada</p>
    </div>
  </div>
</template>


<script setup>
// Importaciones
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useReviewStore } from '../store/review';
import { useFavoritesStore } from '~/store/favorites';

// Definir la URL base de la API
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

// Inicializar router
const route = useRoute();
const router = useRouter();
const propertyId = route.params.id;

// Inicializar stores
const reviewStore = useReviewStore();
const favoritesStore = useFavoritesStore();

// Variables de estado
const isLoading = ref(true);
const error = ref(null);
const property = ref(null);
const similarProperties = ref([]);
const isLoadingSimilar = ref(false);
const activeImageIndex = ref(0);
const showReviewModal = ref(false);
const submittingReview = ref(false);
const reviewsPerPage = 5;
const hostName = ref('');
const hostRole = ref('');
const hostReviews = ref(0);
const hostData = ref(null);
const hostRating = ref(0);
const hostProperties = ref([]);
const loadingReviews = ref(false);
const currentPage = ref(1);
const sortOption = ref('newest');
const viewCount = ref(0);
const propertyMap = ref(null);

// Verificar si una propiedad es favorita
const isFavorite = computed(() => {
  return property.value ? favoritesStore.isFavorite(property.value.id) : false;
});

// Alternar estado de favorito
const toggleFavorite = async () => {
  if (!property.value) return;
  
  try {
    await favoritesStore.toggleFavorite(property.value);
  } catch (error) {
    console.error('Error toggling favorite:', error);
  }
};

// Datos para nuevo formulario de reseña
const newReview = ref({
  property_id: null,
  reviewer_name: '',
  email: '',
  rating: 0,
  comment: ''
});

// Obtener reseñas del store
const reviews = computed(() => {
  return reviewStore.getReviewsForProperty(propertyId);
});

// Reseñas ordenadas según el criterio seleccionado
const sortedReviews = computed(() => {
  const reviewsList = [...reviews.value];
  
  switch (sortOption.value) {
    case 'newest':
      return reviewsList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    case 'oldest':
      return reviewsList.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    case 'highest':
      return reviewsList.sort((a, b) => b.rating - a.rating);
    case 'lowest':
      return reviewsList.sort((a, b) => a.rating - b.rating);
    default:
      return reviewsList;
  }
});

// Calcular calificación promedio
const averageRating = computed(() => {
  if (!property.value || !property.value.average_rating) {
    return reviewStore.getAverageRating(propertyId).toFixed(1);
  }
  return parseFloat(property.value.average_rating).toFixed(1);
});

// Calcular total de páginas
const totalPages = computed(() => {
  return Math.ceil(reviews.value.length / reviewsPerPage);
});

// Reseñas a mostrar según paginación
const displayedReviews = computed(() => {
  const start = (currentPage.value - 1) * reviewsPerPage;
  const end = start + reviewsPerPage;
  return sortedReviews.value.slice(start, end);
});

// Obtener imagen de avatar para un revisor
const getReviewerAvatar = (review) => {
  // En producción, podrías usar un servicio como Gravatar o avatares basados en iniciales
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(review.reviewer_name)}&background=random`;
};

// Obtener imagen del anfitrión
const getHostImage = () => {
  // Si tenemos datos del anfitrión y tiene imagen
  if (hostData.value && hostData.value.profile_image) {
    return hostData.value.profile_image;
  }
  
  // Si el anfitrión tiene credenciales de usuario, usamos su imagen de perfil
  if (property.value && property.value.host_id && property.value.host_profile_image) {
    return property.value.host_profile_image;
  }
  
  // Generar avatar basado en el nombre del anfitrión
  if (hostName.value) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(hostName.value)}&background=random`;
  }
  
  // Imagen por defecto como último recurso
  return 'https://randomuser.me/api/portraits/men/68.jpg';
};

// Segunda parte: Agregar estas computed properties y funciones a la sección de script

// Propiedad computada para verificar si hay redes sociales
const hasSocialLinks = computed(() => {
  if (hostData && hostData.socialLinks) {
    return Object.values(hostData.socialLinks).some(link => !!link);
  }
  // Si la propiedad tiene datos de redes sociales directamente
  if (property.value) {
    return !!(
      property.value.host_social_facebook ||
      property.value.host_social_twitter ||
      property.value.host_social_instagram ||
      property.value.host_social_linkedin ||
      property.value.host_social_pinterest
    );
  }
  return false;
});

// Función para obtener enlaces de redes sociales
const getSocialLink = (socialNetwork) => {
  // Primero verificar si tenemos datos en hostData
  if (hostData && hostData.socialLinks && hostData.socialLinks[socialNetwork]) {
    return hostData.socialLinks[socialNetwork];
  }
  
  // Si no, verificar si tenemos datos en la propiedad
  if (property.value) {
    const propKey = `host_social_${socialNetwork}`;
    if (property.value[propKey]) {
      return property.value[propKey];
    }
  }
  
  return null;
};
// Tercera parte: La función modificada fetchHostData

// Modificar la función para obtener el token de autenticación
const getAuthToken = () => {
  if (process.client) {
    return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
  }
  return '';
};

// Verificar si el usuario está autenticado
const isAuthenticated = () => {
  return !!getAuthToken();
};

// Cargar datos del propietario
const fetchHostData = async () => {
  if (!property.value || !property.value.host_id) return;
  
  // Establecer valores por defecto de la propiedad actual
  hostName.value = property.value.host_name || 'Anfitrión';
  hostRole.value = property.value.host_role === 'agent' ? 'Agente Inmobiliario' : 'Propietario';
  
  // Si tenemos ratings o reviews en la propiedad, usarlos
  if (property.value.host_average_rating) {
    hostRating.value = parseFloat(property.value.host_average_rating);
  }
  
  if (property.value.host_review_count) {
    hostReviews.value = property.value.host_review_count;
  }
  
  // Si no estamos autenticados o no hay token, usar método alternativo
  if (!isAuthenticated()) {
    console.log('No hay token de autenticación, usando métodos alternativos');
    await fetchHostPropertiesAndReviews();
    return;
  }
  
  try {
    // Realizar la petición para obtener los datos del propietario con autenticación
    const token = getAuthToken();
    
    const response = await axios.get(`${API_URL}/users/${property.value.host_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      hostData.value = response.data.data;
      
      // Actualizar variables con datos reales
      hostName.value = `${hostData.value.first_name || ''} ${hostData.value.last_name || ''}`.trim() || hostName.value;
      hostRole.value = hostData.value.role === 'agent' ? 'Agente Inmobiliario' : 'Propietario';
      
      // Si hay datos de rating y reseñas del anfitrión (todas sus propiedades), asignarlos
      if (hostData.value.average_rating) {
        hostRating.value = parseFloat(hostData.value.average_rating);
      }
      
      if (hostData.value.total_reviews) {
        hostReviews.value = hostData.value.total_reviews;
      }
      
      // Si hay propiedades, asignarlas
      if (hostData.value.properties_list && Array.isArray(hostData.value.properties_list)) {
        hostProperties.value = hostData.value.properties_list;
      }
      
      console.log('Datos del anfitrión cargados:', hostData.value);
    }
  } catch (err) {
    console.error('Error al cargar datos del propietario:', err);
    
    // En caso de error de autenticación u otro error, intentar método alternativo
    await fetchHostPropertiesAndReviews();
  }
};

/// Cuarta parte: Función mejorada para obtener propiedades y reseñas

// Función mejorada para obtener propiedades y reseñas del anfitrión
const fetchHostPropertiesAndReviews = async () => {
  if (!property.value || !property.value.host_id) return;
  
  // Inicializar objeto hostData si no existe
  if (!hostData.value) {
    hostData.value = {
      socialLinks: {}
    };
  } else if (!hostData.value.socialLinks) {
    hostData.value.socialLinks = {};
  }
  
  // Verificar si la propiedad tiene links sociales directamente
  if (property.value.host_social_facebook) {
    hostData.value.socialLinks.facebook = property.value.host_social_facebook;
  }
  if (property.value.host_social_twitter) {
    hostData.value.socialLinks.twitter = property.value.host_social_twitter;
  }
  if (property.value.host_social_instagram) {
    hostData.value.socialLinks.instagram = property.value.host_social_instagram;
  }
  if (property.value.host_social_linkedin) {
    hostData.value.socialLinks.linkedin = property.value.host_social_linkedin;
  }
  if (property.value.host_social_pinterest) {
    hostData.value.socialLinks.pinterest = property.value.host_social_pinterest;
  }
  
  // Si ya tenemos bio del anfitrión en la propiedad, usarla
  if (property.value.host_bio) {
    hostData.value.bio = property.value.host_bio;
  }
  
  try {
    // 1. Obtener todas las propiedades del anfitrión
    const propertiesResponse = await axios.get(`${API_URL}/properties`, {
      params: { host_id: property.value.host_id, limit: 100 }
    });
    
    if (propertiesResponse.data && propertiesResponse.data.success) {
      const properties = propertiesResponse.data.data.properties;
      hostProperties.value = properties || [];
      
      // 2. Si tenemos propiedades, obtener todas las reseñas para calcular el rating
      if (properties && properties.length > 0) {
        let totalRating = 0;
        let reviewCount = 0;
        let totalReviews = 0;
        
        // Para cada propiedad, obtener sus reseñas
        for (const prop of properties) {
          try {
            const reviewsResponse = await axios.get(`${API_URL}/reviews`, {
              params: { property_id: prop.id }
            });
            
            if (reviewsResponse.data && reviewsResponse.data.success) {
              const reviews = reviewsResponse.data.data.reviews || [];
              totalReviews += reviews.length;
              
              // Sumar ratings para el promedio
              reviews.forEach(review => {
                if (review && typeof review.rating === 'number') {
                  totalRating += review.rating;
                  reviewCount++;
                }
              });
            }
          } catch (error) {
            console.warn(`Error al obtener reseñas para la propiedad ${prop.id}:`, error);
          }
        }
        
        // Actualizar contadores solo si no tenemos datos previos
        if (hostReviews.value === 0) {
          hostReviews.value = totalReviews;
        }
        
        // Calcular y actualizar promedio solo si no tenemos datos previos
        if (hostRating.value === 0 && reviewCount > 0) {
          hostRating.value = totalRating / reviewCount;
        }
        
        // Actualizar también en el objeto hostData
        hostData.value.average_rating = hostRating.value;
        hostData.value.total_reviews = hostReviews.value;
        hostData.value.properties_count = properties.length;
        
        console.log(`Anfitrión: ${totalReviews} reseñas, rating ${hostRating.value.toFixed(1)} y ${properties.length} propiedades`);
      }
    }
  } catch (error) {
    console.error('Error al obtener propiedades y reseñas del anfitrión:', error);
  }
};

// Ver otras propiedades del anfitrión
const viewHostProperties = () => {
  if (!property.value || !property.value.host_id) return;
  
  // Navegar a la página de propiedades del anfitrión
  router.push(`/host/${property.value.host_id}`);
};

// Obtener imagenes de la base de datos de Oasis
const getPropertyImage = (imageNumber) => {
  const imageNum = String(imageNumber).padStart(2, '0');
  return `https://oasiscontenedor.blob.core.windows.net/property-images/${imageNum}.jpg`;
};

const navigateToBooking = () => {
  router.push(`/bookings/${property.value.id}`);
};

// Obtener una imagen aleatoria entre 1 y 65
const getRandomPropertyImage = () => {
  const randomNum = Math.floor(Math.random() * 65) + 1;
  return getPropertyImage(randomNum);
};

// Propiedad computada para imágenes de propiedad
const propertyImages = computed(() => {
  if (!property.value) {
    return [
      getPropertyImage(1),
      getPropertyImage(2),
      getPropertyImage(3),
      getPropertyImage(4)
    ];
  }
  
  // Imágenes disponibles
  const images = [];
  
  // Si la propiedad tiene su propia imagen, la usamos como primera
  if (property.value.image) {
    images.push(property.value.image);
  }
  
  // Añadir imágenes adicionales si existen
  if (property.value.additional_images && Array.isArray(property.value.additional_images)) {
    images.push(...property.value.additional_images);
  }
  
  // Si no hay suficientes imágenes, añadir imágenes genéricas basadas en el ID
  while (images.length < 4) {
    const baseIndex = (images.length % 65) + 1; // Usar módulo para quedarnos en el rango 1-65
    images.push(getPropertyImage(baseIndex));
  }
  
  return images;
});

// Obtener imagen del mapa basada en las coordenadas de la propiedad
const getMapImage = (property) => {
  // Verificar si la propiedad tiene coordenadas
  if (property.lat && property.lng) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${property.lat},${property.lng}&zoom=15&size=800x400&maptype=roadmap&markers=color:red%7C${property.lat},${property.lng}&key=YOUR_GOOGLE_MAPS_API_KEY`;
  } else {
    // Fallback a la dirección como antes si no hay coordenadas
    return `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
      property.address + ', ' + property.city + ', ' + property.state
    )}&zoom=15&size=800x400&maptype=roadmap&markers=color:red%7C${encodeURIComponent(
      property.address + ', ' + property.city + ', ' + property.state
    )}&key=YOUR_GOOGLE_MAPS_API_KEY`;
  }
};

// Obtener URL de Google Maps para direcciones
const getGoogleMapsUrl = (property) => {
  if (property.lat && property.lng) {
    return `https://www.google.com/maps/search/?api=1&query=${property.lat},${property.lng}`;
  } else {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      property.address + ', ' + property.city + ', ' + property.state + ' ' + property.zip_code
    )}`;
  }
};

// Función para inicializar el mapa con Leaflet
const initializeMap = () => {
  // Verificar si tenemos coordenadas y el elemento del mapa existe
  if (!property.value || !property.value.lat || !property.value.lng) return;
  
  // Verificar si el mapa ya está inicializado
  if (propertyMap.value) {
    propertyMap.value.remove();
    propertyMap.value = null;
  }
  
  // Asegurarse de que Leaflet está disponible
  if (typeof window.L !== 'undefined') {
    // Crear el mapa
    propertyMap.value = window.L.map('propertyMap').setView(
      [property.value.lat, property.value.lng], 
      15
    );
    
    // Añadir capa de OpenStreetMap
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(propertyMap.value);
    
    // Añadir marcador en la ubicación de la propiedad
    window.L.marker([property.value.lat, property.value.lng]).addTo(propertyMap.value);
  } else {
    // Si Leaflet no está disponible, cargar los scripts necesarios
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);
    
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.onload = () => {
      initializeMap(); // Intentar inicializar de nuevo después de cargar
    };
    document.head.appendChild(script);
  }
};

// Funciones para obtener iconos para amenidades
const getAmenityIcon = (amenity) => {
  const icons = {
    'wifi': 'wifi',
    'aire-acondicionado': 'ac_unit',
    'piscina': 'pool',
    'jacuzzi': 'hot_tub',
    'gimnasio': 'fitness_center',
    'parking': 'local_parking',
    'ascensor': 'elevator',
    'balcon': 'balcony',
    'terraza': 'deck',
    'jardin': 'yard',
    'cocina-equipada': 'kitchen',
    'lavadora': 'local_laundry_service',
    'lavavajillas': 'dishwasher',
    'calefaccion': 'hvac',
    'chimenea': 'fireplace',
    'seguridad-24h': 'security',
    'vigilancia-24h': 'videocam',
    'alarma': 'notifications_active',
    'garaje': 'garage',
    'trastero': 'inventory_2',
    'amueblado': 'chair',
    'armarios-empotrados': 'inventory',
    'barbacoa': 'outdoor_grill',
    'agua-incluida': 'water_drop',
    'electricidad-incluida': 'bolt',
    'fibra-optica': 'wifi_tethering',
    'piscina-comunitaria': 'pool',
    'zona-infantil': 'child_care',
    'suelo-radiante': 'floor',
    'urbanizacion-privada': 'gated_community'
  };
  
  // Convertir a minúsculas y quitar espacios para facilitar la búsqueda
  const normalizedAmenity = amenity.toLowerCase().replace(/\s+/g, '-');
  
  return icons[normalizedAmenity] || 'check';
};

// Funciones de traducción
const translatePropertyType = (type) => {
  const translations = {
    'apartment': 'Apartamento',
    'house': 'Casa',
    'room': 'Habitación',
    'office': 'Oficina',
    'commercial': 'Comercial',
    'land': 'Terreno',
    'daily-rental': 'Alquiler diario',
    'new-building': 'Edificio nuevo',
    'parking-lot': 'Estacionamiento'
  };
  
  return translations[type] || type;
};

const translatePetsAllowed = (petsAllowed) => {
  if (!petsAllowed || petsAllowed.length === 0) return 'No permitidas';
  
  if (Array.isArray(petsAllowed)) {
    if (petsAllowed.includes('cats-allowed') && petsAllowed.includes('dogs-allowed')) {
      return 'Gatos y perros';
    }
    if (petsAllowed.includes('cats-allowed')) {
      return 'Solo gatos';
    }
    if (petsAllowed.includes('dogs-allowed')) {
      return 'Solo perros';
    }
  }
  
  return 'No permitidas';
};

const translateAmenity = (amenity) => {
  const translations = {
    'wifi': 'WiFi',
    'aire-acondicionado': 'Aire acondicionado',
    'piscina': 'Piscina',
    'jacuzzi': 'Jacuzzi',
    'gimnasio': 'Gimnasio',
    'parking': 'Estacionamiento',
    'ascensor': 'Ascensor',
    'balcon': 'Balcón',
    'terraza': 'Terraza',
    'jardin': 'Jardín',
    'cocina-equipada': 'Cocina equipada',
    'lavadora': 'Lavadora',
    'lavavajillas': 'Lavavajillas',
    'calefaccion': 'Calefacción',
    'chimenea': 'Chimenea',
    'seguridad-24h': 'Seguridad 24h',
    'vigilancia-24h': 'Vigilancia 24h',
    'alarma': 'Alarma',
    'garaje': 'Garaje',
    'trastero': 'Trastero',
    'amueblado': 'Amueblado',
    'armarios-empotrados': 'Armarios empotrados',
    'barbacoa': 'Barbacoa',
    'agua-incluida': 'Agua incluida',
    'electricidad-incluida': 'Electricidad incluida',
    'fibra-optica': 'Fibra óptica',
    'piscina-comunitaria': 'Piscina comunitaria',
    'zona-infantil': 'Zona infantil',
    'suelo-radiante': 'Suelo radiante',
    'urbanizacion-privada': 'Urbanización privada',
    'vistas-mar': 'Vistas al mar',
    'vistas-montana': 'Vistas a la montaña',
    'vistas-panoramicas': 'Vistas panorámicas',
    'primera-linea-playa': 'Primera línea de playa'
  };
  
  return translations[amenity] || amenity.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Funciones de galería de imágenes
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

// Compartir propiedad
const shareProperty = () => {
  if (navigator.share) {
    navigator.share({
      title: property.value.title,
      text: `¡Mira esta propiedad: ${property.value.title}!`,
      url: window.location.href
    }).catch(err => {
      console.error('Error compartiendo:', err);
    });
  } else {
    // Fallback - copiar enlace al portapapeles
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    
    alert('Enlace copiado al portapapeles');
  }
};

// Formatear precio con comas
const formatPrice = (price) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Formatear fecha
const formatDate = (dateString) => {
  if (!dateString) return "Sin fecha";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (err) {
    return "Sin fecha";
  }
};

// Navegar a otra propiedad
const navigateToProperty = (id) => {
  // Si estamos en la misma ruta pero con diferente ID, forzar recarga
  if (route.name === route.name && route.params.id !== id.toString()) {
    router.replace(`/properties/${id}`);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  } else {
    router.push(`/properties/${id}`);
  }
};

// Incrementar contador de visitas
const incrementViewCount = async () => {
  try {
    if (!property.value) return;
    
    // Verificar si ya hemos visitado esta propiedad en esta sesión
    const viewedProperties = JSON.parse(localStorage.getItem('viewedProperties') || '[]');
    
    // Solo enviar la solicitud si no hemos visto la propiedad en esta sesión
    if (!viewedProperties.includes(parseInt(propertyId))) {
      try {
        // Incrementar contador local inmediatamente para una experiencia más fluida
        viewCount.value = (property.value.views || 0) + 1;
        
        // Enviar la solicitud a la API para incrementar el contador
        await axios.post(`${API_URL}/properties/${propertyId}/view`);
        
        // Añadir a las propiedades ya vistas
        viewedProperties.push(parseInt(propertyId));
        localStorage.setItem('viewedProperties', JSON.stringify(viewedProperties));
      } catch (err) {
        console.error('Error al registrar vista:', err);
        // No interrumpir el flujo por este error
      }
    }
  } catch (err) {
    console.error('Error al incrementar contador de visitas:', err);
  }
};

// Obtener datos de la propiedad
const fetchPropertyData = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Obtener datos de la propiedad
    const response = await axios.get(`${API_URL}/properties/${propertyId}`);
    
    if (response.data && response.data.success) {
      property.value = response.data.data;
      
      // Configurar nueva reseña
      newReview.value.property_id = property.value.id;
      
      // Cargar datos del anfitrión
      await fetchHostData();
      
      // Cargar reseñas
      await fetchReviews();
      
      // Cargar propiedades similares
      await fetchSimilarProperties();
      
      // Incrementar contador de visitas
      incrementViewCount();
      
      // Inicializar viewCount con el valor de la API
      viewCount.value = property.value.views || 0;
      
      // Inicializar el mapa
      setTimeout(() => {
        initializeMap();
      }, 300);
    } else {
      error.value = 'No se pudo cargar la propiedad. Por favor intente de nuevo.';
    }
  } catch (err) {
    console.error('Error cargando la propiedad:', err);
    error.value = 'No se pudo cargar la propiedad. Por favor intente de nuevo más tarde.';
  } finally {
    isLoading.value = false;
  }
};

// Cargar propiedades similares
const fetchSimilarProperties = async () => {
  isLoadingSimilar.value = true;
  
  try {
    if (!property.value) return;
    
    // Construir parámetros de filtro para propiedades similares
    const filters = {
      status: property.value.status,
      property_type: property.value.property_type,
      limit: 4
    };
    
    // Opcional: añadir filtros adicionales como rango de precio similar, ciudad, etc.
    if (property.value.city) {
      filters.city = property.value.city;
    }
    
    // Armar la URL con los parámetros
    const queryString = Object.entries(filters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
    
    const response = await axios.get(`${API_URL}/properties?${queryString}`);
    
    if (response.data && response.data.success) {
      // Filtrar para no incluir la propiedad actual
      similarProperties.value = response.data.data.properties
        .filter(p => p.id !== property.value.id)
        .slice(0, 4);
    } else {
      similarProperties.value = [];
    }
  } catch (err) {
    console.error('Error cargando propiedades similares:', err);
    similarProperties.value = [];
  } finally {
    isLoadingSimilar.value = false;
  }
};

// Cargar reseñas de la propiedad
const fetchReviews = async () => {
  loadingReviews.value = true;
  
  try {
    // Obtener reseñas directamente de la API para evitar problemas con el store
    const response = await axios.get(`${API_URL}/reviews`, {
      params: { property_id: parseInt(propertyId) }
    });
    
    if (response.data && response.data.success) {
      const fetchedReviews = response.data.data.reviews || [];
      
      // Actualizar el store con las reseñas obtenidas
      reviewStore.reviews = [
        ...reviewStore.reviews.filter(r => r.property_id !== parseInt(propertyId)),
        ...fetchedReviews
      ];
    }
  } catch (err) {
    console.error('Error cargando reseñas:', err);
  } finally {
    loadingReviews.value = false;
  }
};

// Manejar like de reseña
const handleLikeReview = async (review) => {
  try {
    await axios.post(`${API_URL}/reviews/${review.id}/like`);
    
    // Actualizar la reseña localmente para mostrar el cambio inmediatamente
    const updatedReview = { ...review, likes: (review.likes || 0) + 1 };
    
    // Actualizar en el store
    const index = reviewStore.reviews.findIndex(r => r.id === review.id);
    if (index !== -1) {
      reviewStore.reviews[index] = updatedReview;
    }
  } catch (err) {
    console.error('Error al dar like a la reseña:', err);
  }
};

// Manejar dislike de reseña
const handleDislikeReview = async (review) => {
  try {
    await axios.post(`${API_URL}/reviews/${review.id}/dislike`);
    
    // Actualizar la reseña localmente para mostrar el cambio inmediatamente
    const updatedReview = { ...review, dislikes: (review.dislikes || 0) + 1 };
    
    // Actualizar en el store
    const index = reviewStore.reviews.findIndex(r => r.id === review.id);
    if (index !== -1) {
      reviewStore.reviews[index] = updatedReview;
    }
  } catch (err) {
    console.error('Error al dar dislike a la reseña:', err);
  }
};

// Funciones de reseñas
const openReviewModal = () => {
  showReviewModal.value = true;
  // Asegurarse de que el ID de la propiedad esté establecido
  newReview.value.property_id = parseInt(propertyId);
};

// Función arreglada para submitReview
const submitReview = async () => {
  // Validación básica
  if (!newReview.value.reviewer_name || !newReview.value.rating || !newReview.value.comment) {
    alert('Por favor complete todos los campos requeridos.');
    return;
  }
  
  submittingReview.value = true;
  
  try {
    // Preparar los datos correctos para la API
    const reviewData = {
      property_id: parseInt(propertyId),
      reviewer_name: newReview.value.reviewer_name,
      email: newReview.value.email, // Asegurarse de enviar el email
      rating: parseInt(newReview.value.rating),
      comment: newReview.value.comment
    };
    
    console.log('Enviando reseña:', reviewData);
    
    // Enviar la reseña a través de la API directamente
    const response = await axios.post(`${API_URL}/reviews`,reviewData);
    
    if (response.data && response.data.success) {
      // Cerrar modal y limpiar formulario
      showReviewModal.value = false;
      newReview.value = {
        property_id: parseInt(propertyId),
        reviewer_name: '',
        email: '',
        rating: 0,
        comment: ''
      };
      
      // Recargar reseñas y propiedad para actualizar el rating
      await fetchReviews();
      
      // No recargar toda la propiedad, sólo actualizar el promedio si es necesario
      if (property.value) {
        try {
          const ratingResponse = await axios.get(`${API_URL}/reviews/property/${propertyId}/rating`);
          if (ratingResponse.data && ratingResponse.data.success) {
            property.value.average_rating = ratingResponse.data.data.averageRating;
          }
        } catch (err) {
          console.warn('No se pudo actualizar el rating promedio:', err);
        }
      }
      
      alert('¡Gracias por tu reseña!');
    } else {
      throw new Error(response.data?.message || 'Error al crear la reseña');
    }
  } catch (err) {
    console.error('Error al enviar reseña:', err);
    alert('Error al enviar la reseña. Por favor intente de nuevo más tarde.');
  } finally {
    submittingReview.value = false;
  }
};

// Observar cambios en el ID de la propiedad (para navegación entre propiedades)
watch(() => route.params.id, (newId, oldId) => {
  if (newId !== oldId) {
    propertyId = newId;
    fetchPropertyData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Observar cambios en la propiedad para actualizar el mapa
watch(() => property.value, (newProperty) => {
  if (newProperty && newProperty.lat && newProperty.lng) {
    // Dar tiempo para que el DOM se actualice
    setTimeout(() => {
      initializeMap();
    }, 300);
  }
}, { deep: true });

// Cargar datos cuando el componente se monta
onMounted(async () => {
  // Cargar los datos de la propiedad específica
  await fetchPropertyData();
  
  // Cargar favoritos
  await favoritesStore.fetchFavorites();
});
</script>

<style>
/* Estilos para texto negro */
.text-black {
  color: #000000 !important;
}

/* Hacer más visibles las direcciones y descripciones */
.property-page p,
.property-page .description,
.property-page .address,
.property-page span:not(.material-icons):not(.text-white):not(.text-red-500):not(.text-green-500):not(.text-orange-800):not(.text-yellow-400) {
  color: #000000 !important;
}

/* Estilos para el spinner de carga */
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Estilos para las estrellas en reseñas */
.material-icons {
  font-size: 20px;
  line-height: 1;
  vertical-align: middle;
}

/* Estilo para botones like/dislike */
.like-button:hover .material-icons, 
.dislike-button:hover .material-icons {
  transform: scale(1.2);
  transition: transform 0.2s;
}

/* Transiciones suaves para imágenes */
.property-page img {
  transition: transform 0.3s ease;
}

.property-page img:hover {
  transform: scale(1.02);
}

/* Estilo para el contador de vistas */
.view-counter {
  display: flex;
  align-items: center;
  color: #000000;
}

.view-counter .material-icons {
  color: #fd5631; /* orange-800 */
  font-size: 18px;
  margin-right: 4px;
}

.view-counter .view-count {
  font-weight: bold;
  margin-left: 4px;
}

/* Animación cuando cambia el contador */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.view-counter .view-count.updated {
  animation: pulse 0.5s ease-in-out;
}

/* Estilos para inputs en formularios */
input[type="text"],
input[type="email"],
input[type="number"],
textarea,
select {
  color: #000000 !important;
  background-color: #ffffff;
}

/* Estilos para etiquetas de formularios */
label {
  color: #000000 !important;
}

/* Destacar elementos importantes */
.rent-price,
.details-title,
.amenities-title,
.location-title,
.similar-properties-title {
  color: #000000 !important;
}

/* Estilos para botones principales */
.bg-orange-800 {
  background-color: #fd5631 !important;
}

.bg-orange-900 {
  background-color: #fd5631 !important;
}

.hover\:bg-orange-800:hover {
  background-color: #fd5631 !important;
}

.hover\:bg-orange-900:hover {
  background-color: #fd5631 !important;
}

.text-orange-800 {
  color: #fd5631 !important;
}

.hover\:text-orange-800:hover {
  color: #fd5631 !important;
}

.hover\:text-orange-900:hover {
  color: #fd5631 !important;
}

/* Estilos para miniaturas de imágenes */
.border-orange-800 {
  border-color: #fd5631 !important;
}

/* Estilos específicos para el formulario de reseña */
.modal-form input,
.modal-form textarea {
  color: #000000 !important;
  border: 1px solid #d1d5db;
}

.modal-form label {
  font-weight: 500;
}

/* Estilos para el botón de envío de reseña */
.submit-button {
  background-color: #fd5631 !important;
  color: white !important;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #fd5631 !important;
}

.submit-button:disabled {
  background-color: #93c5fd !important;
  cursor: not-allowed;
}
</style>