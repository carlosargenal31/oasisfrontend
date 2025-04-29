<template>
  <div class="bg-white min-h-screen">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-navy mx-auto mb-4"></div>
        <p class="text-lg font-medium text-gray-700">Cargando información...</p>
      </div>
    </div>

    <!-- Encabezado principal con navegación (simplificado) -->
    <header class="bg-white border-b border-gray-200 py-4">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <div class="flex items-center">
          <div class="text-2xl font-bold text-blue-500">OASIS</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <span class="mr-2 font-black">ES</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div class="flex items-center">
            <span class="mr-2 font-black">EUR</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button class="bg-navy text-white px-4 py-2 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Añadir propiedad
          </button>
          <img class="h-10 w-10 rounded-full" :src="user.profile_image || '/img/default-avatar.png'" alt="Perfil de usuario">
        </div>
      </div>
    </header>

    <!-- Navegación de migas de pan -->
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center text-blue-500 text-sm">
        <a href="/" class="hover:text-navy">Inicio</a>
        <span class="mx-2">/</span>
        <span class="text-gray-800">Información Personal</span>
      </div>
    </div>

    <!-- Contenido principal con barra lateral -->
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row">
        <!-- Barra lateral izquierda - ancho aumentado -->
        <div class="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <!-- Perfil de usuario en la barra lateral -->
            <div class="p-4 text-center">
              <img :src="user.profile_image || '/img/default-avatar.png'" alt="Usuario" class="rounded-full w-24 h-24 mx-auto mb-4">
              <h3 class="text-xl font-bold text-black">{{ user.first_name }} {{ user.last_name }}</h3>
              <div class="flex justify-center my-2">
                <span class="text-yellow-400">★★★★★</span>
              </div>
              <div class="text-gray-800 text-sm mt-2">
                <div class="mb-1">
                  <i class="fas fa-phone mr-2"></i> {{ user.phone || 'No especificado' }}
                </div>
                <div>
                  <i class="fas fa-envelope mr-2"></i> {{ user.email }}
                </div>
              </div>
            </div>

            <!-- Botón añadir propiedad -->
<div class="px-4 pb-4">
  <button 
    @click="redirectToAddProperty" 
    class="w-full bg-navy text-white py-2 rounded flex justify-center items-center"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="white">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
    Añadir propiedad
  </button>
