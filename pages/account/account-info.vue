<template>
  <div class="bg-white min-h-screen">
    <!-- Estado de carga -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange mx-auto mb-4"></div>
        <p class="text-lg font-medium text-gray-700">Cargando información...</p>
      </div>
    </div>

    <!-- Encabezado principal con navegación (simplificado) -->
    <header class="bg-white border-b border-gray-200 py-4">
      <div class="container mx-auto px-4 flex items-center justify-between">
        <div class="flex items-center">
          <div class="text-2xl font-bold text-orange-500">OASIS</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <span class="mr-2 font-black">ES</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div class="flex items-center">
            <span class="mr-2 font-black">EUR</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <img class="h-10 w-10 rounded-full" :src="user.profile_image || '/img/default-avatar.png'" alt="Perfil de usuario">
        </div>
      </div>
    </header>

    <!-- Navegación de migas de pan -->
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center text-orange-500 text-sm">
        <a href="/" class="hover:text-orange">Inicio</a>
        <span class="mx-2">/</span>
        <span class="text-gray-800">Información Personal</span>
      </div>
    </div>

    <!-- Contenido principal con barra lateral -->
    <div class="container mx-auto px-4 py-6">
      <div class="flex flex-col md:flex-row">
        <!-- Barra lateral izquierda - ancho aumentado -->
        <div class="w-full md:w-1/3 pr-0 md:pr-6 mb-6 md:mb-0">
          <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <!-- Perfil de usuario en la barra lateral -->
            <div class="p-4 text-center">
              <img :src="user.profile_image || '/img/default-avatar.png'" alt="Usuario" class="rounded-full w-24 h-24 mx-auto mb-4">
              <h3 class="text-xl font-bold text-black">{{ user.first_name }} {{ user.last_name }}</h3>
              <div class="flex justify-center my-2">
                <span class="text-yellow-400">★★★★★</span>
              </div>
              <div class="text-gray-800 text-sm mt-2">
                <div class="mb-1">
                  <i class="fas fa-phone mr-2"></i> {{ user.phone || 'No especificado' }}
                </div>
                <div>
                  <i class="fas fa-envelope mr-2"></i> {{ user.email }}
                </div>
              </div>
            </div>



            <!-- Menú de navegación -->
            <div class="border-t border-gray-200">
              <a href="/account/account-info" class="flex items-center px-4 py-3 border-l-4 border-orange bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-orange font-medium">Información Personal</span>
              </a>
              <a href="/account/wishlist" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class="text-black">Favoritos</span>
              </a>
              
              
              <a href="/logout" class="flex items-center px-4 py-3 border-l-4 border-transparent hover:bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span class="text-black">Cerrar Sesión</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Área de contenido principal -->
        <div class="w-full md:w-2/3">
          <h1 class="text-2xl font-bold text-black mb-4">Información Personal</h1>

          <!-- Barra de progreso -->
          <div class="mb-6">
            <p class="text-black mb-2 font-medium">Tu información personal está completada al {{ completeness }}%</p>
            <div class="w-full bg-gray-200 h-2 rounded-full">
              <div class="bg-orange h-2 rounded-full" :style="{ width: completeness + '%' }"></div>
            </div>
          </div>

          <!-- Sección de biografía -->
          <div class="mb-8">
            
            <div class="flex flex-col lg:flex-row gap-6">

              <div class="w-full lg:w-64 flex-shrink-0">
                <div class="bg-teal-500 hover:bg-teal-600 transition rounded-lg p-6 text-center cursor-pointer h-full flex flex-col items-center justify-center" @click="$refs.fileInput.click()">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-white font-medium">Cambiar foto</span>
                  <input ref="fileInput" type="file" class="hidden" accept="image/jpeg, image/png" @change="handleImageUpload">
                </div>
              </div>
            </div>
          </div>

          <!-- Sección de información personal -->
          <div class="mb-8">
            <!-- Nombre completo -->
            <div class="border border-gray-200 rounded-lg mb-4">
              <div class="p-4 flex items-center justify-between">
                <div>
                  <label class="block text-black text-sm mb-1">Nombre completo</label>
                  <div class="text-black font-medium">{{ user.first_name }} {{ user.last_name }}</div>
                </div>
                <button class="text-gray-500 hover:text-orange" @click="editField('name')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Email -->
            <div class="border border-gray-200 rounded-lg mb-4">
              <div class="p-4 flex items-center justify-between">
                <div>
                  <label class="block text-black text-sm mb-1">Email</label>
                  <div class="text-black font-medium">{{ user.email }}</div>
                </div>
                <button class="text-gray-500 hover:text-orange" @click="editField('email')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Número de teléfono -->
            <div class="border border-gray-200 rounded-lg mb-4">
              <div class="p-4 flex items-center justify-between">
                <div>
                  <label class="block text-black text-sm mb-1">Número de teléfono</label>
                  <div class="text-black font-medium">{{ user.phone || 'No especificado' }}</div>
                </div>
                <button class="text-gray-500 hover:text-orange" @click="editField('phone')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Dirección -->
            <div class="border border-gray-200 rounded-lg mb-4">
              <div class="p-4 flex items-center justify-between">
                <div>
                  <label class="block text-black text-sm mb-1">Dirección</label>
                  <div class="text-gray-600">{{ user.address || 'No especificado' }}</div>
                </div>
                <button class="text-gray-500 hover:text-orange" @click="editField('address')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          
       
       <!-- Botones de acción -->
       <div class="flex items-center justify-between pt-4 mt-8 border-t border-gray-200">
         <button @click="saveChanges" class="bg-orange text-white px-6 py-3 rounded-lg hover:bg-orange-dark transition">
           Guardar cambios
         </button>
         <button @click="showConfirmDelete = true" class="text-gray-600 hover:text-red-500 flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
           </svg>
           Eliminar cuenta
         </button>
       </div>
      </div>
    </div>


