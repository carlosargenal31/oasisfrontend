<template>
  <div class="container mx-auto px-4 py-8 bg-white payment-page pt-20">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[400px]">
      <div class="spinner border-4 border-gray-200 border-t-blue-800 rounded-full w-10 h-10 animate-spin"></div>
      <p class="text-xl text-black ml-4">Cargando información del pago...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="flex flex-col justify-center items-center min-h-[400px]">
      <p class="text-xl text-red-600 mb-4">{{ error }}</p>
      <button @click="fetchBookingData" class="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900">
        Intentar de nuevo
      </button>
    </div>

    <!-- Contenido cuando los datos están cargados -->
    <div v-else-if="booking" class="payment-content">
      <!-- Breadcrumb -->
      <div class="breadcrumb flex items-center mb-4 text-sm">
        <a href="/" class="text-black hover:text-blue-800">Inicio</a>
        <span class="mx-2 text-black">›</span>
        <a :href="`/properties/${booking.property_id}`" class="text-black hover:text-blue-800">
          {{ propertyTitle || 'Propiedad' }}
        </a>
        <span class="mx-2 text-black">›</span>
        <a :href="`/bookings/${booking.id}`" class="text-black hover:text-blue-800">{{ isPurchase ? 'Compra' : 'Reserva' }}</a>
        <span class="mx-2 text-black">›</span>
        <span class="text-black">Pago</span>
      </div>

      <h1 class="text-3xl font-bold text-black mb-4">Completar pago</h1>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Columna izquierda - Formulario de pago -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-bold text-black">Método de pago</h2>
            </div>

            <form @submit.prevent="processPayment" class="p-6">
              <!-- Métodos de pago -->
              <div class="mb-6">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div 
                    v-for="method in paymentMethods" 
                    :key="method.id"
                    @click="selectPaymentMethod(method.id)"
                    class="border rounded-md p-4 flex items-center cursor-pointer"
                    :class="{'border-blue-800 bg-blue-50': paymentData.payment_method === method.id, 'border-gray-300': paymentData.payment_method !== method.id}"
                  >
                    <span class="material-icons text-2xl mr-3" :class="{'text-blue-800': paymentData.payment_method === method.id}">
                      {{ method.icon }}
                    </span>
                    <span class="text-black">{{ method.name }}</span>
                  </div>
                </div>
              </div>

              <!-- Formulario de tarjeta de crédito/débito -->
              <div v-if="paymentData.payment_method === 'credit_card' || paymentData.payment_method === 'debit_card'" class="mb-6">
                <h3 class="text-lg font-semibold text-black mb-4">Detalles de la tarjeta</h3>
                
                <div class="mb-4">
                  <label class="block text-black mb-2">Nombre en la tarjeta <span class="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    v-model="paymentData.card_holder" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    placeholder="Como aparece en la tarjeta" 
                    required
                  >
                </div>
                
                <div class="mb-4">
                  <label class="block text-black mb-2">Número de tarjeta <span class="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    v-model="paymentData.card_number" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    placeholder="XXXX XXXX XXXX XXXX"
                    required
                  >
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-black mb-2">Fecha de vencimiento <span class="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      v-model="paymentData.expiry_date" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                      placeholder="MM/AA"
                      required
                    >
                  </div>
                  <div>
                    <label class="block text-black mb-2">Código de seguridad <span class="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      v-model="paymentData.cvv" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                      placeholder="CVV"
                      required
                    >
                  </div>
                </div>
              </div>

              <!-- Instrucciones para transferencia bancaria -->
              <div v-if="paymentData.payment_method === 'bank_transfer'" class="mb-6">
                <h3 class="text-lg font-semibold text-black mb-4">Transferencia bancaria</h3>
                
                <div class="bg-gray-50 p-4 rounded-md mb-4">
                  <p class="text-black mb-3">Por favor realice la transferencia a la siguiente cuenta:</p>
                  <ul class="list-disc pl-5 text-black mb-4">
                    <li class="mb-1">Banco: Banco Atlántida</li>
                    <li class="mb-1">Nombre: OASIS Real Estate S.A.</li>
                    <li class="mb-1">Cuenta: 1234-5678-9012-3456</li>
                    <li class="mb-1">Concepto: {{ isPurchase ? 'Compra-' : 'Reserva-' }}{{ bookingId }}</li>
                  </ul>
                  <p class="text-black font-medium">Instrucciones:</p>
                  <ol class="list-decimal pl-5 text-black">
                    <li class="mb-1">Realice la transferencia por el monto total.</li>
                    <li class="mb-1">Guarde el comprobante de transferencia.</li>
                    <li class="mb-1">Envíe una copia del comprobante a: <a href="mailto:pagos@oasisrealestate.com" class="text-blue-800 hover:underline">pagos@oasisrealestate.com</a></li>
                  </ol>
                </div>

                <div class="mb-4">
                  <label class="block text-black mb-2">Fecha de transferencia <span class="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    v-model="paymentData.transfer_date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    :min="currentDate"
                    required
                  >
                </div>
                
                <div class="mb-4">
                  <label class="block text-black mb-2">Número de referencia (opcional)</label>
                  <input 
                    type="text" 
                    v-model="paymentData.reference_number" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    placeholder="Número de confirmación de su transferencia"
                  >
                </div>
              </div>

              <!-- PayPal -->
              <div v-if="paymentData.payment_method === 'paypal'" class="mb-6">
                <h3 class="text-lg font-semibold text-black mb-4">Pago con PayPal</h3>
                
                <div class="bg-gray-50 p-4 rounded-md mb-4 text-center">
                  <p class="text-black mb-4">Será redirigido a PayPal para completar su pago de manera segura.</p>
                  <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" class="h-12 mx-auto">
                </div>
              </div>

              <!-- Información de pago en efectivo -->
              <div v-if="paymentData.payment_method === 'cash'" class="mb-6">
                <h3 class="text-lg font-semibold text-black mb-4">Pago en efectivo</h3>
                
                <div class="bg-gray-50 p-4 rounded-md mb-4">
                  <p class="text-black mb-3">Puede realizar el pago en efectivo en nuestras oficinas:</p>
                  
                  <div class="mb-4">
                    <p class="text-black font-medium">Edificio OASIS, Blvd. Suyapa</p>
                    <p class="text-black">Tegucigalpa, Honduras</p>
                    <p class="text-black">Horario: Lunes a Viernes de 8:00 AM a 5:00 PM</p>
                  </div>
                  
                  <p class="text-black font-medium mb-2">Instrucciones:</p>
                  <ol class="list-decimal pl-5 text-black">
                    <li class="mb-1">Acuda a nuestras oficinas dentro del horario establecido.</li>
                    <li class="mb-1">Presente el número de {{ isPurchase ? 'compra' : 'reserva' }}: <span class="font-bold">{{ bookingId }}</span></li>
                    <li class="mb-1">Recibirá un recibo como comprobante de pago.</li>
                  </ol>
                </div>
                
                <div class="mb-4">
                  <label class="block text-black mb-2">Fecha estimada de pago <span class="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    v-model="paymentData.cash_payment_date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                    :min="currentDate"
                    required
                  >
                </div>
              </div>

              <div class="flex items-center justify-between mt-6 mb-2">
                <!-- Botón para volver y cancelar la reserva -->
                <button 
                  @click="cancelBookingAndReturn" 
                  type="button"
                  class="flex items-center text-gray-600 hover:text-red-600 transition"
                  :disabled="isProcessing"
                >
                  <span class="material-icons mr-1">arrow_back</span>
                  <span>Volver y cancelar {{ isPurchase ? 'compra' : 'reserva' }}</span>
                </button>
                
                <!-- Información sobre reservas pendientes -->
                <div class="text-sm text-gray-500">
                  <span class="material-icons text-xs align-middle mr-1">info</span>
                  {{ isPurchase ? 'Las solicitudes de compra' : 'Las reservas pendientes' }} expiran en 10 minutos
                </div>
              </div>

              <!-- Botón de procesamiento -->
              <button 
                type="submit"
                class="w-full bg-blue-800 text-white font-medium py-3 px-4 rounded hover:bg-blue-900 transition mt-4"
                :disabled="isProcessing"
              >
                <span v-if="isProcessing">
                  <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Procesando...
                </span>
                <span v-else>
                  {{ paymentButtonText }}
                </span>
              </button>
            </form>
          </div>
        </div>

        <!-- Columna derecha - Resumen de la reserva o compra -->
        <div class="lg:w-1/3">
          <div class="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-bold text-black">Resumen de {{ isPurchase ? 'compra' : 'reserva' }}</h2>
            </div>
            
            <div class="p-6">
              <div class="mb-4">
                <h3 class="font-semibold text-black mb-2">Información de la {{ isPurchase ? 'compra' : 'reserva' }}</h3>
                <p class="text-black font-medium">{{ propertyTitle || 'Propiedad' }}</p>
                <p class="text-black mb-2">{{ isPurchase ? 'Compra' : 'Reserva' }} #{{ bookingId }}</p>
                
                <div class="mt-3 flex items-center">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {{ booking.status || 'Pendiente' }}
                  </span>
                </div>
              </div>
              
              <div class="border-t border-b border-gray-200 py-4 my-4">
                <h3 class="font-semibold text-black mb-2">Detalles</h3>
                <template v-if="!isPurchase">
                  <div class="flex justify-between text-black mb-1">
                    <span>Fecha de inicio:</span>
                    <span class="font-medium">{{ formatReadableDate(checkInDate) }}</span>
                  </div>
                  <div class="flex justify-between text-black mb-1">
                    <span>Fecha de finalización:</span>
                    <span class="font-medium">{{ formatReadableDate(checkOutDate) }}</span>
                  </div>
                </template>
                <div class="flex justify-between text-black mb-1">
                  <span>{{ isPurchase ? 'Comprador' : 'Inquilino' }}:</span>
                  <span class="font-medium">{{ booking.guest_name }}</span>
                </div>
              </div>
              
              <div class="mb-4">
                <h3 class="font-semibold text-black mb-2">Detalle de pago</h3>
                <template v-if="isPurchase">
                  <div class="flex justify-between text-black mb-1">
                    <span>Precio de la propiedad:</span>
                    <span class="font-medium">L {{ formatPrice(amount) }}</span>
                  </div>
                </template>
                <template v-else>
                  <div class="flex justify-between text-black mb-1">
                    <span>Renta primer mes:</span>
                    <span class="font-medium">L {{ formatPrice(amount / 2) }}</span>
                  </div>
                  <div class="flex justify-between text-black mb-1">
                    <span>Depósito de seguridad:</span>
                    <span class="font-medium">L {{ formatPrice(amount / 2) }}</span>
                  </div>
                </template>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-md">
                <div class="flex justify-between">
                  <span class="text-lg font-bold text-black">Total a pagar:</span>
                  <span class="text-lg font-bold text-black">L {{ formatPrice(amount) }}</span>
                </div>
              </div>
              
              <div class="mt-6 text-sm">
                <div class="flex items-center mb-2">
                  <span class="material-icons text-green-500 mr-2">verified_user</span>
                  <p class="text-black">Pago seguro garantizado</p>
                </div>
                <div class="flex items-center">
                  <span class="material-icons text-green-500 mr-2">support_agent</span>
                  <p class="text-black">Soporte 24/7 para {{ isPurchase ? 'compradores' : 'inquilinos' }}</p>
                </div>
              </div>

              <!-- Botón para ver detalles de la propiedad -->
              <div class="mt-4 text-xs text-center">
                <button 
                  @click="returnToProperty" 
                  type="button"
                  class="text-blue-800 hover:underline"
                  :disabled="isProcessing"
                >
                  Ver detalles de la propiedad
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Si no hay datos de reserva mostrar mensaje de error -->
    <div v-else class="text-center py-10">
      <p class="text-xl text-black mb-4">No se encontró información de la {{ isPurchase ? 'compra' : 'reserva' }}</p>
      <a href="/properties" class="bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded inline-block">
        Ver propiedades disponibles
      </a>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-md p-6">
        <div class="text-center mb-6">
          <span class="material-icons text-6xl text-green-500 mb-4">check_circle</span>
          <h2 class="text-2xl font-bold text-black mb-2">¡Pago Confirmado!</h2>
          <p class="text-black">Su pago ha sido procesado con éxito.</p>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-md mb-6">
          <div class="flex justify-between text-black mb-2">
            <span>Número de {{ isPurchase ? 'compra' : 'reserva' }}:</span>
            <span class="font-semibold">{{ bookingId }}</span>
          </div>
          <div class="flex justify-between text-black mb-2">
            <span>Propiedad:</span>
            <span class="font-semibold">{{ propertyTitle }}</span>
          </div>
          <div class="flex justify-between text-black mb-2">
            <span>Método de pago:</span>
            <span class="font-semibold">{{ getPaymentMethodName() }}</span>
          </div>
          <div class="flex justify-between text-black">
            <span>Estado:</span>
            <span class="font-semibold text-green-600">{{ paymentData.payment_method === 'bank_transfer' || paymentData.payment_method === 'cash' ? 'Pendiente de verificación' : 'Completado' }}</span>
          </div>
        </div>
        
        <p class="text-black mb-6">Hemos enviado los detalles de su pago a su correo electrónico.</p>
        
        <div class="flex flex-col space-y-2">
          <button 
            @click="goToMyBookings" 
            class="w-full bg-blue-800 text-white font-medium py-3 px-4 rounded hover:bg-blue-900 transition"
          >
            Ver mis {{ isPurchase ? 'compras' : 'reservas' }}
          </button>
          <button 
            @click="goToHome" 
            class="w-full border border-gray-300 text-black font-medium py-3 px-4 rounded hover:bg-gray-50 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// Definir la URL base de la API
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