</div>

            <!-- Menú de navegación -->
            <div class="border-t border-gray-200">
              <a href="/account/account-info" class="flex items-center px-4 py-3 border-l-4 border-navy bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-navy font-medium">Información Personal</span>
              </a>
              
              <a href="/account/properties" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span class="text-black">Mis Propiedades</span>
              </a>
              <a href="/account/bookings" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-black">Mis Reservas</span>
                </a>
                <a href="/account/purchases" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    <span class="text-black">Mis Compras</span>
  </a>
              <a href="/account/wishlist" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="text-black">Lista de Deseos</span>
              </a>
              
              <a href="/logout" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="text-black">Cerrar Sesión</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Área de contenido principal -->
        <div class="w-full md:w-2/3">
          <h1 class="text-2xl font-bold text-black mb-4">Información Personal</h1>

          <!-- Barra de progreso -->
          <div class="mb-6">
            <p class="text-black mb-2 font-medium">Tu información personal está completada al {{ completeness }}%</p>
            <div class="w-full bg-gray-200 h-2 rounded-full">
              <div class="bg-navy h-2 rounded-full" :style="{ width: completeness + '%' }"></div>
            </div>
          </div>

          <!-- Sección de biografía -->
          <div class="mb-8">
            <label class="block text-black font-medium mb-2">Biografía corta</label>
            <div class="flex flex-col lg:flex-row gap-6">
              <div class="flex-grow">
                <textarea 
                  v-model="formData.short_bio"
                  class="w-full border border-gray-300 rounded-lg p-3 h-40 focus:ring-2 focus:ring-navy focus:border-navy" 
                  placeholder="Escribe tu biografía aquí. Se mostrará en tu perfil público."
                ></textarea>
              </div>
              <div class="w-full lg:w-64 flex-shrink-0">
                <div class="bg-teal-500 hover:bg-teal-600 transition rounded-lg p-6 text-center cursor-pointer h-full flex flex-col items-center justify-center" @click="$refs.fileInput.click()">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-white font-medium">Cambiar foto</span>
                  <input ref="fileInput" type="file" class="hidden" accept="image/jpeg, image/png" @change="handleImageUpload">
                </div>
              </div>
            </div>
          </div>

          <!-- Sección de información personal -->
          <div class="mb-8">
            <!-- Nombre completo -->
            <div class="border border-gray-200 rounded-lg mb-4">
              <div class="p-4 flex items-center justify-between">
                <div>
                  <label class="block text-black text-sm mb-1">Nombre completo</label>
                  <div class="text-black font-medium">{{ user.first_name }} {{ user.last_name }}</div>
                </div>
                <button class="text-gray-500 hover:text-navy" @click="editField('name')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Email -->
            <div class="border border-gray-200 rounded-lg mb-4">
              <div class="p-4 flex items-center justify-between">
                <div>
                  <label class="block text-black text-sm mb-1">Email</label>
                  <div class="text-black font-medium">{{ user.email }}</div>
                </div>
                <button class="text-gray-500 hover:text-navy" @click="editField('email')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Número de teléfono -->
            <div class="border border-gray-200 rounded-lg mb-4">
              <div class="p-4 flex items-center justify-between">
                <div>
                  <label class="block text-black text-sm mb-1">Número de teléfono</label>
                  <div class="text-black font-medium">{{ user.phone || 'No especificado' }}</div>
                </div>
                <button class="text-gray-500 hover:text-navy" @click="editField('phone')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Nombre de empresa -->
            <div class="border border-gray-200 rounded-lg mb-4">
              <div class="p-4 flex items-center justify-between">
                <div>
                  <label class="block text-black text-sm mb-1">Nombre de empresa</label>
                  <div class="text-gray-600">{{ user.company_name || 'No especificado' }}</div>
                </div>
                <button class="text-gray-500 hover:text-navy" @click="editField('company_name')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Dirección -->
            <div class="border border-gray-200 rounded-lg mb-4">
              <div class="p-4 flex items-center justify-between">
                <div>
                  <label class="block text-black text-sm mb-1">Dirección</label>
                  <div class="text-gray-600">{{ user.address || 'No especificado' }}</div>
                </div>
                <button class="text-gray-500 hover:text-navy" @click="editField('address')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Sección de redes sociales -->
          <div class="mb-8">
            <h3 class="text-black font-medium mb-4">Redes Sociales</h3>
            
            <!-- Facebook -->
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 320 512">
                  <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
              </div>
              <input 
                v-model="formData.social_facebook"
                type="text" 
                class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:border-navy" 
                placeholder="Tu cuenta de Facebook"
              >
            </div>
            
            <!-- LinkedIn -->
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
                </svg>
              </div>
              <input 
                v-model="formData.social_linkedin"
                type="text" 
                class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:border-navy" 
                placeholder="Tu cuenta de LinkedIn"
              >
            </div>
            
            <!-- Twitter -->
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                </svg>
              </div>
              <input 
                v-model="formData.social_twitter"
                type="text" 
                class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:border-navy" 
                placeholder="Tu cuenta de Twitter"
              >
            </div>
            
            <!-- Sección oculta (Instagram y Pinterest se mostrarán cuando se haga clic en "Mostrar más") -->
            <div v-if="showMoreSocials">
              <!-- Instagram -->
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
</svg>
</div>
<input 
              v-model="formData.social_instagram"
              type="text" 
              class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:border-navy" 
              placeholder="Tu cuenta de Instagram">
