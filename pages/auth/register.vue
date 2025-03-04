<template>
    <NuxtLayout name="auth">
      <template #title>Create your account</template>
      <template #subtitle>
        <span>Already have an account?</span>
        <NuxtLink to="/auth/login" class="text-blue-600 dark:text-blue-400 hover:underline">Sign in</NuxtLink>
      </template>
      
      <!-- Alert for errors -->
      <div 
        v-if="error" 
        class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded relative mb-6"
        role="alert"
      >
        <span class="block sm:inline">{{ error }}</span>
        <button 
          @click="error = null" 
          class="absolute top-0 right-0 px-4 py-3"
        >
          <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <!-- Registration Form -->
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="form-label">Full Name</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              autocomplete="name" 
              required 
              v-model="registerForm.name"
              class="form-input"
              :disabled="isLoading"
            />
            <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
          </div>
          
          <!-- Email -->
          <div>
            <label for="email" class="form-label">Email address</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              v-model="registerForm.email"
              class="form-input"
              :disabled="isLoading"
            />
            <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
          </div>
          
          <!-- Phone -->
          <div>
            <label for="phone" class="form-label">Phone Number</label>
            <input 
              id="phone" 
              name="phone" 
              type="tel" 
              autocomplete="tel" 
              v-model="registerForm.phone"
              class="form-input"
              :disabled="isLoading"
            />
            <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
          </div>
          
          <!-- Role Selection -->
          <div>
            <label for="role" class="form-label">I want to</label>
            <select 
              id="role" 
              name="role" 
              v-model="registerForm.role"
              class="form-input"
              :disabled="isLoading"
            >
              <option value="guest">Rent/Buy Properties</option>
              <option value="host">List Properties for Rent/Sale</option>
            </select>
          </div>
          
          <!-- Password -->
          <div>
            <label for="password" class="form-label">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="new-password" 
              required 
              v-model="registerForm.password"
              class="form-input"
              :disabled="isLoading"
            />
            <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
          </div>
          
          <!-- Confirm Password -->
          <div>
            <label for="passwordConfirmation" class="form-label">Confirm Password</label>
            <input 
              id="passwordConfirmation" 
              name="passwordConfirmation" 
              type="password" 
              autocomplete="new-password" 
              required 
              v-model="registerForm.passwordConfirmation"
              class="form-input"
              :disabled="isLoading"
            />
            <p v-if="errors.passwordConfirmation" class="form-error">{{ errors.passwordConfirmation }}</p>
          </div>
        </div>
  
        <!-- Terms and Conditions -->
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input 
              id="terms" 
              name="terms" 
              type="checkbox" 
              required
              v-model="registerForm.agreeTerms"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              :disabled="isLoading"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="terms" class="text-gray-700 dark:text-gray-300">
              I agree to the <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">Terms and Conditions</a> and <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
            </label>
            <p v-if="errors.agreeTerms" class="form-error">{{ errors.agreeTerms }}</p>
          </div>
        </div>
  
        <!-- Submit Button -->
        <div>
          <button 
            type="submit" 
            class="btn-primary w-full py-3 px-4 flex justify-center items-center"
            :disabled="isLoading"
          >
            <svg 
              v-if="isLoading" 
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isLoading ? 'Creating account...' : 'Create account' }}</span>
          </button>
        </div>
      </form>
    </NuxtLayout>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth';
  
  const router = useRouter();
  const authStore = useAuthStore();
  
  // Form state
  const registerForm = ref({
    name: '',
    email: '',
    phone: '',
    role: 'guest', // Default role
    password: '',
    passwordConfirmation: '',
    agreeTerms: false
  });
  
  // UI state
  const isLoading = ref(false);
  const error = ref(null);
  const errors = ref({});
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!registerForm.value.name) {
      newErrors.name = 'Name is required';
    } else if (registerForm.value.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!registerForm.value.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(registerForm.value.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation (optional)
    if (registerForm.value.phone && !/^\+?[\d\s-]{10,15}$/.test(registerForm.value.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Password validation
    if (!registerForm.value.password) {
      newErrors.password = 'Password is required';
    } else if (registerForm.value.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Password confirmation validation
    if (!registerForm.value.passwordConfirmation) {
      newErrors.passwordConfirmation = 'Please confirm your password';
    } else if (registerForm.value.password !== registerForm.value.passwordConfirmation) {
      newErrors.passwordConfirmation = 'Passwords do not match';
    }
    
    // Terms validation
    if (!registerForm.value.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  };
  
  // Register function
  const register = async () => {
    if (!validateForm()) {
      return;
    }
    
    isLoading.value = true;
    error.value = null;
    
    try {
      await authStore.register({
        name: registerForm.value.name,
        email: registerForm.value.email,
        phone: registerForm.value.phone,
        role: registerForm.value.role,
        password: registerForm.value.password,
        password_confirmation: registerForm.value.passwordConfirmation,
      });
      
      // Redirect to home page or onboarding
      router.push('/');
    } catch (err) {
      console.error('Registration error:', err);
      
      // Handle validation errors from API
      if (err.response?.data?.errors) {
        errors.value = err.response.data.errors;
      } else {
        error.value = err.response?.data?.message || 'Failed to create account. Please try again.';
      }
    } finally {
      isLoading.value = false;
    }
  };
  </script>