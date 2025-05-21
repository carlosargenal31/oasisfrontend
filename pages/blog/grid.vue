<template>
  <div class="container mx-auto px-4 py-5">
    <!-- Breadcrumb -->
    <div class="flex items-center mb-4 text-sm">
      <NuxtLink to="/" class="text-gray-500 hover:text-orange-600">Inicio</NuxtLink>
      <span class="mx-2 text-gray-400">></span>
      <span class="text-gray-700">Blog</span>
    </div>

    <h1 class="text-3xl font-bold mb-6">Noticias y perspectivas de La Ceiba</h1>
    
    <!-- Loading state para destacados -->
    <div v-if="loadingFeatured" class="flex justify-center items-center h-32 mb-10">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
    </div>
    
    <!-- Destacados posts -->
    <div v-else-if="featuredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 pb-10 border-b">
      <!-- Featured Blog Items -->
      <div v-for="blog in featuredBlogs" :key="blog.id">
        <div class="relative mb-3">
          <NuxtLink :to="`/blog/${blog.id}`">
            <img 
              class="rounded-lg w-full h-60 object-cover" 
              :src="blog.image_url || getDefaultImage()" 
              :alt="blog.title" 
            />
            <span class="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">Destacado</span>
          </NuxtLink>
        </div>
        <div class="mb-4">
          <div class="text-orange-500 text-xs font-semibold uppercase mb-1">{{ translateCategory(blog.category) }}</div>
          <h2 class="text-xl font-medium mb-2">
            <NuxtLink :to="`/blog/${blog.id}`" class="title-link">{{ blog.title }}</NuxtLink>
          </h2>
          <p class="text-gray-600 text-sm mb-4">
            {{ truncateContent(blog.content, 150) }}
          </p>
          <div class="flex items-center">
            <img 
              class="rounded-full w-8 h-8" 
              :src="blog.profile_image || '@/assets/images/blog/11.jpg'" 
              alt="Avatar" 
            />
            <div class="ml-2">
              <h6 class="text-sm font-medium">{{ blog.first_name }} {{ blog.last_name }}</h6>
              <div class="flex text-gray-500 text-xs">
                <span class="mr-2">{{ formatDate(blog.published_at) }}</span>
                <span>{{ blog.comments_count || 0 }} comentarios</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main content with sidebar -->
    <div class="flex flex-col md:flex-row">
      <!-- Left sidebar -->
      <div class="w-full md:w-1/4 md:pr-6 mb-8 md:mb-0">
        <!-- Componente de ordenación optimizado -->
<div class="mb-6">
  <div class="flex items-center mb-2">
    <span class="text-sm text-gray-500">Ordenar por:</span>
  </div>
  <select 
    v-model="sortOption" 
    @change="handleSortChange" 
    class="w-full p-2 border rounded-md text-sm"
    :disabled="loading"
  >
    <option value="newest">Más recientes</option>
    <option value="oldest">Más antiguos</option>
    
  </select>
  
  <!-- Indicador de carga sencillo -->
  <div v-if="loading" class="mt-2 text-xs text-gray-500 flex items-center">
    <div class="mr-2 h-3 w-3 rounded-full border-2 border-t-transparent border-orange-500 animate-spin"></div>
    <span>Cargando...</span>
  </div>