</div>
  </div>
  <!-- Modal de confirmación para eliminar cuenta -->
  <div v-if="showConfirmDelete" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h3 class="text-xl font-bold text-red-600 mb-4">¿Estás seguro?</h3>
      <p class="text-gray-700 mb-6">Esta acción eliminará permanentemente tu cuenta y todos tus datos asociados. Esta acción no se puede deshacer.</p>
      <div class="flex justify-end space-x-3">
        <button @click="showConfirmDelete = false" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
          Cancelar
        </button>
        <button @click="deleteAccount" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Eliminar cuenta
        </button>
      </div>
    </div>
  </div>
  <!-- Modal para editar campos -->
  <div v-if="editingField" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
      <h3 class="text-xl font-bold text-orange mb-4">Editar {{ getFieldLabel(editingField) }}</h3>
<div v-if="editingField === 'name'" class="mb-4">
    <label class="block text-gray-700 mb-2">Nombre</label>
    <input v-model="editForm.first_name" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2">
  </div>
  
  <div v-if="editingField === 'name'" class="mb-4">
    <label class="block text-gray-700 mb-2">Apellido</label>
    <input v-model="editForm.last_name" type="text" class="w-full border border-gray-300 rounded-lg px-4 py-2">
  </div>
  
  <div v-if="editingField === 'email'" class="mb-4">
    <label class="block text-gray-700 mb-2">Email</label>
    <input v-model="editForm.email" type="email" class="w-full border border-gray-300 rounded-lg px-4 py-2">
  </div>
  
  <div v-if="editingField === 'phone'" class="mb-4">
    <label class="block text-gray-700 mb-2">Teléfono</label>
    <input v-model="editForm.phone" type="tel" class="w-full border border-gray-300 rounded-lg px-4 py-2">
  </div>

  
  <div v-if="editingField === 'address'" class="mb-4">
    <label class="block text-gray-700 mb-2">Dirección</label>
    <textarea v-model="editForm.address" class="w-full border border-gray-300 rounded-lg px-4 py-2 h-24"></textarea>
  </div>
  
  <div class="flex justify-end space-x-3 mt-4">
    <button @click="cancelEdit" class="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">
      Cancelar
    </button>
    <button @click="saveEdit" class="px-4 py-2 bg-orange text-white rounded hover:bg-orange-dark">
      Guardar
    </button>
  </div>
