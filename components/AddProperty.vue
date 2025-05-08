<template>
  <div class="container mt-5 mb-md-4 py-5 bg-white">
    <!-- Navegación de migas de pan simplificada -->
    <nav class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">Inicio</a></li>
        <li class="breadcrumb-item active">Añadir Propiedad</li>
      </ol>
    </nav>
    
    <div class="row">
      <!-- Page content -->
      <div class="col-lg-8">
        <h1 class="h2 mb-0">Añadir Propiedad</h1>
        
        <!-- Mobile progress bar -->
        <div class="d-lg-none pt-3 mb-2">{{ progress }}% contenido completado</div>
        <div class="progress d-lg-none mb-4" style="height: 0.25rem">
          <div class="progress-bar bg-orange" role="progressbar" :style="`width: ${progress}%`" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        
        <!-- Alert messages -->
        <div v-if="errorMessage" class="alert alert-danger mb-4" role="alert">
          <div class="d-flex">
            <i class="fi-alert-circle me-2 me-sm-3"></i>
            <p class="fs-sm mb-1">{{ errorMessage }}</p>
          </div>
        </div>
        
        <div v-if="successMessage" class="alert alert-success mb-4" role="alert">
          <div class="d-flex">
            <i class="fi-check-circle me-2 me-sm-3"></i>
            <p class="fs-sm mb-1">{{ successMessage }}</p>
          </div>
        </div>
        
        <form @submit.prevent="handleSubmit">
          <!-- Basic info -->
          <section class="card card-body border-0 shadow-sm p-4 mb-4" id="basic-info">
            <h2 class="h4 mb-4">
              <i class="fi-info-circle text-orange fs-5 mt-n1 me-2"></i>Información Básica
            </h2>
            <div class="mb-3">
              <label class="form-label" for="ap-title">Título <span class="text-danger">*</span></label>
              <input 
                class="form-control" 
                type="text" 
                id="ap-title" 
                placeholder="Título para tu propiedad" 
                v-model="formData.title" 
                required 
              />
              <span class="form-text">{{ 50 - (formData.title?.length || 0) }} caracteres restantes</span>
            </div>
            <div class="row">
              <div class="col-sm-6 mb-3">
                <label class="form-label" for="ap-category">Categoría <span class="text-danger">*</span></label>
                <select class="form-select" id="ap-category" v-model="formData.status" required>
                  <option value="" disabled>Elegir categoría</option>
                  <option value="for-rent">En Alquiler</option>
                  <option value="for-sale">En Venta</option>
                </select>
              </div>
              <div class="col-sm-6 mb-3">
                <label class="form-label" for="ap-type">Tipo de Propiedad <span class="text-danger">*</span></label>
                <select class="form-select" id="ap-type" v-model="formData.property_type" required>
                  <option value="" disabled>Elegir tipo de propiedad</option>
                  <option value="house">Casa</option>
                  <option value="apartment">Apartamento</option>
                  <option value="room">Habitación</option>
                  <option value="office">Oficina</option>
                  <option value="commercial">Comercial</option>
                  <option value="land">Terreno</option>
                  <option value="daily-rental">Alquiler Diario</option>
                  <option value="new-building">Edificio Nuevo</option>
                  <option value="parking-lot">Estacionamiento</option>
                </select>
              </div>
            </div>
            <div class="form-label fw-bold pt-3 pb-2">
              ¿Estás publicando como parte de una empresa?
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="ap-company" name="ap-business-type" value="business" v-model="businessType" />
              <label class="form-check-label" for="ap-company">Soy una empresa registrada</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="ap-individual" name="ap-business-type" value="private" v-model="businessType" checked />
              <label class="form-check-label" for="ap-individual">Soy un vendedor particular</label>
            </div>
          </section>
          
          <!-- Location -->
          <section class="card card-body border-0 shadow-sm p-4 mb-4" id="location">
            <h2 class="h4 mb-4"><i class="fi-map-pin text-orange fs-5 mt-n1 me-2"></i>Ubicación</h2>
            <div class="row">
              <div class="col-sm-6 mb-3">
                <label class="form-label" for="ap-country">País / Región <span class="text-danger">*</span></label>
                <input 
                  class="form-control" 
                  type="text" 
                  id="ap-country" 
                  placeholder="País o región" 
                  v-model="formData.state" 
                  required
                />
              </div>
              <div class="col-sm-6 mb-3">
                <label class="form-label" for="ap-city">Ciudad <span class="text-danger">*</span></label>
                <input 
                  class="form-control" 
                  type="text" 
                  id="ap-city" 
                  placeholder="Ciudad" 
                  v-model="formData.city" 
                  required
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-8 mb-3">
                <label class="form-label" for="ap-district">Distrito / Colonia</label>
                <input 
                  class="form-control" 
                  type="text" 
                  id="ap-district" 
                  placeholder="Distrito o colonia" 
                  v-model="formData.district"
                />
              </div>
              <div class="col-sm-4 mb-3">
                <label class="form-label" for="ap-zip">Código Postal <span class="text-danger">*</span></label>
                <input 
                  class="form-control" 
                  type="text" 
                  id="ap-zip" 
                  placeholder="Código postal" 
                  v-model="formData.zip_code" 
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label" for="ap-address">Dirección <span class="text-danger">*</span></label>
              <input 
                class="form-control" 
                type="text" 
                id="ap-address" 
                placeholder="Dirección completa" 
                v-model="formData.address" 
                required
              />
            </div>
            <div class="form-label fw-bold pt-3 pb-2">Mostrar en el mapa</div>
            <div class="interactive-map rounded-3" style="height: 250px;">
              <!-- Componente de mapa (placeholder) -->
              <div class="bg-light h-100 d-flex align-items-center justify-content-center">
                Mapa (Componente a implementar)
              </div>
            </div>
          </section>
          
          <!-- Property details -->
          <section class="card card-body border-0 shadow-sm p-4 mb-4" id="details">
            <h2 class="h4 mb-4">
              <i class="fi-edit text-orange fs-5 mt-n1 me-2"></i>Detalles de la Propiedad
            </h2>
            <div class="mb-4" style="max-width: 25rem">
              <label class="form-label" for="ap-area">Área Total (m²)</label>
              <input 
                class="form-control" 
                type="number" 
                id="ap-area" 
                min="20" 
                placeholder="Ingresa el área" 
                v-model="formData.square_feet"
              />
            </div>
            <div class="mb-4">
              <label class="form-label d-block fw-bold mb-2 pb-1">Habitaciones</label>
              <div class="btn-group btn-group-sm" role="group" aria-label="Elegir número de habitaciones">
                <input class="btn-check" type="radio" id="studio" name="bedrooms" :value="0" v-model="formData.bedrooms" />
                <label class="btn btn-outline-secondary fw-normal" for="studio">Estudio</label>
                <input class="btn-check" type="radio" id="bedrooms-1" name="bedrooms" :value="1" v-model="formData.bedrooms" />
                <label class="btn btn-outline-secondary fw-normal" for="bedrooms-1">1</label>
                <input class="btn-check" type="radio" id="bedrooms-2" name="bedrooms" :value="2" v-model="formData.bedrooms" />
                <label class="btn btn-outline-secondary fw-normal" for="bedrooms-2">2</label>
                <input class="btn-check" type="radio" id="bedrooms-3" name="bedrooms" :value="3" v-model="formData.bedrooms" />
                <label class="btn btn-outline-secondary fw-normal" for="bedrooms-3">3</label>
                <input class="btn-check" type="radio" id="bedrooms-4" name="bedrooms" :value="4" v-model="formData.bedrooms" />
                <label class="btn btn-outline-secondary fw-normal" for="bedrooms-4">4</label>
                <input class="btn-check" type="radio" id="bedrooms-5" name="bedrooms" :value="5" v-model="formData.bedrooms" />
                <label class="btn btn-outline-secondary fw-normal" for="bedrooms-5">5+</label>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label d-block fw-bold mb-2 pb-1">Baños</label>
              <div class="btn-group btn-group-sm" role="group" aria-label="Elegir número de baños">
                <input class="btn-check" type="radio" id="bathrooms-1" name="bathrooms" :value="1" v-model="formData.bathrooms" />
                <label class="btn btn-outline-secondary fw-normal" for="bathrooms-1">1</label>
                <input class="btn-check" type="radio" id="bathrooms-2" name="bathrooms" :value="2" v-model="formData.bathrooms" />
                <label class="btn btn-outline-secondary fw-normal" for="bathrooms-2">2</label>
                <input class="btn-check" type="radio" id="bathrooms-3" name="bathrooms" :value="3" v-model="formData.bathrooms" />
                <label class="btn btn-outline-secondary fw-normal" for="bathrooms-3">3</label>
                <input class="btn-check" type="radio" id="bathrooms-4" name="bathrooms" :value="4" v-model="formData.bathrooms" />
                <label class="btn btn-outline-secondary fw-normal" for="bathrooms-4">4</label>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label d-block fw-bold mb-2 pb-1">Estacionamientos</label>
              <div class="btn-group btn-group-sm" role="group" aria-label="Elegir número de estacionamientos">
                <input class="btn-check" type="radio" id="parking-0" name="parking" :value="0" v-model="formData.parkingSpaces" />
                <label class="btn btn-outline-secondary fw-normal" for="parking-0">0</label>
                <input class="btn-check" type="radio" id="parking-1" name="parking" :value="1" v-model="formData.parkingSpaces" />
                <label class="btn btn-outline-secondary fw-normal" for="parking-1">1</label>
                <input class="btn-check" type="radio" id="parking-2" name="parking" :value="2" v-model="formData.parkingSpaces" />
                <label class="btn btn-outline-secondary fw-normal" for="parking-2">2</label>
                <input class="btn-check" type="radio" id="parking-3" name="parking" :value="3" v-model="formData.parkingSpaces" />
                <label class="btn btn-outline-secondary fw-normal" for="parking-3">3</label>
                <input class="btn-check" type="radio" id="parking-4" name="parking" :value="4" v-model="formData.parkingSpaces" />
                <label class="btn btn-outline-secondary fw-normal" for="parking-4">4</label>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label d-block fw-bold mb-2 pb-1">Comodidades</label>
              <div class="row">
                <div class="col-sm-4" v-for="amenity in amenities.slice(0, 4)" :key="amenity.id">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="amenity.id" :value="amenity.id" v-model="formData.amenities" />
                    <label class="form-check-label" :for="amenity.id">{{ amenity.label }}</label>
                  </div>
                </div>
                <div class="col-sm-4" v-for="amenity in amenities.slice(4, 8)" :key="amenity.id">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="amenity.id" :value="amenity.id" v-model="formData.amenities" />
                    <label class="form-check-label" :for="amenity.id">{{ amenity.label }}</label>
                  </div>
                </div>
                <div class="col-sm-4" v-for="amenity in amenities.slice(8)" :key="amenity.id">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="amenity.id" :value="amenity.id" v-model="formData.amenities" />
                    <label class="form-check-label" :for="amenity.id">{{ amenity.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="form-label d-block fw-bold mb-2 pb-1">Mascotas</label>
              <div class="row">
                <div class="col-sm-4" v-for="pet in pets" :key="pet.id">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" :id="pet.id" :value="pet.id" v-model="formData.pets_allowed" />
                    <label class="form-check-label" :for="pet.id">{{ pet.label }}</label>
                  </div>
                </div>
              </div>
            </div>
            <label class="form-label" for="ap-description">Descripción</label>
            <textarea 
              class="form-control" 
              id="ap-description" 
              rows="5" 
              placeholder="Describe tu propiedad"
              v-model="formData.description"
            ></textarea>
            <span class="form-text">{{ 1500 - (formData.description?.length || 0) }} caracteres restantes</span>
            
            <div class="mt-4 row">
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="isNew" v-model="formData.isNew" />
                  <label class="form-check-label" for="isNew">Marcar como Nuevo</label>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="isVerified" v-model="formData.isVerified" />
                  <label class="form-check-label" for="isVerified">Marcar como Verificado</label>
                </div>
              </div>
            </div>
          </section>
          
          <!-- Price -->
          <section class="card card-body border-0 shadow-sm p-4 mb-4" id="price">
            <h2 class="h4 mb-4"><i class="fi-cash text-orange fs-5 mt-n1 me-2"></i>Precio</h2>
            <label class="form-label" for="ap-price">Precio <span class="text-danger">*</span></label>
            <div class="d-sm-flex">
              <select class="form-select w-25 me-2 mb-2" v-model="currencyType">
                <option value="lmp">L</option>
                <option value="usd">&#36;</option>
                <option value="eur">&#8364;</option>
              </select>
              <input 
                class="form-control w-100 me-2 mb-2" 
                type="number" 
                id="ap-price" 
                min="200" 
                step="50" 
                v-model="formData.price"
                required 
              />
              <select class="form-select w-50 mb-2" v-model="priceType">
                <option value="total">precio total</option>
                <option value="per-month">por mes</option>
                <option value="per-night">por noche</option>
              </select>
            </div>
          </section>
          
          <!-- Photos / video -->
          <section class="card card-body border-0 shadow-sm p-4 mb-4" id="photos">
            <h2 class="h4 mb-4">
              <i class="fi-image text-orange fs-5 mt-n1 me-2"></i>Fotos
            </h2>
            <div class="alert alert-info mb-4" role="alert">
              <div class="d-flex">
                <i class="fi-alert-circle me-2 me-sm-3"></i>
                <p class="fs-sm mb-1">
                  El tamaño máximo de foto es 8 MB. Formatos: jpeg, jpg, png. Coloca la imagen principal primero.
                </p>
              </div>
            </div>
            <!-- Placeholder para la carga de archivos -->
            <div class="file-drop-area mb-3">
              <div class="file-drop-icon">
                <i class="fi-cloud-upload"></i>
              </div>
              <input type="file" class="form-control" multiple accept="image/jpeg,image/png" @change="handleFileChange" />
              <span class="file-drop-message">Arrastra tus imágenes aquí o haz clic para seleccionar</span>
            </div>
            
            <!-- Previsualización de imágenes -->
            <div v-if="selectedFiles.length > 0" class="row g-2 pt-2">
              <div v-for="(file, i) in selectedFiles" :key="i" class="col-md-4 col-6">
                <div class="position-relative">
                  <img :src="previewUrls[i]" alt="Preview" class="img-thumbnail" />
                  <button 
                    type="button" 
                    class="btn-close position-absolute top-0 end-0 m-2" 
                    @click="removeFile(i)"
                    style="background-color: white"
                  ></button>
                </div>
              </div>
            </div>
          </section>
          
          <!-- Contacts -->
          <section class="card card-body border-0 shadow-sm p-4 mb-4" id="contacts">
            <h2 class="h4 mb-4"><i class="fi-phone text-orange fs-5 mt-n1 me-2"></i>Contactos</h2>
            <div class="row">
              <div class="col-sm-6 mb-3">
                <label class="form-label" for="ap-fn">Nombre <span class="text-danger">*</span></label>
                <input 
                  class="form-control" 
                  type="text" 
                  id="ap-fn" 
                  placeholder="Ingresa tu nombre" 
                  v-model="contactInfo.firstName"
                  required 
                />
              </div>
              <div class="col-sm-6 mb-3">
                <label class="form-label" for="ap-sn">Apellido <span class="text-danger">*</span></label>
                <input 
                  class="form-control" 
                  type="text" 
                  id="ap-sn" 
                  placeholder="Ingresa tu apellido" 
                  v-model="contactInfo.lastName"
                  required 
                />
              </div>
            </div>
            <div class="row">
              <div class="col-sm-6 mb-3">
                <label class="form-label" for="ap-email">Correo Electrónico <span class="text-danger">*</span></label>
                <input 
                  class="form-control" 
                  type="email" 
                  id="ap-email" 
                  placeholder="Ingresa tu correo electrónico" 
                  v-model="contactInfo.email"
                  required
                />
              </div>
              <div class="col-sm-6 mb-3">
                <label class="form-label" for="ap-phone">Número de Teléfono <span class="text-danger">*</span></label>
                <input 
                  class="form-control" 
                  type="tel" 
                  id="ap-phone" 
                  placeholder="000-000-0000" 
                  v-model="contactInfo.phone"
                  required
                />
              </div>
            </div>
            <label class="form-label" for="ap-company-name">Empresa</label>
            <input 
              class="form-control" 
              type="text" 
              id="ap-company-name" 
              placeholder="Ingresa el nombre de la empresa"
              v-model="contactInfo.company" 
            />
          </section>
          
          <!-- Action buttons -->
          <section class="d-sm-flex justify-content-between pt-2">
            <button type="button" class="btn btn-outline-primary btn-lg d-block mb-3 mb-sm-2" data-bs-target="#preview-modal" data-bs-toggle="modal">
              <i class="fi-eye-on ms-n1 me-2"></i>Vista Previa
            </button>
            <button type="submit" class="btn btn-primary btn-lg d-block mb-2" :disabled="isSubmitting">
              {{ isSubmitting ? 'Guardando...' : 'Guardar y Continuar' }}
            </button>
          </section>
        </form>
      </div>
      
      <!-- Progress of completion -->
      <aside class="col-lg-3 offset-lg-1 d-none d-lg-block">
        <div class="sticky-top pt-5">
          <h6 class="pt-5 mt-3 mb-2">{{ progress }}% contenido completado</h6>
          <div class="progress mb-4" style="height: 0.25rem">
            <div class="progress-bar bg-orange" role="progressbar" :style="`width: ${progress}%`" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <ul class="list-unstyled">
            <li class="d-flex align-items-center">
              <i :class="['fi-check me-2', {'text-orange': formData.title, 'text-muted': !formData.title}]"></i>
              <a class="nav-link fw-normal ps-1 p-0" href="#basic-info">Información Básica</a>
            </li>
            <li class="d-flex align-items-center">
              <i :class="['fi-check me-2', {'text-orange': formData.address && formData.city, 'text-muted': !formData.address || !formData.city}]"></i>
              <a class="nav-link fw-normal ps-1 p-0" href="#location">Ubicación</a>
            </li>
            <li class="d-flex align-items-center">
              <i :class="['fi-check me-2', {'text-orange': formData.bedrooms >= 0, 'text-muted': formData.bedrooms === undefined}]"></i>
              <a class="nav-link fw-normal ps-1 p-0" href="#details">Detalles de la Propiedad</a>
            </li>
            <li class="d-flex align-items-center">
              <i :class="['fi-check me-2', {'text-orange': formData.price, 'text-muted': !formData.price}]"></i>
              <a class="nav-link fw-normal ps-1 p-0" href="#price">Precio</a>
            </li>
            <li class="d-flex align-items-center">
              <i :class="['fi-check me-2', {'text-orange': selectedFiles.length > 0, 'text-muted': selectedFiles.length === 0}]"></i>
              <a class="nav-link fw-normal ps-1 p-0" href="#photos">Fotos</a>
            </li>
            <li class="d-flex align-items-center">
              <i :class="['fi-check me-2', {'text-orange': contactInfo.firstName && contactInfo.email, 'text-muted': !contactInfo.firstName || !contactInfo.email}]"></i>
              <a class="nav-link fw-normal ps-1 p-0" href="#contacts">Contactos</a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import axios from 'axios';

// Variables para el formulario
const zoom = ref(13);
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const businessType = ref('private');
const currencyType = ref('lmp'); // Default to Lempiras
const priceType = ref('per-month');
const selectedFiles = ref<File[]>([]);
const previewUrls = ref<string[]>([]);

// Form data
const formData = ref({
  title: '',
  description: '',
  address: '',
  city: '',
  state: '',
  zip_code: '',
  price: '',
  bedrooms: 1,
  bathrooms: 1,
  square_feet: 0,
  property_type: 'apartment',
  status: 'for-rent',
  isNew: false,
  isFeatured: false,
  isVerified: false,
  parkingSpaces: 0,
  amenities: [] as string[],
  pets_allowed: [] as string[],
  district: '',
  lat: null as number | null,
  lng: null as number | null
});

// Contact information
const contactInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: ''
});

