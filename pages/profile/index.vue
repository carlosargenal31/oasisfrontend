<template>
    <div class="container-custom py-12">
      <h1 class="text-3xl font-bold mb-8">My Profile</h1>
      
      <!-- Loading State -->
      <div v-if="userStore.loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      
      <!-- Profile Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
            <div class="p-6">
              <!-- User Avatar -->
              <div class="flex flex-col items-center mb-6">
                <div class="w-32 h-32 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-4xl font-bold mb-4">
                  {{ userInitials }}
                </div>
                <h2 class="text-xl font-bold">{{ fullName }}</h2>
                <p class="text-gray-600 dark:text-gray-400">{{ user?.email }}</p>
              </div>
              
              <!-- Stats -->
              <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div class="flex justify-between mb-3">
                  <span class="text-gray-600 dark:text-gray-400">Member since</span>
                  <span>{{ formatDate(user?.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Navigation -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div class="p-4">
              <button 
                @click="activeTab = 'profile'" 
                class="w-full text-left px-4 py-3 rounded-lg mb-2"
                :class="activeTab === 'profile' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700'"
              >
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Personal Information</span>
                </div>
              </button>
              
              <button 
                @click="activeTab = 'security'" 
                class="w-full text-left px-4 py-3 rounded-lg mb-2"
                :class="activeTab === 'security' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700'"
              >
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Security</span>
                </div>
              </button>
              
              <button 
                @click="activeTab = 'preferences'" 
                class="w-full text-left px-4 py-3 rounded-lg mb-2"
                :class="activeTab === 'preferences' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700'"
              >
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Preferences</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <!-- Profile Form -->
            <div v-if="activeTab === 'profile'" class="p-6">
              <h2 class="text-2xl font-bold mb-6">Personal Information</h2>
              
              <!-- Form -->
              <form @submit.prevent="updateProfile" class="space-y-6">
                <!-- Success Message -->
                <div 
                  v-if="successMessage" 
                  class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" 
                  role="alert"
                >
                  <span class="block sm:inline">{{ successMessage }}</span>
                </div>
                
                <!-- Error Message -->
                <div 
                  v-if="errorMessage" 
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" 
                  role="alert"
                >
                  <span class="block sm:inline">{{ errorMessage }}</span>
                </div>
                
                <!-- First & Last Name -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input 
                      id="firstName" 
                      v-model="form.firstName" 
                      type="text" 
                      class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input 
                      id="lastName" 
                      v-model="form.lastName" 
                      type="text" 
                      class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                
                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input 
                    id="email" 
                    v-model="form.email" 
                    type="email" 
                    class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <!-- Phone -->
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <input 
                    id="phone" 
                    v-model="form.phone" 
                    type="tel" 
                    class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <!-- Save Button -->
                <div class="flex justify-end">
                  <button 
                    type="submit" 
                    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                    :disabled="isUpdating"
                  >
                    <span v-if="isUpdating">Saving...</span>
                    <span v-else>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Security Settings -->
            <div v-else-if="activeTab === 'security'" class="p-6">
              <h2 class="text-2xl font-bold mb-6">Security</h2>
              
              <!-- Change Password Form -->
              <form @submit.prevent="changePassword" class="space-y-6">
                <!-- Success Message -->
                <div 
                  v-if="passwordSuccessMessage" 
                  class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" 
                  role="alert"
                >
                  <span class="block sm:inline">{{ passwordSuccessMessage }}</span>
                </div>
                
                <!-- Error Message -->
                <div 
                  v-if="passwordErrorMessage" 
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" 
                  role="alert"
                >
                  <span class="block sm:inline">{{ passwordErrorMessage }}</span>
                </div>
                
                <!-- Current Password -->
                <div>
                  <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input 
                    id="currentPassword" 
                    v-model="passwordForm.currentPassword" 
                    type="password" 
                    class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                
                <!-- New Password -->
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <input 
                    id="newPassword" 
                    v-model="passwordForm.newPassword" 
                    type="password" 
                    class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                    minlength="8"
                  />
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Password must be at least 8 characters long
                  </p>
                </div>
                
                <!-- Confirm New Password -->
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input 
                    id="confirmPassword" 
                    v-model="passwordForm.confirmPassword" 
                    type="password" 
                    class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                
                <!-- Save Button -->
                <div class="flex justify-end">
                  <button 
                    type="submit" 
                    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                    :disabled="isChangingPassword || !isPasswordFormValid"
                  >
                    <span v-if="isChangingPassword">Updating...</span>
                    <span v-else>Change Password</span>
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Preferences -->
            <div v-else-if="activeTab === 'preferences'" class="p-6">
              <h2 class="text-2xl font-bold mb-6">Preferences</h2>
              
              <!-- Notification Settings -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold mb-4">Notification Settings</h3>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-medium">Email Notifications</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Receive emails about your account activity
                      </p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="preferences.emailNotifications" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-medium">SMS Notifications</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Receive text messages for important updates
                      </p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="preferences.smsNotifications" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-medium">Marketing Emails</h4>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        Receive emails about promotions and news
                      </p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" v-model="preferences.marketingEmails" class="sr-only peer">
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <!-- Language Settings -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold mb-4">Language & Region</h3>
                
                <div class="space-y-4">
                  <div>
                    <label for="language" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Language
                    </label>
                    <select 
                      id="language" 
                      v-model="preferences.language" 
                      class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="currency" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Currency
                    </label>
                    <select 
                      id="currency" 
                      v-model="preferences.currency" 
                      class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <!-- Save Button -->
              <div class="flex justify-end">
                <button 
                  @click="savePreferences" 
                  class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
                  :disabled="isSavingPreferences"
                >
                  <span v-if="isSavingPreferences">Saving...</span>
                  <span v-else>Save Preferences</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useAuthStore } from '~/store/auth';
  import { useUserStore } from '~/store/user';
  
  // Initialize stores
  const authStore = useAuthStore();
  const userStore = useUserStore();
  
  // Local state
  const activeTab = ref('profile');
  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const preferences = ref({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    language: 'en',
    currency: 'USD'
  });
  const successMessage = ref('');
  const errorMessage = ref('');
  const passwordSuccessMessage = ref('');
  const passwordErrorMessage = ref('');
  const isUpdating = ref(false);
  const isChangingPassword = ref(false);
  const isSavingPreferences = ref(false);
  
  // Get user data from auth store
  const user = computed(() => authStore.user);
  
  // Computed properties
  const userInitials = computed(() => {
    if (!user.value) return '';
    
    const firstName = user.value.first_name || '';
    const lastName = user.value.last_name || '';
    
    if (!firstName && !lastName) {
      return user.value.email?.charAt(0)?.toUpperCase() || '';
    }
    
    return (firstName.charAt(0) + (lastName ? lastName.charAt(0) : '')).toUpperCase();
  });
  
  const fullName = computed(() => {
    if (!user.value) return '';
    
    const firstName = user.value.first_name || '';
    const lastName = user.value.last_name || '';
    
    if (!firstName && !lastName) {
      return user.value.email?.split('@')[0] || 'User';
    }
    
    return `${firstName} ${lastName}`.trim();
  });
  
  const isPasswordFormValid = computed(() => {
    return (
      passwordForm.value.currentPassword && 
      passwordForm.value.newPassword && 
      passwordForm.value.newPassword === passwordForm.value.confirmPassword &&
      passwordForm.value.newPassword.length >= 8
    );
  });
  
  // Initialize form with user data
  const initForm = () => {
    if (user.value) {
      form.value.firstName = user.value.first_name || '';
      form.value.lastName = user.value.last_name || '';
      form.value.email = user.value.email || '';
      form.value.phone = user.value.phone || '';
    }
  };
  
  // Update profile handler
  const updateProfile = async () => {
    successMessage.value = '';
    errorMessage.value = '';
    isUpdating.value = true;
    
    try {
      const result = await userStore.updateProfile({
        first_name: form.value.firstName,
        last_name: form.value.lastName,
        email: form.value.email,
        phone: form.value.phone
      });
      
      if (result.success) {
        successMessage.value = 'Profile updated successfully';
        
        // Clear message after a delay
        setTimeout(() => {
          successMessage.value = '';
        }, 3000);
      } else {
        errorMessage.value = result.error || 'Failed to update profile';
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      errorMessage.value = 'An unexpected error occurred';
    } finally {
      isUpdating.value = false;
    }
  };
  
  // Change password handler
  const changePassword = async () => {
    // Validate form
    if (!isPasswordFormValid.value) {
      passwordErrorMessage.value = 'Please check your password entries';
      return;
    }
    
    passwordSuccessMessage.value = '';
    passwordErrorMessage.value = '';
    isChangingPassword.value = true;
    
    try {
      const result = await userStore.changePassword({
        current_password: passwordForm.value.currentPassword,
        new_password: passwordForm.value.newPassword,
        confirm_password: passwordForm.value.confirmPassword
      });
      
      if (result.success) {
        passwordSuccessMessage.value = 'Password changed successfully';
        
        // Clear form
        passwordForm.value = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
        
        // Clear message after a delay
        setTimeout(() => {
          passwordSuccessMessage.value = '';
        }, 3000);
      } else {
        passwordErrorMessage.value = result.error || 'Failed to change password';
      }
    } catch (error) {
      console.error('Error changing password:', error);
      passwordErrorMessage.value = 'An unexpected error occurred';
    } finally {
      isChangingPassword.value = false;
    }
  };
  
  // Save preferences handler
  const savePreferences = async () => {
    isSavingPreferences.value = true;
    
    // For demo purposes, just simulate an API call
    setTimeout(() => {
      // Show success message (would normally come from API)
      successMessage.value = 'Preferences saved successfully';
      
      // Clear message after a delay
      setTimeout(() => {
        successMessage.value = '';
      }, 3000);
      
      isSavingPreferences.value = false;
    }, 1000);
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Initialize component
  onMounted(() => {
    initForm();
  });
  
  // Page meta
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