<template>
  <!-- Footer-->
  <footer class="bg-gray-100 dark:bg-gray-800 pt-10">
    <div class="container mx-auto px-4 pb-8">
      <!-- Links-->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <div class="flex flex-col md:flex-row justify-between">
            <div class="mb-8 md:mb-0 md:mr-12">
              <router-link class="inline-block mb-6" to="/">
                <h1 class="text-xl font-bold text-orange-600 dark:text-orange-400">OASIS - Tu Aliado en Bienes Raíces</h1>
              </router-link>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                En OASIS, hacemos que encontrar la propiedad perfecta sea una experiencia sencilla, transparente y placentera. Nuestro compromiso es ayudarte a tomar decisiones informadas y seguras en el mundo inmobiliario.
              </p>
              <ul class="space-y-3">
                <li>
                  <a href="mailto:info@oasis-realestate.com" class="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@oasis-realestate.com
                  </a>
                </li>
                <li>
                  <a href="tel:5551234567" class="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    (504) 3192-3555
                  </a>
                </li>
              </ul>
              <div class="flex mt-6">
                <a href="#" class="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-2 shadow-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition duration-200">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-2 shadow-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition duration-200">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center mr-2 shadow-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition duration-200">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-600 transition duration-200">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-8">
              
              <div>
                <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Servicios</h4>
                <ul class="space-y-3">
                  <li>
                    <router-link to="/properties/sale" class="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400">Compra de propiedades</router-link>
                  </li>
                  <li>
                    <router-link to="/properties/add-property" class="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400">Venta de propiedades</router-link>
                  </li>
                  <li>
                    <router-link to="/properties/rent" class="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400">Alquiler de propiedades</router-link>
                  </li>
                  <li>
                    <router-link to="/account/account-info" class="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400">Administración de propiedades</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Contactanos</h4>
            <div class="flex items-start mb-6">
              <div class="flex-shrink-0 mr-3 mt-1">
                <svg class="h-5 w-5 text-orange-600 dark:text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400">
                  Ave. 14 de julio, frente a <br>
                  Repuestos del Atlantico
                </p>
              </div>
            </div>
            
           
            
            <div class="space-y-6">
              
              <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>
              
              
            </div>
          </div>
        </div>
      </div>
      
    
      
      <div class="text-center mt-10">
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          &copy; {{ new Date().getFullYear() }} OASIS Real Estate. All rights reserved.
        </p>
        
      </div>
    </div>
  </footer>
</template>

<script setup>
// No special logic needed for the footer
</script>