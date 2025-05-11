<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex items-center">
              <img src="~/public/images/logolcb.png" alt="OASIS Logo" class="h-8 mr-3" />
              <h1 class="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
          </div>
          <div class="flex items-center">
            <div class="text-sm text-gray-600 mr-4">
              {{ user.first_name }} {{ user.last_name }}
            </div>
            <img 
              :src="user.profile_image || '/img/default-avatar.png'" 
              alt="Admin" 
              class="w-10 h-10 rounded-full"
            >
          </div>
        </div>
      </div>
    </header>

    <!-- Breadcrumb -->
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <ol class="flex items-center space-x-2 text-sm text-gray-600">
        <li><a href="/" class="hover:text-blue-600">Home</a></li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-900">Admin Dashboard</li>
      </ol>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <!-- Dashboard Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-orange-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Total Businesses</h3>
              <p class="text-3xl font-bold text-gray-700">{{ stats.totalBusinesses }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Total Events</h3>
              <p class="text-3xl font-bold text-gray-700">{{ stats.totalEvents }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 0a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V7m2-5a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Blog Posts</h3>
              <p class="text-3xl font-bold text-gray-700">{{ stats.totalBlogs }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            @click="activeTab = 'businesses'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'businesses'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Businesses
          </button>
          <button
            @click="activeTab = 'events'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'events'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Events
          </button>
          <button
            @click="activeTab = 'blogs'"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === 'blogs'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            Blog Posts
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="bg-white rounded-lg shadow">
        <!-- Businesses Tab -->
        <div v-if="activeTab === 'businesses'" class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-900">Business Management</h2>
            <button
              @click="openBusinessModal(null)"
              class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Business
            </button>
          </div>

          <!-- Businesses Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="business in businesses" :key="business.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img :src="business.image || '/img/business-placeholder.jpg'" alt="" class="h-10 w-10 rounded object-cover">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ business.title }}</div>
                        <div class="text-sm text-gray-500">{{ business.address }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {{ business.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      getBusinessStatusClass(business.status)
                    ]">
                      {{ business.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <span class="text-yellow-400">★</span>
                      <span class="ml-1">{{ business.average_rating || '0.0' }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="openBusinessModal(business)"
                      class="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      @click="toggleBusinessStatus(business)"
                      class="text-orange-600 hover:text-orange-900 mr-3"
                    >
                      {{ business.status === 'for-rent' ? 'Deactivate' : 'Activate' }}
                    </button>
                    <button
                      @click="deleteBusiness(business.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Events Tab -->
        <div v-if="activeTab === 'events'" class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-900">Event Management</h2>
            <button
              @click="openEventModal(null)"
              class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Event
            </button>
          </div>

          <!-- Events Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="event in events" :key="event.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img :src="event.image_url || '/img/event-placeholder.jpg'" alt="" class="h-10 w-10 rounded object-cover">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ event.event_name }}</div>
                        <div class="text-sm text-gray-500">{{ event.location }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(event.event_date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      getEventStatusClass(event.status)
                    ]">
                      {{ event.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ event.price > 0 ? `L${formatPrice(event.price)}` : 'Gratis' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="openEventModal(event)"
                      class="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      @click="toggleEventStatus(event)"
                      class="text-orange-600 hover:text-orange-900 mr-3"
                    >
                      {{ event.status === 'activo' ? 'Cancel' : 'Activate' }}
                    </button>
                    <button
                      @click="deleteEvent(event.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Blogs Tab -->
        <div v-if="activeTab === 'blogs'" class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-gray-900">Blog Management</h2>
            <button
              @click="openBlogModal(null)"
              class="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Blog Post
            </button>
          </div>

          <!-- Blogs Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="blog in blogs" :key="blog.id">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <img :src="blog.image_url || '/img/blog-placeholder.jpg'" alt="" class="h-10 w-10 rounded object-cover">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ blog.title }}</div>
                        <div class="text-sm text-gray-500">{{ formatDate(blog.published_at) }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ blog.first_name }} {{ blog.last_name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {{ blog.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      blog.is_featured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    ]">
                      {{ blog.is_featured ? 'Featured' : 'Normal' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      @click="openBlogModal(blog)"
                      class="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      @click="toggleBlogFeaturedStatus(blog)"
                      class="text-orange-600 hover:text-orange-900 mr-3"
                    >
                      {{ blog.is_featured ? 'Unfeature' : 'Feature' }}
                    </button>
                    <button
                      @click="deleteBlog(blog.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <!-- Business Modal -->
    <div v-if="showBusinessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">
          {{ isEditingBusiness ? 'Edit Business' : 'Add Business' }}
        </h3>
        <form @submit.prevent="saveBusiness">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Business Name</label>
              <input v-model="businessForm.title" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Category</label>
              <select v-model="businessForm.category" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
                <option value="Alojamiento">Alojamiento</option>
                <option value="Restaurante y bar">Restaurante y bar</option>
                <option value="Entretenimiento">Entretenimiento</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Address</label>
              <input v-model="businessForm.address" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="showBusinessModal = false" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
              {{ isEditingBusiness ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Event Modal -->
    <div v-if="showEventModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">
          {{ isEditingEvent ? 'Edit Event' : 'Add Event' }}
        </h3>
        <form @submit.prevent="saveEvent">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Event Name</label>
              <input v-model="eventForm.event_name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Date</label>
              <input v-model="eventForm.event_date" type="date" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Time</label>
              <input v-model="eventForm.event_time" type="time" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Location</label>
              <input v-model="eventForm.location" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Event Type</label>
              <input v-model="eventForm.event_type" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Price</label>
              <input v-model="eventForm.price" type="number" min="0" step="0.01" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="showEventModal = false" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
              {{ isEditingEvent ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Blog Modal -->
    <div v-if="showBlogModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 class="text-lg font-semibold mb-4">
          {{ isEditingBlog ? 'Edit Blog Post' : 'Add Blog Post' }}
        </h3>
        <form @submit.prevent="saveBlog">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Title</label>
              <input v-model="blogForm.title" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Category</label>
              <input v-model="blogForm.category" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Content</label>
              <textarea v-model="blogForm.content" rows="4" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"></textarea>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="showBlogModal = false" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
              {{ isEditingBlog ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Notification -->
    <div v-if="notification.show" 
      class="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 flex items-start max-w-sm"
      :class="{'bg-green-50': notification.type === 'success', 'bg-red-50': notification.type === 'error'}"
    >
      <div v-if="notification.type === 'success'" class="text-green-500 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div v-if="notification.type === 'error'" class="text-red-500 mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <div class="font-medium" :class="{'text-green-800': notification.type === 'success', 'text-red-800': notification.type === 'error'}">{{ notification.title }}
       </div>
       <div class="text-sm text-gray-600">{{ notification.message }}</div>
     </div>
     <button @click="notification.show = false" class="ml-auto text-gray-400 hover:text-gray-500">
       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
       </svg>
     </button>
   </div>
 </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from '~/src/config/axios';

// Router
const router = useRouter();

// Estado del usuario
const user = ref({
 id: null,
 first_name: '',
 last_name: '',
 email: '',
 role: ''
});

// Estado de las tabs
const activeTab = ref('businesses');

// Estado de datos
const stats = ref({
 totalBusinesses: 0,
 totalEvents: 0,
 totalBlogs: 0
});

const businesses = ref([]);
const events = ref([]);
const blogs = ref([]);

// Estados de loading
const isLoading = ref(false);

// Estados de modales
const showBusinessModal = ref(false);
const showEventModal = ref(false);
const showBlogModal = ref(false);

// Estados de edición
const isEditingBusiness = ref(false);
const isEditingEvent = ref(false);
const isEditingBlog = ref(false);

// Formularios
const businessForm = ref({
 id: null,
 title: '',
 category: '',
 address: '',
 property_type: '',
 status: 'for-rent'
});

const eventForm = ref({
 id: null,
 event_name: '',
 event_date: '',
 event_time: '',
 location: '',
 event_type: '',
 price: 0,
 description: ''
});

const blogForm = ref({
 id: null,
 title: '',
 category: '',
 content: '',
 is_featured: false
});

// Notificación
const notification = ref({
 show: false,
 type: 'success',
 title: '',
 message: ''
});

// Métodos
const loadUserData = async () => {
 try {
   const token = localStorage.getItem('access_token');
   if (!token) {
     router.push('/auth/login');
     return;
   }
   
   const response = await axios.get('/api/users/profile', {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   
   if (response.data?.success) {
     user.value = response.data.data.user;
     
     // Verificar que el usuario es admin
     if (user.value.role !== 'admin') {
       showNotification('error', 'Access denied', 'Admin privileges required.');
       router.push('/');
       return;
     }
   }
 } catch (error) {
   console.error('Error loading user data:', error);
   router.push('/auth/login');
 }
};

const loadStats = async () => {
 try {
   // Cargar estadísticas simuladas
   stats.value = {
     totalBusinesses: businesses.value.length,
     totalEvents: events.value.length,
     totalBlogs: blogs.value.length
   };
 } catch (error) {
   console.error('Error loading stats:', error);
 }
};

const loadBusinesses = async () => {
 try {
   isLoading.value = true;
   const token = localStorage.getItem('access_token');
   
   const response = await axios.get('/api/properties', {
     headers: { 'Authorization': `Bearer ${token}` },
     params: {
       limit: 100 // Cargar todas las propiedades
     }
   });
   
   if (response.data?.success) {
     businesses.value = response.data.data.properties || [];
   }
 } catch (error) {
   console.error('Error loading businesses:', error);
   showNotification('error', 'Error', 'Error loading businesses');
 } finally {
   isLoading.value = false;
 }
};

const loadEvents = async () => {
 try {
   isLoading.value = true;
   const token = localStorage.getItem('access_token');
   
   const response = await axios.get('/api/events', {
     headers: { 'Authorization': `Bearer ${token}` },
     params: {
       limit: 100 // Cargar todos los eventos
     }
   });
   
   if (response.data?.success) {
     events.value = response.data.data.events || [];
   }
 } catch (error) {
   console.error('Error loading events:', error);
   showNotification('error', 'Error', 'Error loading events');
 } finally {
   isLoading.value = false;
 }
};

const loadBlogs = async () => {
 try {
   isLoading.value = true;
   const token = localStorage.getItem('access_token');
   
   const response = await axios.get('/api/blogs', {
     headers: { 'Authorization': `Bearer ${token}` },
     params: {
       limit: 100 // Cargar todos los blogs
     }
   });
   
   if (response.data?.success) {
     blogs.value = response.data.data.blogs || [];
   }
 } catch (error) {
   console.error('Error loading blogs:', error);
   showNotification('error', 'Error', 'Error loading blogs');
 } finally {
   isLoading.value = false;
 }
};

// Business methods
const openBusinessModal = (business = null) => {
 if (business) {
   isEditingBusiness.value = true;
   businessForm.value = { ...business };
 } else {
   isEditingBusiness.value = false;
   businessForm.value = {
     id: null,
     title: '',
     category: '',
     address: '',
     property_type: '',
     status: 'for-rent'
   };
 }
 showBusinessModal.value = true;
};

const saveBusiness = async () => {
 try {
   const token = localStorage.getItem('access_token');
   let response;
   
   if (isEditingBusiness.value) {
     response = await axios.put(`/api/properties/${businessForm.value.id}`, businessForm.value, {
       headers: { 'Authorization': `Bearer ${token}` }
     });
   } else {
     response = await axios.post('/api/properties', businessForm.value, {
       headers: { 'Authorization': `Bearer ${token}` }
     });
   }
   
   if (response.data?.success) {
     showNotification('success', 'Success', `Business ${isEditingBusiness.value ? 'updated' : 'created'} successfully`);
     loadBusinesses();
     showBusinessModal.value = false;
   }
 } catch (error) {
   console.error('Error saving business:', error);
   showNotification('error', 'Error', 'Error saving business');
 }
};

const toggleBusinessStatus = async (business) => {
 try {
   const token = localStorage.getItem('access_token');
   const newStatus = business.status === 'for-rent' ? 'unavailable' : 'for-rent';
   
   const response = await axios.put(`/api/properties/${business.id}`, {
     status: newStatus
   }, {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   
   if (response.data?.success) {
     business.status = newStatus;
     showNotification('success', 'Success', `Business ${newStatus}`);
   }
 } catch (error) {
   console.error('Error toggling business status:', error);
   showNotification('error', 'Error', 'Error updating business status');
 }
};

const deleteBusiness = async (businessId) => {
 if (!confirm('Are you sure you want to delete this business?')) return;
 
 try {
   const token = localStorage.getItem('access_token');
   const response = await axios.delete(`/api/properties/${businessId}`, {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   
   if (response.data?.success) {
     showNotification('success', 'Success', 'Business deleted successfully');
     loadBusinesses();
   }
 } catch (error) {
   console.error('Error deleting business:', error);
   showNotification('error', 'Error', 'Error deleting business');
 }
};

// Event methods
const openEventModal = (event = null) => {
 if (event) {
   isEditingEvent.value = true;
   eventForm.value = { ...event };
 } else {
   isEditingEvent.value = false;
   eventForm.value = {
     id: null,
     event_name: '',
     event_date: '',
     event_time: '',
     location: '',
     event_type: '',
     price: 0,
     description: ''
   };
 }
 showEventModal.value = true;
};

const saveEvent = async () => {
 try {
   const token = localStorage.getItem('access_token');
   let response;
   
   if (isEditingEvent.value) {
     response = await axios.put(`/api/events/${eventForm.value.id}`, eventForm.value, {
       headers: { 'Authorization': `Bearer ${token}` }
     });
   } else {
     response = await axios.post('/api/events', eventForm.value, {
       headers: { 'Authorization': `Bearer ${token}` }
     });
   }
   
   if (response.data?.success) {
     showNotification('success', 'Success', `Event ${isEditingEvent.value ? 'updated' : 'created'} successfully`);
     loadEvents();
     showEventModal.value = false;
   }
 } catch (error) {
   console.error('Error saving event:', error);
   showNotification('error', 'Error', 'Error saving event');
 }
};

const toggleEventStatus = async (event) => {
 try {
   const token = localStorage.getItem('access_token');
   const newStatus = event.status === 'activo' ? 'cancelado' : 'activo';
   
   const response = await axios.put(`/api/events/${event.id}/status`, {
     status: newStatus
   }, {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   
   if (response.data?.success) {
     event.status = newStatus;
     showNotification('success', 'Success', `Event ${newStatus}`);
   }
 } catch (error) {
   console.error('Error toggling event status:', error);
   showNotification('error', 'Error', 'Error updating event status');
 }
};

const deleteEvent = async (eventId) => {
 if (!confirm('Are you sure you want to delete this event?')) return;
 
 try {
   const token = localStorage.getItem('access_token');
   const response = await axios.delete(`/api/events/${eventId}`, {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   
   if (response.data?.success) {
     showNotification('success', 'Success', 'Event deleted successfully');
     loadEvents();
   }
 } catch (error) {
   console.error('Error deleting event:', error);
   showNotification('error', 'Error', 'Error deleting event');
 }
};

// Blog methods
const openBlogModal = (blog = null) => {
 if (blog) {
   isEditingBlog.value = true;
   blogForm.value = { ...blog };
 } else {
   isEditingBlog.value = false;
   blogForm.value = {
     id: null,
     title: '',
     category: '',
     content: '',
     is_featured: false
   };
 }
 showBlogModal.value = true;
};

const saveBlog = async () => {
 try {
   const token = localStorage.getItem('access_token');
   let response;
   
   if (isEditingBlog.value) {
     response = await axios.put(`/api/blogs/${blogForm.value.id}`, blogForm.value, {
       headers: { 'Authorization': `Bearer ${token}` }
     });
   } else {
     response = await axios.post('/api/blogs', blogForm.value, {
       headers: { 'Authorization': `Bearer ${token}` }
     });
   }
   
   if (response.data?.success) {
     showNotification('success', 'Success', `Blog post ${isEditingBlog.value ? 'updated' : 'created'} successfully`);
     loadBlogs();
     showBlogModal.value = false;
   }
 } catch (error) {
   console.error('Error saving blog:', error);
   showNotification('error', 'Error', 'Error saving blog post');
 }
};

const toggleBlogFeaturedStatus = async (blog) => {
 try {
   const token = localStorage.getItem('access_token');
   const newStatus = !blog.is_featured;
   
   const response = await axios.put(`/api/blogs/${blog.id}/featured`, {
     is_featured: newStatus
   }, {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   
   if (response.data?.success) {
     blog.is_featured = newStatus;
     showNotification('success', 'Success', `Blog post ${newStatus ? 'featured' : 'unfeatured'}`);
   }
 } catch (error) {
   console.error('Error toggling blog featured status:', error);
   showNotification('error', 'Error', 'Error updating blog featured status');
 }
};

const deleteBlog = async (blogId) => {
 if (!confirm('Are you sure you want to delete this blog post?')) return;
 
 try {
   const token = localStorage.getItem('access_token');
   const response = await axios.delete(`/api/blogs/${blogId}`, {
     headers: { 'Authorization': `Bearer ${token}` }
   });
   
   if (response.data?.success) {
     showNotification('success', 'Success', 'Blog post deleted successfully');
     loadBlogs();
   }
 } catch (error) {
   console.error('Error deleting blog:', error);
   showNotification('error', 'Error', 'Error deleting blog post');
 }
};

// Utility methods
const formatDate = (date) => {
 if (!date) return 'N/A';
 return new Date(date).toLocaleDateString('en-US', {
   year: 'numeric',
   month: 'short',
   day: 'numeric'
 });
};

const formatPrice = (price) => {
 if (!price) return '0';
 return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const getBusinessStatusClass = (status) => {
 switch (status) {
   case 'for-rent':
     return 'bg-green-100 text-green-800';
   case 'for-sale':
     return 'bg-blue-100 text-blue-800';
   case 'unavailable':
     return 'bg-red-100 text-red-800';
   default:
     return 'bg-gray-100 text-gray-800';
 }
};

const getEventStatusClass = (status) => {
 switch (status) {
   case 'activo':
     return 'bg-green-100 text-green-800';
   case 'cancelado':
     return 'bg-red-100 text-red-800';
   case 'pospuesto':
     return 'bg-yellow-100 text-yellow-800';
   case 'completado':
     return 'bg-gray-100 text-gray-800';
   default:
     return 'bg-gray-100 text-gray-800';
 }
};

const showNotification = (type, title, message = '') => {
 notification.value = {
   show: true,
   type,
   title,
   message
 };
 
 setTimeout(() => {
   notification.value.show = false;
 }, 3000);
};

// Lifecycle hooks
onMounted(async () => {
 await loadUserData();
 
 // Si el usuario es admin, cargar datos iniciales
 if (user.value.role === 'admin') {
   await loadBusinesses();
   await loadEvents();
   await loadBlogs();
   await loadStats();
 }
});

// Watch para cargar datos cuando cambia la tab activa
watch(activeTab, async (newTab) => {
 switch (newTab) {
   case 'businesses':
     if (businesses.value.length === 0) await loadBusinesses();
     break;
   case 'events':
     if (events.value.length === 0) await loadEvents();
     break;
   case 'blogs':
     if (blogs.value.length === 0) await loadBlogs();
     break;
 }
 
 // Actualizar estadísticas
 await loadStats();
});
</script>

<style scoped>
/* Estilos personalizados */
input, select, textarea {
 @apply border-gray-300 focus:border-orange-500 focus:ring-orange-500;
}

button:disabled {
 @apply opacity-50 cursor-not-allowed;
}
</style>