// Inicializar router
const route = useRoute();
const router = useRouter();

// Obtener ID de la reserva y otros datos de la URL
const bookingId = route.params.id;
const propertyTitle = route.query.propertyTitle;
const amount = parseInt(route.query.amount) || 40000;
const checkInDate = route.query.checkIn;
const checkOutDate = route.query.checkOut;
// Verificar si es una compra basado en la URL
const isPurchase = computed(() => route.query.isPurchase === 'true' || route.query.type === 'purchase');

// Variables de estado
const isLoading = ref(true);
const error = ref(null);
const booking = ref(null);
const isProcessing = ref(false);
const showConfirmation = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref('');

// Fecha actual para inputs de tipo date
const currentDate = new Date().toISOString().split('T')[0];

// Métodos de pago disponibles, ajustados según tus modelos
const paymentMethods = [
  { id: 'credit_card', name: 'Tarjeta de crédito', icon: 'credit_card' },
  { id: 'debit_card', name: 'Tarjeta de débito', icon: 'credit_card' },
  { id: 'bank_transfer', name: 'Transferencia bancaria', icon: 'account_balance' },
  { id: 'paypal', name: 'PayPal', icon: 'account_balance_wallet' },
  { id: 'cash', name: 'Efectivo', icon: 'payments' }
];

