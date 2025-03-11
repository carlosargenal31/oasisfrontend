<template>
    <div class="bg-white min-h-screen">
      <!-- Main header with navigation (simplified) -->
      <header class="bg-white border-b border-gray-200 py-4">
        <div class="container mx-auto px-4 flex items-center justify-between">
          <div class="flex items-center">
            <div class="text-2xl font-bold text-blue-500">OASIS</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center">
              <span class="mr-2">EN</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div class="flex items-center">
              <span class="mr-2">USD</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <button class="bg-navy text-white px-4 py-2 rounded-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add property
            </button>
            <img class="h-10 w-10 rounded-full" src="https://via.placeholder.com/40" alt="User profile">
          </div>
        </div>
      </header>
  
      <!-- Breadcrumb navigation -->
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center text-gray-500 text-sm">
          <a href="/" class="hover:text-navy">Home</a>
          <span class="mx-2">/</span>
          <span class="text-gray-700">Personal Info</span>
        </div>
      </div>
  
      <!-- Main content with sidebar -->
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row">
          <!-- Left sidebar - increased width -->
          <div class="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">
            <div class="bg-white shadow-sm rounded-lg overflow-hidden">
              <!-- User profile in sidebar -->
              <div class="p-4 text-center">
                <img src="https://via.placeholder.com/100" alt="User" class="rounded-full w-24 h-24 mx-auto mb-4">
                <h3 class="text-xl font-bold text-black">Annette Black</h3>
                <div class="flex justify-center my-2">
                  <span class="text-yellow-400">★★★★★</span>
                </div>
                <div class="text-black text-sm mt-2">
                  <div class="mb-1">
                    (302) 555-0107
                  </div>
                  <div>
                    annette_black@email.com
                  </div>
                </div>
              </div>
  
              <!-- Add property button -->
              <div class="px-4 pb-4">
                <button class="w-full bg-navy text-white py-2 rounded flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add property
                </button>
              </div>
  
              <!-- Navigation menu -->
              <div class="border-t border-gray-200">
                <div class="flex items-center px-4 py-3 border-l-4 border-navy bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="text-navy font-medium">Personal Info</span>
                </div>
                <a href="/account/security" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span class="text-black">Password & Security</span>
                </a>
                <a href="/account/properties" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span class="text-black">My Properties</span>
                </a>
                <a href="/account/wishlist" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span class="text-black">Wishlist</span>
                </a>
                <a href="/account/reviews" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span class="text-black">Reviews</span>
                </a>
                <a href="/account/notifications" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span class="text-black">Notifications</span>
                </a>
                <a href="/account/help" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-black">Help</span>
                </a>
                <a href="/logout" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span class="text-black">Sign Out</span>
                </a>
              </div>
            </div>
          </div>
  
          <!-- Main content area -->
          <div class="w-full md:w-2/3">
            <h1 class="text-2xl font-bold text-black mb-4">Personal Info</h1>
  
            <!-- Progress bar -->
            <div class="mb-6">
              <p class="text-black mb-2 font-medium">Your personal info is 50% completed</p>
              <div class="w-full bg-gray-200 h-2 rounded-full">
                <div class="bg-navy h-2 rounded-full" style="width: 50%"></div>
              </div>
            </div>
  
            <!-- Bio section -->
            <div class="mb-8">
              <label class="block text-black font-medium mb-2">Short bio</label>
              <div class="flex flex-col lg:flex-row gap-6">
                <div class="flex-grow">
                  <textarea 
                    class="w-full border border-gray-300 rounded-lg p-3 h-40 focus:ring-2 focus:ring-navy focus:border-navy" 
                    placeholder="Write your bio here. It will be displayed on your public profile."
                  ></textarea>
                </div>
                <div class="w-full lg:w-64 flex-shrink-0">
                  <div class="bg-teal-500 hover:bg-teal-600 transition rounded-lg p-6 text-center cursor-pointer h-full flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-white font-medium">Change picture</span>
                    <input type="file" class="hidden" accept="image/jpeg, image/png">
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Personal information section -->
            <div class="mb-8">
              <!-- Full name -->
              <div class="border border-gray-200 rounded-lg mb-4">
                <div class="p-4 flex items-center justify-between">
                  <div>
                    <label class="block text-black text-sm mb-1">Full name</label>
                    <div class="text-black font-medium">Annette Black</div>
                  </div>
                  <button class="text-gray-400 hover:text-navy">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>
  
              <!-- Email -->
              <div class="border border-gray-200 rounded-lg mb-4">
                <div class="p-4 flex items-center justify-between">
                  <div>
                    <label class="block text-black text-sm mb-1">Email</label>
                    <div class="text-black font-medium">annette_black@email.com</div>
                  </div>
                  <button class="text-gray-400 hover:text-navy">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>
  
              <!-- Phone number -->
              <div class="border border-gray-200 rounded-lg mb-4">
                <div class="p-4 flex items-center justify-between">
                  <div>
                    <label class="block text-black text-sm mb-1">Phone number</label>
                    <div class="text-black font-medium">(302) 555-0107</div>
                  </div>
                  <button class="text-gray-400 hover:text-navy">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>
  
              <!-- Company name -->
              <div class="border border-gray-200 rounded-lg mb-4">
                <div class="p-4 flex items-center justify-between">
                  <div>
                    <label class="block text-black text-sm mb-1">Company name</label>
                    <div class="text-black">Not specified</div>
                  </div>
                  <button class="text-gray-400 hover:text-navy">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>
  
              <!-- Address -->
              <div class="border border-gray-200 rounded-lg mb-4">
                <div class="p-4 flex items-center justify-between">
                  <div>
                    <label class="block text-black text-sm mb-1">Address</label>
                    <div class="text-black">Not specified</div>
                  </div>
                  <button class="text-gray-400 hover:text-navy">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
  
            <!-- Social media section -->
            <div class="mb-8">
              <h3 class="text-black font-medium mb-4">Socials</h3>
              
              <!-- Facebook -->
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 320 512">
                    <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:border-navy" 
                  placeholder="Your Facebook account"
                >
              </div>
              
              <!-- LinkedIn -->
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:border-navy" 
                  placeholder="Your LinkedIn account"
                >
              </div>
              
              <!-- Twitter -->
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 512 512">
                    <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:border-navy" 
                  placeholder="Your Twitter account"
                >
              </div>
              
              <!-- Show more toggle -->
              <button @click="toggleShowMore" class="text-red-500 hover:text-red-600 flex items-center mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" :class="{ 'transform rotate-180': showMoreSocials }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
                {{ showMoreSocials ? 'Show less' : 'Show more' }}
              </button>
              
              <!-- Hidden section (show more) -->
              <div v-if="showMoreSocials" class="mt-4">
                <!-- Instagram -->
                <div class="flex items-center mb-4">
                  <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 448 512">
                      <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.6 102.7-9 132.1z"/>
                 </svg>
               </div>
               <input 
                 type="text" 
                 class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:border-navy" 
                 placeholder="Your Instagram account"
               >
             </div>
             
             <!-- Pinterest -->
             <div class="flex items-center mb-4">
               <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 384 512">
                   <path fill="currentColor" d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
                 </svg>
               </div>
               <input 
                 type="text" 
                 class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:border-navy" 
                 placeholder="Your Pinterest account"
               >
             </div>
           </div>
         </div>
         
         <!-- Action buttons -->
         <div class="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
           <button class="bg-navy text-white px-6 py-3 rounded-lg hover:bg-navy-dark transition">
             Save changes
           </button>
           <button class="text-gray-600 hover:text-red-500 flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
             </svg>
             Delete account
           </button>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script setup>