</div>

        <!-- Search -->
        <div class="mb-6">
          <div class="relative">
            <input 
              type="text" 
              v-model="searchTerm"
              placeholder="Buscar artículo por palabras clave..." 
              class="w-full p-2 pl-3 pr-10 border rounded-md text-sm"
              @keyup.enter="searchBlogs"
            />
            <button @click="searchBlogs" class="absolute right-2 top-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Categories -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">Categorías</h3>
          <ul class="space-y-2">
            <li class="flex justify-between mb-2">
              <a href="#" @click.prevent="resetFilters" class="text-orange-600 font-medium hover:underline">
                Todas las categorías
              </a>
            </li>
            <li v-for="category in categories" :key="category.name" class="flex justify-between">
              <a 
                href="#" 
                @click.prevent="filterByCategory(category.name)" 
                :class="[
                  'hover:text-orange-600', 
                  activeCategory === category.name ? 'text-orange-600 font-medium' : 'text-gray-700'
                ]"
              >
                {{ translateCategory(category.name) }}
              </a>
              <span class="text-gray-500">({{ category.count || 1 }})</span>
            </li>
          </ul>
        </div>

        <!-- Popular Tags -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">Etiquetas Populares</h3>
          <div class="flex flex-wrap gap-2">
            <a 
              v-for="tag in popularTags" 
              :key="tag" 
              href="#" 
              @click.prevent="filterByTag(tag)"
              class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200"
            >
              {{ tag }}
            </a>
          </div>
        </div>

        <!-- Debug info (solo durante desarrollo) -->
        <div v-if="showDebug" class="p-3 bg-gray-100 rounded-md mb-6">
          <h3 class="font-medium mb-2">Información de depuración:</h3>
          <p>Página actual: {{ currentPage }}</p>
          <p>Total posts: {{ totalBlogsCount }}</p>
          <p>Orden: {{ sortOption }}</p>
          <p>Categoría: {{ activeCategory || 'Todas' }}</p>
          <p>Término búsqueda: {{ searchTerm || 'Ninguno' }}</p>
          <p>API URL: {{ apiUrl }}</p>
          <button @click="fetchAllBlogs" class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs">
            Cargar todos
          </button>
        </div>
      </div>

      <!-- Articles list -->
      <div class="w-full md:w-3/4">
        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
        
        <!-- Error state -->
        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span class="block sm:inline">{{ error }}</span>
          <button 
            @click="fetchBlogs" 
            class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Intentar de nuevo
          </button>
        </div>
        
        <!-- No results -->
        <div v-else-if="blogs.length === 0" class="text-center py-10">
          <p class="text-gray-500">No se encontraron blogs que coincidan con tu búsqueda.</p>
          <button 
            @click="resetFilters" 
            class="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Ver todos los blogs
          </button>
        </div>
        
        <!-- Blog items -->
        <template v-else>
          <div v-for="blog in blogs" :key="blog.id" class="mb-8 border-b pb-8">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                <div class="relative">
                  <NuxtLink :to="`/blog/${blog.id}`">
                    <img 
                      class="rounded-lg w-full h-56 object-cover" 
                      :src="blog.image_url || getDefaultImage()" 
                      :alt="blog.title" 
                    />
                    <span 
                      v-if="isNewBlog(blog.published_at)" 
                      class="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded"
                    >
                      Nuevo
                    </span>
                    <span 
                      v-else-if="blog.is_featured" 
                      class="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded"
                    >
                      Destacado
                    </span>
                  </NuxtLink>
                </div>
              </div>
              <div class="md:w-2/3">
                <div class="text-orange-500 text-xs font-semibold uppercase mb-1">{{ translateCategory(blog.category) }}</div>
                <h2 class="text-xl font-medium mb-2">
                  <NuxtLink :to="`/blog/${blog.id}`" class="title-link">{{ blog.title }}</NuxtLink>
                </h2>
                <p class="text-gray-600 text-sm mb-4">
                  {{ truncateContent(blog.content, 150) }}
                </p>
                <div class="flex items-center">
                  <img 
                    class="rounded-full w-8 h-8" 
                    :src="blog.profile_image || '@/assets/images/blog/11.jpg'" 
                    alt="Avatar" 
                  />
                  <div class="ml-2">
                    <h6 class="text-sm font-medium">{{ blog.first_name || 'Usuario' }} {{ blog.last_name || 'Prueba' }}</h6>
                    <div class="flex text-gray-500 text-xs">
                      <span class="mr-2">{{ formatDate(blog.published_at) }}</span>
                      <span>{{ blog.comments_count || 0 }} comentarios</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-10">
          <nav class="inline-flex items-center">
            <span class="text-sm text-gray-500 mr-4">Página {{ currentPage }} de {{ totalPages }}</span>
            <a 
              v-if="currentPage > 1"
              href="#" 
              @click.prevent="changePage(currentPage - 1)"
              class="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700 mr-1 hover:bg-gray-200 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <a 
              v-for="page in totalPages <= 5 ? totalPages : 5" 
              :key="page" 
              href="#" 
              @click.prevent="changePage(page)"
              :class="[
                'w-8 h-8 flex items-center justify-center mx-1 rounded-full',
                currentPage === page 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              {{ page }}
            </a>
            <a 
              v-if="currentPage < totalPages" 
              href="#" 
              @click.prevent="changePage(currentPage + 1)"
              class="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-700 ml-1 hover:bg-gray-200 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import blogService from '@/services/blogService'

