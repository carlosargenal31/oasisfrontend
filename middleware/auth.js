// middleware/auth.js
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  // En el lado del cliente
  if (process.client) {
    const authStore = useAuthStore();
    
    // Asegurarse de que el store esté inicializado
    if (!authStore.isInitialized) {
      authStore.initialize();
    }
    
    // Verificar si la ruta requiere autenticación
    const requiresAuth = to.meta.requiresAuth || 
                        (to.meta.middleware && 
                         (to.meta.middleware === 'auth' || 
                          (Array.isArray(to.meta.middleware) && to.meta.middleware.includes('auth'))));
    
    if (requiresAuth && !authStore.isAuthenticated) {
      // Guardar la URL a la que se intentaba acceder
      return navigateTo({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      });
    }
    
    // Si la ruta es para usuarios no autenticados (como login o register)
    // y el usuario ya está autenticado, redirigir al dashboard
    if (to.meta.guestOnly && authStore.isAuthenticated) {
      return navigateTo('/');
    }
  }
});