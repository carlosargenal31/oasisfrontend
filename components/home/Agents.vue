<script setup lang="ts">
import { ref } from 'vue';

const agents = ref([
  {
    id: 1,
    name: 'Floyd Miles',
    position: 'Agente del Grupo Imperial Property',
    quote: 'Seleccionaré la mejor opción para ti',
    description: 'Con más de 10 años de experiencia en el mercado inmobiliario, me especializo en encontrar las mejores oportunidades para mis clientes. Mi objetivo es hacer que el proceso de compra o alquiler sea lo más sencillo posible.',
    image: '/images/agents/agent-1.jpg',
    reviews: 45,
    rating: 5
  },
  {
    id: 2,
    name: 'Guy Hawkins',
    position: 'Agente del Grupo Imperial Property',
    quote: 'No digo que no, encuentro la manera de hacerlo funcionar',
    description: 'Mi enfoque se basa en entender las necesidades de mis clientes y trabajar incansablemente para satisfacerlas. Con mi experiencia en el mercado inmobiliario, puedo ayudarte a encontrar la propiedad perfecta.',
    image: '/images/agents/agent-2.jpg',
    reviews: 16,
    rating: 5
  },
  {
    id: 3,
    name: 'Kristin Watson',
    position: 'Agente del Grupo Imperial Property',
    quote: 'Más de 10 años de experiencia como agente inmobiliario',
    description: 'Me apasiona ayudar a las personas a encontrar el hogar de sus sueños. Mi conocimiento del mercado local y mi dedicación a mis clientes me permiten ofrecer un servicio excepcional en cada transacción.',
    image: '/images/agents/agent-3.jpg',
    reviews: 24,
    rating: 5
  }
]);
</script>

<template>
  <!-- Sección de Agentes Inmobiliarios (sin carrusel) -->
  <section class="container mb-5 pb-2 pb-lg-4">
    <h2 class="h3 mb-4 pb-3 text-center text-md-start">Los mejores agentes inmobiliarios</h2>
    
    <div class="row g-4">
      <div v-for="agent in agents" :key="agent.id" class="col-md-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center p-4">
            <img :src="agent.image" alt="Foto del agente" class="rounded-circle mb-3" width="120" height="120">
            <h4 class="card-title h5 mb-2">{{ agent.name }}</h4>
            <p class="text-muted mb-3 small">{{ agent.position }}</p>
            
            <div class="mb-3">
              <div class="star-rating">
                <template v-for="i in 5" :key="i">
                  <i :class="[
                    'star-rating-icon',
                    i <= agent.rating ? 'fi-star-filled active' : 'fi-star'
                  ]"></i>
                </template>
              </div>
              <div class="text-muted fs-sm mt-1">{{ agent.reviews }} reseñas</div>
            </div>
            
            <blockquote class="blockquote mb-3">
              <p class="mb-0 fst-italic">"{{ agent.quote }}"</p>
            </blockquote>
            
            <p class="card-text small text-muted mb-4">{{ agent.description }}</p>
            
            <div class="d-flex justify-content-center">
              <a class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2" href="#">
                <i class="fi-facebook"></i>
              </a>
              <a class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2" href="#">
                <i class="fi-twitter"></i>
              </a>
              <a class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2" href="#">
                <i class="fi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.star-rating-icon {
  display: inline-block;
  margin-right: 2px;
  color: #bbb7c5;
}

.star-rating-icon.active {
  color: #fdbc31;
}

.blockquote {
  font-size: 1rem;
  border-left: 3px solid #1e3a8a;
  padding-left: 1rem;
}

.fi-facebook, .fi-twitter, .fi-linkedin {
  font-size: 16px;
  line-height: 1;
}

.btn-light-primary {
  background-color: #e9effd;
  color: #1e3a8a;
}

.btn-light-primary:hover {
  background-color: #d4e0fc;
}
</style>