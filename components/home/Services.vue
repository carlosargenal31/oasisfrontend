<template>
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Servicio 1: Comprar una propiedad -->
          <div class="flex flex-col items-center text-center">
            <div class="mb-6 w-full max-w-[250px]">
              <img src="~assets/images/buy.svg" alt="Comprar propiedad" class="w-full h-auto">
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-700">Comprar una Propiedad</h3>
            <p class="text-gray-700 mb-6 px-4">
                Encuentra la propiedad de tus sueños con nuestra amplia variedad de opciones. Explora propiedades en diferentes ubicaciones y precios, y descubre el hogar ideal para ti.
            </p>
            <router-link to="/properties/sale" class="text-[#1E3A8A] border-2 border-[#1E3A8A] font-semibold rounded-lg px-6 py-3 hover:bg-[#1E3A8A] hover:text-white transition duration-300">
              Buscar una propiedad
            </router-link>
          </div>
          
          <!-- Servicio 2: Vender una propiedad -->
          <div class="flex flex-col items-center text-center">
            <div class="mb-6 w-full max-w-[250px]">
              <img src="~assets/images/sell.svg" alt="Vender propiedad" class="w-full h-auto">
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-700">Vender una Propiedad</h3>
            <p class="text-gray-700 mb-6 px-4">
                Publica tu propiedad en nuestra plataforma y llega a miles de compradores interesados. Nuestro sistema te permite gestionar tu anuncio de manera fácil y rápida.
            </p>
            <router-link to="/properties/add-property" class="text-[#1E3A8A] border-2 border-[#1E3A8A] font-semibold rounded-lg px-6 py-3 hover:bg-[#1E3A8A] hover:text-white transition duration-300">
              Publicar anuncio
            </router-link>
          </div>
          
          <!-- Servicio 3: Alquilar una propiedad -->
          <div class="flex flex-col items-center text-center">
            <div class="mb-6 w-full max-w-[250px]">
              <img src="~assets/images/rent.svg" alt="Alquilar propiedad" class="w-full h-auto">
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-700">Alquilar una Propiedad</h3>
            <p class="text-gray-700 mb-6 px-4">
                Busca alquileres en tu zona de interés y encuentra la mejor opción según tu presupuesto y necesidades. Ofrecemos una gran variedad de propiedades en renta.
            </p>
            <router-link to="/properties/rent" class="text-[#1E3A8A] border-2 border-[#1E3A8A] font-semibold rounded-lg px-6 py-3 hover:bg-[#1E3A8A] hover:text-white transition duration-300">
              Buscar alquiler
            </router-link>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'ServicesComponent'
}
</script>

<style scoped>
h3 {
  color: #374151 !important;
}
p {
  color: #374151 !important;
}
a {
  color: #1E3A8A !important;
}
a:hover {
  color: white !important;
}
</style>