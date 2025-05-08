<template>
  <div class="container mx-auto px-4 py-5">
    <!-- Breadcrumb -->
    <div class="flex items-center mb-4 text-sm">
      <NuxtLink to="/" class="text-gray-500 hover:text-orange-600">Home</NuxtLink>
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
              class="rounded-lg w-full h-40 object-cover" 
              :src="blog.image_url || getDefaultImage()" 
              :alt="blog.title" 
            />
            <span class="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">Destacado</span>
          </NuxtLink>
        </div>
        <div class="mb-4">
          <div class="text-orange-500 text-xs font-semibold uppercase mb-1">{{ blog.category }}</div>
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
        <!-- Sort by -->
        <div class="mb-6">
          <div class="flex items-center mb-2">
            <span class="text-sm text-gray-500">Ordenar por:</span>
          </div>
          <select v-model="sortOption" @change="sortBlogs" class="w-full p-2 border rounded-md text-sm">
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
            <option value="popular">Populares</option>
          </select>
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
            <li v-for="category in categories" :key="category.name" class="flex justify-between">
              <a href="#" @click.prevent="filterByCategory(category.name)" class="text-gray-700 hover:text-orange-600">
                {{ category.name }}
              </a>
              <span class="text-gray-500">({{ category.count }})</span>
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
        </div>
        
        <!-- No results -->
        <div v-else-if="blogs.length === 0" class="text-center py-10">
          <p class="text-gray-500">No se encontraron blogs que coincidan con tu búsqueda.</p>
        </div>
        
        <!-- Blog items -->
        <template v-else>
          <div v-for="blog in paginatedBlogs" :key="blog.id" class="mb-8 border-b pb-8">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3 mb-4 md:mb-0 md:mr-6">
                <div class="relative">
                  <NuxtLink :to="`/blog/${blog.id}`">
                    <img 
                      class="rounded-lg w-full h-36 object-cover" 
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
                <div class="text-orange-500 text-xs font-semibold uppercase mb-1">{{ blog.category }}</div>
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
        </template>

        <!-- Pagination -->
        <div v-if="blogs.length > 0" class="flex justify-center mt-10">
          <nav class="inline-flex">
            <a 
              v-for="page in totalPages" 
              :key="page" 
              href="#" 
              @click.prevent="currentPage = page"
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
              @click.prevent="currentPage++"
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
const itemsPerPage = ref(6)
const searchTerm = ref('')
const sortOption = ref('newest')
const activeCategory = ref('')
const popularTags = ref(['Carnaval', 'Playa', 'Comida', 'Pico Bonito', 'Centro', 'Islas'])

// Para compatibilidad con Nuxt
definePageMeta({
  title: 'Blog La Ceiba',
})

// Cargar datos al montar el componente
onMounted(async () => {
  await Promise.all([
    fetchFeaturedBlogs(),
    fetchBlogs(),
    fetchCategories()
  ])
})

// Obtener blogs destacados desde la API
const fetchFeaturedBlogs = async () => {
  loadingFeatured.value = true
  
  try {
    const response = await blogService.getFeaturedBlogs()
    featuredBlogs.value = response.data.data
  } catch (err) {
    console.error('Error fetching featured blogs:', err)
    // No mostramos error para los destacados, simplemente no los mostramos
    featuredBlogs.value = []
  } finally {
    loadingFeatured.value = false
  }
}

// Obtener blogs desde la API
const fetchBlogs = async () => {
  loading.value = true
  error.value = null
  
  try {
    const params = {}
    
    // Añadir parámetros de búsqueda si existen
    if (searchTerm.value) {
      params.search = searchTerm.value
    }
    
    // Añadir parámetros de categoría si existe
    if (activeCategory.value) {
      params.category = activeCategory.value
    }
    
    const response = await blogService.getBlogs(params)
    blogs.value = response.data.data.blogs
  } catch (err) {
    console.error('Error fetching blogs:', err)
    error.value = 'Error al cargar los blogs. Por favor, intenta de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}

// Obtener categorías desde la API
const fetchCategories = async () => {
  try {
    const response = await blogService.getCategories()
    const categoryList = response.data.data
    
    // Formatear categorías con su conteo
    const formattedCategories = []
    for (const category of categoryList) {
      // Contar blogs por cada categoría
      const count = blogs.value.filter(blog => blog.category === category).length
      formattedCategories.push({ name: category, count })
    }
    
    categories.value = formattedCategories
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

// Búsqueda de blogs
const searchBlogs = () => {
  currentPage.value = 1 // Resetear página al buscar
  fetchBlogs()
}

// Ordenar blogs
const sortBlogs = () => {
  const sortedBlogs = [...blogs.value]
  
  switch (sortOption.value) {
    case 'newest':
      sortedBlogs.sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
      break
    case 'oldest':
      sortedBlogs.sort((a, b) => new Date(a.published_at) - new Date(b.published_at))
      break
    case 'popular':
      // Asumiendo que hay un campo para determinar popularidad, como comments_count
      sortedBlogs.sort((a, b) => (b.comments_count || 0) - (a.comments_count || 0))
      break
  }
  
  blogs.value = sortedBlogs
}

// Filtrar por categoría
const filterByCategory = (category) => {
  activeCategory.value = category
  currentPage.value = 1
  fetchBlogs()
}

// Filtrar por etiqueta (implementación simple, adaptar según necesidad)
const filterByTag = (tag) => {
  searchTerm.value = tag
  searchBlogs()
}

// Computados
const paginatedBlogs = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  return blogs.value.slice(startIndex, startIndex + itemsPerPage.value)
})

const totalPages = computed(() => {
  return Math.ceil(blogs.value.length / itemsPerPage.value)
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
  const options = { month: 'short', day: 'numeric' }
  return date.toLocaleDateString('es-ES', options)
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

// Método para extraer posibles etiquetas del contenido
const getTagsFromContent = (content) => {
  if (!content) return []
  
  // Esta es una implementación simple. En un caso real,
  // probablemente querrías usar una API separada para las etiquetas
  // o buscar hashtags en el texto.
  return popularTags.value.filter(tag => content.toLowerCase().includes(tag.toLowerCase()))
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