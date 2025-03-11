<template>
  <div class="home-page">
    <Hero />
    <Categories />
    <Services />
    <FeaturedProperties />
    <RecentlyAdded />
    <ConstCalculator />
    <Cities />
    <Partners />
    <Agents />
    <CallToAction />
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/home/Hero.vue';
import Categories from '~/components/home/Categories.vue';
import Services from '~/components/home/Services.vue';
import FeaturedProperties from '~/components/home/FeaturedProperties.vue';
//import RecentlyAdded from '~/components/home/RecentlyAdded.vue';
//import ConstCalculator from '~/components/home/ConstCalculator.vue';
import Cities from '~/components/home/Cities.vue';
//import Partners from '~/components/home/Partners.vue';
//import Agents from '~/components/home/Agents.vue';
import CallToAction from '~/components/home/CallToAction.vue';
</script>

<style>
@import '~/assets/css/home.css';
</style>