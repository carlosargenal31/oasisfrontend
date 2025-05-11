<template>
  <div class="container mx-auto px-4 py-8 bg-white booking-page pt-20">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
      <div class="spinner border-4 border-gray-200 border-t-orange-800 rounded-full w-10 h-10 animate-spin"></div>
      <p class="text-xl text-black ml-4">Cargando información de la propiedad...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="flex flex-col justify-center items-center min-h-[400px]">
      <p class="text-xl text-red-600 mb-4">{{ error }}</p>
      <button @click="fetchPropertyData" class="bg-orange-800 text-white py-2 px-4 rounded hover:bg-orange-900">
        Intentar de nuevo
      </button>
    </div>

    <!-- Contenido cuando los datos están cargados -->
    <div v-else-if="property" class="booking-content">
      <!-- Breadcrumb -->
      <div class="breadcrumb flex items-center mb-4 text-sm">
        <a href="/" class="text-black hover:text-orange-800">Inicio</a>
        <span class="mx-2 text-black">›</span>
        <a :href="`/properties/${property.id}`" class="text-black hover:text-orange-800">{{ property.title }}</a>
        <span class="mx-2 text-black">›</span>
        <span class="text-black">{{ isPropertyForSale ? 'Compra' : 'Reserva' }}</span>
      </div>

      <h1 class="text-3xl font-bold text-black mb-4">
        {{ isPropertyForSale ? 'Comprar propiedad' : 'Reservar propiedad' }}
      </h1>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Columna izquierda - Formulario de reserva/compra -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <!-- Información de la propiedad seleccionada -->
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center">
                <img 
                  :src="property.image || getPropertyImage(1)" 
                  :alt="property.title" 
                  class="w-20 h-20 object-cover rounded-md mr-4"
                >
                <div>
                  <h2 class="text-xl font-bold text-black">{{ property.title }}</h2>
                  <p class="text-gray-600">{{ property.address }}, {{ property.city }}</p>
                  <div class="mt-1 flex items-center">
                    <span class="text-black font-bold text-lg">L {{ formatPrice(property.price) }}</span>
                    <span class="text-black ml-1" v-if="!isPropertyForSale">/mes</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Formulario de reserva o compra -->
            <template v-if="isPropertyForSale">
              <!-- Formulario de compra para propiedades en venta -->
              <form @submit.prevent="submitPurchase" class="p-6">
                <h3 class="text-lg font-semibold text-black mb-4">Información del comprador</h3>
                <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-black mb-2">Nombre completo <span class="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      v-model="purchaseData.buyer_name" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black" 
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-black mb-2">Correo electrónico <span class="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      v-model="purchaseData.buyer_email" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black" 
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-black mb-2">Teléfono <span class="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      v-model="purchaseData.buyer_phone" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black" 
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-black mb-2">Método de financiamiento <span class="text-red-500">*</span></label>
                    <select 
                      v-model="purchaseData.financing_method" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                      required
                    >
                      <option value="cash">Pago al contado</option>
                      <option value="bank_loan">Préstamo bancario</option>
                      <option value="developer_financing">Financiamiento del desarrollador</option>
                    </select>
                  </div>
                </div>

                <h3 class="text-lg font-semibold text-black mb-4">Información adicional</h3>
                <div class="mb-6">
                  <textarea 
                    v-model="purchaseData.additional_info" 
                    rows="3" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    placeholder="Indique cualquier solicitud o comentario adicional..."
                  ></textarea>
                </div>

                <div class="flex items-center mb-6">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    v-model="purchaseData.terms_accepted"
                    class="mr-2" 
                    required
                  >
                  <label for="terms" class="text-black">
                    Acepto los <a href="#" class="text-orange-800 hover:underline">términos y condiciones</a> y la 
                    <a href="#" class="text-orange-800 hover:underline">política de privacidad</a>.
                  </label>
                </div>

                <!-- Botón para continuar al pago para compra -->
                <button 
                  type="submit" 
                  class="w-full bg-orange-800 text-white font-medium py-3 px-4 rounded hover:bg-orange-900 transition"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">
                    <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Procesando...
                  </span>
                  <span v-else>Continuar al pago</span>
                </button>
              </form>
            </template>
            <template v-else>
              <!-- Formulario original de reserva para propiedades en renta -->
              <form @submit.prevent="submitBooking" class="p-6">
                <h3 class="text-lg font-semibold text-black mb-4">Información del inquilino</h3>
                <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-black mb-2">Nombre completo <span class="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      v-model="bookingData.guest_name" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black" 
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-black mb-2">Correo electrónico <span class="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      v-model="bookingData.guest_email" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black" 
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-black mb-2">Teléfono <span class="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      v-model="bookingData.guest_phone" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black" 
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-black mb-2">Número de ocupantes <span class="text-red-500">*</span></label>
                    <select 
                      v-model="bookingData.guests" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                      required
                    >
                      <option v-for="n in maxGuests" :key="n" :value="n">{{ n }}</option>
                    </select>
                  </div>
                </div>

                <h3 class="text-lg font-semibold text-black mb-4">Fechas de arrendamiento</h3>
                <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-black mb-2">Fecha de inicio <span class="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      v-model="bookingData.check_in_date" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                      :min="minCheckInDate"
                      @change="updateDuration"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-black mb-2">Fecha de finalización <span class="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      v-model="bookingData.check_out_date" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                      :min="minCheckOutDate"
                      @change="updateDuration"
                      required
                    >
                  </div>
                </div>

                <div v-if="durationText" class="p-3 bg-orange-50 rounded-md mb-6 text-black">
                  <span class="font-medium">Duración del contrato:</span> {{ durationText }}
                </div>

                <h3 class="text-lg font-semibold text-black mb-4">Comentarios adicionales</h3>
                <div class="mb-6">
                  <textarea 
                    v-model="bookingData.special_requests" 
                    rows="3" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    placeholder="Indique cualquier solicitud o comentario adicional..."
                  ></textarea>
                </div>

                <div class="flex items-center mb-6">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    v-model="bookingData.terms_accepted"
                    class="mr-2" 
                    required
                  >
                  <label for="terms" class="text-black">
                    Acepto los <a href="#" class="text-orange-800 hover:underline">términos y condiciones</a> y la 
                    <a href="#" class="text-orange-800 hover:underline">política de privacidad</a>.
                  </label>
                </div>

                <!-- Botón para continuar al pago -->
                <button 
                  type="submit" 
                  class="w-full bg-orange-800 text-white font-medium py-3 px-4 rounded hover:bg-orange-900 transition"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting">
                    <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Procesando...
                  </span>
                  <span v-else>Continuar al pago</span>
                </button>
              </form>
            </template>
          </div>
        </div>

        <!-- Columna derecha - Resumen de reserva o compra -->
        <div class="lg:w-1/3">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-bold text-black">
                {{ isPropertyForSale ? 'Resumen de compra' : 'Resumen de reserva' }}
              </h2>
            </div>

            <div class="p-6">
              <div class="mb-4">
                <h3 class="font-semibold text-black mb-2">Detalles de la propiedad</h3>
                <div class="flex justify-between text-black mb-1">
                  <span>Tipo:</span>
                  <span class="font-medium">{{ translatePropertyType(property.property_type) }}</span>
                </div>
                <div class="flex justify-between text-black mb-1">
                  <span>Área:</span>
                  <span class="font-medium">{{ property.square_feet }} m²</span>
                </div>
                <div class="flex justify-between text-black mb-1">
                  <span>Habitaciones:</span>
                  <span class="font-medium">{{ property.bedrooms }}</span>
                </div>
                <div class="flex justify-between text-black">
                  <span>Baños:</span>
                  <span class="font-medium">{{ property.bathrooms }}</span>
                </div>
              </div>

              <div class="border-t border-b border-gray-200 py-4 my-4">
                <h3 class="font-semibold text-black mb-2">Costos</h3>
                <template v-if="isPropertyForSale">
                  <!-- Costos para compra -->
                  <div class="flex justify-between text-black mb-1">
                    <span>Precio de venta:</span>
                    <span class="font-medium">L {{ formatPrice(property.price) }}</span>
                  </div>
                </template>
                <template v-else>
                  <!-- Costos para renta -->
                  <div class="flex justify-between text-black mb-1">
                    <span>Renta mensual:</span>
                    <span class="font-medium">L {{ formatPrice(property.price) }}</span>
                  </div>
                  <div class="flex justify-between text-black mb-1">
                    <span>Depósito de seguridad:</span>
                    <span class="font-medium">L {{ formatPrice(property.price) }}</span>
                  </div>
                  <div v-if="rentalMonths > 0" class="flex justify-between text-black mb-1 pt-2 border-t border-gray-200 mt-2">
                    <span>Contrato por {{ rentalMonths }} meses:</span>
                    <span class="font-medium">L {{ formatPrice(property.price * rentalMonths) }}</span>
                  </div>
                </template>
              </div>

              <!-- Total a pagar -->
              <div class="bg-gray-50 p-4 rounded-md">
                <div class="flex justify-between mb-2">
                  <span class="text-lg font-bold text-black">Total a pagar:</span>
                  <span class="text-lg font-bold text-black">
                    L {{ formatPrice(isPropertyForSale ? property.price : totalAmount) }}
                  </span>
                </div>
                <p class="text-sm text-black">
                  <template v-if="isPropertyForSale">
                    * Pago completo por la compra de la propiedad
                  </template>
                  <template v-else>
                    * Incluye primer mes de renta + depósito de seguridad
                  </template>
                </p>
              </div>

              <!-- Políticas -->
              <div class="mt-6 text-sm">
                <h4 class="font-semibold text-black mb-2">Política de cancelación</h4>
                <template v-if="isPropertyForSale">
                  <p class="text-black mb-4">En caso de cancelación después de realizar el pago, se aplicará una penalización del 5% del valor total. Para iniciar el proceso de reembolso, contacte a nuestro equipo de atención al cliente.</p>
                </template>
                <template v-else>
                  <p class="text-black mb-4">Cancelación gratuita hasta 48 horas antes del inicio del contrato. Después de este periodo, se cobrará el equivalente a un mes de renta.</p>
                </template>
                
                <h4 class="font-semibold text-black mb-2">
                  {{ isPropertyForSale ? 'Proceso de compra' : 'Depósito de seguridad' }}
                </h4>
                <template v-if="isPropertyForSale">
                  <p class="text-black">Una vez realizado el pago completo, un asesor se pondrá en contacto dentro de las siguientes 24 horas para coordinar la firma de escrituras y entrega de la propiedad.</p>
                </template>
                <template v-else>
                  <p class="text-black">El depósito de seguridad será reembolsado al finalizar el contrato, después de verificar que no hay daños en la propiedad.</p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Si no hay ID de propiedad mostrar mensaje para seleccionar una propiedad -->
    <div v-else class="text-center py-10">
      <p class="text-xl text-black mb-4">Por favor, seleccione una propiedad para realizar una reserva</p>
      <a href="/properties/rent" class="bg-orange-800 hover:bg-orange-900 text-white font-medium py-2 px-4 rounded inline-block">
        Ver propiedades disponibles
      </a>
    </div>

    <!-- Modal de error -->
    <div v-if="showErrorModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-md p-6">
        <div class="text-center mb-6">
          <span class="material-icons text-6xl text-red-500 mb-4">error_outline</span>
          <h2 class="text-2xl font-bold text-black mb-2">Error</h2>
          <p class="text-black">{{ errorMessage }}</p>
        </div>
        
        <button 
          @click="showErrorModal = false" 
          class="w-full bg-orange-800 text-white font-medium py-3 px-4 rounded hover:bg-orange-900 transition"
        >
          Entendido
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '~/store/auth'; // Asegúrate de ajustar la ruta si es necesario

