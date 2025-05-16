<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 pb-20">
    <!-- Banner principal -->
    <section class="relative bg-gradient-to-r from-orange-500 to-red-600 py-20 text-white overflow-hidden">
      <div class="container mx-auto px-4 text-center relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">¡Descubre La Ceiba!</h1>
        <p class="text-xl opacity-90 mb-4 max-w-3xl mx-auto">
          Tu guía personal para experiencias únicas en la Novia de Honduras. Conocemos los mejores lugares y eventos en cada rincón de la ciudad.
        </p>
      </div>
      
      <!-- Elementos decorativos flotantes -->
      <div class="absolute right-0 top-0 h-full w-1/2 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="h-full">
          <path fill="white" d="M42.8,-76.4C54.9,-68.3,63.7,-55.2,71.3,-41.4C78.9,-27.6,85.3,-13.8,83.4,-1.1C81.5,11.6,71.3,23.2,62.2,34.6C53.1,46.1,45.2,57.3,34.4,65.9C23.6,74.4,11.8,80.3,-1.2,82.2C-14.2,84.2,-28.3,82.3,-40.5,75.6C-52.7,68.9,-62.9,57.5,-70.4,44.8C-77.9,32.1,-82.7,16,-82.1,0.3C-81.5,-15.4,-75.5,-30.8,-67.1,-44.2C-58.8,-57.5,-48.1,-68.8,-35.4,-76.5C-22.7,-84.3,-7.9,-88.5,4.4,-86.4C16.7,-84.2,30.7,-84.5,42.8,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div class="absolute left-0 bottom-0 h-full w-1/3 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="h-full">
          <path fill="white" d="M37.9,-65.1C50.4,-59.4,62.7,-51.4,72.1,-40.1C81.4,-28.8,87.9,-14.4,87.8,-0.1C87.7,14.3,81,28.5,71.8,40.1C62.6,51.6,50.8,60.4,38.1,67.7C25.4,75,12.7,80.9,-0.4,81.5C-13.4,82.1,-26.8,77.5,-39.9,70.7C-53,64,-65.8,55.2,-71.8,43.1C-77.8,31,-77,15.5,-75.9,0.6C-74.8,-14.3,-73.4,-28.5,-66.9,-40C-60.4,-51.5,-48.7,-60.2,-36.2,-65.9C-23.7,-71.5,-11.9,-74.1,0.6,-75.1C13,-76.1,25.9,-70.8,37.9,-65.1Z" transform="translate(100 100)" />
        </svg>
      </div>
    </section>

    <!-- Seguridad como prioridad -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Seguridad es nuestra prioridad</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Queremos que tengas una experiencia increible, pero siempre con las medidas necesarias para que todo funcione sin problemas.
        </p>
      </div>
    </section>

    <!-- Trabajo diario -->
    <section class="py-16 bg-orange-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Trabajo diario</h3>
          <p class="text-gray-600">
            Nuestro equipo trabaja constantemente para ofrecerte información actualizada y relevante sobre los mejores lugares y eventos en La Ceiba.
          </p>
        </div>
      </div>
    </section>

    <!-- Valores que nos guían -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Los valores que nos guían</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Precio justo -->
          <div class="bg-orange-50 p-6 rounded-xl shadow-md">
            <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <TagIcon :size="24" />
            </div>
            <h3 class="text-xl font-bold text-center text-gray-800 mb-2">Precio justo</h3>
            <p class="text-gray-600 text-center">
              Promovemos opciones para todos los presupuestos, destacando la mejor relación calidad-precio.
            </p>
          </div>
          
          <!-- Comunicación -->
          <div class="bg-orange-50 p-6 rounded-xl shadow-md">
            <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <MessageSquareIcon :size="24" />
            </div>
            <h3 class="text-xl font-bold text-center text-gray-800 mb-2">Comunicación</h3>
            <p class="text-gray-600 text-center">
              Escuchamos tus necesidades y nos aseguramos de que tu tiempo con nosotros sea bien invertido.
            </p>
          </div>
          
          <!-- Empatía -->
          <div class="bg-orange-50 p-6 rounded-xl shadow-md">
            <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <HeartIcon :size="24" />
            </div>
            <h3 class="text-xl font-bold text-center text-gray-800 mb-2">Empatía</h3>
            <p class="text-gray-600 text-center">
              Entendemos tus deseos como viajero y nos esforzamos por satisfacerlos.
            </p>
          </div>
          
          <!-- Pasión y entusiasmo -->
          <div class="bg-orange-50 p-6 rounded-xl shadow-md">
            <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ZapIcon :size="24" />
            </div>
            <h3 class="text-xl font-bold text-center text-gray-800 mb-2">Pasión y entusiasmo</h3>
            <p class="text-gray-600 text-center">
              Amamos La Ceiba y queremos compartir esa pasión contigo.
            </p>
          </div>
          
          <!-- Equipo orientado a resultados -->
          <div class="bg-orange-50 p-6 rounded-xl shadow-md">
            <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <AwardIcon :size="24" />
            </div>
            <h3 class="text-xl font-bold text-center text-gray-800 mb-2">Orientado a resultados</h3>
            <p class="text-gray-600 text-center">
              Nos enfocamos en brindarte soluciones que realmente mejoren tu experiencia.
            </p>
          </div>
          
          <!-- Soluciones simples -->
          <div class="bg-orange-50 p-6 rounded-xl shadow-md">
            <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <CheckCircleIcon :size="24" />
            </div>
            <h3 class="text-xl font-bold text-center text-gray-800 mb-2">Soluciones simples</h3>
            <p class="text-gray-600 text-center">
              Simplificamos la información para que encuentres lo que necesitas fácilmente.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Atrae nuevos clientes -->
    <section class="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">¡Atrae nuevos clientes con nuestro catálogo!</h2>
        
        <div class="max-w-4xl mx-auto">
          <p class="text-xl mb-8 text-center">
            Si tienes un negocio en La Ceiba, podemos ayudarte a llegar a más visitantes y turistas.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="flex items-start">
              <CheckIcon class="text-white mt-1 mr-2 flex-shrink-0" />
              <span>Mayor visibilidad para tu negocio</span>
            </div>
            <div class="flex items-start">
              <CheckIcon class="text-white mt-1 mr-2 flex-shrink-0" />
              <span>Conecta con turistas locales e internacionales</span>
            </div>
            <div class="flex items-start">
              <CheckIcon class="text-white mt-1 mr-2 flex-shrink-0" />
              <span>Promoción en eventos especiales</span>
            </div>
            <div class="flex items-start">
              <CheckIcon class="text-white mt-1 mr-2 flex-shrink-0" />
              <span>Actualización constante de información</span>
            </div>
            <div class="flex items-start">
              <CheckIcon class="text-white mt-1 mr-2 flex-shrink-0" />
              <span>Fácil acceso para tus clientes</span>
            </div>
            <div class="flex items-start">
              <CheckIcon class="text-white mt-1 mr-2 flex-shrink-0" />
              <span>Integración con redes sociales</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Preguntas frecuentes -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Preguntas frecuentes</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Categoría 1 -->
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">1. Empezando</h3>
            <div class="space-y-4">
              <div>
                <p class="font-medium text-gray-700">¿Cómo funciona la plataforma?</p>
                <p class="text-gray-600 mt-1">Explora lugares, eventos y servicios en La Ceiba según tus intereses.</p>
              </div>
              <div>
                <p class="font-medium text-gray-700">¿Es necesario registrarse?</p>
                <p class="text-gray-600 mt-1">No, pero al crear una cuenta puedes guardar tus favoritos.</p>
              </div>
            </div>
          </div>
          
          <!-- Categoría 2 -->
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">2. Alojamiento</h3>
            <div class="space-y-4">
              <div>
                <p class="font-medium text-gray-700">¿Dónde puedo encontrar hoteles?</p>
                <p class="text-gray-600 mt-1">Tenemos un listado completo de opciones para todos los presupuestos.</p>
              </div>
              <div>
                <p class="font-medium text-gray-700">¿Hay opciones de hospedaje económico?</p>
                <p class="text-gray-600 mt-1">Sí, incluimos hostales, pensiones y opciones de alquiler.</p>
              </div>
            </div>
          </div>
          
          <!-- Categoría 3 -->
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">3. Cuenta y perfil</h3>
            <div class="space-y-4">
              <div>
                <p class="font-medium text-gray-700">¿Cómo actualizo mi información?</p>
                <p class="text-gray-600 mt-1">Accede a tu perfil y edita los datos que necesites cambiar.</p>
              </div>
              <div>
                <p class="font-medium text-gray-700">¿Puedo compartir mis experiencias?</p>
                <p class="text-gray-600 mt-1">¡Claro! Fomentamos que los usuarios compartan sus reseñas.</p>
              </div>
            </div>
          </div>
          
          <!-- Categoría 4 -->
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">4. Privacidad y seguridad</h3>
            <div class="space-y-4">
              <div>
                <p class="font-medium text-gray-700">¿Cómo protegen mis datos?</p>
                <p class="text-gray-600 mt-1">Implementamos las mejores prácticas de seguridad digital.</p>
              </div>
              <div>
                <p class="font-medium text-gray-700">¿Qué información es pública?</p>
                <p class="text-gray-600 mt-1">Solo lo que tú decidas compartir en tu perfil público.</p>
              </div>
            </div>
          </div>
          
          <!-- Categoría 5 -->
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">5. Transacciones</h3>
            <div class="space-y-4">
              <div>
                <p class="font-medium text-gray-700">¿Puedo reservar a través de la plataforma?</p>
                <p class="text-gray-600 mt-1">Algunos establecimientos ofrecen reserva directa, otros te redirigen.</p>
              </div>
              <div>
                <p class="font-medium text-gray-700">¿Hay comisiones por reservar?</p>
                <p class="text-gray-600 mt-1">No cobramos comisiones por usar nuestra plataforma.</p>
              </div>
            </div>
          </div>
          
          <!-- Categoría 6 -->
          <div>
            <h3 class="text-xl font-bold text-gray-800 mb-4">6. Eventos</h3>
            <div class="space-y-4">
              <div>
                <p class="font-medium text-gray-700">¿Cómo sé qué eventos hay?</p>
                <p class="text-gray-600 mt-1">Tenemos un calendario actualizado con todos los eventos.</p>
              </div>
              <div>
                <p class="font-medium text-gray-700">¿Puedo promocionar mi evento?</p>
                <p class="text-gray-600 mt-1">Sí, contáctanos para incluir tu evento en nuestra plataforma.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de contacto -->
    <section class="py-16 bg-orange-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">¿Tienes más preguntas?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Contáctanos y te ayudaremos con cualquier duda sobre turismo en La Ceiba.
        </p>
        <button class="bg-orange-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-orange-700 transition shadow-lg">
          Contactar al equipo
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Check as CheckIcon,
  Tag as TagIcon,
  MessageSquare as MessageSquareIcon,
  Heart as HeartIcon,
  Zap as ZapIcon,
  Award as AwardIcon,
  CheckCircle as CheckCircleIcon
} from 'lucide-vue-next';
</script>

<style>
/* Estilos adicionales */
.transition {
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>