</div>
     <!-- Pinterest -->
         <div class="flex items-center mb-4">
           <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 384 512">
               <path fill="currentColor" d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
             </svg>
           </div>
           <input 
             v-model="formData.social_pinterest"
             type="text" 
             class="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-navy focus:border-navy" 
             placeholder="Tu cuenta de Pinterest"
           >
         </div>
       </div>

       <!-- Botón Mostrar más / Mostrar menos -->
       <button 
         class="text-red-500 hover:text-red-600 flex items-center mt-2" 
         @click="toggleMoreSocials"
       >
         <svg v-if="!showMoreSocials" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
         </svg>
         <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
         </svg>
         {{ showMoreSocials ? 'Mostrar menos' : 'Mostrar más' }}
       </button>
       
       <!-- Botones de acción -->
       <div class="flex items-center justify-between pt-4 mt-8 border-t border-gray-200">
         <button @click="saveChanges" class="bg-navy text-white px-6 py-3 rounded-lg hover:bg-navy-dark transition">
           Guardar cambios
         </button>
         <button @click="showConfirmDelete = true" class="text-gray-600 hover:text-red-500 flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
           </svg>
           Eliminar cuenta
         </button>
       </div>
      </div>
    </div>
  </div>
</div>
  </div>
  <!-- Modal de confirmación para eliminar cuenta -->
  <div v-if="showConfirmDelete" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h3 class="text-xl font-bold text-red-600 mb-4">¿Estás seguro?</h3>
      <p class="text-gray-700 mb-6">Esta acción eliminará permanentemente tu cuenta y todos tus datos asociados. Esta acción no se puede deshacer.</p>
      <div class="flex justify-end space-x-3">
        <button @click="showConfirmDelete = false" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
          Cancelar
        </button>
        <button @click="deleteAccount" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Eliminar cuenta
        </button>
      </div>
    </div>
  </div>
  <!-- Modal para editar campos -->
  <div v-if="editingField" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h3 class="text-xl font-bold text-navy mb-4">Editar {{ getFieldLabel(editingField) }}</h3>
<div v-if="editingField === 'name'" class="mb-4">
    <label class="block text-gray-700 mb-2">Nombre</label>
    <input v-model="editForm.first_name" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2">
  </div>
  
  <div v-if="editingField === 'name'" class="mb-4">
    <label class="block text-gray-700 mb-2">Apellido</label>
    <input v-model="editForm.last_name" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2">
  </div>
  
  <div v-if="editingField === 'email'" class="mb-4">
    <label class="block text-gray-700 mb-2">Email</label>
    <input v-model="editForm.email" type="email" class="w-full border border-gray-300 rounded-lg px-4 py-2">
  </div>
  
  <div v-if="editingField === 'phone'" class="mb-4">
    <label class="block text-gray-700 mb-2">Teléfono</label>
    <input v-model="editForm.phone" type="tel" class="w-full border border-gray-300 rounded-lg px-4 py-2">
  </div>
  
  <div v-if="editingField === 'company_name'" class="mb-4">
    <label class="block text-gray-700 mb-2">Nombre de empresa</label>
    <input v-model="editForm.company_name" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2">
  </div>
  
  <div v-if="editingField === 'address'" class="mb-4">
    <label class="block text-gray-700 mb-2">Dirección</label>
    <textarea v-model="editForm.address" class="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"></textarea>
  </div>
  
  <div class="flex justify-end space-x-3 mt-4">
    <button @click="cancelEdit" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
      Cancelar
    </button>
    <button @click="saveEdit" class="px-4 py-2 bg-navy text-white rounded hover:bg-navy-dark">
      Guardar
    </button>
  </div>
</div>
  </div>
  <!-- Toast de notificación -->
  <div v-if="notification.show" 
    class="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 flex items-start max-w-sm transition-all duration-300"
    :class="{'bg-green-50': notification.type === 'success', 'bg-red-50': notification.type === 'error'}">
    <div v-if="notification.type === 'success'" class="text-green-500 mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div v-if="notification.type === 'error'" class="text-red-500 mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <div>
      <div class="font-medium" :class="{'text-green-800': notification.type === 'success', 'text-red-800': notification.type === 'error'}">
        {{ notification.title }}
      </div>
      <div class="text-sm text-gray-600">{{ notification.message }}</div>
    </div>
    <button @click="notification.show = false" class="ml-auto text-gray-400 hover:text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from '~/src/config/axios'; // Ajusta la ruta según tu estructura
import { useAuthStore } from '../store/auth';

// Estado para mostrar más entradas sociales
const showMoreSocials = ref(false);
const toggleMoreSocials = () => {
  showMoreSocials.value = !showMoreSocials.value;
};