// Available amenities
const amenities = [
  { id: 'wifi', label: 'WiFi' },
  { id: 'air-condition', label: 'Aire acondicionado' },
  { id: 'heating', label: 'Calefacción' },
  { id: 'tv', label: 'TV' },
  { id: 'kitchen', label: 'Cocina' },
  { id: 'parking', label: 'Estacionamiento' },
  { id: 'pool', label: 'Piscina' },
  { id: 'dishwasher', label: 'Lavavajillas' },
  { id: 'laundry', label: 'Lavandería' },
  { id: 'security-cameras', label: 'Cámaras de seguridad' },
  { id: 'balcony', label: 'Balcón' },
  { id: 'gym', label: 'Gimnasio' }
];

// Pet options
const pets = [
  { id: 'cats-allowed', label: 'Se permiten gatos' },
  { id: 'dogs-allowed', label: 'Se permiten perros' }
];

// Manejo de archivos de imagen
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files) return;
  
  const files = Array.from(input.files);
  
  // Almacenar los archivos seleccionados
  selectedFiles.value = [...selectedFiles.value, ...files];
  
  // Crear URLs de vista previa
  const newUrls = files.map(file => URL.createObjectURL(file));
  previewUrls.value = [...previewUrls.value, ...newUrls];
};

// Eliminar un archivo
const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
  
  // Liberar URL de vista previa
  URL.revokeObjectURL(previewUrls.value[index]);
  previewUrls.value.splice(index, 1);
};

