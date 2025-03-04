<template>
    <div>
      <!-- Breadcrumb -->
      <div class="bg-gray-100 dark:bg-gray-800 py-8">
        <div class="container-custom">
          <div class="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
            <NuxtLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400">Home</NuxtLink>
            <span class="mx-2">/</span>
            <NuxtLink to="/properties" class="hover:text-blue-600 dark:hover:text-blue-400">Properties</NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-gray-900 dark:text-white font-medium">{{ property?.title || 'Property Details' }}</span>
          </div>
        </div>
      </div>
  
      <!-- Loading State -->
      <div v-if="isLoading" class="container-custom py-16 flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
  
      <!-- Error State -->
      <div v-else-if="error" class="container-custom py-16">
        <div class="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-red-500 dark:text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 class="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">Property Not Found</h2>
          <p class="text-red-600 dark:text-red-400 mb-6">
            Sorry, we couldn't find the property you're looking for.
          </p>
          <NuxtLink to="/properties" class="btn-primary">
            Browse Properties
          </NuxtLink>
        </div>
      </div>
  
      <!-- Property Details -->
      <div v-else-if="property" class="container-custom py-12">
        <div class="mb-8">
          <div class="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ property.title }}</h1>
              <p class="text-lg text-gray-600 dark:text-gray-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ property.address }}
              </p>
            </div>
            <div class="flex flex-col items-end">
              <div class="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {{ formatPrice(property.price) }}
              </div>
              <div class="flex space-x-2">
                <div 
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-semibold', 
                    property.status === 'for-sale' ? 'bg-blue-500 text-white' : 'bg-amber-500 text-white'
                  ]"
                >
                  {{ formatStatus(property.status) }}
                </div>
                <div class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {{ property.type }}
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Property Images Gallery -->
        <div class="mb-12">
          <div class="relative h-96 mb-4 rounded-lg overflow-hidden">
            <img 
              :src="property.image" 
              :alt="property.title" 
              class="w-full h-full object-cover"
            >
          </div>
          <!-- Thumbnail Gallery would go here -->
        </div>
  
        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Property Details -->
          <div class="lg:col-span-2">
            <!-- Property Features -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 class="text-2xl font-bold mb-6">Property Details</h2>
              
              <!-- Features List -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-y-4">
                <div class="flex flex-col">
                  <span class="text-gray-600 dark:text-gray-400 text-sm">Property Type</span>
                  <span class="font-semibold capitalize">{{ property.type }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-600 dark:text-gray-400 text-sm">Bedrooms</span>
                  <span class="font-semibold">{{ property.bedrooms }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-600 dark:text-gray-400 text-sm">Bathrooms</span>
                  <span class="font-semibold">{{ property.bathrooms }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-gray-600 dark:text-gray-400 text-sm">Area</span>
                  <span class="font-semibold">{{ formatArea(property.area) }}</span>
                </div>
              </div>
            </div>
  
            <!-- Description -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 class="text-2xl font-bold mb-4">Description</h2>
              <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {{ property.description }}
              </p>
            </div>
  
            <!-- Amenities -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 class="text-2xl font-bold mb-4">Amenities</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="(amenity, index) in amenities" :key="index" class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">{{ amenity }}</span>
                </div>
              </div>
            </div>
            
            <!-- Location Map -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 class="text-2xl font-bold mb-4">Location</h2>
              <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <!-- Map placeholder, replace with actual map -->
                <div class="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span class="text-gray-500 dark:text-gray-400">Map goes here</span>
                </div>
              </div>
              <p class="mt-4 text-gray-700 dark:text-gray-300">
                {{ property.address }}
              </p>
            </div>
          </div>
  
          <!-- Right Column: Contact & Similar Properties -->
          <div class="lg:col-span-1">
            <!-- Contact Agent Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 sticky top-24">
              <h3 class="text-xl font-bold mb-4">Contact Agent</h3>
              
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span class="text-gray-700 font-semibold text-xl">JD</span>
                </div>
                <div>
                  <h4 class="font-semibold">John Doe</h4>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Real Estate Agent</p>
                </div>
              </div>
              
              <!-- Contact Form -->
              <form @submit.prevent="submitContactForm">
                <div class="mb-4">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" id="name" v-model="contactForm.name" class="form-input" required>
                </div>
                
                <div class="mb-4">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" v-model="contactForm.email" class="form-input" required>
                </div>
                
                <div class="mb-4">
                  <label for="phone" class="form-label">Phone</label>
                  <input type="tel" id="phone" v-model="contactForm.phone" class="form-input">
                </div>
                
                <div class="mb-4">
                  <label for="message" class="form-label">Message</label>
                  <textarea 
                    id="message" 
                    v-model="contactForm.message" 
                    rows="4" 
                    class="form-input"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" class="btn-primary w-full">
                  Send Message
                </button>
              </form>
              
              <!-- Contact Info -->
              <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">(123) 456-7890</span>
                </div>
                
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300">agent@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Similar Properties -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold mb-6">Similar Properties</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PropertyCard 
              v-for="property in similarProperties" 
              :key="property.id" 
              :property="property"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const propertyId = computed(() => route.params.id);
  
  // State
  const isLoading = ref(true);
  const error = ref(null);
  const property = ref(null);
  const similarProperties = ref([]);
  
  // Contact form
  const contactForm = ref({
    name: '',
    email: '',
    phone: '',
    message: 'I\'m interested in this property. Please contact me with more information.'
  });
  
  // Example amenities (these would typically come from the API)
  const amenities = ref([
    'Air Conditioning',
    'Balcony',
    'Dishwasher',
    'Elevator',
    'Fireplace',
    'Garden',
    'Hardwood Floors',
    'Parking',
    'Swimming Pool',
    'Security System',
    'Washer/Dryer',
    'Wi-Fi'
  ]);
  
  // Fetch property details
  onMounted(async () => {
    isLoading.value = true;
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Example data (replace with actual API call)
      const allProperties = [
        {
          id: '1',
          title: 'Modern Apartment in Downtown',
          description: 'Stunning modern apartment with panoramic city views and high-end finishes throughout. This luxurious property features floor-to-ceiling windows, hardwood floors, and an open concept design perfect for entertaining.\n\nThe gourmet kitchen is equipped with top-of-the-line stainless steel appliances, a large center island, and custom cabinetry. The spacious primary bedroom suite includes a walk-in closet and a spa-like bathroom with a double vanity and a glass shower.\n\nResidents enjoy access to premium building amenities, including a fitness center, rooftop terrace, and 24/7 concierge service. Located in the heart of downtown, this apartment is just steps away from restaurants, shops, and public transportation.',
          price: 350000,
          address: '123 Main St, Downtown City',
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          type: 'apartment',
          status: 'for-sale',
          createdAt: '2023-05-15'
        },
        {
          id: '2',
          title: 'Luxury Villa with Pool',
          description: 'Exclusive villa with private pool and garden, situated in a prestigious neighborhood. This elegant home offers spacious living areas, high ceilings, and premium amenities including a home theater and wine cellar.\n\nThe grand entrance leads to a magnificent living room with a fireplace and large windows overlooking the garden. The gourmet kitchen features custom cabinetry, marble countertops, and high-end appliances.\n\nThe luxurious primary suite includes a sitting area, two walk-in closets, and a spa-inspired bathroom. Additional bedrooms are generously sized with en-suite bathrooms.\n\nOutdoor living spaces include a covered patio, summer kitchen, and a stunning infinity pool with a hot tub. Located in a secure, gated community with 24/7 security.',
          price: 1200000,
          address: '456 Palm Ave, Beachside',
          bedrooms: 4,
          bathrooms: 3,
          area: 3500,
          image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          type: 'villa',
          status: 'for-sale',
          createdAt: '2023-06-20'
        },
        {
          id: '3',
          title: 'Cozy Family Home',
          description: 'Spacious family home in a quiet suburban neighborhood, perfect for raising children. Features include a large backyard, updated kitchen, and a comfortable living room with a fireplace.\n\nThe welcoming entryway leads to a bright living room with large windows. The updated kitchen includes stainless steel appliances, granite countertops, and a breakfast nook. The adjacent dining room is perfect for family meals and entertaining.\n\nUpstairs, the primary bedroom features a walk-in closet and an ensuite bathroom. Two additional bedrooms share a full bathroom. The finished basement provides additional living space, ideal for a home office or playroom.\n\nThe large backyard includes a deck, perfect for outdoor dining and barbecues. Located in a family-friendly neighborhood with excellent schools nearby.',
          price: 520000,
          address: '789 Oak Dr, Suburbia',
          bedrooms: 3,
          bathrooms: 2,
          area: 2100,
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          type: 'house',
          status: 'for-sale',
          createdAt: '2023-07-05'
        }
      ];
      
      property.value = allProperties.find(p => p.id === propertyId.value);
      
      if (!property.value) {
        error.value = 'Property not found';
      } else {
        // Find similar properties (same type, different ID)
        similarProperties.value = allProperties
          .filter(p => p.type === property.value.type && p.id !== property.value.id)
          .slice(0, 3);
      }
      
      isLoading.value = false;
    } catch (err) {
      console.error('Error fetching property:', err);
      error.value = 'Failed to load property details';
      isLoading.value = false;
    }
  });
  
  // Submit contact form
  const submitContactForm = () => {
    alert(`Message sent! We'll be in contact with you soon.`);
    
    // Reset form (in a real app, this would happen after successful API submission)
    contactForm.value = {
      name: '',
      email: '',
      phone: '',
      message: 'I\'m interested in this property. Please contact me with more information.'
    };
  };
  
  // Format price
  const formatPrice = (price) => {
    if (price) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(price);
    }
    return '';
  };
  
  // Format status
  const formatStatus = (status) => {
    switch (status) {
      case 'for-sale':
        return 'For Sale';
      case 'for-rent':
        return 'For Rent';
      case 'sold':
        return 'Sold';
      case 'rented':
        return 'Rented';
      default:
        return status;
    }
  };
  
  // Format area
  const formatArea = (area) => {
    return `${area} sqft`;
  };
  </script>