<template>
    <div>
      <!-- Page Header -->
      <div class="bg-gray-100 dark:bg-gray-800 py-8">
        <div class="container-custom">
          <h1 class="text-3xl font-bold mb-2">List Your Property</h1>
          <div class="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
            <NuxtLink to="/" class="hover:text-blue-600 dark:hover:text-blue-400">Home</NuxtLink>
            <span class="mx-2">/</span>
            <NuxtLink to="/properties" class="hover:text-blue-600 dark:hover:text-blue-400">Properties</NuxtLink>
            <span class="mx-2">/</span>
            <span class="text-gray-900 dark:text-white font-medium">Create</span>
          </div>
        </div>
      </div>
  
      <!-- Form Content -->
      <div class="container-custom py-12">
        <!-- Form Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          <!-- Form Title -->
          <div class="mb-8 text-center">
            <h2 class="text-2xl font-bold mb-2">Property Information</h2>
            <p class="text-gray-600 dark:text-gray-400">
              Fill in the details below to list your property on OASIS
            </p>
          </div>
  
          <!-- Property Form -->
          <form @submit.prevent="submitForm" class="max-w-4xl mx-auto">
            <!-- Basic Information Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Basic Information
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Property Title -->
                <div class="md:col-span-2">
                  <label for="title" class="form-label">Property Title <span class="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="title" 
                    v-model="propertyForm.title" 
                    class="form-input" 
                    placeholder="Enter a descriptive title" 
                    required
                  >
                  <p v-if="errors.title" class="form-error">{{ errors.title }}</p>
                </div>
                
                <!-- Property Type -->
                <div>
                  <label for="type" class="form-label">Property Type <span class="text-red-500">*</span></label>
                  <select 
                    id="type" 
                    v-model="propertyForm.type" 
                    class="form-input" 
                    required
                  >
                    <option value="" disabled>Select property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="commercial">Commercial</option>
                    <option value="land">Land</option>
                  </select>
                  <p v-if="errors.type" class="form-error">{{ errors.type }}</p>
                </div>
                
                <!-- Status (For Sale/Rent) -->
                <div>
                  <label for="status" class="form-label">Listing Type <span class="text-red-500">*</span></label>
                  <select 
                    id="status" 
                    v-model="propertyForm.status" 
                    class="form-input" 
                    required
                  >
                    <option value="" disabled>Select listing type</option>
                    <option value="for-sale">For Sale</option>
                    <option value="for-rent">For Rent</option>
                  </select>
                  <p v-if="errors.status" class="form-error">{{ errors.status }}</p>
                </div>
                
                <!-- Price -->
                <div>
                  <label for="price" class="form-label">
                    {{ propertyForm.status === 'for-rent' ? 'Monthly Rent' : 'Price' }} <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span class="text-gray-500">$</span>
                    </div>
                    <input 
                      type="number" 
                      id="price" 
                      v-model="propertyForm.price" 
                      class="form-input pl-7" 
                      :placeholder="propertyForm.status === 'for-rent' ? 'Monthly rent amount' : 'Property price'" 
                      min="0" 
                      required
                    >
                  </div>
                  <p v-if="errors.price" class="form-error">{{ errors.price }}</p>
                </div>
                
                <!-- Area -->
                <div>
                  <label for="area" class="form-label">Area (sq ft) <span class="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    id="area" 
                    v-model="propertyForm.area" 
                    class="form-input" 
                    placeholder="Property size in square feet" 
                    min="0" 
                    required
                  >
                  <p v-if="errors.area" class="form-error">{{ errors.area }}</p>
                </div>
              </div>
            </div>
            
            <!-- Property Details Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Property Details
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Bedrooms -->
                <div>
                  <label for="bedrooms" class="form-label">Bedrooms</label>
                  <input 
                    type="number" 
                    id="bedrooms" 
                    v-model="propertyForm.bedrooms" 
                    class="form-input" 
                    placeholder="Number of bedrooms" 
                    min="0"
                  >
                  <p v-if="errors.bedrooms" class="form-error">{{ errors.bedrooms }}</p>
                </div>
                
                <!-- Bathrooms -->
                <div>
                  <label for="bathrooms" class="form-label">Bathrooms</label>
                  <input 
                    type="number" 
                    id="bathrooms" 
                    v-model="propertyForm.bathrooms" 
                    class="form-input" 
                    placeholder="Number of bathrooms" 
                    min="0"
                  >
                  <p v-if="errors.bathrooms" class="form-error">{{ errors.bathrooms }}</p>
                </div>
                
                <!-- Year Built -->
                <div>
                  <label for="yearBuilt" class="form-label">Year Built</label>
                  <input 
                    type="number" 
                    id="yearBuilt" 
                    v-model="propertyForm.yearBuilt" 
                    class="form-input" 
                    placeholder="Construction year"
                    :max="new Date().getFullYear()"
                    min="1800"
                  >
                  <p v-if="errors.yearBuilt" class="form-error">{{ errors.yearBuilt }}</p>
                </div>
              </div>
              
              <!-- Description -->
              <div class="mt-6">
                <label for="description" class="form-label">Description <span class="text-red-500">*</span></label>
                <textarea 
                  id="description" 
                  v-model="propertyForm.description" 
                  rows="6" 
                  class="form-input" 
                  placeholder="Provide a detailed description of your property" 
                  required
                ></textarea>
                <p v-if="errors.description" class="form-error">{{ errors.description }}</p>
              </div>
              
              <!-- Amenities -->
              <div class="mt-6">
                <label class="form-label mb-3">Amenities</label>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div v-for="(amenity, index) in amenities" :key="index" class="flex items-center">
                    <input 
                      type="checkbox" 
                      :id="'amenity-' + index" 
                      v-model="propertyForm.amenities" 
                      :value="amenity" 
                      class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-4 w-4"
                    >
                    <label :for="'amenity-' + index" class="ml-2 text-gray-700 dark:text-gray-300">{{ amenity }}</label>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Location Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Location
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Address -->
                <div class="md:col-span-2">
                  <label for="address" class="form-label">Address <span class="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="address" 
                    v-model="propertyForm.address" 
                    class="form-input" 
                    placeholder="Full street address" 
                    required
                  >
                  <p v-if="errors.address" class="form-error">{{ errors.address }}</p>
                </div>
                
                <!-- City -->
                <div>
                  <label for="city" class="form-label">City <span class="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="city" 
                    v-model="propertyForm.city" 
                    class="form-input" 
                    placeholder="City" 
                    required
                  >
                  <p v-if="errors.city" class="form-error">{{ errors.city }}</p>
                </div>
                
                <!-- State/Province -->
                <div>
                  <label for="state" class="form-label">State/Province <span class="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="state" 
                    v-model="propertyForm.state" 
                    class="form-input" 
                    placeholder="State or province" 
                    required
                  >
                  <p v-if="errors.state" class="form-error">{{ errors.state }}</p>
                </div>
                
                <!-- Zip/Postal Code -->
                <div>
                  <label for="zipCode" class="form-label">Zip/Postal Code <span class="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="zipCode" 
                    v-model="propertyForm.zipCode" 
                    class="form-input" 
                    placeholder="Zip or postal code" 
                    required
                  >
                  <p v-if="errors.zipCode" class="form-error">{{ errors.zipCode }}</p>
                </div>
                
                <!-- Country -->
                <div>
                  <label for="country" class="form-label">Country <span class="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    id="country" 
                    v-model="propertyForm.country" 
                    class="form-input" 
                    placeholder="Country" 
                    required
                  >
                  <p v-if="errors.country" class="form-error">{{ errors.country }}</p>
                </div>
              </div>
            </div>
            
            <!-- Media Section -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Media
              </h3>
              
              <!-- Images Upload -->
              <div>
                <label class="form-label mb-2">Property Images <span class="text-red-500">*</span></label>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Add high-quality images of your property. The first image will be used as the main image.
                </p>
                
                <div class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
                  <input 
                    type="file" 
                    id="images" 
                    multiple 
                    accept="image/*" 
                    class="hidden" 
                    @change="handleImageUpload"
                  >
                  
                  <label 
                    for="images" 
                    class="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-gray-700 dark:text-gray-300 font-medium mb-1">
                      Drag & drop or click to upload
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      PNG, JPG, WEBP or GIF (max 5MB each)
                    </p>
                  </label>
                </div>
                
                <!-- Preview Images -->
                <div v-if="selectedImages.length > 0" class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  <div 
                    v-for="(image, index) in selectedImages" 
                    :key="index" 
                    class="relative rounded-lg overflow-hidden h-24"
                  >
                    <img 
                      :src="image.preview" 
                      :alt="`Property Image ${index + 1}`" 
                      class="w-full h-full object-cover"
                    >
                    <button 
                      type="button" 
                      @click="removeImage(index)" 
                      class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p v-if="errors.images" class="form-error mt-2">{{ errors.images }}</p>
              </div>
            </div>
            
            <!-- Submit Button -->
            <div class="mt-8 flex justify-end">
              <button 
                type="button" 
                @click="$router.back()" 
                class="btn-outline mr-4"
                :disabled="isSubmitting"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="btn-primary px-6 py-3"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
                <span v-else>List Property</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { usePropertyStore } from '@/store/property';
  
  const router = useRouter();
  const propertyStore = usePropertyStore();
  
  // Form state
  const propertyForm = reactive({
    title: '',
    type: '',
    status: '',
    price: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    yearBuilt: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    amenities: []
  });
  
  // UI state
  const isSubmitting = ref(false);
  const errors = reactive({});
  const selectedImages = ref([]);
  
  // Available amenities
  const amenities = [
    'Air Conditioning',
    'Balcony',
    'Dishwasher',
    'Elevator',
    'Fireplace',
    'Garden',
    'Gym',
    'Hardwood Floors',
    'Parking',
    'Pet Friendly',
    'Pool',
    'Security System',
    'Washer/Dryer',
    'Wi-Fi'
  ];
  
  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    // Validate files
    for (const file of files) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        errors.images = 'One or more images exceed the 5MB size limit';
        return;
      }
      
      // Check file type
      if (!file.type.match('image.*')) {
        errors.images = 'Only image files are allowed (PNG, JPG, WEBP, GIF)';
        return;
      }
    }
    
    // Clear previous errors
    errors.images = '';
    
    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        selectedImages.value.push({
          file,
          preview: e.target.result
        });
      };
      
      reader.readAsDataURL(file);
    });
  };
  
  // Remove image
  const removeImage = (index) => {
    selectedImages.value.splice(index, 1);
  };
  
  // Validate form
  const validateForm = () => {
    // Reset errors
    Object.keys(errors).forEach(key => {
      errors[key] = '';
    });
    
    let isValid = true;
    
    // Required fields
    const requiredFields = ['title', 'type', 'status', 'price', 'area', 'description', 'address', 'city', 'state', 'zipCode', 'country'];
    
    requiredFields.forEach(field => {
      if (!propertyForm[field]) {
        errors[field] = 'This field is required';
        isValid = false;
      }
    });
    
    // Validate images
    if (selectedImages.value.length === 0) {
      errors.images = 'At least one image is required';
      isValid = false;
    }
    
    // Validate price
    if (propertyForm.price && propertyForm.price <= 0) {
      errors.price = 'Price must be greater than zero';
      isValid = false;
    }
    
    // Validate area
    if (propertyForm.area && propertyForm.area <= 0) {
      errors.area = 'Area must be greater than zero';
      isValid = false;
    }
    
    // Validate numeric fields
    if (propertyForm.bedrooms && propertyForm.bedrooms < 0) {
      errors.bedrooms = 'Bedrooms cannot be negative';
      isValid = false;
    }
    
    if (propertyForm.bathrooms && propertyForm.bathrooms < 0) {
      errors.bathrooms = 'Bathrooms cannot be negative';
      isValid = false;
    }
    
    if (propertyForm.yearBuilt && (propertyForm.yearBuilt < 1800 || propertyForm.yearBuilt > new Date().getFullYear())) {
      errors.yearBuilt = 'Please enter a valid year';
      isValid = false;
    }
    
    return isValid;
  };
  
  // Submit form
  const submitForm = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors).find(key => errors[key]);
      if (firstError) {
        const element = document.getElementById(firstError);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }
    
    isSubmitting.value = true;
    
    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      
      // Add form fields to FormData
      Object.keys(propertyForm).forEach(key => {
        if (key === 'amenities') {
          formData.append(key, JSON.stringify(propertyForm[key]));
        } else if (propertyForm[key] !== '') {
          formData.append(key, propertyForm[key]);
        }
      });
      
      // Add images to FormData
      selectedImages.value.forEach((image, index) => {
        formData.append(`images`, image.file);
      });
      
      // Submit to API
      // In a real app, you'd use formData with API
      // For now, we'll simulate the API call with the property store
      const propertyData = {
        ...propertyForm,
        image: selectedImages.value.length > 0 ? selectedImages.value[0].preview : '',
        // Other fields the API might need
        id: Math.floor(Math.random() * 10000), // Temporary ID for demo
        createdAt: new Date().toISOString(),
        userId: 1 // Assuming the current user's ID
      };
      
      await propertyStore.createProperty(propertyData);
      
      // Show success message and redirect
      alert('Property listed successfully!');
      router.push('/properties');
    } catch (error) {
      console.error('Error submitting property:', error);
      
      // Handle validation errors from API
      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach(key => {
          errors[key] = error.response.data.errors[key];
        });
      } else {
        alert('Failed to list property. Please try again.');
      }
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>