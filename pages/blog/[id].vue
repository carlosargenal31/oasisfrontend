<template>
  <div>
    <!-- Header with logo and navigation -->
    <header class="bg-white border-b border-gray-200">
      <div class="container mx-auto px-4 py-2">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <div class="text-orange-500 font-bold flex items-center mr-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Finder
            </div>
            <nav class="hidden md:flex space-x-4 text-sm">
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Demos</a>
              <a href="/" class="px-3 py-2 rounded-md hover:bg-gray-100">Home</a>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Catalog</a>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Account</a>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Vendor</a>
              <a href="/blog" class="px-3 py-2 rounded-md bg-orange-100 text-orange-500 font-medium">Blog</a>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <div class="relative hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Sign In" class="pl-10 pr-4 py-1 border border-gray-300 rounded-md text-sm" />
            </div>
            <a href="#" class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">2</span>
            </a>
            <button class="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded">Add Destination</button>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-5 max-w-4xl">
      <!-- Breadcrumb Navigation -->
      <div class="flex text-sm text-gray-500 mb-4">
        <a href="/" class="hover:text-orange-500">Home</a>
        <span class="mx-2">»</span>
        <a href="/blog" class="hover:text-orange-500">Blog</a>
        <span class="mx-2">»</span>
        <span>{{ blog.title }}</span>
      </div>

      <!-- Blog Title -->
      <h1 class="text-3xl font-bold mb-6">{{ blog.title }}</h1>
      
      <!-- Main Content -->
      <div class="mb-8">
        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center items-center h-40">
          <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
        </div>
        
        <!-- Error state -->
        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span class="block sm:inline">{{ error }}</span>
          <a href="/blog" class="text-red-700 font-medium hover:underline">Back to blog</a>
        </div>
        
        <template v-else>
          <!-- Blog Metadata -->
          <div class="flex flex-wrap text-sm text-gray-500 mb-6">
            <div class="bg-orange-100 text-orange-500 px-2 py-1 rounded text-xs uppercase font-semibold mr-3">
              {{ translateCategory(blog.category) || 'VIAJES' }}
            </div>
            <div class="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(blog.published_at) }}</span>
            </div>
            <div class="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ formatReadTime(blog.content) }} min read</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>{{ commentCount || 0 }} comments</span>
            </div>
          </div>
          
          <!-- Featured Image - Adjusted to not be too wide -->
          <div class="mb-6">
            <img 
              class="rounded-lg w-full h-auto max-h-96 object-cover"
              :src="blog.image_url || getDefaultImage()"
              :alt="blog.title"
            />
          </div>
          
          <!-- Author bio at top -->
          <div class="flex items-center mb-6">
            <div class="rounded-full w-12 h-12 overflow-hidden mr-4">
              <img 
                :src="blog.profile_image || getAuthorImage(blog.author_id)" 
                alt="Author" 
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 class="font-medium">{{ blog.first_name }} {{ blog.last_name }}</h4>
              <p class="text-sm text-gray-500">{{ blog.role }}</p>
            </div>
          </div>
          
          <!-- Social links for author -->
          <div class="flex space-x-2 mb-6">
            <a href="#" class="text-gray-500 hover:text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-500 hover:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="text-gray-500 hover:text-pink-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          <!-- Excerpt text -->
          <div class="text-gray-800 mb-6 font-medium">
            {{ blog.excerpt || 'La Ceiba, conocida como la capital ecoturística de Honduras, cuenta con excelente conectividad aérea a través del Aeropuerto Internacional Golosón, facilitando el acceso a esta hermosa región y a las Islas de la Bahía.' }}
          </div>
          
          <!-- Article Content -->
          <div class="prose prose-lg max-w-none mb-8 text-gray-600">
            <div v-if="blog.content" v-html="formattedContent"></div>
          
            <!-- Default content for preview (if no actual content) -->
            <template v-if="!blog.content">
              <p class="text-gray-600">
                La Ceiba, conocida como la capital ecoturística de Honduras, es un destino que ofrece una excelente conectividad para los viajeros. Con transporte regular desde y hacia los principales centros del país, viajar a La Ceiba es una opción conveniente y rápida para los turistas y viajeros de negocios.
              </p>
              <p class="mb-6">
                La ciudad sirve como la principal puerta de entrada a esta región de Honduras. Ubicada a orillas del Mar Caribe, ofrece acceso diario a destinos como Tegucigalpa, San Pedro Sula, Roatán y Guanaja.
              </p>

              <!-- Quote block -->
              <blockquote class="text-2xl text-gray-800 mt-8 mb-8 italic relative px-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 absolute left-0 top-0 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                La Ceiba es la puerta de entrada a las maravillas naturales de Honduras, con conexiones que facilitan el acceso a destinos como Roatán, Utila y el Parque Nacional Pico Bonito.
              </blockquote>

              <p>
                Para aquellos que desean visitar las Islas de la Bahía desde La Ceiba, los viajes a Roatán y Utila son particularmente populares. La ciudad ofrece diversas alternativas de transporte para explorar toda la belleza de esta región caribeña.
              </p>
            </template>
          </div>
          
          <!-- Tags -->
          <div class="mb-8">
            <span class="text-gray-700 mr-2">Etiquetas:</span>
            <a href="#" class="text-orange-500 hover:underline">Viajes</a>,
            <a href="#" class="text-orange-500 hover:underline">Turismo</a>
          </div>
          
          <!-- Share Options -->
          <div class="mb-10">
            <span class="text-gray-700 mr-2">Compartir:</span>
            <div class="flex space-x-2 mt-2">
              <a href="#" @click.prevent="shareOnFacebook" class="text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" @click.prevent="shareOnTwitter" class="text-gray-500 hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" @click.prevent="shareOnPinterest" class="text-gray-500 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <!-- Comentarios y Reseñas -->
          <div class="mb-10">
            <h3 class="text-xl font-bold mb-4">Comentarios ({{ commentCount }})</h3>
            
            <div v-if="comments.length > 0">
              <div v-for="(comment, index) in comments" :key="index" class="mb-6 border-b pb-6 last:border-b-0">
                <div class="flex">
                  <div class="mr-4">
                    <div class="rounded-full w-10 h-10 overflow-hidden">
                      <img 
                        :src="comment.profile_image || getAuthorImage(comment.id)" 
                        alt="Comentarista" 
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center mb-1">
                      <h5 class="font-medium mr-2">{{ comment.name }}</h5>
                      <span class="text-xs text-gray-500">{{ formatDate(comment.date) }}</span>
                    </div>
                    <p class="text-gray-600 mb-2">{{ comment.content }}</p>
                    <div class="flex items-center space-x-4 text-sm">
                      <button class="text-gray-500 hover:text-orange-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        Me gusta
                      </button>
                      <button class="text-gray-500 hover:text-orange-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Responder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Formulario de comentarios -->
            <div class="bg-gray-50 p-6 rounded-lg mt-6">
              <h4 class="font-medium mb-4">Deja tu comentario</h4>
              <form @submit.prevent="submitComment" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="name" class="block text-sm text-gray-600 mb-1">Nombre</label>
                    <input 
                      type="text" 
                      id="name"
                      v-model="newComment.name"
                      class="w-full p-2 text-sm border rounded" 
                      required
                    />
                  </div>
                  <div>
                    <label for="email" class="block text-sm text-gray-600 mb-1">Correo (no será publicado)</label>
                    <input 
                      type="email" 
                      id="email"
                      v-model="newComment.email"
                      class="w-full p-2 text-sm border rounded" 
                      required
                    />
                  </div>
                </div>
                <div>
                  <label for="comment" class="block text-sm text-gray-600 mb-1">Comentario</label>
                  <textarea 
                    id="comment"
                    v-model="newComment.content"
                    rows="4" 
                    class="w-full p-2 text-sm border rounded"
                    required
                  ></textarea>
                </div>
                <div>
                  <button 
                    type="submit"
                    class="px-4 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition"
                    :disabled="commentSubmitting"
                  >
                    {{ commentSubmitting ? 'Enviando...' : 'Publicar Comentario' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <!-- También te puede interesar -->
          <div v-if="relatedBlogs.length > 0" class="mb-10">
            <h3 class="text-xl font-bold mb-6">También te puede interesar</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div v-for="relatedBlog in filteredRelatedBlogs" :key="relatedBlog.id" class="mb-6">
                <div class="relative mb-3">
                  <a :href="`/blog/${relatedBlog.id}`">
                    <img 
                      class="rounded-lg w-full h-32 object-cover" 
                      :src="relatedBlog.image_url || getDefaultImage(relatedBlog.id)" 
                      :alt="relatedBlog.title" 
                    />
                  </a>
                </div>
                <h4 class="text-base font-medium mb-1">
                  <a :href="`/blog/${relatedBlog.id}`" class="hover:text-orange-500">
                    {{ relatedBlog.title }}
                  </a>
                </h4>
                <div class="flex items-center text-xs text-gray-500">
                  <img 
                    class="rounded-full w-5 h-5 mr-1" 
                    :src="relatedBlog.profile_image || getAuthorImage(relatedBlog.author_id)" 
                    :alt="relatedBlog.author_name" 
                  />
                  <span>{{ relatedBlog.author_name }}</span>
                  <span class="mx-1">•</span>
                  <span>{{ formatDate(relatedBlog.published_at) }}</span>
                </div>
              </div>
            </div>
            
            <div class="text-right mt-2">
              <a href="/blog" class="text-gray-500 hover:text-orange-500 flex items-center justify-end text-sm">
                Ir al Blog
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>
    
    <!-- Footer Tags -->
    <div class="border-t border-b py-4 mb-10">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="flex items-center">
          <span class="text-gray-600 mr-2">Etiquetas:</span>
          <div class="flex gap-2">
            <a href="/blog?tag=Viajes" class="text-gray-500 hover:text-orange-500">Viajes</a>
            <a href="/blog?tag=Turismo" class="text-gray-500 hover:text-orange-500">Turismo</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Share Footer -->
    <div class="container mx-auto px-4 max-w-4xl mb-10">
      <div class="flex items-center">
        <span class="text-gray-600 mr-2">Compartir:</span>
        <div class="flex space-x-2">
          <a href="#" @click.prevent="shareOnFacebook" class="text-gray-400 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
          <a href="#" @click.prevent="shareOnTwitter" class="text-gray-400 hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
          <a href="#" @click.prevent="shareOnPinterest" class="text-gray-400 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import blogService from '@/services/blogService'

const route = useRoute()

// Variables reactivas
const blog = ref({})
const loading = ref(true)
const error = ref(null)

// Variables para comentarios
const comments = ref([])
const commentCount = ref(0)
const commentSubmitting = ref(false)
const newComment = ref({
  name: '',
  email: '',
  content: ''
})

// Para los blogs relacionados
const relatedBlogs = ref([])
const popularTags = ref([])
const categories = ref([])
const newsletter = ref({
  email: '',
  loading: false,
  success: false,
  error: null
})

// Función para traducir categorías al español
const translateCategory = (category) => {
  if (!category) return ''
  
  const translations = {
    'Architecture': 'Arquitectura',
    'Travelling': 'Viajes',
    'Tourism': 'Turismo',
    'Entertainment': 'Entretenimiento',
    'Accommodation': 'Alojamiento',
    'TRAVELLING': 'VIAJES'
  }
  
  return translations[category] || category
}

// Cargar datos al montar el componente
onMounted(async () => {
  try {
    // Cargar todo en paralelo para mejor rendimiento
    await Promise.all([
      fetchBlog(),
      fetchCategories(),
      fetchPopularTags()
    ])
  } catch (err) {
    console.error('Error inicializando página de blog:', err)
  }
})

// Obtener blog desde la API
const fetchBlog = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    if (!id) {
      throw new Error('ID de blog no proporcionado')
    }
    
    // Llamar al servicio de blog para obtener datos
    const response = await blogService.getBlog(id)
    
    // Verificar si tenemos datos válidos
    if (response && response.data && response.data.data) {
      blog.value = response.data.data
    } else if (response && response.data) {
      blog.value = response.data
    } else {
      throw new Error('Formato de respuesta inválido')
    }
    
    // Una vez que tenemos el blog, obtener comentarios y blogs relacionados
    await Promise.all([
      fetchComments(id),
      fetchRelatedBlogs(blog.value.category, id)
    ])
    
  } catch (err) {
    console.error('Error al obtener blog:', err)
    error.value = 'Error al cargar el artículo. Por favor, intenta de nuevo más tarde.'
  } finally {
    loading.value = false
  }
}