// Cerrar sesión
const logout = async () => {
  authStore.logout();
  // Limpiar tokens del localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token'); // Por si acaso también usas este nombre
  localStorage.removeItem('user');
  window.location.href = '/';
};

// Función para redirigir a la página de añadir propiedad
const redirectToAddProperty = () => {
  window.location.href = '/properties/add-property';
};
// Método para iniciar sesión
// En el método login del componente de login
const login = async () => {
  try {
    isLoading.value = true;
    
    const response = await axios.post('/api/auth/login', {
      email: email.value,
      password: password.value
    });
    
    if (response.data && response.data.success) {
      // Guardar tokens
      localStorage.setItem('access_token', response.data.data.accessToken);
      localStorage.setItem('refresh_token', response.data.data.refreshToken);
      
      // Redirección inmediata a account-info
      window.location.href = '/account/account-info';
    } else {
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error de inicio de sesión:', error);
    showNotification('error', 'Error', 'No se pudo iniciar sesión');
  } finally {
    isLoading.value = false;
  }
};

// Datos del usuario
const user = ref({
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  profile_image: '',
  short_bio: '',
  company_name: '',
  address: '',
  social_facebook: '',
  social_linkedin: '',
  social_twitter: '',
  social_instagram: '',
  social_pinterest: ''
});

// Datos del formulario (para edición)
const formData = reactive({
  short_bio: '',
  social_facebook: '',
  social_linkedin: '',
  social_twitter: '',
  social_instagram: '',
  social_pinterest: ''
});

// Estado para la edición de campo
const editingField = ref(null);
const editForm = reactive({});

// Estado para confirmación de eliminación
const showConfirmDelete = ref(false);

// Estado de carga
const isLoading = ref(true);

// Notificación
const notification = reactive({
  show: false,
  type: 'success',
  title: '',
  message: '',
  timeout: null
});

// Porcentaje de completitud del perfil
const completeness = ref(0);

// Función para calcular completitud del perfil localmente
const calculateCompleteness = () => {
  if (!user.value) {
    completeness.value = 0;
    return;
  }
  
  const fields = [
    { name: 'first_name', weight: 10 },
    { name: 'last_name', weight: 10 },
    { name: 'email', weight: 10 },
    { name: 'phone', weight: 10 },
    { name: 'profile_image', weight: 10 },
    { name: 'short_bio', weight: 15 },
    { name: 'company_name', weight: 5 },
    { name: 'address', weight: 10 },
    { name: 'social_facebook', weight: 5 },
    { name: 'social_linkedin', weight: 5 },
    { name: 'social_twitter', weight: 5 },
    { name: 'social_instagram', weight: 2.5 },
    { name: 'social_pinterest', weight: 2.5 }
  ];

  let total = 0;
  fields.forEach(field => {
    if (user.value[field.name] && String(user.value[field.name]).trim() !== '') {
      total += field.weight;
    }
  });

  completeness.value = Math.round(total);
  console.log('Completitud calculada:', completeness.value + '%');
};

// Cargar datos del usuario
const loadUserData = async () => {
  try {
    isLoading.value = true;
    
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      window.location.href = '/auth/login';
      return;
    }
    
    // Conectamos con la API real incluyendo el token
    const response = await axios.get('/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Datos del usuario recibidos:', response.data);
    
    if (response.data && response.data.success) {
      // Asignar datos del usuario
      user.value = response.data.data.user || {};
      
      // Si el backend proporciona completitud, usarla
      if (response.data.data.completeness !== undefined) {
        completeness.value = response.data.data.completeness;
      } else {
        // Si no, calcular localmente
        calculateCompleteness();
      }
      
      // Copiar valores a formData
      formData.short_bio = user.value.short_bio || '';
      formData.social_facebook = user.value.social_facebook || '';
      formData.social_linkedin = user.value.social_linkedin || '';
      formData.social_twitter = user.value.social_twitter || '';
      formData.social_instagram = user.value.social_instagram || '';
      formData.social_pinterest = user.value.social_pinterest || '';
      
      console.log('Datos cargados en formData:', formData);
    } else {
      throw new Error('No se pudieron obtener los datos del usuario');
    }
  } catch (error) {
    console.error('Error cargando datos del usuario:', error);
    
    if (error.response && error.response.status === 401) {
      // Error de autenticación, redirigir al login
      window.location.href = '/auth/login';
    } else {
      showNotification('error', 'Error', 'No se pudieron cargar los datos del perfil');
    }
  } finally {
    isLoading.value = false;
  }
};

