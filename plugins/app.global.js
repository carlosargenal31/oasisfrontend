// plugins/app.global.js
export default defineNuxtPlugin((nuxtApp) => {
    // Envuelve el código en un try/catch para evitar que falle la aplicación
    try {
      // Verificar si estamos en el cliente
      if (process.client) {
        // Importar el store dinámicamente (importante: no uses import en la parte superior)
        const { useAuthStore } = nuxtApp.$pinia.state.value;
        
        // Solo inicializar si el store existe
        if (useAuthStore) {
          const authStore = useAuthStore();
          authStore.initAuth();
        }
      }
    } catch (error) {
      console.error('Error inicializando auth store:', error);
    }
    console.log('App global plugin loaded');
  });