// Obtener blogs relacionados por categoría, excluyendo el actual
const fetchRelatedBlogs = async (category, currentBlogId) => {
  if (!category) return
  
  try {
    const response = await blogService.getBlogs({
      category: category,
      limit: 4,
      exclude_id: currentBlogId
    })
    
    if (response && response.data && response.data.data && response.data.data.blogs) {
      relatedBlogs.value = response.data.data.blogs
    } else if (response && response.data && Array.isArray(response.data.data)) {
      relatedBlogs.value = response.data.data
    } else if (response && Array.isArray(response.data)) {
      relatedBlogs.value = response.data
    }
  } catch (err) {
    console.error('Error al obtener blogs relacionados:', err)
    // No establecemos blogs relacionados de fallback para mantener todo dinámico
  }
}

// Obtener categorías desde la API
const fetchCategories = async () => {
  try {
    const response = await blogService.getCategories()
    
    if (response && response.data && response.data.data) {
      // Transformar las categorías a formato de objeto con conteo
      if (Array.isArray(response.data.data)) {
        categories.value = response.data.data.map(category => {
          if (typeof category === 'object' && category !== null) {
            return category
          } else {
            return { name: category, count: 0 }
          }
        })
      }
    }
  } catch (err) {
    console.error('Error al obtener categorías:', err)
    // No establecemos categorías de fallback para mantener todo dinámico
  }
}

