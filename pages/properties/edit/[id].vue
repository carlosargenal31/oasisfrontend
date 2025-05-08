<template>
  <div class="bg-white">
    <!-- Breadcrumb navigation -->
    <div class="container pt-4 px-6">
      <div class="flex items-center text-sm">
        <router-link to="/" class="text-gray-500 hover:text-orange-800">Home</router-link>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-orange-800">Editar Propiedad</span>
      </div>
    </div>

    <div class="container px-6 pt-6 pb-10">
      <h1 class="text-3xl font-bold mb-8">Editar Propiedad</h1>
      
      <div class="grid grid-cols-12 gap-8">
        <!-- Main content area -->
        <div class="col-span-12 lg:col-span-8">
          <!-- Alerts -->
          <div v-if="errorMessage" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm">{{ errorMessage }}</p>
              </div>
            </div>
          </div>
          
          <div v-if="successMessage" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm">{{ successMessage }}</p>
              </div>
            </div>
          </div>

          <!-- Loading Indicator -->
          <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange"></div>
            <p class="ml-3 text-lg text-black">Cargando datos de la propiedad...</p>
          </div>

          <form v-else @submit.prevent="handleSubmit">
            <!-- Basic Info -->
            <section class="mb-8" id="basic-info">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold">Información Básica</h2>
              </div>
              
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="title">
                    Título <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="title" 
                    v-model="formData.title" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                    placeholder="Título para tu propiedad"
                    required
                  />
                  <p class="mt-1 text-sm text-gray-500">{{ 50 - (formData.title?.length || 0) }} caracteres restantes</p>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="category">
                      Categoría <span class="text-red-500">*</span>
                    </label>
                    <select 
                      id="category" 
                      v-model="formData.status" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                      required
                    >
                      <option value="" disabled>Elegir categoría</option>
                      <option value="for-rent">En Alquiler</option>
                      <option value="for-sale">En Venta</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="property-type">
                      Tipo de Propiedad <span class="text-red-500">*</span>
                    </label>
                    <select 
                      id="property-type" 
                      v-model="formData.property_type" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                      required
                    >
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
                
                <div class="mb-2">
                  <p class="block text-sm font-medium text-gray-700 mb-2">¿Estás publicando como parte de una empresa?</p>
                  <div class="space-y-2">
                    <label class="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="business-type" 
                        value="business" 
                        v-model="businessType"
                        class="h-4 w-4 text-orange-800 focus:ring-orange-800 border-gray-300"
                      />
                      <span class="ml-2 text-gray-700">Soy una empresa registrada</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="business-type" 
                        value="private" 
                        v-model="businessType"
                        class="h-4 w-4 text-orange-800 focus:ring-orange-800 border-gray-300"
                        checked
                      />
                      <span class="ml-2 text-gray-700">Soy un vendedor particular</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
            
            <!-- Location -->
            <section class="mb-8" id="location">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold">Ubicación</h2>
              </div>
              
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="country">
                      País / Región <span class="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="country" 
                      v-model="formData.state" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                      placeholder="País o región"
                      required
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="city">
                      Ciudad <span class="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="city" 
                      v-model="formData.city" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                      placeholder="Ciudad"
                      required
                    />
                  </div>
                </div>
                
                <div class="grid grid-cols-3 gap-4 mb-4">
                  <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="district">
                      Distrito / Colonia
                    </label>
                    <input 
                      type="text" 
                      id="district" 
                      v-model="formData.district" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                      placeholder="Distrito o colonia"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="zip">
                      Código Postal <span class="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="zip" 
                      v-model="formData.zip_code" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                      placeholder="Código postal"
                      required
                    />
                  </div>
                </div>
                
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="address">
                    Dirección <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="address" 
                    v-model="formData.address" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                    placeholder="Dirección completa"
                    required
                  />
                </div>
                
                <div>
                  <p class="block text-sm font-medium text-gray-700 mb-2">Mostrar en el mapa</p>
                  <div ref="mapContainer" class="rounded-lg h-48 w-full"></div>
                </div>
              </div>
            </section>
            
            <!-- Property Details -->
            <section class="mb-8" id="details">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold">Detalles de la Propiedad</h2>
              </div>
              
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="mb-6 max-w-xs">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="area">Área Total (m²)</label>
                  <input 
                    type="number" 
                    id="area" 
                    v-model="formData.square_feet" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                    min="20"
                    placeholder="Ingresa el área"
                  />
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Habitaciones</label>
                  <div class="flex flex-wrap gap-2">
                    <label class="inline-flex items-center">
                      <input class="sr-only" type="radio" name="bedrooms" :value="0" v-model="formData.bedrooms" />
                      <span class="px-4 py-2 border rounded-md cursor-pointer" :class="formData.bedrooms === 0 ? 'bg-orange-800 text-white border-orange-800' : 'border-gray-300 hover:border-orange-800'">Estudio</span>
                    </label>
                    <label v-for="n in 5" :key="`bedroom-${n}`" class="inline-flex items-center">
                      <input class="sr-only" type="radio" name="bedrooms" :value="n" v-model="formData.bedrooms" />
                      <span class="px-4 py-2 border rounded-md cursor-pointer" :class="formData.bedrooms === n ? 'bg-orange-800 text-white border-orange-800' : 'border-gray-300 hover:border-orange-800'">{{ n }}</span>
                    </label>
                  </div>
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Baños</label>
                  <div class="flex flex-wrap gap-2">
                    <label v-for="n in 4" :key="`bathroom-${n}`" class="inline-flex items-center">
                      <input class="sr-only" type="radio" name="bathrooms" :value="n" v-model="formData.bathrooms" />
                      <span class="px-4 py-2 border rounded-md cursor-pointer" :class="formData.bathrooms === n ? 'bg-orange-800 text-white border-orange-800' : 'border-gray-300 hover:border-orange-800'">{{ n }}</span>
                    </label>
                  </div>
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Estacionamientos</label>
                  <div class="flex flex-wrap gap-2">
                    <label v-for="n in 5" :key="`parking-${n-1}`" class="inline-flex items-center">
                      <input class="sr-only" type="radio" name="parking" :value="n-1" v-model="formData.parkingSpaces" />
                      <span class="px-4 py-2 border rounded-md cursor-pointer" :class="formData.parkingSpaces === n-1 ? 'bg-orange-800 text-white border-orange-800' : 'border-gray-300 hover:border-orange-800'">{{ n-1 }}</span>
                    </label>
                  </div>
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Comodidades</label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4">
                    <div v-for="(amenity, i) in amenities" :key="`amenity-${i}`">
                      <label class="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          :value="amenity.id" 
                          v-model="formData.amenities"
                          class="h-4 w-4 rounded text-orange-800 focus:ring-orange-800 border-gray-300"
                        />
                        <span class="ml-2 text-gray-700">{{ amenity.label }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Mascotas</label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4">
                    <div v-for="(pet, i) in pets" :key="`pet-${i}`">
                      <label class="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          :value="pet.id" 
                          v-model="formData.pets_allowed"
                          class="h-4 w-4 rounded text-orange-800 focus:ring-orange-800 border-gray-300"
                        />
                        <span class="ml-2 text-gray-700">{{ pet.label }}</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div class="mb-3">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="description">Descripción</label>
                  <textarea 
                    id="description" 
                    v-model="formData.description"
                    rows="5" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                    placeholder="Describe tu propiedad"
                  ></textarea>
                  <p class="mt-1 text-sm text-gray-500">{{ 1500 - (formData.description?.length || 0) }} caracteres restantes</p>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label class="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        v-model="formData.isNew"
                        class="h-4 w-4 rounded text-orange-800 focus:ring-orange-800 border-gray-300"
                      />
                      <span class="ml-2 text-gray-700">Marcar como Nuevo</span>
                    </label>
                  </div>
                  <div>
                    <label class="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        v-model="formData.isVerified"
                        class="h-4 w-4 rounded text-orange-800 focus:ring-orange-800 border-gray-300"
                      />
                      <span class="ml-2 text-gray-700">Marcar como Verificado</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
            
            <!-- Price -->
            <section class="mb-8" id="price">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold">Precio</h2>
              </div>
              
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="mb-4">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="price">
                    Precio <span class="text-red-500">*</span>
                  </label>
                  <div class="flex flex-col sm:flex-row gap-3" :class="{'for-sale': formData.status === 'for-sale', 'for-rent': formData.status !== 'for-sale'}">
                    <div class="px-3 py-2 font-medium">L</div>
                    <input 
                      type="number" 
                      id="price" 
                      v-model="formData.price"
                      class="w-full sm:w-2/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-800 focus:border-orange-800"
                      min="200"
                      step="50"
                      placeholder="Precio"
                      required
                    />
                    <span v-if="formData.status === 'for-sale'">precio total</span>
                    <span v-else>/mes</span>
                  </div>
                </div>
              </div>
            </section>
            
            <!-- Photos -->
            <section class="mb-8" id="photos">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold">Fotos / Vídeo</h2>
              </div>
              
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="bg-orange-50 border-l-4 border-orange-500 text-orange-700 p-4 mb-6" role="alert">
                  <p class="text-sm">
                    El tamaño máximo de foto es 8 MB. Formatos: jpeg, jpg, png. Coloca la imagen principal primero.<br>
                    El tamaño máximo de vídeo es 10 MB. Formatos: mp4, mov.
                  </p>
                </div>

                <!-- Current Images -->
                <div v-if="existingImages.length > 0" class="mb-6">
                  <h3 class="text-md font-medium text-gray-700 mb-3">Imágenes actuales</h3>
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div v-for="(image, index) in existingImages" :key="`existing-${index}`" class="relative">
                      <img :src="image.url" alt="Imagen de propiedad" class="w-full h-32 object-cover rounded-md border border-gray-300" />
                      <button 
                        type="button" 
                        class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center focus:outline-none"
                        @click="removeExistingImage(index)"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center">
                  <input type="file" class="hidden-input" multiple accept="image/jpeg,image/png,video/mp4,video/quicktime" @change="handleFileChange" />
                  <div class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mb-3 h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <button 
                      type="button" 
                      class="mb-3 px-4 py-2 bg-orange-800 text-white rounded-md hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-800"
                      @click="triggerFileInput"
                    >
                      Subir fotos / vídeo
                    </button>
                    <p class="text-sm text-gray-500">o arrástralas aquí</p>
                  </div>
                </div>
                
                <!-- New images preview -->
                <div v-if="selectedFiles.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  <div v-for="(file, i) in selectedFiles" :key="`file-${i}`" class="relative">
                    <img :src="previewUrls[i]" alt="Vista previa" class="w-full h-32 object-cover rounded-md border border-gray-300" />
                    <button 
                      type="button" 
                      class="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center focus:outline-none"
                      @click="removeFile(i)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            
            <!-- Action buttons -->
            <div class="flex flex-col sm:flex-row justify-between pt-4">
              <button 
                type="button" 
                class="mb-4 sm:mb-0 px-6 py-3 border border-orange-800 text-orange-800 font-medium rounded-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-800"
                @click="openPreviewModal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Vista Previa
              </button>
              
              <button 
                type="submit" 
                class="px-6 py-3 bg-orange-800 text-white font-medium rounded-md hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-800"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Actualizando...
                </span>
                <span v-else>Actualizar Propiedad</span>
              </button>
            </div>
          </form>
        </div>
        
        <!-- Sidebar with progress -->
        <aside class="hidden lg:block lg:col-span-4">
          <div class="sticky top-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-bold mb-4">{{ progress }}% contenido completado</h3>
            
            <div class="h-2 bg-gray-200 rounded-full mb-6">
              <div class="h-2 bg-orange-800 rounded-full" :style="`width: ${progress}%`"></div>
            </div>
            
            <ul class="space-y-3">
              <li class="flex items-center">
                <div :class="[isBasicInfoComplete ? 'bg-orange-800 text-white' : 'bg-gray-200 text-gray-400', 'w-6 h-6 rounded-full flex items-center justify-center mr-3']">
                  <svg v-if="isBasicInfoComplete" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <a href="#basic-info" class="text-gray-800 hover:text-orange-800">Información Básica</a>
              </li>
              <li class="flex items-center">
                <div :class="[isLocationComplete ? 'bg-orange-800 text-white' : 'bg-gray-200 text-gray-400', 'w-6 h-6 rounded-full flex items-center justify-center mr-3']">
                  <svg v-if="isLocationComplete" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <a href="#location" class="text-gray-800 hover:text-orange-800">Ubicación</a>
              </li>
              <li class="flex items-center">
                <div :class="[isDetailsComplete ? 'bg-orange-800 text-white' : 'bg-gray-200 text-gray-400', 'w-6 h-6 rounded-full flex items-center justify-center mr-3']">
                  <svg v-if="isDetailsComplete" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <a href="#details" class="text-gray-800 hover:text-orange-800">Detalles de la Propiedad</a>
              </li>
              <li class="flex items-center">
                <div :class="[isPriceComplete ? 'bg-orange-800 text-white' : 'bg-gray-200 text-gray-400', 'w-6 h-6 rounded-full flex items-center justify-center mr-3']">
                  <svg v-if="isPriceComplete" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <a href="#price" class="text-gray-800 hover:text-orange-800">Precio</a>
              </li>
              <li class="flex items-center">
                <div :class="[isPhotosComplete ? 'bg-orange-800 text-white' : 'bg-gray-200 text-gray-400', 'w-6 h-6 rounded-full flex items-center justify-center mr-3']">
                  <svg v-if="isPhotosComplete" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <a href="#photos" class="text-gray-800 hover:text-orange-800">Fotos / Vídeo</a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
    
    <!-- Preview Modal -->
    <div v-if="previewModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" @click="closePreviewModal">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          <div class="bg-white px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-medium text-gray-900">Vista previa de la propiedad</h3>
              <div class="flex items-center gap-4">
                <button 
                  type="button" 
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-800 hover:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-800"
                  @click="handleSubmit"
                >
                  Actualizar propiedad
                </button>
                <button 
                  type="button" 
                  class="text-gray-400 hover:text-gray-500" 
                  @click="closePreviewModal"
                >
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="max-h-[70vh] overflow-y-auto p-4">
              <h1 class="text-2xl font-bold mb-2">{{ formData.title || "Título de la propiedad" }}</h1>
              <p class="text-lg text-gray-600 mb-4">{{ formData.address || "Dirección" }}, {{ formData.city || "Ciudad" }}, {{ formData.zip_code || "Código postal" }}</p>
              
              <div class="flex items-center space-x-6 mb-6">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span><strong>{{ formData.bedrooms }}</strong> hab.</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 10h-1.5a3 3 0 01-3-3v0a1.5 1.5 0 00-1.5-1.5H12a1.5 1.5 0 00-1.5 1.5v0a3 3 0 01-3 3H6m14-3H5v7a2 2 0 002 2h10a2 2 0 002-2v-7z" />
                  </svg>
                  <span><strong>{{ formData.bathrooms }}</strong> baños</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span><strong>{{ formData.parkingSpaces }}</strong> estac.</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <span><strong>{{ formData.square_feet }}</strong> m²</span>
                </div>
              </div>
              
              <!-- Property Images -->
              <div class="grid grid-cols-12 gap-4 mb-8">
                <div class="col-span-12 sm:col-span-8 h-64">
                  <div v-if="existingImages.length > 0 || previewUrls.length > 0">
                    <img :src="existingImages.length > 0 ? existingImages[0].url : previewUrls[0]" class="w-full h-full object-cover rounded-lg" alt="Imagen principal" />
                  </div>
                  <div v-else class="bg-gray-200 rounded-lg h-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div class="col-span-12 sm:col-span-4 grid grid-rows-2 gap-4">
                  <div>
                    <div v-if="existingImages.length > 1 || previewUrls.length > 1">
                      <img :src="existingImages.length > 1 ? existingImages[1].url : (existingImages.length > 0 ? existingImages[0].url : previewUrls[1])" class="w-full h-full object-cover rounded-lg" alt="Imagen adicional" />
                    </div>
                    <div v-else class="bg-gray-200 rounded-lg h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div v-if="existingImages.length > 2 || previewUrls.length > 2">
                      <img :src="existingImages.length > 2 ? existingImages[2].url : (existingImages.length > 1 ? existingImages[1].url : (existingImages.length > 0 ? existingImages[0].url : previewUrls[2]))" class="w-full h-full object-cover rounded-lg" alt="Imagen adicional" />
                    </div>
                    <div v-else class="bg-gray-200 rounded-lg h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="md:col-span-2">
                  <div class="flex flex-wrap gap-2 mb-6">
                    <span v-if="formData.isVerified" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verificado
                    </span>
                    <span v-if="formData.isNew" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Nuevo
                    </span>
                  </div>
                  
                  <div class="mb-6 pb-6 border-b border-gray-200">
                    <div class="flex items-center">
                      <h2 class="text-3xl font-bold">L {{ formData.price || '0' }}</h2>
                      <span class="ml-2 text-gray-600">
                        {{ formData.status === 'for-sale' ? 'precio total' : '/mes' }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="mb-6 pb-6 border-b border-gray-200">
                    <h3 class="text-xl font-bold mb-3">Descripción</h3>
                    <p class="text-gray-700">{{ formData.description || "Sin descripción disponible." }}</p>
                  </div>
                  
                  <div class="mb-6 pb-6 border-b border-gray-200">
                    <h3 class="text-xl font-bold mb-3">Detalles de la propiedad</h3>
                    <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                      <li class="flex items-start">
                        <span class="font-medium mr-2">Tipo:</span>
                        <span>{{ propertyTypeLabels[formData.property_type] || formData.property_type }}</span>
                      </li>
                      <li class="flex items-start">
                        <span class="font-medium mr-2">Área:</span>
                        <span>{{ formData.square_feet }} m²</span>
                      </li>
                      <li class="flex items-start">
                        <span class="font-medium mr-2">Habitaciones:</span>
                        <span>{{ formData.bedrooms }}</span>
                      </li>
                      <li class="flex items-start">
                        <span class="font-medium mr-2">Baños:</span>
                        <span>{{ formData.bathrooms }}</span>
                      </li>
                      <li class="flex items-start">
                        <span class="font-medium mr-2">Estacionamientos:</span>
                        <span>{{ formData.parkingSpaces }}</span>
                      </li>
                      <li class="flex items-start">
                        <span class="font-medium mr-2">Mascotas permitidas:</span>
                        <span>{{ formData.pets_allowed.length ? 'Sí' : 'No' }}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div v-if="formData.amenities.length" class="mb-6">
                    <h3 class="text-xl font-bold mb-3">Comodidades</h3>
                    <ul class="grid grid-cols-1 sm:grid-cols-3 gap-y-2">
                      <li v-for="(amenity, i) in formData.amenities" :key="`preview-amenity-${i}`" class="flex items-center">
                        <svg class="h-5 w-5 text-orange-800 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        {{ getAmenityLabel(amenity) }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

// Router y route para navegación
const router = useRouter();
const route = useRoute();
const propertyId = ref(null);

// Map availability
const mapContainer = ref(null);
const map = ref(null);
const marker = ref(null);

// Form state variables
const zoom = ref(13);
const isLoading = ref(true);
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const businessType = ref('private');
const selectedFiles = ref([]);
const previewUrls = ref([]);
const existingImages = ref([]);
const imagesToRemove = ref([]);
const previewModalOpen = ref(false);

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
  amenities: [],
  pets_allowed: [],
  district: '',
  lat: 15.505, // Posición por defecto
  lng: -88.025 // Posición por defecto
});