</div>
  </div>
  <!-- Toast de notificación -->
  <div v-if="notification.show" 
    class="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 flex items-start max-w-sm transition-all duration-300"
    :class="{'bg-green-50': notification.type === 'success', 'bg-red-50': notification.type === 'error'}">
    <div v-if="notification.type === 'success'" class="text-green-500 mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div v-if="notification.type === 'error'" class="text-red-500 mr-3">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <div>
      <div class="font-medium" :class="{'text-green-800': notification.type === 'success', 'text-red-800': notification.type === 'error'}">
        {{ notification.title }}
      </div>
      <div class="text-sm text-gray-600">{{ notification.message }}</div>
    </div>
    <button @click="notification.show = false" class="ml-auto text-gray-400 hover:text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import axios from '~/src/config/axios'; // Ajusta la ruta según tu estructura
import { useAuthStore } from '../store/auth';

// Estado para mostrar más entradas sociales
const showMoreSocials = ref(false);
const toggleMoreSocials = () => {
  showMoreSocials.value = !showMoreSocials.value;
};

// Cerrar sesión
const logout = async () => {
  authStore.logout();
  // Limpiar tokens del localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token'); // Por si acaso también usas este nombre
  localStorage.removeItem('user');
  window.location.href = '/';
};


// Método para iniciar sesión
// En el método login del componente de login
const login = async () => {
  try {
    isLoading.value = true;
    
    const response = await axios.post('/api/auth/login', {
      email: email.value,
      password: password.value
    });
    
    if (response.data && response.data.success) {
      // Guardar tokens
      localStorage.setItem('access_token', response.data.data.accessToken);
      localStorage.setItem('refresh_token', response.data.data.refreshToken);
      
      // Redirección inmediata a account-info
      window.location.href = '/account/account-info';
    } else {
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error de inicio de sesión:', error);
    showNotification('error', 'Error', 'No se pudo iniciar sesión');
  } finally {
    isLoading.value = false;
  }
};

// Datos del usuario
const user = ref({
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  profile_image: '',
  short_bio: '',
  address: '',
  social_facebook: '',
  social_linkedin: '',
  social_twitter: '',
  social_instagram: '',
  social_pinterest: ''
});

// Datos del formulario (para edición)
const formData = reactive({
  short_bio: '',
  social_facebook: '',
  social_linkedin: '',
  social_twitter: '',
  social_instagram: '',
  social_pinterest: ''
});

// Estado para la edición de campo
const editingField = ref(null);
const editForm = reactive({});

// Estado para confirmación de eliminación
const showConfirmDelete = ref(false);

// Estado de carga
const isLoading = ref(true);

// Notificación
const notification = reactive({
  show: false,
  type: 'success',
  title: '',
  message: '',
  timeout: null
});

// Porcentaje de completitud del perfil
const completeness = ref(0);

// Función para calcular completitud del perfil localmente
const calculateCompleteness = () => {
  if (!user.value) {
    completeness.value = 0;
    return;
  }
  
  const fields = [
    { name: 'first_name', weight: 10 },
    { name: 'last_name', weight: 10 },
    { name: 'email', weight: 10 },
    { name: 'phone', weight: 10 },
    { name: 'profile_image', weight: 10 },
    { name: 'short_bio', weight: 15 },
    { name: 'address', weight: 15 },
    { name: 'social_facebook', weight: 5 },
    { name: 'social_linkedin', weight: 5 },
    { name: 'social_twitter', weight: 5 },
    { name: 'social_instagram', weight: 2.5 },
    { name: 'social_pinterest', weight: 2.5 }
  ];

  let total = 0;
  fields.forEach(field => {
    if (user.value[field.name] && String(user.value[field.name]).trim() !== '') {
      total += field.weight;
    }
  });

  completeness.value = Math.round(total);
  console.log('Completitud calculada:', completeness.value + '%');
};

// Cargar datos del usuario
const loadUserData = async () => {
  try {
    isLoading.value = true;
    
    // Obtener token del localStorage
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.error('No hay token de autenticación');
      window.location.href = '/auth/login';
      return;
    }
    
    // Conectamos con la API real incluyendo el token
    const response = await axios.get('/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Datos del usuario recibidos:', response.data);
    
    if (response.data && response.data.success) {
      // Asignar datos del usuario
      user.value = response.data.data.user || {};
      
      // Si el backend proporciona completitud, usarla
      if (response.data.data.completeness !== undefined) {
        completeness.value = response.data.data.completeness;
      } else {
        // Si no, calcular localmente
        calculateCompleteness();
      }
      
      // Copiar valores a formData
      formData.short_bio = user.value.short_bio || '';
      formData.social_facebook = user.value.social_facebook || '';
      formData.social_linkedin = user.value.social_linkedin || '';
      formData.social_twitter = user.value.social_twitter || '';
      formData.social_instagram = user.value.social_instagram || '';
      formData.social_pinterest = user.value.social_pinterest || '';
      
      console.log('Datos cargados en formData:', formData);
    } else {
      throw new Error('No se pudieron obtener los datos del usuario');
    }
  } catch (error) {
    console.error('Error cargando datos del usuario:', error);
    
    if (error.response && error.response.status === 401) {
      // Error de autenticación, redirigir al login
      window.location.href = '/auth/login';
    } else {
      showNotification('error', 'Error', 'No se pudieron cargar los datos del perfil');
    }
  } finally {
    isLoading.value = false;
  }
};

