<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
  <div class="container mx-auto px-4 py-8 bg-white property-page pt-20">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[600px]">
      <div class="spinner border-4 border-gray-200 border-t-orange-800 rounded-full w-10 h-10 animate-spin"></div>
      <p class="text-xl text-black ml-4">Cargando detalles de la negocio...</p>
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
      <!-- Breadcrumb modificado -->
      <div class="breadcrumb flex items-center mb-4 text-sm">
        <a href="/" class="text-black hover:text-orange-800">Inicio</a>
        <span class="mx-2 text-black">›</span>
        <a href="/properties/rent" class="text-black hover:text-orange-800">
          Negocios
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
                
                </div>
                
              
                <div class="w-full md:w-2/3 md:pl-6 mt-4 md:mt-0">
                  
                  <!-- Mostrar biografía real cuando está disponible -->
                  <p class="text-black mb-4" v-if="property.host_bio || (hostData && hostData.bio)">
                    {{ property.host_bio || (hostData && hostData.bio) }}
                  </p>
                  <!-- Se ha eliminado el bloque v-else que mostraba texto por defecto -->
                  
                  <h3 class="text-xl font-semibold mb-1">
                    <a href="#" @click.prevent="viewHostProperties()" class="text-orange-800 hover:text-orange-900">
                      {{ hostName }}
                    </a>
                  </h3>
                  
                  <p class="text-black mb-2">{{ hostRole }}</p>
                  
            
                  
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
              <p class="text-black mb-4">No hay reseñas disponibles para esta negocio.</p>
              <button 
                @click="openReviewModal" 
                class="bg-orange-800 hover:bg-orange-900 text-white py-2 px-4 rounded"
              >
                <span class="material-icons align-middle mr-1">edit</span>Sé el primero en dejar una reseña
              </button>
            </div>
            
            <!-- Lista de reseñas - AQUÍ ESTÁ LA CORRECCIÓN: displayedReviews en lugar de sortedReviews -->
            <div v-else class="space-y-6">
              <div v-for="(review, index) in displayedReviews" :key="index" class="border-b border-gray-200 pb-6 mb-6 last:border-0">
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
                        <span v-for="i in 5" :key="i" class="material-icons text-sm star-icon" 
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
          
          
          <!-- Detalles de la propiedad -->
         <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="details-title text-xl font-bold text-black mb-4">Detalles de {{ property.category }}</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-black">Tipo:</span>
                <span class="font-medium text-black">{{ property.property_type }}</span>
              </div>
              
              <!-- Solo mostrar estos campos si es alojamiento -->
          
              <!-- Mostrar horario si existe -->
              <div v-if="property.schedule" class="flex justify-between">
                <span class="text-black">Horario:</span>
                <span class="font-medium text-black">{{ formatSchedule(property.schedule) }}</span>
              </div>
              
              <!-- Datos de contacto -->
              <div v-if="property.phone" class="flex justify-between">
                <span class="text-black">Teléfono:</span>
                <span class="font-medium text-black">{{ property.phone }}</span>
              </div>
              
              <div v-if="property.email" class="flex justify-between">
                <span class="text-black">Email:</span>
                <span class="font-medium text-black">{{ property.email }}</span>
              </div>
            </div>
          </div>
          

        <!-- Ubicación en mapa -->
<div class="bg-gray-50 rounded-lg p-6 mb-6">
  <h3 class="location-title text-xl font-bold text-black mb-4">Ubicación</h3>
  <div class="relative mb-3">
    <!-- Mapa interactivo de Leaflet -->
    <div id="propertyMap" class="w-full h-[200px] rounded-md"></div>
  </div>
  <!-- Dirección debajo del mapa -->
  <p class="text-center text-black text-sm mt-2">
    {{ property.address }}, {{ property.city }}, {{ property.state }} {{ property.zip_code }}
  </p>
  <!-- Botón "Cómo llegar" ahora está debajo del mapa -->
  <div class="flex justify-center mt-3">
    <button @click="openDirectionsModal" class="bg-orange-800 text-white py-2 px-4 rounded-md hover:bg-orange-900 transition-colors flex items-center">
      <span class="material-icons mr-2">directions</span>
      Cómo llegar
    </button>
  </div>
</div>
          
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
          
         
          
          <!-- Detalles de publicación -->
          <div class="flexflex-wrap text-sm text-black">
            <div class="mr-4 pr-4 border-r border-gray-200">Publicado: <b class="text-black">{{ formatDate(property.created_at) }}</b></div>
            <div class="mr-4 pr-4 border-r border-gray-200">Nº anuncio: <b class="text-black">{{ property.id }}</b></div>
            <div class="flex items-center">
  <span class="material-icons mr-1 text-orange-800">visibility</span>
  Vistas: <b class="text-black ml-1 view-count">{{ property.views || viewCount }}</b>