// Contact information
const contactInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: ''
});

// Property type labels
const propertyTypeLabels = {
  'house': 'Casa',
  'apartment': 'Apartamento',
  'room': 'Habitación',
  'office': 'Oficina',
  'commercial': 'Comercial',
  'land': 'Terreno',
  'daily-rental': 'Alquiler Diario',
  'new-building': 'Edificio Nuevo',
  'parking-lot': 'Estacionamiento'
};

// Available amenities
const amenities = [
  { id: 'wifi', label: 'WiFi', icon: 'wifi' },
  { id: 'air-condition', label: 'Aire acondicionado', icon: 'snowflake' },
  { id: 'heating', label: 'Calefacción', icon: 'thermometer' },
  { id: 'tv', label: 'TV', icon: 'tv' },
  { id: 'kitchen', label: 'Cocina', icon: 'dish' },
  { id: 'parking', label: 'Estacionamiento', icon: 'parking' },
  { id: 'pool', label: 'Piscina', icon: 'swimming-pool' },
  { id: 'dishwasher', label: 'Lavavajillas', icon: 'dish' },
  { id: 'laundry', label: 'Lavandería', icon: 'laundry' },
  { id: 'security-cameras', label: 'Cámaras de seguridad', icon: 'cctv' },
  { id: 'balcony', label: 'Balcón', icon: 'balcony' },
  { id: 'gym', label: 'Gimnasio', icon: 'gym' }
];

