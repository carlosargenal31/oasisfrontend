<script setup lang="ts">
import { ref } from 'vue';

const properties = ref([
  {
    id: 1,
    title: 'Apartamento de 3 dormitorios | 67 m²',
    price: 1629,
    location: '3811 Ditmars Blvd Astoria, NY 11105',
    image: '/images/properties/property-1.jpg',
    beds: 3,
    baths: 2,
    cars: 2,
    type: 'rent',
    isVerified: true,
    isNew: true
  },
  {
    id: 2,
    title: 'Casa familiar | 120 m²',
    price: 84000,
    location: '67-04 Myrtle Ave Glendale, NY 11385',
    image: '/images/properties/property-2.jpg',
    beds: 4,
    baths: 2,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isFeatured: true
  },
  {
    id: 3,
    title: 'Alquiler en Greenpoint | 85 m²',
    price: 1330,
    location: '1510 Castle Hill Ave Bronx, NY 10462',
    image: '/images/properties/property-3.jpg',
    beds: 1,
    baths: 1,
    cars: 1,
    type: 'rent',
    isVerified: true
  },
  {
    id: 4,
    title: 'Estudio | 32 m²',
    price: 65000,
    location: '140-60 Beech Ave Flushing, NY 11355',
    image: '/images/properties/property-4.jpg',
    beds: 1,
    baths: 1,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isNew: true
  }
]);
</script>

