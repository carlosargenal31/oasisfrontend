<script setup>
// No imports needed
</script>

<template>
    <!-- Hear from our customers-->
    <section class="container mb-5 pb-xl-5 pb-md-2" style="background-color: white;">
        <h2 class="h3 mb-3 text-center">Hear from our customers</h2>
        <!-- Testimonials grid-->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 col-lg-10 mx-auto">
            <!-- Testimonial slide-->
            <div class="d-flex flex-column align-items-start mx-3 py-3">
                <img 
                    class="d-md-block d-none me-4 rounded-3 mb-3 w-full" 
                    src="~/assets/images/about/testimonials/01.jpg" 
                    alt="Customer image" 
                    style="
                        object-fit: cover;
                        height: 250px;
                        background-color: white; 
                        border: 1px solid #e0e0e0;
                    " 
                />
                <div class="card border-0 shadow-sm h-100" style="background-color: white; border: 1px solid #e0e0e0 !important;">
                    <blockquote class="blockquote card-body">
                        <p style="color: #333;">
                            Eu massa, pharetra massa integer. Sed molestie sollicitudin morbi ultrices. Odio is
                            euismodtelle faucibus. Venenatis nunc, tristique turpis cras sodales. In dui,
                            viverra et ac. Id justo, varius nunc, faucibus erat proin elit. Amet diam, aliquet
                            nec quis vel. Donec ut quisque in lorem sapien.
                        </p>
                        <footer class="d-flex align-items-center">
                            <img 
                                src="~/assets/images/about/testimonials/01.jpg" 
                                width="56" 
                                alt="Logo" 
                                style="
                                    background-color: white; 
                                    border: 1px solid #e0e0e0;
                                    object-fit: cover;
                                " 
                            />
                            <div class="ps-3">
                                <h6 class="fs-base mb-0">Zalo Tech Company</h6>
                                <div class="text-muted fw-normal fs-sm">Floyd Miles, Head of HR Department</div>
                            </div>
                        </footer>
                    </blockquote>
                </div>
            </div>
            <!-- Testimonial slide-->
            <div class="d-flex flex-column align-items-start mx-3 py-3">
                <img 
                    class="d-md-block d-none me-4 rounded-3 mb-3 w-full" 
                    src="~/assets/images/about/testimonials/02.jpg" 
                    alt="Customer image" 
                    style="
                        object-fit: cover;
                        height: 250px;
                        background-color: white; 
                        border: 1px solid #e0e0e0;
                    " 
                />
                <div class="card border-0 shadow-sm h-100" style="background-color: white; border: 1px solid #e0e0e0 !important;">
                    <blockquote class="blockquote card-body">
                        <p style="color: #333;">
                            Eu massa, pharetra massa integer. Sed molestie sollicitudin morbi ultrices. Odio is
                            euismodtelle faucibus. Venenatis nunc, tristique turpis cras sodales. In dui,
                            viverra et ac. Id justo, varius nunc, faucibus erat proin elit. Amet diam, aliquet
                            nec quis vel. Donec ut quisque in lorem sapien.
                        </p>
                        <footer class="d-flex align-items-center">
                            <img 
                                src="~/assets/images/about/testimonials/02.jpg" 
                                width="56" 
                                alt="Logo" 
                                style="
                                    background-color: white; 
                                    border: 1px solid #e0e0e0;
                                    object-fit: cover;
                                " 
                            />
                            <div class="ps-3">
                                <h6 class="fs-base mb-0">Elastic Inc.</h6>
                                <div class="text-muted fw-normal fs-sm">Guy Hawkins, Senior HR</div>
                            </div>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    </section>
</template>