// Pet options
const pets = [
  { id: 'cats-allowed', label: 'Se permiten gatos' },
  { id: 'dogs-allowed', label: 'Se permiten perros' }
];

// Función para cargar los datos de la propiedad
const fetchPropertyData = async () => {
  try {
    isLoading.value = true;
    errorMessage.value = '';
    
    // Obtener el ID de la propiedad de los parámetros de la ruta
    propertyId.value = route.params.id;
    
    if (!propertyId.value) {
      errorMessage.value = 'ID de propiedad no encontrado';
      router.push('/account/properties');
      return;
    }
    
    // Obtener token de autenticación
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    
    if (!token) {
      errorMessage.value = 'No se encontró token de autenticación';
      router.push('/auth/login');
      return;
    }
    
    // Realizar petición para obtener los datos de la propiedad
    const response = await axios.get(`/api/properties/${propertyId.value}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      const property = response.data.data;
      
      // Actualizar formData con los datos de la propiedad
      formData.value = {
        title: property.title || '',
        description: property.description || '',
        address: property.address || '',
        city: property.city || '',
        state: property.state || '',
        zip_code: property.zip_code || '',
        price: property.price || '',
        bedrooms: property.bedrooms || 1,
        bathrooms: property.bathrooms || 1,
        square_feet: property.square_feet || 0,
        property_type: property.property_type || 'apartment',
        status: property.status || 'for-rent',
        isNew: !!property.isNew,
        isFeatured: !!property.isFeatured,
        isVerified: !!property.isVerified,
        parkingSpaces: property.parkingSpaces || 0,
        amenities: property.amenities || [],
        pets_allowed: property.pets_allowed || [],
        district: property.district || '',
        lat: property.lat || 15.505,
        lng: property.lng || -88.025
      };
      
      // Si hay datos de contacto, actualizar también
      if (property.contact) {
        contactInfo.value = {
          firstName: property.contact.firstName || '',
          lastName: property.contact.lastName || '',
          email: property.contact.email || '',
          phone: property.contact.phone || '',
          company: property.contact.company || ''
        };
      }
      
      // Configurar el tipo de negocio (empresa o particular)
      businessType.value = property.businessType || 'private';
      
      // Cargar imágenes existentes si las hay
      if (property.image) {
        existingImages.value.push({
          id: 'main',
          url: property.image,
          isPrimary: true
        });
      }
      
      if (property.additional_images && Array.isArray(property.additional_images)) {
        property.additional_images.forEach((url, index) => {
          existingImages.value.push({
            id: `additional-${index}`,
            url,
            isPrimary: false
          });
        });
      }
      
      // Inicializar el mapa con las coordenadas de la propiedad
      setTimeout(() => {
        if (map.value && marker.value) {
          updateMapMarker();
        }
      }, 500);
    } else {
      throw new Error('No se pudo cargar la propiedad');
    }
  } catch (error) {
    console.error('Error cargando propiedad:', error);
    errorMessage.value = 'No se pudo cargar la propiedad. Por favor intente de nuevo.';
  } finally {
    isLoading.value = false;
  }
};

// INICIALIZACIÓN DEL MAPA
const initMap = () => {
  if (!mapContainer.value) return;

  // Crear mapa
  map.value = window.L.map(mapContainer.value).setView([formData.value.lat, formData.value.lng], zoom.value);
  
  // Añadir capa de OpenStreetMap
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value);
  
  // Añadir marcador
  marker.value = window.L.marker([formData.value.lat, formData.value.lng], {
    draggable: true
  }).addTo(map.value);
  
  // Actualizar coordenadas cuando se arrastra el marcador
  marker.value.on('dragend', function(event) {
    const position = marker.value.getLatLng();
    formData.value.lat = position.lat;
    formData.value.lng = position.lng;
  });
  
  // Actualizar marcador cuando se hace clic en el mapa
  map.value.on('click', function(e) {
    marker.value.setLatLng(e.latlng);
    formData.value.lat = e.latlng.lat;
    formData.value.lng = e.latlng.lng;
  });
};

// Actualizar el marcador del mapa si cambian las coordenadas
const updateMapMarker = () => {
  if (map.value && marker.value) {
    const latLng = [formData.value.lat, formData.value.lng];
    map.value.setView(latLng, zoom.value);
    marker.value.setLatLng(latLng);
  }
};

// Helper functions for preview
const getAmenityLabel = (id) => {
  const found = amenities.find(a => a.id === id);
  return found ? found.label : id;
};

const getAmenityIcon = (id) => {
  const found = amenities.find(a => a.id === id);
  return found ? found.icon : 'check';
};

// File handling
const handleFileChange = (event) => {
  const input = event.target;
  if (!input.files) return;
  
  const files = Array.from(input.files);
  
  // Store selected files
  selectedFiles.value = [...selectedFiles.value, ...files];
  
  // Create preview URLs
  const newUrls = files.map(file => URL.createObjectURL(file));
  previewUrls.value = [...previewUrls.value, ...newUrls];
};

// Trigger file input click
const triggerFileInput = () => {
  const fileInput = document.querySelector('.hidden-input');
  if (fileInput) fileInput.click();
};

// Remove a file
const removeFile = (index) => {
  selectedFiles.value.splice(index, 1);
  
  // Release preview URL
  URL.revokeObjectURL(previewUrls.value[index]);
  previewUrls.value.splice(index, 1);
};

// Función para eliminar una imagen existente
const removeExistingImage = (index) => {
  const image = existingImages.value[index];
  imagesToRemove.value.push(image.id);
  existingImages.value.splice(index, 1);
};

// Modal control
const openPreviewModal = () => {
  previewModalOpen.value = true;
  document.body.style.overflow = 'hidden';
  
  // Forzar color negro en todos los textos de la vista previa
  setTimeout(() => {
    const previewTexts = document.querySelectorAll('.max-h-\\[70vh\\] p, .max-h-\\[70vh\\] span, .max-h-\\[70vh\\] li');
    previewTexts.forEach(element => {
      if (element instanceof HTMLElement) {
        element.style.color = '#000000';
      }
    });
  }, 200);
};

const closePreviewModal = () => {
  previewModalOpen.value = false;
  document.body.style.overflow = '';
};

// Section completion verification
const isBasicInfoComplete = computed(() => {
  return !!formData.value.title && !!formData.value.property_type && !!formData.value.status;
});

const isLocationComplete = computed(() => {
  return !!formData.value.address && !!formData.value.city && !!formData.value.zip_code && !!formData.value.state;
});

const isDetailsComplete = computed(() => {
  return formData.value.bedrooms !== undefined && formData.value.bathrooms !== undefined;
});

const isPriceComplete = computed(() => {
  return !!formData.value.price;
});

const isPhotosComplete = computed(() => {
  return existingImages.value.length > 0 || selectedFiles.value.length > 0;
});

const isContactsComplete = computed(() => {
  return !!contactInfo.value.firstName && !!contactInfo.value.lastName && !!contactInfo.value.email && !!contactInfo.value.phone;
});

// Calculate form completion progress
const progress = computed(() => {
  const totalFields = 6; // Number of sections
  let completedSections = 0;
  
  if (isBasicInfoComplete.value) completedSections++;
  if (isLocationComplete.value) completedSections++;
  if (isDetailsComplete.value) completedSections++;
  if (isPriceComplete.value) completedSections++;
  if (isPhotosComplete.value) completedSections++;
  if (isContactsComplete.value) completedSections++;
  
  return Math.round((completedSections / totalFields) * 100);
});

// Submit form
const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = '';
    successMessage.value = '';
    
    // Obtener ID de la propiedad de los parámetros de la ruta
    const propertyId = route.params.id;
    
    if (!propertyId) {
      errorMessage.value = 'ID de propiedad no encontrado';
      return;
    }
    
    // Crear form data para submission con files
    const propertyFormData = new FormData();
    
    // Añadir todos los campos del form a FormData
    Object.keys(formData.value).forEach(key => {
      if (key === 'amenities' || key === 'pets_allowed') {
        // Para arrays, manejarlos especialmente
        formData.value[key].forEach((item, i) => {
          propertyFormData.append(`${key}[${i}]`, item);
        });
      } else {
        // Convertir booleanos a valores apropiados para MySQL
        if (typeof formData.value[key] === 'boolean') {
          propertyFormData.append(key, formData.value[key] ? '1' : '0');
        } else {
          propertyFormData.append(key, String(formData.value[key]));
        }
      }
    });
    
    // Añadir info de contacto si es necesario
    if (contactInfo.value) {
      propertyFormData.append('contact', JSON.stringify(contactInfo.value));
    }
    
    // Añadir imágenes nuevas si existen
    if (selectedFiles.value.length > 0) {
      // Añadir imagen principal
      propertyFormData.append('image', selectedFiles.value[0]);
      
      // Añadir imágenes adicionales
      for (let i = 1; i < selectedFiles.value.length; i++) {
        propertyFormData.append('additional_images', selectedFiles.value[i]);
      }
    }
    
    // Añadir imágenes a eliminar si las hay
    if (imagesToRemove.value && imagesToRemove.value.length > 0) {
      propertyFormData.append('imagesToRemove', JSON.stringify(imagesToRemove.value));
    }
    
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    
    if (!token) {
      errorMessage.value = 'No se encontró el token de autenticación';
      return;
    }
    
    // Llamar a la API para actualizar la propiedad
    const response = await axios.put(`/api/properties/${propertyId}`, propertyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data && response.data.success) {
      // Mostrar mensaje de éxito
      successMessage.value = '¡Propiedad actualizada exitosamente!';
      
      // Mostrar notificación en la parte superior
      showTopNotification('Propiedad actualizada con éxito', 'success');
      
      // Redirigir a la página de propiedades después del éxito
      setTimeout(() => {
        router.push('/account/properties');
      }, 2000);
    } else {
      errorMessage.value = response.data?.message || 'Error al actualizar la propiedad';
      showTopNotification('Error al actualizar la propiedad', 'error');
    }
  } catch (error) {
    console.error('Error actualizando propiedad:', error);
    
    // Manejar errores específicos
    if (error.response) {
      // El servidor respondió con un código de estado diferente de 2xx
      errorMessage.value = error.response.data?.message || 
                          `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      errorMessage.value = 'No se recibió respuesta del servidor. Verifique su conexión a internet.';
    } else {
      // Algo ocurrió al configurar la solicitud
      errorMessage.value = error.message || 'Error al actualizar la propiedad';
    }
    
    showTopNotification('Error al actualizar la propiedad', 'error');
  } finally {
    isSubmitting.value = false;
  }
};