// Imágenes por defecto (fallback)
import defaultImage from "@/assets/images/blog/06.jpg"
import b7 from "@/assets/images/blog/07.jpg"
import b8 from "@/assets/images/blog/08.jpg"
import b9 from "@/assets/images/blog/09.jpg"
import b10 from "@/assets/images/blog/10.jpg"
import b11 from "@/assets/images/blog/11.jpg"

// Variables reactivas
const blogs = ref([])
const featuredBlogs = ref([])
const loading = ref(true)
const loadingFeatured = ref(true)
const error = ref(null)
const categories = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(5) // Exactamente 5 posts por página
const totalBlogsCount = ref(0) // Para manejar el conteo total
const searchTerm = ref('')
const sortOption = ref('newest')
const activeCategory = ref('')
const popularTags = ref(['Carnaval', 'Playa', 'Comida', 'Pico Bonito', 'Centro', 'Islas'])
const allBlogs = ref([]) // Para almacenar todos los blogs si es necesario
const showDebug = ref(false) // Activar para depuración
const apiUrl = ref('') // Para mostrar la URL construida durante depuración

// Para compatibilidad con Nuxt
definePageMeta({
  title: 'Blog La Ceiba',
})

// Función para traducir categorías al español
const translateCategory = (category) => {
  if (!category) return ''
  
  const translations = {
    'Accommodation': 'Alojamiento',
    'Accomodation': 'Alojamiento',
    'Architecture': 'Arquitectura',
    'Entertainment': 'Entretenimiento',
    'Lifestyle': 'Estilo de Vida',
    'Travelling': 'Viajes'
  }
  
  return translations[category] || category
}

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    // Inicializar con todos los datos
    currentPage.value = 1;
    
    // Cargar datos iniciales
    await Promise.all([
      fetchFeaturedBlogs(),
      fetchCategories()
    ])
    
    // Cargar blogs (con la página inicial)
    await fetchBlogs()
  } catch (err) {
    console.error('Error al inicializar el blog:', err)
  }
})

// Obtener conteo de comentarios para cada blog
const fetchCommentCounts = async () => {
  try {
    // Obtener el conteo de comentarios para cada blog en la lista actual
    for (const blog of blogs.value) {
      if (!blog.comments_count) {
        try {
          const countResponse = await blogService.getCommentCount(blog.id)
          if (countResponse && countResponse.data && countResponse.data.success) {
            blog.comments_count = countResponse.data.data.commentCount || 0
          }
        } catch (countError) {
          console.warn(`Error al obtener conteo de comentarios para blog ${blog.id}:`, countError)
          // Si falla, dejamos el valor por defecto (0 o el valor existente)
        }
      }
    }
    
    // También obtener conteos para blogs destacados si no tienen
    for (const featuredBlog of featuredBlogs.value) {
      if (!featuredBlog.comments_count) {
        try {
          const countResponse = await blogService.getCommentCount(featuredBlog.id)
          if (countResponse && countResponse.data && countResponse.data.success) {
            featuredBlog.comments_count = countResponse.data.data.commentCount || 0
          }
        } catch (countError) {
          console.warn(`Error al obtener conteo de comentarios para blog destacado ${featuredBlog.id}:`, countError)
        }
      }
    }
  } catch (err) {
    console.error('Error al obtener conteos de comentarios:', err)
  }
}