</div>
          </div>
        </div>
      </div>
      
      <!-- Sección de Propiedades Similares -->
      <div class="mt-10">
        <div class="flex justify-between items-center mb-6">
          <h2 class="similar-properties-title text-2xl font-bold text-black">Negocios similares</h2>
          <a href="/properties/rent" class="text-orange-800 flex items-center">
            Ver todas <span class="ml-1">→</span>
          </a>
        </div>
        
        <div v-if="isLoadingSimilar" class="flex justify-center py-8">
          <div class="spinner border-4 border-gray-200 border-t-orange-800 rounded-full w-8 h-8 animate-spin"></div>
        </div>
        
        <div v-else-if="similarProperties.length === 0" class="text-center py-8 text-black">
          No se encontraron negocios similares.
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(listing, i) in similarProperties" :key="i" @click="navigateToProperty(listing.id)" class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300 cursor-pointer">
            <div class="relative">
              <img :src="listing.image || getRandomPropertyImage()" alt="Propiedad" class="w-full h-48 object-cover" />
              <div class="absolute top-3 left-3">
                <span v-if="listing.isVerified" class="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Verificado</span>
                <span v-if="listing.isNew" class="bg-orange-800 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Nuevo</span>
                <span v-if="listing.isFeatured" class="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded block">Destacado</span>
              </div>
            </div>
                  
            <!-- Implementación alternativa con 5 estrellas para propiedades similares -->
            <div class="p-4">
              <!-- Categoría del negocio -->
              <div class="uppercase text-sm font-medium text-green-500 mb-1">
                {{ listing.category }}
              </div>
              
              <!-- Nombre del negocio -->
              <h3 class="font-medium text-black mb-1">
                {{ listing.title }}
              </h3>
              
              <!-- Dirección -->
              <p class="text-sm text-gray-600 mb-2">{{ listing.address }}</p>
              
              <!-- Calificación con estrellas -->
              <div class="flex items-center mb-4">
                <div class="flex text-yellow-400">
                  <span 
                    v-for="i in 5" 
                    :key="i" 
                    class="material-icons text-sm star-icon" 
                    :class="i <= Math.round(parseFloat(listing.average_rating) || 0) ? 'text-yellow-400' : 'text-gray-300'"
                  >
                    star
                  </span>
                </div>
                <span class="ml-2 text-sm font-bold text-black">
                  {{ listing.average_rating ? parseFloat(listing.average_rating).toFixed(1) : '0.0' }}
                </span>
              </div>
              
              <!-- Información de contacto -->
              <div class="flex items-center mb-2">
                <svg class="mr-2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                </svg>
                <span class="text-sm text-gray-600">{{ listing.email || 'Sin correo' }}</span>
              </div>
              
              <!-- Teléfono -->
              <div class="flex items-center mb-2">
                <svg class="mr-2 text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                </svg>
                <span class="text-sm text-gray-600">{{ listing.phone || 'Sin teléfono' }}</span>
              </div>
              
              <!-- Contador de vistas -->
              <div class="flex items-center justify-end py-2 border-t border-gray-200 bg-gray-50 mt-2">
                <svg class="mr-1 text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                </svg>
                <span class="text-xs text-gray-500">{{ listing.views || 0 }} vistas</span>
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
          
          <!-- BLOQUE PARA USUARIOS NO AUTENTICADOS -->
          <div v-if="!isAuthenticated">
            <!-- Formulario de login integrado -->
            <div class="mb-4">
              <h4 class="font-medium text-black mb-2">Inicia sesión para dejar una reseña</h4>
              <form @submit.prevent="handleLogin" class="space-y-4">
                <!-- Campo de correo electrónico -->
                <div>
                  <label for="login-email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                  <input 
                    type="email" 
                    id="login-email" 
                    v-model="loginForm.email"
                    placeholder="tucorreo@ejemplo.com"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <!-- Campo de contraseña -->
                <div>
                  <label for="login-password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input 
                    type="password" 
                    id="login-password" 
                    v-model="loginForm.password"
                    placeholder="Contraseña"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                
                <!-- Checkbox para recordar email -->
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    v-model="loginForm.remember"
                    class="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label for="remember" class="ml-2 block text-sm text-gray-700">
                    Recordar mi correo
                  </label>
                </div>
                
                <!-- Mensaje de error -->
                <div v-if="loginError" class="text-red-500 text-sm py-2 px-3 bg-red-50 rounded">
                  {{ loginError }}
                </div>
                
                <!-- Botones -->
                <div class="flex flex-col space-y-3">
                  <button 
                    type="submit" 
                    class="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
                    :disabled="loginSubmitting"
                  >
                  <span v-if="loginSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
           </span>
           <span v-else>Iniciar sesión</span>
         </button>
         
         <div class="text-center text-sm text-gray-500 mt-2">
           ¿No tienes cuenta? 
           <a href="/register" class="text-orange-500 hover:underline">Regístrate aquí</a>
         </div>
         
         <div class="text-center text-xs text-gray-400 mt-1">
           <a href="/forgot-password" class="hover:underline">¿Olvidaste tu contraseña?</a>
         </div>
       </div>
     </form>
   </div>
 </div>

     <!-- BLOQUE PARA USUARIOS AUTENTICADOS -->
     <div v-else>
       <!-- Información del usuario -->
       <div class="mb-4 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
         Comentando como: {{ userData.first_name }} {{ userData.last_name }}
       </div>
       
       <!-- Formulario de reseña -->
       <form @submit.prevent="submitReview">
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
               <span class="material-icons star-icon" :class="newReview.rating >= star ? 'text-yellow-400' : 'text-gray-300'">star</span>
             </button>
           </div>
         </div>
         <div class="mb-4">
           <label class="block text-black mb-2">Reseña <span class="text-red-500">*</span></label>
           <textarea 
             v-model="newReview.comment" 
             rows="4" 
             class="w-full px-3 py-2 border rounded-md text-black"
             placeholder="Comparte tu experiencia con este negocio"
             required
           ></textarea>
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
 
 <!-- Modal de Direcciones (Oculto por defecto) -->
<div v-if="showDirectionsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
 <div class="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
   <div class="flex justify-between items-center mb-4">
     <h3 class="text-xl font-semibold text-black">Cómo llegar a {{ property.title }}</h3>
     <button @click="closeDirectionsModal" class="text-gray-500 hover:text-gray-700">
       <span class="text-2xl">&times;</span>
     </button>
   </div>
     
     <!-- Formulario para dirección de origen -->
     <div class="mb-4">
       <label for="starting-point" class="block text-sm font-medium text-gray-700 mb-1">Punto de partida:</label>
       <div class="flex">
         <input 
           type="text" 
           id="starting-point" 
           v-model="startingPoint"
           placeholder="Ingresa tu dirección o ubicación"
           class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
         />
         <button 
           @click="calculateRoute"
           class="bg-orange-800 text-white px-4 py-2 rounded-r-md hover:bg-orange-900 transition-colors"
           :disabled="directionsLoading"
         >
           <span v-if="directionsLoading">Calculando...</span>
           <span v-else>Calcular Ruta</span>
         </button>
       </div>
       <p v-if="directionsError" class="mt-2 text-red-500 text-sm">{{ directionsError }}</p>
     </div>
     
     <!-- Mapa para mostrar direcciones -->
     <div id="directionsMap" class="w-full h-[400px] rounded-md mb-4"></div>
     
     <!-- Información de la ruta si se encuentra -->
     <div v-if="directionsFound" class="bg-green-50 p-4 rounded-md mb-4">
       <h4 class="font-medium text-black mb-2">Información de la ruta:</h4>
       <p class="text-black"><strong>Distancia:</strong> {{ directionsDistance }} km</p>
       <p class="text-black"><strong>Tiempo estimado:</strong> {{ directionsTime }} minutos</p>
     </div>
     
     <!-- Información del destino -->
     <div class="bg-gray-50 p-4 rounded-md">
       <h4 class="font-medium text-black mb-2">Destino:</h4>
       <p class="text-black"><strong>{{ property.title }}</strong></p>
       <p class="text-black">{{ property.address }}, {{ property.city }}, {{ property.state }} {{ property.zip_code }}</p>
       <p v-if="property.phone" class="text-black mt-2">
         <span class="material-icons align-middle text-sm mr-1">phone</span>
         <a :href="`tel:${property.phone}`" class="text-orange-800 hover:underline">{{ property.phone }}</a>
       </p>
       <p v-if="property.schedule" class="text-black mt-1">
         <span class="material-icons align-middle text-sm mr-1">schedule</span>
         {{ formatSchedule(property.schedule) }}
       </p>
     </div>
   </div>
 </div>