// Guardar cambios
const saveChanges = async () => {
  try {
    isLoading.value = true;
    
    // Datos a actualizar
    const updateData = {
      short_bio: formData.short_bio,
      social_facebook: formData.social_facebook,
      social_linkedin: formData.social_linkedin,
      social_twitter: formData.social_twitter,
      social_instagram: formData.social_instagram,
      social_pinterest: formData.social_pinterest
    };
    
    console.log('Guardando datos:', updateData);
    
    // Llamada a la API real
    const response = await axios.put('/api/users/profile', updateData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    
    if (response.data && response.data.success) {
      // Actualizar datos locales
      user.value.short_bio = formData.short_bio;
      user.value.social_facebook = formData.social_facebook;
      user.value.social_linkedin = formData.social_linkedin;
      user.value.social_twitter = formData.social_twitter;
      user.value.social_instagram = formData.social_instagram;
      user.value.social_pinterest = formData.social_pinterest;
      
      // Si el backend devuelve la completitud actualizada, usarla
      if (response.data.completeness !== undefined) {
        completeness.value = response.data.completeness;
      } else {
        // Si no, recalcular localmente
        calculateCompleteness();
      }
      
      showNotification('success', 'Éxito', 'Perfil actualizado correctamente');
    } else {
      throw new Error('No se pudo actualizar el perfil');
    }
  } catch (error) {
    console.error('Error guardando cambios:', error);
    showNotification('error', 'Error', 'No se pudieron guardar los cambios');
  } finally {
    isLoading.value = false;
  }
};
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    showNotification('error', 'Formato no válido', 'Por favor, sube una imagen en formato JPG o PNG');
    return;
  }
  
  if (file.size > 5 * 1024 * 1024) { // 5MB
    showNotification('error', 'Archivo demasiado grande', 'La imagen no debe superar los 5MB');
    return;
  }
  
  try {
    isLoading.value = true;
    
    // Crear FormData para enviar la imagen
    const formData = new FormData();
    formData.append('image', file);
    
    // Enviar la imagen al servidor
    const response = await axios.post('/api/users/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.data && response.data.success) {
      // Obtener la URL de la imagen actualizada
      const imageUrl = response.data.data.imageUrl;
      
      // Actualizar la imagen en la interfaz local
      user.value.profile_image = imageUrl;
      
      // IMPORTANTE: Actualizar también en el store de autenticación
      // para que se actualice en todos los componentes
      const authStore = useAuthStore();
      
      // Actualizar en el store
      authStore.setUser({
        ...authStore.user,
        profile_image: imageUrl
      });
      
      // Actualizar en el localStorage
      const userJson = localStorage.getItem('user');
      if (userJson) {
        try {
          const userData = JSON.parse(userJson);
          userData.profile_image = imageUrl;
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (e) {
          console.error('Error al actualizar usuario en localStorage', e);
        }
      }
      
      // Actualizar la completitud del perfil
      if (response.data.completeness !== undefined) {
        completeness.value = response.data.completeness;
      } else {
        calculateCompleteness();
      }
      
      showNotification('success', 'Éxito', 'Imagen de perfil actualizada correctamente');
    } else {
      throw new Error('No se pudo actualizar la imagen');
    }
  } catch (error) {
    console.error('Error subiendo imagen:', error);
    showNotification('error', 'Error', 'No se pudo actualizar la imagen de perfil');
  } finally {
    isLoading.value = false;
  }
};
// Editar campo
const editField = (field) => {
  editingField.value = field;
  
  // Preparar formulario de edición
  if (field === 'name') {
    editForm.first_name = user.value.first_name || '';
    editForm.last_name = user.value.last_name || '';
  } else {
    editForm[field] = user.value[field] || '';
  }
};