// Datos del pago
const paymentData = ref({
  payment_method: 'credit_card',
  booking_id: bookingId,
  amount: amount,
  currency: 'HNL',
  
  // Para tarjetas
  card_holder: '',
  card_number: '',
  expiry_date: '',
  cvv: '',
  
  // Para transferencia
  transfer_date: currentDate,
  reference_number: '',
  
  // Para efectivo
  cash_payment_date: currentDate
});

// Botón de pago texto según método
const paymentButtonText = computed(() => {
  switch (paymentData.value.payment_method) {
    case 'credit_card':
    case 'debit_card':
      return 'Pagar ahora';
    case 'paypal':
      return 'Continuar a PayPal';
    case 'bank_transfer':
      return 'Confirmar transferencia';
    case 'cash':
      return 'Confirmar pago en efectivo';
    default:
      return 'Completar pago';
  }
});

// Seleccionar método de pago
const selectPaymentMethod = (methodId) => {
  paymentData.value.payment_method = methodId;
};

// Obtener nombre del método de pago
const getPaymentMethodName = () => {
  const method = paymentMethods.find(m => m.id === paymentData.value.payment_method);
  return method ? method.name : 'Desconocido';
};

// Formatear fecha para mostrar
const formatReadableDate = (dateString) => {
  if (!dateString) return 'No especificada';
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', options);
};