</div>

<!-- Estado de no encontrado -->
<div v-else class="flex justify-center items-center min-h-[600px]">
 <p class="text-xl text-black">Negocio no encontrada</p>
</div>

<!-- Notificación Toast -->
<div 
 v-if="notification.show" 
 class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-opacity duration-300"
 :class="{
   'bg-green-100 border-green-500 text-green-800': notification.type === 'success',
   'bg-red-100 border-red-500 text-red-800': notification.type === 'error',
   'bg-blue-100 border-blue-500 text-blue-800': notification.type === 'info'
 }"
>
 <div class="flex items-center">
   <div 
     class="w-6 h-6 mr-2 flex items-center justify-center rounded-full"
     :class="{
       'bg-green-200 text-green-600': notification.type === 'success',
       'bg-red-200 text-red-600': notification.type === 'error',
       'bg-blue-200 text-blue-600': notification.type === 'info'
     }"
   >
     <span v-if="notification.type === 'success'" class="material-icons text-sm">check</span>
     <span v-if="notification.type === 'error'" class="material-icons text-sm">error</span>
     <span v-if="notification.type === 'info'" class="material-icons text-sm">info</span>
   </div>
   <p>{{ notification.message }}</p>
 </div>
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
import { useAuthStore } from '@/store/auth';
import { useRouteService } from '@/services/routeService';

// Definir la URL base de la API
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

// Inicializar router
const route = useRoute();
const router = useRouter();
const propertyId = route.params.id;
const authStore = useAuthStore();

// Inicializar stores y servicios
const reviewStore = useReviewStore();
const favoritesStore = useFavoritesStore();
const routeService = useRouteService();

// Variables de estado
const isLoading = ref(true);
const error = ref(null);
const property = ref(null);
const similarProperties = ref([]);
const isLoadingSimilar = ref(false);
const activeImageIndex = ref(0);
const showReviewModal = ref(false);
const submittingReview = ref(false);
const reviewsPerPage = 3;
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
const viewCountUpdated = ref(false); // Nueva variable para controlar la animación del contador
const propertyMap = ref(null);

// Variables para el mapa y direcciones
const routingControl = ref(null);
const routingMap = ref(null); // Variable separada para el mapa de direcciones
const showDirectionsModal = ref(false);
const startingPoint = ref('');
const directionsLoading = ref(false);
const directionsError = ref(null);
const directionsFound = ref(false);
const directionsDistance = ref(null);
const directionsTime = ref(null);

// Variables para el inicio de sesión
const loginForm = ref({
 email: '',
 password: '',
 remember: false
});
const loginError = ref('');
const loginSubmitting = ref(false);

// Variables para notificaciones
const notification = ref({
 show: false,
 message: '',
 type: 'success' // 'success', 'error', 'info'
});

// Función para mostrar notificación
const showNotification = (message, type = 'success') => {
 notification.value = {
   show: true,
   message,
   type
 }

 // Ocultar después de 3 segundos
 setTimeout(() => {
   notification.value.show = false;
 }, 3000);
};

// Función para manejar el inicio de sesión
const handleLogin = async () => {
 loginError.value = '';
 loginSubmitting.value = true;

 try {
   // Llamar a la función de login del store de autenticación
   const result = await authStore.login({
     email: loginForm.value.email,
     password: loginForm.value.password,
     remember: loginForm.value.remember
   });
   
   if (result.success) {
     // Verificar que el token se guardó correctamente
     const token = localStorage.getItem('token');
     console.log('Token guardado correctamente:', !!token);
     
     // Forzar una re-validación del estado
     if (typeof authStore.validateSession === 'function') {
       authStore.validateSession();
     }
     
     // Mostrar notificación de éxito en lugar de alert
     showNotification(`Bienvenido ${authStore.user.first_name}! Ahora puedes dejar una reseña.`, 'success');
     
     // Limpiar el formulario de login pero mantener el email si remember está activado
     if (!loginForm.value.remember) {
       loginForm.value.email = '';
     }
     loginForm.value.password = '';
   } else {
     // Mostrar error específico si está disponible
     loginError.value = result.error || 'Credenciales incorrectas. Por favor, intenta de nuevo.';
     showNotification('Error al iniciar sesión. Verifica tus credenciales.', 'error');
   }
 } catch (err) {
   console.error('Error al iniciar sesión:', err);
   loginError.value = 'Error al iniciar sesión. Por favor, intenta de nuevo más tarde.';
   showNotification('Error al iniciar sesión. Inténtalo de nuevo más tarde.', 'error');
 } finally {
   loginSubmitting.value = false;
 }
};

// Verificar si una propiedad es favorita
const isFavorite = computed(() => {
 return property.value ? favoritesStore.isFavorite(property.value.id) : false;
});

// Alternar estado de favorito
const toggleFavorite = async () => {
 if (!property.value) return;

 try {
   await favoritesStore.toggleFavorite(property.value);
   
   // Mostrar notificación basada en el estado actual
   if (isFavorite.value) {
     showNotification('Negocio añadida a favoritos', 'success');
   } else {
     showNotification('Negocio eliminada de favoritos', 'info');
   }
 } catch (error) {
   console.error('Error toggling favorite:', error);
   showNotification('Error al actualizar favoritos', 'error');
 }
};

