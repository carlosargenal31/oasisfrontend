<template>
  <!-- Calculadora de costos de propiedad -->
  <section class="container mb-5 pb-2 pb-lg-4">
    <div class="row align-items-center">
      <div class="col-md-5">
        <!-- Eliminamos la referencia a la imagen que no existe -->
        <div class="d-flex justify-content-center align-items-center" style="height: 250px; background-color: #f5f7fa; border-radius: 8px;">
          <div class="text-center">
            <i class="fi-calculator" style="font-size: 48px; color: #1e3a8a;"></i>
            <p class="mt-2">Calculadora de propiedades</p>
          </div>
        </div>
      </div>
      <div class="col-xxl-6 col-md-7 text-md-start text-center">
        <h2>Calcula el costo de tu propiedad</h2>
        <p class="pb-3 fs-lg">
          La valoración inmobiliaria es un procedimiento que permite determinar el valor medio de mercado
          de un inmueble (apartamento, casa, terreno, etc.). Calcula el costo de tu propiedad con
          nuestro nuevo Servicio de Cálculo.
        </p>
        <button class="btn btn-lg btn-primary" data-bs-target="#cost-calculator" data-bs-toggle="modal">
          <i class="fi-calculator me-2"></i>Calcular
        </button>
      </div>
    </div>
  </section>

  <!-- Modal de calculadora de costos -->
  <div class="modal fade" id="cost-calculator" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header d-block position-relative border-0 px-sm-5 px-4">
          <h3 class="h4 modal-title mt-4 text-center">Explora el valor de tu propiedad</h3>
          <button class="btn-close position-absolute top-0 end-0 mt-3 me-3" type="button" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body px-sm-5 px-4">
          <form class="needs-validation" novalidate>
            <div class="mb-3">
              <label class="form-label fw-bold mb-2" for="property-city">Ubicación de la propiedad</label>
              <select class="form-select" id="property-city" required>
                <option value="" selected disabled hidden>Selecciona la ciudad</option>
                <option value="Chicago">Chicago</option>
                <option value="Dallas">Dallas</option>
                <option value="Los Angeles">Los Ángeles</option>
                <option value="New York">Nueva York</option>
                <option value="San Diego">San Diego</option>
                <option value="Miami">Miami</option>
              </select>
              <div class="invalid-feedback">Por favor selecciona una ciudad.</div>
            </div>
            
            <div class="mb-3">
              <select class="form-select" id="property-district" required>
                <option value="" selected disabled hidden>Selecciona el distrito</option>
                <option value="Brooklyn">Brooklyn</option>
                <option value="Manhattan">Manhattan</option>
                <option value="Staten Island">Staten Island</option>
                <option value="The Bronx">The Bronx</option>
                <option value="Queens">Queens</option>
              </select>
              <div class="invalid-feedback">Por favor selecciona un distrito.</div>
            </div>
            
            <div class="pt-2 mb-3">
              <label class="form-label fw-bold mb-2" for="property-address">Dirección</label>
              <input class="form-control" type="text" id="property-address" placeholder="Introduce la dirección" required />
              <div class="invalid-feedback">Por favor introduce la dirección de la propiedad.</div>
            </div>
            
            <div class="pt-2 mb-3">
              <label class="form-label fw-bold mb-2">Número de habitaciones</label>
              <div class="btn-group w-100" role="group" aria-label="Número de habitaciones">
                <input class="btn-check" type="radio" id="rooms-1" name="rooms" />
                <label class="btn btn-outline-secondary" for="rooms-1">1</label>
                <input class="btn-check" type="radio" id="rooms-2" name="rooms" />
                <label class="btn btn-outline-secondary" for="rooms-2">2</label>
                <input class="btn-check" type="radio" id="rooms-3" name="rooms" />
                <label class="btn btn-outline-secondary" for="rooms-3">3</label>
                <input class="btn-check" type="radio" id="rooms-4" name="rooms" />
                <label class="btn btn-outline-secondary" for="rooms-4">4</label>
                <input class="btn-check" type="radio" id="rooms-5" name="rooms" />
                <label class="btn btn-outline-secondary" for="rooms-5">5+</label>
              </div>
            </div>
            
            <div class="pt-2 mb-4">
              <label class="form-label fw-bold mb-2" for="property-area">Área total (m²)</label>
              <input class="form-control" type="text" id="property-area" placeholder="Introduce el área" required />
              <div class="invalid-feedback">Por favor introduce el área de la propiedad.</div>
            </div>
            
            <button class="btn btn-primary d-block w-100 mb-4" type="submit">
              <i class="fi-calculator me-2"></i>Calcular
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Sin importaciones de imágenes
</script>