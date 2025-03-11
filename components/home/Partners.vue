<script setup lang="ts">
import { ref } from 'vue';

const partners = ref([
  { id: 1, name: 'Partner 1', logo: '/images/partners/partner-1.svg' },
  { id: 2, name: 'Partner 2', logo: '/images/partners/partner-2.svg' },
  { id: 3, name: 'Partner 3', logo: '/images/partners/partner-3.svg' },
  { id: 4, name: 'Partner 4', logo: '/images/partners/partner-4.svg' },
  { id: 5, name: 'Partner 5', logo: '/images/partners/partner-5.svg' },
  { id: 6, name: 'Partner 6', logo: '/images/partners/partner-6.svg' }
]);
</script>

<template>
  <!-- Sección de partners (grid estático en lugar de carrusel) -->
  <section class="container mb-5 pb-2 pb-lg-4">
    <h2 class="h3 mb-4 text-center text-md-start">Nuestros colaboradores</h2>
    
    <div class="row g-4 justify-content-center">
      <div v-for="partner in partners" :key="partner.id" class="col-4 col-md-2">
        <div class="text-center">
          <a class="partner-item" href="#">
            <img :src="partner.logo" :alt="partner.name" class="img-fluid" width="196">
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partner-item {
  display: block;
  padding: 1rem;
  transition: transform 0.3s ease-in-out;
  filter: grayscale(100%);
  opacity: 0.6;
}

.partner-item:hover {
  transform: translateY(-5px);
  filter: grayscale(0%);
  opacity: 1;
}
</style>