// 2. Función mejorada de fetchBlogs que maneja mejor los errores de API
const fetchBlogs = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    // Preparar parámetros para el servicio
    const params = {
      offset: (currentPage.value - 1) * itemsPerPage.value,
      limit: itemsPerPage.value,
      active: true
    };
    
    // Configurar parámetros de ordenación
    if (sortOption.value === 'newest') {
      params.sort_by = 'published_at';
      params.sort_order = 'desc';
    } else if (sortOption.value === 'oldest') {
      params.sort_by = 'published_at';
      params.sort_order = 'asc';
    } else if (sortOption.value === 'popular') {
      params.sort_by = 'comments_count';
      params.sort_order = 'desc';
    }
    
    // Añadir parámetros de filtrado
    if (searchTerm.value) {
      params.search = searchTerm.value;
    }
    
    if (activeCategory.value) {
      params.category = activeCategory.value;
    }
    
    // Para depuración, mostrar la URL que se utilizaría
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      urlParams.append(key, value);
    });
    apiUrl.value = `/api/blogs?${urlParams.toString()}`;
    
    // Intentar usar primero el método fetchAllBlogs y aplicar filtros manualmente
    const allBlogsResponse = await blogService.getAllBlogs();
    
    // Procesar datos de todos los blogs
    let allBlogsData = [];
    
    if (allBlogsResponse?.data?.data?.blogs) {
      allBlogsData = allBlogsResponse.data.data.blogs;
    } else if (Array.isArray(allBlogsResponse?.data?.data)) {
      allBlogsData = allBlogsResponse.data.data;
    } else if (Array.isArray(allBlogsResponse?.data)) {
      allBlogsData = allBlogsResponse.data;
    }
    
    // Guardar todos los blogs para uso futuro
    allBlogs.value = allBlogsData;
    
    // Aplicar filtros manualmente
    let filteredBlogs = [...allBlogsData];
    
    // Filtrar por categoría si es necesario
    if (activeCategory.value) {
      filteredBlogs = filteredBlogs.filter(blog => blog.category === activeCategory.value);
    }
    
    // Filtrar por término de búsqueda si es necesario
    if (searchTerm.value) {
      const search = searchTerm.value.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog => 
        (blog.title?.toLowerCase()?.includes(search)) || 
        (blog.content?.toLowerCase()?.includes(search))
      );
    }
    
    // Filtrar solo blogs activos
    filteredBlogs = filteredBlogs.filter(blog => blog.active !== false);
    
    // Aplicar ordenación manualmente
    if (sortOption.value === 'newest') {
      filteredBlogs.sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at));
    } else if (sortOption.value === 'oldest') {
      filteredBlogs.sort((a, b) => new Date(a.published_at || a.created_at) - new Date(b.published_at || b.created_at));
    } else if (sortOption.value === 'popular') {
      filteredBlogs.sort((a, b) => (b.comments_count || 0) - (a.comments_count || 0));
    }
    
    // Aplicar paginación
    totalBlogsCount.value = filteredBlogs.length;
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    blogs.value = filteredBlogs.slice(startIndex, endIndex);
    
    // Obtener conteo de comentarios si es necesario
    if (blogs.value.length > 0) {
      await fetchCommentCounts();
    }
    
  } catch (err) {
    console.error('Error al obtener blogs:', err);
    error.value = 'Error al cargar los blogs. Por favor, intenta de nuevo más tarde.';
    blogs.value = [];
  } finally {
    loading.value = false;
  }
}

