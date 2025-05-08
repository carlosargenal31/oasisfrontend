<template>
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm text-gray-500 mb-6">
        <a href="/" class="hover:text-orange-500">Home</a>
        <span class="mx-2">›</span>
        <a href="/agents" class="hover:text-orange-500">Agents</a>
        <span class="mx-2">›</span>
        <span class="text-orange-500">{{ agent.name }}</span>
      </div>
  
      <!-- Agent Profile Header -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div class="p-6 md:p-8">
          <div class="flex flex-col md:flex-row">
            <!-- Agent Image -->
            <div class="md:w-1/3 flex justify-center md:justify-start">
              <img :src="agent.avatar" alt="Agent" class="w-40 h-40 object-cover rounded-full" />
            </div>
            
            <!-- Agent Info -->
            <div class="md:w-2/3 mt-6 md:mt-0 text-center md:text-left">
              <h1 class="text-3xl font-bold text-black mb-2">{{ agent.name }}</h1>
              <p class="text-gray-600 mb-3">{{ agent.title }}</p>
              
              <div class="flex justify-center md:justify-start text-yellow-400 mb-3">
                <span v-for="n in 5" :key="n" :class="n <= agent.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                <span class="text-gray-700 ml-2">({{ agent.reviewCount }} reviews)</span>
              </div>
              
              <p class="text-gray-700 mb-4">{{ agent.bio }}</p>
              
              <div class="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <a :href="'tel:' + agent.phone" class="text-gray-700 hover:text-black flex items-center">
                  <span class="mr-2">📞</span>
                  {{ agent.phone }}
                </a>
                <a :href="'mailto:' + agent.email" class="text-gray-700 hover:text-black flex items-center">
                  <span class="mr-2">📧</span>
                  {{ agent.email }}
                </a>
              </div>
              
              <!-- Social Media -->
              <div class="flex justify-center md:justify-start space-x-3">
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-orange-600">f</a>
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-orange-600">t</a>
                <a href="#" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-pink-600">i</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Agent's Listings -->
      <div class="mb-10">
        <h2 class="text-2xl font-bold text-black mb-6">Listings by {{ agent.name }}</h2>
        
        <!-- Properties Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Property Card - For-Rent -->
          <div v-for="property in agent.properties.slice(0, 6)" :key="property.id" class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300 cursor-pointer">
            <div class="relative">
              <img :src="property.image" alt="Property" class="w-full h-48 object-cover" />
              <div class="absolute top-3 left-3">
                <span class="bg-green-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">Verified</span>
                <span v-if="property.isNew" class="bg-orange-500 text-white px-2 py-1 text-xs font-medium rounded block mb-1">New</span>
                <span v-if="property.isFeatured" class="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded block">Featured</span>
              </div>
            </div>
            
            <div class="p-4">
              <div class="text-sm font-medium uppercase mb-1" :class="property.status === 'for-rent' ? 'text-orange-500' : 'text-green-500'">
                {{ property.status === 'for-sale' ? 'FOR SALE' : 'FOR RENT' }}
              </div>
              <h3 class="font-medium text-black mb-1">
                {{ property.title }} | {{ property.square_feet }} sq.m
              </h3>
              <p class="text-sm text-gray-700 mb-2">{{ property.address }}</p>
              <div class="font-bold text-black mb-2">
                ${{ formatPrice(property.price) }}
                <span v-if="property.status === 'for-rent'" class="text-sm font-normal text-gray-700">/month</span>
              </div>
              <div class="flex justify-between text-sm text-gray-700">
                <span>{{ property.bedrooms }} bed</span>
                <span>{{ property.bathrooms }} bath</span>
                <span>{{ property.parkingSpaces || '2' }} car</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Ver todo Button -->
        <div class="mt-6 text-center">
          <a href="#" class="inline-block px-6 py-3 bg-orange-800 text-white rounded-md hover:bg-orange-900 transition">
            Ver todo Listings
          </a>
        </div>
      </div>
  
      <!-- Reviews Section -->
      <div>
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-black">Client Reviews</h2>
          <button class="btn-primary text-white bg-orange-800 hover:bg-orange-900 py-2 px-4 rounded">
            Write a Review
          </button>
        </div>
        
        <!-- Reviews -->
        <div class="space-y-6">
          <div v-for="(review, index) in agent.reviews" :key="index" class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex justify-between mb-3">
              <div class="flex items-center">
                <img :src="review.avatar" class="rounded-full w-12 h-12 mr-3" alt="Reviewer" />
                <div>
                  <h5 class="font-semibold mb-1">{{ review.name }}</h5>
                  <div class="flex text-yellow-400">
                    <span v-for="n in 5" :key="n" :class="n <= review.rating ? 'text-yellow-400' : 'text-gray-300'">★</span>
                  </div>
                </div>
              </div>
              <span class="text-gray-500 text-sm">{{ review.date }}</span>
            </div>
            <p class="text-gray-700">{{ review.text }}</p>
          </div>
        </div>
        
        <!-- Pagination for reviews -->
        <div class="mt-6 flex justify-center">
          <nav class="inline-flex rounded-md shadow-sm" aria-label="Reviews Pagination">
            <a href="#" class="px-3 py-2 border border-gray-300 bg-white rounded-l-md text-sm">Previous</a>
            <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-orange-800 text-white text-sm">1</a>
            <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm">2</a>
            <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm">...</a>
            <a href="#" class="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm">5</a>
            <a href="#" class="px-3 py-2 border border-gray-300 bg-white rounded-r-md text-sm">Next</a>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { usePropertyStore } from '~/store/property';
  
  const route = useRoute();
  const propertyStore = usePropertyStore();
  const agentId = route.params.id;
  
  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return "0";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Mock agent data
  const agent = ref({
    id: agentId,
    name: "Kristin Watson",
    title: "Imperial Property Group Agent",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    reviewCount: 45,
    bio: "Hello! I will select the best accommodation for you. With over 10 years of experience in the real estate market, I specialize in both rental and sales properties across the city.",
    phone: "(302) 555-0107",
    email: "kristin@example.com",
    properties: [
      // Properties will be loaded from the store
    ],
    reviews: [
      {
        name: "Jacob Jones",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        date: "Oct 15, 2023",
        text: "Kristin was extremely helpful throughout our home buying process. She was knowledgeable about the area and responsive to all of our questions. I highly recommend her services!"
      },
      {
        name: "Annette Black",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 5,
        date: "Sep 22, 2023",
        text: "We had a wonderful experience working with Kristin. She understood exactly what we were looking for and helped us find our dream home within our budget. She's professional, attentive, and really goes above and beyond."
      },
      {
        name: "Robert Fox",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 4,
        date: "Aug 5, 2023",
        text: "Kristin did a great job helping us navigate the competitive market. She was always available to show us properties and provided valuable insights throughout the process."
      }
    ]
  });
  
  onMounted(() => {
    // Load properties from the store
    const allProperties = propertyStore.properties;
    
    // Assign a mix of rent and sale properties to the agent
    // In a real application, you would filter by agent ID
    const rentProperties = allProperties.filter(p => p.status === 'for-rent').slice(0, 3);
    const saleProperties = allProperties.filter(p => p.status === 'for-sale').slice(0, 3);
    
    agent.value.properties = [...rentProperties, ...saleProperties];
  });
  </script>
  
  <style scoped>
  /* Estilos específicos si son necesarios */
  </style>