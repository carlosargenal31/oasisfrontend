<template>
    <div class="container mx-auto px-4 py-8 bg-white">
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm text-gray-500 mb-4">
        <a href="/" class="hover:text-blue-500">Home</a>
        <span class="mx-2">›</span>
        <a href="/properties?type=rent" class="hover:text-blue-500">
          Property for rent
        </a>
        <span class="mx-2">›</span>
        <span class="text-blue-500">Pine Apartments</span>
      </div>
  
      <!-- Main content - Two column layout with image on left, details on right -->
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Left column - Images -->
        <div class="md:w-2/3">
          <!-- Main image with navigation -->
          <div class="relative rounded-lg overflow-hidden mb-2">
            <img 
              :src="propertyImages[activeImageIndex]" 
              alt="Pine Apartments" 
              class="w-full h-[400px] object-cover"
            />
            
            <!-- Navigation arrows -->
            <button @click="goToPrevImage" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              <span class="text-gray-700">←</span>
            </button>
            
            <button @click="goToNextImage" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              <span class="text-gray-700">→</span>
            </button>
            
            <!-- Badges in top left -->
            <div class="absolute top-3 left-3">
              <span class="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">Verified</span>
              <span class="bg-blue-500 ml-2 text-white px-2 py-1 rounded text-sm font-medium">New</span>
            </div>
            
            <!-- Heart icon -->
            <button @click="toggleFavorite" class="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
              <span :class="{'text-red-500': isFavorite, 'text-gray-400': !isFavorite}">♥</span>
            </button>
          </div>
          
          <!-- Thumbnails -->
          <div class="flex overflow-x-auto gap-2 mb-6">
            <div
              v-for="(image, index) in propertyImages"
              :key="index"
              @click="setActiveImage(index)"
              class="w-20 h-20 flex-shrink-0 cursor-pointer rounded overflow-hidden"
              :class="{'border-2 border-blue-500': index === activeImageIndex, 'border border-gray-200': index !== activeImageIndex}"
            >
              <img :src="image" :alt="'Thumbnail ' + (index + 1)" class="w-full h-full object-cover" />
            </div>
            <div class="w-20 h-20 flex-shrink-0 cursor-pointer rounded overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-100">
              <div class="flex flex-col items-center">
                <span class="text-gray-500 text-lg">▶</span>
                <span class="text-gray-500 text-xs mt-1">Play video</span>
              </div>
            </div>
          </div>
          
          <!-- Property Title -->
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Pine Apartments</h1>
          <p class="text-gray-500 mb-4">28 Jackson Ave Long Island City, NY 67234</p>
          
          <!-- Features Icons -->
          <div class="flex mb-8">
            <div class="flex items-center mr-6">
              <span class="font-semibold mr-1">4</span>
              <span class="text-gray-500">bed</span>
            </div>
            <div class="flex items-center mr-6">
              <span class="font-semibold mr-1">2</span>
              <span class="text-gray-500">bath</span>
            </div>
            <div class="flex items-center mr-6">
              <span class="font-semibold mr-1">2</span>
              <span class="text-gray-500">car</span>
            </div>
            <div class="flex items-center">
              <span class="font-semibold mr-1">56</span>
              <span class="text-gray-500">sq.m</span>
            </div>
          </div>
          
          <!-- Overview -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <p class="text-gray-600 leading-relaxed">
              Etiam ut morbi egestas nunc quis. Nulla tincidunt senectus suspendisse neque, sed sem ut donec sed. Nullam hac netus quis nec tortor mi auctor risus praesent. In pharetra consequat diam nibh consectetur aliquet nulla. Non convallis nascetur viverra viverra diam vel bibendum sed. Elementum odio sed etiam consequat scelerisque in. Diam sit donec nunc enim. Tellus, commodo eget pharetra pharetra quis pellentesque. Enim aliquam sit in porttitor sed gravida a. Aliquam ac tellus sit erat.
            </p>
          </div>
          
          <!-- Rental Agent -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Rental agent</h2>
            <div class="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div class="md:w-1/4 bg-gray-100 flex items-center justify-center py-8">
                <img src="/api/placeholder/200/200?text=Agent" alt="Kristin Watson" class="w-32 h-32 object-cover rounded-full" />
              </div>
              <div class="md:w-3/4 p-6">
                <div class="flex items-start justify-between">
                  <div>
                    <blockquote class="text-gray-600 italic mb-4">
                      "Amet libero morbi venenatis ut est. Iaculis leo ultricies nunc id ante adipiscing. Vel metus odio at faucibus ac. Neque id placerat et id ut."
                    </blockquote>
                    <h3 class="text-xl font-bold text-gray-900">Kristin Watson</h3>
                    <p class="text-gray-500">Imperial Property Group Agent</p>
                    <div class="flex mt-4 space-x-2">
                      <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-500">f</a>
                      <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-400">t</a>
                      <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-pink-500">i</a>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="flex text-yellow-400">
                      <span>★★★★★</span>
                    </div>
                    <span class="text-gray-500 text-sm">24 reviews</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Right column - Property Details -->
        <div class="md:w-1/3">
          <!-- Monthly rent -->
          <div class="mb-6">
            <h2 class="text-xl font-bold text-gray-700 mb-2">Monthly rent:</h2>
            <p class="text-3xl font-bold text-gray-900">$2,000 <span class="text-base font-normal text-gray-500">/month</span></p>
          </div>
          
          <!-- Property Details Card -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Property Details</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Type:</span>
                <span class="font-medium">apartment</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Apartment area:</span>
                <span class="font-medium">56 sq.m</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Built:</span>
                <span class="font-medium">2015</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Bedrooms:</span>
                <span class="font-medium">4</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Bathrooms:</span>
                <span class="font-medium">2</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Parking places:</span>
                <span class="font-medium">2</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Pets allowed:</span>
                <span class="font-medium">cats only</span>
              </div>
            </div>
          </div>
          
          <!-- Book a viewing button -->
          <button class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded mb-4 transition">
            Book a viewing
          </button>
          
          <!-- FAQ link -->
          <a href="#" class="flex items-center justify-center text-red-500 hover:text-red-600 mb-6">
            <span class="mr-2">?</span>
            Frequently asked questions
          </a>
          
          <!-- Amenities -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
            <div class="grid grid-cols-2 gap-y-3">
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>WiFi</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>Heating</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>Dishwasher</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>Parking place</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>Air conditioning</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>Iron</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>TV</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>Laundry</span>
              </div>
            </div>
            <button class="text-red-500 mt-3">
              Show more
            </button>
          </div>
          
          <!-- Not included -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Not included in rent</h3>
            <div class="grid grid-cols-2 gap-y-3">
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>Swimming pool</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>Restaurant</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>Spa lounge</span>
              </div>
              <div class="flex items-center">
                <span class="mr-2 text-gray-400">✓</span>
                <span>Bar</span>
              </div>
            </div>
          </div>
          
          <!-- Publication details -->
          <div class="flex flex-wrap text-sm text-gray-500">
            <div class="mr-4 pr-4 border-r border-gray-200">Published: <b>Dec 9, 2020</b></div>
            <div class="mr-4 pr-4 border-r border-gray-200">Ad number: <b>681013232</b></div>
            <div>Views: <b>48</b></div>
          </div>
        </div>
      </div>
      
      <!-- Recently Viewed Section -->
      <div class="mt-10">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Recently viewed</h2>
          <a href="/properties" class="text-blue-500 flex items-center">
            View all <span class="ml-1">→</span>
          </a>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Property card 1 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300">
            <div class="relative">
              <img src="/api/placeholder/600x400?text=Apartment" alt="Property" class="w-full h-48 object-cover" />
              <div class="absolute top-3 left-3">
                <span class="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Verified</span>
                <span class="bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded block">New</span>
              </div>
            </div>
            
            <div class="p-4">
              <div class="text-sm font-medium text-blue-500 uppercase mb-1">
                FOR RENT
              </div>
              <h3 class="font-medium text-gray-900 mb-1">
                3-bed Apartment | 67 sq.m
              </h3>
              <p class="text-sm text-gray-500 mb-2">3811 Ditmars Blvd Astoria, NY 11105</p>
              <div class="font-bold text-gray-900 mb-2">
                $1,629 <span class="text-sm font-normal text-gray-500">/month</span>
              </div>
              <div class="flex justify-between text-sm text-gray-500">
                <span>3 <i class="text-gray-400">bed</i></span>
                <span>2 <i class="text-gray-400">bath</i></span>
                <span>2 <i class="text-gray-400">car</i></span>
              </div>
            </div>
          </div>
          
          <!-- Property card 2 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300">
            <div class="relative">
              <img src="/api/placeholder/600x400?text=Home" alt="Property" class="w-full h-48 object-cover" />
              <div class="absolute top-3 left-3">
                <span class="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Verified</span>
                <span class="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded block">Featured</span>
              </div>
            </div>
            
            <div class="p-4">
              <div class="text-sm font-medium text-blue-500 uppercase mb-1">
                FOR SALE
              </div>
              <h3 class="font-medium text-gray-900 mb-1">
                Family Home | 120 sq.m
              </h3>
              <p class="text-sm text-gray-500 mb-2">67-04 Myrtle Ave Glendale, NY 11385</p>
              <div class="font-bold text-gray-900 mb-2">
                $84,000
              </div>
              <div class="flex justify-between text-sm text-gray-500">
                <span>4 <i class="text-gray-400">bed</i></span>
                <span>2 <i class="text-gray-400">bath</i></span>
                <span>2 <i class="text-gray-400">car</i></span>
              </div>
            </div>
          </div>
          
          <!-- Property card 3 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300">
            <div class="relative">
              <img src="/api/placeholder/600x400?text=Rentals" alt="Property" class="w-full h-48 object-cover" />
              <div class="absolute top-3 left-3">
                <span class="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Verified</span>
              </div>
            </div>
            
            <div class="p-4">
              <div class="text-sm font-medium text-blue-500 uppercase mb-1">
                FOR RENT
              </div>
              <h3 class="font-medium text-gray-900 mb-1">
                Greenpoint Rentals | 85 sq.m
              </h3>
              <p class="text-sm text-gray-500 mb-2">1510 Castle Hill Ave Bronx, NY 10462</p>
              <div class="font-bold text-gray-900 mb-2">
                $1,330 <span class="text-sm font-normal text-gray-500">/month</span>
              </div>
              <div class="flex justify-between text-sm text-gray-500">
                <span>1 <i class="text-gray-400">bed</i></span>
                <span>1 <i class="text-gray-400">bath</i></span>
                <span>1 <i class="text-gray-400">car</i></span>
              </div>
            </div>
          </div>
          
          <!-- Property card 4 -->
          <div class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300">
            <div class="relative">
              <img src="/api/placeholder/600x400?text=Studio" alt="Property" class="w-full h-48 object-cover" />
              <div class="absolute top-3 left-3">
                <span class="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Verified</span>
                <span class="bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded block">New</span>
              </div>
            </div>
            
            <div class="p-4">
              <div class="text-sm font-medium text-blue-500 uppercase mb-1">
                FOR SALE
              </div>
              <h3 class="font-medium text-gray-900 mb-1">
                Studio | 32 sq.m
              </h3>
              <p class="text-sm text-gray-500 mb-2">140-60 Beech Ave Flushing, NY 11355</p>
              <div class="font-bold text-gray-900 mb-2">
                $65,000
              </div>
              <div class="flex justify-between text-sm text-gray-500">
                <span>1 <i class="text-gray-400">bed</i></span>
                <span>1 <i class="text-gray-400">bath</i></span>
                <span>2 <i class="text-gray-400">car</i></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Property images
  const propertyImages = ref([
    '/api/placeholder/800/600?text=Property+Image+1',
    '/api/placeholder/800/600?text=Property+Image+2',
    '/api/placeholder/800/600?text=Property+Image+3',
    '/api/placeholder/800/600?text=Property+Image+4'
  ]);
  
  // Local state
  const activeImageIndex = ref(0);
  const isFavorite = ref(false);
  
  // Navigation functions for image gallery
  const goToPrevImage = () => {
    if (activeImageIndex.value === 0) {
      activeImageIndex.value = propertyImages.value.length - 1;
    } else {
      activeImageIndex.value--;
    }
  };
  
  const goToNextImage = () => {
    if (activeImageIndex.value === propertyImages.value.length - 1) {
      activeImageIndex.value = 0;
    } else {
      activeImageIndex.value++;
    }
  };
  
  const setActiveImage = (index) => {
    activeImageIndex.value = index;
  };
  
  // Toggle favorite status
  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
  };
  </script>
  
  <style>
  /* Ensure white background */
  body, html {
    background-color: #ffffff !important;
  }
  
  /* Gallery */
  .thumbnail:hover {
    border-color: #0d6efd;
  }
  
  /* Buttons */
  button.rounded-full {
    transition: all 0.2s ease;
  }
  
  button.rounded-full:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  }
  
  /* Call to action */
  .bg-red-500 {
    transition: background-color 0.2s ease, transform 0.2s ease;
  }
  
  .bg-red-500:hover {
    background-color: #e53e3e;
    transform: translateY(-2px);
  }
  
  /* Cards hover effect */
  .rounded-lg.shadow-sm {
    transition: all 0.3s ease;
  }
  
  .rounded-lg.shadow-sm:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  </style>