// Obtener etiquetas populares
const fetchPopularTags = async () => {
  try {
    const response = await blogService.getPopularTags()
    
    if (response && response.data && response.data.data) {
      popularTags.value = response.data.data
    }
  } catch (err) {
    console.error('Error al obtener etiquetas populares:', err)
    // No establecemos etiquetas de fallback para mantener todo dinámico
  }
}

// Obtener comentarios del blog actual
const fetchComments = async (blogId) => {
  if (!blogId) return
  
  try {
    const response = await blogService.getComments(blogId)
    
    if (response && response.data && response.data.data) {
      comments.value = response.data.data
      commentCount.value = comments.value.length
    }
  } catch (err) {
    console.error('Error al obtener comentarios:', err)
    // No establecemos comentarios de fallback para mantener todo dinámico
  }
}

// Función para enviar un comentario
const submitComment = async () => {
  commentSubmitting.value = true
  
  try {
    // Preparar datos del comentario
    const commentData = {
      blog_id: blog.value.id,
      name: newComment.value.name,
      email: newComment.value.email,
      content: newComment.value.content
    }
    
    // Llamar a la API para guardar el comentario
    const response = await blogService.addComment(commentData)
    
    if (response && response.data && response.data.success) {
      // Si la API devuelve el comentario creado, usamos ese
      if (response.data.data) {
        comments.value.unshift(response.data.data)
      } else {
        // Si no devuelve el comentario, creamos uno para la UI
        const newCommentObj = {
          id: Date.now(), // ID temporal
          name: newComment.value.name,
          date: new Date(),
          content: newComment.value.content,
          profile_image: null
        }
        comments.value.unshift(newCommentObj)
      }
      
      // Actualizar contador
      commentCount.value = comments.value.length
      
      // Limpiar el formulario
      newComment.value = {
        name: '',
        email: '',
        content: ''
      }
      
      // Mostrar mensaje de éxito
      alert('Comentario enviado con éxito')
    } else {
      throw new Error('Error al guardar comentario')
    }
  } catch (err) {
    console.error('Error al enviar comentario:', err)
    alert('Error al enviar el comentario. Por favor, intenta de nuevo.')
  } finally {
    commentSubmitting.value = false
  }
}