// Definir la URL base de la API
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

// Inicializar router
const route = useRoute();
const router = useRouter();

// Obtener ID de la propiedad de los parámetros de la ruta
const propertyId = computed(() => route.params.id || route.query.propertyId);

// Auth store para manejo de usuario
const authStore = useAuthStore();
const currentUser = computed(() => authStore.user);
const isAuthenticated = computed(() => authStore.isAuthenticated);

// Variables de estado
const isLoading = ref(true);
const error = ref(null);
const property = ref(null);
const isSubmitting = ref(false);
const rentalMonths = ref(6); // Por defecto 6 meses
const showErrorModal = ref(false);
const errorMessage = ref('');

// Determinar si la propiedad es para venta
const isPropertyForSale = computed(() => {
  if (!property.value) return false;
  return property.value.status === 'for-sale';
});

// Datos para la compra de propiedad
const purchaseData = ref({
  property_id: null,
  buyer_name: '',
  buyer_email: '',
  buyer_phone: '',
  financing_method: 'bank_loan',
  additional_info: '',
  terms_accepted: false
});

// Formato de fecha
const formatDate = (date) => {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

// Fecha actual y mínima para el check-in
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const minCheckInDate = computed(() => {
  // Permitir cualquier fecha
  return '2000-01-01';
});

const minCheckOutDate = computed(() => {
  // Permitir cualquier fecha posterior a la fecha de entrada
  return bookingData.value.check_in_date || '2000-01-01';
});

// Número máximo de ocupantes
const maxGuests = computed(() => {
  if (!property.value) return 4;
  return property.value.max_guests || property.value.bedrooms * 2 || 4;
});

// Datos para la reserva
const bookingData = ref({
  property_id: null,
  guest_name: '',
  guest_email: '',
  guest_phone: '',
  check_in_date: formatDate(tomorrow),
  // Por defecto 6 meses después
  check_out_date: formatDate(new Date(tomorrow.getFullYear(), tomorrow.getMonth() + 6, tomorrow.getDate())),
  guests: 2,
  special_requests: '',
  terms_accepted: false
});

// Texto de duración del contrato
const durationText = computed(() => {
  if (!bookingData.value.check_in_date || !bookingData.value.check_out_date) return '';
  
  const startDate = new Date(bookingData.value.check_in_date);
  const endDate = new Date(bookingData.value.check_out_date);
  
  if (endDate <= startDate) return '';
  
  // Calcular la diferencia en meses
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
              (endDate.getMonth() - startDate.getMonth());
  
  // Actualizar los meses de renta
  rentalMonths.value = months;
  
  if (months < 1) {
    const days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    return `${days} días`;
  } else if (months === 1) {
    return '1 mes';
  } else {
    return `${months} meses`;
  }
});

// Total a pagar inicialmente (primer mes + depósito)
const totalAmount = computed(() => {
  if (!property.value) return 0;
  return property.value.price * 2; // Primer mes + depósito
});

// Traducir tipo de propiedad
const translatePropertyType = (type) => {
  const types = {
    'apartment': 'Apartamento',
    'house': 'Casa',
    'room': 'Habitación',
    'office': 'Oficina',
    'commercial': 'Local comercial',
    'land': 'Terreno'
  };
  
  return types[type] || type;
};

// Formatear precio
const formatPrice = (price) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Obtener imagen de la propiedad
const getPropertyImage = (index) => {
  return `https://oasiscontenedor.blob.core.windows.net/business-images/${String(index).padStart(2, '0')}.jpg`;
};

// Función para validar los datos de la reserva antes de enviarlos
const validateBookingData = () => {
  const errors = [];
  
  // Validar nombre del huésped
  if (!bookingData.value.guest_name || bookingData.value.guest_name.trim().length < 3) {
    errors.push('Nombre completo del inquilino es requerido');
  }
  
  // Validar email (usando una expresión regular más robusta)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!bookingData.value.guest_email || !emailRegex.test(bookingData.value.guest_email)) {
    errors.push('Correo electrónico inválido');
  }
  
  // Validar teléfono (al menos 8 dígitos, puede incluir +, espacios, paréntesis y guiones)
  const phoneRegex = /^[\d\s\+\(\)\-]{8,15}$/;
  if (!bookingData.value.guest_phone || !phoneRegex.test(bookingData.value.guest_phone)) {
    errors.push('Número telefónico inválido');
  }
  
  // Validar fechas
  if (!bookingData.value.check_in_date) {
    errors.push('Fecha de inicio requerida');
  }
  
  if (!bookingData.value.check_out_date) {
    errors.push('Fecha de finalización requerida');
  }
  
  // Verificar que la fecha de inicio sea antes que la de finalización
  if (bookingData.value.check_in_date && bookingData.value.check_out_date) {
    const checkIn = new Date(bookingData.value.check_in_date);
    const checkOut = new Date(bookingData.value.check_out_date);
    
    // Verificar fechas válidas
    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      errors.push('Las fechas seleccionadas no son válidas');
    } else {
      // Asegurarse que check-out sea posterior a check-in
      if (checkOut <= checkIn) {
        errors.push('La fecha de finalización debe ser posterior a la fecha de inicio');
      }
      
      // Verificar que el período no sea excesivamente largo
      const diffTime = Math.abs(checkOut - checkIn);
      const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);
      
      if (diffMonths > 36) { // Máximo 3 años
        errors.push('El período máximo de arrendamiento es de 36 meses');
      }
    }
  }
  
  // Validar número de huéspedes
  if (!bookingData.value.guests || bookingData.value.guests < 1) {
    errors.push('Debe indicar al menos 1 ocupante');
  } else if (bookingData.value.guests > maxGuests.value) {
    errors.push(`El número máximo de ocupantes permitido es ${maxGuests.value}`);
  }
  
  // Verificar términos y condiciones
  if (!bookingData.value.terms_accepted) {
    errors.push('Debe aceptar los términos y condiciones');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

// Función para validar los datos de comp
// Función para validar los datos de compra
const validatePurchaseData = () => {
  const errors = [];
  
  // Validar nombre del comprador
  if (!purchaseData.value.buyer_name || purchaseData.value.buyer_name.trim().length < 3) {
    errors.push('Nombre completo del comprador es requerido');
  }
  
  // Validar email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!purchaseData.value.buyer_email || !emailRegex.test(purchaseData.value.buyer_email)) {
    errors.push('Correo electrónico inválido');
  }
  
  // Validar teléfono
  const phoneRegex = /^[\d\s\+\(\)\-]{8,15}$/;
  if (!purchaseData.value.buyer_phone || !phoneRegex.test(purchaseData.value.buyer_phone)) {
    errors.push('Número telefónico inválido');
  }
  
  // Verificar método de financiamiento
  if (!purchaseData.value.financing_method) {
    errors.push('Debe seleccionar un método de financiamiento');
  }
  
  // Verificar términos y condiciones
  if (!purchaseData.value.terms_accepted) {
    errors.push('Debe aceptar los términos y condiciones');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

// Función mejorada para enviar la reserva con validaciones estrictas y manejo de autenticación
const submitBooking = async () => {
  // Validar datos antes de proceder
  const validation = validateBookingData();
  
  if (!validation.isValid) {
    // Mostrar errores al usuario
    errorMessage.value = `Por favor corrija los siguientes errores:\n${validation.errors.join('\n')}`;
    showErrorModal.value = true;
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // Obtenemos el user ID y token del store de autenticación
    let currentUserId = null;
    let authToken = null;
    
    if (authStore.isAuthenticated && authStore.user) {
      currentUserId = authStore.user.id;
      authToken = authStore.token;
      console.log('Usuario autenticado ID:', currentUserId);
    } else {
      // Intento de respaldo: verificar localStorage directamente
      try {
        const userJson = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (userJson) {
          const userData = JSON.parse(userJson);
          currentUserId = userData.id;
          console.log('Usuario ID obtenido de localStorage:', currentUserId);
        }
        
        if (token) {
          authToken = token;
        }
      } catch (e) {
        console.error('Error al obtener usuario/token del localStorage:', e);
      }
      
      if (!currentUserId || !authToken) {
        // Redirigir a la página de inicio de sesión si no hay autenticación
        errorMessage.value = 'Debe iniciar sesión para continuar con la reserva';
        showErrorModal.value = true;
        
        // Guardar la URL actual para redirigir después del login
        localStorage.setItem('redirectAfterLogin', window.location.href);
        
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        
        isSubmitting.value = false;
        return;
      }
    }
    
    // Sanitizar los datos para prevenir XSS
    const sanitizedName = bookingData.value.guest_name.replace(/[<>]/g, '');
    const sanitizedRequests = bookingData.value.special_requests ? 
                             bookingData.value.special_requests.replace(/[<>]/g, '') : '';
    
    // Formatear datos según las expectativas del backend
    const bookingPayload = {
      property_id: parseInt(propertyId.value),
      // Incluimos el user_id sólo si existe
      ...(currentUserId && { user_id: currentUserId }),
      guest_name: sanitizedName,
      guest_email: bookingData.value.guest_email,
      guest_phone: bookingData.value.guest_phone,
      check_in_date: bookingData.value.check_in_date,
      check_out_date: bookingData.value.check_out_date,
      guests: parseInt(bookingData.value.guests),
      total_price: property.value.price * rentalMonths.value,
      special_requests: sanitizedRequests,
      status: 'pending'
    };
    
    console.log('Enviando datos de reserva:', bookingPayload);
    
    // Configurar el header de autorización
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    };
    
    // Intenta hacer la petición al backend
    try {
      // Crear la reserva directamente (el backend verificará la disponibilidad)
      const response = await axios.post(`${API_URL}/bookings`, bookingPayload, config);
      
      if (response.data && response.data.success) {
        const bookingId = response.data.data.bookingId;
        console.log('Reserva creada con éxito. ID:', bookingId);
        
        // Guardar ID de reserva en localStorage para recuperación en caso de error
        try {
          localStorage.setItem('lastBookingId', bookingId);
          localStorage.setItem('lastBookingTimestamp', Date.now().toString());
        } catch (e) {
          console.warn('No se pudo guardar información de reserva en localStorage', e);
        }
        
        // Navegar a la página de pagos con los datos correctos
        router.push({
          path: `/payments/${bookingId}`,
          query: {
            amount: totalAmount.value,
            propertyTitle: property.value.title || 'Propiedad',
            checkIn: bookingData.value.check_in_date,
            checkOut: bookingData.value.check_out_date
          }
        });
      } else {
        throw new Error('La respuesta del servidor no indica éxito');
      }
    } catch (apiError) {
      console.error('Error al crear la reserva en la API:', apiError);
      
      // Manejo específico según el tipo de error
      if (apiError.response) {
        if (apiError.response.status === 401) {
          errorMessage.value = 'No tiene autorización para realizar esta reserva. Por favor inicie sesión nuevamente.';
          showErrorModal.value = true;
          
          // Redirigir al login después de cerrar el modal
          setTimeout(() => {
            // Cerrar sesión porque el token puede haber expirado
            if (authStore.logout) {
              authStore.logout();
            } else {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
            
            // Guardar la URL actual para redirigir después del login
            localStorage.setItem('redirectAfterLogin', window.location.href);
            router.push('/login');
          }, 2000);
          
          return;
        } else if (apiError.response.status === 409) {
          errorMessage.value = apiError.response.data.message || 'La propiedad no está disponible para las fechas seleccionadas.';
          showErrorModal.value = true;
          return;
        } else if (apiError.response.status === 400) {
          errorMessage.value = apiError.response.data.message || 'Datos de reserva inválidos. Por favor verifique la información.';
          showErrorModal.value = true;
          return;
        } else {
          errorMessage.value = apiError.response.data.message || 'Error al procesar la reserva. Por favor intente nuevamente.';
          showErrorModal.value = true;
          return;
        }
      } else {
        errorMessage.value = 'Error al comunicarse con el servidor. Por favor, intente de nuevo más tarde.';
        showErrorModal.value = true;
        return;
      }
    }
  } catch (err) {
    console.error('Error general procesando la reserva:', err);
    errorMessage.value = 'Ocurrió un error al procesar su reserva. Por favor, intente de nuevo.';
    showErrorModal.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

// Función para enviar la compra de propiedad con autenticación mejorada
const submitPurchase = async () => {
  // Validar datos antes de proceder
  const validation = validatePurchaseData();
  
  if (!validation.isValid) {
    // Mostrar errores al usuario
    errorMessage.value = `Por favor corrija los siguientes errores:\n${validation.errors.join('\n')}`;
    showErrorModal.value = true;
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    // Obtenemos el user ID y token del store de autenticación
    let currentUserId = null;
    let authToken = null;
    
    if (authStore.isAuthenticated && authStore.user) {
      currentUserId = authStore.user.id;
      authToken = authStore.token;
      console.log('Usuario autenticado ID:', currentUserId);
    } else {
      // Intento de respaldo: verificar localStorage directamente
      try {
        const userJson = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (userJson) {
          const userData = JSON.parse(userJson);
          currentUserId = userData.id;
          console.log('Usuario ID obtenido de localStorage:', currentUserId);
        }
        
        if (token) {
          authToken = token;
        }
      } catch (e) {
        console.error('Error al obtener usuario/token del localStorage:', e);
      }
      
      if (!currentUserId || !authToken) {
        // Redirigir a la página de inicio de sesión si no hay autenticación
        errorMessage.value = 'Debe iniciar sesión para continuar con la compra';
        showErrorModal.value = true;
        
        // Guardar la URL actual para redirigir después del login
        localStorage.setItem('redirectAfterLogin', window.location.href);
        
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        
        isSubmitting.value = false;
        return;
      }
    }
    
    // Sanitizar los datos para prevenir XSS
    const sanitizedName = purchaseData.value.buyer_name.replace(/[<>]/g, '');
    const sanitizedInfo = purchaseData.value.additional_info ? 
                         purchaseData.value.additional_info.replace(/[<>]/g, '') : '';
    
    // Usar el precio total de la propiedad
    const totalPrice = property.value.price;
    
    // Preparar los datos para la compra incluyendo las fechas requeridas
    const purchasePayload = {
      property_id: parseInt(propertyId.value),
      ...(currentUserId && { user_id: currentUserId }),
      guest_name: sanitizedName,
      guest_email: purchaseData.value.buyer_email,
      guest_phone: purchaseData.value.buyer_phone,
      // Incluir fechas requeridas por el backend
      check_in_date: new Date().toISOString().split('T')[0], // Fecha actual como inicio
      check_out_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // 1 año después
      guests: 1, // Valor por defecto para campo requerido
      total_price: totalPrice,
      special_requests: sanitizedInfo,
      payment_method: purchaseData.value.financing_method,
      status: 'pending',
      is_purchase: true // Marcar explícitamente como una compra
    };
    
    console.log('Enviando datos de compra:', purchasePayload);
    
    // Configurar el header de autorización
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    };
    
    // Usar el endpoint de pagos regular para mantener la estructura de la aplicación
    try {
      // Crear la reserva usando el endpoint de bookings con la autorización
      const response = await axios.post(`${API_URL}/bookings`, purchasePayload, config);
      
      if (response.data && response.data.success) {
        const bookingId = response.data.data.bookingId;
        console.log('Solicitud de compra creada con éxito. ID:', bookingId);
        
        // Guardar ID de reserva en localStorage para recuperación
        try {
          localStorage.setItem('lastBookingId', bookingId);
          localStorage.setItem('lastBookingTimestamp', Date.now().toString());
          localStorage.setItem('isPurchase', 'true');
        } catch (e) {
          console.warn('No se pudo guardar información de compra en localStorage', e);
        }
        
        // Navegar a la página de pagos con el precio total
        router.push({
          path: `/payments/${bookingId}`,
          query: {
            amount: totalPrice,
            propertyTitle: property.value.title || 'Propiedad',
            type: 'purchase',
            isPurchase: 'true'
          }
        });
      } else {
        throw new Error('La respuesta del servidor no indica éxito');
      }
    } catch (apiError) {
      console.error('Error al crear la solicitud de compra en la API:', apiError);
      
      // Manejo específico según el tipo de error
      if (apiError.response) {
        if (apiError.response.status === 401) {
          errorMessage.value = 'No tiene autorización para realizar esta compra. Por favor inicie sesión nuevamente.';
          showErrorModal.value = true;
          
          // Redirigir al login después de cerrar el modal
          setTimeout(() => {
            // Cerrar sesión porque el token puede haber expirado
            if (authStore.logout) {
              authStore.logout();
            } else {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
            }
            
            // Guardar la URL actual para redirigir después del login
            localStorage.setItem('redirectAfterLogin', window.location.href);
            router.push('/login');
          }, 2000);
          
          return;
        } else if (apiError.response.status === 409) {
          errorMessage.value = apiError.response.data.message || 'Conflicto con la propiedad seleccionada.';
          showErrorModal.value = true;
          return;
        } else if (apiError.response.status === 400) {
          errorMessage.value = apiError.response.data.message || 'Datos de compra inválidos. Por favor verifique la información.';
          showErrorModal.value = true;
          return;
        } else {
          errorMessage.value = apiError.response.data.message || 'Error al procesar la solicitud de compra.';
          showErrorModal.value = true;
          return;
        }
      } else {
        errorMessage.value = 'Error al comunicarse con el servidor. Por favor, intente de nuevo más tarde.';
        showErrorModal.value = true;
        return;
      }
    }
  } catch (err) {
    console.error('Error general procesando la compra:', err);
    errorMessage.value = 'Ocurrió un error al procesar su solicitud de compra. Por favor, intente de nuevo.';
    showErrorModal.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

// Función checkAvailability que ignora todas las validaciones de fechas
const checkAvailability = async () => {
  try {
    // Ignoramos completamente cualquier validación de fechas
    // y siempre retornamos que la propiedad está disponible
    console.log('Verificación de disponibilidad completamente omitida');
    return true;
  } catch (err) {
    console.error('Error en checkAvailability:', err);
    // Siempre retornamos true para continuar
    return true;
  }
};

// Función para actualizar la duración
const updateDuration = () => {
  // No hacemos ninguna validación aquí
  console.log('Duración actualizada sin validaciones');
};

// Cargar datos de la propiedad
const fetchPropertyData = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    if (!propertyId.value) {
      isLoading.value = false;
      return;
    }
    
    // Hacer la petición a la API
    const response = await axios.get(`${API_URL}/properties/${propertyId.value}`);
    
    if (response.data && response.data.success) {
      property.value = response.data.data;
      
      // Inicializar datos dependiendo del tipo de propiedad
      if (isPropertyForSale.value) {
        // Inicializar datos para compra
        purchaseData.value.property_id = propertyId.value;
        
        // Si el usuario está autenticado, prellenar sus datos
        if (isAuthenticated.value && currentUser.value) {
          purchaseData.value.buyer_name = `${currentUser.value.first_name} ${currentUser.value.last_name}`;
          purchaseData.value.buyer_email = currentUser.value.email;
          purchaseData.value.buyer_phone = currentUser.value.phone || '';
        }
      } else {
        // Inicializar datos para reserva (renta)
        bookingData.value.property_id = propertyId.value;

        // Si el usuario está autenticado, prellenar sus datos
        if (isAuthenticated.value && currentUser.value) {
          bookingData.value.guest_name = `${currentUser.value.first_name} ${currentUser.value.last_name}`;
          bookingData.value.guest_email = currentUser.value.email;
          bookingData.value.guest_phone = currentUser.value.phone || '';
        }
      }
      
    } else {
      error.value = 'No se pudo cargar la información de la propiedad. Por favor intente de nuevo.';
    }
  } catch (err) {
    console.error('Error obteniendo datos de la propiedad:', err);
    error.value = 'No se pudo cargar la información de la propiedad. Por favor intente de nuevo más tarde.';
  } finally {
    isLoading.value = false;
  }
};

// Observar cambios en el ID de la propiedad
watch(() => propertyId.value, (newId) => {
  if (newId) {
    fetchPropertyData();
  }
});

// Cargar datos al montar el componente
onMounted(() => {
  // Inicializar el auth store si es necesario
  if (!authStore.isInitialized) {
    authStore.initialize();
  }
  
  // Si no está autenticado pero hay datos en localStorage, intentar cargarlos
  if (!authStore.isAuthenticated) {
    try {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const userData = JSON.parse(userJson);
        console.log('Cargando información de usuario en componente de reserva:', userData);
        authStore.setUser(userData);
        authStore.isAuthenticated = true;
      }
    } catch (e) {
      console.error('Error al cargar datos de usuario:', e);
    }
  }
  
  console.log('Estado de autenticación en componente de reserva:', isAuthenticated.value);
  console.log('Usuario actual en componente de reserva:', currentUser.value);
  
  fetchPropertyData();
  
  // Cargar librería de íconos (Material Icons)
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
});
</script>

<style>
/* Estilos generales */
.booking-page {
  min-height: 800px;
}

/* Estilos para texto negro */
.text-black {
  color: #000000 !important;
}

/* Estilos para el spinner de carga */
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Estilos para botones principales */
.bg-orange-800 {
  background-color: #fd5631 !important;
}

.bg-orange-900 {
  background-color: #fd5631 !important;
}

.hover\:bg-orange-800:hover {
  background-color: #fd5631 !important;
}

.hover\:bg-orange-900:hover {
  background-color: #fd5631 !important;
}

.text-orange-800 {
  color: #fd5631 !important;
}

.hover\:underline:hover {
  text-decoration: underline;
}

/* Estilos para inputs */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="date"],
select,
textarea {
  color: #000000 !important;
}

/* Material icons */
.material-icons {
  vertical-align: middle;
}
</style>