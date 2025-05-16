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
      <!-- Dashboard Stats Cards - manteniendo ancho original pero espaciado mejor -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-3">
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md">
          <div class="p-4">
            <div class="flex items-start">
              <div class="p-2 rounded-lg bg-orange-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Comercios</h3>
                <p class="text-2xl font-bold text-gray-800">{{ stats.totalBusinesses }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md">
          <div class="p-4">
            <div class="flex items-start">
              <div class="p-2 rounded-lg bg-blue-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Eventos</h3>
                <p class="text-2xl font-bold text-gray-800">{{ stats.totalEvents }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md">
          <div class="p-4">
            <div class="flex items-start">
              <div class="p-2 rounded-lg bg-green-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 0a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V7m2-5a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2h-2" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Posts</h3>
                <p class="text-2xl font-bold text-gray-800">{{ stats.totalBlogs }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <!-- Header y controles -->
          <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-gray-800 mb-3 sm:mb-0">Gestión de Comercios</h2>
            <button
              @click="openBusinessModal(null)"
              class="flex items-center justify-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Añadir Comercio
            </button>
          </div>
            
          <!-- Filtros y Búsqueda -->
          <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
            <!-- Búsqueda -->
            <div class="relative mb-4">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Buscar comercios..." 
                class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                @keyup.enter="searchBusinesses"
              />
              <button 
                @click="searchBusinesses" 
                class="absolute right-3 top-2 text-gray-400 hover:text-orange-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
              
            <!-- Filtros -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="col-span-1">
                <label class="block text-xs font-medium text-gray-700 mb-1">Categoría</label>
                <div class="relative">
                  <select v-model="filters.category" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Todas</option>
                    <option value="Alojamiento">Alojamiento</option>
                    <option value="Restaurante y bar">Restaurante y bar</option>
                    <option value="Entretenimiento">Entretenimiento</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    
                  </div>
                </div>
              </div>
                
              <div class="col-span-1">
                <label class="block text-xs font-medium text-gray-700 mb-1">Tipo</label>
                <div class="relative">
                  <select v-model="filters.property_type" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
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
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    
                  </div>
                </div>
              </div>
                
              <div class="col-span-1">
                <label class="block text-xs font-medium text-gray-700 mb-1">Estado</label>
                <div class="relative">
                  <select v-model="filters.status" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Todos</option>
                    <option value="active">Activo</option>
                    <option value="archived">Inactivo</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    
                  </div>
                </div>
              </div>

              <!-- Orden -->
              <div class="col-span-1">
                <label class="block text-xs font-medium text-gray-700 mb-1">Ordenar por</label>
                <div class="flex items-center">
                  <div class="relative flex-grow">
                    <select v-model="filters.sortBy" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                      <option value="title">Nombre</option>
                      <option value="category">Categoría</option>
                      <option value="property_type">Tipo</option>
                      <option value="average_rating">Calificación</option>
                      <option value="views">Vistas</option>
                      <option value="created_at">Fecha de creación</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      
                    </div>
                  </div>
                  <button 
                    @click="toggleSortDirection" 
                    class="ml-2 p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-orange-600"
                    title="Cambiar dirección"
                  >
                    <svg v-if="filters.sortDirection === 'asc'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabla de Comercios -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Comercio</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría/Tipo</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Estado</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Calificación</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vistas</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="business in paginatedBusinesses" :key="business.id" :class="{'bg-gray-50': business.archived}" 
                      class="hover:bg-gray-50 transition-colors">
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="flex items-center">
                        <img :src="business.image || '/img/business-placeholder.jpg'" alt="" class="h-10 w-10 rounded-lg object-cover shadow-sm border border-gray-200">
                        <div class="ml-3">
                          <div class="text-sm font-medium text-gray-900 truncate max-w-xs">{{ business.title }}</div>
                          <div class="text-xs text-gray-500 truncate max-w-xs">{{ business.address }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div>
                        <span class="px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {{ business.category }}
                        </span>
                      </div>
                      <div class="text-xs text-gray-500 mt-1">
                        {{ business.property_type }}
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span :class="[
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                        business.archived ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      ]">
                        <span :class="[
                          'h-1.5 w-1.5 rounded-full mr-1',
                          business.archived ? 'bg-red-400' : 'bg-green-400'
                        ]"></span>
                        {{ business.archived ? 'Inactivo' : 'Activo' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="flex items-center">
                        <span :class="['text-yellow-400', {'opacity-40': !business.average_rating}]">★</span>
                        <span class="ml-1 text-sm text-gray-700">{{ business.average_rating || '0.0' }}</span>
                      </div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {{ business.views || 0 }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="flex space-x-1">
                        <button
                          @click="openBusinessModal(business)"
                          class="p-1.5 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-50"
                          title="Editar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        
                        <div class="relative">
                          <button
                            @click="toggleBusinessFeatured(business)"
                            @mouseenter="showTooltipFor = !canBeHighlighted(business) && !business.isFeatured ? business.id : null"
                            @mouseleave="showTooltipFor = null"
                            :class="[
                              'p-1.5 rounded-full',
                              business.isFeatured ? 'text-purple-600 hover:text-purple-900 hover:bg-purple-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                            ]"
                            :disabled="!canBeHighlighted(business)"
                            :title="business.isFeatured ? 'Quitar destacado' : 'Destacar'"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </button>
                          
                          <!-- Tooltip -->
                          <div 
                            v-if="showTooltipFor === business.id" 
                            class="absolute z-10 bg-black bg-opacity-80 text-white text-xs rounded py-1 px-2 -left-20 -bottom-1 w-40"
                          >
                            <div class="absolute bottom-1 left-20 -mb-1 transform rotate-45 w-2 h-2 bg-black bg-opacity-80"></div>
                            <p v-if="business.category === 'Alojamiento'">
                              Límite alcanzado: 10 destacados
                            </p>
                            <p v-else-if="business.category === 'Restaurante y bar'">
                              Límite alcanzado: 6 destacados
                            </p>
                            <p v-else>
                              Límite alcanzado
                            </p>
                          </div>
                        </div>
                        
                        <button
                          @click="toggleBusinessStatus(business)"
                          :class="[
                            'p-1.5 rounded-full',
                            !business.archived ? 'text-red-600 hover:text-red-900 hover:bg-red-50' : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                          ]"
                          :title="!business.archived ? 'Desactivar' : 'Activar'"
                        >
                          <svg v-if="!business.archived" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        
                        <!-- Botón para ver razón de archivo -->
                        <button
                          v-if="business.archived"
                          @click="showArchiveReason(business)"
                          class="p-1.5 text-blue-600 hover:text-blue-900 rounded-full hover:bg-blue-50"
                          title="Ver razón"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="paginatedBusinesses.length === 0">
                    <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p class="text-base font-medium">No se encontraron comercios</p>
                      <p class="text-sm mt-1">Intenta con otros filtros o crea un nuevo comercio</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Paginación compacta -->
            <div class="px-4 py-3 border-t border-gray-200">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    <span class="font-medium">{{ paginationStart }}</span>-<span class="font-medium">{{ paginationEnd }}</span> de <span class="font-medium">{{ filteredBusinesses.length }}</span>
                  </p>
                </div>
                <div class="flex items-center space-x-1">
                  <button 
                    @click="changePage(currentPage - 1)" 
                    :disabled="currentPage === 1"
                    :class="[
                                  'p-1.5 border border-gray-300 rounded-md',
                     currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-700 hover:text-orange-600'
                   ]"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                   </svg>
                 </button>
                 <div class="flex space-x-1">
                   <button 
                     v-for="page in displayPages" 
                     :key="page"
                     @click="changePage(page)"
                     :class="[
                       'px-2.5 py-1 rounded-md',
                       page === '...' ? 'text-gray-500 cursor-default' : 'border border-gray-300',
                       currentPage === page ? 'bg-orange-600 text-white border-orange-600' : 'hover:bg-gray-50 text-gray-700 hover:text-orange-600'
                     ]"
                   >
                     {{ page }}
                   </button>
                 </div>
                 <button 
                   @click="changePage(currentPage + 1)" 
                   :disabled="currentPage >= totalPages"
                   :class="[
                     'p-1.5 border border-gray-300 rounded-md',
                     currentPage >= totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-700 hover:text-orange-600'
                   ]"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                   </svg>
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>

       <!-- Otros tabs (events, blogs) - simplificados -->
       <div v-if="activeTab === 'events'" class="animate-fadeIn">
         <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-blue-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
           <h3 class="text-lg font-bold text-gray-800 mb-2">Gestión de Eventos</h3>
           <p class="text-gray-600 mb-4">Esta sección estará disponible próximamente</p>
           <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm">
             Explorar Eventos
           </button>
         </div>
       </div>
       
       <div v-if="activeTab === 'blogs'" class="animate-fadeIn">
         <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 0a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V7m2-5a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2h-2" />
           </svg>
           <h3 class="text-lg font-bold text-gray-800 mb-2">Gestión de Blog Posts</h3>
           <p class="text-gray-600 mb-4">Esta sección estará disponible próximamente</p>
           <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-sm">
             Explorar Blog Posts
           </button>
         </div>
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
                 <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Propiedad</label>
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

// Búsqueda
const searchQuery = ref('');

// Paginación
const itemsPerPage = 10;
const currentPage = ref(1);

// Estados de loading
const isLoading = ref(false);

// Estados de modales
const showBusinessModal = ref(false);
const showEventModal = ref(false);
const showBlogModal = ref(false);
const showArchiveModal = ref(false);
const showArchiveReasonModal = ref(false);

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
  if (newAmenity.value.trim() && amenities.value.length < 10) {
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

const filteredBusinesses = computed(() => {
  console.log("Ejecutando filtrado de comercios...");
  console.log(`Total comercios antes de filtrar: ${businesses.value.length}`);
  console.log(`Comercios archivados antes de filtrar: ${businesses.value.filter(b => b.archived).length}`);
  
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
    console.log("Filtrando solo comercios archivados");
    result = result.filter(business => business.archived === true);
  } else if (filters.value.status === 'active') {
    console.log("Filtrando solo comercios activos");
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
  
  console.log(`Resultado después de filtrar: ${result.length} comercios`);
  console.log(`Comercios archivados después de filtrar: ${result.filter(b => b.archived).length}`);
  
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

// Paginación
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

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== '...') {
    currentPage.value = page;
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
        console.log('Token payload:', payload);
        
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
    
    console.log("Solicitando todos los comercios incluyendo archivados...");
    
    const response = await axios.get('/api/properties/all', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.data?.success) {
      businesses.value = response.data.data.properties || [];
      
      // Convertir explícitamente archived a booleano
      businesses.value.forEach(business => {
        business.archived = business.archived === 1 || business.archived === true;
      });
      
      // Imprimir detalles para depuración
      const archivedCount = businesses.value.filter(b => b.archived).length;
      console.log(`Comercios cargados: ${businesses.value.length}, Archivados: ${archivedCount}`);
      
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
    
    // Cargar amenidades si existen
    if (businessData.amenities) {
      amenities.value = Array.isArray(businessData.amenities) ? 
        [...businessData.amenities] : 
        [businessData.amenities];
    }
    
    // Si estamos editando, obtener las amenidades desde el servidor
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
  
  // Resetear amenidades/especialidades - CORREGIDO
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
    
    // Agregar solo los campos que existen en tu base de datos
    formData.append('title', businessForm.value.title || '');
    formData.append('description', businessForm.value.description || '');
    formData.append('address', businessForm.value.address || '');
    formData.append('phone', businessForm.value.phone || '');
    formData.append('email', businessForm.value.email || '');
    formData.append('category', businessForm.value.category || '');
    formData.append('property_type', businessForm.value.property_type || '');
    formData.append('schedule', scheduleString || '');
    
    // Agregar amenidades
    amenities.value.forEach((amenity, index) => {
      formData.append(`amenities[${index}]`, amenity);
    });
    
    // Agregar start_time y end_time que SI existen en tu base de datos
    if (startTime) formData.append('start_time', startTime);
    if (endTime) formData.append('end_time', endTime);
    
    // Convertir booleanos
    if (typeof businessForm.value.isFeatured !== 'undefined') {
      formData.append('isFeatured', businessForm.value.isFeatured ? '1' : '0');
    }
    
    // Agregar coordenadas
    if (businessForm.value.lat) {
      formData.append('lat', businessForm.value.lat.toString());
    }
    if (businessForm.value.lng) {
      formData.append('lng', businessForm.value.lng.toString());
    }
    
    // Inicializar views si es necesario para nuevos registros
    if (!isEditingBusiness.value) {
      formData.append('views', '0');
    }
    
    // Agregar imagen principal si existe
    if (mainImageFile.value) {
      formData.append('image', mainImageFile.value);
    }
    
    // Agregar imágenes adicionales si existen
    if (additionalImageFiles.value.length > 0) {
      additionalImageFiles.value.forEach(file => {
        formData.append('additional_images', file);
      });
    }
    
    // Para depuración, imprimir lo que se está enviando
    console.log('Enviando datos del comercio con formato corregido:');
    for (let [key, value] of formData.entries()) {
      if (key !== 'image' && !key.includes('additional_images')) {
        console.log(`${key}: ${value}`);
      } else {
        console.log(`${key}: [Archivo]`);
      }
    }
    
    // Mostrar notificación de carga
    showNotification('success', 'Procesando', 'Guardando datos del comercio...');
    
    let response;
    
    if (isEditingBusiness.value) {
      response = await axios.put(`/api/properties/${businessForm.value.id}`, formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        timeout: 60000 // 60 segundos
      });
    } else {
      response = await axios.post('/api/properties', formData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        timeout: 60000 // 60 segundos
      });
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
    
    // Información más detallada para depuración
    if (error.response) {
      console.error('Respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
      console.error('Cabeceras:', error.response.headers);
      
      const errorMsg = error.response.data?.message || 'Error desconocido en el servidor';
      showNotification('error', 'Error del servidor', `${errorMsg} (Código: ${error.response.status})`);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
      showNotification('error', 'Error de conexión', 'No se pudo conectar con el servidor. Tiempo de espera agotado.');
    } else {
      console.error('Error de configuración:', error.message);
      showNotification('error', 'Error', error.message);
    }
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

const getFeatureButtonTooltip = (business) => {
  if (business.isFeatured) {
    return 'Quitar destacado';
  }
  
  if (business.archived) {
    return 'No se puede destacar un comercio inactivo';
  }
  
  if (!canBeHighlighted(business)) {
    if (business.category === 'Alojamiento') {
      return 'Límite alcanzado: Ya hay 10 propiedades destacadas en Alojamiento';
    } else if (business.category === 'Restaurante y bar') {
      return 'Límite alcanzado: Ya hay 6 propiedades destacadas en Restaurante y bar';
    }
    return 'No se puede destacar más comercios en esta categoría';
  }
  
  return 'Destacar este comercio';
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