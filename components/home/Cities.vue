<script setup lang="ts">
import { ref } from 'vue';
// Eliminamos las importaciones de CSS de Swiper
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

const cities = ref([
  {
    name: 'Nueva York',
    image: '/images/cities/new-york.jpg',
    forSale: 893,
    forRent: 3756
  },
  {
    name: 'Chicago',
    image: '/images/cities/chicago.jpg',
    forSale: 268,
    forRent: 1540
  },
  {
    name: 'Los Ángeles',
    image: '/images/cities/los-angeles.jpg',
    forSale: 2750,
    forRent: 692
  },
  {
    name: 'San Diego',
    image: '/images/cities/san-diego.jpg',
    forSale: 1739,
    forRent: 1854
  },
  {
    name: 'Dallas',
    image: '/images/cities/dallas.jpg',
    forSale: 2567,
    forRent: 1204
  }
]);
</script>

<template>
  <!-- Buscar propiedad por ciudad (sección simplificada sin Swiper) -->
  <section class="container mb-5 pb-2">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h3 mb-0">Buscar propiedad por ciudad</h2>
      <router-link class="btn btn-link fw-normal ms-md-3 pb-0" to="/properties">
        Ver todo<i class="fi-arrow-long-right ms-2"></i>
      </router-link>
    </div>
    
    <!-- Grid estático en lugar de carrusel -->
    <div class="row g-4">
      <div v-for="(city, index) in cities" :key="index" class="col-lg-3 col-md-4 col-sm-6">
        <router-link class="card shadow-sm card-hover border-0" to="/properties">
          <div class="card-img-top card-img-hover">
            <span class="img-overlay opacity-65"></span>
            <img :src="city.image" :alt="city.name" class="card-img-top">
            <div class="content-overlay start-0 top-0 d-flex align-items-center justify-content-center w-100 h-100 p-3">
              <div class="w-100 p-1">
                <div class="mb-2">
                  <h4 class="mb-2 fs-xs fw-normal text-light">
                    <i class="fi-wallet mt-n1 me-2 fs-sm align-middle"></i>Propiedad en venta
                  </h4>
                  <div class="d-flex align-items-center">
                    <div class="progress progress-light w-100">
                      <div class="progress-bar bg-danger" role="progressbar" :style="`width: ${city.forSale / 30}%`" :aria-valuenow="city.forSale / 30" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span class="text-light fs-sm ps-1 ms-2">{{ city.forSale }}</span>
                  </div>
                </div>
                <div class="pt-1">
                  <h4 class="mb-2 fs-xs fw-normal text-light">
                    <i class="fi-home mt-n1 me-2 fs-sm align-middle"></i>Propiedad en alquiler
                  </h4>
                  <div class="d-flex align-items-center">
                    <div class="progress progress-light w-100">
                      <div class="progress-bar bg-success" role="progressbar" :style="`width: ${city.forRent / 40}%`" :aria-valuenow="city.forRent / 40" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span class="text-light fs-sm ps-1 ms-2">{{ city.forRent }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body text-center">
            <h3 class="mb-0 fs-base text-nav">{{ city.name }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.progress-light {
  background-color: rgba(255, 255, 255, 0.3);
  height: 6px;
  border-radius: 3px;
}

.card-img-hover {
  position: relative;
  overflow: hidden;
}

.card-img-hover img {
  transition: transform 0.3s ease-in-out;
}

.card-hover:hover .card-img-hover img {
  transform: scale(1.05);
}

.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
  transition: opacity 0.3s ease;
}

.content-overlay {
  position: relative;
  z-index: 1;
}
</style>