<template>
  <!-- Ofertas destacadas -->
  <section class="container mb-5 pb-md-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h3 mb-0">Ofertas destacadas</h2>
      <router-link class="btn btn-link fw-normal p-0" to="/properties">
        Ver todo<i class="fi-arrow-long-right ms-2"></i>
      </router-link>
    </div>
    
    <div class="row g-4">
      <div v-for="property in properties" :key="property.id" class="col-sm-6 col-lg-3">
        <div class="card shadow-sm card-hover border-0 h-100">
          <!-- Imagen de la propiedad -->
          <div class="card-img-top card-img-hover">
            <router-link class="img-overlay" to="/properties/detail"></router-link>
            <div class="position-absolute start-0 top-0 pt-3 ps-3">
              <span v-if="property.isVerified" class="d-table badge bg-success mb-1">Verificada</span>
              <span v-if="property.isNew" class="d-table badge bg-info">Nueva</span>
              <span v-if="property.isFeatured" class="d-table badge bg-danger">Destacada</span>
            </div>
            <div class="content-overlay end-0 top-0 pt-3 pe-3">
              <button class="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button" title="Añadir a favoritos">
                <i class="fi-heart"></i>
              </button>
            </div>
            <img :src="property.image" :alt="property.title" class="card-img-top">
          </div>
          
          <!-- Detalles de la propiedad -->
          <div class="card-body position-relative pb-3">
            <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
              {{ property.type === 'rent' ? 'En alquiler' : 'En venta' }}
            </h4>
            <h3 class="h6 mb-2 fs-base">
              <router-link class="nav-link stretched-link" to="/properties/detail">{{ property.title }}</router-link>
            </h3>
            <p class="mb-2 fs-sm text-muted">{{ property.location }}</p>
            <div class="fw-bold">
              <i class="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i>
              {{ property.type === 'rent' ? '<script setup lang="ts">
import { ref } from 'vue';

const properties = ref([
  {
    id: 1,
    title: 'Apartamento de 3 dormitorios | 67 m²',
    price: 1629,
    location: '3811 Ditmars Blvd Astoria, NY 11105',
    image: '/images/properties/property-1.jpg',
    beds: 3,
    baths: 2,
    cars: 2,
    type: 'rent',
    isVerified: true,
    isNew: true
  },
  {
    id: 2,
    title: 'Casa familiar | 120 m²',
    price: 84000,
    location: '67-04 Myrtle Ave Glendale, NY 11385',
    image: '/images/properties/property-2.jpg',
    beds: 4,
    baths: 2,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isFeatured: true
  },
  {
    id: 3,
    title: 'Alquiler en Greenpoint | 85 m²',
    price: 1330,
    location: '1510 Castle Hill Ave Bronx, NY 10462',
    image: '/images/properties/property-3.jpg',
    beds: 1,
    baths: 1,
    cars: 1,
    type: 'rent',
    isVerified: true
  },
  {
    id: 4,
    title: 'Estudio | 32 m²',
    price: 65000,
    location: '140-60 Beech Ave Flushing, NY 11355',
    image: '/images/properties/property-4.jpg',
    beds: 1,
    baths: 1,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isNew: true
  }
]);
</script>

<template>
  <!-- Ofertas destacadas -->
  <section class="container mb-5 pb-md-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h3 mb-0">Ofertas destacadas</h2>
      <router-link class="btn btn-link fw-normal p-0" to="/properties">
        Ver todo<i class="fi-arrow-long-right ms-2"></i>
      </router-link>
    </div>
    
    <div class="row g-4">
      <div v-for="property in properties" :key="property.id" class="col-sm-6 col-lg-3">
        <div class="card shadow-sm card-hover border-0 h-100">
          <!-- Imagen de la propiedad -->
          <div class="card-img-top card-img-hover">
            <router-link class="img-overlay" to="/properties/detail"></router-link>
            <div class="position-absolute start-0 top-0 pt-3 ps-3">
              <span v-if="property.isVerified" class="d-table badge bg-success mb-1">Verificada</span>
              <span v-if="property.isNew" class="d-table badge bg-info">Nueva</span>
              <span v-if="property.isFeatured" class="d-table badge bg-danger">Destacada</span>
            </div>
            <div class="content-overlay end-0 top-0 pt-3 pe-3">
              <button class="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button" title="Añadir a favoritos">
                <i class="fi-heart"></i>
              </button>
            </div>
            <img :src="property.image" :alt="property.title" class="card-img-top">
          </div>
          
          <!-- Detalles de la propiedad -->
          <div class="card-body position-relative pb-3">
            <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
              {{ property.type === 'rent' ? 'En alquiler' : 'En venta' }}
            </h4>
            <h3 class="h6 mb-2 fs-base">
              <router-link class="nav-link stretche<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

const modules = ref([Navigation, Pagination]);

const swiperOptions = ref({
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    582: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1264: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});

const properties = ref([
  {
    id: 1,
    title: 'Apartamento de 3 dormitorios | 67 m²',
    price: 1629,
    location: '3811 Ditmars Blvd Astoria, NY 11105',
    image: '/images/properties/property-1.jpg',
    beds: 3,
    baths: 2,
    cars: 2,
    type: 'rent',
    isVerified: true,
    isNew: true
  },
  {
    id: 2,
    title: 'Casa familiar | 120 m²',
    price: 84000,
    location: '67-04 Myrtle Ave Glendale, NY 11385',
    image: '/images/properties/property-2.jpg',
    beds: 4,
    baths: 2,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isFeatured: true
  },
  {
    id: 3,
    title: 'Alquiler en Greenpoint | 85 m²',
    price: 1330,
    location: '1510 Castle Hill Ave Bronx, NY 10462',
    image: '/images/properties/property-3.jpg',
    beds: 1,
    baths: 1,
    cars: 1,
    type: 'rent',
    isVerified: true
  },
  {
    id: 4,
    title: 'Estudio | 32 m²',
    price: 65000,
    location: '140-60 Beech Ave Flushing, NY 11355',
    image: '/images/properties/property-4.jpg',
    beds: 1,
    baths: 1,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isNew: true
  },
  {
    id: 5,
    title: 'Casa de campo | 120 m²',
    price: 184000,
    location: '42 Broadway New York, NY 10004',
    image: '/images/properties/property-5.jpg',
    beds: 4,
    baths: 2,
    cars: 1,
    type: 'sale',
    isVerified: true
  }
]);
</script>

<template>
  <!-- Ofertas destacadas (carrusel) -->
  <section class="container mb-5 pb-md-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h3 mb-0">Ofertas destacadas</h2>
      <router-link class="btn btn-link fw-normal p-0" to="/properties">
        Ver todo<i class="fi-arrow-long-right ms-2"></i>
      </router-link>
    </div>
    
    <Swiper
      :modules="modules"
      :breakpoints="swiperOptions.breakpoints"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      :pagination="{ clickable: true }"
      :loop="true"
      class="py-4"
    >
      <SwiperSlide v-for="property in properties" :key="property.id">
        <div class="card shadow-sm card-hover border-0 h-100">
          <!-- Imagen de la propiedad -->
          <div class="card-img-top card-img-hover">
            <router-link class="img-overlay" to="/properties/detail"></router-link>
            <div class="position-absolute start-0 top-0 pt-3 ps-3">
              <span v-if="property.isVerified" class="d-table badge bg-success mb-1">Verificada</span>
              <span v-if="property.isNew" class="d-table badge bg-info">Nueva</span>
              <span v-if="property.isFeatured" class="d-table badge bg-danger">Destacada</span>
            </div>
            <div class="content-overlay end-0 top-0 pt-3 pe-3">
              <button class="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button" title="Añadir a favoritos">
                <i class="fi-heart"></i>
              </button>
            </div>
            <img :src="property.image" :alt="property.title" class="card-img-top">
          </div>
          
          <!-- Detalles de la propiedad -->
          <div class="card-body position-relative pb-3">
            <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
              {{ property.type === 'rent' ? 'En alquiler' : 'En venta' }}
            </h4>
            <h3 class="h6 mb-2 fs-base">
              <router-link class="nav-link stretched-link" to="/properties/detail">{{ property.title }}</router-link>
            </h3>
            <p class="mb-2 fs-sm text-muted">{{ property.location }}</p>
            <div class="fw-bold">
              <i class="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i>
              {{ property.type === 'rent' ? '$' + property.price : '$' + property.price.toLocaleString() }}
            </div>
          </div>
          
          <!-- Características de la propiedad -->
          <div class="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap">
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.beds }}<i class="fi-bed ms-1 mt-n1 fs-lg text-muted"></i></span>
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.baths }}<i class="fi-bath ms-1 mt-n1 fs-lg text-muted"></i></span>
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.cars }}<i class="fi-car ms-1 mt-n1 fs-lg text-muted"></i></span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    
    <!-- Controles del carrusel -->
    <div class="d-flex justify-content-center mt-3">
      <div class="swiper-button-prev me-3"></div>
      <div class="swiper-button-next"></div>
    </div>
  </section>