// Datos para nuevo formulario de reseña
const newReview = ref({
 property_id: null,
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

// Modificar la función para obtener el token de autenticación
const userData = computed(() => authStore.user);

// Verificar si el usuario está autenticado
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Modificar la función goToLogin para que simplemente abra el modal
const goToLogin = () => {
 // Si ya estamos mostrando el formulario de reseña, el formulario de login ya está visible
 if (showReviewModal.value) {
   return;
 }

 // Abrir el modal de reseña que ahora contiene el formulario de login
 openReviewModal();
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
   const token = localStorage.getItem('token');
   
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
           console.warn(`Error al obtener reseñas para la negocio ${prop.id}:`, error);
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
       
       console.log(`Anfitrión: ${totalReviews} reseñas, rating ${hostRating.value.toFixed(1)} y ${properties.length} negocios`);
     }
   }
 } catch (error) {
   console.error('Error al obtener negocios y reseñas del anfitrión:', error);
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
 return `https://oasiscontenedor.blob.core.windows.net/business-images/${imageNum}.jpg`;
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

// Función para inicializar el mapa con Leaflet
const initializeMap = () => {
 // Verificar si tenemos coordenadas y el elemento del mapa existe
 if (!property.value || !property.value.lat || !property.value.lng) return;

 // Verificar si el elemento del DOM existe
 const mapElement = document.getElementById('propertyMap');
 if (!mapElement) return;

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
   
   // Añadir capa de OpenStreetMap (completamente gratuito)
   window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(propertyMap.value);
   
   // Añadir marcador en la ubicación de la propiedad
   const icon = window.L.icon({
     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
     iconSize: [25, 41],
     iconAnchor: [12, 41],
     popupAnchor: [1, -34],
     shadowSize: [41, 41]
   });
   
   // Marcador con popup con información del negocio
   const marker = window.L.marker([property.value.lat, property.value.lng], {icon: icon}).addTo(propertyMap.value);
   marker.bindPopup(`
     <strong>${property.value.title}</strong><br>
     ${property.value.address}, ${property.value.city}<br>
     <a href="tel:${property.value.phone}">${property.value.phone}</a>
   `).openPopup();
 } else {
   // Si Leaflet no está disponible, cargar los scripts necesarios
   loadLeafletScripts();
 }
};

// Función para cargar los scripts de Leaflet si no están disponibles
const loadLeafletScripts = () => {
 // Cargar CSS de Leaflet
 if (!document.getElementById('leaflet-css')) {
   const link = document.createElement('link');
   link.id = 'leaflet-css';
   link.rel = 'stylesheet';
   link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
   document.head.appendChild(link);
 }

 // Cargar JavaScript de Leaflet
 if (!document.getElementById('leaflet-js')) {
   const script = document.createElement('script');
   script.id = 'leaflet-js';
   script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
   script.onload = () => {
       // Cargar Leaflet Routing Machine para direcciones
       const routingScript = document.createElement('script');
       routingScript.id = 'leaflet-routing-js';
       routingScript.src = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.min.js';
       routingScript.onload = () => {
         // Cargar CSS de Leaflet Routing Machine
         const routingCss = document.createElement('link');
         routingCss.id = 'leaflet-routing-css';
         routingCss.rel = 'stylesheet';
         routingCss.href = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css';
         document.head.appendChild(routingCss);
         
         // Una vez cargado todo, inicializar el mapa
         initializeMap();
       };
       document.head.appendChild(routingScript);
     };
     document.head.appendChild(script);
   }
 };
 
 // Función para abrir el modal de direcciones
 const openDirectionsModal = () => {
   // Ocultar el mapa principal cuando se abre el modal
   const mainMapElement = document.getElementById('propertyMap');
   if (mainMapElement) {
     mainMapElement.style.visibility = 'hidden';
   }
 
   showDirectionsModal.value = true;
 
   // Intentar obtener la ubicación actual del usuario si el navegador lo permite
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(
       async (position) => {
         // Obtener coordenadas
         const lat = position.coords.latitude;
         const lng = position.coords.longitude;
         
         try {
           // Usar nuestro servicio de geocodificación inversa
           const geocoded = await routeService.geocodeAddress(`${lat},${lng}`);
           if (geocoded && geocoded.display_name) {
             startingPoint.value = geocoded.display_name;
           } else {
             // Si falla, simplemente usamos las coordenadas
             startingPoint.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
           }
         } catch (err) {
           console.error('Error obteniendo dirección:', err);
           // Si falla, simplemente usamos las coordenadas
           startingPoint.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
         }
       },
       (error) => {
         console.warn('Error obteniendo ubicación:', error);
         // Dejar el campo vacío para que el usuario lo complete
         startingPoint.value = '';
       }
     );
   }
 
   // Crear una nueva instancia del mapa de direcciones
   // Usamos un pequeño retraso para asegurar que el DOM esté listo
   setTimeout(() => {
     initializeDirectionsMap();
   }, 300);
 };
 
 // Añadir esta función para cerrar el modal y restaurar el mapa principal
 const closeDirectionsModal = () => {
   showDirectionsModal.value = false;
 
   // Restaurar la visibilidad del mapa principal
   setTimeout(() => {
     const mainMapElement = document.getElementById('propertyMap');
     if (mainMapElement) {
       mainMapElement.style.visibility = 'visible';
     }
     
     // Reiniciar el mapa principal si es necesario
     if (propertyMap.value && typeof propertyMap.value.invalidateSize === 'function') {
       propertyMap.value.invalidateSize();
     }
   }, 300);
 };
 
 // Función para inicializar el mapa de direcciones
 const initializeDirectionsMap = () => {
   // Verificar si tenemos coordenadas y el elemento del mapa existe
   if (!property.value || !property.value.lat || !property.value.lng) return;
 
   // Verificar si el elemento del DOM existe
   const mapElement = document.getElementById('directionsMap');
   if (!mapElement) return;
 
   try {
     // Si Leaflet está disponible
     if (typeof window.L !== 'undefined') {
       // Crear una variable local para el mapa de direcciones (no usar propertyMap)
       let directionsMap;
       
       // Verificar si ya existe un mapa en este elemento
       if (mapElement._leaflet_id) {
         // Si ya existe, eliminarlo primero
         window.L.DomUtil.empty(mapElement);
       }
       
       // Crear mapa para direcciones (con una nueva instancia)
       directionsMap = window.L.map('directionsMap', {
         attributionControl: true, 
         zoomControl: true,
         minZoom: 2,
         maxZoom: 18
       }).setView([property.value.lat, property.value.lng], 13);
       
       // Añadir capa de OpenStreetMap
       window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       }).addTo(directionsMap);
       
       // Añadir marcador de destino (la propiedad)
       const destIcon = window.L.icon({
         iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
         shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
         iconSize: [25, 41],
         iconAnchor: [12, 41],
         popupAnchor: [1, -34],
         shadowSize: [41, 41]
       });
       
       const marker = window.L.marker([property.value.lat, property.value.lng], {icon: destIcon})
         .addTo(directionsMap)
         .bindPopup(`<strong>${property.value.title}</strong><br>${property.value.address}`)
         .openPopup();
       
       // Guardar referencia al mapa en una variable separada para el mapa de direcciones
       // NO USAR propertMap para esto, crear una nueva variable
       routingMap.value = directionsMap;
       
       // Cargar el plugin Routing Machine si existe
       if (window.L.Routing && typeof window.L.Routing.control === 'function') {
         console.log("Leaflet Routing Machine está disponible");
       } else {
         console.log("Cargando Leaflet Routing Machine...");
         // Carga dinámica del script y CSS de Leaflet Routing Machine
         loadLeafletRoutingScripts();
       }
     } else {
       // Si no están disponibles las bibliotecas, cargarlas
       loadLeafletScripts();
     }
   } catch (error) {
     console.error("Error inicializando mapa de direcciones:", error);
   }
 };
 
 // Función para cargar scripts de Leaflet Routing Machine
 const loadLeafletRoutingScripts = () => {
   // Cargar CSS de Leaflet Routing Machine
   if (!document.getElementById('leaflet-routing-css')) {
     const routingCss = document.createElement('link');
     routingCss.id = 'leaflet-routing-css';
     routingCss.rel = 'stylesheet';
     routingCss.href = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css';
     document.head.appendChild(routingCss);
   }
 
   // Cargar JavaScript de Leaflet Routing Machine
   if (!document.getElementById('leaflet-routing-js')) {
     const routingScript = document.createElement('script');
     routingScript.id = 'leaflet-routing-js';
     routingScript.src = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.min.js';
     routingScript.onload = () => {
       console.log("Leaflet Routing Machine cargado con éxito");
     };
     document.head.appendChild(routingScript);
   }
 };
 
