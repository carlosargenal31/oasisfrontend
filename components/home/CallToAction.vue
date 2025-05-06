<template>
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="bg-orange-900 rounded-lg shadow-lg py-12 px-6 md:px-12 text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para encontrar tu propiedad ideal?</h2>
          <p class="text-lg text-orange-100 max-w-3xl mx-auto mb-8">
            Únete a miles de clientes satisfechos que han encontrado su propiedad perfecta con OASIS. Nuestros expertos están listos para ayudarte.
          </p>
          <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <router-link to="/properties" class="bg-white text-orange-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
              Explorar Propiedades
            </router-link>
            <router-link to="/contact" class="bg-transparent text-white hover:bg-orange-800 border-2 border-white font-bold py-3 px-8 rounded-lg transition duration-300">
              Contactar un Agente
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </template>