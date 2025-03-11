<template>
  <div>
    <h1 class="text-2xl font-bold mb-6 text-center">Create Your Account</h1>

    <form @submit.prevent="handleRegister" class="space-y-6">
      <!-- Error Alert -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <!-- Name Inputs -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
          <input 
            id="firstName" 
            v-model="firstName" 
            type="text" 
            required 
            class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="John"
          />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
          <input 
            id="lastName" 
            v-model="lastName" 
            type="text" 
            required 
            class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Doe"
          />
        </div>
      </div>

      <!-- Email Input -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          required 
          class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="your@email.com"
        />
      </div>

      <!-- Password Input -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
        <input 
          id="password" 
          v-model="password" 
          type="password" 
          required
          minlength="8"
          class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="••••••••"
        />
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Password must be at least 8 characters long
        </p>
      </div>

      <!-- Confirm Password Input -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Confirm Password
        </label>
        <input 
          id="confirmPassword" 
          v-model="confirmPassword" 
          type="password" 
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="••••••••"
        />
      </div>

      <!-- Terms and Conditions -->
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input 
            id="terms" 
            v-model="agreeToTerms" 
            type="checkbox" 
            required
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="terms" class="text-gray-700 dark:text-gray-300">
            I agree to the
            <NuxtLink to="/terms" class="text-blue-600 dark:text-blue-400 hover:underline">
              Terms of Service
            </NuxtLink>
            and
            <NuxtLink to="/privacy" class="text-blue-600 dark:text-blue-400 hover:underline">
              Privacy Policy
            </NuxtLink>
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit" 
        class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        :disabled="loading || password !== confirmPassword || !agreeToTerms"
      >
        <span v-if="loading">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creating account...
        </span>
        <span v-else>Create Account</span>
      </button>

      <!-- Sign In Link -->
      <div class="text-center text-sm">
        Already have an account? 
        <NuxtLink to="/auth/login" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          Log in
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/store/auth';

// Component state
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeToTerms = ref(false);
const error = ref('');
const loading = ref(false);

// Get auth store
const authStore = useAuthStore();
const router = useRouter();

// Password validation
const passwordsMatch = computed(() => {
  if (!password.value || !confirmPassword.value) return true;
  return password.value === confirmPassword.value;
});

// Handle registration form submission
const handleRegister = async () => {
  // Validate form
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  if (!agreeToTerms.value) {
    error.value = 'You must agree to the Terms of Service and Privacy Policy.';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const result = await authStore.register({
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value
    });

    if (result.success) {
      // Redirect to dashboard or to a welcome page
      router.push('/dashboard');
    } else {
      error.value = result.error || 'Registration failed. Please try again.';
    }
  } catch (err) {
    console.error('Registration error:', err);
    error.value = 'An unexpected error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Layout setup
definePageMeta({
  layout: 'auth'
});
</script>