// Formatear precio
const formatPrice = (price) => {
  if (!price) return "0";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Función para validar los datos de pago antes de enviarlos
const validatePaymentData = () => {
  const errors = [];
  
  // Validar método de pago seleccionado
  if (!paymentData.value.payment_method) {
    errors.push('Debe seleccionar un método de pago');
  }
  
  // Validaciones específicas según el método de pago
  if (paymentData.value.payment_method === 'credit_card' || paymentData.value.payment_method === 'debit_card') {
    // Validar nombre del titular
    if (!paymentData.value.card_holder || paymentData.value.card_holder.trim().length < 5) {
      errors.push('Ingrese el nombre completo como aparece en la tarjeta');
    }
    
    // Validar número de tarjeta (solo números, longitud entre 13-19 dígitos)
    const cardNumber = paymentData.value.card_number.replace(/\s+/g, '');
    if (!/^\d{13,19}$/.test(cardNumber)) {
      errors.push('Número de tarjeta inválido. Debe contener entre 13 y 19 dígitos');
    }
    
    // Validar fecha de expiración (formato MM/AA o MM/AAAA)
    if (!paymentData.value.expiry_date || !/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(paymentData.value.expiry_date)) {
      errors.push('Fecha de expiración inválida. Use el formato MM/AA');
    } else {
      // Verificar que la fecha no esté expirada
      const [month, year] = paymentData.value.expiry_date.split('/');
      const expiryDate = new Date();
      expiryDate.setFullYear(year.length === 2 ? 2000 + parseInt(year) : parseInt(year));
      expiryDate.setMonth(parseInt(month) - 1);
      expiryDate.setDate(1);
      
      if (expiryDate < new Date()) {
        errors.push('La tarjeta ha expirado');
      }
    }
    
    // Validar CVV (3-4 dígitos)
    if (!paymentData.value.cvv || !/^\d{3,4}$/.test(paymentData.value.cvv)) {
      errors.push('Código de seguridad inválido');
    }
  } 
  else if (paymentData.value.payment_method === 'bank_transfer') {
    // Validar fecha de transferencia
    if (!paymentData.value.transfer_date) {
      errors.push('Seleccione la fecha de transferencia');
    }
  } 
  else if (paymentData.value.payment_method === 'cash') {
    // Validar fecha estimada de pago
    if (!paymentData.value.cash_payment_date) {
      errors.push('Seleccione la fecha estimada de pago');
    } else {
      const selectedDate = new Date(paymentData.value.cash_payment_date);
      const maxAllowedDate = new Date();
      maxAllowedDate.setDate(maxAllowedDate.getDate() + 7); // Máximo 7 días en el futuro
      
      if (selectedDate > maxAllowedDate) {
        errors.push('La fecha de pago no puede ser mayor a 7 días a partir de hoy');
      }
    }
  }
  
  // Verificar monto
  if (!paymentData.value.amount || paymentData.value.amount <= 0) {
    errors.push('El monto a pagar no es válido');
  }
  
  // Verificar ID de reserva
  if (!paymentData.value.booking_id) {
    errors.push('ID de reserva no válido');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

// Función mejorada para procesar el pago con validaciones estrictas
const processPayment = async () => {
  // Validar datos antes de proceder
  const validation = validatePaymentData();
  
  if (!validation.isValid) {
    // Mostrar errores al usuario
    errorMessage.value = `Por favor corrija los siguientes errores:\n${validation.errors.join('\n')}`;
    showErrorModal.value = true;
    return;
  }
  
  isProcessing.value = true;
  
  try {
    // Preparar los detalles del pago según el método seleccionado
    let paymentDetails = {};
    
    if (paymentData.value.payment_method === 'credit_card' || paymentData.value.payment_method === 'debit_card') {
      // Ocultar el número completo de la tarjeta excepto los últimos 4 dígitos
      const cardNumber = paymentData.value.card_number.replace(/\s+/g, '');
      const lastFour = cardNumber.slice(-4);
      
      paymentDetails = {
        card_holder: paymentData.value.card_holder,
        card_last_four: lastFour,
        card_expiry: paymentData.value.expiry_date,
        payment_processor: 'internal', // O el nombre del procesador que uses
        is_purchase: isPurchase.value // Agregar indicador de compra o renta
      };
    } else if (paymentData.value.payment_method === 'bank_transfer') {
      paymentDetails = {
        transfer_date: paymentData.value.transfer_date,
        reference_number: paymentData.value.reference_number || 'Pendiente',
        bank_info: 'Banco Atlántida',
        is_purchase: isPurchase.value
      };
    } else if (paymentData.value.payment_method === 'cash') {
      paymentDetails = {
        cash_payment_date: paymentData.value.cash_payment_date,
        location: 'Oficina principal OASIS',
        is_purchase: isPurchase.value
      };
    } else if (paymentData.value.payment_method === 'paypal') {
      paymentDetails = {
        paypal_order_id: 'PENDING-' + Date.now(),
        paypal_status: 'initiated',
        is_purchase: isPurchase.value
      };
    }
    
    // Generar hash de verificación (para prevenir manipulación)
    const verificationData = `${bookingId}-${amount}-${paymentData.value.payment_method}-${Date.now()}`;
    const verificationHash = btoa(verificationData); // Usar una función hash más segura en producción
    
    // Crear la carga útil para la API
    const paymentPayload = {
      booking_id: bookingId,
      amount: amount,
      currency: 'HNL',
      payment_method: paymentData.value.payment_method,
      status: paymentData.value.payment_method === 'bank_transfer' || paymentData.value.payment_method === 'cash' 
        ? 'pending' 
        : 'completed',
      details: JSON.stringify(paymentDetails),
      verification_hash: verificationHash
    };
    
    console.log('Enviando datos de pago:', paymentPayload);
    
    // Intenta hacer la petición al backend
    try {
      const response = await axios.post(`${API_URL}/payments`, paymentPayload);
      
      if (response.data && (response.data.status === 'success' || response.data.success)) {
        console.log('Pago procesado con éxito:', response.data);
        
        // Guardar datos de la transacción en localStorage para referencia
        try {
          const transactionData = {
            id: response.data.data.paymentId || response.data.data.id,
            date: new Date().toISOString(),
            amount: amount,
            booking_id: bookingId,
            transaction_id: response.data.data.transactionId || 'N/A',
            status: response.data.data.status || 'completed',
            is_purchase: isPurchase.value
          };
          
          // Guardar historial de transacciones
          const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
          transactionHistory.push(transactionData);
          localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
        } catch (storageError) {
          console.warn('Error guardando datos de transacción:', storageError);
        }
        
        // Mostrar confirmación
        showConfirmation.value = true;
      } else {
        throw new Error('La respuesta del servidor no indica éxito');
      }
    } catch (apiError) {
      console.error('Error al procesar el pago en la API:', apiError);
      
      // Manejo más específico según el tipo de error
      if (apiError.response) {
        if (apiError.response.status === 400) {
          errorMessage.value = apiError.response.data.message || 'Datos de pago inválidos. Por favor verifique la información proporcionada.';
          showErrorModal.value = true;
          return;
        } else if (apiError.response.status === 409) {
          errorMessage.value = apiError.response.data.message || 'Conflicto de pago. Esta operación ya podría estar pagada o cancelada.';
          showErrorModal.value = true;
          return;
        } else if (apiError.response.status === 500) {
          errorMessage.value = 'Error en el servidor al procesar el pago. Por favor intente más tarde o contacte a soporte.';
          showErrorModal.value = true;
          return;
        }
      }
      
      // En modo de desarrollo, mostrar confirmación para facilitar pruebas, 
      // en producción deberías manejar los errores adecuadamente
      if (process.env.NODE_ENV === 'development') {
        console.log('Simulando éxito después de error en API para entorno de desarrollo');
        showConfirmation.value = true;
      } else {
        errorMessage.value = 'Error al procesar el pago. Por favor intente nuevamente o contacte a soporte.';
        showErrorModal.value = true;
      }
    }
  } catch (err) {
    console.error('Error general procesando el pago:', err);
    
    errorMessage.value = 'Ocurrió un error inesperado. Por favor intente nuevamente.';
    showErrorModal.value = true;
  } finally {
    isProcessing.value = false;
  }
};

// Método para cancelar la reserva o compra y volver a la página anterior
const cancelBookingAndReturn = async () => {
  try {
    isProcessing.value = true;
    
    // Si el ID de reserva existe y no es un ID temporal
    if (bookingId && !String(bookingId).startsWith('temp-')) {
      console.log(`Cancelando ${isPurchase.value ? 'compra' : 'reserva'} ID:`, bookingId);
      
      // Llamar al endpoint para cancelar la reserva
      await axios.patch(`${API_URL}/bookings/${bookingId}/cancel`);
      
      console.log(`${isPurchase.value ? 'Compra' : 'Reserva'} cancelada exitosamente`);
    }
    
    // Volver a la página anterior (o a la página de propiedades)
    if (window.history.length > 1) {
      router.back();
    } else {
      // Si no hay historial, ir a la página de propiedades
      router.push(isPurchase.value ? '/properties/sale' : '/properties/rent');
    }
  } catch (error) {
    console.error(`Error al cancelar la ${isPurchase.value ? 'compra' : 'reserva'}:`, error);
    
    // Incluso si falla la cancelación, permitir al usuario volver atrás
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(isPurchase.value ? '/properties/sale' : '/properties/rent');
    }
  } finally {
    isProcessing.value = false;
  }
};

// Método para volver a la página de la propiedad específica
const returnToProperty = async () => {
  try {
    isProcessing.value = true;
    
    // Si el ID de reserva existe y no es un ID temporal, cancelar la reserva
    if (bookingId && !String(bookingId).startsWith('temp-')) {
      console.log(`Cancelando ${isPurchase.value ? 'compra' : 'reserva'} ID:`, bookingId);
      
      try {
        await axios.patch(`${API_URL}/bookings/${bookingId}/cancel`);
        console.log(`${isPurchase.value ? 'Compra' : 'Reserva'} cancelada exitosamente`);
      } catch (cancelError) {
        console.error(`Error al cancelar la ${isPurchase.value ? 'compra' : 'reserva'}:`, cancelError);
        // Continuamos incluso si falla la cancelación
      }
    }
    
    // Navegar a la página de la propiedad
    if (booking.value && booking.value.property_id) {
      router.push(`/properties/${booking.value.property_id}`);
    } else {
      // Si no tenemos ID de propiedad, volver al listado
      router.push(isPurchase.value ? '/properties/sale' : '/properties/rent');
    }
  } catch (error) {
    console.error('Error al procesar la navegación:', error);
    router.push(isPurchase.value ? '/properties/sale' : '/properties/rent');
  } finally {
    isProcessing.value = false;
  }
};

// Función auxiliar para crear un objeto de reserva temporal
const createTemporaryBooking = () => {
  return {
    id: bookingId,
    property_id: route.query.propertyId || null,
    guest_name: 'Cliente temporal',
    guest_email: '',
    check_in_date: checkInDate || new Date().toISOString().split('T')[0],
    check_out_date: checkOutDate || new Date().toISOString().split('T')[0],
    guests: route.query.guests || 1,
    total_price: amount,
    status: 'pending'
  };
};

// Obtener datos de la reserva con manejo robusto de errores
const fetchBookingData = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    if (!bookingId) {
      error.value = 'ID de reserva no proporcionado';
      isLoading.value = false;
      return;
    }
    
    console.log(`Intentando cargar ${isPurchase.value ? 'compra' : 'reserva'} con ID: ${bookingId}`);
    
    // Construir los parámetros de consulta para IDs temporales
    const queryParams = String(bookingId).startsWith('temp-') ? 
      `?propertyId=${route.query.propertyId || ''}&checkIn=${checkInDate || ''}&checkOut=${checkOutDate || ''}&amount=${amount || 0}` : '';
    
    // Realizar la llamada a la API con manejo de errores mejorado
    try {
      const response = await axios.get(`${API_URL}/bookings/${bookingId}${queryParams}`);
      
      if (response.data && response.data.success) {
        booking.value = response.data.data;
        console.log(`Datos de ${isPurchase.value ? 'compra' : 'reserva'} cargados:`, booking.value);
        
        // Inicializar datos del pago
        paymentData.value.booking_id = bookingId;
        paymentData.value.amount = booking.value.total_price || amount;
        
        // Prellenar datos del usuario si está disponible
        if (booking.value.guest_name) {
          paymentData.value.card_holder = booking.value.guest_name;
        }
      } else {
        throw new Error('La respuesta no indica éxito');
      }
    } catch (apiError) {
      console.error('Error en la llamada a la API:', apiError);
      
      // Si es un error 404, crear una reserva temporal para la interfaz
      if (apiError.response && apiError.response.status === 404) {
        console.log(`${isPurchase.value ? 'Compra' : 'Reserva'} no encontrada, creando objeto temporal para la interfaz`);
        booking.value = createTemporaryBooking();
        
        // Inicializar datos del pago con la información disponible
        paymentData.value.booking_id = bookingId;
        paymentData.value.amount = amount;
        
        return;
      }
      
      // Si es un error 500, podría ser un problema de servidor
      if (apiError.response && apiError.response.status === 500) {
        console.log('Error 500 del servidor, intentando crear objeto temporal');
        booking.value = createTemporaryBooking();
        
        // Inicializar datos del pago con la información disponible
        paymentData.value.booking_id = bookingId;
        paymentData.value.amount = amount;
        
        return;
      }
      
      // Para otros errores, mostrar mensaje de error
      error.value = `No se pudo cargar la información de la ${isPurchase.value ? 'compra' : 'reserva'}. Por favor intente de nuevo más tarde.`;
    }
  } catch (err) {
    console.error(`Error general obteniendo datos de la ${isPurchase.value ? 'compra' : 'reserva'}:`, err);
    error.value = 'Ocurrió un error al cargar la información. Por favor intente de nuevo más tarde.';
  } finally {
    isLoading.value = false;
  }
};

// Navegación después del pago
const goToMyBookings = () => {
  // Redirige al usuario a la página de mis reservas o compras
  router.push(isPurchase.value ? '/account/purchases' : '/account/bookings');
};

const goToHome = () => {
  // Redirige al usuario a la página principal
  router.push('/');
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchBookingData();
  
  // Cargar librería de íconos (Material Icons)
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
});
</script>
  
<style>
/* Estilos generales */
.payment-page {
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
.bg-blue-800 {
  background-color: #1e40af !important;
}
  
.bg-blue-900 {
  background-color: #1e3a8a !important;
}
  
.hover\:bg-blue-800:hover {
  background-color: #1e40af !important;
}
  
.hover\:bg-blue-900:hover {
  background-color: #1e3a8a !important;
}
  
.text-blue-800 {
  color: #1e40af !important;
}
  
.hover\:underline:hover {
  text-decoration: underline;
}
  
/* Estilos para inputs */
input[type="text"],
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