// Función para mostrar notificación en la parte superior
const showTopNotification = (message, type = 'success') => {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  
  // Aplicar estilos según el tipo
  notification.className = `fixed top-4 right-4 z-50 px-4 py-3 rounded-md shadow-lg transition-all duration-500 transform translate-y-0 opacity-100 ${
    type === 'success' ? 'bg-green-100 border-l-4 border-green-500 text-green-700' : 
    'bg-red-100 border-l-4 border-red-500 text-red-700'
  }`;
  
  // Agregar mensaje
  notification.innerHTML = `
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 ${type === 'success' ? 'text-green-500' : 'text-red-500'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          ${
            type === 'success' 
              ? '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />'
              : '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />'
          }
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm font-medium">${message}</p>
      </div>
    </div>
  `;
  
  // Agregar al DOM
  document.body.appendChild(notification);
  
  // Eliminar después de 5 segundos
  setTimeout(() => {
    notification.classList.replace('translate-y-0', '-translate-y-12');
    notification.classList.replace('opacity-100', 'opacity-0');
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 5000);
};

// Observar cambios en previewModalOpen para aplicar estilos de texto negro
watch(
  () => previewModalOpen.value,
  (isOpen) => {
    if (isOpen) {
      setTimeout(() => {
        const previewTexts = document.querySelectorAll('.max-h-\\[70vh\\] p, .max-h-\\[70vh\\] span, .max-h-\\[70vh\\] li');
        previewTexts.forEach(element => {
          if (element instanceof HTMLElement) {
            element.style.color = '#000000';
          }
        });
      }, 200);
    }
  }
);

// Al montar el componente
onMounted(async () => {
  // Cargar datos de la propiedad
  await fetchPropertyData();
  
  // Inicializar el mapa
  if (typeof window.L !== 'undefined' && mapContainer.value) {
    initMap();
  } else {
    // Si Leaflet no está disponible, cargarlo dinámicamente
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.onload = () => {
      if (mapContainer.value) {
        initMap();
      }
    };
    document.head.appendChild(script);
  }
});
</script>

<style>
/* CSS Final con todos los ajustes específicos */

/* ESTRUCTURA Y ESPACIADO */
/* Ajustar espaciado del título principal */
h1:first-of-type,
.main-title,
.page-title,
.container h1 {
  margin-top: 25px !important;
  padding-top: 15px !important;
}

/* Mejorar espaciado y estructura de secciones */
section,
.form-section,
.card,
.form-card,
.mb-8 {
  margin-bottom: 30px !important;
}

/* Posicionamiento de títulos de sección para que sean visibles al navegar */
section,
#basic-info, 
#location, 
#details, 
#price, 
#photos, 
#contacts {
  padding-top: 20px !important;
  scroll-margin-top: 100px !important; /* Importante para anclas */
}