const fetchAllBlogs = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Preparar parámetros de ordenación para getAllBlogs
    const params = {}
    
    if (sortOption.value === 'newest') {
      params.sort_by = 'published_at'
      params.sort_order = 'desc'
    } else if (sortOption.value === 'oldest') {
      params.sort_by = 'published_at'
      params.sort_order = 'asc'
    } else if (sortOption.value === 'popular') {
      params.sort_by = 'comments_count'
      params.sort_order = 'desc'
    }
    
    const response = await blogService.getAllBlogs(params)
    
    if (response?.data?.data) {
      allBlogs.value = response.data.data
    } else if (Array.isArray(response?.data)) {
      allBlogs.value = response.data
    }
    
    // Aplicar filtros si es necesario
    let filteredBlogs = [...allBlogs.value]
    
    if (activeCategory.value) {
      filteredBlogs = filteredBlogs.filter(blog => blog.category === activeCategory.value)
    }
    
    if (searchTerm.value) {
      const search = searchTerm.value.toLowerCase()
      filteredBlogs = filteredBlogs.filter(blog => 
        (blog.title?.toLowerCase()?.includes(search)) || 
        (blog.content?.toLowerCase()?.includes(search))
      )
    }
    
    // Aplicar ordenación manualmente si es necesario
    if (sortOption.value === 'newest') {
      filteredBlogs.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    } else if (sortOption.value === 'oldest') {
      filteredBlogs.sort((a, b) => new Date(a.published_at) - new Date(b.published_at))
    } else if (sortOption.value === 'popular') {
      filteredBlogs.sort((a, b) => (b.comments_count || 0) - (a.comments_count || 0))
    }
    
    // Aplicar paginación
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value
    blogs.value = filteredBlogs.slice(startIndex, endIndex)
    totalBlogsCount.value = filteredBlogs.length
    
    // Obtener conteo de comentarios para cada blog
    if (blogs.value.length > 0) {
      await fetchCommentCounts()
    }
    
  } catch (err) {
    console.error('Error fetching all blogs:', err)
    error.value = 'Error al cargar todos los blogs. Por favor, intenta de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}

// 3. Función simplificada para obtener blogs destacados
const fetchFeaturedBlogs = async () => {
  loadingFeatured.value = true;
  
  try {
    // Intentar obtener blogs destacados a través del servicio
    const response = await blogService.getAllBlogs();
    
    let allBlogsData = [];
    
    if (response?.data?.data?.blogs) {
      allBlogsData = response.data.data.blogs;
    } else if (Array.isArray(response?.data?.data)) {
      allBlogsData = response.data.data;
    } else if (Array.isArray(response?.data)) {
      allBlogsData = response.data;
    }
    
    // Filtrar manualmente los blogs destacados
    featuredBlogs.value = allBlogsData
      .filter(blog => blog.is_featured && blog.active !== false)
      .sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at))
      .slice(0, 2);
    
    // Obtener conteo de comentarios para blogs destacados
    if (featuredBlogs.value.length > 0) {
      await fetchCommentCounts();
    }
  } catch (err) {
    console.error('Error al obtener blogs destacados:', err);
    featuredBlogs.value = [];
  } finally {
    loadingFeatured.value = false;
  }
}

