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
            @change-event-status="updateEventStatus"
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

    <!-- Event Modal Actualizado -->
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
                            <option value="Taller">Taller</option>
              <option value="Conferencia">Conferencia</option>
              <option value="Concierto">Concierto</option>
              <option value="Webinar">Webinar</option>
              <option value="Seminario">Seminario</option>
              <option value="Charla">Charla</option>
              <option value="Feria">Feria</option>
              <option value="Networking">Networking</option>
              <option value="Curso">Curso</option>
              <option value="Exposición">Exposición</option>
              <option value="Presentación">Presentación</option>
              <option value="Competencia">Competencia</option>
              <option value="Reunión">Reunión</option>
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
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fecha del Evento</label>
            <input v-model="eventForm.event_date" type="date" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hora de Inicio</label>
            <input v-model="eventForm.event_time" type="time" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            <small class="text-gray-500">El formato de hora debe ser HH:MM:SS (se añadirán los segundos automáticamente)</small>
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

   <!-- REEMPLAZAR TODO EL CÓDIGO DEL MODAL DE BLOG EN dashboard.vue -->

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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Título <span class="text-red-500">*</span></label>
            <input v-model="blogForm.title" type="text" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Categoría <span class="text-red-500">*</span></label>
            <select v-model="blogForm.category" required class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
              <option value="">Seleccionar categoría</option>
              <option value="Alojamiento">Alojamiento</option>
              <option value="Arquitectura">Arquitectura</option>
              <option value="Gastronomía">Gastronomía</option>
              <option value="Estilo de Vida">Estilo de Vida</option>
              <option value="Eventos">Eventos</option>
              <option value="Viajes">Viajes</option>
              <option value="Noticias">Noticias</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Imagen de Portada</label>
            <input type="file" accept="image/*" @change="handleBlogImageUpload" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100">
            <div v-if="blogImagePreview" class="mt-3">
              <img :src="blogImagePreview" alt="Vista previa del blog" class="h-40 w-full object-cover rounded-lg border border-gray-200">
            </div>
          </div>
          
          <!-- Se han eliminado las opciones de Activo y Destacado como solicitado -->
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Contenido <span class="text-red-500">*</span></label>
            <textarea 
              v-model="blogForm.content" 
              rows="12" 
              required 
              class="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              placeholder="Escribe el contenido del blog aquí..."
            ></textarea>
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

    // Formulario para eventos
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
      
      // Eliminar la validación por categoría para permitir destacar sin límite
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

    // 1. FUNCIÓN PARA CARGAR BLOGS
const loadBlogs = async () => {
  try {
    isLoading.value = true;
    const token = localStorage.getItem('access_token');
    
    // Llamar a la API para obtener todos los blogs (incluyendo inactivos)
    const response = await axios.get('/api/blogs/admin', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: {
        limit: 100 // Cargar todos los blogs
      }
    });
    
    if (response.data?.success) {
      // Procesar blogs y asegurar que los campos booleanos estén correctos
      blogs.value = (response.data.data.blogs || []).map(blog => ({
        ...blog,
        // Convertir is_featured y active de 1/0 a true/false
        is_featured: blog.is_featured === 1 || blog.is_featured === true,
        active: blog.active === 1 || blog.active === true
      }));
      
      console.log(`Blogs cargados: ${blogs.value.length}`);
      
      // Actualizar estadísticas
      stats.value.totalBlogs = blogs.value.length;
      stats.value.activeBlogs = blogs.value.filter(blog => blog.active).length;
      stats.value.inactiveBlogs = blogs.value.filter(blog => !blog.active).length;
    }
  } catch (error) {
    console.error('Error al cargar blogs:', error);
    showNotification('error', 'Error', 'Error al cargar blogs');
  } finally {
    isLoading.value = false;
  }
};