</template>

<style scoped>
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
  z-index: 1;
}

.content-overlay {
  position: absolute;
  z-index: 2;
}

.nav-link.stretched-link {
  color: inherit;
}

.nav-link.stretched-link:hover {
  color: #1e3a8a;
}
</style>
 + property.price : '<script setup lang="ts">
import { ref } from 'vue';

const properties = ref([
  {
    id: 1,
    title: 'Apartamento de 3 dormitorios | 67 m²',
    price: 1629,
    location: '3811 Ditmars Blvd Astoria, NY 11105',
    image: '/images/properties/property-1.jpg',
    beds: 3,
    baths: 2,
    cars: 2,
    type: 'rent',
    isVerified: true,
    isNew: true
  },
  {
    id: 2,
    title: 'Casa familiar | 120 m²',
    price: 84000,
    location: '67-04 Myrtle Ave Glendale, NY 11385',
    image: '/images/properties/property-2.jpg',
    beds: 4,
    baths: 2,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isFeatured: true
  },
  {
    id: 3,
    title: 'Alquiler en Greenpoint | 85 m²',
    price: 1330,
    location: '1510 Castle Hill Ave Bronx, NY 10462',
    image: '/images/properties/property-3.jpg',
    beds: 1,
    baths: 1,
    cars: 1,
    type: 'rent',
    isVerified: true
  },
  {
    id: 4,
    title: 'Estudio | 32 m²',
    price: 65000,
    location: '140-60 Beech Ave Flushing, NY 11355',
    image: '/images/properties/property-4.jpg',
    beds: 1,
    baths: 1,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isNew: true
  }
]);
</script>

