<!-- components/admin/StatsCards.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-3">
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md">
      <div class="p-4">
        <div class="flex items-start">
          <div class="p-2 rounded-lg bg-orange-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Comercios</h3>
            <p class="text-2xl font-bold text-gray-800">{{ stats.totalBusinesses }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md">
      <div class="p-4">
        <div class="flex items-start">
          <div class="p-2 rounded-lg bg-blue-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Eventos</h3>
            <p class="text-2xl font-bold text-gray-800">{{ stats.totalEvents }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md">
      <div class="p-4">
        <div class="flex items-start">
          <div class="p-2 rounded-lg bg-green-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 0a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V7m2-5a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2h-2" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Posts</h3>
            <p class="text-2xl font-bold text-gray-800">{{ stats.totalBlogs }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsCards',
  props: {
    stats: {
      type: Object,
      required: true,
      default: () => ({
        totalBusinesses: 0,
        totalEvents: 0,
        totalBlogs: 0
      })
    }
  }
}
</script>