<!-- client/pages/admin/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-14">
          <div class="flex items-center">
            <span class="font-bold text-lg">En <span class="text-orange-600">La Ceiba</span></span>
          </div>
          <div class="flex items-center gap-4">
            <button
              @click="openBusinessModal(null)"
              class="flex items-center justify-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
            >
              <span class="mr-1">+</span>
              Añadir Comercio
            </button>
            <img 
              :src="user.profile_image || '/img/default-avatar.png'" 
              alt="Admin" 
              class="w-8 h-8 rounded-full object-cover border border-gray-200"
            >
          </div>
        </div>
      </div>
    </header>

    <!-- Breadcrumb Navigation con más espacio respecto al header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2">
      <nav class="flex items-center space-x-2 text-sm text-gray-600">
        <a href="/" class="text-orange-600 hover:text-orange-700 transition-colors">Inicio</a>
        <span class="text-gray-400">/</span>
        <span class="text-gray-800 font-medium">Panel de Administración</span>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
      <!-- Dashboard Stats Cards -->
      <stats-cards :stats="stats" />

      <!-- Tab Navigation -->
      <div class="mb-5 border-b border-gray-200">
        <nav class="flex -mb-px">
          <button
            @click="activeTab = 'comercios'"
            :class="[
              'py-3 px-4 font-medium text-sm border-b-2 whitespace-nowrap',
              activeTab === 'comercios'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Comercios
          </button>
          <button
            @click="activeTab = 'events'"
            :class="[
              'py-3 px-4 font-medium text-sm border-b-2 whitespace-nowrap',
              activeTab === 'events'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Eventos
          </button>
          <button
            @click="activeTab = 'blogs'"
            :class="[
              'py-3 px-4 font-medium text-sm border-b-2 whitespace-nowrap',
              activeTab === 'blogs'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Blog Posts
          </button>
        </nav>
      </div>
      <!-- Tab Content -->
      <div>
        <!-- Comercios Tab -->
        <div v-if="activeTab === 'comercios'" class="animate-fadeIn">
          <business-section
            :businesses="paginatedBusinesses"
            :filters="filters"
            :filtered-businesses="filteredBusinesses"
            :current-page="currentPage"
            :total-pages="totalPages"
            :pagination-start="paginationStart"
            :pagination-end="paginationEnd"
            :display-pages="displayPages"
            :show-tooltip-for="showTooltipFor"
            @search-businesses="searchBusinesses"
            @update-filter="updateFilter"
            @change-page="changePage"
            @toggle-sort-direction="toggleSortDirection"
            @open-business-modal="openBusinessModal"
            @toggle-business-featured="toggleBusinessFeatured"
            @toggle-business-status="toggleBusinessStatus"
            @show-archive-reason="showArchiveReason"
            @update-tooltip="updateTooltip"
          />
        </div>

        <!-- Eventos Tab -->
        <div v-if="activeTab === 'events'" class="animate-fadeIn">
          <events-section
            :events="paginatedEvents"
            :filters="eventsFilters"
            :filtered-events="filteredEvents"
            :current-page="eventsCurrentPage"
            :total-pages="totalEventsPages"
            :pagination-start="eventsPaginationStart"
            :pagination-end="eventsPaginationEnd"
            :display-pages="eventsDisplayPages"
            @search-events="searchEvents"
            @update-filter="updateEventsFilter"
            @change-page="changeEventsPage"
            @toggle-sort-direction="toggleEventsSortDirection"
            @open-event-modal="openEventModal"
            @toggle-event-featured="toggleEventFeatured"
            @toggle-event-home="toggleEventHome"
            @change-event-status="changeEventStatus"
          />
        </div>

        <!-- Blogs Tab -->
        <div v-if="activeTab === 'blogs'" class="animate-fadeIn">
          <blogs-section
            :blogs="paginatedBlogs"
            :filters="blogsFilters"
            :filtered-blogs="filteredBlogs"
            :current-page="blogsCurrentPage"
            :total-pages="totalBlogsPages"
            :pagination-start="blogsPaginationStart"
            :pagination-end="blogsPaginationEnd"
            :display-pages="blogsDisplayPages"
            @search-blogs="searchBlogs"
            @update-filter="updateBlogsFilter"
            @change-page="changeBlogsPage"
            @toggle-sort-direction="toggleBlogsSortDirection"
            @open-blog-modal="openBlogModal"
            @toggle-blog-featured="toggleBlogFeatured"
            @toggle-blog-status="toggleBlogStatus"
          />
        </div>
      </div>
    </div>
    
    <!-- Business Modal -->
    <div v-if="showBusinessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div class="bg-white rounded-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-900">
            {{ isEditingBusiness ? 'Editar Comercio' : 'Añadir Comercio' }}
          </h3>
          <button @click="closeBusinessModal" class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="saveBusiness" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Columna 1 - Información Básica -->
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Comercio</label>
                <input v-model="businessForm.title" type="text" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-all">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <textarea v-model="businessForm.address" rows="2" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-all"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input v-model="businessForm.phone" type="text" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-all">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input v-model="businessForm.email" type="email" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-all">
              </div>
              
              <!-- Nueva sección de Comodidades/Especialidades -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Especialidades / Comodidades</label>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div class="mb-3">
                    <p class="text-xs text-gray-500 mb-2">
                      Ingrese especialidades o comodidades para este comercio (max. 10)
                    </p>
                    <div class="flex flex-wrap gap-2 mt-2">
                      <div 
                        v-for="(amenity, index) in amenities" 
                        :key="index"
                        class="flex items-center bg-orange-100 text-orange-800 px-2.5 py-1.5 rounded-full text-sm"
                      >
                        <span>{{ amenity }}</span>
                        <button 
                          type="button" 
                          @click="removeAmenity(index)"
                          class="ml-1 text-orange-600 hover:text-orange-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <input 
                      v-model="newAmenity" 
                      @keyup.enter.prevent="addAmenity" 
                      type="text" 
                      placeholder="Ej: Nacional, Pescado/mariscos, WiFi, etc."
                      class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                    <button 
                      type="button" 
                      @click="addAmenity" 
                      class="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Añadir
                    </button>
                  </div>
                  <div class="mt-3">
                    <p class="text-xs text-gray-500 mb-1">Ejemplos populares:</p>
                    <div class="flex flex-wrap gap-1.5 mt-1">
                      <button 
                        v-for="suggestion in amenitySuggestions" 
                        :key="suggestion" 
                        @click="newAmenity = suggestion; addAmenity()"
                        type="button"
                        class="text-xs px-2.5 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 transition-colors"
                      >
                        {{ suggestion }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea v-model="businessForm.description" rows="4" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 transition-all"></textarea>
              </div>
              
              <!-- Horario - Movido a la primera columna para evitar choque con el mapa -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Horario</label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Días</label>
                    <select v-model="scheduleForm.days" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                      <option value="Lun-Vie">Lun-Vie</option>
                      <option value="Lun-Sáb">Lun-Sáb</option>
                      <option value="Lun-Dom">Lun-Dom</option>
                      <option value="24/7">24/7</option>
                      <option value="custom">Personalizado</option>
                    </select>
                    <input v-if="scheduleForm.days === 'custom'" v-model="scheduleForm.customDays" placeholder="Ejemplo: Mar, Jue, Sáb" class="w-full mt-2 rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                  </div>
                  <div v-if="scheduleForm.days !== '24/7'">
                    <label class="block text-xs text-gray-500 mb-1">Hora inicio</label>
                    <input type="time" v-model="scheduleForm.startTime" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                  </div>
                  <div v-if="scheduleForm.days !== '24/7'">
                    <label class="block text-xs text-gray-500 mb-1">Hora fin</label>
                    <input type="time" v-model="scheduleForm.endTime" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Columna 2 - Categorización, Ubicación e Imágenes -->
            <div class="space-y-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select v-model="businessForm.category" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                    <option value="Alojamiento">Alojamiento</option>
                    <option value="Restaurante y bar">Restaurante y bar</option>
                    <option value="Entretenimiento">Entretenimiento</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Comercio</label>
                  <select v-model="businessForm.property_type" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                    <template v-if="businessForm.category === 'Alojamiento'">
                      <option v-for="type in propertyTypes.Alojamiento" :key="type" :value="type">{{ type }}</option>
                    </template>
                    <template v-else-if="businessForm.category === 'Restaurante y bar'">
                      <option v-for="type in propertyTypes['Restaurante y bar']" :key="type" :value="type">{{ type }}</option>
                    </template>
                    <template v-else-if="businessForm.category === 'Entretenimiento'">
                      <option v-for="type in propertyTypes.Entretenimiento" :key="type" :value="type">{{ type }}</option>
                    </template>
                  </select>
                </div>
              </div>

              <!-- Ubicación en mapa -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ubicación en Mapa</label>
                <div id="map-container" class="border border-gray-300 rounded-lg overflow-hidden h-64 mb-3" ref="mapContainer">
                  <!-- El mapa se insertará aquí -->
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Latitud</label>
                    <input 
                      v-model="businessForm.lat" 
                      type="text" 
                      step="0.000000001" 
                      class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500 mb-1">Longitud</label>
                    <input 
                      v-model="businessForm.lng" 
                      type="text" 
                      step="0.000000001" 
                      class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                  </div>
                </div>
              </div>
              
              <!-- Sección de imágenes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Imágenes</label>
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Imagen Principal</label>
                  <input type="file" accept="image/*" @change="handleMainImageUpload" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100">
                  <div v-if="mainImagePreview" class="mt-3">
                    <img :src="mainImagePreview" alt="Vista previa" class="h-20 w-20 object-cover rounded-lg border border-gray-200">
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Imágenes Adicionales (hasta 9)</label>
                  <input type="file" accept="image/*" multiple @change="handleAdditionalImagesUpload" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100">
                  <div v-if="additionalImagePreviews.length > 0" class="mt-3 grid grid-cols-3 gap-3">
                    <div v-for="(image, index) in additionalImagePreviews" :key="index" class="relative">
                      <img :src="image" alt="Vista previa" class="h-20 w-20 object-cover rounded-lg border border-gray-200">
                      <button type="button" @click="removeAdditionalImage(index)" class="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200 shadow-sm border border-red-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">{{ additionalImagePreviews.length }}/9 imágenes seleccionadas</p>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-gray-200 flex items-center justify-end space-x-3">
            <button type="button" @click="closeBusinessModal" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" class="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-sm transition-colors">
              {{ isEditingBusiness ? 'Guardar Cambios' : 'Crear Comercio' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Event Modal -->
    <div v-if="showEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div class="bg-white rounded-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-900">
            {{ isEditingEvent ? 'Editar Evento' : 'Añadir Evento' }}
          </h3>
          <button @click="closeEventModal" class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="saveEvent" class="space-y-6">
          <!-- Contenido del formulario para eventos -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre del Evento</label>
                <input v-model="eventForm.event_name" type="text" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                <input v-model="eventForm.location" type="text" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
                <select v-model="eventForm.event_type" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                  <option value="Cultural">Cultural</option>
                  <option value="Deportivo">Deportivo</option>
                  <option value="Musical">Musical</option>
                  <option value="Gastronómico">Gastronómico</option>
                  <option value="Educativo">Educativo</option>
                  <option value="Turístico">Turístico</option>
                  <option value="Festival">Festival</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Precio (0 para eventos gratuitos)</label>
                <input v-model.number="eventForm.price" type="number" min="0" step="0.01" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select v-model="eventForm.status" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                  <option value="activo">Activo</option>
                  <option value="pospuesto">Pospuesto</option>
                  <option value="cancelado">Cancelado</option>
                  <option value="completado">Completado</option>
                </select>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <input v-model="eventForm.is_featured" type="checkbox" id="is_featured" class="rounded border-gray-300 text-orange-600 focus:ring-orange-500">
                  <label for="is_featured" class="ml-2 text-sm text-gray-700">Destacado</label>
                </div>
                <div class="flex items-center">
                  <input v-model="eventForm.is_home" type="checkbox" id="is_home" class="rounded border-gray-300 text-orange-600 focus:ring-orange-500">
                  <label for="is_home" class="ml-2 text-sm text-gray-700">Mostrar en Portada</label>
                </div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Fecha del Evento</label>
                <input v-model="eventForm.event_date" type="date" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Hora de Inicio</label>
                  <input v-model="eventForm.event_time" type="time" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Hora de Fin</label>
                  <input v-model="eventForm.end_time" type="time" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea v-model="eventForm.description" rows="5" class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Imagen del Evento</label>
                <input type="file" accept="image/*" @change="handleEventImageUpload" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100">
                <div v-if="eventImagePreview" class="mt-3">
                  <img :src="eventImagePreview" alt="Vista previa del evento" class="h-40 w-full object-cover rounded-lg border border-gray-200">
                </div>
              </div>
            </div>
          </div>
          
          <div class="pt-6 border-t border-gray-200 flex items-center justify-end space-x-3">
            <button type="button" @click="closeEventModal" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" class="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-sm transition-colors">
              {{ isEditingEvent ? 'Guardar Cambios' : 'Crear Evento' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Blog Modal -->
    <div v-if="showBlogModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
      <div class="bg-white rounded-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-900">
            {{ isEditingBlog ? 'Editar Blog Post' : 'Añadir Blog Post' }}
          </h3>
          <button @click="closeBlogModal" class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="saveBlog" class="space-y-6">
          <!-- Contenido del formulario para blogs -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input v-model="blogForm.title" type="text" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select v-model="blogForm.category" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                  <option value="Noticias">Noticias</option>
                  <option value="Cultura">Cultura</option>
                  <option value="Gastronomía">Gastronomía</option>
                  <option value="Turismo">Turismo</option>
                  <option value="Eventos">Eventos</option>
                  <option value="Consejos">Consejos</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <input v-model="blogForm.is_featured" type="checkbox" id="blog_is_featured" class="rounded border-gray-300 text-orange-600 focus:ring-orange-500">
                  <label for="blog_is_featured" class="ml-2 text-sm text-gray-700">Destacado</label>
                </div>
                <div class="flex items-center">
                  <input v-model="blogForm.active" type="checkbox" id="blog_active" class="rounded border-gray-300 text-orange-600 focus:ring-orange-500">
                  <label for="blog_active" class="ml-2 text-sm text-gray-700">Activo</label>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Imagen de Portada</label>
                <input type="file" accept="image/*" @change="handleBlogImageUpload" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100">
                <div v-if="blogImagePreview" class="mt-3">
                  <img :src="blogImagePreview" alt="Vista previa del blog" class="h-40 w-full object-cover rounded-lg border border-gray-200">
                </div>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
                <textarea v-model="blogForm.content" rows="12" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
              </div>
              
              <div class="text-sm text-gray-500">
                <p class="mb-1 font-medium">Consejos para escribir:</p>
                <ul class="list-disc pl-5 space-y-1">
                  <li>Utiliza párrafos cortos para mejor legibilidad</li>
                  <li>Incluye subtítulos para organizar el contenido</li>
                  <li>Agrega información relevante para los visitantes</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="pt-6 border-t border-gray-200 flex items-center justify-end space-x-3">
            <button type="button" @click="closeBlogModal" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" class="px-5 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-sm transition-colors">
              {{ isEditingBlog ? 'Guardar Cambios' : 'Crear Blog Post' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para razón de archivo -->
    <div v-if="showArchiveModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <div class="mb-5">
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Desactivar Comercio
          </h3>
          <p class="text-gray-600">Por favor, ingrese el motivo por el cual desea desactivar este comercio:</p>
        </div>
        <textarea 
          v-model="archiveReason" 
          rows="3" 
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 mb-5"
          placeholder="Motivo de desactivación..."
        ></textarea>
        <div class="flex justify-end space-x-3">
          <button 
            @click="cancelArchive" 
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button 
            @click="confirmArchive" 
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm transition-colors"
          >
            Desactivar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para mostrar razón de archivo -->
    <div v-if="showArchiveReasonModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <div class="mb-5">
          <h3 class="text-xl font-bold text-gray-900 mb-4">
            Razón de Desactivación
          </h3>
          <div class="mb-4">
            <p class="text-sm text-gray-500 mb-1">Comercio:</p>
            <p class="font-medium text-gray-900">{{ selectedBusiness?.title || 'N/A' }}</p>
          </div>
          <div class="mb-4">
            <p class="text-sm text-gray-500 mb-1">Fecha de desactivación:</p>
            <p class="font-medium text-gray-900">{{ formatArchiveDate(selectedBusiness?.archived_at) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-1">Motivo:</p>
            <div class="mt-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p class="text-gray-800">{{ selectedBusiness?.archived_reason || 'No se especificó un motivo' }}</p>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button 
            @click="showArchiveReasonModal = false" 
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div v-if="notification.show" 
      class="fixed bottom-4 right-4 bg-white shadow-lg rounded-xl p-4 z-50 flex items-start max-w-sm transition-all transform translate-y-0 opacity-100"
      :class="{
        'bg-green-50 border border-green-100': notification.type === 'success',
        'bg-red-50 border border-red-100': notification.type === 'error'
      }"
    >
      <div v-if="notification.type === 'success'" class="text-green-500 mr-3 bg-green-100 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div v-if="notification.type === 'error'" class="text-red-500 mr-3 bg-red-100 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <div class="font-medium" :class="{
          'text-green-800': notification.type === 'success',
          'text-red-800': notification.type === 'error'
        }">
          {{ notification.title }}
        </div>
        <div class="text-sm text-gray-600">{{ notification.message }}</div>
      </div>
      <button @click="notification.show = false" class="ml-auto text-gray-400 hover:text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from '~/src/config/axios';
import StatsCards from '@/components/admin/StatsCards.vue';
import BusinessSection from '@/components/admin/BusinessSection.vue';
import EventsSection from '@/components/admin/EventsSection.vue';
import BlogsSection from '@/components/admin/BlogsSection.vue';

export default {
  components: {
    StatsCards,
    BusinessSection,
    EventsSection,
    BlogsSection
  },
  setup() {
    // Router
    const router = useRouter();

    // Estado del usuario
    const user = ref({
      id: null,
      first_name: '',
      last_name: '',
      email: '',
      role: 'admin' // Valor por defecto para desarrollo
    });

    // Estado de las tabs
    const activeTab = ref('comercios');

    // Estado de datos
    const stats = ref({
      totalBusinesses: 0,
      totalEvents: 0,
      totalBlogs: 0
    });

    const businesses = ref([]);
    const events = ref([]);
    const blogs = ref([]);

    // Búsqueda
    const searchQuery = ref('');
    const eventsSearchQuery = ref('');
    const blogsSearchQuery = ref('');

    // Paginación
    const itemsPerPage = 10;
    const currentPage = ref(1);
    const eventsCurrentPage = ref(1);
    const blogsCurrentPage = ref(1);

    // Estados de loading
    const isLoading = ref(false);

    // Estados de modales
    const showBusinessModal = ref(false);
    const showEventModal = ref(false);
    const showBlogModal = ref(false);
    const showArchiveModal = ref(false);
    const showArchiveReasonModal = ref(false);

    // Para mostrar tooltip en botones de destacar
    const showTooltipFor = ref(null);

    // Estados de edición
    const isEditingBusiness = ref(false);
    const isEditingEvent = ref(false);
    const isEditingBlog = ref(false);

    // Referencias DOM
    const mapContainer = ref(null);
    let map = null;
    let marker = null;

    // Variables para archivar
    const archiveReason = ref('');
    const businessToArchive = ref(null);
    const selectedBusiness = ref(null);
    const selectedEvent = ref(null);
    const selectedBlog = ref(null);

    // Formularios
    const businessForm = ref({
      id: null,
      title: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      category: 'Restaurante y bar',
      schedule: '',
      property_type: 'Restaurante',
      status: 'for-rent',
      image: '',
      isFeatured: false,
      host_id: null,
      views: 0,
      average_rating: 0,
      lat: 15.5046, // Default a San Pedro Sula
      lng: -88.0248,
      archived: false
    });

    // Formularios para events y blogs
    const eventForm = ref({
      id: null,
      event_name: '',
      description: '',
      location: '',
      event_date: '',
      event_time: '',
      end_time: '',
      event_type: '',
      status: 'activo',
      price: 0,
      image_url: '',
      is_featured: false,
      is_home: false,
      organizer_id: null
    });

    const blogForm = ref({
      id: null,
      title: '',
      content: '',
      category: '',
      image_url: '',
      is_featured: false,
      active: true,
      author_id: null
    });

    // Formulario para horario
    const scheduleForm = ref({
      days: 'Lun-Vie',
      startTime: '09:00',
      endTime: '18:00',
      customDays: ''
    });

    // Referencias para imágenes
    const mainImageFile = ref(null);
    const additionalImageFiles = ref([]);
    const mainImagePreview = ref(null);
    const additionalImagePreviews = ref([]);
    const eventImageFile = ref(null);
    const eventImagePreview = ref(null);
    const blogImageFile = ref(null);
    const blogImagePreview = ref(null);

    // Notificación
    const notification = ref({
      show: false,
      type: 'success',
      title: '',
      message: ''
    });

    // Definir opciones para los filtros
    const propertyTypes = {
      'Alojamiento': ['Hotel', 'Motel'],
      'Restaurante y bar': ['Cafetería', 'Restaurante', 'Bar y restaurante', 'Comida rápida', 'Repostería', 'Heladería', 'Bebidas', 'Bar'],
      'Entretenimiento': ['Gym', 'Balneario', 'Belleza', 'Futbol', 'Motocross', 'Casino', 'Cine', 'Videojuegos']
    };

    // Filtros para comercios
    const filters = ref({
      category: '',
      property_type: '',
      status: '', // Siempre vacío para mostrar todos por defecto
      sortBy: 'title',
      sortDirection: 'asc'
    });

    // Filtros para eventos
    const eventsFilters = ref({
      event_type: '',
      status: '',
      date_filter: '',
      sortBy: 'event_date',
      sortDirection: 'asc'
    });

    // Filtros para blogs
    const blogsFilters = ref({
      category: '',
      active: '',
      sortBy: 'published_at',
      sortDirection: 'desc'
    });

    // Añadir después de los refs existentes
    const amenities = ref([]);
    const newAmenity = ref('');

    // Sugerencias basadas en tus ejemplos
    const amenitySuggestions = computed(() => {
      if (businessForm.value.category === 'Restaurante y bar') {
        return ['Nacional', 'Pescado/mariscos', 'Golosinas (Tacos, Baleadas, Enchiladas, etc.)', 'Hamburguesas/sándwich', 'Regional', 'Comida italiana', 'Comida asiática', 'Vegetariano'];
      } else if (businessForm.value.category === 'Alojamiento') {
        return ['Piscina', 'WiFi gratis', 'Desayuno incluido', 'Aire acondicionado', 'Estacionamiento', 'Servicio a la habitación', 'Pet friendly', 'Vista al mar'];
      } else if (businessForm.value.category === 'Entretenimiento') {
        return ['Área para niños', 'Deportes', 'Música en vivo', 'Servicio de bar', 'Atracciones acuáticas', 'Eventos especiales', 'Spa', 'Tours'];
      }
      return [];
    });

    // Función para añadir amenidad
    const addAmenity = () => {
      if (newAmenity.value.trim() && amenities.value.length< 10) {
        // Verificar si ya existe esta amenidad
        if (!amenities.value.includes(newAmenity.value.trim())) {
          amenities.value.push(newAmenity.value.trim());
        }
        newAmenity.value = '';
      } else if (amenities.value.length >= 10) {
        showNotification('error', 'Límite alcanzado', 'Máximo 10 especialidades por comercio');
      }
    };

    // Función para eliminar amenidad
    const removeAmenity = (index) => {
      amenities.value.splice(index, 1);
    };

    // COMPUTED PROPERTIES PARA COMERCIOS
    const filteredBusinesses = computed(() => {
      let result = [...businesses.value];
      
      // Filtro de búsqueda
      if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase().trim();
        result = result.filter(business => 
          business.title?.toLowerCase().includes(query) ||
          business.description?.toLowerCase().includes(query) ||
          business.address?.toLowerCase().includes(query) ||
          business.category?.toLowerCase().includes(query) ||
          business.property_type?.toLowerCase().includes(query)
        );
      }
      
      // Aplicar filtros de categoría y tipo
      if (filters.value.category) {
        result = result.filter(business => business.category === filters.value.category);
      }
      
      if (filters.value.property_type) {
        result = result.filter(business => business.property_type === filters.value.property_type);
      }
      
      // Filtro de estado simplificado
      if (filters.value.status === 'archived') {
        result = result.filter(business => business.archived === true);
      } else if (filters.value.status === 'active') {
        result = result.filter(business => business.archived !== true);
      }
      
      // Aplicar ordenamiento
      result.sort((a, b) => {
        let valueA = a[filters.value.sortBy];
        let valueB = b[filters.value.sortBy];
        
        // Manejo especial para fechas
        if (filters.value.sortBy === 'created_at' || filters.value.sortBy === 'updated_at' || filters.value.sortBy === 'archived_at') {
          valueA = valueA ? new Date(valueA).getTime() : 0;
          valueB = valueB ? new Date(valueB).getTime() : 0;
        }
        
        // Conversión a minúsculas para strings
        if (typeof valueA === 'string') valueA = valueA.toLowerCase();
        if (typeof valueB === 'string') valueB = valueB.toLowerCase();
        
        if (filters.value.sortDirection === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
      
      return result;
    });

    // COMPUTED PROPERTIES PARA EVENTOS
    const filteredEvents = computed(() => {
      let result = [...events.value];
      
      // Filtro de búsqueda
      if (eventsSearchQuery.value.trim()) {
        const query = eventsSearchQuery.value.toLowerCase().trim();
        result = result.filter(event => 
          event.event_name?.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query) ||
          event.location?.toLowerCase().includes(query) ||
          event.event_type?.toLowerCase().includes(query)
        );
      }
      
      // Filtro de tipo de evento
      if (eventsFilters.value.event_type) {
        result = result.filter(event => event.event_type === eventsFilters.value.event_type);
      }
      
      // Filtro de estado
      if (eventsFilters.value.status) {
        result = result.filter(event => event.status === eventsFilters.value.status);
      }
      
      // Filtro de fecha
      if (eventsFilters.value.date_filter) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (eventsFilters.value.date_filter === 'upcoming') {
          result = result.filter(event => {
            const eventDate = new Date(event.event_date);
            return eventDate >= today;
          });
        } else if (eventsFilters.value.date_filter === 'past') {
          result = result.filter(event => {
            const eventDate = new Date(event.event_date);
            return eventDate < today;
          });
        }
      }
      
      // Aplicar ordenamiento
      result.sort((a, b) => {
        let valueA = a[eventsFilters.value.sortBy];
        let valueB = b[eventsFilters.value.sortBy];
        
        // Manejo especial para fechas
        if (eventsFilters.value.sortBy === 'event_date' || eventsFilters.value.sortBy === 'created_at') {
          valueA = valueA ? new Date(valueA).getTime() : 0;
          valueB = valueB ? new Date(valueB).getTime() : 0;
        }
        
        // Conversión a minúsculas para strings
        if (typeof valueA === 'string') valueA = valueA.toLowerCase();
        if (typeof valueB === 'string') valueB = valueB.toLowerCase();
        
        if (eventsFilters.value.sortDirection === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
      
      return result;
    });

    // COMPUTED PROPERTIES PARA BLOGS
    const filteredBlogs = computed(() => {
      let result = [...blogs.value];
      
      // Filtro de búsqueda
      if (blogsSearchQuery.value.trim()) {
        const query = blogsSearchQuery.value.toLowerCase().trim();
        result = result.filter(blog => 
          blog.title?.toLowerCase().includes(query) ||
          blog.content?.toLowerCase().includes(query) ||
          blog.category?.toLowerCase().includes(query)
        );
      }
      
      // Filtro de categoría
      if (blogsFilters.value.category) {
        result = result.filter(blog => blog.category === blogsFilters.value.category);
      }
      
      // Filtro de estado
      if (blogsFilters.value.active !== '') {
        const isActive = blogsFilters.value.active === true || blogsFilters.value.active === 'true';
        result = result.filter(blog => blog.active === isActive);
      }
      
      // Aplicar ordenamiento
      result.sort((a, b) => {
        let valueA = a[blogsFilters.value.sortBy];
        let valueB = b[blogsFilters.value.sortBy];
        
        // Manejo especial para fechas
        if (blogsFilters.value.sortBy === 'published_at' || blogsFilters.value.sortBy === 'created_at') {
          valueA = valueA ? new Date(valueA).getTime() : 0;
          valueB = valueB ? new Date(valueB).getTime() : 0;
        }
        
        // Conversión a minúsculas para strings
        if (typeof valueA === 'string') valueA = valueA.toLowerCase();
        if (typeof valueB === 'string') valueB = valueB.toLowerCase();
        
        if (blogsFilters.value.sortDirection === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
      
      return result;
    });

    // Verificar límites de propiedades destacadas
    const featuredCountByCategory = computed(() => {
      const counts = {
        'Alojamiento': 0,
        'Restaurante y bar': 0,
        'Entretenimiento': 0
      };
      
      businesses.value.forEach(business => {
        if (business.isFeatured && business.category && !business.archived) {
          counts[business.category] = (counts[business.category] || 0) + 1;
        }
      });
      
      return counts;
    });

    const canBeHighlighted = (business) => {
      // Si ya está destacado, siempre permitir (para poder quitarlo)
      if (business.isFeatured) return true;
      
      // Si está archivado, no permitir destacar
      if (business.archived) return false;
      
      // Verificar límites por categoría
      if (business.category === 'Alojamiento') {
        return featuredCountByCategory.value['Alojamiento'] < 10;
      } else if (business.category === 'Restaurante y bar') {
        return featuredCountByCategory.value['Restaurante y bar'] < 6;
      } else if (business.category === 'Entretenimiento') {
        return true; // Sin límite para entretenimiento
      }
      
      return true;
    };

    // PAGINACIÓN PARA COMERCIOS
    const totalPages = computed(() => {
      return Math.ceil(filteredBusinesses.value.length / itemsPerPage);
    });

    const paginatedBusinesses = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredBusinesses.value.slice(startIndex, endIndex);
    });

    const paginationStart = computed(() => {
      return filteredBusinesses.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage + 1;
    });

    const paginationEnd = computed(() => {
      return Math.min(currentPage.value * itemsPerPage, filteredBusinesses.value.length);
    });

    const displayPages = computed(() => {
      const total = totalPages.value;
      const current = currentPage.value;
      const pages = [];
      
      if (total <= 5) {
        // Mostrar todas las páginas si son 5 o menos
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Siempre mostrar la primera página
        pages.push(1);
        
        // Calcular rango central
        let start = Math.max(2, current - 1);
        let end = Math.min(total - 1, current + 1);
        
        // Añadir elipsis si necesario
        if (start > 2) {
          pages.push('...');
        }
        
        // Añadir páginas del rango
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        
        // Añadir elipsis si necesario
        if (end < total - 1) {
          pages.push('...');
        }
        
        // Siempre mostrar la última página
        pages.push(total);
      }
      
      return pages;
    });

    // PAGINACIÓN PARA EVENTOS
    const totalEventsPages = computed(() => {
      return Math.ceil(filteredEvents.value.length / itemsPerPage);
    });

    const paginatedEvents = computed(() => {
      const startIndex = (eventsCurrentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredEvents.value.slice(startIndex, endIndex);
    });

    const eventsPaginationStart = computed(() => {
      return filteredEvents.value.length === 0 ? 0 : (eventsCurrentPage.value - 1) * itemsPerPage + 1;
    });

    const eventsPaginationEnd = computed(() => {
      return Math.min(eventsCurrentPage.value * itemsPerPage, filteredEvents.value.length);
    });

    const eventsDisplayPages = computed(() => {
      const total = totalEventsPages.value;
      const current = eventsCurrentPage.value;
      const pages = [];
      
      if (total <= 5) {
        // Mostrar todas las páginas si son 5 o menos
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Siempre mostrar la primera página
        pages.push(1);
        
        // Calcular rango central
        let start = Math.max(2, current - 1);
        let end = Math.min(total - 1, current + 1);
        
        // Añadir elipsis si necesario
        if (start > 2) {
          pages.push('...');
        }
        
        // Añadir páginas del rango
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        
        // Añadir elipsis si necesario
        if (end < total - 1) {
          pages.push('...');
        }
        
        // Siempre mostrar la última página
        pages.push(total);
      }
      
      return pages;
    });

    // PAGINACIÓN PARA BLOGS
    const totalBlogsPages = computed(() => {
      return Math.ceil(filteredBlogs.value.length / itemsPerPage);
    });

    const paginatedBlogs = computed(() => {
      const startIndex = (blogsCurrentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredBlogs.value.slice(startIndex, endIndex);
    });

    const blogsPaginationStart = computed(() => {
      return filteredBlogs.value.length === 0 ? 0 : (blogsCurrentPage.value - 1) * itemsPerPage + 1;
    });

    const blogsPaginationEnd = computed(() => {
      return Math.min(blogsCurrentPage.value * itemsPerPage, filteredBlogs.value.length);
    });

    const blogsDisplayPages = computed(() => {
      const total = totalBlogsPages.value;
      const current = blogsCurrentPage.value;
      const pages = [];
      
      if (total <= 5) {
        // Mostrar todas las páginas si son 5 o menos
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Siempre mostrar la primera página
        pages.push(1);
        
        // Calcular rango central
        let start = Math.max(2, current - 1);
        let end = Math.min(total - 1, current + 1);
        
        // Añadir elipsis si necesario
        if (start > 2) {
          pages.push('...');
        }
        
        // Añadir páginas del rango
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        
        // Añadir elipsis si necesario
        if (end < total - 1) {
          pages.push('...');
        }
        
        // Siempre mostrar la última página
        pages.push(total);
      }
      
      return pages;
    });

    const debugBusinesses = () => {
      console.log('=== DIAGNÓSTICO DE COMERCIOS ===');
      console.log('Total de comercios:', businesses.value.length);
      console.log('Comercios archivados:', businesses.value.filter(b => b.archived).length);
      console.log('Filtro estado actual:', filters.value.status);
      console.log('Comercios filtrados:', filteredBusinesses.value.length);
      console.log('Comercios archivados filtrados:', filteredBusinesses.value.filter(b => b.archived).length);
      
      console.log('=== INSPECCIÓN DE COMERCIOS ARCHIVADOS ===');
      const archivedBusinesses = businesses.value.filter(b => b.archived);
      if (archivedBusinesses.length === 0) {
        console.log('NO HAY COMERCIOS ARCHIVADOS EN LA LISTA');
      } else {
        console.table(archivedBusinesses.map(b => ({
          id: b.id, 
          title: b.title, 
          archived: b.archived,
          status: b.status
        })));
      }
      
      showNotification('success', 'Diagnóstico', `Total: ${businesses.value.length}, Archivados: ${businesses.value.filter(b => b.archived).length}`);
    };

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value && page !== '...') {
        currentPage.value = page;
      }
    };

    const changeEventsPage = (page) => {
      if (page >= 1 && page <= totalEventsPages.value && page !== '...') {
        eventsCurrentPage.value = page;
      }
    };

    const changeBlogsPage = (page) => {
      if (page >= 1 && page <= totalBlogsPages.value && page !== '...') {
        blogsCurrentPage.value = page;
      }
    };

    // Métodos para manejo de imágenes
    const handleMainImageUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      mainImageFile.value = file;
      
      // Crear URL para vista previa
      mainImagePreview.value = URL.createObjectURL(file);
    };

    const handleAdditionalImagesUpload = (event) => {
      const files = Array.from(event.target.files);
      
      // Limitar a 9 imágenes
      const totalImages = additionalImageFiles.value.length + files.length;
      if (totalImages > 9) {
        showNotification('error', 'Error', 'Solo se permite un máximo de 9 imágenes adicionales');
        return;
      }
      
      // Agregar archivos
      files.forEach(file => {
        additionalImageFiles.value.push(file);
        additionalImagePreviews.value.push(URL.createObjectURL(file));
      });
    };

    const handleEventImageUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      eventImageFile.value = file;
      eventImagePreview.value = URL.createObjectURL(file);
    };

    const handleBlogImageUpload = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      blogImageFile.value = file;
      blogImagePreview.value = URL.createObjectURL(file);
    };

    const removeAdditionalImage = (index) => {
      additionalImageFiles.value.splice(index, 1);
      URL.revokeObjectURL(additionalImagePreviews.value[index]);
      additionalImagePreviews.value.splice(index, 1);
    };

    // Buscar comercios
    const searchBusinesses = () => {
      // Resetear paginación al buscar
      currentPage.value = 1;
    };

    // Buscar eventos
    const searchEvents = (query) => {
      eventsSearchQuery.value = query;
      eventsCurrentPage.value = 1;
    };

    // Buscar blogs
    const searchBlogs = (query) => {
      blogsSearchQuery.value = query;
      blogsCurrentPage.value = 1;
    };

    // Inicializar mapa con Leaflet
    const initMap = () => {
      if (!mapContainer.value) return;
      
      // Asegurarse de que Leaflet está disponible
      if (typeof window.L !== 'undefined') {
        // Crear el mapa centrado en la ubicación actual del formulario
        map = window.L.map(mapContainer.value).setView(
          [businessForm.value.lat || 15.5046, businessForm.value.lng || -88.0248], 
          15
        );
        
        // Añadir la capa de OpenStreetMap
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);
        
        // Añadir un marcador en la posición inicial
        marker = window.L.marker(
          [businessForm.value.lat || 15.5046, businessForm.value.lng || -88.0248],
          { draggable: true }
        ).addTo(map);
        
        // Actualizar las coordenadas cuando se arrastra el marcador
        marker.on('dragend', function() {
          const position = marker.getLatLng();
          businessForm.value.lat = position.lat;
          businessForm.value.lng = position.lng;
        });
        
        // Permitir hacer clic en el mapa para mover el marcador
        map.on('click', function(e) {
          marker.setLatLng(e.latlng);
          businessForm.value.lat = e.latlng.lat;
          businessForm.value.lng = e.latlng.lng;
        });
      }
    };

    const updateMap = () => {
      if (!map || !marker) return;
      
      try {
        // Validar que lat/lng tengan valores numéricos
        const lat = businessForm.value.lat ? parseFloat(businessForm.value.lat) : 15.5046;
        const lng = businessForm.value.lng ? parseFloat(businessForm.value.lng) : -88.0248;
        
        // Comprobar que son números válidos
        if (isNaN(lat) || isNaN(lng)) {
          console.warn('Coordenadas inválidas:', businessForm.value.lat, businessForm.value.lng);
          return;
        }
        
        // Validar el rango de las coordenadas
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          console.warn('Coordenadas fuera de rango:', lat, lng);
          return;
        }
        
        // Actualizar la posición del mapa y marcador
        const position = [lat, lng];
        map.setView(position);
        marker.setLatLng(position);
      } catch (error) {
        console.error('Error al actualizar el mapa:', error);
      }
    };

    // Métodos
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          router.push('/auth/login');
          return;
        }
        
        // Verificar token
        try {
          const tokenParts = token.split('.');
          if (tokenParts.length === 3) {
            const payload = JSON.parse(atob(tokenParts[1]));
            
            if (!payload.role || payload.role !== 'admin') {
              console.warn('Token no tiene rol de admin');
            }
          }
        } catch (e) {
          console.error('Error decodificando token:', e);
        }
        
        const response = await axios.get('/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data?.success) {
          user.value = response.data.data.user || response.data.data;
          
          // Verificar que el usuario es admin
          if (user.value.role !== 'admin') {
            showNotification('error', 'Acceso denegado', 'Se requieren privilegios de administrador.');
            setTimeout(() => router.push('/'), 1500);
            return;
          }
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
        router.push('/auth/login');
      }
    };

    const validateCoordinates = () => {
      // Expresión regular para validar coordenadas con múltiples decimales
      const latRegex = /^-?([1-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$/;
      const lngRegex = /^-?((1[0-7]|[1-9])?[0-9](\.[0-9]+)?|180(\.0+)?)$/;
      
      // Convertir a string para asegurar que funciona con diferentes tipos de datos
      const latStr = businessForm.value.lat ? businessForm.value.lat.toString() : "";
      const lngStr = businessForm.value.lng ? businessForm.value.lng.toString() : "";
      
      const isLatValid = latRegex.test(latStr);
      const isLngValid = lngRegex.test(lngStr);
      
      if (!isLatValid) {
        showNotification('error', 'Error', 'Latitud inválida. Debe estar entre -90 y 90 grados');
        return false;
      }
      
      if (!isLngValid) {
        showNotification('error', 'Error', 'Longitud inválida. Debe estar entre -180 y 180 grados');
        return false;
      }
      
      return true;
    };

    const loadBusinesses = async () => {
      try {
        isLoading.value = true;
        const token = localStorage.getItem('access_token');
        
        const response = await axios.get('/api/properties/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data?.success) {
          businesses.value = response.data.data.properties || [];
          
          // Convertir explícitamente archived a booleano
          businesses.value.forEach(business => {
            business.archived = business.archived === 1 || business.archived === true;
          });
          
          // Actualizar estadísticas
          stats.value.totalBusinesses = businesses.value.length;
        } else {
          console.error("Error en respuesta:", response.data);
          showNotification('error', 'Error', 'La respuesta del servidor no es válida');
        }
      } catch (error) {
        console.error('Error al cargar comercios:', error);
        console.error('Detalles del error:', error.response?.data || error.message);
        showNotification('error', 'Error', 'Error al cargar los comercios');
      } finally {
        isLoading.value = false;
      }
    };

    const loadEvents = async () => {
      try {
        isLoading.value = true;
        const token = localStorage.getItem('access_token');
        
        const response = await axios.get('/api/events', {
          headers: { 'Authorization': `Bearer ${token}` },
          params: {
            limit: 100 // Cargar todos los eventos
          }
        });
        
        if (response.data?.success) {
          events.value = response.data.data.events || [];
          
          // Actualizar estadísticas
          stats.value.totalEvents = events.value.length;
        }
      } catch (error) {
        console.error('Error al cargar eventos:', error);
        showNotification('error', 'Error', 'Error al cargar eventos');
      } finally {
        isLoading.value = false;
      }
    };

    const loadBlogs = async () => {
      try {
        isLoading.value = true;
        const token = localStorage.getItem('access_token');
        
        const response = await axios.get('/api/blogs', {
          headers: { 'Authorization': `Bearer ${token}` },
          params: {
            limit: 100 // Cargar todos los blogs
          }
        });
        
        if (response.data?.success) {
          blogs.value = response.data.data.blogs || [];
          
          // Actualizar estadísticas
          stats.value.totalBlogs = blogs.value.length;
        }
      } catch (error) {
        console.error('Error al cargar blogs:', error);
        showNotification('error', 'Error', 'Error al cargar blogs');
      } finally {
        isLoading.value = false;
      }
    };

    const parseScheduleString = (scheduleString) => {
      // Ejemplo: "Lun-Vie: 09:00 - 18:00"
      if (!scheduleString) return;

      try {
        // Separar días y horas
        const parts = scheduleString.split(':');
        
        if (parts.length >= 2) {
          const days = parts[0].trim();
          const hours = parts.slice(1).join(':').trim();
          
          // Asignar días
          if (days === '24/7') {
            scheduleForm.value.days = '24/7';
          } else if (days === 'Lun-Vie' || days === 'Lun-Sáb' || days === 'Lun-Dom') {
            scheduleForm.value.days = days;
          } else {
            scheduleForm.value.days = 'custom';
            scheduleForm.value.customDays = days;
          }
          
          // Asignar horas si no es 24/7
          if (days !== '24/7' && hours) {
            const timeMatch = hours.match(/(\d{1,2}:\d{2}).*?(\d{1,2}:\d{2})/);
            if (timeMatch) {
              scheduleForm.value.startTime = timeMatch[1];
              scheduleForm.value.endTime = timeMatch[2];
            }
          }
        }
      } catch (error) {
        console.error('Error al parsear horario:', error);
      }
    };

    const buildScheduleString = () => {
      if (scheduleForm.value.days === '24/7') {
        return '24/7';
      }

      const days = scheduleForm.value.days === 'custom' 
        ? scheduleForm.value.customDays 
        : scheduleForm.value.days;
        
      return `${days}: ${scheduleForm.value.startTime} - ${scheduleForm.value.endTime}`;
    };

    const openBusinessModal = async (businessData = null) => {
      // Resetear formularios
      resetBusinessForm();

      if (businessData) {
        isEditingBusiness.value = true;
        // Clonar para evitar modificaciones directas
        businessForm.value = { 
          ...businessData,
          // Asegurarse que lat/lng sean números
          lat: parseFloat(businessData.lat) || 15.5046,
          lng: parseFloat(businessData.lng) || -88.0248
        };
        
        // Parsear horario para el formulario
        parseScheduleString(businessData.schedule || '');
        
        // Si hay una imagen principal, mostrarla
        if (businessData.image) {
          mainImagePreview.value = businessData.image;
        }
        
        // Obtener imágenes adicionales
        try {
          const token = localStorage.getItem('access_token');
          const response = await axios.get(`/api/properties/${businessData.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.data?.success && response.data.data) {
            if (response.data.data.additional_images && response.data.data.additional_images.length > 0) {
              additionalImagePreviews.value = [...response.data.data.additional_images];
            }
          }
        } catch (error) {
          console.error('Error al cargar imágenes adicionales:', error);
        }
        
        // Cargar amenidades si existen
        try {
          const token = localStorage.getItem('access_token');
          const response = await axios.get(`/api/properties/${businessData.id}/amenities`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.data?.success && response.data.data) {
            amenities.value = response.data.data.map(item => item.amenity);
          }
        } catch (error) {
          console.error('Error al cargar amenidades:', error);
        }
      } else {
        isEditingBusiness.value = false;
      }

      showBusinessModal.value = true;

      // Inicializar mapa después de que se muestre el modal
      nextTick(() => {
        initMap();
      });
    };

    // Métodos para eventos
    const openEventModal = (event = null) => {
      // Resetear formulario de evento
      eventForm.value = {
        id: null,
        event_name: '',
        description: '',
        location: '',
        event_date: '',
        event_time: '',
        end_time: '',
        event_type: 'Cultural',
        status: 'activo',
        price: 0,
        image_url: '',
        is_featured: false,
        is_home: false,
        organizer_id: user.value.id
      };
      
      eventImageFile.value = null;
      eventImagePreview.value = null;
      
      if (event) {
        isEditingEvent.value = true;
        eventForm.value = { ...event };
        selectedEvent.value = event;
        
        // Si hay una imagen, mostrarla
        if (event.image_url) {
          eventImagePreview.value = event.image_url;
        }
      } else {
        isEditingEvent.value = false;
        selectedEvent.value = null;
      }
      
      showEventModal.value = true;
    };

    // Métodos para blogs
    const openBlogModal = (blog = null) => {
      // Resetear formulario de blog
      blogForm.value = {
        id: null,
        title: '',
        content: '',
        category: 'Noticias',
        image_url: '',
        is_featured: false,
        active: true,
        author_id: user.value.id
      };
      
      blogImageFile.value = null;
      blogImagePreview.value = null;
      
      if (blog) {
        isEditingBlog.value = true;
        blogForm.value = { ...blog };
        selectedBlog.value = blog;
        
        // Si hay una imagen, mostrarla
        if (blog.image_url) {
          blogImagePreview.value = blog.image_url;
        }
      } else {
        isEditingBlog.value = false;
        selectedBlog.value = null;
      }
      
      showBlogModal.value = true;
    };

    const resetBusinessForm = () => {
      businessForm.value = {
        id: null,
        title: '',
        description: '',
        address: '',
        phone: '',
        email: '',
        category: 'Restaurante y bar',
        schedule: '',
        property_type: 'Restaurante',
        status: 'for-rent',
        image: '',
        isFeatured: false,
        views: 0,
        average_rating: 0,
        lat: 15.5046, // Default a San Pedro Sula
        lng: -88.0248,
        archived: false
      };

      scheduleForm.value = {
        days: 'Lun-Vie',
        startTime: '09:00',
        endTime: '18:00',
        customDays: ''
      };

      // Resetear imágenes
      mainImageFile.value = null;
      additionalImageFiles.value = [];
      mainImagePreview.value = null;
      additionalImagePreviews.value = [];
      
      // Resetear amenidades/especialidades
      amenities.value = [];
      newAmenity.value = '';
    };

    const closeBusinessModal = () => {
      showBusinessModal.value = false;
      resetBusinessForm();

      // Limpiar mapa
      if (map) {
        map.remove();
        map = null;
        marker = null;
      }
    };

    const closeEventModal = () => {
      showEventModal.value = false;
      selectedEvent.value = null;
      eventImageFile.value = null;
      eventImagePreview.value = null;
    };

    const closeBlogModal = () => {
      showBlogModal.value = false;
      selectedBlog.value = null;
      blogImageFile.value = null;
      blogImagePreview.value = null;
    };

    const saveBusiness = async () => {
      try {
        // Validar campos obligatorios
        if (!businessForm.value.title) {
          showNotification('error', 'Error', 'El título es obligatorio');
          return;
        }
        
        if (!businessForm.value.address) {
          showNotification('error', 'Error', 'La dirección es obligatoria');
          return;
        }
        
        if (!businessForm.value.category) {
          showNotification('error', 'Error', 'La categoría es obligatoria');
          return;
        }
        
        if (!businessForm.value.property_type) {
          showNotification('error', 'Error', 'El tipo de propiedad es obligatorio');
          return;
        }
        
        // Validar coordenadas
        if (!validateCoordinates()) {
          return;
        }
        
        // Construir horario y extraer horas
        const scheduleString = buildScheduleString();
        let startTime = null;
        let endTime = null;
        
        // Extraer startTime y endTime del horario si no es 24/7
        if (scheduleForm.value.days !== '24/7') {
          startTime = scheduleForm.value.startTime;
          endTime = scheduleForm.value.endTime;
        }
        
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        
        // Agregar campos básicos
        formData.append('title', businessForm.value.title || '');
        formData.append('description', businessForm.value.description || '');
        formData.append('address', businessForm.value.address || '');
        formData.append('phone', businessForm.value.phone || '');
        formData.append('email', businessForm.value.email || '');
        formData.append('category', businessForm.value.category || '');
        formData.append('property_type', businessForm.value.property_type || '');
        formData.append('schedule', scheduleString || '');
        
        // Agregar amenidades - asegurarse de que sean strings válidos
        if (amenities.value && amenities.value.length > 0) {
          amenities.value.forEach((amenity, index) => {
            if (amenity && typeof amenity === 'string') {
              formData.append(`amenities[${index}]`, amenity);
            }
          });
        }
        
        // Agregar start_time y end_time si existen
        if (startTime) formData.append('start_time', startTime);
        if (endTime) formData.append('end_time', endTime);
        
        // Convertir booleanos
        formData.append('isFeatured', businessForm.value.isFeatured ? '1' : '0');
        
        // Agregar coordenadas como strings
        if (businessForm.value.lat !== undefined && businessForm.value.lat !== null) {
          formData.append('lat', businessForm.value.lat.toString());
        }
        if (businessForm.value.lng !== undefined && businessForm.value.lng !== null) {
          formData.append('lng', businessForm.value.lng.toString());
        }
        
        // Agregar imagen principal solo si hay un archivo nuevo
        if (mainImageFile.value) {
          formData.append('image', mainImageFile.value);
        }
        
        // Agregar imágenes adicionales si hay archivos nuevos
        if (additionalImageFiles.value && additionalImageFiles.value.length > 0) {
          additionalImageFiles.value.forEach(file => {
            formData.append('additional_images', file);
          });
        }
        
        // Mostrar notificación de carga
        showNotification('success', 'Procesando', 'Guardando datos del comercio...');
        
        // Configuración de la solicitud con tiempo de espera más largo
        const config = {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          timeout: 60000 // 60 segundos
        };
        
        let response;
        
        if (isEditingBusiness.value) {
          response = await axios.put(`/api/properties/${businessForm.value.id}`, formData, config);
        } else {
          response = await axios.post('/api/properties', formData, config);
        }
        
        if (response.data?.success) {
          showNotification('success', 'Éxito', `Comercio ${isEditingBusiness.value ? 'actualizado' : 'creado'} correctamente`);
          loadBusinesses();
          closeBusinessModal();
        } else {
          throw new Error(response.data?.message || 'La respuesta del servidor no indica éxito');
        }
      } catch (error) {
        console.error('Error al guardar comercio:', error);
        showNotification('error', 'Error', error.response?.data?.message || 'Error al guardar el comercio');
      }
    };

    // Implementar saveEvent
    const saveEvent = async () => {
      try {
        // Validar campos obligatorios
        if (!eventForm.value.event_name) {
          showNotification('error', 'Error', 'El nombre del evento es obligatorio');
          return;
        }
        
        if (!eventForm.value.event_date) {
          showNotification('error', 'Error', 'La fecha del evento es obligatoria');
          return;
        }
        
        if (!eventForm.value.event_type) {
          showNotification('error', 'Error', 'El tipo de evento es obligatorio');
          return;
        }
        
        const token = localStorage.getItem('access_token');
        const formData = new FormData();
        
        // Agregar campos básicos
        Object.keys(eventForm.value).forEach(key => {
          if (eventForm.value[key] !== null && eventForm.value[key] !== undefined) {
            if (typeof eventForm.value[key] === 'boolean') {
              formData.append(key, eventForm.value[key] ? '1' : '0');
            } else {
              formData.append(key, eventForm.value[key]);
            }
          }
        });
        
        // Agregar imagen si hay un archivo nuevo
        if (eventImageFile.value) {
          formData.append('image', eventImageFile.value);
        }
        
        // Mostrar notificación de carga
        showNotification('success', 'Procesando', 'Guardando datos del evento...');
       
       // Configuración de la solicitud
       const config = {
         headers: { 
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'multipart/form-data'
         }
       };
       
       let response;
       
       if (isEditingEvent.value) {
         response = await axios.put(`/api/events/${eventForm.value.id}`, formData, config);
       } else {
         response = await axios.post('/api/events', formData, config);
       }
       
       if (response.data?.success) {
         showNotification('success', 'Éxito', `Evento ${isEditingEvent.value ? 'actualizado' : 'creado'} correctamente`);
         loadEvents();
         closeEventModal();
       } else {
         throw new Error(response.data?.message || 'La respuesta del servidor no indica éxito');
       }
     } catch (error) {
       console.error('Error al guardar evento:', error);
       showNotification('error', 'Error', 'Error al guardar evento');
     }
   };

   // Implementar saveBlog
   const saveBlog = async () => {
     try {
       // Validar campos obligatorios
       if (!blogForm.value.title) {
         showNotification('error', 'Error', 'El título es obligatorio');
         return;
       }
       
       if (!blogForm.value.content) {
         showNotification('error', 'Error', 'El contenido es obligatorio');
         return;
       }
       
       if (!blogForm.value.category) {
         showNotification('error', 'Error', 'La categoría es obligatoria');
         return;
       }
       
       const token = localStorage.getItem('access_token');
       const formData = new FormData();
       
       // Agregar campos básicos
       Object.keys(blogForm.value).forEach(key => {
         if (blogForm.value[key] !== null && blogForm.value[key] !== undefined) {
           if (typeof blogForm.value[key] === 'boolean') {
             formData.append(key, blogForm.value[key] ? '1' : '0');
           } else {
             formData.append(key, blogForm.value[key]);
           }
         }
       });
       
       // Agregar imagen si hay un archivo nuevo
       if (blogImageFile.value) {
         formData.append('image', blogImageFile.value);
       }
       
       // Mostrar notificación de carga
       showNotification('success', 'Procesando', 'Guardando blog post...');
       
       // Configuración de la solicitud
       const config = {
         headers: { 
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'multipart/form-data'
         }
       };
       
       let response;
       
       if (isEditingBlog.value) {
         response = await axios.put(`/api/blogs/${blogForm.value.id}`, formData, config);
       } else {
         response = await axios.post('/api/blogs', formData, config);
       }
       
       if (response.data?.success) {
         showNotification('success', 'Éxito', `Blog post ${isEditingBlog.value ? 'actualizado' : 'creado'} correctamente`);
         loadBlogs();
         closeBlogModal();
       } else {
         throw new Error(response.data?.message || 'La respuesta del servidor no indica éxito');
       }
     } catch (error) {
       console.error('Error al guardar blog post:', error);
       showNotification('error', 'Error', 'Error al guardar blog post');
     }
   };

   // Métodos para archivar/restaurar comercios
   const initiateArchive = (business) => {
     businessToArchive.value = business;
     archiveReason.value = '';
     showArchiveModal.value = true;
   };

   const cancelArchive = () => {
     showArchiveModal.value = false;
     businessToArchive.value = null;
   };

   const confirmArchive = async () => {
     if (!archiveReason.value.trim()) {
       showNotification('error', 'Error', 'El motivo de desactivación es obligatorio');
       return;
     }

     try {
       const token = localStorage.getItem('access_token');
       const response = await axios.patch(`/api/properties/${businessToArchive.value.id}/archive`, {
         reason: archiveReason.value
       }, {
         headers: { 'Authorization': `Bearer ${token}` }
       });
       
       if (response.data?.success) {
         showNotification('success', 'Éxito', 'Comercio desactivado correctamente');
         
         // Actualizar directamente el objeto en la lista
         businessToArchive.value.archived = true;
         businessToArchive.value.archived_at = new Date().toISOString();
         businessToArchive.value.archived_reason = archiveReason.value;
         
         // También recargar todos los comercios para asegurar
         await loadBusinesses();
       } else {
         showNotification('error', 'Error', 'No se pudo desactivar el comercio');
       }
     } catch (error) {
       console.error('Error al cambiar estado del comercio:', error);
       showNotification('error', 'Error', 'Error al desactivar el comercio');
     } finally {
       showArchiveModal.value = false;
       businessToArchive.value = null;
     }
   };

   // Métodos para eventos
   const toggleEventFeatured = async (event) => {
     try {
       const token = localStorage.getItem('access_token');
       const newFeaturedStatus = !event.is_featured;
       
       const response = await axios.patch(`/api/events/${event.id}/featured`, {
         featured: newFeaturedStatus
       }, {
         headers: { 'Authorization': `Bearer ${token}` }
       });
       
       if (response.data?.success) {
         showNotification('success', 'Éxito', `Evento ${newFeaturedStatus ? 'destacado' : 'quitado de destacados'}`);
         await loadEvents();
       }
     } catch (error) {
       console.error('Error al cambiar estado destacado:', error);
       showNotification('error', 'Error', 'Error al actualizar el estado destacado');
     }
   };

   const toggleEventHome = async (event) => {
     try {
       const token = localStorage.getItem('access_token');
       const newHomeStatus = !event.is_home;
       
       const response = await axios.patch(`/api/events/${event.id}/home`, {
         home: newHomeStatus
       }, {
         headers: { 'Authorization': `Bearer ${token}` }
       });
       
       if (response.data?.success) {
         showNotification('success', 'Éxito', `Evento ${newHomeStatus ? 'añadido a' : 'quitado de'} la portada`);
         await loadEvents();
       }
     } catch (error) {
       console.error('Error al cambiar visibilidad en portada:', error);
       showNotification('error', 'Error', 'Error al actualizar la visibilidad en portada');
     }
   };

   const changeEventStatus = async (event) => {
     try {
       const token = localStorage.getItem('access_token');
       
       // Determinar el próximo estado (activo -> pospuesto -> cancelado -> completado -> activo)
       let nextStatus;
       switch (event.status) {
         case 'activo': nextStatus = 'pospuesto'; break;
         case 'pospuesto': nextStatus = 'cancelado'; break;
         case 'cancelado': nextStatus = 'completado'; break;
         case 'completado': nextStatus = 'activo'; break;
         default: nextStatus = 'activo';
       }
       
       const response = await axios.patch(`/api/events/${event.id}/status`, {
         status: nextStatus
       }, {
         headers: { 'Authorization': `Bearer ${token}` }
       });
       
       if (response.data?.success) {
         showNotification('success', 'Éxito', `Estado del evento cambiado a: ${nextStatus}`);
         await loadEvents();
       }
     } catch (error) {
       console.error('Error al cambiar estado del evento:', error);
       showNotification('error', 'Error', 'Error al actualizar el estado del evento');
     }
   };

   // Métodos para blogs
   const toggleBlogFeatured = async (blog) => {
     try {
       const token = localStorage.getItem('access_token');
       const newFeaturedStatus = !blog.is_featured;
       
       const response = await axios.patch(`/api/blogs/${blog.id}/featured`, {
         featured: newFeaturedStatus
       }, {
         headers: { 'Authorization': `Bearer ${token}` }
       });
       
       if (response.data?.success) {
         showNotification('success', 'Éxito', `Blog post ${newFeaturedStatus ? 'destacado' : 'quitado de destacados'}`);
         await loadBlogs();
       }
     } catch (error) {
       console.error('Error al cambiar estado destacado:', error);
       showNotification('error', 'Error', 'Error al actualizar el estado destacado');
     }
   };

   const toggleBlogStatus = async (blog) => {
     try {
       const token = localStorage.getItem('access_token');
       const newActiveStatus = !blog.active;
       
       const response = await axios.patch(`/api/blogs/${blog.id}/status`, {
         active: newActiveStatus
       }, {
         headers: { 'Authorization': `Bearer ${token}` }
       });
       
       if (response.data?.success) {
         showNotification('success', 'Éxito', `Blog post ${newActiveStatus ? 'activado' : 'desactivado'}`);
         await loadBlogs();
       }
     } catch (error) {
       console.error('Error al cambiar estado activo:', error);
       showNotification('error', 'Error', 'Error al actualizar el estado activo');
     }
   };

   // Mostrar la razón de archivo
   const showArchiveReason = (business) => {
     selectedBusiness.value = business;
     showArchiveReasonModal.value = true;
   };

   // Formatear la fecha de archivo
   const formatArchiveDate = (date) => {
     if (!date) return 'Fecha no disponible';

     try {
       return new Date(date).toLocaleString('es-ES', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: '2-digit',
         minute: '2-digit'
       });
     } catch (e) {
       console.error('Error formateando fecha:', e);
       return 'Fecha inválida';
     }
   };

   const toggleBusinessFeatured = async (business) => {
     try {
       // Verificar si puede ser destacado
       if (!business.isFeatured && !canBeHighlighted(business)) {
         let message = '';
         if (business.category === 'Alojamiento') {
           message = 'Ya hay 10 propiedades destacadas en la categoría Alojamiento. Quite alguna antes de añadir otra.';
         } else if (business.category === 'Restaurante y bar') {
           message = 'Ya hay 6 propiedades destacadas en la categoría Restaurante y bar. Quite alguna antes de añadir otra.';
         }
         
         showNotification('error', 'Error', message);
         return;
       }
       
       const token = localStorage.getItem('access_token');
       const newFeaturedStatus = !business.isFeatured;
       
       const response = await axios.patch(`/api/properties/${business.id}/featured`, {
         featured: newFeaturedStatus
       }, {
         headers: { 'Authorization': `Bearer ${token}` }
       });
       
       if (response.data?.success) {
         showNotification('success', 'Éxito', `Comercio ${newFeaturedStatus ? 'destacado' : 'quitado de destacados'}`);
         await loadBusinesses();
       }
     } catch (error) {
       console.error('Error al cambiar estado destacado:', error);
       showNotification('error', 'Error', 'Error al actualizar el estado destacado');
     }
   };

   const toggleBusinessStatus = async (business) => {
     try {
       const token = localStorage.getItem('access_token');
       
       if (!business.archived) {
         // Si no está archivado, mostrar modal para archivar
         initiateArchive(business);
       } else {
         // Si está archivado, restaurar directamente
         const response = await axios.patch(`/api/properties/${business.id}/restore`, {}, {
           headers: { 'Authorization': `Bearer ${token}` }
         });
         
         if (response.data?.success) {
           showNotification('success', 'Éxito', 'Comercio activado correctamente');
           
           // Actualizar directamente el objeto en la lista
           business.archived = false;
           business.archived_at = null;
           business.archived_reason = null;
           
           // También recargar todos los comercios para asegurar
           await loadBusinesses();
         } else {
           showNotification('error', 'Error', 'No se pudo activar el comercio');
         }
       }
     } catch (error) {
       console.error('Error al cambiar estado del comercio:', error);
       showNotification('error', 'Error', 'Error al actualizar el estado del comercio');
     }
   };

   // Utility methods
   const formatDate = (date) => {
     if (!date) return 'N/A';
     return new Date(date).toLocaleDateString('es-ES', {
       year: 'numeric',
       month: 'short',
       day: 'numeric'
     });
   };

   const showNotification = (type, title, message = '') => {
     notification.value = {
       show: true,
       type,
       title,
       message
     };

     setTimeout(() => {
       notification.value.show = false;
     }, 3000);
   };

   const toggleSortDirection = () => {
     filters.value.sortDirection = filters.value.sortDirection === 'asc' ? 'desc' : 'asc';
   };

   const toggleEventsSortDirection = () => {
     eventsFilters.value.sortDirection = eventsFilters.value.sortDirection === 'asc' ? 'desc' : 'asc';
   };

   const toggleBlogsSortDirection = () => {
     blogsFilters.value.sortDirection = blogsFilters.value.sortDirection === 'asc' ? 'desc' : 'asc';
   };

   // Actualizar los filtros
   const updateFilter = (key, value) => {
     filters.value[key] = value;
     currentPage.value = 1;
   };

   const updateEventsFilter = (key, value) => {
     eventsFilters.value[key] = value;
     eventsCurrentPage.value = 1;
   };

   const updateBlogsFilter = (key, value) => {
     blogsFilters.value[key] = value;
     blogsCurrentPage.value = 1;
   };

   const updateTooltip = (businessId) => {
     showTooltipFor.value = businessId;
   };

   // Lifecycle hooks
   onMounted(async () => {
     await loadUserData();

     // Si el usuario es admin, cargar datos iniciales
     if (user.value.role === 'admin') {
       await loadBusinesses();
       await loadEvents();
       await loadBlogs();
     }
     
     // Cargar Leaflet dinámicamente
     if (!window.L) {
       // Cargar CSS de Leaflet
       const link = document.createElement('link');
       link.rel = 'stylesheet';
       link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
       document.head.appendChild(link);
       
       // Cargar JS de Leaflet
       const script = document.createElement('script');
       script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
       script.onload = () => {
         // Inicializar el mapa cuando Leaflet esté cargado
         if (showBusinessModal.value) {
           initMap();
         }
       };
       document.head.appendChild(script);
     }
   });

   // Watch para resetear el tipo de propiedad cuando cambia la categoría
   watch(() => filters.value.category, (newCategory) => {
     filters.value.property_type = '';
   });

   // Watch para asegurarse de que el tipo de propiedad coincida con la categoría en el formulario
   watch(() => businessForm.value.category, (newCategory) => {
     const categoryTypes = propertyTypes[newCategory] || [];
     if (!categoryTypes.includes(businessForm.value.property_type)) {
       businessForm.value.property_type = categoryTypes[0] || '';
     }
   });

   // Watch para actualizar mapa cuando cambian lat/lng
   watch(() => [businessForm.value.lat, businessForm.value.lng], () => {
     updateMap();
   });

   // Watch para resetear paginación cuando cambian los filtros
   watch(() => [filters.value.category, filters.value.property_type, filters.value.status, filters.value.sortBy, filters.value.sortDirection], () => {
     currentPage.value = 1;
   });

   return {
     user,
     activeTab,
     stats,
     businesses,
     events,
     blogs,
     searchQuery,
     filters,
     eventsFilters,
     blogsFilters,
     currentPage,
     eventsCurrentPage,
     blogsCurrentPage,
     isLoading,
     showBusinessModal,
     showEventModal,
     showBlogModal,
     showArchiveModal,
     showArchiveReasonModal,
     showTooltipFor,
     isEditingBusiness,
     isEditingEvent,
     isEditingBlog,
     mapContainer,
     archiveReason,
     businessToArchive,
     selectedBusiness,
     selectedEvent,
     selectedBlog,
     businessForm,
     eventForm,
     blogForm,
     scheduleForm,
     mainImageFile,
     additionalImageFiles,
     mainImagePreview,
     additionalImagePreviews,
     eventImageFile,
     eventImagePreview,
     blogImageFile,
     blogImagePreview,
     notification,
     propertyTypes,
     amenities,
     newAmenity,
     amenitySuggestions,
     filteredBusinesses,
     filteredEvents,
     filteredBlogs,
     paginatedBusinesses,
     paginatedEvents,
     paginatedBlogs,
     totalPages,
     totalEventsPages,
     totalBlogsPages,
     paginationStart,
     paginationEnd,
     eventsPaginationStart,
     eventsPaginationEnd,
     blogsPaginationStart,
     blogsPaginationEnd,
     displayPages,
     eventsDisplayPages,
     blogsDisplayPages,
     addAmenity,
     removeAmenity,
     canBeHighlighted,
     changePage,
     changeEventsPage,
     changeBlogsPage,
     handleMainImageUpload,
     handleAdditionalImagesUpload,
     handleEventImageUpload,
     handleBlogImageUpload,
     removeAdditionalImage,
     searchBusinesses,
     searchEvents,
     searchBlogs,
     loadUserData,
     loadBusinesses,
     loadEvents,
     loadBlogs,
     openBusinessModal,
     openEventModal,
     openBlogModal,
     closeBusinessModal,
     closeEventModal,
     closeBlogModal,
     saveBusiness,
     saveEvent,
     saveBlog,
     initiateArchive,
     cancelArchive,
     confirmArchive,
     toggleEventFeatured,
     toggleEventHome,
     changeEventStatus,
     toggleBlogFeatured,
     toggleBlogStatus,
     showArchiveReason,
     formatArchiveDate,
     toggleBusinessFeatured,
     toggleBusinessStatus,
     formatDate,
     showNotification,
     toggleSortDirection,
     toggleEventsSortDirection,
     toggleBlogsSortDirection,
     updateFilter,
     updateEventsFilter,
     updateBlogsFilter,
     updateTooltip,
     debugBusinesses
   };
 }
};
</script>

<style>
/* Animations */
.animate-fadeIn {
 animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: translateY(0); }
}

/* Additional Styles */
.leaflet-container {
 z-index: 10;
}
</style>