<template>
  <!-- Ofertas destacadas -->
  <section class="container mb-5 pb-md-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h3 mb-0">Ofertas destacadas</h2>
      <router-link class="btn btn-link fw-normal p-0" to="/properties">
        Ver todo<i class="fi-arrow-long-right ms-2"></i>
      </router-link>
    </div>
    
    <div class="row g-4">
      <div v-for="property in properties" :key="property.id" class="col-sm-6 col-lg-3">
        <div class="card shadow-sm card-hover border-0 h-100">
          <!-- Imagen de la propiedad -->
          <div class="card-img-top card-img-hover">
            <router-link class="img-overlay" to="/properties/detail"></router-link>
            <div class="position-absolute start-0 top-0 pt-3 ps-3">
              <span v-if="property.isVerified" class="d-table badge bg-success mb-1">Verificada</span>
              <span v-if="property.isNew" class="d-table badge bg-info">Nueva</span>
              <span v-if="property.isFeatured" class="d-table badge bg-danger">Destacada</span>
            </div>
            <div class="content-overlay end-0 top-0 pt-3 pe-3">
              <button class="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button" title="Añadir a favoritos">
                <i class="fi-heart"></i>
              </button>
            </div>
            <img :src="property.image" :alt="property.title" class="card-img-top">
          </div>
          
          <!-- Detalles de la propiedad -->
          <div class="card-body position-relative pb-3">
            <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
              {{ property.type === 'rent' ? 'En alquiler' : 'En venta' }}
            </h4>
            <h3 class="h6 mb-2 fs-base">
              <router-link class="nav-link stretche<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

const modules = ref([Navigation, Pagination]);

const swiperOptions = ref({
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    582: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1264: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});

const properties = ref([
  {
    id: 1,
    title: 'Apartamento de 3 dormitorios | 67 m²',
    price: 1629,
    location: '3811 Ditmars Blvd Astoria, NY 11105',
    image: '/images/properties/property-1.jpg',
    beds: 3,
    baths: 2,
    cars: 2,
    type: 'rent',
    isVerified: true,
    isNew: true
  },
  {
    id: 2,
    title: 'Casa familiar | 120 m²',
    price: 84000,
    location: '67-04 Myrtle Ave Glendale, NY 11385',
    image: '/images/properties/property-2.jpg',
    beds: 4,
    baths: 2,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isFeatured: true
  },
  {
    id: 3,
    title: 'Alquiler en Greenpoint | 85 m²',
    price: 1330,
    location: '1510 Castle Hill Ave Bronx, NY 10462',
    image: '/images/properties/property-3.jpg',
    beds: 1,
    baths: 1,
    cars: 1,
    type: 'rent',
    isVerified: true
  },
  {
    id: 4,
    title: 'Estudio | 32 m²',
    price: 65000,
    location: '140-60 Beech Ave Flushing, NY 11355',
    image: '/images/properties/property-4.jpg',
    beds: 1,
    baths: 1,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isNew: true
  },
  {
    id: 5,
    title: 'Casa de campo | 120 m²',
    price: 184000,
    location: '42 Broadway New York, NY 10004',
    image: '/images/properties/property-5.jpg',
    beds: 4,
    baths: 2,
    cars: 1,
    type: 'sale',
    isVerified: true
  }
]);
</script>