// Calculate form completion progress
const progress = computed(() => {
  const totalFields = 12; // Adjust based on required fields
  let filledFields = 0;
  if (formData.value.title) filledFields++;
  if (formData.value.description) filledFields++;
  if (formData.value.address) filledFields++;
  if (formData.value.city) filledFields++;
  if (formData.value.zip_code) filledFields++;
  if (formData.value.price) filledFields++;
  if (formData.value.bedrooms !== undefined) filledFields++;
  if (formData.value.bathrooms !== undefined) filledFields++;
  if (formData.value.square_feet) filledFields++;
  if (formData.value.property_type) filledFields++;
  if (formData.value.status) filledFields++;
  if (selectedFiles.value.length > 0) filledFields++;
  
  return Math.round((filledFields / totalFields) * 100);
});

// Submit form
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = '';
    
    // Create form data for submission with files
    const propertyFormData = new FormData();
    
    // Add all form fields to FormData
    Object.keys(formData.value).forEach(key => {
      if (key === 'amenities' || key === 'pets_allowed') {
        // For arrays, we need to handle them specially
        formData.value[key].forEach((item, i) => {
          propertyFormData.append(`${key}[${i}]`, item);
        });
      } else {
        propertyFormData.append(key, formData.value[key]);
      }
    });
    
    // Add contact info
    propertyFormData.append('contact', JSON.stringify(contactInfo.value));
    
    // Add main image if available
    if (selectedFiles.value.length > 0) {
      propertyFormData.append('image', selectedFiles.value[0]);
      
      // Add additional images
      for (let i = 1; i < selectedFiles.value.length; i++) {
        propertyFormData.append('additional_images', selectedFiles.value[i]);
      }
    }
    
    // En la función handleSubmit
