
<template>
    <div class="container-custom py-12">
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Welcome, {{ userName }}</h1>
        <p class="text-gray-600 dark:text-gray-400">Here's an overview of your activity on OASIS</p>
      </div>
      
      <!-- Dashboard Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <!-- Bookings Stats -->
        <DashboardCard title="Your Bookings" icon="calendar">
          <template #stats>
            <div class="text-4xl font-bold">{{ bookingCount }}</div>
            <div class="text-gray-600 dark:text-gray-400">
              {{ bookingCount === 1 ? 'Booking' : 'Bookings' }}
            </div>
          </template>
          <template #action>
            <NuxtLink to="/bookings" class="text-orange-600 dark:text-orange-400 font-medium hover:underline">
              Ver todo Bookings →
            </NuxtLink>
          </template>
        </DashboardCard>
        
        <!-- Favorites Stats -->
        <DashboardCard title="Saved Properties" icon="heart">
          <template #stats>
            <div class="text-4xl font-bold">{{ favoritesCount }}</div>
            <div class="text-gray-600 dark:text-gray-400">
              {{ favoritesCount === 1 ? 'Property' : 'Properties' }}
            </div>
          </template>
          <template #action>
            <NuxtLink to="/favorites" class="text-orange-600 dark:text-orange-400 font-medium hover:underline">
              View Favorites →
            </NuxtLink>
          </template>
        </DashboardCard>
        
        <!-- Messages Stats -->
        <DashboardCard title="Unread Messages" icon="mail">
          <template #stats>
            <div class="text-4xl font-bold">{{ unreadMessagesCount }}</div>
            <div class="text-gray-600 dark:text-gray-400">
              {{ unreadMessagesCount === 1 ? 'Message' : 'Messages' }}
            </div>
          </template>
          <template #action>
            <NuxtLink to="/messages" class="text-orange-600 dark:text-orange-400 font-medium hover:underline">
              View Messages →
            </NuxtLink>
          </template>
        </DashboardCard>
      </div>
      
      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-12">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-6">Recent Activity</h2>
          
          <!-- Loading state -->
          <div v-if="loading" class="py-8 flex justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          </div>
          
          <!-- Activities list -->
          <div v-else-if="activities.length > 0">
            <div v-for="activity in activities" :key="activity.id" class="py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div class="flex items-start">
                <!-- Activity icon -->
                <div 
                  class="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                  :class="getActivityIconClasses(activity.type)"
                >
                  <svg v-if="activity.type === 'booking'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <svg v-else-if="activity.type === 'message'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                
                <!-- Activity content -->
                <div class="flex-grow">
                  <div class="flex justify-between">
                    <h3 class="font-medium text-gray-900 dark:text-white">{{ activity.title }}</h3>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(activity.date) }}</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 mt-1">{{ activity.description }}</p>
                  <div v-if="activity.link" class="mt-2">
                    <NuxtLink :to="activity.link.url" class="text-orange-600 dark:text-orange-400 text-sm hover:underline">
                      {{ activity.link.text }}
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Empty state -->
          <div v-else class="py-8 text-center">
            <p class="text-gray-600 dark:text-gray-400">No recent activity to display.</p>
          </div>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-6">Quick Actions</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              @click="navigateTo('/properties')" 
              class="p-4 flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search Properties</span>
            </button>
            
            <button 
              @click="navigateTo('/profile')" 
              class="p-4 flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Edit Profile</span>
            </button>
            
            <button 
              @click="navigateTo('/contact')" 
              class="p-4 flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Contact Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import DashboardCard from '~/components/dashboard/DashboardCard.vue';
  import { ref, computed, onMounted } from 'vue';
  import { useAuthStore } from '~/store/auth';
  import { useBookingStore } from '~/store/booking';
  
  // Initialize auth store
  const authStore = useAuthStore();
  const bookingStore = useBookingStore();
  
  // Local state
  const loading = ref(true);
  const activities = ref([]);
  const userName = computed(() => {
    const user = authStore.user;
    if (!user) return 'Guest';
    return user.first_name || user.email?.split('@')[0] || 'User';
  });
  
  // Mocked statistics (replace with real data when available)
  const bookingCount = ref(0);
  const favoritesCount = ref(0);
  const unreadMessagesCount = ref(0);
  
  // Fetch dashboard data
  const fetchDashboardData = async () => {
    loading.value = true;
    
    try {
      // Fetch user bookings
      await bookingStore.fetchUserBookings();
      bookingCount.value = bookingStore.bookings.length;
      
      // For demo purposes, let's create some mock activity data
      // In a real app, you would fetch this from an API
      activities.value = [
        {
          id: 1,
          type: 'booking',
          title: 'Booking Confirmed',
          description: 'Your booking for "Luxury Apartment" has been confirmed.',
          date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
          link: {
            url: '/bookings/1',
            text: 'View Booking'
          }
        },
        {
          id: 2,
          type: 'message',
          title: 'New Message',
          description: 'You received a message from John regarding your inquiry.',
          date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
          link: {
            url: '/messages/1',
            text: 'Read Message'
          }
        },
        {
          id: 3,
          type: 'system',
          title: 'Welcome to OASIS',
          description: 'Thank you for joining our platform. Explore properties and find your dream home.',
          date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
          link: null
        }
      ];
      
      // Mock some stats
      favoritesCount.value = 3;
      unreadMessagesCount.value = 2;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Get activity icon classes
  const getActivityIconClasses = (type) => {
    switch (type) {
      case 'booking':
        return 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400';
      case 'message':
        return 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400';
      default:
        return 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400';
    }
  };
  
  // Format date
  const formatDate = (date) => {
    if (!date) return '';
    
    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return d.toLocaleDateString();
    }
  };
  
  // Fetch data on component mount
  onMounted(() => {
    fetchDashboardData();
  });
  
  // Define page meta to require authentication
  definePageMeta({
    middleware: ['auth']
  });
  </script>
  
  <style scoped>
  .container-custom {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  </style>