<style scoped>
.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.375rem;
}

.form-control,
.form-select {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.form-control:focus,
.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.text-primary {
  color: #0d6efd !important;
}

.text-danger {
  color: #dc3545 !important;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-outline-secondary {
  color: #6c757d;
  border-color: #6c757d;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #dc3545;
}

.form-check-input {
  width: 1rem;
  height: 1rem;
  margin-top: 0.25rem;
}

.cursor-pointer {
  cursor: pointer;
}

.object-fit-cover {
  object-fit: cover;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.dropzone-card {
  border: 2px dashed rgba(0, 0, 0, 0.125);
  transition: all 0.2s ease;
}

.dropzone-card:hover {
  border-color: #0d6efd;
  background-color: rgba(13, 110, 253, 0.05);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}

.btn-xs {
  padding: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
}
</style><template>
  <div class="container-fluid pt-5 pb-lg-4 mt-5">
    <!-- Page Header -->
    <div class="mb-4 pt-2">
      <nav class="mb-3" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="/">Home</a></li>
          <li class="breadcrumb-item"><a href="/properties">Properties</a></li>
          <li class="breadcrumb-item active" aria-current="page">List Your Property</li>
        </ol>
      </nav>
      <h1 class="h2 mb-0">List Your Property</h1>
    </div>

    <!-- Form Card -->
    <div class="card border-0 shadow-sm p-md-5 p-4">
      <!-- Form Title -->
      <div class="text-center mb-4">
        <h2 class="h3 mb-0">Property Information</h2>
        <p class="text-muted fs-sm mb-4">Fill in the details below to list your property on our platform</p>
      </div>

      <!-- Property Form -->
      <form @submit.prevent="submitForm" class="mx-auto" style="max-width: 800px;">
        <!-- Basic Information Section -->
        <div class="mb-4 pb-3">
          <h3 class="h5 text-primary mb-3 pb-2 border-bottom">Basic Information</h3>
          
          <div class="row gy-3">
            <!-- Property Title -->
            <div class="col-12">
              <label for="title" class="form-label">Property Title <span class="text-danger">*</span></label>
              <input 
                type="text" 
                id="title" 
                v-model="propertyForm.title" 
                class="form-control" 
                :class="{ 'is-invalid': errors.title }"
                placeholder="Enter a descriptive title" 
                required
              >
              <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
            </div>
            
            <!-- Property Type -->
            <div class="col-md-6 col-12">
              <label for="type" class="form-label">Property Type <span class="text-danger">*</span></label>
              <select 
                id="type" 
                v-model="propertyForm.type" 
                class="form-select" 
                :class="{ 'is-invalid': errors.type }"
                required
              >
                <option value="" disabled>Select property type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
              <div v-if="errors.type" class="invalid-feedback">{{ errors.type }}</div>
            </div>
            
            <!-- Status (For Sale/Rent) -->
            <div class="col-md-6 col-12">
              <label for="status" class="form-label">Listing Type <span class="text-danger">*</span></label>
              <select 
                id="status" 
                v-model="propertyForm.status" 
                class="form-select" 
                :class="{ 'is-invalid': errors.status }"
                required
              >
                <option value="" disabled>Select listing type</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
              <div v-if="errors.status" class="invalid-feedback">{{ errors.status }}</div>
            </div>
            
            <!-- Price -->
            <div class="col-md-6 col-12">
              <label for="price" class="form-label">
                {{ propertyForm.status === 'for-rent' ? 'Monthly Rent' : 'Price' }} <span class="text-danger">*</span>
              </label>
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input 
                  type="number" 
                  id="price" 
                  v-model="propertyForm.price" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.price }"
                  :placeholder="propertyForm.status === 'for-rent' ? 'Monthly rent amount' : 'Property price'" 
                  min="0" 
                  required
                >
                <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
              </div>
            </div>
            
            <!-- Area -->
            <div class="col-md-6 col-12">
              <label for="area" class="form-label">Area (sq ft) <span class="text-danger">*</span></label>
              <input 
                type="number" 
                id="area" 
                v-model="propertyForm.area" 
                class="form-control" 
                :class="{ 'is-invalid': errors.area }"
                placeholder="Property size in square feet" 
                min="0" 
                required
              >
              <div v-if="errors.area" class="invalid-feedback">{{ errors.area }}</div>
            </div>
          </div>
        </div>
        
        <!-- Property Details Section -->
        <div class="mb-4 pb-3">
          <h3 class="h5 text-primary mb-3 pb-2 border-bottom">Property Details</h3>
          
          <div class="row gy-3">
            <!-- Bedrooms -->
            <div class="col-md-4 col-12">
              <label for="bedrooms" class="form-label">Bedrooms</label>
              <input 
                type="number" 
                id="bedrooms" 
                v-model="propertyForm.bedrooms" 
                class="form-control" 
                :class="{ 'is-invalid': errors.bedrooms }"
                placeholder="Number of bedrooms" 
                min="0"
              >
              <div v-if="errors.bedrooms" class="invalid-feedback">{{ errors.bedrooms }}</div>
            </div>
            
            <!-- Bathrooms -->
            <div class="col-md-4 col-12">
              <label for="bathrooms" class="form-label">Bathrooms</label>
              <input 
                type="number" 
                id="bathrooms" 
                v-model="propertyForm.bathrooms" 
                class="form-control" 
                :class="{ 'is-invalid': errors.bathrooms }"
                placeholder="Number of bathrooms" 
                min="0"
                step="0.5"
              >
              <div v-if="errors.bathrooms" class="invalid-feedback">{{ errors.bathrooms }}</div>
            </div>
            
            <!-- Year Built -->
            <div class="col-md-4 col-12">
              <label for="yearBuilt" class="form-label">Year Built</label>
              <input 
                type="number" 
                id="yearBuilt" 
                v-model="propertyForm.yearBuilt" 
                class="form-control" 
                :class="{ 'is-invalid': errors.yearBuilt }"
                placeholder="Construction year"
                :max="new Date().getFullYear()"
                min="1800"
              >
              <div v-if="errors.yearBuilt" class="invalid-feedback">{{ errors.yearBuilt }}</div>
            </div>
            
            <!-- Description -->
            <div class="col-12">
              <label for="description" class="form-label">Description <span class="text-danger">*</span></label>
              <textarea 
                id="description" 
                v-model="propertyForm.description" 
                rows="6" 
                class="form-control" 
                :class="{ 'is-invalid': errors.description }"
                placeholder="Provide a detailed description of your property" 
                required
              ></textarea>
              <div v-if="errors.description" class="invalid-feedback">{{ errors.description }}</div>
            </div>
            
            <!-- Amenities -->
            <div class="col-12">
              <label class="form-label mb-3">Amenities</label>
              <div class="row g-3">
                <div v-for="(amenity, index) in amenities" :key="index" class="col-md-3 col-sm-4 col-6">
                  <div class="form-check">
                    <input 
                      type="checkbox" 
                      :id="'amenity-' + index" 
                      v-model="propertyForm.amenities" 
                      :value="amenity" 
                      class="form-check-input"
                    >
                    <label :for="'amenity-' + index" class="form-check-label">{{ amenity }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Location Section -->
        <div class="mb-4 pb-3">
          <h3 class="h5 text-primary mb-3 pb-2 border-bottom">Location</h3>
          
          <div class="row gy-3">
            <!-- Address -->
            <div class="col-12">
              <label for="address" class="form-label">Address <span class="text-danger">*</span></label>
              <input 
                type="text" 
                id="address" 
                v-model="propertyForm.address" 
                class="form-control" 
                :class="{ 'is-invalid': errors.address }"
                placeholder="Full street address" 
                required
              >
              <div v-if="errors.address" class="invalid-feedback">{{ errors.address }}</div>
            </div>
            
            <!-- City -->
            <div class="col-md-6 col-12">
              <label for="city" class="form-label">City <span class="text-danger">*</span></label>
              <input 
                type="text" 
                id="city" 
                v-model="propertyForm.city" 
                class="form-control" 
                :class="{ 'is-invalid': errors.city }"
                placeholder="City" 
                required
              >
              <div v-if="errors.city" class="invalid-feedback">{{ errors.city }}</div>
            </div>
            
            <!-- State/Province -->
            <div class="col-md-6 col-12">
              <label for="state" class="form-label">State/Province <span class="text-danger">*</span></label>
              <input 
                type="text" 
                id="state" 
                v-model="propertyForm.state" 
                class="form-control" 
                :class="{ 'is-invalid': errors.state }"
                placeholder="State or province" 
                required
              >
              <div v-if="errors.state" class="invalid-feedback">{{ errors.state }}</div>
            </div>
            
            <!-- Zip/Postal Code -->
            <div class="col-md-6 col-12">
              <label for="zipCode" class="form-label">Zip/Postal Code <span class="text-danger">*</span></label>
              <input 
                type="text" 
                id="zipCode" 
                v-model="propertyForm.zipCode" 
                class="form-control" 
                :class="{ 'is-invalid': errors.zipCode }"
                placeholder="Zip or postal code" 
                required
              >
              <div v-if="errors.zipCode" class="invalid-feedback">{{ errors.zipCode }}</div>
            </div>
            
            <!-- Country -->
            <div class="col-md-6 col-12">
              <label for="country" class="form-label">Country <span class="text-danger">*</span></label>
              <input 
                type="text" 
                id="country" 
                v-model="propertyForm.country" 
                class="form-control" 
                :class="{ 'is-invalid': errors.country }"
                placeholder="Country" 
                required
              >
              <div v-if="errors.country" class="invalid-feedback">{{ errors.country }}</div>
            </div>
          </div>
        </div>
        
        <!-- Media Section -->
        <div class="mb-4 pb-3">
          <h3 class="h5 text-primary mb-3 pb-2 border-bottom">Media</h3>
          
          <!-- Images Upload -->
          <div>
            <label class="form-label mb-2">Property Images <span class="text-danger">*</span></label>
            <p class="text-muted fs-sm mb-3">
              Add high-quality images of your property. The first image will be used as the main image.
            </p>
            
            <div class="dropzone-card bg-secondary rounded-3 p-4 text-center mb-3">
              <input 
                type="file" 
                id="images" 
                multiple 
                accept="image/*" 
                class="d-none" 
                @change="handleImageUpload"
              >
              
              <label 
                for="images" 
                class="d-block cursor-pointer"
              >
                <div class="mb-3">
                  <i class="fi-image fs-1 text-muted"></i>
                </div>
                <p class="mb-1 fw-medium">
                  Drag & drop or click to upload
                </p>
                <p class="text-muted fs-sm mb-0">
                  PNG, JPG, WEBP or GIF (max 5MB each)
                </p>
              </label>
            </div>
            
            <!-- Preview Images -->
            <div v-if="selectedImages.length > 0" class="row g-3 mb-3">
              <div 
                v-for="(image, index) in selectedImages" 
                :key="index" 
                class="col-6 col-sm-4 col-md-3 col-lg-2"
              >
                <div class="position-relative rounded-3 overflow-hidden" style="height: 120px;">
                  <img 
                    :src="image.preview" 
                    :alt="`Property Image ${index + 1}`" 
                    class="w-100 h-100 object-fit-cover"
                  >
                  <button 
                    type="button" 
                    @click="removeImage(index)" 
                    class="btn btn-icon btn-danger btn-xs position-absolute top-0 end-0 mt-2 me-2 rounded-circle"
                  >
                    <i class="fi-x fs-xs"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div v-if="errors.images" class="alert alert-danger fs-sm mt-2 mb-0">{{ errors.images }}</div>
          </div>
        </div>
        
        <!-- Submit Buttons -->
        <div class="d-flex justify-content-between border-top pt-4">
          <button 
            type="button" 
            @click="router.back()" 
            class="btn btn-outline-secondary"
            :disabled="isSubmitting"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="btn btn-primary px-4 py-2"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="d-flex align-items-center">
              <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Submitting...
            </span>
            <span v-else>List Property</span>
          </button>
        </div>
      </form>
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
    // Prepare property data
    const propertyData = {
      title: propertyForm.title,
      property_type: propertyForm.type,
      status: propertyForm.status,
      price: Number(propertyForm.price),
      square_feet: Number(propertyForm.area),
      bedrooms: propertyForm.bedrooms ? Number(propertyForm.bedrooms) : 0,
      bathrooms: propertyForm.bathrooms ? Number(propertyForm.bathrooms) : 0,
      yearBuilt: propertyForm.yearBuilt ? Number(propertyForm.yearBuilt) : null,
      description: propertyForm.description,
      address: propertyForm.address,
      city: propertyForm.city,
      state: propertyForm.state,
      zip_code: propertyForm.zipCode,
      country: propertyForm.country,
      amenities: propertyForm.amenities,
      image: selectedImages.value.length > 0 ? selectedImages.value[0].preview : ''
    };
    
    // Submit to store
    await propertyStore.createProperty(propertyData);
    
    // Show success message
    alert('Property listed successfully!');
    
    // Redirect to properties page
    router.push('/properties');
  } catch (error) {
    console.error('Error submitting property:', error);
    
    // Handle error
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