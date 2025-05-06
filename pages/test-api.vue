// pages/test-api.vue
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">API Test Page</h1>
    
    <div v-if="error" class="bg-red-100 p-4 rounded mb-4">
      <p class="text-red-700">{{ error }}</p>
    </div>
    
    <div v-if="response" class="bg-green-100 p-4 rounded mb-4">
      <pre class="whitespace-pre-wrap">{{ JSON.stringify(response, null, 2) }}</pre>
    </div>
    
    <button 
      @click="testApi" 
      class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50"
      :disabled="loading"
    >
      {{ loading ? 'Probando...' : 'Probar API' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const loading = ref(false);
const error = ref(null);
const response = ref(null);

async function testApi() {
  loading.value = true;
  error.value = null;
  response.value = null;
  
  try {
    // Prueba simple al endpoint de la API
    const result = await axios.get('http://localhost:3000/api/status');
    response.value = result.data;
    console.log('API response:', result);
  } catch (err) {
    console.error('API test error:', err);
    error.value = `Error: ${err.message}`;
    
    if (err.response) {
      response.value = {
        status: err.response.status,
        data: err.response.data
      };
    }
  } finally {
    loading.value = false;
  }
}
</script>