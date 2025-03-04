<template>
    <div>
      <!-- Header Section -->
      <div class="bg-gray-100 dark:bg-gray-800 py-8">
        <div class="container-custom">
          <h1 class="text-3xl font-bold mb-2">About OASIS</h1>
          <div class="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
            <NuxtLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400">Home</NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-gray-900 dark:text-white font-medium">About</span>
          </div>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="container-custom py-12">
        <!-- Introduction -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold mb-4">Our Mission</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            OASIS is dedicated to transforming the real estate experience. We believe finding the perfect property should be 
            convenient, transparent, and enjoyable. Our platform connects property seekers with verified property owners 
            and professional agents, creating a smooth and reliable real estate journey.
          </p>
          <p class="text-gray-700 dark:text-gray-300">
            Whether you're looking to buy, sell, or rent, OASIS provides the tools and resources needed to make informed 
            decisions and achieve your real estate goals.
          </p>
        </div>
        
        <!-- Company Values -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="card p-6">
            <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Trust & Reliability</h3>
            <p class="text-gray-600 dark:text-gray-400">
              We verify all listings and users to create a trusted platform where you can transact with confidence.
            </p>
          </div>
          
          <div class="card p-6">
            <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Innovation</h3>
            <p class="text-gray-600 dark:text-gray-400">
              We continuously improve our platform with cutting-edge technology to make your real estate experience seamless.
            </p>
          </div>
          
          <div class="card p-6">
            <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Community</h3>
            <p class="text-gray-600 dark:text-gray-400">
              We foster a supportive community of property seekers and providers, creating a collaborative real estate ecosystem.
            </p>
          </div>
        </div>
        
        <!-- Our Story -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold mb-4">Our Story</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                OASIS was founded in 2023 by a team of real estate professionals and technology enthusiasts who recognized 
                the need for a more efficient and transparent property marketplace.
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-4">
                After experiencing the challenges of property transactions firsthand, our founders set out to build a 
                platform that addressed common pain points: lack of verified information, communication barriers, and 
                complicated transaction processes.
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                Today, OASIS has grown into a comprehensive real estate platform serving thousands of users across multiple 
                regions, continuously evolving to meet the needs of our diverse community.
              </p>
            </div>
            <div class="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80" 
                alt="Team collaboration" 
                class="w-full h-auto"
              >
            </div>
          </div>
        </div>
        
        <!-- Team Section -->
        <div>
          <h2 class="text-2xl font-bold mb-4">Our Team</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-8">
            OASIS is powered by a diverse team of experts in real estate, technology, customer service, and business 
            development. Together, we work tirelessly to provide the best possible experience for our users.
          </p>
          
          <!-- Team Members -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Team Member 1 -->
            <div class="card overflow-hidden">
              <div class="aspect-w-1 aspect-h-1">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                  alt="Team member" 
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="p-4 text-center">
                <h3 class="font-semibold text-lg mb-1">John Doe</h3>
                <p class="text-blue-600 dark:text-blue-400 text-sm mb-2">CEO & Founder</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  15+ years in real estate and technology entrepreneurship.
                </p>
              </div>
            </div>
            
            <!-- Team Member 2 -->
            <div class="card overflow-hidden">
              <div class="aspect-w-1 aspect-h-1">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80" 
                  alt="Team member" 
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="p-4 text-center">
                <h3 class="font-semibold text-lg mb-1">Jane Smith</h3>
                <p class="text-blue-600 dark:text-blue-400 text-sm mb-2">CTO</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  Expert in software development and AI solutions.
                </p>
              </div>
            </div>
            
            <!-- Team Member 3 -->
            <div class="card overflow-hidden">
              <div class="aspect-w-1 aspect-h-1">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" 
                  alt="Team member" 
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="p-4 text-center">
                <h3 class="font-semibold text-lg mb-1">Robert Johnson</h3>
                <p class="text-blue-600 dark:text-blue-400 text-sm mb-2">Head of Real Estate</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  20+ years experience in property management and sales.
                </p>
              </div>
            </div>
            
            <!-- Team Member 4 -->
            <div class="card overflow-hidden">
              <div class="aspect-w-1 aspect-h-1">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=922&q=80" 
                  alt="Team member" 
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="p-4 text-center">
                <h3 class="font-semibold text-lg mb-1">Emily Wilson</h3>
                <p class="text-blue-600 dark:text-blue-400 text-sm mb-2">Customer Success Manager</p>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  Dedicated to ensuring exceptional user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // About page component
  </script>