// Guardar cambios
const saveChanges = async () => {
  try {
    isLoading.value = true;
    
    // Datos a actualizar
    const updateData = {
      short_bio: formData.short_bio,
      social_facebook: formData.social_facebook,
      social_linkedin: formData.social_linkedin,
      social_twitter: formData.social_twitter,
      social_instagram: formData.social_instagram,
      social_pinterest: formData.social_pinterest
    };
    
    console.log('Guardando datos:', updateData);
    
    // Llamada a la API real
    const response = await axios.put('/api/users/profile', updateData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    
    if (response.data && response.data.success) {
      // Actualizar datos locales
      user.value.short_bio = formData.short_bio;
      user.value.social_facebook = formData.social_facebook;
      user.value.social_linkedin = formData.social_linkedin;
      user.value.social_twitter = formData.social_twitter;
      user.value.social_instagram = formData.social_instagram;
      user.value.social_pinterest = formData.social_pinterest;
      
      // Si el backend devuelve la completitud actualizada, usarla
      if (response.data.completeness !== undefined) {
        completeness.value = response.data.completeness;
      } else {
        // Si no, recalcular localmente
        calculateCompleteness();
      }
      
      showNotification('success', 'Éxito', 'Perfil actualizado correctamente');
    } else {
      throw new Error('No se pudo actualizar el perfil');
    }
  } catch (error) {
    console.error('Error guardando cambios:', error);
    showNotification('error', 'Error', 'No se pudieron guardar los cambios');
  } finally {
    isLoading.value = false;
  }
};
const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    showNotification('error', 'Formato no válido', 'Por favor, sube una imagen en formato JPG o PNG');
    return;
  }
  
  if (file.size > 5 * 1024 * 1024) { // 5MB
    showNotification('error', 'Archivo demasiado grande', 'La imagen no debe superar los 5MB');
    return;
  }
  
  try {
    isLoading.value = true;
    
    // Crear FormData para enviar la imagen
    const formData = new FormData();
    formData.append('image', file);
    
    // Enviar la imagen al servidor
    const response = await axios.post('/api/users/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (response.data && response.data.success) {
      // Obtener la URL de la imagen actualizada
      const imageUrl = response.data.data.imageUrl;
      
      // Actualizar la imagen en la interfaz local
      user.value.profile_image = imageUrl;
      
      // IMPORTANTE: Actualizar también en el store de autenticación
      // para que se actualice en todos los componentes
      const authStore = useAuthStore();
      
      // Actualizar en el store
      authStore.setUser({
        ...authStore.user,
        profile_image: imageUrl
      });
      
      // Actualizar en el localStorage
      const userJson = localStorage.getItem('user');
      if (userJson) {
        try {
          const userData = JSON.parse(userJson);
          userData.profile_image = imageUrl;
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (e) {
          console.error('Error al actualizar usuario en localStorage', e);
        }
      }
      
      // Actualizar la completitud del perfil
      if (response.data.completeness !== undefined) {
        completeness.value = response.data.completeness;
      } else {
        calculateCompleteness();
      }
      
      showNotification('success', 'Éxito', 'Imagen de perfil actualizada correctamente');
    } else {
      throw new Error('No se pudo actualizar la imagen');
    }
  } catch (error) {
    console.error('Error subiendo imagen:', error);
    showNotification('error', 'Error', 'No se pudo actualizar la imagen de perfil');
  } finally {
    isLoading.value = false;
  }
};
// Editar campo
const editField = (field) => {
  editingField.value = field;
  
  // Preparar formulario de edición
  if (field === 'name') {
    editForm.first_name = user.value.first_name || '';
    editForm.last_name = user.value.last_name || '';
  } else {
    editForm[field] = user.value[field] || '';
  }
};