/* ELEMENTOS DE FORMULARIO Y COLORES */
/* Color de texto en campos de entrada */
input, 
select, 
textarea,
.form-control,
input.w-full,
textarea.w-full,
select.w-full,
.w-full.px-3.py-2.border {
  color: #000000 !important;
  font-weight: normal !important;
}

/* Etiquetas y títulos */
label,
.block.text-sm.font-medium,
.block.text-sm.font-medium.text-gray-700,
.text-sm.font-medium.text-gray-700,
h1, h2, h3, h4, 
.section-title {
  color: #000000 !important;
  font-weight: 500 !important;
}

/* Contador de caracteres */
p.mt-1.text-sm.text-gray-500 {
  color: #4B5563 !important; /* Gris oscuro */
}

/* SECCIÓN DE RADIO BUTTONS Y CHECKBOXES */
/* Separación entre opciones de radio */
.space-y-2 {
  margin-top: 15px !important;
}

.space-y-2 label.inline-flex {
  display: block !important;
  margin-bottom: 15px !important;
  padding: 5px 0 !important;
}

/* Color azul marino para círculos de selección */
input[type="radio"]:checked,
input[type="checkbox"]:checked {
  background-color: #fd5631 !important; /* Azul marino */
  border-color: #fd5631 !important;
}