const response = await axios.post('/api/properties', propertyFormData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  baseURL: 'http://localhost:3000', // Ajusta esta URL a la de tu servidor backend
});
    
    if (response.data.success) {
      successMessage.value = '¡Propiedad creada exitosamente!';
      
      // Redirect after success (usando window.location en lugar de router)
      setTimeout(() => {
        window.location.href = '/properties';
      }, 2000);
    } else {
      errorMessage.value = response.data.message || 'Error al crear la propiedad';
    }
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Error al crear la propiedad';
    console.error('Error creando propiedad:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style>
/* Reemplazar naranja por azul en todos los elementos */
.bg-warning {
  background-color: #fd5631 !important; /* Azul */
}

.text-primary {
  color: #fd5631 !important; /* Azul */
}

.btn-primary {
  background-color: #fd5631 !important;
  border-color: #fd5631 !important;
}

.btn-outline-primary {
  color: #fd5631 !important;
  border-color: #fd5631 !important;
}

.btn-outline-primary:hover {
  background-color: #fd5631 !important;
  color: white !important;
}

.text-orange {
  color: #fd5631 !important;
}

.bg-orange {
  background-color: #fd5631 !important;
}

/* Estilo para la zona de subida de archivos */
.file-drop-area {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  background-color: #f9fafb;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s ease-in-out;
}

.file-drop-area:hover {
  border-color: #fd5631;
}

.file-drop-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #6b7280;
}

.file-drop-area input[type="file"] {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

.file-drop-message {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>