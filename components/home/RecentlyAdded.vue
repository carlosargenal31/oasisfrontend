<script setup lang="ts">
// Sin importaciones de imágenes, usaremos rutas relativas directamente en los estilos
</script>

<template>
  <!-- Propiedades añadidas recientemente -->
  <section class="container pb-4 pt-1 mb-5">
    <div class="d-flex align-items-end align-items-lg-center justify-content-between mb-4 pb-md-2">
      <div class="d-flex w-100 align-items-center justify-content-between justify-content-lg-start">
        <h2 class="h3 mb-0 me-md-4">Añadidas hoy</h2>
        
        <!-- Selector de categorías para móvil -->
        <div class="dropdown d-md-none">
          <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <span>Casas</span>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Apartamentos</a></li>
            <li><a class="dropdown-item active" href="#">Casas</a></li>
            <li><a class="dropdown-item" href="#">Habitaciones</a></li>
            <li><a class="dropdown-item" href="#">Comercial</a></li>
          </ul>
        </div>
        
        <!-- Pestañas para escritorio -->
        <ul class="nav nav-tabs d-none d-md-flex ps-lg-2 mb-0">
          <li class="nav-item"><a class="nav-link fs-sm mb-2 mb-md-0" href="#">Apartamentos</a></li>
          <li class="nav-item"><a class="nav-link fs-sm active mb-2 mb-md-0" href="#">Casas</a></li>
          <li class="nav-item"><a class="nav-link fs-sm mb-2 mb-md-0" href="#">Habitaciones</a></li>
          <li class="nav-item"><a class="nav-link fs-sm mb-2 mb-md-0" href="#">Comercial</a></li>
        </ul>
      </div>
      
      <router-link class="btn btn-link fw-normal d-none d-lg-block p-0" to="/properties">
        Ver todo<i class="fi-arrow-long-right ms-2"></i>
      </router-link>
    </div>
    
    <!-- Grid de propiedades recientes -->
    <div class="row g-4">
      <!-- Propiedad grande -->
      <div class="col-md-6">
        <div class="card bg-size-cover bg-position-center border-0 overflow-hidden h-100" style="background-image: url('/images/properties/property-1.jpg')">
          <span class="img-gradient-overlay"></span>
          <div class="card-body content-overlay pb-0">
            <div class="d-flex">
              <span class="badge bg-success fs-sm me-2">Verificada</span>
              <span class="badge bg-info fs-sm">Nueva</span>
            </div>
          </div>
          <div class="card-footer content-overlay border-0 pt-0 pb-4">
            <div class="d-sm-flex justify-content-between align-items-end pt-5 mt-2 mt-sm-5">
              <router-link class="text-decoration-none text-light pe-2" to="/properties/detail">
                <div class="fs-sm text-uppercase pt-2 mb-1">En alquiler</div>
                <h3 class="h5 text-light mb-1">Villa de lujo en alquiler</h3>
                <div class="fs-sm opacity-70">
                  <i class="fi-map-pin me-1"></i>Miami Beach, FL 33140
                </div>
              </router-link>
              <div class="btn-group ms-n2 ms-sm-0 mt-3">
                <router-link class="btn btn-primary px-3" to="/properties/detail" style="height: 2.75rem">Desde $3,850</router-link>
                <button class="btn btn-primary btn-icon border-end-0 border-top-0 border-bottom-0 border-light fs-sm" type="button">
                  <i class="fi-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Columna con dos propiedades pequeñas -->
      <div class="col-md-6">
        <!-- Propiedad 1 -->
        <div class="card bg-size-cover bg-position-center border-0 overflow-hidden mb-4" style="background-image: url('/images/properties/property-2.jpg')">
          <span class="img-gradient-overlay"></span>
          <div class="card-body content-overlay pb-0">
            <span class="badge bg-info fs-sm">Nueva</span>
          </div>
          <div class="card-footer content-overlay border-0 pt-0 pb-4">
            <div class="d-sm-flex justify-content-between align-items-end pt-5 mt-2 mt-sm-5">
              <router-link class="text-decoration-none text-light pe-2" to="/properties/detail">
                <div class="fs-sm text-uppercase pt-2 mb-1">En venta</div>
                <h3 class="h5 text-light mb-1">Dúplex con garaje</h3>
                <div class="fs-sm opacity-70">
                  <i class="fi-map-pin me-1"></i>Los Ángeles, CA 90027
                </div>
              </router-link>
              <div class="btn-group ms-n2 ms-sm-0 mt-3">
                <router-link class="btn btn-primary px-3" to="/properties/detail" style="height: 2.75rem">$200,410</router-link>
                <button class="btn btn-primary btn-icon border-end-0 border-top-0 border-bottom-0 border-light fs-sm" type="button">
                  <i class="fi-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Propiedad 2 -->
        <div class="card bg-size-cover bg-position-center border-0 overflow-hidden" style="background-image: url('/images/properties/property-3.jpg')">
          <span class="img-gradient-overlay"></span>
          <div class="card-body content-overlay pb-0">
            <span class="badge bg-info fs-sm">Nueva</span>
          </div>
          <div class="card-footer content-overlay border-0 pt-0 pb-4">
            <div class="d-sm-flex justify-content-between align-items-end pt-5 mt-2 mt-sm-5">
              <router-link class="text-decoration-none text-light pe-2" to="/properties/detail">
                <div class="fs-sm text-uppercase pt-2 mb-1">En venta</div>
                <h3 class="h5 text-light mb-1">Casa de campo</h3>
                <div class="fs-sm opacity-70">
                  <i class="fi-map-pin me-1"></i>San Diego, CA 92103
                </div>
              </router-link>
              <div class="btn-group ms-n2 ms-sm-0 mt-3">
                <router-link class="btn btn-primary px-3" to="/properties/detail" style="height: 2.75rem">$162,000</router-link>
                <button class="btn btn-primary btn-icon border-end-0 border-top-0 border-bottom-0 border-light fs-sm" type="button">
                  <i class="fi-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.img-gradient-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%);
}

.content-overlay {
  position: relative;
  z-index: 1;
}

.card {
  background-size: cover;
  background-position: center;
}

/* Estilos para los botones */
.btn-primary {
  background-color: #fd5631;
  border-color: #fd5631;
}

.btn-primary:hover {
  background-color: #15296b;
  border-color: #15296b;
}

.btn-link {
  color: #fd5631;
}

/* Estilos para las pestañas */
.nav-tabs .nav-link {
  color: #6c757d;
}

.nav-tabs .nav-link.active {
  color: #fd5631;
  border-color: transparent transparent #fd5631;
}

.nav-tabs .nav-link:hover {
  border-color: transparent transparent #fd5631;
}
</style>