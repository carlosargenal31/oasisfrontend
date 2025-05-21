<!-- components/admin/BlogsSection.vue -->
<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h2 class="text-lg font-bold text-gray-800 mb-3 sm:mb-0">Gestión de Blog Posts</h2>
      <div class="flex items-center">
        <span v-if="featuredBlogsCount >= 2" class="text-xs text-orange-600 mr-3">
          Máximo de blogs destacados alcanzado (2/2)
        </span>
        <button
          @click="$emit('open-blog-modal', null)"
          class="flex items-center justify-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Añadir Post
        </button>
      </div>
    </div>
      
    <!-- Filtros y Búsqueda -->
    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
      <!-- Búsqueda -->
      <div class="relative mb-4">
        <input 
  type="text" 
  v-model="searchQuery" 
  placeholder="Buscar posts..." 
  class="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
  @keyup.enter="$emit('search-blogs', searchQuery)"
/>
<button 
  @click="$emit('search-blogs', searchQuery)" 
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
            <select v-model="localFilters.category" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500" @change="$emit('update-filter', 'category', localFilters.category)">
  <option value="">Todas</option>
  <option v-for="category in blogCategories" :key="category" :value="category">{{ category }}</option>
</select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              
            </div>
          </div>
        </div>
          
        <div class="col-span-1">
          <label class="block text-xs font-medium text-gray-700 mb-1">Estado</label>
          <div class="relative">
            <!-- Selector de estado activo/inactivo -->
<select v-model="localFilters.active" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500" @change="$emit('update-filter', 'active', localFilters.active)">
  <option value="">Todos</option>
  <option :value="true">Activo</option>
  <option :value="false">Inactivo</option>
</select>

            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              
            </div>
          </div>
        </div>
          
        <div class="col-span-2">
          <label class="block text-xs font-medium text-gray-700 mb-1">Ordenar por</label>
          <div class="flex items-center">
            <div class="relative flex-grow">
              <!-- Selector de ordenamiento -->
<select v-model="localFilters.sortBy" class="appearance-none w-full p-2 pl-3 pr-8 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white" @change="$emit('update-filter', 'sortBy', localFilters.sortBy)">
  <option value="published_at">Fecha publicación</option>
  <option value="title">Título</option>
  <option value="category">Categoría</option>
</select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                
              </div>
            </div>
            <button 
              @click="$emit('toggle-sort-direction')" 
              class="ml-2 p-1.5 rounded-md hover:bg-gray-100 text-gray-600 hover:text-orange-600"
              title="Cambiar dirección"
            >
              <svg v-if="localFilters.sortDirection === 'asc'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

    <!-- Tabla de Blogs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/3">Título</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">Categoría</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">Autor</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/12">Estado</th>
              
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/6">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="blog in safeBlogs" :key="blog.id" :class="{'bg-gray-50': !blog.active}" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-3">
                <div class="flex items-center">
                  <img :src="blog.image_url || '/img/blog-placeholder.jpg'" alt="" class="h-10 w-10 rounded-lg object-cover shadow-sm border border-gray-200">
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900 truncate max-w-xs">{{ blog.title }}</div>
                    <div class="text-xs text-gray-500">{{ formatDate(blog.published_at) }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full bg-gray-100 text-gray-800">
                  {{ blog.category }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ blog.first_name }} {{ blog.last_name }}</div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span :class="[
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  blog.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]">
                  <span :class="[
                    'h-1.5 w-1.5 rounded-full mr-1',
                    blog.active ? 'bg-green-400' : 'bg-red-400'
                  ]"></span>
                  {{ blog.active ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex space-x-1">
                  <button
                    @click="$emit('open-blog-modal', blog)"
                    class="p-1.5 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-50"
                    title="Editar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    @click="$emit('toggle-blog-featured', blog)"
                    :class="[
                      'p-1.5 rounded-full',
                      blog.is_featured ? 'text-purple-600 hover:text-purple-900 hover:bg-purple-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50',
                      {'opacity-50 cursor-not-allowed': !canBeHighlighted(blog) && !blog.is_featured}
                    ]"
                    :title="blog.is_featured ? 'Quitar destacado' : 'Destacar (máx 2)'"
                    :disabled="!canBeHighlighted(blog) && !blog.is_featured"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  
                  <button
                    @click="$emit('toggle-blog-status', blog)"
                    :class="[
                      'p-1.5 rounded-full',
                      blog.active ? 'text-red-600 hover:text-red-900 hover:bg-red-50' : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                    ]"
                    :title="blog.active ? 'Desactivar' : 'Activar'"
                  >
                    <svg v-if="blog.active" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="safeBlogs.length === 0">
              <td colspan="6" class="px-4 py-8 text-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 0a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V7m2-5a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2h-2" />
                </svg>
                <p class="text-base font-medium">No se encontraron posts</p>
                <p class="text-sm mt-1">Intenta con otros filtros o crea un nuevo post</p>
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
              <span class="font-medium">{{ safePaginationStart }}</span>-<span class="font-medium">{{ safePaginationEnd }}</span> de <span class="font-medium">{{ safeFilteredBlogs.length }}</span>
            </p>
          </div>
          <div class="flex items-center space-x-1">
            <button 
              @click="$emit('change-page', currentPage - 1)" 
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
                v-for="page in safeDisplayPages" 
                :key="page"
                @click="$emit('change-page', page)"
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
              @click="$emit('change-page', currentPage + 1)" 
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
</template>

