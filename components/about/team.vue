<script setup>
// No imports needed
</script>

<template>
    <!-- Meet our professional team-->
    <section class="container mb-5 pb-2 pb-lg-4">
        <div class="d-flex align-items-end justify-content-sm-between justify-content-center mb-3">
            <h2 class="h3 mb-0 text-sm-start text-center">Meet our professional team</h2>
        </div>
        <!-- Team grid-->
        <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
            <!-- Team member -->
            <div 
                class="card border-0 shadow-sm" 
                style="
                    background-color: white; 
                    border: 1px solid #e0e0e0 !important;
                "
            >
                <img 
                    class="card-img-top" 
                    src="~/assets/images/about/team/01.jpg" 
                    alt="Carlos Argeñal"
                    style="
                        width: 100%;
                        height: 400px;
                        object-fit: cover;
                        background-color: white;
                    "
                />
                <div class="card-body text-center">
                    <h3 class="h5 card-title mb-2">Carlos Argeñal</h3>
                    <span class="d-inline-block mb-3 fs-sm">Ingeniero en Informática</span>
                    <div class="pt-1">
                        <a 
                            class="btn btn-icon btn-xs rounded-circle shadow-sm mx-2" 
                            href="https://www.facebook.com/CarlosArgeñal" 
                            target="_blank"
                            style="
                                color: #333;
                                background-color: transparent;
                                border: 1px solid #ddd;
                            "
                        >
                            <i class="fi-facebook"></i>
                        </a>
                        <a 
                            class="btn btn-icon btn-xs rounded-circle shadow-sm mx-2" 
                            href="https://www.instagram.com/carlos_mauricio31" 
                            target="_blank"
                            style="
                                color: #333;
                                background-color: transparent;
                                border: 1px solid #ddd;
                            "
                        >
                            <i class="fi-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>