// Función modificada para calcular y mostrar ruta
const calculateRoute = async () => {
  // Validar que tenemos un punto de inicio
  if (!startingPoint.value.trim()) {
    directionsError.value = "Por favor, ingresa un punto de partida";
    showNotification("Por favor, ingresa un punto de partida", 'error');
    return;
  }

  directionsLoading.value = true;
  directionsError.value = null;
  directionsFound.value = false;

  try {
    // Llamar al backend para calcular la ruta
    const response = await axios.get(`${API_URL}/routes/calculate`, {
      params: {
        originAddress: startingPoint.value, 
        destinationLat: property.value.lat,
        destinationLng: property.value.lng
      }
    });
    
    console.log("Respuesta del cálculo de ruta:", response.data);
    
    if (response.data) {
      // Actualizar el mapa con los resultados
      updateRouteMap(response.data);
      
      // Actualizar UI con información de la ruta
      if (response.data.success && response.data.route) {
        // Ruta exacta encontrada
        directionsDistance.value = response.data.route.distance;
        directionsTime.value = response.data.route.duration;
        directionsFound.value = true;
        directionsError.value = null;
        showNotification("Ruta calculada correctamente", 'success');
      } else if (response.data.straightLine) {
        // Distancia en línea recta (aproximación)
        directionsDistance.value = response.data.straightLine.distance;
        directionsTime.value = response.data.straightLine.duration;
        directionsFound.value = true;
        directionsError.value = response.data.straightLine.errorMessage;
        showNotification("Se muestra una aproximación de la ruta", 'info');
      } else {
        throw new Error("No se pudo calcular la ruta");
      }
    } else {
      throw new Error("Respuesta inválida del servidor");
    }
  } catch (error) {
    console.error('Error al calcular ruta:', error);
    directionsError.value = error.message || "Ocurrió un error al calcular la ruta";
    showNotification("Error al calcular la ruta", 'error');
  } finally {
    directionsLoading.value = false;
  }
};
 