<template>
  <!-- Ofertas destacadas (carrusel) -->
  <section class="container mb-5 pb-md-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h3 mb-0">Ofertas destacadas</h2>
      <router-link class="btn btn-link fw-normal p-0" to="/properties">
        Ver todo<i class="fi-arrow-long-right ms-2"></i>
      </router-link>
    </div>
    
    <Swiper
      :modules="modules"
      :breakpoints="swiperOptions.breakpoints"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      :pagination="{ clickable: true }"
      :loop="true"
      class="py-4"
    >
      <SwiperSlide v-for="property in properties" :key="property.id">
        <div class="card shadow-sm card-hover border-0 h-100">
          <!-- Imagen de la propiedad -->
          <div class="card-img-top card-img-hover">
            <router-link class="img-overlay" to="/properties/detail"></router-link>
            <div class="position-absolute start-0 top-0 pt-3 ps-3">
              <span v-if="property.isVerified" class="d-table badge bg-success mb-1">Verificada</span>
              <span v-if="property.isNew" class="d-table badge bg-info">Nueva</span>
              <span v-if="property.isFeatured" class="d-table badge bg-danger">Destacada</span>
            </div>
            <div class="content-overlay end-0 top-0 pt-3 pe-3">
              <button class="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button" title="Añadir a favoritos">
                <i class="fi-heart"></i>
              </button>
            </div>
            <img :src="property.image" :alt="property.title" class="card-img-top">
          </div>
          
          <!-- Detalles de la propiedad -->
          <div class="card-body position-relative pb-3">
            <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
              {{ property.type === 'rent' ? 'En alquiler' : 'En venta' }}
            </h4>
            <h3 class="h6 mb-2 fs-base">
              <router-link class="nav-link stretched-link" to="/properties/detail">{{ property.title }}</router-link>
            </h3>
            <p class="mb-2 fs-sm text-muted">{{ property.location }}</p>
            <div class="fw-bold">
              <i class="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i>
              {{ property.type === 'rent' ? '$' + property.price : '$' + property.price.toLocaleString() }}
            </div>
          </div>
          
          <!-- Características de la propiedad -->
          <div class="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap">
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.beds }}<i class="fi-bed ms-1 mt-n1 fs-lg text-muted"></i></span>
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.baths }}<i class="fi-bath ms-1 mt-n1 fs-lg text-muted"></i></span>
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.cars }}<i class="fi-car ms-1 mt-n1 fs-lg text-muted"></i></span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    
    <!-- Controles del carrusel -->
    <div class="d-flex justify-content-center mt-3">
      <div class="swiper-button-prev me-3"></div>
      <div class="swiper-button-next"></div>
    </div>
  </section>
</template>

<style scoped>
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
  z-index: 1;
}

.content-overlay {
  position: absolute;
  z-index: 2;
}

.nav-link.stretched-link {
  color: inherit;
}

.nav-link.stretched-link:hover {
  color: #1e3a8a;
}
</style>
 + property.price.toLocaleString() }}
            </div>
          </div>
          
          <!-- Características de la propiedad -->
          <div class="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap">
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.beds }}<i class="fi-bed ms-1 mt-n1 fs-lg text-muted"></i></span>
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.baths }}<i class="fi-bath ms-1 mt-n1 fs-lg text-muted"></i></span>
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.cars }}<i class="fi-car ms-1 mt-n1 fs-lg text-muted"></i></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
  z-index: 1;
}

.content-overlay {
  position: absolute;
  z-index: 2;
}

.nav-link.stretched-link {
  color: inherit;
}

.nav-link.stretched-link:hover {
  color: #1e3a8a;
}
</style>
<script setup lang="ts">
import { ref } from 'vue';