// Obtener etiqueta para el campo
const getFieldLabel = (field) => {
  const labels = {
    name: 'nombre completo',
    email: 'email',
    phone: 'teléfono',
    company_name: 'nombre de empresa',
    address: 'dirección'
  };
  
  return labels[field] || field;
};

// Guardar edición
const saveEdit = async () => {
  try {
    isLoading.value = true;
    
    let updateData = {};
    
    if (editingField.value === 'name') {
      updateData = {
        first_name: editForm.first_name,
        last_name: editForm.last_name
      };
    } else {
      updateData[editingField.value] = editForm[editingField.value];
    }
    
    // Llamada a la API real
    const response = await axios.put('/api/users/profile', updateData);
    
    if (response.data && response.data.success) {
      // Actualizar datos locales
      if (editingField.value === 'name') {
        user.value.first_name = editForm.first_name;
        user.value.last_name = editForm.last_name;
      } else {
        user.value[editingField.value] = editForm[editingField.value];
      }
      
      // Si el backend devuelve la completitud actualizada, usarla
      if (response.data.completeness !== undefined) {
        completeness.value = response.data.completeness;
      } else {
        // Si no, recalcular localmente
        calculateCompleteness();
      }
      
      editingField.value = null;
      showNotification('success', 'Éxito', 'Información actualizada correctamente');
    } else {
      throw new Error('No se pudo actualizar la información');
    }
  } catch (error) {
    showNotification('error', 'Error', 'No se pudo actualizar la información');
    console.error('Error actualizando campo:', error);
  } finally {
    isLoading.value = false;
  }
};

// Cancelar edición
const cancelEdit = () => {
  editingField.value = null;
};

// Eliminar cuenta
const deleteAccount = async () => {
  try {
    isLoading.value = true;
    
    // Llamada a la API real
    const response = await axios.delete(`/api/users/${user.value.id}`);
    
    if (response.data && response.data.success) {
      showConfirmDelete.value = false;
      showNotification('success', 'Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente');
      
      // Redirigir al login después de unos segundos
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 2000);
    } else {
      throw new Error('No se pudo eliminar la cuenta');
    }
  } catch (error) {
    showNotification('error', 'Error', 'No se pudo eliminar la cuenta');
    console.error('Error eliminando cuenta:', error);
    showConfirmDelete.value = false;
  } finally {
    isLoading.value = false;
  }
};

// Mostrar notificación
const showNotification = (type, title, message) => {
  // Limpiar timeout existente
  if (notification.timeout) {
    clearTimeout(notification.timeout);
  }
  
  // Configurar notificación
  notification.type = type;
  notification.title = title;
  notification.message = message;
  notification.show = true;
  
  // Ocultar después de 5 segundos
  notification.timeout = setTimeout(() => {
    notification.show = false;
  }, 5000);
};

// Al montar el componente
// En el método onMounted o cuando se carga el componente
onMounted(async () => {
  // Verificar si hay un token
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '/auth/login';
    return;
  }
  
  // Cargar datos del usuario
  await loadUserData();
});
</script>
<style>
/* Colores personalizados */
.bg-navy {
  background-color: #0a3364;
}

.bg-navy-dark {
  background-color: #072649;
}

.text-navy {
  color: #0a3364;
}

.border-navy {
  border-color: #0a3364;
}

.hover\:bg-navy:hover {
  background-color: #0a3364;
}

.hover\:bg-navy-dark:hover {
  background-color: #072649;
}

.hover\:text-navy:hover {
  color: #0a3364;
}

/* Estilos de enfoque */
.focus\:ring-navy:focus {
  --tw-ring-color: #0a3364;
  --tw-ring-opacity: 0.5;
  box-shadow: 0 0 0 3px rgba(10, 51, 100, 0.5);
}

.focus\:border-navy:focus {
  border-color: #0a3364;
}

/* Forzar texto negro para todos los elementos importantes */
.text-black, h1, h2, h3, p, label, .page-title, .progress-text, .section-label, .detail-label, .detail-value {
  color: #000000 !important;
}

/* Solo excepciones */
.not-specified {
  color: #666666 !important;
}

/* Transiciones */
.transition {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>