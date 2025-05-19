<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // Importar el router
import blogService from '~/services/blogService'; // Importar el servicio de blog

// Inicializar el router
const router = useRouter();

// Estado para blogs
const featuredBlogs = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Función para navegar a la página de detalles del blog
const navigateToBlog = (blogId) => {
  router.push(`/blog/${blogId}`);
};

// Función para cargar los blogs destacados desde la API
const loadFeaturedBlogs = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Obtener blogs destacados desde la API
    const result = await blogService.getFeaturedBlogs(2); // Obtener 2 blogs destacados
    
    if (result && result.data && result.data.data) {
      // Transformar los blogs al formato que necesitamos
      const transformedBlogs = result.data.data.map(blog => ({
        id: blog.id,
        title: blog.title,
        content: blog.content || '',
        image_url: blog.image_url || getDefaultImage(),
        published_at: blog.published_at,
        category: blog.category || '',
        comments_count: blog.comments_count || 0,
        first_name: blog.first_name || 'Usuario',
        last_name: blog.last_name || '',
        profile_image: blog.profile_image || null
      }));
      
      console.log('Blogs destacados transformados:', transformedBlogs);
      
      // Guardar blogs en el estado
      featuredBlogs.value = transformedBlogs;
      
      // Cargar conteo de comentarios si es necesario
      await fetchCommentCounts();
      
    } else {
      // Si no hay blogs, usar datos de fallback
      console.warn('No se encontraron blogs destacados en la respuesta de la API, usando fallback');
      useFallbackBlogs();
    }
  } catch (err) {
    console.error('Error al cargar blogs destacados:', err);
    error.value = 'Error al cargar los blogs destacados';
    // En caso de error, usar datos de fallback
    useFallbackBlogs();
  } finally {
    isLoading.value = false;
  }
};

// Función para obtener conteo de comentarios para cada blog
const fetchCommentCounts = async () => {
  try {
    // Obtener el conteo de comentarios para cada blog destacado si no tienen
    for (const blog of featuredBlogs.value) {
      if (!blog.comments_count) {
        try {
          const countResponse = await blogService.getCommentCount(blog.id);
          if (countResponse && countResponse.data && countResponse.data.success) {
            blog.comments_count = countResponse.data.data.commentCount || 0;
          }
        } catch (countError) {
          console.warn(`Error al obtener conteo de comentarios para blog destacado ${blog.id}:`, countError);
        }
      }
    }
  } catch (err) {
    console.error('Error al obtener conteos de comentarios:', err);
  }
};

// Función para traducir categorías al español
const translateCategory = (category) => {
  if (!category) return '';
  
  const translations = {
    'Accommodation': 'Alojamiento',
    'Accomodation': 'Alojamiento',
    'Architecture': 'Arquitectura',
    'Entertainment': 'Entretenimiento',
    'Lifestyle': 'Estilo de Vida',
    'Travelling': 'Viajes',
    'Travel': 'Viajes'
  }
  
  return translations[category] || category;
};

// Función para usar datos de fallback en caso de error
const useFallbackBlogs = () => {
  // Datos de blogs para fallback
  featuredBlogs.value = [
    {
      id: 1,
      title: 'Los mejores lugares turísticos para visitar en La Ceiba',
      content: 'Descubre los lugares imperdibles en La Ceiba, desde sus playas hasta el Parque Nacional Pico Bonito.',
      image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      published_at: '2025-04-10',
      category: 'Travelling',
      comments_count: 2,
      first_name: 'Daniel',
      last_name: 'Jones',
      profile_image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      title: 'Arquitectura histórica en el centro de La Ceiba',
      content: 'Un recorrido por las casas y edificios coloniales que cuentan la historia de esta ciudad caribeña.',
      image_url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      published_at: '2025-03-22',
      category: 'Architecture',
      comments_count: 6,
      first_name: 'Gerson',
      last_name: 'Rivera',
      profile_image: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  ];
};

// Función para formatear fechas
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const month = monthNames[date.getMonth()];
    
    return `${day} ${month}`;
  } catch (error) {
    console.error('Error al formatear fecha:', error);
    return dateString;
  }
};

// Función para truncar texto
const truncateContent = (content, length) => {
  if (!content) return '';
  if (content.length <= length) return content;
  
  return content.substring(0, length) + '...';
};

// Función para obtener imagen por defecto
const getDefaultImage = () => {
  // Devolver una imagen predeterminada aleatoria
  const defaultImages = [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];
  
  const randomIndex = Math.floor(Math.random() * defaultImages.length);
  return defaultImages[randomIndex];
};

