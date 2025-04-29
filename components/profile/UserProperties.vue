<template>
    <div class="user-properties">
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-4 bg-gray-50 border-b flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Mis propiedades</h3>
          <router-link to="/properties/create" class="inline-flex items-center px-3 py-1.5 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-600 transition-colors">
            <Icon name="ph:plus" class="h-4 w-4 mr-1" />
            Nueva propiedad
          </router-link>
        </div>
        
        <div class="p-6">
          <!-- Loading state -->
          <div v-if="loading" class="flex justify-center py-6">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
          
          <!-- Error state -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {{ error }}
          </div>
          
          <!-- Empty state -->
          <div v-else-if="properties.length === 0" class="text-center py-10">
            <div class="empty-state">
              <Icon name="ph:house-x" class="h-16 w-16 mx-auto text-gray-300" />
              <h4 class="mt-4 text-lg font-medium text-gray-900">No tienes propiedades registradas</h4>
              <p class="mt-2 text-gray-500">Comienza a ganar dinero publicando tus espacios.</p>
              <router-link to="/properties/create" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                Publicar mi primera propiedad
              </router-link>
            </div>
          </div>
          
          <!-- Properties list -->
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Propiedad
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reservas
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="property in properties" :key="property.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img 
                          :src="property.main_image || 'https://via.placeholder.com/60x60'" 
                          class="h-10 w-10 rounded-md object-cover" 
                          alt="Property thumbnail"
                        />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ property.title }}</div>
                        <div class="text-xs text-gray-500">{{ property.location }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" 
                      :class="{
                        'bg-green-100 text-green-800': property.status === 'available',
                        'bg-gray-100 text-gray-800': property.status === 'inactive',
                        'bg-red-100 text-red-800': property.status === 'blocked'
                      }"
                    >
                      {{ getStatusLabel(property.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${{ property.price }}/noche
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ property.bookings_count || 0 }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <router-link 
                        :to="`/properties/${property.id}`" 
                        class="text-gray-500 hover:text-gray-700" 
                        title="Ver propiedad"
                      >
                        <Icon name="ph:eye" class="h-5 w-5" />
                      </router-link>
                      <router-link 
                        :to="`/properties/${property.id}/edit`" 
                        class="text-primary-500 hover:text-primary-700" 
                        title="Editar propiedad"
                      >
                        <Icon name="ph:pencil" class="h-5 w-5" />
                      </router-link>
                      <button 
                        class="text-red-500 hover:text-red-700" 
                        title="Eliminar propiedad"
                        @click="deleteProperty(property.id)"
                      >
                        <Icon name="ph:trash" class="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { usePropertyService } from '../../services/propertyService';
  
  // Estado
  const properties = ref([]);
  const loading = ref(false);
  const error = ref(null);
  
  // Servicios
  const propertyService = usePropertyService();
  
  // Métodos
  const getStatusLabel = (status) => {
    const statusLabels = {
      'available': 'Disponible',
      'inactive': 'Inactivo',
      'blocked': 'Bloqueado'
    };
    
    return statusLabels[status] || status;
  };
  
  const deleteProperty = async (propertyId) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta propiedad? Esta acción no se puede deshacer.')) {
      try {
        await propertyService.deleteProperty(propertyId);
        // Eliminar de la lista local
        properties.value = properties.value.filter(p => p.id !== propertyId);
      } catch (err) {
        console.error('Error deleting property:', err);
        alert('Error al eliminar la propiedad. Por favor, intenta de nuevo.');
      }
    }
  };
  
  const loadProperties = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      // En un entorno real:
      // const response = await propertyService.getProperties({ host: true });
      // properties.value = response;
      
      // Datos de ejemplo
      setTimeout(() => {
        properties.value = [
          {
            id: 101,
            title: 'Apartamento con vista al mar',
            location: 'Cancún, México',
            main_image: 'https://via.placeholder.com/300x200?text=Apartment',
            status: 'available',
            price: 120,
            bookings_count: 8
          },
          {
            id: 102,
            title: 'Casa de campo',
            location: 'Valle de Bravo, México',
            main_image: 'https://via.placeholder.com/300x200?text=House',
            status: 'inactive',
            price: 200,
            bookings_count: 3
          }
        ];
        loading.value = false;
      }, 1000);
      
      // Para probar el estado vacío, descomenta la siguiente línea:
      // properties.value = [];
    } catch (err) {
      console.error('Error loading properties:', err);
      error.value = 'No se pudieron cargar las propiedades. Por favor, intenta de nuevo.';
      loading.value = false;
    }
  };
  
  // Ciclo de vida
  onMounted(() => {
    loadProperties();
  });
  </script>