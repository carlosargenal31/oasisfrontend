<template>
  <!-- Blog: Latest posts -->
  <section class="container mx-auto px-4 my-12 py-8">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-2">
      <h2 class="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">¿Te gustó esto? Hay más</h2>
      <NuxtLink class="text-orange-600 hover:text-orange-800 flex items-center" to="/blog/grid">
        Explora nuestro blog
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </NuxtLink>
    </div>
    
    <!-- Blog Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- Blog Item 1 -->
      <article class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
        <NuxtLink class="block" to="/blog/single">
          <img class="w-full h-56 object-cover" src="@/assets/images/blog/01.jpg" alt="Air Travel in the Time of COVID-19" />
        </NuxtLink>
        <div class="p-4">
          <div class="mb-2">
            <a class="text-xs uppercase tracking-wider text-orange-500 font-medium" href="#">TRAVELLING</a>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-3">
            <NuxtLink class="text-gray-900 hover:text-orange-500 transition-colors duration-200" to="/blog/single">Air Travel in the Time of COVID-19</NuxtLink>
          </h3>
          <div class="flex items-center">
            <img class="rounded-full w-10 h-10" src="@/assets/images/blog/01.jpg" alt="Avatar" />
            <div class="ml-3">
              <h6 class="text-sm font-medium text-gray-900 mb-1">Bessie Cooper</h6>
              <div class="flex text-xs text-gray-500">
                <span class="flex items-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  May 24
                </span>
                <span class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  No comments
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <!-- Blog Item 2 -->
      <article class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
        <NuxtLink class="block" to="/blog/single">
          <img class="w-full h-56 object-cover" src="@/assets/images/blog/02.jpg" alt="10 World-Class Museums You Can Visit Online" />
        </NuxtLink>
        <div class="p-4">
          <div class="mb-2">
            <a class="text-xs uppercase tracking-wider text-orange-500 font-medium" href="#">ENTERTAINMENT</a>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-3">
            <NuxtLink class="text-gray-900 hover:text-orange-500 transition-colors duration-200" to="/blog/single">10 World-Class Museums You Can Visit Online</NuxtLink>
          </h3>
          <div class="flex items-center">
            <img class="rounded-full w-10 h-10" src="@/assets/images/blog/02.jpg" alt="Avatar" />
            <div class="ml-3">
              <h6 class="text-sm font-medium text-gray-900 mb-1">Annette Black</h6>
              <div class="flex text-xs text-gray-500">
                <span class="flex items-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Apr 28
                </span>
                <span class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  4 comments
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <!-- Blog Item 3 -->
      <article class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
        <NuxtLink class="block" to="/blog/single">
          <img class="w-full h-56 object-cover" src="@/assets/images/blog/03.jpg" alt="7 Tips for Solo Travelers in Africa" />
        </NuxtLink>
        <div class="p-4">
          <div class="mb-2">
            <a class="text-xs uppercase tracking-wider text-orange-500 font-medium" href="#">TRAVELLING</a>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-3">
            <NuxtLink class="text-gray-900 hover:text-orange-500 transition-colors duration-200" to="/blog/single">7 Tips for Solo Travelers in Africa</NuxtLink>
          </h3>
          <div class="flex items-center">
            <img class="rounded-full w-10 h-10" src="@/assets/images/blog/03.jpg" alt="Avatar" />
            <div class="ml-3">
              <h6 class="text-sm font-medium text-gray-900 mb-1">Ralph Edwards</h6>
              <div class="flex text-xs text-gray-500">
                <span class="flex items-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Apr 15
                </span>
                <span class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  2 comments
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
      
    </div>
  </section>
</template>

<script>
export default {
  name: 'BlogSection'
}
</script>