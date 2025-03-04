<template>
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="container-custom py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              OASIS
            </NuxtLink>
          </div>
  
          <!-- Navigation - Desktop -->
          <nav class="hidden md:flex items-center space-x-6">
            <NuxtLink to="/" class="nav-link">
              Home
            </NuxtLink>
            <NuxtLink to="/properties" class="nav-link">
              Properties
            </NuxtLink>
            <NuxtLink to="/about" class="nav-link">
              About
            </NuxtLink>
            <NuxtLink to="/contact" class="nav-link">
              Contact
            </NuxtLink>
          </nav>
  
          <!-- Auth Buttons / User Menu -->
          <div class="hidden md:flex items-center space-x-4">
            <template v-if="isAuthenticated">
              <!-- User Dropdown (when authenticated) -->
              <div class="relative" @click.stop="toggleUserMenu" v-click-outside="closeUserMenu">
                <button class="flex items-center space-x-2">
                  <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span class="text-sm font-medium">{{ userInitials }}</span>
                  </div>
                  <span class="text-gray-700 dark:text-gray-300">{{ userName }}</span>
                </button>
                
                <!-- Dropdown Menu -->
                <div v-if="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <NuxtLink to="/dashboard" class="dropdown-item">
                    Dashboard
                  </NuxtLink>
                  <NuxtLink to="/profile" class="dropdown-item">
                    Profile
                  </NuxtLink>
                  <NuxtLink to="/favorites" class="dropdown-item">
                    Favorites
                  </NuxtLink>
                  <div class="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                  <button @click="logout" class="dropdown-item text-red-600 dark:text-red-400">
                    Logout
                  </button>
                </div>
              </div>
            </template>
            
            <template v-else>
              <!-- Auth Buttons (when not authenticated) -->
              <NuxtLink to="/auth/login" class="btn-text">
                Log in
              </NuxtLink>
              <NuxtLink to="/auth/register" class="btn-primary">
                Sign up
              </NuxtLink>
            </template>
          </div>
  
          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu" class="md:hidden flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
  
        <!-- Mobile Menu -->
        <div v-if="isMobileMenuOpen" class="md:hidden mt-4 py-4 border-t border-gray-100 dark:border-gray-700">
          <NuxtLink to="/" class="mobile-nav-link">
            Home
          </NuxtLink>
          <NuxtLink to="/properties" class="mobile-nav-link">
            Properties
          </NuxtLink>
          <NuxtLink to="/about" class="mobile-nav-link">
            About
          </NuxtLink>
          <NuxtLink to="/contact" class="mobile-nav-link">
            Contact
          </NuxtLink>
  
          <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <template v-if="isAuthenticated">
              <NuxtLink to="/dashboard" class="mobile-nav-link">
                Dashboard
              </NuxtLink>
              <NuxtLink to="/profile" class="mobile-nav-link">
                Profile
              </NuxtLink>
              <NuxtLink to="/favorites" class="mobile-nav-link">
                Favorites
              </NuxtLink>
              <button @click="logout" class="mobile-nav-link text-red-600 dark:text-red-400">
                Logout
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login" class="mobile-nav-link">
                Log in
              </NuxtLink>
              <NuxtLink to="/auth/register" class="mobile-nav-link font-medium text-blue-600 dark:text-blue-400">
                Sign up
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // State
  const isMobileMenuOpen = ref(false);
  const isUserMenuOpen = ref(false);
  
  // Mock authentication - Replace with your actual auth store
  const isAuthenticated = ref(false);
  const userName = ref('John Doe');
  
  // Computed
  const userInitials = computed(() => {
    if (!userName.value) return '';
    return userName.value
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
  });
  
  // Methods
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
    if (isMobileMenuOpen.value) isUserMenuOpen.value = false;
  };
  
  const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value;
  };
  
  const closeUserMenu = () => {
    isUserMenuOpen.value = false;
  };
  
  const logout = () => {
    // Implement your logout logic here
    isAuthenticated.value = false;
    closeUserMenu();
    navigateTo('/');
  };
  
  // Click outside directive (simplified)
  const vClickOutside = {
    mounted(el, binding) {
      el._clickOutside = (event) => {
        if (!(el === event.target || el.contains(event.target))) {
          binding.value(event);
        }
      };
      document.addEventListener('click', el._clickOutside);
    },
    unmounted(el) {
      document.removeEventListener('click', el._clickOutside);
    }
  };
  </script>
  
  <style scoped>
  .container-custom {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .nav-link {
    padding: 0.5rem;
    color: #4b5563;
    transition: color 0.3s ease;
  }
  
  .dark .nav-link {
    color: #d1d5db;
  }
  
  .nav-link:hover {
    color: #1d4ed8;
  }
  
  .dark .nav-link:hover {
    color: #60a5fa;
  }
  
  .btn-text {
    padding: 0.5rem 1rem;
    color: #4b5563;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .dark .btn-text {
    color: #d1d5db;
  }
  
  .btn-text:hover {
    color: #1d4ed8;
  }
  
  .dark .btn-text:hover {
    color: #60a5fa;
  }
  
  .btn-primary {
    padding: 0.5rem 1rem;
    background-color: #1d4ed8;
    color: white;
    font-weight: 500;
    border-radius: 0.375rem;
    transition: background-color 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #1e40af;
  }
  
  .mobile-nav-link {
    display: block;
    padding: 0.75rem 0;
    color: #4b5563;
    transition: color 0.3s ease;
  }
  
  .dark .mobile-nav-link {
    color: #d1d5db;
  }
  
  .mobile-nav-link:hover {
    color: #1d4ed8;
  }
  
  .dark .mobile-nav-link:hover {
    color: #60a5fa;
  }
  
  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: left;
    color: #4b5563;
    transition: background-color 0.3s ease;
  }
  
  .dark .dropdown-item {
    color: #d1d5db;
  }
  
  .dropdown-item:hover {
    background-color: #f3f4f6;
  }
  
  .dark .dropdown-item:hover {
    background-color: #374151;
  }
  </style>