import { ref } from 'vue';

// State for showing more social inputs
const showMoreSocials = ref(false);

// Toggle show more social inputs
const toggleShowMore = () => {
 showMoreSocials.value = !showMoreSocials.value;
};

// Form data
const userData = ref({
 name: 'Annette Black',
 email: 'annette_black@email.com',
 phone: '(302) 555-0107',
 company: '',
 address: '',
 bio: '',
 progress: 50,
 socials: {
   facebook: '',
   linkedin: '',
   twitter: '',
   instagram: '',
   pinterest: ''
 }
});

// File upload handling
const handleFileUpload = (event) => {
 const file = event.target.files[0];
 if (file) {
   const reader = new FileReader();
   reader.onload = (e) => {
     console.log('File uploaded:', file.name);
     // Here you would typically update a profile image preview
   };
   reader.readAsDataURL(file);
 }
};

// Save changes
const saveChanges = () => {
 console.log('Saving user data:', userData.value);
 // Here you would typically make an API call to save the data
 alert('Changes saved successfully');
};
</script>

<style>
/* Custom navy blue color */
.bg-navy {
 background-color: #0a3364;
}

.hover\:bg-navy-dark:hover {
 background-color: #072649;
}

.text-navy {
 color: #0a3364;
}

.hover\:text-navy:hover {
 color: #0a3364;
}

.border-navy {
 border-color: #0a3364;
}

/* Focus styling */
.focus\:ring-navy:focus {
 --tw-ring-color: rgba(10, 51, 100, 0.5);
 --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
 --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
 box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\:border-navy:focus {
 border-color: #0a3364;
}

/* Transitions */
.transition {
 transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
 transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
 transition-duration: 150ms;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
 .container-custom {
   padding-left: 1rem;
   padding-right: 1rem;
 }
}
</style>