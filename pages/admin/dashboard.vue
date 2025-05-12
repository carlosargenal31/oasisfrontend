<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center">
              <img src="~/public/images/logolcb.png" alt="OASIS Logo" class="h-8 mr-3" />
              <h1 class="text-xl font-bold text-gray-900">Panel de Administración</h1>
            </div>
          </div>
          <div class="flex items-center">
            <div class="text-sm text-gray-600 mr-4">
              {{ user.first_name }} {{ user.last_name }}
            </div>
            <img 
              :src="user.profile_image || '/img/default-avatar.png'" 
              alt="Admin" 
              class="w-10 h-10 rounded-full"
            >
          </div>
        </div>
      </div>
    </header>

    <!-- Breadcrumb -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <ol class="flex items-center space-x-2 text-sm text-gray-600">
        <li><a href="/" class="hover:text-blue-600">Inicio</a></li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-900">Panel de Administración</li>
      </ol>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <!-- Dashboard Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-orange-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Total Comercios</h3>
              <p class="text-3xl font-bold text-gray-700">{{ stats.totalBusinesses }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Total Eventos</h3>
              <p class="text-3xl font-bold text-gray-700">{{ stats.totalEvents }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 0a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V7m2-5a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Blog Posts</h3>
              <p class="text-3xl font-bold text-gray-700">{{ stats.totalBlogs }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'comercios'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
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
              'py-2 px-1 border-b-2 font-medium text-sm',
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
              'py-2 px-1 border-b-2 font-medium text-sm',
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
      <div class="bg-white rounded-lg shadow">
        <!-- Comercios Tab -->
        <div v-if="activeTab === 'comercios'" class="p-6">
          <div class="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-900">Gestión de Comercios</h2>
            
            <!-- Filtros -->
            <div class="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select v-model="filters.category" class="w-full border-gray-300 rounded-md shadow-sm">
                    <option value="">Todas</option>
                    <option value="Alojamiento">Alojamiento</option>
                    <option value="Restaurante y bar">Restaurante y bar</option>
                    <option value="Entretenimiento">Entretenimiento</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select v-model="filters.property_type" class="w-full border-gray-300 rounded-md shadow-sm">
                    <option value="">Todos</option>
                    <template v-if="filters.category === 'Alojamiento'">
                      <option v-for="type in propertyTypes.Alojamiento" :key="type" :value="type">{{ type }}</option>
                    </template>
                    <template v-else-if="filters.category === 'Restaurante y bar'">
                      <option v-for="type in propertyTypes['Restaurante y bar']" :key="type" :value="type">{{ type }}</option>
                    </template>
                    <template v-else-if="filters.category === 'Entretenimiento'">
                      <option v-for="type in propertyTypes.Entretenimiento" :key="type" :value="type">{{ type }}</option>
                    </template>
                    <template v-else>
                      <option v-for="category in Object.keys(propertyTypes)" :key="category">
                        <optgroup :label="category">
                          <option v-for="type in propertyTypes[category]" :key="type" :value="type">{{ type }}</option>
                        </optgroup>
                      </option>
                    </template>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select v-model="filters.status" class="w-full border-gray-300 rounded-md shadow-sm">
                    <option value="">Todos</option>
                    <option value="for-rent">Activo</option>
                    <option value="archived">Archivado</option>
                  </select>
                </div>
              </div>
              
              <div class="flex items-end">
                <button
                  @click="openBusinessModal(null)"
                  class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Añadir Comercio
                </button>
              </div>
            </div>
          </div>
          
          <div class="mt-4 mb-4 flex justify-end">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">Ordenar por:</span>
              <select v-model="filters.sortBy" class="border-gray-300 rounded-md shadow-sm text-sm">
                <option value="title">Nombre</option>
                <option value="category">Categoría</option>
                <option value="property_type">Tipo</option>
                <option value="average_rating">Calificación</option>
                <option value="views">Vistas</option>
                <option value="created_at">Fecha de creación</option>
              </select>
              <button @click="toggleSortDirection" class="ml-2 p-1 rounded-md hover:bg-gray-100">
                <svg v-if="filters.sortDirection === 'asc'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Businesses Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 table-fixed">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Comercio</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Categoría/Tipo</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Estado</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Destacado</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Vistas</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Acciones</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="business in filteredBusinesses" :key="business.id" :class="{'bg-gray-50': business.archived}">
                  <td class="px-4 py-4">
                    <div class="flex items-center">
                      <img :src="business.image || '/img/business-placeholder.jpg'" alt="" class="h-10 w-10 rounded object-cover">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900 truncate max-w-xs">{{ business.title }}</div>
                        <div class="text-sm text-gray-500 truncate max-w-xs">{{ business.address }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <div>
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {{ business.category }}
                      </span>
                    </div>
                    <div class="text-sm text-gray-500 mt-1">
                      {{ business.property_type }}
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      getBusinessStatusClass(business.status)
                    ]">
                      {{ getStatusText(business.status) }}
                    </span>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500">
                    <div class="flex items-center">
                      <span :class="['text-yellow-400', {'opacity-30': !business.isFeatured}]">★</span>
                      <span class="ml-1">{{ business.average_rating || '0.0' }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-gray-500">
                    {{ business.views || 0 }}
                  </td>
                  <td class="px-4 py-4 text-sm font-medium">
                    <div class="flex space-x-3">
                      <button
                        @click="openBusinessModal(business)"
                        class="text-indigo-600 hover:text-indigo-900"
                        v-tooltip="'Editar'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        @click="toggleBusinessFeatured(business)"
                        :class="[business.isFeatured ? 'text-purple-600 hover:text-purple-900' : 'text-gray-400 hover:text-gray-600']"
                        v-tooltip="business.isFeatured ? 'Quitar destacado' : 'Destacar'"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                      <button
                        @click="toggleBusinessStatus(business)"
                        :class="[business.status === 'for-rent' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900']"
                        v-tooltip="business.status === 'for-rent' ? 'Desactivar' : 'Activar'"
                      >
                        <svg v-if="business.status === 'for-rent'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredBusinesses.length === 0">
                  <td colspan="6" class="px-4 py-4 text-center text-gray-500">
                    No se encontraron comercios con los filtros seleccionados
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Pagination -->
          <div class="mt-4 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div>
              <p class="text-sm text-gray-700">
                Mostrando <span class="font-medium">1</span> a <span class="font-medium">{{ filteredBusinesses.length }}</span> de <span class="font-medium">{{ filteredBusinesses.length }}</span> resultados
              </p>
            </div>
          </div>
        </div>

        <!-- Otros tabs (events, blogs) -->
      </div>
    </div>

    <!-- Business Modal -->
    <div v-if="showBusinessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-5xl max-h-screen overflow-y-auto">
        <h3 class="text-lg font-semibold mb-4">
          {{ isEditingBusiness ? 'Editar Comercio' : 'Añadir Comercio' }}
        </h3>
        <form @submit.prevent="saveBusiness">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Columna 1 - Información Básica -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Nombre del Comercio</label>
                <input v-model="businessForm.title" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Dirección</label>
                <textarea v-model="businessForm.address" rows="2" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Teléfono</label>
                <input v-model="businessForm.phone" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input v-model="businessForm.email" type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Horario</label>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs text-gray-500">Días</label>
                    <select v-model="scheduleForm.days" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                      <option value="Lun-Vie">Lun-Vie</option>
                      <option value="Lun-Sáb">Lun-Sáb</option>
                      <option value="Lun-Dom">Lun-Dom</option>
                      <option value="24/7">24/7</option>
                      <option value="custom">Personalizado</option>
                    </select>
                  </div>
                  <div v-if="scheduleForm.days !== '24/7'">
                    <label class="block text-xs text-gray-500">Horas</label>
                    <div class="flex items-center">
                      <input type="time" v-model="scheduleForm.startTime" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                      <span class="mx-2">-</span>
                      <input type="time" v-model="scheduleForm.endTime" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                    </div>
                  </div>
                </div>
                <input v-if="scheduleForm.days === 'custom'" v-model="scheduleForm.customDays" placeholder="Ejemplo: Mar, Jue, Sáb" class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea v-model="businessForm.description" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
              </div>
            </div>
            
            <!-- Columna 2 - Categorización, Ubicación e Imágenes -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Categoría</label>
                <select v-model="businessForm.category" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                  <option value="Alojamiento">Alojamiento</option>
                  <option value="Restaurante y bar">Restaurante y bar</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Tipo de Propiedad</label>
                <select v-model="businessForm.property_type" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
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

              <!-- Ubicación en mapa -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ubicación en Mapa</label>
                <div class="border border-gray-300 rounded-md p-1 h-40 mb-2" ref="mapContainer">
                  <!-- Aquí irá el mapa -->
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs text-gray-500">Latitud</label>
                    <input v-model.number="businessForm.lat" type="number" step="0.000001" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                  </div>
                  <div>
                    <label class="block text-xs text-gray-500">Longitud</label>
                    <input v-model.number="businessForm.lng" type="number" step="0.000001" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                  </div>
                </div>
              </div>
              
              <!-- Sección de imágenes -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Imágenes</label>
                <div class="mb-3">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Imagen Principal</label>
                  <input type="file" accept="image/*" @change="handleMainImageUpload" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100">
                 <div v-if="mainImagePreview" class="mt-2">
                   <img :src="mainImagePreview" alt="Vista previa" class="h-20 w-20 object-cover rounded">
                 </div>
               </div>
               
               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-1">Imágenes Adicionales (hasta 9)</label>
                 <input type="file" accept="image/*" multiple @change="handleAdditionalImagesUpload" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100">
                 <div v-if="additionalImagePreviews.length > 0" class="mt-2 grid grid-cols-3 gap-2">
                   <div v-for="(image, index) in additionalImagePreviews" :key="index" class="relative">
                     <img :src="image" alt="Vista previa" class="h-20 w-20 object-cover rounded">
                     <button type="button" @click="removeAdditionalImage(index)" class="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200">
                       <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                       </svg>
                     </button>
                   </div>
                 </div>
                 <p class="mt-1 text-sm text-gray-500">{{ additionalImagePreviews.length }}/9 imágenes seleccionadas</p>
               </div>
             </div>
           </div>
         </div>
         <div class="mt-6 flex justify-end space-x-3">
           <button type="button" @click="closeBusinessModal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
             Cancelar
           </button>
           <button type="submit" class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
             {{ isEditingBusiness ? 'Actualizar' : 'Crear' }}
           </button>
         </div>
       </form>
     </div>
   </div>

   <!-- Notification -->
   <div v-if="notification.show" 
     class="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 flex items-start max-w-sm"
     :class="{'bg-green-50': notification.type === 'success', 'bg-red-50': notification.type === 'error'}"
   >
     <div v-if="notification.type === 'success'" class="text-green-500 mr-3">
       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
       </svg>
     </div>
     <div v-if="notification.type === 'error'" class="text-red-500 mr-3">
       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
       </svg>
     </div>
     <div>
       <div class="font-medium" :class="{'text-green-800': notification.type === 'success', 'text-red-800': notification.type === 'error'}">{{ notification.title }}
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

<script setup>
import { ref, onMounted, watch, computed, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from '~/src/config/axios';

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

// Estados de loading
const isLoading = ref(false);

// Estados de modales
const showBusinessModal = ref(false);
const showEventModal = ref(false);
const showBlogModal = ref(false);

// Estados de edición
const isEditingBusiness = ref(false);
const isEditingEvent = ref(false);
const isEditingBlog = ref(false);

// Referencias DOM
const mapContainer = ref(null);
let map = null;
let marker = null;

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

// Notificación
const notification = ref({
 show: false,
 type: 'success',
 title: '',
 message: ''
});

// Filtros para comercios
const filters = ref({
 category: '',
 property_type: '',
 status: '',
 sortBy: 'title',
 sortDirection: 'asc'
});

// Definir opciones para los filtros
const propertyTypes = {
 'Alojamiento': ['Hotel', 'Motel'],
 'Restaurante y bar': ['Cafetería', 'Restaurante', 'Bar y restaurante', 'Comida rápida', 'Repostería', 'Heladería', 'Bebidas', 'Bar'],
 'Entretenimiento': ['Gym', 'Balneario', 'Belleza', 'Futbol', 'Motocross', 'Casino', 'Cine', 'Videojuegos']
};

// Computed properties
const filteredBusinesses = computed(() => {
 let result = [...businesses.value];
 
 // Aplicar filtros
 if (filters.value.category) {
   result = result.filter(business => business.category === filters.value.category);
 }
 
 if (filters.value.property_type) {
   result = result.filter(business => business.property_type === filters.value.property_type);
 }
 
 if (filters.value.status) {
   if (filters.value.status === 'archived') {
     result = result.filter(business => business.archived === true);
   } else {
     result = result.filter(business => business.status === filters.value.status && !business.archived);
   }
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

const removeAdditionalImage = (index) => {
 additionalImageFiles.value.splice(index, 1);
 URL.revokeObjectURL(additionalImagePreviews.value[index]);
 additionalImagePreviews.value.splice(index, 1);
};

// Métodos
const loadUserData = async () => {
 try {
   const token = localStorage.getItem('access_token');
   if (!token) {
     router.push('/auth/login');
     return;
   }
   
   const response = await axios.get('/api/users/profile', {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   
   if (response.data?.success) {
     user.value = response.data.data.user;
     
     // Verificar que el usuario es admin
     if (user.value.role !== 'admin') {
       showNotification('error', 'Acceso denegado', 'Se requieren privilegios de administrador.');
       router.push('/');
       return;
     }
   }
 } catch (error) {
   console.error('Error al cargar datos del usuario:', error);
   router.push('/auth/login');
 }
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
     
     // Actualizar estadísticas
     stats.value.totalBusinesses = businesses.value.length;
   }
 } catch (error) {
   console.error('Error al cargar comercios:', error);
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

// Inicializar mapa
const initMap = () => {
 if (!mapContainer.value) return;
 
 // Verificar si la API de Google Maps está cargada
 if (window.google && window.google.maps) {
   // Crear mapa
   map = new google.maps.Map(mapContainer.value, {
     center: { lat: businessForm.value.lat || 15.5046, lng: businessForm.value.lng || -88.0248 },
     zoom: 15,
     mapTypeId: google.maps.MapTypeId.ROADMAP
   });
   
   // Crear marcador
   marker = new google.maps.Marker({
     position: { lat: businessForm.value.lat || 15.5046, lng: businessForm.value.lng || -88.0248 },
     map: map,
     draggable: true
   });
   
   // Eventos
   google.maps.event.addListener(marker, 'dragend', function() {
     const position = marker.getPosition();
     businessForm.value.lat = position.lat();
     businessForm.value.lng = position.lng();
   });
   
   // Evento click en el mapa
   google.maps.event.addListener(map, 'click', function(event) {
     marker.setPosition(event.latLng);
     businessForm.value.lat = event.latLng.lat();
     businessForm.value.lng = event.latLng.lng();
   });
 } else {
   console.error('Google Maps API no está cargada');
 }
};

// Actualizar mapa cuando cambian lat/lng
const updateMap = () => {
 if (map && marker) {
   const position = { lat: businessForm.value.lat, lng: businessForm.value.lng };
   map.setCenter(position);
   marker.setPosition(position);
 }
};

// Obtener dirección desde coordenadas
const getAddressFromCoords = async () => {
 if (!businessForm.value.lat || !businessForm.value.lng) return;
 
 try {
   if (window.google && window.google.maps) {
     const geocoder = new google.maps.Geocoder();
     const latlng = { lat: businessForm.value.lat, lng: businessForm.value.lng };
     
     geocoder.geocode({ location: latlng }, (results, status) => {
       if (status === 'OK' && results[0]) {
         if (!businessForm.value.address) {
           businessForm.value.address = results[0].formatted_address;
         }
       }
     });
   }
 } catch (error) {
   console.error('Error al obtener dirección:', error);
 }
};

// Business methods
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
   
   // Cargar imágenes adicionales si existen
   if (businessData.additional_images && businessData.additional_images.length > 0) {
     additionalImagePreviews.value = [...businessData.additional_images];
   }
 } else {
   isEditingBusiness.value = false;
   businessForm.value.host_id = user.value.id;
 }
 
 showBusinessModal.value = true;
 
 // Inicializar mapa después de que se muestre el modal
 nextTick(() => {
   initMap();
 });
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
   host_id: user.value.id,
   views: 0,
   average_rating: 0,
   lat: 15.5046, // Default a San Pedro Sula
   lng: -88.0248,
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
};

const closeBusinessModal = () => {
 showBusinessModal.value = false;
 resetBusinessForm();
 
 // Limpiar mapa
 map = null;
 marker = null;
};

const saveBusiness = async () => {
 try {
   // Construir horario
   businessForm.value.schedule = buildScheduleString();
   
   const token = localStorage.getItem('access_token');
   const formData = new FormData();
   
   // Agregar todos los campos del formulario al FormData
   Object.keys(businessForm.value).forEach(key => {
     if (businessForm.value[key] !== null && businessForm.value[key] !== undefined) {
       // Si es boolean, enviar como 0 o 1
       if (typeof businessForm.value[key] === 'boolean') {
         formData.append(key, businessForm.value[key] ? 1 : 0);
       } else {
         formData.append(key, businessForm.value[key]);
       }
     }
   });
   
   // Agregar imagen principal si existe
   if (mainImageFile.value) {
     formData.append('image', mainImageFile.value);
   }
   
   // Agregar imágenes adicionales si existen
   additionalImageFiles.value.forEach(file => {
     formData.append('additional_images', file);
   });
   
   let response;
   
   if (isEditingBusiness.value) {
     response = await axios.put(`/api/properties/${businessForm.value.id}`, formData, {
       headers: { 
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
       }
     });
   } else {
     response = await axios.post('/api/properties', formData, {
       headers: { 
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
       }
     });
   }
   
   if (response.data?.success) {
     showNotification('success', 'Éxito', `Comercio ${isEditingBusiness.value ? 'actualizado' : 'creado'} correctamente`);
     loadBusinesses();
     closeBusinessModal();
   }
 } catch (error) {
   console.error('Error al guardar comercio:', error);
   showNotification('error', 'Error', 'Error al guardar el comercio. Por favor, verifique los datos e intente nuevamente.');
 }
};

const toggleBusinessStatus = async (business) => {
 try {
   const token = localStorage.getItem('access_token');
   
   // Si está activo, desactivar (archivar)
   if (business.status === 'for-rent') {
     const reason = prompt('Ingrese el motivo de desactivación:', '');
     if (reason === null) return; // Cancelado
     
     const response = await axios.patch(`/api/properties/${business.id}/archive`, {
       reason: reason
     }, {
       headers: { 'Authorization': `Bearer ${token}` }
     });
     
     if (response.data?.success) {
       showNotification('success', 'Éxito', 'Comercio desactivado correctamente');
       await loadBusinesses();
     }
   } else {
     // Si está inactivo, activar (restaurar)
     const response = await axios.patch(`/api/properties/${business.id}/restore`, {
       status: 'for-rent'
     }, {
       headers: { 'Authorization': `Bearer ${token}` }
     });
     
     if (response.data?.success) {
       showNotification('success', 'Éxito', 'Comercio activado correctamente');
       await loadBusinesses();
     }
   }
 } catch (error) {
   console.error('Error al cambiar estado del comercio:', error);
   showNotification('error', 'Error', 'Error al actualizar el estado del comercio');
 }
};

const toggleBusinessFeatured = async (business) => {
 try {
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

// Utility methods
const formatDate = (date) => {
 if (!date) return 'N/A';
 return new Date(date).toLocaleDateString('es-ES', {
   year: 'numeric',
   month: 'short',
   day: 'numeric'
 });
};

const getBusinessStatusClass = (status) => {
 if (status === 'for-rent') {
   return 'bg-green-100 text-green-800';
 } else {
   return 'bg-red-100 text-red-800';
 }
};

const getStatusText = (status) => {
 if (status === 'for-rent') {
   return 'Activo';
 } else {
   return 'Inactivo';
 }
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

// Lifecycle hooks
onMounted(async () => {
 await loadUserData();
 
 // Si el usuario es admin, cargar datos iniciales
 if (user.value.role === 'admin') {
   await loadBusinesses();
   await loadEvents();
   await loadBlogs();
 }
 
 // Cargar script de Google Maps si no existe
 if (!window.google) {
   const script = document.createElement('script');
   script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
   script.async = true;
   script.defer = true;
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
</script>

<style>
/* Estilos personalizados */
input, select, textarea {
 border-color: #D1D5DB;
 border-radius: 0.375rem;
}

input:focus, select:focus, textarea:focus {
 border-color: #F97316;
 box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.2);
 outline: none;
 ring-color: #F97316;
}

button:disabled {
 opacity: 0.5;
 cursor: not-allowed;
}

.table-fixed {
 table-layout: fixed;
}

.truncate {
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
}
</style>