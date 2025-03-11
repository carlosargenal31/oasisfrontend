<script setup>
// No imports needed
</script>

<template>
    <!-- Page header-->
    <section class="container mb-5 pb-2">
        <div class="row align-items-center justify-content-center">
            <!-- Hero content-->
            <div class="col-lg-4 col-md-5 col-sm-9 order-md-1 order-2 text-md-start text-center">
                <h1 class="mb-4">About Oasis</h1>
                <p class="mb-4 pb-3 fs-lg">We provide a complete service for the sale, purchase or rental of real estate. We have been operating more than 10 years. Search millions of apartments and houses on Oasis.</p>
                <nuxt-link class="btn btn-lg btn-primary" to="/pages/contact" style="background-color: #000; border-color: #000; color: white;">Contact us</nuxt-link>
            </div>
            <!-- Hero images-->
            <div class="col-lg-7 col-md-6 offset-md-1 col-12 order-md-2 order-1">
                <div class="row g-3">
                    <div class="col-12 mb-3">
                        <img class="rounded-3 w-100" src="~/assets/images/about/hero/01.jpg" alt="Oasis Real Estate" style="background-color: white; border: 1px solid #e0e0e0;" />
                    </div>
                    <div class="col-12">
                        <img class="rounded-3 w-100" src="~/assets/images/about/hero/02.jpg" alt="Oasis Real Estate" style="background-color: white; border: 1px solid #e0e0e0;" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
section {
    background-color: white;
}

h1, p {
    color: #333;
}
</style>