// Función para actualizar el mapa con la ruta
const updateRouteMap = (routeData) => {
  const map = routingMap.value;
  
  if (!map) {
    console.error("El mapa de direcciones no está inicializado correctamente");
    return;
  }
  
  // Limpiar marcadores previos
  map.eachLayer(function(layer) {
    if (layer instanceof window.L.Marker || layer instanceof window.L.Routing.Control || layer instanceof window.L.Polyline) {
      map.removeLayer(layer);
    }
  });
  
  // Añadir capa base
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Coordenadas de origen y destino
  const origin = routeData.origin;
  const destination = routeData.destination;
  
  // Añadir marcador de origen (verde)
  const startIcon = window.L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  const startMarker = window.L.marker([origin.lat, origin.lng], {icon: startIcon})
    .addTo(map)
    .bindPopup('Punto de inicio');
  
  // Añadir marcador de destino (rojo)
  const destIcon = window.L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  const destMarker = window.L.marker([destination.lat, destination.lng], {icon: destIcon})
    .addTo(map)
    .bindPopup(`<strong>${property.value.title}</strong><br>${property.value.address}`);
  
  // Si success es true y tenemos ruta detallada
  if (routeData.success && routeData.route && routeData.route.coordinates && routeData.route.coordinates.length > 0) {
    // Ruta detallada exitosa
    const routePolyline = window.L.polyline(routeData.route.coordinates, {
      color: '#fd5631',
      weight: 5,
      opacity: 0.8
    }).addTo(map);
    
    map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
  } 
  // Si hay una ruta con geometría en formato polyline
  else if (routeData.success && routeData.route && routeData.route.geometry) {
    try {
      let coordinates = [];
      
      // Intentar decodificar el polyline
      if (typeof window.L.Polyline.fromEncoded === 'function') {
        // Si está disponible el plugin para decodificar polylines
        const decodedPath = window.L.Polyline.fromEncoded(routeData.route.geometry).getLatLngs();
        coordinates = decodedPath;
      } else {
        // Intentar decodificar manualmente si es posible
        console.warn("No se encontró la función para decodificar polyline. Usando línea recta.");
        coordinates = [
          [origin.lat, origin.lng],
          [destination.lat, destination.lng]
        ];
      }
      
      // Crear polyline con las coordenadas
      const routePolyline = window.L.polyline(coordinates, {
        color: '#fd5631',
        weight: 5,
        opacity: 0.8
      }).addTo(map);
      
      map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
    } catch (error) {
      console.error("Error al decodificar geometría de la ruta:", error);
      showLineDistance();
    }
  } 
  // Si estamos en modo línea recta
  else {
    showLineDistance();
  }
  
  // Función interna para mostrar la línea recta
  function showLineDistance() {
    // Crear línea recta con estilo diferente para indicar que es aproximación
    const straightLinePolyline = window.L.polyline([
      [origin.lat, origin.lng],
      [destination.lat, destination.lng]
    ], {
      color: '#fd5631',
      dashArray: '6, 10', // Línea punteada
      weight: 4,
      opacity: 0.7
    }).addTo(map);
    
    // Ajustar zoom para ver ambos puntos
    map.fitBounds(straightLinePolyline.getBounds(), { padding: [50, 50] });
    
    // Añadir botón "Ver en Google Maps" si existe distancia en línea recta
    if (routeData.straightLine) {
      // Mostrar la información de distancia aproximada
      directionsDistance.value = routeData.straightLine.distance;
      directionsTime.value = routeData.straightLine.duration;
      directionsFound.value = true;
      directionsError.value = routeData.straightLine.errorMessage;
      
      // Crear botón para Google Maps
      const googleMapsButton = document.createElement("button");
      googleMapsButton.className = "mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center w-full";
      googleMapsButton.innerHTML = '<span class="material-icons mr-2">map</span>Ver ruta en Google Maps';
      
      googleMapsButton.addEventListener("click", () => {
        // Crear URL para Google Maps direcciones
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&travelmode=driving`;
        window.open(googleMapsUrl, '_blank');
      });
      
      // Añadir el botón al contenedor de información
      setTimeout(() => {
        const directionsInfo = document.querySelector('.bg-green-50');
        if (directionsInfo) {
          directionsInfo.appendChild(googleMapsButton);
        }
      }, 100);
    }
  }
};


// Función auxiliar para asignar iconos de dirección según el tipo de maniobra
const getDirectionIcon = (sign) => {
  switch(sign) {
    case 0: return 'arrow_forward'; // continuar recto
    case 1: return 'turn_slight_right'; // giro ligero a la derecha
    case 2: return 'turn_right'; // giro a la derecha
    case 3: return 'turn_sharp_right'; // giro cerrado a la derecha
    case 4: return 'u_turn_right'; // vuelta de 180 grados
    case 5: return 'turn_sharp_left'; // giro cerrado a la izquierda
    case 6: return 'turn_left'; // giro a la izquierda
    case 7: return 'turn_slight_left'; // giro ligero a la izquierda
    case 8: return 'roundabout'; // rotonda
    default: return 'arrow_forward';
  }
};

// Función auxiliar para cargar dinámicamente la biblioteca polyline-util si es necesario
const loadPolylineScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof polylineUtil !== 'undefined') {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@mapbox/polyline@1.1.1/src/polyline.js';
    script.onload = () => {
      window.polylineUtil = {
        decode: function(str, precision) {
          return window.polyline.decode(str, precision);
        }
      };
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
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

 const getStarsText = (rating) => {
   if (rating === undefined || rating === null) return "★ 0.0 (0 reseñas)";

   const numericRating = parseFloat(rating) || 0;
   const formattedRating = numericRating.toFixed(1);
   return `★ ${formattedRating}`;
 };

 // Función para obtener array de estrellas (llenas o vacías)
 const getStarsArray = (rating) => {
   if (rating === undefined || rating === null) return [false, false, false, false, false];

   const numericRating = Math.round(parseFloat(rating) || 0);
   return Array(5).fill(false).map((_, index) => index < numericRating);
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
       text: `¡Mira este negocio: ${property.value.title}!`,
       url: window.location.href
     }).catch(err => {
       console.error('Error compartiendo:', err);
       showNotification('Error al compartir el negocio', 'error');
     });
   } else {
     // Fallback - copiar enlace al portapapeles
     const dummy = document.createElement('input');
     document.body.appendChild(dummy);
     dummy.value = window.location.href;
     dummy.select();
     document.execCommand('copy');
     document.body.removeChild(dummy);
     
     // Mostrar notificación en lugar de alert
     showNotification('Enlace copiado al portapapeles', 'success');
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

 // Formatear horario
 const formatSchedule = (schedule) => {
   if (!schedule) return "No disponible";
   // Convierte el texto del horario "Lunes Martes" en "Lun, Mar"
   return schedule
     .split(' ')
     .map(day => {
       const firstThree = day.substring(0, 3);
       return firstThree.charAt(0).toUpperCase() + firstThree.slice(1).toLowerCase();
     })
     .join(', ');
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

 // Función para activar la animación cuando cambia el contador
 const animateViewCount = () => {
   viewCountUpdated.value = true;
   setTimeout(() => {
     viewCountUpdated.value = false;
   }, 1000); // La animación dura 1 segundo
 };


 // Incrementar contador de vistas - versión actualizada para coincidencia con Postman
 const incrementViewCount = async () => {
   try {
     console.log("Función incrementViewCount iniciada");
     if (!property.value) {
       console.log("No hay propiedad, saliendo de la función");
       return;
     }
     
     // Formar la URL exactamente como en Postman
     const endpoint = `${API_URL}/properties/${propertyId}/view`;
     console.log(`Intentando llamar a: ${endpoint}`);
     
     // Realizar la solicitud POST sin cuerpo, igual que en Postman
     const response = await axios.post(endpoint);
     console.log("Respuesta de vista:", response);
     
     if (response.data && response.data.success) {
       // Incrementar contador local
       property.value.views = (property.value.views || 0) + 1;
       viewCount.value = property.value.views;
       
       console.log(`Contador actualizado a: ${property.value.views}`);
       showNotification(`Visita registrada. Total: ${property.value.views}`, 'success');
       
       // Guardar en localStorage para no incrementar nuevamente en la misma sesión
       const viewedProperties = JSON.parse(localStorage.getItem('viewedProperties') || '[]');
       if (!viewedProperties.includes(parseInt(propertyId))) {
         viewedProperties.push(parseInt(propertyId));
         localStorage.setItem('viewedProperties', JSON.stringify(viewedProperties));
       }
     } else {
       console.error("La respuesta del servidor no fue exitosa:", response.data);
     }
   } catch (err) {
     console.error("Error en incrementViewCount:", err);
     if (err.response) {
       console.error("Datos de error:", err.response.data);
       console.error("Estado HTTP:", err.response.status);
     }
   }
 };

 // Modificación en el método fetchPropertyData para inicializar correctamente el contador
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
       
       // Inicializar viewCount con el valor de la API
       // Asegurarse de que views es un número
       property.value.views = property.value.views ? parseInt(property.value.views) : 0;
       viewCount.value = property.value.views;
       
       // Incrementar contador de visitas - ahora con una pequeña demora para evitar
       // que se haga antes de que el usuario pueda ver la página
       setTimeout(() => {
         incrementViewCount();
       }, 2000);
       
       // Inicializar el mapa
       setTimeout(() => {
         initializeMap();
       }, 300);
       
       showNotification('Negocio cargado correctamente', 'success');
     } else {
       error.value = 'No se pudo cargar el negocio. Por favor intente de nuevo.';
       showNotification('Error al cargar el negocio', 'error');
     }
   } catch (err) {
     console.error('Error cargando el negocio:', err);
     error.value = 'No se pudo cargar el negocio. Por favor intente de nuevo más tarde.';
     showNotification('Error al cargar el negocio', 'error');
   } finally {
     isLoading.value = false;
   }
 };

 // Agregar esta función en el script
 const getActionButtonText = () => {
   if (property.value.category === 'Alojamiento') {
     return property.value.status === 'for-rent' ? 'Reservar Ahora' : 'Contactar';
   } else if (property.value.category === 'Restaurante y bar') {
     return 'Reservar Mesa';
   } else if (property.value.category === 'Entretenimiento') {
     return 'Más Información';
   }
   return 'Contactar';
 };

 // Cargar propiedades similares
 const fetchSimilarProperties = async () => {
   isLoadingSimilar.value = true;

   try {
     if (!property.value) return;
     
     // Construir parámetros de filtro para propiedades similares
     const filters = {
       category: property.value.category,
       property_type: property.value.property_type,
       include_ratings: true, // Asegurarse de incluir los ratings
       limit: 4
     };
     
     // Opcional: añadir filtros adicionales como ciudad, etc.
     
     // Armar la URL con los parámetros
     const queryString = Object.entries(filters)
       .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
       .join('&');
     
     const response = await axios.get(`${API_URL}/properties?${queryString}`);
     
     if (response.data && response.data.success) {
       // Filtrar para no incluir la propiedad actual
       const filteredProperties = response.data.data.properties
         .filter(p => p.id !== property.value.id)
         .slice(0, 4);
       
       // Para cada propiedad, si no tiene average_rating, obtenerlo
       for (const prop of filteredProperties) {
         if (!prop.average_rating || !prop.review_count) {
           try {
             const ratingResponse = await axios.get(`${API_URL}/reviews/property/${prop.id}/rating`);
             if (ratingResponse.data && ratingResponse.data.success) {
               prop.average_rating = ratingResponse.data.data.averageRating;
               prop.review_count = ratingResponse.data.data.reviewCount || 0;
             }
           } catch (err) {
            console.warn(`No se pudo obtener rating para negocio ${prop.id}:`, err);
             // Si falla, asignar valores por defecto
             prop.average_rating = prop.average_rating || 0;
             prop.review_count = prop.review_count || 0;
           }
         }
       }
       
       similarProperties.value = filteredProperties;
       
       if (filteredProperties.length > 0) {
         showNotification('Se encontraron negocios similares', 'info');
       }
     } else {
       similarProperties.value = [];
     }
   } catch (err) {
     console.error('Error cargando negocios similares:', err);
     similarProperties.value = [];
     showNotification('Error al cargar negocio similares', 'error');
   } finally {
     isLoadingSimilar.value = false;
   }
 };

 // Función para formatear calificación
 const formatRating = (rating) => {
   if (!rating || isNaN(parseFloat(rating))) return '0.0';
   return parseFloat(rating).toFixed(1);
 };

 // Función para obtener array de estrellas llenas/vacías basado en rating
 const getRatingStars = (rating) => {
   const numericRating = Math.round(parseFloat(rating) || 0);
   return Array(5).fill(false).map((_, index) => index < numericRating);
 };

 // Función para obtener el texto de calificación con número de reseñas
 const getRatingText = (rating, reviewCount) => {
   const formattedRating = formatRating(rating);
   const count = reviewCount || 0;
   return `${formattedRating} (${count} ${count === 1 ? 'reseña' : 'reseñas'})`;
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
       
       if (fetchedReviews.length > 0) {
         showNotification(`Se encontraron ${fetchedReviews.length} reseñas`, 'info');
       }
     }
   } catch (err) {
     console.error('Error cargando reseñas:', err);
     showNotification('Error al cargar reseñas', 'error');
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
     
     showNotification('Has marcado que te gusta esta reseña', 'success');
   } catch (err) {
     console.error('Error al dar like a la reseña:', err);
     showNotification('Error al interactuar con la reseña', 'error');
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
     
     showNotification('Has marcado que no te gusta esta reseña', 'info');
   } catch (err) {
     console.error('Error al dar dislike a la reseña:', err);
     showNotification('Error al interactuar con la reseña', 'error');
   }
 };

 // Funciones de reseñas
 const openReviewModal = () => {
   showReviewModal.value = true;
   // Asegurarse de que el ID de la propiedad esté establecido
   newReview.value.property_id = parseInt(propertyId);
 };

 // Función actualizada para enviar reseña con notificaciones
 const submitReview = async () => {
   // Validación básica
   if (!newReview.value.rating) {
     showNotification('Por favor asigne una calificación', 'error');
     return;
   }

   submittingReview.value = true;

   try {
     // Obtener datos del usuario del store
     const user = authStore.user || JSON.parse(localStorage.getItem('user') || '{}');
     
     if (!user || !user.id) {
       throw new Error('No hay información de usuario disponible. Por favor, inicia sesión nuevamente.');
     }
     
     // Preparar los datos para la API, incluyendo user_id
     const reviewData = {
       property_id: parseInt(propertyId),
       rating: parseInt(newReview.value.rating),
       comment: newReview.value.comment || '',
       user_id: user.id,
       // Opcionalmente, incluir nombre para que el backend no tenga que buscarlo
       reviewer_name: `${user.first_name || ''} ${user.last_name || ''}`.trim()
     };
     
     console.log('Enviando reseña con datos:', reviewData);
     
     // Enviar sin token
     const response = await axios.post(`${API_URL}/reviews`, reviewData);
     
     if (response.data && response.data.success) {
       // Cerrar modal y limpiar formulario
       showReviewModal.value = false;
       newReview.value = {
         property_id: parseInt(propertyId),
         rating: 0,
         comment: ''
       };
       
       // Recargar reseñas
       await fetchReviews();
       
       showNotification('¡Gracias por tu reseña!', 'success');
     } else {
       throw new Error(response.data?.message || 'Error al crear la reseña');
     }
   } catch (err) {
     console.error('Error al enviar reseña:', err);
     showNotification('Error al enviar la reseña: ' + (err.message || 'Intenta nuevamente'), 'error');
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

   // Inicializar el store de autenticación si es necesario
   if (!authStore.isInitialized) {
     authStore.initialize();
   }

   // Cargar favoritos
   await favoritesStore.fetchFavorites();

   // Cargar email recordado si existe
   const rememberedEmail = localStorage.getItem('rememberedEmail');
   if (rememberedEmail) {
     loginForm.value.email = rememberedEmail;
     loginForm.value.remember = true;
   }
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

/* Estilos globales para estrellas amarillas */
.star-icon,
.material-icons.star,
.text-yellow-400,
.rating ★,
.stars ★,
span.star,
[class*="rating"] ★,
[class*="stars"] ★,
[class*="rating"] .material-icons,
★ {
 color: #facc15 !important; /* Amarillo brillante para todas las estrellas */
}

/* Estilos globales para estrellas inactivas */
.star-icon.text-gray-300,
.material-icons.star.text-gray-300,
.text-gray-300,
.rating:not(.active) ★,
.stars:not(.active) ★,
span.star:not(.active),
[class*="rating"]:not(.active) ★,
[class*="stars"]:not(.active) ★,
[class*="rating"] .material-icons:not(.active),
★:not(.active) {
 color: #d1d5db !important; /* Gris muy claro para estrellas inactivas */
}

/* Reglas específicas para estrellas en ratings */
.flex.text-yellow-400 .material-icons {
 color: #facc15 !important;
}

.flex.text-yellow-400 .material-icons.text-gray-300 {
 color: #d1d5db !important;
}

/* Estilos para caracteres Unicode de estrellas */
.rating,
.stars,
.star-rating,
[class*="rating"],
[class*="stars"] {
 color: #facc15 !important;
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
 50% { transform: scale(1.2); color: #fd5631; }
 100% { transform: scale(1); }
}

.view-count.updated {
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

/* Estilos adicionales para el mapa de rutas */
#directionsMap {
 z-index: 10;
}

.leaflet-routing-container {
 background-color: white;
 padding: 10px;
 border-radius: 4px;
 box-shadow: 0 1px 5px rgba(0,0,0,0.4);
 font-size: 12px;
 max-height: 320px;
 overflow-y: auto;
 width: 320px;
}

/* Ocultar algunas partes de la interfaz de Leaflet Routing Machine que no necesitamos */
.leaflet-routing-geocoder input {
 width: 100%;
 padding: 5px;
 border: 1px solid #ccc;
 border-radius: 3px;
}

.leaflet-routing-alt {
 max-height: 240px;
 overflow-y: auto;
 border-bottom: 1px solid #ccc;
 padding-bottom: 5px;
 margin-bottom: 5px;
}

.leaflet-routing-alt h2 {
 font-size: 14px;
 font-weight: bold;
 margin: 0 0 5px 0;
}

.leaflet-routing-alt-minimized {
 display: none;
}

.leaflet-routing-geocoder-result {
 background-color: white;
 border: 1px solid #ccc;
 border-radius: 3px;
 max-height: 200px;
 overflow-y: auto;
 list-style: none;
 padding: 0;
 margin: 0;
}

.leaflet-routing-geocoder-result li {
 padding: 5px;
 cursor: pointer;
}

.leaflet-routing-geocoder-result li:hover {
 background-color: #f0f0f0;
}

.leaflet-routing-icon {
 width: 20px;
 height: 20px;
 background-color: #fff;
 border-radius: 50%;
 box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
 text-align: center;
 line-height: 20px;
 color: #000;
 font-weight: bold;
}

.leaflet-routing-icon-start {
 background-color: #72af2e;
 color: #fff;
}

.leaflet-routing-icon-end {
 background-color: #d63e2a;
 color: #fff;
}

/* Estilos para las notificaciones toast */
.fixed.bottom-4.right-4 {
 z-index: 9999; /* Asegurar que aparece por encima de otros elementos */
}

/* Animación de entrada y salida para notificaciones */
.transition-opacity {
 transition-property: opacity;
 transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
 transition-duration: 300ms;
}

/* Efectos de aparición y desaparición */
@keyframes slideInRight {
 from {
   transform: translateX(100%);
   opacity: 0;
 }
 to {
   transform: translateX(0);
   opacity: 1;
 }
}

@keyframes fadeOut {
 from {
   opacity: 1;
 }
 to {
   opacity: 0;
 }
}

/* Aplicar animaciones */
.fixed.bottom-4.right-4[v-if="notification.show"] {
 animation: slideInRight 0.3s ease-out forwards;
}

.fixed.bottom-4.right-4 {
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
 max-width: 90%;
 width: 320px;
}

/* Estilos específicos por tipo */
.bg-green-100.border-green-500 {
 border-left-width: 4px;
}

.bg-red-100.border-red-500 {
 border-left-width: 4px;
}

.bg-blue-100.border-blue-500 {
 border-left-width: 4px;
}

/* Mejora de iconos */
.material-icons.text-sm {
 font-size: 16px;
}

/* Responsive */
@media (max-width: 640px) {
 .fixed.bottom-4.right-4 {
   bottom: 1rem;
   right: 1rem;
   left: 1rem;
   width: auto;
 }
}

/* Estilo global para todos los caracteres unicode de estrella (★) */
★,
.flex .flex ★,
.reviews-section ★,
.star-rating ★ {
 color: #facc15 !important;
}

/* !important es necesario para anular cualquier otro estilo */
* {
 --star-color-active: #facc15 !important;
 --star-color-inactive: #d1d5db !important;
}

/* Regla de prioridad máxima para asegurar que se aplique */
body .material-icons.text-yellow-400,
body .star-icon.text-yellow-400,
body span.text-yellow-400,
body div.text-yellow-400,
html .material-icons.text-yellow-400,
html .star-icon.text-yellow-400 {
 color: #facc15 !important;
}

body .material-icons.text-gray-300,
body .star-icon.text-gray-300,
body span.text-gray-300,
body div.text-gray-300,
html .material-icons.text-gray-300,
html .star-icon.text-gray-300 {
 color: #d1d5db !important;
}
</style>