// Obtener etiqueta para el campo
const getFieldLabel = (field) => {
  const labels = {
    name: 'nombre completo',
    email: 'email',
    phone: 'teléfono',
    address: 'dirección'
  };
  
  return labels[field] || field;
};

// Guardar edición
const saveEdit = async () => {
  try {
    isLoading.value = true;
    
    let updateData = {};
    
    if (editingField.value === 'name') {
      updateData = {
        first_name: editForm.first_name,
        last_name: editForm.last_name
      };
    } else {
      updateData[editingField.value] = editForm[editingField.value];
    }
    
    // Llamada a la API real
    const response = await axios.put('/api/users/profile', updateData);
    
    if (response.data && response.data.success) {
      // Actualizar datos locales
      if (editingField.value === 'name') {
        user.value.first_name = editForm.first_name;
        user.value.last_name = editForm.last_name;
      } else {
        user.value[editingField.value] = editForm[editingField.value];
      }
      
      // Si el backend devuelve la completitud actualizada, usarla
      if (response.data.completeness !== undefined) {
        completeness.value = response.data.completeness;
      } else {
        // Si no, recalcular localmente
        calculateCompleteness();
      }
      
      editingField.value = null;
      showNotification('success', 'Éxito', 'Información actualizada correctamente');
    } else {
      throw new Error('No se pudo actualizar la información');
    }
  } catch (error) {
    showNotification('error', 'Error', 'No se pudo actualizar la información');
    console.error('Error actualizando campo:', error);
  } finally {
    isLoading.value = false;
  }
};

// Cancelar edición
const cancelEdit = () => {
  editingField.value = null;
};

// Eliminar cuenta
const deleteAccount = async () => {
  try {
    isLoading.value = true;
    
    // Llamada a la API real
    const response = await axios.delete(`/api/users/${user.value.id}`);
    
    if (response.data && response.data.success) {
      showConfirmDelete.value = false;
      showNotification('success', 'Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente');
      
      // Redirigir al login después de unos segundos
      setTimeout(() => {
        window.location.href = '/auth/login';
      }, 2000);
    } else {
      throw new Error('No se pudo eliminar la cuenta');
    }
  } catch (error) {
    showNotification('error', 'Error', 'No se pudo eliminar la cuenta');
    console.error('Error eliminando cuenta:', error);
    showConfirmDelete.value = false;
  } finally {
    isLoading.value = false;
  }
};

// Mostrar notificación
const showNotification = (type, title, message) => {
  // Limpiar timeout existente
  if (notification.timeout) {
    clearTimeout(notification.timeout);
  }
  
  // Configurar notificación
  notification.type = type;
  notification.title = title;
  notification.message = message;
  notification.show = true;
  
  // Ocultar después de 5 segundos
  notification.timeout = setTimeout(() => {
    notification.show = false;
  }, 5000);
};

// Al montar el componente
// En el método onMounted o cuando se carga el componente
onMounted(async () => {
  // Verificar si hay un token
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = '/auth/login';
    return;
  }
  
  // Cargar datos del usuario
  await loadUserData();
});
</script>
<style>
/* Colores personalizados */
.bg-orange {
  background-color: #fd5631;
}

.bg-orange-dark {
  background-color: #fd5631;
}

.text-orange {
  color: #fd5631;
}

.border-orange {
  border-color: #fd5631;
}

.hover\:bg-orange:hover {
  background-color: #fd5631;
}

.hover\:bg-orange-dark:hover {
  background-color: #fd5631;
}

.hover\:text-orange:hover {
  color: #fd5631;
}

/* Estilos de enfoque */
.focus\:ring-orange:focus {
  --tw-ring-color: #fd5631;
  --tw-ring-opacity: 0.5;
  box-shadow: 0 0 0 3px rgba(10, 51, 100, 0.5);
}

.focus\:border-orange:focus {
  border-color: #fd5631;
}

/* Forzar texto negro para todos los elementos importantes */
.text-black, h1, h2, h3, p, label, .page-title, .progress-text, .section-label, .detail-label, .detail-value {
  color: #000000 !important;
}

/* Solo excepciones */
.not-specified {
  color: #666666 !important;
}

/* Transiciones */
.transition {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>