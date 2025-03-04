<template>
    <div>
      <!-- Hero Section -->
      <section class="bg-blue-700 text-white py-20">
        <div class="container-custom">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-1/2 mb-10 md:mb-0">
              <h1 class="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Property with OASIS</h1>
              <p class="text-xl text-blue-100 mb-8">The smartest way to buy, sell, and rent properties with confidence.</p>
              <div class="flex flex-col sm:flex-row gap-4">
                <button class="btn-primary">Browse Properties</button>
                <button class="btn-secondary">List Your Property</button>
              </div>
            </div>
            <div class="md:w-1/2">
              <img src="/images/hero-image.jpg" alt="Beautiful home" class="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>
  
      <!-- Featured Properties Section -->
      <section class="section bg-gray-50 dark:bg-gray-900">
        <div class="container-custom">
          <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold mb-4">Featured Properties</h2>
            <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our handpicked selection of standout properties that offer exceptional value and features.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Property cards will go here -->
            <div v-for="i in 3" :key="i" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <img src="/images/property-placeholder.jpg" alt="Property" class="w-full h-48 object-cover" />
              <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold">Luxury Villa</h3>
                  <span class="text-green-600 font-semibold">$1,200,000</span>
                </div>
                <p class="text-gray-500 dark:text-gray-400 mb-4">123 Main St, Springfield</p>
                <div class="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4">
                  <span class="mr-4">4 Bedrooms</span>
                  <span class="mr-4">3 Baths</span>
                  <span>2,400 sqft</span>
                </div>
                <button class="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">View Details →</button>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Services Section -->
      <section class="section bg-white dark:bg-gray-800">
        <div class="container-custom">
          <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold mb-4">Our Services</h2>
            <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide comprehensive real estate services to help you buy, sell, or rent properties with confidence.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Service cards will go here -->
            <div v-for="i in 3" :key="i" class="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                <span class="text-xl">{{ i }}</span>
              </div>
              <h3 class="text-xl font-bold mb-2">Property Management</h3>
              <p class="text-gray-600 dark:text-gray-400">
                Professional management services to maximize your property's potential and minimize hassles.
              </p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section class="section bg-gray-50 dark:bg-gray-900">
        <div class="container-custom">
          <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Read testimonials from our satisfied clients who have found their dream properties through OASIS.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Testimonial cards will go here -->
            <div v-for="i in 3" :key="i" class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
              <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <h4 class="font-bold">Jane Smith</h4>
                  <p class="text-gray-500 text-sm">Homeowner</p>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                "OASIS made finding my dream home a breeze. Their agents were professional, knowledgeable, and always
                available to answer my questions."
              </p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="py-16 bg-blue-600 text-white">
        <div class="container-custom text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Property?</h2>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied clients who have found their perfect property with OASIS.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button class="btn-white">Browse Properties</button>
            <button class="btn-secondary">Contact an Agent</button>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  // Your script content here
  </script>
  
  <style>
  .container-custom {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .section {
    padding: 5rem 0;
  }
  
  .btn-primary {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #ffffff;
    color: #1d4ed8;
    font-weight: 600;
    border-radius: 0.375rem;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #f3f4f6;
  }
  
  .btn-secondary {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: transparent;
    color: #ffffff;
    font-weight: 600;
    border: 2px solid #ffffff;
    border-radius: 0.375rem;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .btn-secondary:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .btn-white {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #ffffff;
    color: #2563eb;
    font-weight: 600;
    border-radius: 0.375rem;
    text-align: center;
    transition: all 0.3s ease;
  }
  
  .btn-white:hover {
    background-color: #f9fafb;
  }
  </style>