const properties = ref([
  {
    id: 1,
    title: 'Apartamento de 3 dormitorios | 67 m²',
    price: 1629,
    location: '3811 Ditmars Blvd Astoria, NY 11105',
    image: '/images/properties/property-1.jpg',
    beds: 3,
    baths: 2,
    cars: 2,
    type: 'rent',
    isVerified: true,
    isNew: true
  },
  {
    id: 2,
    title: 'Casa familiar | 120 m²',
    price: 84000,
    location: '67-04 Myrtle Ave Glendale, NY 11385',
    image: '/images/properties/property-2.jpg',
    beds: 4,
    baths: 2,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isFeatured: true
  },
  {
    id: 3,
    title: 'Alquiler en Greenpoint | 85 m²',
    price: 1330,
    location: '1510 Castle Hill Ave Bronx, NY 10462',
    image: '/images/properties/property-3.jpg',
    beds: 1,
    baths: 1,
    cars: 1,
    type: 'rent',
    isVerified: true
  },
  {
    id: 4,
    title: 'Estudio | 32 m²',
    price: 65000,
    location: '140-60 Beech Ave Flushing, NY 11355',
    image: '/images/properties/property-4.jpg',
    beds: 1,
    baths: 1,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isNew: true
  }
]);
</script>

<template>
  <!-- Ofertas destacadas -->
  <section class="container mb-5 pb-md-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h3 mb-0">Ofertas destacadas</h2>
      <router-link class="btn btn-link fw-normal p-0" to="/properties">
        Ver todo<i class="fi-arrow-long-right ms-2"></i>
      </router-link>
    </div>
    
    <div class="row g-4">
      <div v-for="property in properties" :key="property.id" class="col-sm-6 col-lg-3">
        <div class="card shadow-sm card-hover border-0 h-100">
          <!-- Imagen de la propiedad -->
          <div class="card-img-top card-img-hover">
            <router-link class="img-overlay" to="/properties/detail"></router-link>
            <div class="position-absolute start-0 top-0 pt-3 ps-3">
              <span v-if="property.isVerified" class="d-table badge bg-success mb-1">Verificada</span>
              <span v-if="property.isNew" class="d-table badge bg-info">Nueva</span>
              <span v-if="property.isFeatured" class="d-table badge bg-danger">Destacada</span>
            </div>
            <div class="content-overlay end-0 top-0 pt-3 pe-3">
              <button class="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button" title="Añadir a favoritos">
                <i class="fi-heart"></i>
              </button>
            </div>
            <img :src="property.image" :alt="property.title" class="card-img-top">
          </div>
          
          <!-- Detalles de la propiedad -->
          <div class="card-body position-relative pb-3">
            <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
              {{ property.type === 'rent' ? 'En alquiler' : 'En venta' }}
            </h4>
            <h3 class="h6 mb-2 fs-base">
              <router-link class="nav-link stretche<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

const modules = ref([Navigation, Pagination]);

const swiperOptions = ref({
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    582: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1264: {
      slidesPerView: 4,
      spaceBetween: 20
    }
  }
});

const properties = ref([
  {
    id: 1,
    title: 'Apartamento de 3 dormitorios | 67 m²',
    price: 1629,
    location: '3811 Ditmars Blvd Astoria, NY 11105',
    image: '/images/properties/property-1.jpg',
    beds: 3,
    baths: 2,
    cars: 2,
    type: 'rent',
    isVerified: true,
    isNew: true
  },
  {
    id: 2,
    title: 'Casa familiar | 120 m²',
    price: 84000,
    location: '67-04 Myrtle Ave Glendale, NY 11385',
    image: '/images/properties/property-2.jpg',
    beds: 4,
    baths: 2,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isFeatured: true
  },
  {
    id: 3,
    title: 'Alquiler en Greenpoint | 85 m²',
    price: 1330,
    location: '1510 Castle Hill Ave Bronx, NY 10462',
    image: '/images/properties/property-3.jpg',
    beds: 1,
    baths: 1,
    cars: 1,
    type: 'rent',
    isVerified: true
  },
  {
    id: 4,
    title: 'Estudio | 32 m²',
    price: 65000,
    location: '140-60 Beech Ave Flushing, NY 11355',
    image: '/images/properties/property-4.jpg',
    beds: 1,
    baths: 1,
    cars: 2,
    type: 'sale',
    isVerified: true,
    isNew: true
  },
  {
    id: 5,
    title: 'Casa de campo | 120 m²',
    price: 184000,
    location: '42 Broadway New York, NY 10004',
    image: '/images/properties/property-5.jpg',
    beds: 4,
    baths: 2,
    cars: 1,
    type: 'sale',
    isVerified: true
  }
]);
</script>