// Obtener categorías desde la API
const fetchCategories = async () => {
  try {
    const response = await blogService.getCategories()
    
    if (!response?.data?.data) {
      throw new Error('No se pudieron cargar las categorías')
    }
    
    const categoryList = response.data.data
    
    // Formatear categorías con su conteo
    const formattedCategories = []
    
    // Si la API proporciona conteos directamente
    if (response.data.counts || response.data.data.counts) {
      const categoryCounts = response.data.counts || response.data.data.counts
      
      for (const category of categoryList) {
        const count = categoryCounts[category] || 1
        formattedCategories.push({ name: category, count })
      }
    } else {
      // Si no hay conteos, hacer solicitudes adicionales
      for (const category of categoryList) {
        try {
          const countResponse = await blogService.getBlogs({
            category: category,
            count_only: true
          })
          
          let count = 1
          if (countResponse.data.data?.total) {
            count = countResponse.data.data.total
          } else if (countResponse.data.total) {
            count = countResponse.data.total
          } else if (countResponse.data.meta?.total) {
            count = countResponse.data.meta.total
          }
          
          formattedCategories.push({ name: category, count })
        } catch (error) {
          console.error(`Error obteniendo conteo para categoría ${category}:`, error)
          formattedCategories.push({ name: category, count: 1 })
        }
      }
    }
    
    categories.value = formattedCategories
  } catch (err) {
    console.error('Error fetching categories:', err)
    
    // Si falla la API, obtener categorías únicas de los blogs cargados
    if (blogs.value.length > 0) {
      const uniqueCategories = [...new Set(blogs.value.map(blog => blog.category))]
      
      categories.value = uniqueCategories.map(cat => {
        return {
          name: cat,
          count: blogs.value.filter(blog => blog.category === cat).length || 1
        }
      })
    } else {
      categories.value = [
        { name: 'Accommodation', count: 1 },
        { name: 'Architecture', count: 1 },
        { name: 'Entertainment', count: 1 },
        { name: 'Lifestyle', count: 1 },
        { name: 'Travelling', count: 1 }
      ]
    }
  }
}

// Cambiar la página actual
const changePage = (page) => {
  if (page === currentPage.value) return
  
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
  fetchBlogs()
}

// 1. Función corregida para manejar cambios en la ordenación
const handleSortChange = () => {
  console.log('Cambiando orden a:', sortOption.value);
  currentPage.value = 1;
  fetchBlogs();
}
// Filtrar por categoría
const filterByCategory = (category) => {
  activeCategory.value = category
  currentPage.value = 1
  fetchBlogs()
}

// Resetear todos los filtros
const resetFilters = () => {
  activeCategory.value = ''
  searchTerm.value = ''
  currentPage.value = 1
  sortOption.value = 'newest'
  fetchBlogs()
}

// Filtrar por etiqueta
const filterByTag = (tag) => {
  searchTerm.value = tag
  searchBlogs()
}

// Buscar blogs
const searchBlogs = () => {
  currentPage.value = 1
  fetchBlogs()
}


const totalPages = computed(() => {
  return Math.max(1, Math.ceil(totalBlogsCount.value / itemsPerPage.value))
})

// Utilidades
const truncateContent = (content, length) => {
  if (!content) return ''
  if (content.length <= length) return content
  
  return content.substring(0, length) + '...'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  
  // Opciones para formato español
  const options = { day: 'numeric', month: 'short' }
  
  try {
    return date.toLocaleDateString('es-ES', options)
  } catch (e) {
    // Fallback en caso de error con el formato
    return date.toLocaleDateString('en-US', options)
  }
}

const isNewBlog = (dateString) => {
  if (!dateString) return false
  
  const blogDate = new Date(dateString)
  const now = new Date()
  const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7))
  
  return blogDate >= sevenDaysAgo
}

const getDefaultImage = () => {
  // Devolver una imagen predeterminada aleatoria si no hay imagen_url
  const defaultImages = [defaultImage, b7, b8, b9, b10, b11]
  const randomIndex = Math.floor(Math.random() * defaultImages.length)
  return defaultImages[randomIndex]
}

// Observadores
watch(currentPage, () => {
  // Scroll to top cuando cambia la página
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
/* Estilo para las etiquetas de categoría */
.text-xs.font-semibold.uppercase {
  letter-spacing: 0.05em;
}

/* Estilos adicionales para refinamiento */
.rounded-lg {
  border-radius: 0.5rem;
}

.border-b {
  border-color: #edf2f7;
}

/* Clase específica para forzar el color negro en los títulos */
.title-link {
  color: #1a202c !important; /* Equivalente a text-gray-900 pero con !important */
}

.title-link:hover {
  color: #dd6b20 !important; /* Equivalente a hover:text-orange-600 pero con !important */
}

/* Fallback para asegurar que todos los títulos sean negros */
h2 a, h2 a:link, h2 a:visited {
  color: #1a202c !important;
}
h2 a:hover {
  color: #dd6b20 !important;
}
</style>