// Eliminar el blog actual de los relacionados y mostrar solo 3
const filteredRelatedBlogs = computed(() => {
  return relatedBlogs.value
    .filter(related => related.id.toString() !== route.params.id.toString())
    .slice(0, 3)
})

// Computados
const formattedContent = computed(() => {
  if (!blog.value || !blog.value.content) return ''
  
  // Aquí podrías aplicar cualquier transformación al contenido
  // Por ejemplo, convertir URLs en enlaces, dar formato a los párrafos, etc.
  return blog.value.content
})

// Utilidades
const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const options = { month: 'short', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString('es-ES', options)
}

const formatReadTime = (content) => {
  if (!content) return 5
  
  // Calcular tiempo de lectura (promedio de 200 palabras por minuto)
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return minutes > 0 ? minutes : 1
}

const getDefaultImage = (id) => {
  // Usamos un método simple para obtener una imagen basada en el ID
  // En producción, se recomienda tener una imagen de fallback en el servidor
  return `/images/blog/fallback${(id ? (parseInt(id) % 5) : 0) + 1}.jpg`
}

const getAuthorImage = (authorId) => {
  // Usamos un método simple para obtener una imagen de autor basada en el ID
  // En producción, se recomienda tener una imagen de fallback en el servidor
  return `/images/authors/fallback${(authorId ? (parseInt(authorId) % 3) : 0) + 1}.jpg`
}

