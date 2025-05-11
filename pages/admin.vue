<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center min-h-screen">
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {{ error }}
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="container mx-auto px-4 py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <!-- Breadcrumb -->
        <nav class="text-sm mb-4">
          <ol class="flex items-center space-x-2">
            <li>
              <nuxt-link to="/" class="text-gray-500 hover:text-blue-600">Home</nuxt-link>
            </li>
            <li class="text-gray-500">/</li>
            <li class="text-gray-900 font-medium">My businesses</li>
          </ol>
        </nav>

        <!-- Title and Sort -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 class="text-3xl font-bold text-gray-900">My businesses</h1>
          <div class="flex items-center gap-2">
            <label for="sort" class="text-sm text-gray-600">Sort by:</label>
            <select 
              id="sort"
              v-model="sortBy"
              @change="handleSort"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name (A-Z)</option>
              <option value="rating">Rating</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Categories Filter -->
      <div class="mb-8">
        <div class="flex flex-wrap gap-4">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="selectedCategory = category.value"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
              selectedCategory === category.value
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            ]"
          >
            <component :is="category.icon" class="w-5 h-5" />
            <span>{{ category.label }}</span>
            <span class="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {{ category.count }}
            </span>
          </button>
        </div>
      </div>

      <!-- Add New Business Button -->
      <div class="mb-8">
        <button
          @click="showAddForm = true"
          class="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add new business
        </button>
      </div>

      <!-- Loading Properties -->
      <div v-if="loadingProperties" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="bg-white rounded-lg overflow-hidden shadow-md">
          <div class="h-48 bg-gray-200 animate-pulse"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Properties Grid -->
      <div v-else-if="filteredProperties.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="property in filteredProperties" :key="property.id" class="bg-white rounded-lg overflow-hidden shadow-md relative">
          <!-- Property Image -->
          <div class="relative h-48">
            <img 
              :src="property.image || '/placeholder-property.jpg'" 
              :alt="property.title"
              class="w-full h-full object-cover"
            />
            <!-- Action Menu -->
            <div class="absolute top-4 right-4">
              <div class="relative">
                <button 
                  @click="toggleMenu(property.id)"
                  class="bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
                >
                  <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
                <!-- Dropdown Menu -->
                <div 
                  v-if="activeMenu === property.id"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-10"
                >
                  <button @click="viewProperty(property.id)" class="w-full px-4 py-2 text-left hover:bg-gray-50">
                    View Details
                  </button>
                  <button @click="editProperty(property.id)" class="w-full px-4 py-2 text-left hover:bg-gray-50">
                    Edit
                  </button>
                  <button @click="toggleFeatured(property.id, !property.isFeatured)" class="w-full px-4 py-2 text-left hover:bg-gray-50">
                    {{ property.isFeatured ? 'Remove from Featured' : 'Mark as Featured' }}
                  </button>
                  <button @click="toggleVerified(property.id, !property.isVerified)" class="w-full px-4 py-2 text-left hover:bg-gray-50">
                    {{ property.isVerified ? 'Unverify' : 'Verify' }}
                  </button>
                  <hr class="my-1">
                  <button @click="archiveProperty(property.id)" class="w-full px-4 py-2 text-left hover:bg-gray-50 text-orange-600">
                    Archive
                  </button>
                  <button @click="deleteProperty(property.id)" class="w-full px-4 py-2 text-left hover:bg-gray-50 text-red-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <!-- Status Badge -->
            <div class="absolute top-4 left-4">
              <span 
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  property.status === 'for-rent' ? 'bg-green-100 text-green-800' :
                  property.status === 'for-sale' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                ]"
              >
                {{ formatStatus(property.status) }}
              </span>
            </div>
            <!-- Featured Badge -->
            <div v-if="property.isFeatured" class="absolute top-4 left-24">
              <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            </div>
            <!-- Verified Badge -->
            <div v-if="property.isVerified" class="absolute top-12 left-4">
              <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Verified
              </span>
            </div>
          </div>
          
          <!-- Property Details -->
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ property.title }}</h3>
            
            <!-- Property Info -->
            <div class="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{{ property.average_rating || '0.0' }} ({{ property.total_reviews || 0 }})</span>
              </div>
              <div class="flex items-center gap-1">
                <span>{{ property.price || '$$' }}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ property.distance || '1.4 km from center' }}</span>
              </div>
            </div>

            <!-- Stats -->
            <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <div class="flex gap-4 text-sm text-gray-600">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{{ property.views || 0 }} views</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ formatDate(property.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="max-w-md mx-auto">
          <svg class="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
          <p class="text-gray-500 mb-6">
            {{ selectedCategory !== 'all' ? 
              `No ${selectedCategory.toLowerCase()} businesses found. Try a different category.` :
              "You haven't added any businesses yet. Start by adding your first business."
            }}
          </p>
          <button
            @click="showAddForm = true"
            class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add your first business
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-8 flex justify-center">
        <div class="flex gap-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-4 py-2 border rounded-lg',
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add Business Modal -->
    <teleport to="body">
      <div 
        v-if="showAddForm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="showAddForm = false"
      >
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b">
            <h2 class="text-xl font-semibold">Add New Business</h2>
          </div>
          <form @submit.prevent="submitBusinessForm" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input v-model="newBusiness.title" type="text" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select v-model="newBusiness.category" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a category</option>
                <option value="Alojamiento">Accommodation</option>
                <option value="Restaurante y bar">Food & Drink</option>
                <option value="Entretenimiento">Entertainment</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
              <select v-model="newBusiness.property_type" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a type</option>
                <template v-if="newBusiness.category === 'Alojamiento'">
                  <option value="Hotel">Hotel</option>
                  <option value="Motel">Motel</option>
                </template>
                <template v-else-if="newBusiness.category === 'Restaurante y bar'">
                  <option value="Cafetería">Café</option>
                  <option value="Restaurante">Restaurant</option>
                  <option value="Bar y restaurante">Bar & Restaurant</option>
                  <option value="Comida rápida">Fast Food</option>
                  <option value="Repostería">Bakery</option>
                  <option value="Heladería">Ice Cream Shop</option>
                  <option value="Bebidas">Drinks</option>
                  <option value="Bar">Bar</option>
                </template>
                <template v-else-if="newBusiness.category === 'Entretenimiento'">
                  <option value="Gym">Gym</option>
                  <option value="Balneario">Spa</option>
                  <option value="Belleza">Beauty</option>
                  <option value="Futbol">Soccer</option>
                  <option value="Motocross">Motocross</option>
                  <option value="Casino">Casino</option>
                  <option value="Cine">Cinema</option>
                  <option value="Videojuegos">Video Games</option>
                </template>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select v-model="newBusiness.status" required class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="for-rent">For Rent</option>
                <option value="for-sale">For Sale</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="newBusiness.description" rows="3" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input v-model="newBusiness.address" type="text" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            </div>
            
            <div class="flex gap-4">
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input v-model="newBusiness.phone" type="tel" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input v-model="newBusiness.email" type="email" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Business Image</label>
              <input type="file" @change="handleImageUpload" accept="image/*" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <p class="text-xs text-gray-500 mt-1">Upload a photo of your business (max 5MB)</p>
            </div>
            
            <div class="flex gap-3 pt-4">
              <button type="button" @click="showAddForm = false" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" :disabled="submitting" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {{ submitting ? 'Creating...' : 'Create Business' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { definePageMeta } from 'nuxt/app'

// Define page meta for Nuxt
definePageMeta({
  middleware: ['auth', 'admin']
})

// Icons components (you'll need to import these from your icon library)
const BuildingIcon = ref({ template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v12a2 2 0 002 2h5v-8h4v8h5a2 2 0 002-2V7l-9-5z"/></svg>' })
const RestaurantIcon = ref({ template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/></svg>' })
const GameIcon = ref({ template: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>' })

// Reactive data
const loading = ref(true)
const error = ref('')
const loadingProperties = ref(false)
const properties = ref([])
const selectedCategory = ref('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(9)
const activeMenu = ref(null)
const showAddForm = ref(false)
const submitting = ref(false)

// Form data for new business
const newBusiness = ref({
  title: '',
  category: '',
  property_type: '',
  status: 'for-rent',
  description: '',
  address: '',
  phone: '',
  email: '',
  image: null
})

// Router
const router = useRouter()

// Categories
const categories = computed(() => [
  { 
    value: 'all', 
    label: 'All', 
    icon: BuildingIcon, 
    count: properties.value.length 
  },
  { 
    value: 'Alojamiento', 
    label: 'Accommodation', 
    icon: BuildingIcon, 
    count: properties.value.filter(p => p.category === 'Alojamiento').length 
  },
  { 
    value: 'Restaurante y bar', 
    label: 'Food & Drink', 
    icon: RestaurantIcon, 
    count: properties.value.filter(p => p.category === 'Restaurante y bar').length 
  },
  { 
    value: 'Entretenimiento', 
    label: 'Entertainment', 
    icon: GameIcon, 
    count: properties.value.filter(p => p.category === 'Entretenimiento').length 
  }
])

// Computed properties
const filteredProperties = computed(() => {
  let filtered = properties.value

  // Apply category filter
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(property => property.category === selectedCategory.value)
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      break
    case 'name':
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'rating':
      filtered.sort((a, b) => (b.average_rating || 0) - (a.average_rating || 0))
      break
    case 'views':
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
      break
  }

  // Apply pagination
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  let filtered = properties.value
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(property => property.category === selectedCategory.value)
  }
  return Math.ceil(filtered.length / itemsPerPage.value)
})

// Methods
const fetchProperties = async () => {
  try {
    loadingProperties.value = true
    const { $fetch } = useNuxtApp()
    
    // Using the admin properties endpoint
    const response = await $fetch('/api/properties/all', {
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    
    if (response.success) {
      properties.value = response.data.properties
    } else {
      throw new Error('Failed to fetch properties')
    }
  } catch (err) {
    console.error('Error fetching properties:', err)
    error.value = 'Failed to load properties. Please try again.'
  } finally {
    loadingProperties.value = false
  }
}

const handleSort = () => {
  // Reset page when sorting changes
  currentPage.value = 1
}

const toggleMenu = (propertyId) => {
  if (activeMenu.value === propertyId) {
    activeMenu.value = null
  } else {
    activeMenu.value = propertyId
  }
}

const viewProperty = (propertyId) => {
  router.push(`/properties/${propertyId}`)
  activeMenu.value = null
}

const editProperty = (propertyId) => {
  router.push(`/dashboard/properties/${propertyId}/edit`)
  activeMenu.value = null
}

const archiveProperty = async (propertyId) => {
  try {
    const { $fetch } = useNuxtApp()
    const confirmed = confirm('Are you sure you want to archive this property?')
    
    if (!confirmed) return
    
    await $fetch(`/api/properties/${propertyId}/archive`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      },
      body: {
        reason: 'Archived by admin'
      }
    })
    
    // Refresh properties list
    await fetchProperties()
    activeMenu.value = null
  } catch (err) {
    console.error('Error archiving property:', err)
    error.value = 'Failed to archive property'
  }
}

const deleteProperty = async (propertyId) => {
  try {
    const { $fetch } = useNuxtApp()
    const confirmed = confirm('Are you sure you want to delete this property? This action cannot be undone.')
    
    if (!confirmed) return
    
    await $fetch(`/api/properties/${propertyId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      }
    })
    
    // Refresh properties list
    await fetchProperties()
    activeMenu.value = null
  } catch (err) {
    console.error('Error deleting property:', err)
    error.value = 'Failed to delete property'
  }
}

const toggleFeatured = async (propertyId, featured) => {
  try {
    const { $fetch } = useNuxtApp()
    
    await $fetch(`/api/properties/${propertyId}/featured`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      },
      body: { featured }
    })
    
    // Update local state
    const property = properties.value.find(p => p.id === propertyId)
    if (property) {
      property.isFeatured = featured
    }
    activeMenu.value = null
  } catch (err) {
    console.error('Error toggling featured:', err)
    error.value = 'Failed to update featured status'
  }
}

const toggleVerified = async (propertyId, verified) => {
  try {
    const { $fetch } = useNuxtApp()
    
    await $fetch(`/api/properties/${propertyId}/verified`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      },
      body: { verified }
    })
    
    // Update local state
    const property = properties.value.find(p => p.id === propertyId)
    if (property) {
      property.isVerified = verified
    }
    activeMenu.value = null
  } catch (err) {
    console.error('Error toggling verified:', err)
    error.value = 'Failed to update verified status'
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    newBusiness.value.image = file
  }
}

const submitBusinessForm = async () => {
  try {
    submitting.value = true
    const { $fetch } = useNuxtApp()
    
    // Create FormData for file upload
    const formData = new FormData()
    
    // Add all form fields
    Object.keys(newBusiness.value).forEach(key => {
      if (newBusiness.value[key] !== null && newBusiness.value[key] !== '') {
        formData.append(key, newBusiness.value[key])
      }
    })
    
    // Make API call to create property
    const response = await $fetch('/api/properties', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${useAuthStore().token}`
      },
      body: formData
    })
    
    if (response.success) {
      // Reset form
      newBusiness.value = {
        title: '',
        category: '',
        property_type: '',
        status: 'for-rent',
        description: '',
        address: '',
        phone: '',
        email: '',
        image: null
      }
      
      // Close modal
      showAddForm.value = false
      
      // Refresh properties list
      await fetchProperties()
    }
  } catch (err) {
    console.error('Error creating business:', err)
    error.value = 'Failed to create business'
  } finally {
    submitting.value = false
  }
}

const formatStatus = (status) => {
  const statusMap = {
    'for-rent': 'For Rent',
    'for-sale': 'For Sale',
    'unavailable': 'Unavailable'
  }
  return statusMap[status] || status
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Watchers
watch(selectedCategory, () => {
  currentPage.value = 1
})

// Lifecycle hooks
onMounted(async () => {
  try {
    // Check if user is admin
    const authStore = useAuthStore()
    if (!authStore.user || authStore.user.role !== 'admin') {
      router.push('/dashboard')
      return
    }
    
    await fetchProperties()
  } catch (err) {
    console.error('Error on mount:', err)
    error.value = 'Failed to initialize page'
  } finally {
    loading.value = false
  }
})

// Close menu when clicking outside
if (process.client) {
  document.addEventListener('click', (e) => {
    const menuWrapper = e.target.closest('.relative')
    if (!menuWrapper) {
      activeMenu.value = null
    }
  })
}
</script>

<style scoped>
/* Custom styles for the page */
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Scrollbar styling for modal */
.max-h-[90vh]::-webkit-scrollbar {
  width: 6px;
}

.max-h-[90vh]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.max-h-[90vh]::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.max-h-[90vh]::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>