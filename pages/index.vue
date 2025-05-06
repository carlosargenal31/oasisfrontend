<template>
  <div class="home-page">
    <Hero />
    <Categories />
    <Stay />
    <Eat />
    <Events />
    <Blog />
    
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/home/Hero.vue';
import Categories from '~/components/home/Categories.vue';
import Stay from '~/components/home/Stay.vue';
import Eat from '~/components/home/Eat.vue';
import Events from '~/components/home/Events.vue';
import Blog from '~/components/home/Blog.vue';
//import Cities from '~/components/home/Cities.vue';
//import Partners from '~/components/home/Partners.vue';
//import Agents from '~/components/home/Agents.vue';
//import CallToAction from '~/components/home/CallToAction.vue';
</script>

<style>
@import '~/assets/css/home.css';
/* Estilos globales para la página de inicio */

/* Asegurarse de que no haya divisiones azules entre secciones */
.home-page {
  background-color: white;
}

/* Forzar que el texto del hero sea blanco */
.home-page h1 {
  color: white !important;
  font-weight: 900 !important; /* El máximo peso posible */
}



/* Eliminar cualquier división o separador azul */
.divide-y,
.divide-x,
hr,
.border-t,
.border-b {
  border-color: white !important;
}

/* Asegurar transición suave entre secciones */
section + section {
  margin-top: -1px;
}
</style>