/* Estilo para la pregunta sobre empresa */
.block.text-sm.font-medium.text-gray-700.mb-2 {
  margin-top: 20px !important;
  margin-bottom: 15px !important;
  color: #374151 !important;
}

/* VISTA PREVIA */
/* Reducir espacio en vista previa */
.bg-white.px-4.py-5.sm\:p-6 {
  padding-top: 10px !important;
}

.max-h-\[70vh\] {
  padding-top: 0 !important;
}

.inline-block.align-bottom.bg-white h1 {
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}

/* Reducir espacio entre imágenes y precio */
.grid.grid-cols-12.gap-4.mb-8 {
  margin-bottom: 20px !important;
}

/* TEXTO NEGRO EN VISTA PREVIA Y DETALLES DE PROPIEDAD */
/* Asegurarse que TODO en vista previa sea negro */
.text-gray-500,
.text-gray-600,
.text-gray-700,
p.text-sm,
span.text-gray-700,
.text-muted,
button.text-gray-400,
.bg-gray-200.rounded-lg.h-full.flex.items-center.justify-center,
.text-gray-400,
li.flex.items-center span,
.text-sm.text-gray-600,
.text-sm.text-gray-500,
.text-sm.text-gray-400,
.inline-block.align-bottom.bg-white p,
.inline-block.align-bottom.bg-white span,
.inline-block.align-bottom.bg-white li {
  color: #000000 !important;
}

