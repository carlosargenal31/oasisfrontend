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
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Home</a>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Catalog</a>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Account</a>
              <a href="#" class="px-3 py-2 rounded-md hover:bg-gray-100">Vendor</a>
              <a href="#" class="px-3 py-2 rounded-md bg-orange-100 text-orange-500 font-medium">Pages</a>
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

    <!-- Breadcrumb Navigation -->
    <div class="container mx-auto px-4 py-3">
      <div class="flex text-sm text-gray-500">
        <a href="/" class="hover:text-orange-500">Home</a>
        <span class="mx-2">»</span>
        <a href="/blog" class="hover:text-orange-500">Blog</a>
        <span class="mx-2">»</span>
        <span>{{ blog.title }}</span>
      </div>
    </div>

    <!-- Blog Title -->
    <div class="container mx-auto px-4 py-3">
      <h1 class="text-2xl font-bold">{{ blog.title }}</h1>
    </div>
    
    <!-- Featured Image -->
    <div class="container mx-auto px-4 mb-6">
      <img 
        class="w-full h-auto rounded-lg"
        :src="blog.image_url || getDefaultImage()"
        :alt="blog.title"
      />
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 pb-10">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center h-40">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        <span class="block sm:inline">{{ error }}</span>
        <a href="/blog" class="text-red-700 font-medium hover:underline">Volver al blog</a>
      </div>
      
      <template v-else>
        <!-- Search Box -->
        <div class="flex mb-5">
          <div class="relative flex-grow mr-2">
            <input 
              type="text" 
              placeholder="Search article by keyword..." 
              class="w-full p-2 pl-3 pr-10 border rounded-md text-sm"
            />
            <button class="absolute right-2 top-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Blog Metadata -->
        <div class="flex flex-wrap text-sm text-gray-500 mb-6">
          <div class="bg-orange-100 text-orange-500 px-2 py-1 rounded text-xs uppercase font-semibold mr-3">
            {{ blog.category || 'TRAVELLING' }}
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
        
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- Main Content Column -->
          <div class="md:col-span-8">
            <!-- Author bio at top -->
            <div class="flex items-center mb-6">
              <div class="rounded-full w-12 h-12 overflow-hidden mr-4">
                <img 
                  :src="blog.profile_image || '@/assets/images/blog/01.jpg'" 
                  alt="Author" 
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 class="font-medium">{{ blog.first_name }} {{ blog.last_name || 'Bessie Cooper' }}</h4>
                <p class="text-sm text-gray-500">{{ blog.role || 'Travel blogger' }}</p>
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

            <!-- Latin placeholder text -->
            <div class="text-gray-800 mb-6 font-medium">
              Feugiat eget gravida urna placerat posuere pulvinar. Id nibh hendrerit semper urna consequat. Mauris elit tellus rhoncus ut consequat. Tempor tellus imperdiet nec velit felis pellentesque sed sed arcu. Neque quam id pellentesque id diam in.
            </div>
            
            <!-- Article Content -->
            <div class="prose prose-lg max-w-none mb-8 text-gray-600">
              <div v-html="formattedContent"></div>

              <!-- Default content for preview -->
              <p v-if="!blog.content" class="text-blue-600">
                Proin vulputate volutpat sem, vitam elem auctor semper. Pellentesq ex laoret, tempusis quam at, pellentesque risus. Aliquam a porttitor ex. Nullam quis elgend finibus. Donec molestie nec ex. Vestibulu rerum ante, accumsan id bibendum ac, faibus ultrices finibus facilisis. Integer sagittis fermentum tellus, vitae finibus felis volutpat tristue. Morbi ut incidun magna, maximus pulvinar magna. Suspendisoe lectus non nisibh elemen tincidunt.
              </p>
              <p v-if="!blog.content" class="mb-6">
                Aliquam in nibh elementum, posuere ante ac, pharetra tellus. Maecenas sit amet aliquet neque. Quisque quis sapien at nique placerat congue vel id est. Sed nec tempus tortor.
              </p>

              <!-- Quote block -->
              <blockquote class="text-2xl text-gray-800 mt-8 mb-8 italic relative px-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 absolute left-0 top-0 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </blockquote>

              <p v-if="!blog.content">
                Velit dignissim pharetra ut neque. Nunc, felis neque non sagittis. Sodales sit et suspendisse elementum tellat id gravda dui. Nam blandit viverra ultricies. Neque, felis nullam odio sem amet, consectetu diam porttitlr dui. Id fringila dignissim non fermentum enim duis quam sed congue amet. Amet, feugiat tempus sem, velit eget aliquam eleifendur id pellentesq quis quams.
              </p>
              <p v-if="!blog.content">
                Volutpat sed pulvinar pellentesq imperdim. Velit dictumst vitae quis leo sit. Ut nune amet vulputate volutpat mauris. Enim, pharetra cursus nec lestie. Ductor mattis in nec libero feugiat nunc.
              </p>
              <p v-if="!blog.content">
                Praesent sed pulvinar posuere nisl tincidunt. Iaculis sit quam magna congue. Amet vel non dignissim lectellus. Quisque et turpis facilisis non mauris a faucibus sempe rhoncus. Quisque ut felis iaculis odio, sit ultrices porttitor ornare id. In sem quam vitia porta sem tristie nunc amet, odio. Sit mi donec tempus, velit pellentesque facilisis magnase ultricies volutpat. Arcu quis eget maecenas convallis bendum neque at tortor, et faucibus vitae.
              </p>
            </div>
            
            <!-- Tags -->
            <div class="mb-8">
              <span class="text-gray-700 mr-2">Tags:</span>
              <a href="#" class="text-orange-500 hover:underline">COVID-19</a>,
              <a href="#" class="text-orange-500 hover:underline">Travel</a>
            </div>
            
            <!-- Share Options -->
            <div class="mb-10">
              <span class="text-gray-700 mr-2">Share:</span>
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
            
            <!-- You may be also interested in -->
            <div v-if="relatedBlogs.length > 0" class="mb-10">
              <h3 class="text-xl font-bold mb-6">You may be also interested in</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="relatedBlog in relatedBlogs" :key="relatedBlog.id" class="mb-6">
                  <div class="relative mb-3">
                    <NuxtLink :to="`/blog/${relatedBlog.id}`">
                      <img 
                        class="rounded-lg w-full h-32 object-cover" 
                        :src="relatedBlog.image_url || getDefaultImage(relatedBlog.id)" 
                        :alt="relatedBlog.title" 
                      />
                    </NuxtLink>
                  </div>
                  <h4 class="text-base font-medium mb-1">
                    <NuxtLink :to="`/blog/${relatedBlog.id}`" class="hover:text-orange-500">
                      {{ relatedBlog.title }}
                    </NuxtLink>
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
                <NuxtLink to="/blog" class="text-gray-500 hover:text-orange-500 flex items-center justify-end text-sm">
                  Go to Blog
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
          
          <!-- Sidebar -->
          <div class="md:col-span-4">
            <!-- Author Card -->
            <div class="mb-6 border border-gray-200 rounded-lg overflow-hidden">
              <div class="p-4 text-center">
                <div class="flex justify-center mb-3">
                  <div class="rounded-full w-16 h-16 overflow-hidden">
                    <img 
                      :src="blog.profile_image || '@/assets/images/blog/01.jpg'" 
                      alt="Author" 
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h4 class="font-medium">{{ blog.first_name }} {{ blog.last_name || 'Bessie Cooper' }}</h4>
                <p class="text-sm text-gray-500 mb-3">{{ blog.role || 'Travel blogger' }}</p>
                <div class="flex justify-center space-x-2 mb-3">
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
              </div>
            </div>
            
            <!-- Categories -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Categories</h3>
              <ul>
                <li v-for="(category, index) in categories" :key="index" class="mb-2">
                  <a :href="`/blog?category=${category.name}`" class="flex justify-between text-gray-600 hover:text-orange-500">
                    <span>{{ category.name }}</span>
                    <span class="text-gray-500">({{ category.count }})</span>
                  </a>
                </li>
              </ul>
            </div>
            
            <!-- Popular Tags -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Popular Tags</h3>
              <div class="flex flex-wrap gap-2">
                <a 
                  v-for="tag in popularTags" 
                  :key="tag" 
                  :href="`/blog?tag=${tag}`"
                  class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200"
                >
                  {{ tag }}
                </a>
              </div>
            </div>
            
            <!-- Newsletter Signup -->
            <div class="mb-6 bg-gray-100 p-4 rounded-lg">
              <h3 class="font-medium mb-2">Stay Informed</h3>
              <p class="text-sm text-gray-600 mb-3">
                Subscribe to our newsletter and be the first to get the latest news and updates.
              </p>
              <form @submit.prevent="subscribeToNewsletter" class="space-y-3">
                <input 
                  type="email" 
                  v-model="newsletter.email"
                  placeholder="Your email" 
                  class="w-full p-2 text-sm border rounded"
                  required
                />
                <button 
                  type="submit"
                  class="w-full py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600 transition"
                  :disabled="newsletter.loading"
                >
                  {{ newsletter.loading ? 'Sending...' : 'Sign Up' }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </template>
    </div>
    
    <!-- Footer Tags -->
    <div class="border-t border-b py-4 mb-10">
      <div class="container mx-auto px-4">
        <div class="flex items-center">
          <span class="text-gray-600 mr-2">Tags:</span>
          <div class="flex gap-2">
            <a href="/blog?tag=COVID-19" class="text-gray-500 hover:text-orange-500">COVID-19</a>
            <a href="/blog?tag=Travel" class="text-gray-500 hover:text-orange-500">Travel</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Share Footer -->
    <div class="container mx-auto px-4 mb-10">
      <div class="flex items-center">
        <span class="text-gray-600 mr-2">Share:</span>
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
import { useRoute, useRouter } from 'vue-router'
import blogService from '@/services/blogService'

// Imágenes por defecto (fallback)
import defaultImage from "@/assets/images/blog/06.jpg"
import authorImage from "@/assets/images/blog/01.jpg"

const route = useRoute()
const router = useRouter()

// Variables reactivas
const blog = ref({
  title: 'Air Travel in the Time of COVID-19',
  content: '',
  category: 'TRAVELLING',
  published_at: new Date('2023-05-24'),
  author_name: 'Bessie Cooper',
  role: 'Travel blogger'
})
const loading = ref(false)
const error = ref(null)
const categories = ref([
  { name: 'Architecture', count: 4 },
  { name: 'Travelling', count: 6 },
  { name: 'Tourism', count: 3 },
  { name: 'Entertainment', count: 7 },
  { name: 'Accommodation', count: 2 }
])
const relatedBlogs = ref([
  {
    id: 1,
    title: '18 Travel Mistakes to Avoid During Coronavirus',
    image_url: null,
    author_name: 'Bessie Cooper',
    author_id: 1,
    published_at: new Date('2023-05-20')
  },
  {
    id: 2,
    title: '10 World-Class Museums You Can Visit Online',
    image_url: null,
    author_name: 'Amanda Black',
    author_id: 2,
    published_at: new Date('2023-05-18')
  },
  {
    id: 3,
    title: '7 Tips for Solo Travelers in Africa',
    image_url: null,
    author_name: 'Ralph Edwards',
    author_id: 3,
    published_at: new Date('2023-05-15')
  }
])
const commentCount = ref(3)
const popularTags = ref(['Traveling', 'Nature', 'Tips', 'Places', 'Green', 'Travel'])
const newsletter = ref({
  email: '',
  loading: false,
  success: false,
  error: null
})

// Para compatibilidad con Nuxt
definePageMeta({
  title: 'Air Travel in the Time of COVID-19',
})

// Cargar datos al montar el componente
onMounted(async () => {
  await fetchBlog()
})

// Obtener blog desde la API
const fetchBlog = async () => {
  loading.value = true
  error.value = null
  
  try {
    const id = route.params.id
    // En un entorno real, llamaríamos a la API
    // const response = await blogService.getBlog(id)
    // blog.value = response.data.data
    
    // Para esta demo, simplemente establecemos algunos datos de ejemplo
    setTimeout(() => {
      blog.value = {
        id: id || 1,
        title: 'Air Travel in the Time of COVID-19',
        content: generateLoremIpsum(),
        category: 'TRAVELLING',
        published_at: new Date('2023-05-24'),
        author_name: 'Bessie Cooper',
        role: 'Travel blogger',
        first_name: 'Bessie',
        last_name: 'Cooper'
      }
      loading.value = false
    }, 500)
  } catch (err) {
    console.error('Error fetching blog:', err)
    error.value = 'Error al cargar el artículo. Por favor, intenta de nuevo más tarde.'
    loading.value = false
  }
}

// Suscribirse al newsletter
const subscribeToNewsletter = async () => {
  newsletter.value.loading = true
  newsletter.value.error = null
  
  try {
    // Simular una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    newsletter.value.success = true
    newsletter.value.email = ''
    
    // Mostrar un mensaje de éxito temporal
    setTimeout(() => {
      newsletter.value.success = false
    }, 3000)
  } catch (err) {
    console.error('Error subscribing to newsletter:', err)
    newsletter.value.error = 'Error al suscribirse. Por favor, intenta de nuevo.'
  } finally {
    newsletter.value.loading = false
  }
}

// Computados
const formattedContent = computed(() => {
  if (!blog.value.content) return ''
  
  // Aquí podrías aplicar cualquier transformación al contenido
  // Por ejemplo, convertir URLs en enlaces, dar formato a los párrafos, etc.
  return blog.value.content
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
  return date.toLocaleDateString('en-US', options)
}

const formatReadTime = (content) => {
  // Calcular tiempo de lectura (promedio de 200 palabras por minuto)
  return 8 // 8 minutos de lectura para la demo
}

const getDefaultImage = (id) => {
  // Para esta demo, devolvemos diferentes imágenes basadas en el ID
  return defaultImage
}

const getAuthorImage = (authorId) => {
  // Para esta demo, siempre devolvemos la misma imagen de autor
  return authorImage
}

// Generar lorem ipsum para la demo
const generateLoremIpsum = () => {
  return `
    <p>Feugiat eget gravida urna placerat posuere pulvinar. Id nibh hendrerit semper urna consequat. Mauris elit tellus rhoncus ut consequat. Tempor tellus imperdiet nec velit felis pellentesque sed sed arcu. Neque quam id pellentesque id diam in.</p>
    
    <p>Proin vulputate volutpat sem, vitam elem auctor semper. Pellentesq ex laoret, tempusis quam at, pellentesque risus. Aliquam a porttitor ex. Nullam quis elgend finibus. Donec molestie nec ex. Vestibulu rerum ante, accumsan id bibendum ac, faibus ultrices finibus facilisis. Integer sagittis fermentum tellus, vitae finibus felis volutpat tristue. Morbi ut incidun magna, maximus pulvinar magna. Suspendisoe lectus non nisibh elemen tincidunt.</p>
    
    <p>Aliquam in nibh elementum, posuere ante ac, pharetra tellus. Maecenas sit amet aliquet neque. Quisque quis sapien at nique placerat congue vel id est. Sed nec tempus tortor.</p>
    
    <p>Velit dignissim pharetra ut neque. Nunc, felis neque non sagittis. Sodales sit et suspendisse elementum tellat id gravda dui. Nam blandit viverra ultricies. Neque, felis nullam odio sem amet, consectetu diam porttitlr dui. Id fringila dignissim non fermentum enim duis quam sed congue amet. Amet, feugiat tempus sem, velit eget aliquam eleifendur id pellentesq quis quams.</p>
    
    <p>Volutpat sed pulvinar pellentesq imperdim. Velit dictumst vitae quis leo sit. Ut nune amet vulputate volutpat mauris. Enim, pharetra cursus nec lestie. Ductor mattis in nec libero feugiat nunc.</p>
  `
}

// Métodos para compartir
const shareOnFacebook = () => {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(`Air Travel in the Time of COVID-19`)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

const shareOnPinterest = () => {
  const url = encodeURIComponent(window.location.href)
  const description = encodeURIComponent('Air Travel in the Time of COVID-19')
  window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${description}`, '_blank')
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