// Cargar blogs al montar el componente
onMounted(() => {
  loadFeaturedBlogs();
});
</script>

<template>
  <section class="container mx-auto px-4 my-8 py-4">
    <!-- Encabezado con título y enlace "Explora nuestro blog" -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-2">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">¿Te gustó esto? Hay más</h2>
      <NuxtLink class="text-orange-600 hover:text-orange-800 flex items-center" to="/blog/grid">
        Explora nuestro blog
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div class="spinner border-4 border-gray-200 border-t-orange-500 rounded-full w-10 h-10 animate-spin"></div>
    </div>
    
    <!-- Mensaje de error -->
    <div v-else-if="error" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-lg text-gray-800 mb-4">{{ error }}</p>
      <button 
        @click="loadFeaturedBlogs" 
        class="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
      >
        Intentar de nuevo
      </button>
    </div>

    <!-- Mensaje si no hay blogs -->
    <div v-else-if="featuredBlogs.length === 0" class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <p class="text-lg text-gray-800">No se encontraron blogs destacados</p>
    </div>

    <!-- Grid de blogs destacados -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Blog Item -->
      <div v-for="blog in featuredBlogs" :key="blog.id" class="rounded-lg overflow-hidden">
        <!-- Imagen con etiqueta destacado -->
        <div class="relative mb-3">
          <NuxtLink :to="`/blog/${blog.id}`">
            <img 
              class="rounded-lg w-full h-60 object-cover" 
              :src="blog.image_url" 
              :alt="blog.title" 
              @error="$event.target.src = getDefaultImage()"
            />
            <span class="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded">Destacado</span>
          </NuxtLink>
        </div>
        
        <!-- Contenido del blog -->
        <div class="mb-4">
          <!-- Categoría -->
          <div class="text-orange-500 text-xs font-semibold uppercase mb-1">
            {{ translateCategory(blog.category) }}
          </div>
          
          <!-- Título -->
          <h2 class="text-xl font-medium mb-2">
            <NuxtLink :to="`/blog/${blog.id}`" class="title-link">
              {{ blog.title }}
            </NuxtLink>
          </h2>
          
          <!-- Extracto del contenido -->
          <p v-if="blog.content" class="text-gray-600 text-sm mb-4">
            {{ truncateContent(blog.content, 150) }}
          </p>
          
          <!-- Autor e información -->
          <div class="flex items-center">
            <img 
              class="rounded-full w-8 h-8" 
              :src="blog.profile_image" 
              :alt="`Avatar de ${blog.first_name}`"
              @error="$event.target.src = 'https://randomuser.me/api/portraits/lego/1.jpg'"
            />
            <div class="ml-2">
              <h6 class="text-sm font-medium">{{ blog.first_name }} {{ blog.last_name }}</h6>
              <div class="flex text-gray-500 text-xs">
                <span class="mr-2">{{ formatDate(blog.published_at) }}</span>
                <span>{{ blog.comments_count > 0 ? `${blog.comments_count} comentarios` : 'Sin comentarios' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Indicadores de paginación (puntos) -->
    <div class="flex justify-center mt-6">
      <div class="w-2 h-2 mx-1 rounded-full bg-orange-600"></div>
      <div v-for="i in Math.min(2, Math.max(0, featuredBlogs.length - 1))" :key="i" 
           class="w-2 h-2 mx-1 rounded-full bg-gray-300"></div>
    </div>
  </section>
</template>

<style scoped>
/* Animación de spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Estilos básicos para transiciones suaves */
button, a {
  transition: all 0.2s ease;
}

/* Colores personalizados */
.text-orange-600 {
  color: #FD5631;
}

.hover\:text-orange-800:hover {
  color: #9C4221;
}

.text-orange-500 {
  color: #FD5631;
}

.bg-orange-500 {
  background-color: #FD5631;
}

.hover\:bg-orange-600:hover {
  background-color: #E04424;
}

.bg-green-500 {
  background-color: #10B981;
}

/* Estilos para asegurar que los títulos sean negros */
.title-link {
  color: #1A202C !important;
}

.title-link:hover {
  color: #FD5631 !important;
}

/* Asegurar texto de categoría se vea bien */
.uppercase.font-semibold {
  letter-spacing: 0.05em;
}

h2 a, h2 a:link, h2 a:visited {
  color: #1A202C !important;
}

h2 a:hover {
  color: #FD5631 !important;
}

.border-b {
  border-color: #edf2f7;
}

.rounded-lg {
  border-radius: 0.5rem;
}
</style> 