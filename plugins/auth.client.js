// plugins/auth.client.js
import { useAuthStore } from '~/store/auth';

export default defineNuxtPlugin(() => {
  try {
    // Este plugin solo se ejecuta en el cliente
    const authStore = useAuthStore();
    
    // Inicializar el estado de autenticación
    authStore.initialize();
    
    console.log('Auth plugin initialized, authenticated:', authStore.isAuthenticated);
    
    return {
      provide: {
        authStore
      }
    };
  } catch (error) {
    console.error('Error initializing auth plugin:', error);
    return {};
  }
});