// Suscribirse al newsletter
const subscribeToNewsletter = async () => {
  newsletter.value.loading = true
  newsletter.value.error = null
  
  try {
    // Llamar a la API para suscribirse
    const response = await blogService.subscribeNewsletter(newsletter.value.email)
    
    if (response && response.data && response.data.success) {
      newsletter.value.success = true
      newsletter.value.email = ''
      
      // Mostrar mensaje de éxito por un tiempo
      setTimeout(() => {
        newsletter.value.success = false
      }, 3000)
    } else {
      throw new Error('Error al suscribirse')
    }
  } catch (err) {
    console.error('Error al suscribirse al newsletter:', err)
    newsletter.value.error = 'Error al suscribirse. Por favor, intenta de nuevo.'
  } finally {
    newsletter.value.loading = false
  }
}

// Métodos para compartir
const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(blog.value.title || '')
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareOnPinterest = () => {
  const url = encodeURIComponent(window.location.href)
  const description = encodeURIComponent(blog.value.title || '')
  const image = blog.value.image_url ? encodeURIComponent(blog.value.image_url) : ''
  window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${description}&media=${image}`, '_blank')
}
</script>

<style scoped>
/* Estilos generales */
.prose {
  max-width: 100%;
  color: #4b5563;
}

.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.prose blockquote {
  font-style: italic;
  color: #1f2937;
  padding-left: 1.5rem;
  border-left: 4px solid #e5e7eb;
}

/* Colores específicos */
.text-orange-500 {
  color: #f97316;
}

.bg-orange-500 {
  background-color: #f97316;
}

.bg-orange-100 {
  background-color: #ffedd5;
}

.hover\:bg-orange-600:hover {
  background-color: #ea580c;
}

.hover\:text-orange-500:hover {
  color: #f97316;
}
</style>