<script>

export default {
  props: {
    blogs: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Object,
      default: () => ({
        category: '',
        active: '',
        sortBy: 'published_at',
        sortDirection: 'desc'
      })
    },
    filteredBlogs: {
      type: Array,
      default: () => []
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    paginationStart: {
      type: Number,
      default: 0
    },
    paginationEnd: {
      type: Number,
      default: 0
    },
    displayPages: {
      type: Array,
      default: () => [1]
    }
  },
  data() {
    return {
      searchQuery: '',
      localFilters: {
        category: '',
        active: '',
        sortBy: 'published_at',
        sortDirection: 'desc'
      },
      blogCategories: []
    }
  },
  computed: {
    safeBlogs() {
      return this.blogs || [];
    },
    safeFilteredBlogs() {
      return this.filteredBlogs || [];
    },
    safePaginationStart() {
      return this.paginationStart || 0;
    },
    safePaginationEnd() {
      return this.paginationEnd || 0;
    },
    safeDisplayPages() {
      return this.displayPages || [1];
    },
    // Contar blogs destacados (solo los activos)
    featuredBlogsCount() {
      return this.safeFilteredBlogs.filter(blog => blog.is_featured && blog.active).length;
    },
    // Contar blogs activos
    activeBlogsCount() {
      return this.safeFilteredBlogs.filter(blog => blog.active).length;
    },
    // Contar blogs inactivos
    inactiveBlogsCount() {
      return this.safeFilteredBlogs.filter(blog => !blog.active).length;
    },
    // Conteo por categorías (solo activos)
    categoryCountsActive() {
      const counts = {};
      this.safeFilteredBlogs.filter(blog => blog.active).forEach(blog => {
        if (blog.category) {
          counts[blog.category] = (counts[blog.category] || 0) + 1;
        }
      });
      return counts;
    }
  },
  created() {
    // Sincronizar valores locales con props
    this.localFilters = { ...this.filters };
    
    // Extraer categorías únicas de todos los blogs (activos e inactivos)
    const categories = new Set();
    this.safeBlogs.forEach(blog => {
      if (blog.category) {
        categories.add(blog.category);
      }
    });
    this.blogCategories = Array.from(categories).sort();
  },
  methods: {
  // Verificar si un blog puede ser destacado
  canBeHighlighted(blog) {
    // Si ya está destacado, siempre permitir (para poder quitarlo)
    if (blog.is_featured) return true;
    
    // No permitir destacar blogs inactivos
    if (!blog.active) return false;
    
    // Verificar el límite (máximo 2 blogs destacados activos)
    return this.featuredBlogsCount < 2;
  },
  
  // Formatear fecha para mostrar
  formatDate(dateString) {
    if (!dateString) return '';
    
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', options);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
  }
},
  watch: {
    filters: {
      handler(newFilters) {
        this.localFilters = { ...newFilters };
      },
      deep: true
    },
    blogs: {
      handler(newBlogs) {
        // Actualizar categorías cuando cambien los blogs
        const categories = new Set();
        newBlogs.forEach(blog => {
          if (blog.category) {
            categories.add(blog.category);
          }
        });
        this.blogCategories = Array.from(categories).sort();
      },
      deep: true
    }
  }
}
</script>

<style scoped>
/* Opcional: Animaciones cuando cambia el contenido */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>