// 2. FUNCIÓN PARA FILTRAR BLOGS (asegúrate de que esta computed property esté correcta)
const filteredBlogs = computed(() => {
  let result = [...blogs.value];

  // Filtro de búsqueda
  if (blogsSearchQuery.value && blogsSearchQuery.value.trim()) {
    const query = blogsSearchQuery.value.toLowerCase().trim();
    console.log('Filtrando blogs con término:', query);
    
    result = result.filter(blog => 
      (blog.title && blog.title.toLowerCase().includes(query)) || 
      (blog.content && blog.content.toLowerCase().includes(query)) ||
      (blog.category && blog.category.toLowerCase().includes(query))
    );
    
    console.log('Blogs encontrados:', result.length);
  }
  
  // Aplicar filtros de categoría
  if (blogsFilters.value.category) {
    result = result.filter(blog => blog.category === blogsFilters.value.category);
  }
  
  // Filtro de estado de activo/inactivo
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

// Para la búsqueda de blogs
const searchBlogs = (query) => {
  console.log('Buscando blogs con término:', query);
  blogsSearchQuery.value = query;
  blogsCurrentPage.value = 1;
};

// Para actualizar filtros de blog
const updateBlogsFilter = (key, value) => {
  console.log(`Actualizando filtro de blogs: ${key} = ${value}`);
  blogsFilters.value[key] = value;
  blogsCurrentPage.value = 1;
};

// 5. FUNCIÓN PARA CAMBIAR LA DIRECCIÓN DE ORDENAMIENTO
const toggleBlogsSortDirection = () => {
  blogsFilters.value.sortDirection = blogsFilters.value.sortDirection === 'asc' ? 'desc' : 'asc';
  console.log('Dirección de ordenamiento cambiada:', blogsFilters.value.sortDirection);
};

// 6. FUNCIÓN PARA CAMBIAR PÁGINA
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
  
  // Verificar el tamaño (máximo 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showNotification('error', 'Error', 'La imagen no debe superar los 5MB');
    return;
  }
  
  // Verificar el tipo
  if (!file.type.startsWith('image/')) {
    showNotification('error', 'Error', 'El archivo debe ser una imagen');
    return;
  }
  
  eventImageFile.value = file;
  eventImagePreview.value = URL.createObjectURL(file);
};

    // Función para manejar la carga de imágenes de blog
const handleBlogImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  // Verificar el tamaño (máximo 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showNotification('error', 'Error', 'La imagen no debe superar los 5MB');
    return;
  }
  
  // Verificar el tipo
  if (!file.type.startsWith('image/')) {
    showNotification('error', 'Error', 'El archivo debe ser una imagen');
    return;
  }
  
  blogImageFile.value = file;
  blogImagePreview.value = URL.createObjectURL(file);
};


    const removeAdditionalImage = (index) => {
      additionalImageFiles.value.splice(index, 1);
      URL.revokeObjectURL(additionalImagePreviews.value[index]);
      additionalImagePreviews.value.splice(index, 1);
    };

    // Buscar comercios
    const searchBusinesses = (query) => {
      searchQuery.value = query;
      // Resetear paginación al buscar
      currentPage.value = 1;
    };

    // Buscar eventos
    const searchEvents = (query) => {
      eventsSearchQuery.value = query;
      eventsCurrentPage.value = 1;
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

    // En el método loadEvents de dashboard.vue
const loadEvents = async () => {
  try {
    isLoading.value = true;
    const token = localStorage.getItem('access_token');
    
    // Llamar a la API específica para el panel de admin
    const response = await axios.get('/api/events/admin', {
      headers: { 'Authorization': `Bearer ${token}` },
      params: {
        limit: 100 // Cargar todos los eventos
      }
    });
    
    if (response.data?.success) {
      // Procesar los eventos para asegurar formatos correctos
      events.value = (response.data.data.events || []).map(event => {
        // Asegurarse de que las fechas están en formato YYYY-MM-DD
        if (event.event_date && typeof event.event_date === 'string' && event.event_date.includes('T')) {
          event.event_date = event.event_date.split('T')[0];
        }
        
        // Para booleanos, asegurar que sean true/false
        event.is_featured = event.is_featured === 1 || event.is_featured === true;
        
        return event;
      });
      
      console.log('Eventos cargados y procesados:', events.value);
      
      // Actualizar automáticamente eventos pasados a completados SOLO VISUALMENTE
      events.value.forEach(event => {
        if (event.status === 'activo') {
          const eventDate = new Date(event.event_date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (eventDate < today) {
            // Actualizamos solo en el frontend
            event.status = 'completado';
          }
        }
      });
      
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

    // Método openEventModal mejorado
// Método openEventModal mejorado y corregido
const openEventModal = async (event = null) => {
  try {
    // Resetear formulario de evento
    eventForm.value = {
      id: null,
      event_name: '',
      description: '',
      location: '',
      event_date: '',
      event_time: '',
      end_time: '',
      event_type: 'Taller', // Valor predeterminado
      status: 'activo',
      price: 0,
      image_url: '',
      is_featured: false,  // Siempre inicializar como false
      organizer_id: user.value.id
    };
    
    eventImageFile.value = null;
    eventImagePreview.value = null;
    
    if (event) {
      // Modo edición
      isEditingEvent.value = true;
      
      // Clonar el evento para evitar modificar el original
      eventForm.value = {
        id: event.id,
        event_name: event.event_name,
        description: event.description || '',
        location: event.location,
        event_type: event.event_type,
        status: event.status || 'activo',
        price: parseFloat(event.price) || 0,
        image_url: event.image_url || '',
        is_featured: event.is_featured === 1 || event.is_featured === true,  // Asegurar que sea booleano
        organizer_id: event.organizer_id || user.value.id
      };
      
      // Si tenemos fecha, formatearla correctamente para el input date (YYYY-MM-DD)
      if (event.event_date) {
        // Limpiar la fecha para asegurarnos que está en formato YYYY-MM-DD
        let formattedDate;
        
        if (typeof event.event_date === 'string') {
          // Si es un string ISO (con T), extraer solo la parte de la fecha
          if (event.event_date.includes('T')) {
            formattedDate = event.event_date.split('T')[0];
          } else {
            // Si ya es un formato simple YYYY-MM-DD, usarlo directamente
            formattedDate = event.event_date;
          }
        } else if (event.event_date instanceof Date) {
          // Si es un objeto Date, convertirlo a YYYY-MM-DD
          const year = event.event_date.getFullYear();
          const month = String(event.event_date.getMonth() + 1).padStart(2, '0');
          const day = String(event.event_date.getDate()).padStart(2, '0');
          formattedDate = `${year}-${month}-${day}`;
        }
        
        console.log('Fecha original:', event.event_date);
        console.log('Fecha formateada para input:', formattedDate);
        
        eventForm.value.event_date = formattedDate;
      }
      
      // Si tenemos hora, formatearla para el input time (HH:MM)
      if (event.event_time) {
        // Formatear la hora HH:MM:SS a HH:MM para el input time
        const timeParts = event.event_time.split(':');
        eventForm.value.event_time = `${timeParts[0]}:${timeParts[1]}`;
        
        console.log('Hora original:', event.event_time);
        console.log('Hora formateada para input:', eventForm.value.event_time);
      }
      
      // Si hay una imagen, mostrarla
      if (event.image_url) {
        eventImagePreview.value = event.image_url;
      }
      
      console.log('Formulario para edición:', eventForm.value);
    } else {
      // Modo creación
      isEditingEvent.value = false;

      // Establecer fecha por defecto (hoy)
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      eventForm.value.event_date = `${year}-${month}-${day}`;
      
      // Hora por defecto (12:00)
      eventForm.value.event_time = '12:00';
    }
    
    // Mostrar el modal
    showEventModal.value = true;
    
  } catch (error) {
    console.error('Error al abrir el modal de evento:', error);
    showNotification('error', 'Error', 'No se pudo abrir el formulario de evento');
  }
};
    // Método para toggle de featured en los eventos
    const toggleEventFeatured = async (event) => {
      try {
        // Si no está destacado, verificar el límite
        if (!event.is_featured) {
          const featuredCount = events.value.filter(e => e.is_featured).length;
          if (featuredCount >= 3) {
            showNotification('error', 'Límite alcanzado', 'Solo se permiten 3 eventos destacados. Quite alguno antes de añadir otro.');
            return;
          }
        }
        
        const token = localStorage.getItem('access_token');
        const newFeaturedStatus = !event.is_featured;
        
        // Llamar a la API
        const response = await axios.patch(`/api/events/${event.id}/featured`, {
          is_featured: newFeaturedStatus
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.data?.success) {
          showNotification('success', 'Éxito', `Evento ${newFeaturedStatus ? 'destacado' : 'quitado de destacados'}`);
          await loadEvents(); // Recargar eventos para actualizar el estado
        }
      } catch (error) {
        console.error('Error al cambiar estado destacado:', error);
        showNotification('error', 'Error', 'Error al actualizar el estado destacado');
      }
    };

    // Método para cambiar el estado del evento
    const updateEventStatus = async (event, newStatus) => {
  try {
    const token = localStorage.getItem('access_token');
    
    console.log(`Cambiando estado del evento ${event.id} a ${newStatus}`);
    
    // Llamar a la API
    const response = await axios.patch(`/api/events/${event.id}/status`, {
      status: newStatus
    }, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.data?.success) {
      showNotification('success', 'Éxito', `Estado del evento cambiado a: ${newStatus}`);
      await loadEvents(); // Recargar eventos para actualizar la vista
    }
  } catch (error) {
    console.error('Error al cambiar estado del evento:', error);
    
    // Si es error 403, mostrar mensaje específico
    if (error.response?.status === 403) {
      showNotification('error', 'Error de permisos', 'No tienes permiso para cambiar el estado de este evento. Solo el creador puede modificarlo.');
    } else {
      showNotification('error', 'Error', 'Error al actualizar el estado del evento');
    }
    
    // Recargar eventos para asegurar que la UI esté sincronizada
    await loadEvents();
  }
};

    // Métodos para blogs
    // Función para abrir el modal de blog
const openBlogModal = (blog = null) => {
  // Resetear formulario de blog con valores por defecto
  blogForm.value = {
    id: null,
    title: '',
    content: '',
    category: 'Noticias', // Valor por defecto
    image_url: '',
    is_featured: false,
    active: true,
    author_id: user.value.id
  };
  
  blogImageFile.value = null;
  blogImagePreview.value = null;
  
  if (blog) {
    isEditingBlog.value = true;
    selectedBlog.value = blog;
    
    // Asignar valores del blog existente
    blogForm.value = {
      id: blog.id,
      title: blog.title || '',
      content: blog.content || '',
      category: blog.category || 'Noticias',
      image_url: blog.image_url || '',
      // Convertir valores numéricos (1/0) a booleanos
      is_featured: blog.is_featured === 1 || blog.is_featured === true,
      active: blog.active === 1 || blog.active === true || blog.active === undefined,
      author_id: blog.author_id || user.value.id
    };
    
    console.log('Formulario para edición:', blogForm.value);
    
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

    // Función para cerrar el modal de blog
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

  // Método saveEvent completo corregido
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
    
    if (!eventForm.value.event_time) {
      showNotification('error', 'Error', 'La hora del evento es obligatoria');
      return;
    }
    
    if (!eventForm.value.location) {
      showNotification('error', 'Error', 'La ubicación es obligatoria');
      return;
    }
    
    if (!eventForm.value.event_type) {
      showNotification('error', 'Error', 'El tipo de evento es obligatorio');
      return;
    }
    
    // Mostrar notificación de carga
    showNotification('success', 'Procesando', 'Guardando datos del evento...');
    
    const token = localStorage.getItem('access_token');
    
    // Formatear correctamente la hora (HH:MM:SS)
    let eventTime = eventForm.value.event_time;
    if (eventTime && eventTime.split(':').length === 2) {
      eventTime = `${eventTime}:00`;
    }
    
    console.log('Hora formateada:', eventTime);
    
    // Convertir precio a número
    const eventPrice = parseFloat(eventForm.value.price) || 0;
    
    // Crear objeto para envío con SOLO los campos necesarios
    const eventData = {
      event_name: eventForm.value.event_name.trim(),
      location: eventForm.value.location.trim(),
      event_date: eventForm.value.event_date,
      event_time: eventTime,
      price: eventPrice,
      event_type: eventForm.value.event_type,
      status: eventForm.value.status || 'activo',
      description: eventForm.value.description || ''
    };
    
    // Para crear evento nuevo, añadir el organizador
    if (!isEditingEvent.value) {
      // Importante: usar created_by en lugar de organizer_id
      eventData.created_by = user.value.id;
    }
    
    console.log('Datos enviados al servidor:', JSON.stringify(eventData, null, 2));
    
    // Configuración para la solicitud
    const config = {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 segundos
    };
    
    let response;
    let eventId;
    
    try {
      if (isEditingEvent.value) {
        // EDITANDO EVENTO EXISTENTE
        eventId = eventForm.value.id;
        
        response = await axios.put(`/api/events/${eventId}`, eventData, config);
      } else {
        // CREANDO NUEVO EVENTO
        response = await axios.post('/api/events', eventData, config);
        
        if (response.data?.success) {
          eventId = response.data.data.eventId;
        } else {
          throw new Error('No se pudo obtener el ID del evento creado');
        }
      }
      
      // Si todo fue exitoso con la creación/edición del evento
      if (response.data?.success) {
        // Si hay imagen seleccionada, intentar subirla
        if (eventImageFile.value) {
          try {
            showNotification('success', 'Procesando', 'Subiendo imagen del evento...');
            
            const imageFormData = new FormData();
            imageFormData.append('image', eventImageFile.value);
            
            // Subir la imagen
            const imageResponse = await axios.post('/api/events/image', imageFormData, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              }
            });
            
            // Si la imagen se subió correctamente, actualizar el evento con la URL
            if (imageResponse.data?.success && imageResponse.data.data?.imageUrl) {
              // IMPORTANTE: Solicitud separada SOLO para actualizar la URL de la imagen
              await axios.patch(`/api/events/${eventId}/image`, {
                image_url: imageResponse.data.data.imageUrl
              }, {
                headers: { 
                  'Authorization': `Bearer ${token}`
                }
              });
              
              console.log('Imagen subida y asociada al evento correctamente');
            }
          } catch (imageError) {
            console.error('Error al subir la imagen:', imageError);
            
            let errorMessage = 'Error al subir la imagen';
            if (imageError.response?.data?.message) {
              errorMessage = imageError.response.data.message;
            }
            
            showNotification('warning', 'Advertencia', 'El evento se guardó pero hubo un problema al subir la imagen: ' + errorMessage);
          }
        }
        
        // Notificación final de éxito
        showNotification('success', 'Éxito', `Evento ${isEditingEvent.value ? 'actualizado' : 'creado'} correctamente`);
        
        // Recargar eventos y cerrar modal
        await loadEvents();
        closeEventModal();
      }
    } catch (error) {
      console.error('Error en la petición principal:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error al guardar evento:', error);
    
    // Extraer mensaje de error
    let errorMessage = 'Error al guardar el evento';
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }
    
    // Mostrar mensajes específicos de validación si existen
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      errorMessage += ': ' + error.response.data.errors.join(', ');
    }
    
    showNotification('error', 'Error', errorMessage);
  }
};
   // Función principal para guardar un blog
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
    
    // Mostrar notificación de carga
    showNotification('success', 'Procesando', 'Guardando blog post...');
    
    const token = localStorage.getItem('access_token');
    
    // Crear objeto con los datos necesarios para el blog
    const blogData = {
      title: blogForm.value.title.trim(),
      content: blogForm.value.content.trim(),
      category: blogForm.value.category,
      is_featured: blogForm.value.is_featured || false,
      active: blogForm.value.active !== undefined ? blogForm.value.active : true
    };
    
    // Si se está editando, hay que asegurarse de que el author_id esté presente
    if (isEditingBlog.value && blogForm.value.author_id) {
      blogData.author_id = blogForm.value.author_id;
    }
    
    console.log('Datos del blog a enviar:', blogData);
    
    let response;
    let blogId;
    
    // Configuración para la solicitud JSON
    const jsonConfig = {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    if (isEditingBlog.value) {
      // EDITANDO BLOG EXISTENTE
      blogId = blogForm.value.id;
      response = await axios.put(`/api/blogs/${blogId}`, blogData, jsonConfig);
    } else {
      // CREANDO NUEVO BLOG
      response = await axios.post('/api/blogs', blogData, jsonConfig);
      
      if (response.data?.success) {
        blogId = response.data.data.blogId;
      } else {
        throw new Error('No se pudo obtener el ID del blog creado');
      }
    }
    
    // Si hay imagen seleccionada, subir en una solicitud separada
    if (blogImageFile.value && blogId) {
      try {
        const imageFormData = new FormData();
        imageFormData.append('image', blogImageFile.value);
        
        const imageResponse = await axios.post('/api/blogs/image', imageFormData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        
        // Si la imagen se subió correctamente, actualizar el blog con la URL
        if (imageResponse.data?.success && imageResponse.data.data?.url) {
          await axios.patch(`/api/blogs/${blogId}/image`, {
            image_url: imageResponse.data.data.url
          }, {
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          });
        }
      } catch (imageError) {
        console.error('Error al subir la imagen:', imageError);
        showNotification('warning', 'Advertencia', 'El blog se guardó pero hubo un problema al subir la imagen');
      }
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
    
    // Extraer mensaje de error para mostrar
    let errorMessage = 'Error al guardar blog post';
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    }
    
    // Mostrar mensajes específicos de validación si existen
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      errorMessage += ': ' + error.response.data.errors.join(', ');
    }
    
    showNotification('error', 'Error', errorMessage);
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
       // Verificar si puede ser destacado (solo por estado archivado)
       if (!business.isFeatured && !canBeHighlighted(business)) {
         // Este mensaje solo se activará si está archivado
         showNotification('error', 'Error', 'No se pueden destacar comercios inactivos');
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

  // Función para cambiar el estado destacado de un blog
const toggleBlogFeatured = async (blog) => {
  try {
    // Verificar si puede ser destacado
    if (!blog.is_featured) {
      // Verificar límite de blogs destacados (máximo 2)
      const featuredCount = blogs.value.filter(b => b.is_featured).length;
      if (featuredCount >= 2) {
        showNotification('error', 'Límite alcanzado', 'Solo se permiten 2 blogs destacados. Quite alguno antes de añadir otro.');
        return;
      }
      
      // No permitir destacar blogs inactivos
      if (!blog.active) {
        showNotification('error', 'Error', 'No se pueden destacar blogs inactivos');
        return;
      }
    }
    
    const token = localStorage.getItem('access_token');
    const newFeaturedStatus = !blog.is_featured;
    
    // Enviar 'is_featured' en lugar de 'featured'
    const response = await axios.patch(`/api/blogs/${blog.id}/featured`, {
      is_featured: newFeaturedStatus
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.data?.success) {
      showNotification('success', 'Éxito', `Blog ${newFeaturedStatus ? 'destacado' : 'quitado de destacados'}`);
      await loadBlogs(); // Recargar blogs para actualizar el estado
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
    
    // Llamar a la API correcta
    const response = await axios.patch(`/api/blogs/${blog.id}/status`, {
      active: newActiveStatus
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.data?.success) {
      showNotification('success', 'Éxito', `Blog ${newActiveStatus ? 'activado' : 'desactivado'}`);
      
      // Si se desactiva un blog destacado, también quitarle el destacado
      if (!newActiveStatus && blog.is_featured) {
        try {
          await axios.patch(`/api/blogs/${blog.id}/featured`, {
            is_featured: false
          }, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
        } catch (featuredError) {
          console.error('Error al quitar destacado del blog desactivado:', featuredError);
        }
      }
      
      await loadBlogs(); // Recargar blogs para actualizar el estado
    }
  } catch (error) {
    console.error('Error al cambiar estado activo:', error);
    showNotification('error', 'Error', 'Error al actualizar el estado activo');
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

   


   // Actualizar los filtros
   const updateFilter = (key, value) => {
     filters.value[key] = value;
     currentPage.value = 1;
   };

   const updateEventsFilter = (key, value) => {
     eventsFilters.value[key] = value;
     eventsCurrentPage.value = 1;
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
     updateEventStatus,
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