<template>
  <!-- Ofertas destacadas (carrusel) -->
  <section class="container mb-5 pb-md-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h3 mb-0">Ofertas destacadas</h2>
      <router-link class="btn btn-link fw-normal p-0" to="/properties">
        Ver todo<i class="fi-arrow-long-right ms-2"></i>
      </router-link>
    </div>
    
    <Swiper
      :modules="modules"
      :breakpoints="swiperOptions.breakpoints"
      :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
      :pagination="{ clickable: true }"
      :loop="true"
      class="py-4"
    >
      <SwiperSlide v-for="property in properties" :key="property.id">
        <div class="card shadow-sm card-hover border-0 h-100">
          <!-- Imagen de la propiedad -->
          <div class="card-img-top card-img-hover">
            <router-link class="img-overlay" to="/properties/detail"></router-link>
            <div class="position-absolute start-0 top-0 pt-3 ps-3">
              <span v-if="property.isVerified" class="d-table badge bg-success mb-1">Verificada</span>
              <span v-if="property.isNew" class="d-table badge bg-info">Nueva</span>
              <span v-if="property.isFeatured" class="d-table badge bg-danger">Destacada</span>
            </div>
            <div class="content-overlay end-0 top-0 pt-3 pe-3">
              <button class="btn btn-icon btn-light btn-xs text-primary rounded-circle" type="button" title="Añadir a favoritos">
                <i class="fi-heart"></i>
              </button>
            </div>
            <img :src="property.image" :alt="property.title" class="card-img-top">
          </div>
          
          <!-- Detalles de la propiedad -->
          <div class="card-body position-relative pb-3">
            <h4 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
              {{ property.type === 'rent' ? 'En alquiler' : 'En venta' }}
            </h4>
            <h3 class="h6 mb-2 fs-base">
              <router-link class="nav-link stretched-link" to="/properties/detail">{{ property.title }}</router-link>
            </h3>
            <p class="mb-2 fs-sm text-muted">{{ property.location }}</p>
            <div class="fw-bold">
              <i class="fi-cash mt-n1 me-2 lead align-middle opacity-70"></i>
              {{ property.type === 'rent' ? '$' + property.price : '$' + property.price.toLocaleString() }}
            </div>
          </div>
          
          <!-- Características de la propiedad -->
          <div class="card-footer d-flex align-items-center justify-content-center mx-3 pt-3 text-nowrap">
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.beds }}<i class="fi-bed ms-1 mt-n1 fs-lg text-muted"></i></span>
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.baths }}<i class="fi-bath ms-1 mt-n1 fs-lg text-muted"></i></span>
            <span class="d-inline-block mx-1 px-2 fs-sm">{{ property.cars }}<i class="fi-car ms-1 mt-n1 fs-lg text-muted"></i></span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    
    <!-- Controles del carrusel -->
    <div class="d-flex justify-content-center mt-3">
      <div class="swiper-button-prev me-3"></div>
      <div class="swiper-button-next"></div>
    </div>
  </section>
</template>

<style scoped>
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
  z-index: 1;
}

.content-overlay {
  position: absolute;
  z-index: 2;
}

.nav-link.stretched-link {
  color: inherit;
}

.nav-link.stretched-link:hover {
  color: #1e3a8a;
}
</style>