/* Específicamente para detalles de propiedad en vista previa */
.grid.grid-cols-1.md\:grid-cols-3.gap-8 li.flex.items-start span,
.flex.items-start span,
.font-medium.mr-2 + span,
.font-medium + span,
li span {
  color: #000000 !important;
}

/* Detalles específicos de la propiedad (Tipo, Área, etc.) */
#detalles-propiedad span,
.detalles-propiedad span,
[class*="detalles"] span,
.grid.grid-cols-1.sm\:grid-cols-2.gap-y-2 li span,
.grid.grid-cols-1.sm\:grid-cols-3.gap-y-2 li span {
  color: #000000 !important;
}

/* OTROS ELEMENTOS */
/* Texto sobre archivos */
.bg-orange-50.border-l-4.border-orange-500.text-orange-700 p.text-sm {
  color: #4B5563 !important; /* Gris oscuro */
}

/* Elementos seleccionados en azul marino */
.bg-orange-800.text-white,
.bg-orange-800.text-white.border-orange-800,
[class*="bg-orange-800"],
[class*="bg-orange-800"][class*="text-white"] {
  background-color: #fd5631 !important; /* Azul marino */
  color: white !important;
  border-color: #fd5631 !important;
}

/* Barra de progreso */
.h-2.bg-orange-800.rounded-full,
.progress-bar,
.progress-fill,
.progress > div,
[class*="progress"] > div {
  background-color: #fd5631 !important;
  transition: width 0.3s ease-in-out !important;
  background-image: linear-gradient(to right, #2563EB, #fd5631) !important;
}

/* Mantener botón azul marino con texto blanco */
.btn-primary, 
.btn-orange, 
button.bg-orange-800, 
button.bg-primary,
button[type="submit"],
.px-6.py-3.bg-orange-800 {
  color: white !important;
  background-color: #fd5631 !important;
}

/* Ajustes para navegación lateral */
.hidden.lg\:block a, 
.sticky.top-6 a {
  color: #1E293B !important;
}

/* Énfasis en asteriscos de campos requeridos */
span.text-red-500 {
  color: #f00 !important;
  font-weight: bold !important;
}

/* Vista previa - Forzar color negro en TODAS las vistas */
.max-h-\[70vh\] * {
  color: #000000 !important;
}
.modal-content * {
  color: #000000 !important;
}
.inline-block.align-bottom * {
  color: #000000 !important;
}

/* Excepción para íconos y elementos que deben ser blancos */
.btn-primary *, 
.btn-orange *, 
button.bg-orange-800 *, 
button.bg-primary *,
button[type="submit"] *,
.px-6.py-3.bg-orange-800 * {
  color: white !important;
}


.flex.flex-col.sm\:flex-row.gap-3 div,
.flex.flex-col.sm\:flex-row.gap-3 span {
  color: #000000 !important;
  font-weight: normal !important;
}
</style>