<template>
    <section class="py-16 bg-white dark:bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Lee los testimonios de nuestros clientes satisfechos que han encontrado sus propiedades ideales a través de OASIS.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.id" class="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-300 rounded-full mr-3 overflow-hidden">
                <img :src="testimonial.avatar" alt="Avatar" class="w-full h-full object-cover" />
              </div>
              <div>
                <h4 class="font-bold">{{ testimonial.name }}</h4>
                <p class="text-gray-500 text-sm">{{ testimonial.role }}</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              "{{ testimonial.comment }}"
            </p>
            <div class="mt-4 flex">
              <span v-for="i in 5" :key="i" :class="[
                'text-yellow-400', 
                i <= testimonial.rating ? 'fill-current' : 'stroke-current opacity-40'
              ]">
                ★
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Datos de ejemplo para testimonios
  const testimonials = ref([
    {
      id: 1,
      name: 'María Rodríguez',
      role: 'Compradora',
      avatar: '/images/avatar-1.jpg',
      comment: 'OASIS hizo que encontrar mi casa de ensueño fuera muy sencillo. Sus agentes fueron profesionales, conocedores y siempre disponibles para responder mis preguntas.',
      rating: 5
    },
    {
      id: 2,
      name: 'Juan Pérez',
      role: 'Propietario',
      avatar: '/images/avatar-2.jpg',
      comment: 'Vendí mi apartamento en tiempo récord y a un precio excelente. El equipo de OASIS es muy profesional y orientado a resultados.',
      rating: 4
    },
    {
      id: 3,
      name: 'Carlos González',
      role: 'Inversionista',
      avatar: '/images/avatar-3.jpg',
      comment: 'He realizado varias inversiones inmobiliarias a través de OASIS y siempre han sido exitosas. Su análisis de mercado y conocimiento local son insuperables.',
      rating: 5
    }
  ]);
  </script>